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
        this.elements = [
            [1, 0, 0, 0], 
            [0, 1, 0, 0], 
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    };

    // var matrix = function (row1, row2, row3, row4) {
    //     this.elements = [
    //         row1,
    //         row2,
    //         row3,
    //         row4
    //     ]
    // };

    matrix.prototype.multiply = function (matrix) {
        var result = new Matrix();

        for (var i = 0; i < this.elements.length; i++) {
            var m = this.elements[i];
            for (var j = 0; j < m.length; j++) {
                var sumOfProducts = 0;
                sumOfProducts += this.elements[i][j] * matrix.elements[j][i];
                result.elements[i][j] = sumOfProducts;
            }
        }
        return result;
    };

    matrix.prototype.getTranslationMatrix = function () {
        return [];
    };

    matrix.prototype.getScalingMatrix = function () {
        return [];
    };

    matrix.prototype.getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
        var s = Math.sin(angle * Math.PI / 180.0);
        var c = Math.cos(angle * Math.PI / 180.0);
        var oneMinusC = 1.0 - c;

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

        // GL expects its matrices in column major order.
        return [
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) + zs,
            (xz * oneMinusC) - ys,
            0.0,

            (xy * oneMinusC) - zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) + xs,
            0.0,

            (xz * oneMinusC) + ys,
            (yz * oneMinusC) - xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ];
    };

    matrix.prototype.getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left;
        var height = top - bottom;
        var depth = zFar - zNear;

        return [
            2.0 / width,
            0.0,
            0.0,
            0.0,

            0.0,
            2.0 / height,
            0.0,
            0.0,

            0.0,
            0.0,
            -2.0 / depth,
            0.0,

            -(right + left) / width,
            -(top + bottom) / height,
            -(zFar + zNear) / depth,
            1.0
        ];
    };

    matrix.prototype.getPerspectMatrix = function () {

    };

    matrix.prototype.convert = function () {
        var result = [];
        for (var i = 0; i < this.elements.length; i++) {
            var matrix = this.elements[i];
            for (var j = 0; j < matrix.length; j++) {
                result.push(this.elements[i][j]);
            }
        }
        return result;
    };

    return matrix;
})();

var Vector = (function () {
    // Define the constructor.
    var vector = function () {
        this.encapsulatements = [].slice.call(arguments);
    };
    
    // A private method for checking dimensions,
    // throwing an exception when different.
    var checkDimensions = function (v1, v2) {
        if (v1.dimensions() !== v2.dimensions()) {
            throw "Vectors have different dimensions";
        }
    };

    vector.prototype.dimensions = function () {
        return this.elements.length;
    };

    vector.prototype.x = function () {
        return this.elements[0];
    };

    vector.prototype.y = function () {
        return this.elements[1];
    };

    vector.prototype.z = function () {
        return this.elements[2];
    };

    vector.prototype.w = function () {
        return this.elements[3];
    };

    vector.prototype.add = function (v) {
        var result = new Vector();

        checkDimensions(this, v);

        for (var i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] + v.elements[i];
        }

        return result;
    };

    vector.prototype.subtract = function (v) {
        var result = new Vector();

        checkDimensions(this, v);

        for (var i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] - v.elements[i];
        }

        return result;
    };

    vector.prototype.multiply = function (s) {
        var result = new Vector();

        for (var i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] * s;
        }

        return result;
    };

    vector.prototype.divide = function (s) {
        var result = new Vector();

        for (var i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] / s;
        }

        return result;
    };

    vector.prototype.dot = function (v) {
        var result = 0;

        checkDimensions(this, v);

        for (var i = 0, max = this.dimensions(); i < max; i += 1) {
            result += this.elements[i] * v.elements[i];
        }

        return result;
    };

    vector.prototype.cross = function (v) {
        if (this.dimensions() !== 3 || v.dimensions() !== 3) {
            throw "Cross product is for 3D vectors only.";
        }

        // With 3D vectors, we can just return the result directly.
        return new Vector(
            (this.y() * v.z()) - (this.z() * v.y()),
            (this.z() * v.x()) - (this.x() * v.z()),
            (this.x() * v.y()) - (this.y() * v.x())
        );
    };

    vector.prototype.magnitude = function () {
        return Math.sqrt(this.dot(this));
    };

    vector.prototype.unit = function () {
        // At this point, we can leverage our more "primitive" methods.
        return this.divide(this.magnitude());
    };

    vector.prototype.projection = function (v) {
        checkDimensions(this, v);

        // Plug and chug :)
        // The projection of u onto v is u dot the unit vector of v
        // times the unit vector of v.
        var unitv = v.unit();
        return unitv.multiply(this.dot(unitv));
    };

    return vector;
})();
