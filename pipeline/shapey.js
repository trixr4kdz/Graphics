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
    var diamond = new Shape(Shapes.diamond(), 
                    { r: 0.0, g: 0.5, b: 0.5 }),
        sphere = new Shape(Shapes.sphere(0.7, 20, 20), 
                    { r: 0.5, g: 0.5, b: 0.0 }),
        cone = new Shape(Shapes.cone(150), 
            { r: 0.75, g: 0.75, b: 0.0 }),
        iceCream = new Shape(Shapes.sphere(0.3, 20, 20));
    iceCream.addChild(cone);       // iceCreamCone XD

    var contextStack = [],
        currentMatrix;

        save = function () {
            contextStack.push(currentMatrix);
        },

        restore = function () {
            gl.uniformMatrix4fv(transformationMatrix, gl.FALSE, 
                new Float32Array(contextStack.pop()));
        };

    // Build the objects to display.
    var objectsToDraw = [],
        shapes = [diamond, sphere, iceCream];

    var makeTransforms = function (object, transform) {
        var obj = shapes[shapes.indexOf(object)],
            spec = Object.keys(transform);
        for (var key of spec) {
            obj[key] = transform[key];
        }
    };

    makeTransforms(diamond, {
        angle: 40,
        rx: 1,
        ry: 1
    });

    makeTransforms(sphere, {
        tx: 0.5,
        sx: 2,
        sy: 2,
        sz: 2
    });

    var toDraw = function (shapes) {
        for (var i = 0; i < shapes.length; i++) {
            var obj = {
                color: shapes[i].color,
                vertices: shapes[i].toRawLineArray(),
                mode: gl.LINES,
                children: shapes[i].children,
                transform: {
                    tx: shapes[i].tx,
                    ty: shapes[i].ty,
                    tz: shapes[i].tz,
                    sx: shapes[i].sx,
                    sy: shapes[i].sy,
                    sz: shapes[i].sz,
                    angle: shapes[i].angle,
                    rx: shapes[i].rx,
                    ry: shapes[i].ry,
                    rz: shapes[i].rz,
                }
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
    var drawObject = function (object) {

        // currentMatrix = Matrix.getTransformationMatrix(
        //     {
        //         tx: object.tx,
        //         ty: object.ty,
        //         tz: object.tz,
        //         sx: object.sx,
        //         sy: object.sy,
        //         sz: object.sz,
        //         rx: object.rx,
        //         ry: object.ry,
        //         rz: object.rz,
        //         angle: currentRotation
        //     }).convert()

        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        // gl.uniformMatrix4fv(transformationMatrix, gl.FALSE, 
        //     new Float32Array(currentMatrix));

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if (object.children.length > 0) {
            for (var i = 0; i < object.children.length; i++) {
                save();
                drawObject(object.children[i]);
                restore();
            }
        }
    };

    /*
     * Displays the scene.
     */
    var drawScene = function () {
        currentMatrix = Matrix.getTransformationMatrix(
            {
                tx: 0.0,
                ty: 0.5,
                tz: 0.0,
                angle: 180,
                rx: 1,
                ry: 0,
                rz: 0,
            }
        ).convert();

        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(transformationMatrix, gl.FALSE, 
            new Float32Array(Matrix.getTransformationMatrix(
                {
                    ty: 1.0,
                    sx: 0.0,
                    sy: 0.5,
                    sz: 0.5,
                    angle: currentRotation,
                    rx: 1,
                    ry: 1,
                    rz: 0
                }).convert()
            ));

        // Display the objects.
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.getOrthoMatrix(
        -1.25 * (canvas.width / canvas.height),
        1.25 * (canvas.width / canvas.height),
        -1.25,
        1.25,
        -2,
        2
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
