/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shape = function (shape, color) {
    this.color = color || {r: 0, g: 0, b: 0};
    this.vertices = shape.vertices;
    this.indices = shape.indices;
    this.children = [];
    this.parent = null;
};

Shape.prototype.toRawTriangleArray = function () {
    var result = [];

    for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
        for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
            result = result.concat(
                this.vertices[
                    this.indices[i][j]
                ]
            );
        }
    }

    return result;
};

Shape.prototype.toRawLineArray = function () {
    var result = [];

    for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
        for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
            result = result.concat(
                this.vertices[
                    this.indices[i][j]
                ],

                this.vertices[
                    this.indices[i][(j + 1) % maxj]
                ]
            );
        }
    }

    return result;
};

Shape.prototype.addChild = function (child) {
    this.children.push(child);
    child.parent = this;
};

Shape.prototype.removeChild = function (shape) {
    shape ? this.children.splice(this.children.indexOf(shape), 1) : this.children.pop();
};

Shape.prototype.toNormalArray = function () {
    var result = [],
        i,
        j,
        maxi,
        maxj,
        p0,
        p1,
        p2,
        v0,
        v1,
        v2,
        normal;

    for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
        // We form vectors from the first and second then second and third vertices.
        p0 = this.vertices[this.indices[i][0]];
        p1 = this.vertices[this.indices[i][1]];
        p2 = this.vertices[this.indices[i][2]];

        // Technically, the first value is not a vector, but v can stand for vertex
        // anyway, so...
        v0 = new Vector(p0[0], p0[1], p0[2]);
        v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
        v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
        normal = v1.cross(v2).unit();

        // We then use this same normal for every vertex in this face.
        for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
            result = result.concat(
                [ normal.x(), normal.y(), normal.z() ]
            );
        }
    }

    return result;
};

var Shapes = {
    cube: function () {
        var X = 0.5,
            Y = 0.5,
            Z = 0.5;

        return {
            vertices: [
                [ X, Y, Z ],
                [ X, -Y, Z ],
                [ X, Y, -Z ],
                [ X, -Y, -Z ],
                [ -X, Y, Z ],
                [ -X, -Y, Z ],
                [ -X, Y, -Z ],
                [ -X, -Y, -Z ]
            ],

            indices: [
                [ 0, 1, 3 ],
                [ 0, 2, 3 ],
                [ 1, 5, 4 ],
                [ 1, 0, 4 ],
                [ 0, 2, 6 ],
                [ 0, 4, 6 ],
                [ 1, 3, 7 ],
                [ 1, 5, 7 ],
                [ 4, 5, 7 ],
                [ 4, 6, 7 ],
                [ 2, 3, 7 ],
                [ 2, 6, 7 ]
            ]
        };
    },

    diamond: function (x, y, z) {
        var X = x || 0.5,
            Y = y || 0.5,
            Z = z || 0.5;

        return {
            vertices: [
                [ 0.0, 0.0, Z ],
                [ 0.0, 0.0, -Z ],
                [ X, Y, 0.0 ],
                [ X, -Y, 0.0 ],
                [ -X, Y, 0.0 ],
                [ -X, -Y, 0.0 ]
            ],

            indices: [
                [ 2, 0, 3 ],
                [ 2, 1, 3 ],
                [ 2, 0, 4 ],
                [ 2, 1, 4 ],
                [ 3, 0, 5 ],
                [ 3, 1, 5 ],
                [ 5, 0, 4 ],
                [ 5, 1, 4 ]
            ]
        }
    }, 

    sphere: function (radius, horizontal, vertical) {
        var vertices = [],
            indices = [],
            radius = radius || 0.5,
            vertical = vertical || 30,
            horizontal = horizontal || 30;

        for (var i = 0; i < horizontal + 1; i++) {

            var h = i * Math.PI / horizontal,
                sin = Math.sin(h),
                cos = Math.cos(h);

            for (var j = 0; j < vertical + 1; j++) {
                var v = j * 2 * Math.PI / vertical,
                    x = radius * Math.cos(v) * sin,
                    y = radius * cos,
                    z = radius * Math.sin(v) * sin;

                vertices.push([x, y, z]);
            }
        }

        for (var i = 0; i < horizontal; i++) {
            for (var j = 0; j < vertical; j++) {
                var top = i * (vertical + 1) + j,
                    bottom = top + vertical + 1;

                indices.push([top, bottom, top + 1]);
                indices.push([bottom, bottom + 1, top + 1]);
            }
        }

        return {
            vertices: vertices,
            indices: indices
        }
    },

    cone: function (faces) {
        var RADIUS = 0.5,
            CONE_BASE = -0.5,
            vertices = [ 
                [0, 0.5, 0]
            ],
            indices = [],
            thetaDelta = 2 * Math.PI / faces,
            currentTheta = 0.0,
            faces = faces || 8;

        for (var i = 0; i < faces; i++) {
            vertices.push([
                RADIUS * Math.cos(currentTheta),
                CONE_BASE,
                RADIUS * Math.sin(currentTheta)
            ]);
            currentTheta += thetaDelta;
        }

        for (var i = 0; i < faces; i++) {
            indices.push([0, (i + 1) % faces, (i + 2) % faces]);
        }

        return {
            vertices: vertices,
            indices: indices
        }
    }, 

    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606;
        var Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    }

};
