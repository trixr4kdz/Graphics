/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {
    /*
     * This code does not really belong here: it should live
     * in a separate library of matrix and transformation
     * functions.  It is here only to show you how matrices
     * can be used with GLSL.
     *
     * Based on the original glRotate reference:
     *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
     */

    // Grab the WebGL rendering context.
    var gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Initialize shapes to be drawn
    var cone = new Shape(Shapes.cone(50), 
            { r: 0.75, g: 0.75, b: 0.0 }),
        iceCream = new Shape(Shapes.sphere(0.6, 15, 15),
            { r: 0.5, g: 0.5, b: 1.0 });
    iceCream.addChild(cone);

    var contextStack = [],
        currentMatrix = new Matrix().convert();

        save = function () {
            contextStack.push(currentMatrix);
        },

        restore = function () {
            gl.uniformMatrix4fv(transformationMatrix, gl.FALSE, 
                new Float32Array(contextStack.pop()));
        };

    // Build the objects to display.
    var objectsToDraw = [],
        shapes = [iceCream, cone];

    var makeTransforms = function (object, transform) {
        var obj = shapes[shapes.indexOf(object)],
            spec = Object.keys(transform);
        t = {};
        for (var key of spec) {
            t[key] = transform[key];
        }
        obj["transform"] = t;
    };

    makeTransforms(iceCream, {
        tx: 1,
        sx: 2,
        sy: 2,
        sz: 2
    });

    makeTransforms(cone, {
        tx: 10,
        ty: 10,
        tz: 10
    })

    var toDraw = function (shapes) {
        for (var i = 0; i < shapes.length; i++) {
            var obj = {
                color: shapes[i].color,
                vertices: shapes[i].toRawTriangleArray(),
                mode: gl.TRIANGLES,
                // vertices: shapes[i].toRawLineArray(),
                // mode: gl.LINES,
                children: shapes[i].children,
                transform: shapes[i].transform
            };
            objectsToDraw.push(obj);
            if (shapes[i].children.length > 0) {
                toDraw(shapes[i].children)
            }
        }
    };

    toDraw(shapes);

    var verticesToWebGL = function (objectsToDraw) {
    // Pass the vertices to WebGL.
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {

            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (var j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            }
            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);

            if (objectsToDraw[i].children.length > 0) {
                verticesToWebGL(objectsToDraw[i].children);
            }
        }
    };

    // Initialize the shaders.
    var abort = false;
    var shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    var vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    var vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    var rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");

    var transformationMatrix = gl.getUniformLocation(shaderProgram, "transformationMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");

    /*
     * Displays an individual object.
     */
    var drawObject = function (object, parent) {
        console.log(parent)
        currentMatrix = Matrix.getTransformationMatrix(
            {
                tx: object.transform.tx,
                ty: object.transform.ty,
                tz: object.transform.tz,
                sx: object.transform.sx,
                sy: object.transform.sy,
                sz: object.transform.sz,
                rx: object.transform.rx,
                ry: object.transform.ry,
                rz: object.transform.rz,
                angle: object.transform.angle
            });

        if (parent) {
            currentMatrix = currentMatrix.multiply(parent);
        }

        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, 
            new Float32Array(currentMatrix.convert()));

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if (object.children.length > 0) {
            for (var i = 0; i < object.children.length; i++) {
                drawObject(object.children[i], currentMatrix);
            }
        }
    };

    /*
     * Displays the scene.
     */
    var drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(transformationMatrix, gl.FALSE, 
            new Float32Array(new Matrix().convert()));

        // Display the objects.
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.getOrthoMatrix(
        -5 * (canvas.width / canvas.height),
        5 * (canvas.width / canvas.height),
        -5,
        5,
        -10,
        10
    ).convert()));

    verticesToWebGL(objectsToDraw);

    /*
     * Animates the scene.
     */
    var animationActive = false;
    var currentRotation = 0.0;
    var previousTimestamp = null;

    var advanceScene = function (timestamp) {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        currentRotation += 0.033 * progress;
        drawScene();
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("hello-webgl")));