/*
 * This JavaScript file defines a Vector object and associated functions.
 * The object itself is returned as the result of a function, allowing us
 * to encapsulate its code and module variables.
 *
 * This module's approach is non-destructive: methods always return new
 * Vector objects, and never modify the operands.  This is a design choice.
 *
 * This module is designed for vectors of any number of dimensions.  The
 * implementations are generalized but not optimal for certain sizes of
 * vectors.  Specific Vector2D and Vector3D implementations can be much
 * more compact, while sacrificing generality.
 */

var Matrix = (function () {
    // Constructor for a 4x4 identity matrix
    var matrix = function () {
        this.elements = arguments.length ? [].slice.call(arguments) :
                            [
                                [ 1, 0, 0, 0 ], 
                                [ 0, 1, 0, 0 ], 
                                [ 0, 0, 1, 0 ],
                                [ 0, 0, 0, 1 ]
                            ];
    };

    matrix.prototype.multiply = function (matrix) {
        var result = new Matrix();

        for (var i = 0; i < this.elements.length; i++) {
            var m = this.elements[i];
            for (var j = 0; j < m.length; j++) {
                var sumOfProducts = 0;
                for (var k = 0; k < this.elements.length; k++) {
                    sumOfProducts += this.elements[i][k] * matrix.elements[k][j];
                }
                result.elements[i][j] = sumOfProducts;
            }
        }
        return result;
    };

    matrix.getTranslationMatrix = function (tx, ty, tz) {
        var tx = tx || 0,
            ty = ty || 0,
            tz = tz || 0;

        return new Matrix(
            [ 1, 0, 0, tx ],
            [ 0, 1, 0, ty ],
            [ 0, 0, 1, tz ],
            [ 0, 0, 0, 1 ]
        );
    };

    matrix.getScalingMatrix = function (sx, sy, sz) {
        var sx = sx || 1,
            sy = sy || 1,
            sz = sz || 1;

        return new Matrix(
            [ sx, 0, 0, 0 ],
            [ 0, sy, 0, 0 ],
            [ 0, 0, sz, 0 ],
            [ 0, 0, 0, 1 ]  
        );
    };

    matrix.getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        if (!(x || y || z)) {
            return new Matrix();
        } else {
            var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
            var s = Math.sin(angle * Math.PI / 180.0);
            var c = Math.cos(angle * Math.PI / 180.0);
            var oneMinusC = 1.0 - c;
            var angle = angle || 0;

            // Normalize the axis vector of rotation.
            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            // Now we can calculate the other terms.
            // "2" for "squared."
            var x2 = x * x;
            var y2 = y * y;
            var z2 = z * z;
            var xy = x * y;
            var yz = y * z;
            var xz = x * z;
            var xs = x * s;
            var ys = y * s;
            var zs = z * s;

            return new Matrix (
                [ (x2 * oneMinusC) + c, (xy * oneMinusC) - zs, (xz * oneMinusC) + ys, 0.0 ],
                [ (xy * oneMinusC) + zs, (y2 * oneMinusC) + c, (yz * oneMinusC) - xs, 0.0 ],
                [ (xz * oneMinusC) - ys, (yz * oneMinusC) + xs, (z2 * oneMinusC) + c, 0.0 ],
                [                   0.0,                   0.0,                  0.0, 1.0 ]
            );
        }
    };

    matrix.getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;

        if (!(width && height && depth)) {
            console.log("ORTHOGONAL MATRIX ERROR: MATRIX UNDEFINED AT GIVEN ARGUMENTS");
        } else {

            return new Matrix(
                [ 2.0 / width,          0.0,          0.0, -(right + left) / width ],
                [         0.0, 2.0 / height,          0.0, -(top + bottom) / height ],
                [         0.0,          0.0, -2.0 / depth, -(zFar + zNear) / depth ],
                [         0.0,          0.0,          0.0,                      1.0 ]
            );
        }
    };

    matrix.getPerspectMatrix = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;

        if (!(width && height && depth)) {
            console.log("PERSPECTIVE MATRIX ERROR: MATRIX UNDEFINED AT GIVEN ARGUMENTS");
        } else {

            return new Matrix(
                [ 2.0 * zNear / width,                  0.0,  (right + left) / width, 0.0 ],
                [                 0.0, 2.0 * zNear / height, (top + bottom) / height, 0.0 ],
                [                 0.0,                  0.0, -(zFar + zNear) / depth, -(2.0 * zFar * zNear) / depth ],
                [                 0.0,                  0.0,                    -1.0, 0.0 ]
            );
        }
    };

    matrix.getTransformationMatrix = function (transformation) {
        var translateMatrix = new Matrix(),
            scaleMatrix = new Matrix(),
            rotateMatrix = new Matrix();

        translateMatrix = Matrix.getTranslationMatrix(
            transformation.tx,
            transformation.ty,
            transformation.tz
        );

        scaleMatrix = Matrix.getScalingMatrix(
            transformation.sx,
            transformation.sy,
            transformation.sz
        );

        rotateMatrix = Matrix.getRotationMatrix(
            transformation.angle,
            transformation.rx,
            transformation.ry,
            transformation.rz
        );

        return rotateMatrix.multiply(scaleMatrix.multiply(translateMatrix));
    };

    matrix.prototype.convert = function () {
        var result = [];
        for (var i = 0; i < this.elements.length; i++) {
            var matrix = this.elements[i];
            for (var j = 0; j < matrix.length; j++) {
                result.push(this.elements[j][i]);
            }
        }
        return result;
    };

    return matrix;
})();