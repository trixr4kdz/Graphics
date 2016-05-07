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
    var cone = new Shape(Shapes.cone(100), 
            { r: 0.75, g: 0.75, b: 0.0 }),
        iceCream = new Shape(Shapes.sphere(0.6, 15, 15),
            { r: 1.0, g: 0.41, b: 0.70 });
    iceCream.addChild(cone);

    // Build the objects to display.
    var makeTransforms = function (object, transform) {
        var obj = shapes[shapes.indexOf(object)],
            spec = Object.keys(transform);
        t = {};
        for (var key of spec) {
            t[key] = transform[key];
        }
        obj["transform"] = t;
    };

    var shapes = [iceCream, cone];

    makeTransforms(iceCream, {
        ty: -1.4,
        sx: 1,
        sy: 0.5,
        sz: 1.5,
        tz: 1
    });

    makeTransforms(cone, {
        ty: 0.3,
        sx: 1.5,
        sy: 3,
        rz: 0,
        rx: 1,
        ry: 0,
        angle: 180
    });

    var objectsToDraw = [
        {
            color: cone.color,
            specularColor: {r: 1, g: 1, b: 1},
            vertices: cone.toRawTriangleArray(),
            mode: gl.TRIANGLES,
            transform: cone.transform,
            shininess: 10,
            normals: cone.toNormalArray(),
            children: [{
                color: iceCream.color,
                specularColor: {r: 1, g: 1, b: 1},
                vertices: iceCream.toRawTriangleArray(),
                mode: gl.TRIANGLES,
                transform: iceCream.transform,
                shininess: 6,
                normals: iceCream.toNormalArray(),
                children: []
            }]
        }
    ];

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
            if (!objectsToDraw[i].specularColors) {
            // Future refactor: helper function to convert a single value or
            // array into an array of copies of itself.
            objectsToDraw[i].specularColors = [];
                for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].specularColors = objectsToDraw[i].specularColors.concat(
                        objectsToDraw[i].specularColor.r,
                        objectsToDraw[i].specularColor.g,
                        objectsToDraw[i].specularColor.b
                    );
                }
            }
            objectsToDraw[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].specularColors);

            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);

            objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].normals);

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

    var lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    var lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    var lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    var lightAmbient = gl.getUniformLocation(shaderProgram, "lightAmbient");
    var camera = gl.getUniformLocation(shaderProgram, "camera");

    var vertexSpecularColor = gl.getUniformLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    var shininess = gl.getUniformLocation(shaderProgram, "shininess");
    var normalVector = gl.getUniformLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    gl.uniform3fv(lightPosition, [10, 0, 1]);
    gl.uniform3fv(lightDiffuse, [1, 1, 1]);
    gl.uniform3fv(lightSpecular, [1, 1, 1]); 
    gl.uniform3fv(lightAmbient, [-0.1, -0.1, -0.1]);

    gl.uniform1f(shininess, 10);
    gl.uniformMatrix4fv(camera, gl.FALSE, 
        new Float32Array(Matrix.getTransformationMatrix({}).convert()));
    /*
     * Displays an individual object.
     */
    var drawObject = function (object, parent) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        gl.uniform1f(shininess, object.shininess);

        var currentMatrix = parent || new Matrix();

        var transform = Matrix.getTransformationMatrix(
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

        currentMatrix = currentMatrix.multiply(transform);

        gl.uniformMatrix4fv(transformationMatrix, gl.FALSE, 
            new Float32Array(currentMatrix.convert()));

        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

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

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, 
            new Float32Array(Matrix.getTransformationMatrix(
                {
                    angle: currentRotation,
                    rx: 0,
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
        -2.5 * (canvas.width / canvas.height),
        2.5 * (canvas.width / canvas.height),
        -2.5,
        2.5,
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

    $("#lick").click(function () {
        iceCream.transform.sx /= 1.05;
        iceCream.transform.sy /= 1.05;
        iceCream.transform.sz /= 1.05;

        drawScene();
    });

}(document.getElementById("hello-webgl")));