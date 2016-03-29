/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
// var Shape = function (spec) {
//     this.x = spec.x;
//     this.y = spec.y;
//     this.z = spec.z;
// }

var Shape = {
    cube: function (x, y, z) {
        var X = x || 0.5,
            Y = y || 0.5,
            Z = z || 0.5;

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

    cylinder: function (radius, height) {
        var vertices = [],
            indices = [],
            r = radius || 0.5,
            h = height || 0.5;

        for (var i = 0; i < height; i+= height / 60) {
            for (var j = 0; j < Math.PI * 2; j+= Math.PI * 2 / 60) {
                vertices.push ([ Math.cos(j), Math.sin(j), i ]);
                console.log(Math.cos(j));
            }
        }

        for (var i = 0; i < vertices.length; i++) {
            if (i % 60 == 0) {
                indices.push([ i, i + 1, i + 60 ]);
            }
        }

        return {
            vertices: vertices,
            indices: indices
        }
    },

    sphere: function (radius, horizontal, vertical) {
        var vertices = [],
            indices = [],
            radius = radius || 0.5,
            vertical = vertical || 50,
            horizontal = horizontal || 50;

        for (var i = 0; i < horizontal + 1; i++) {

            var theta = i * Math.PI / horizontal,
                sinTheta = Math.sin(theta),
                cosTheta = Math.cos(theta);

            for (var j = 0; j < vertical + 1; j++) {
                var phi = j * 2 * Math.PI / vertical,
                    x = radius * Math.cos(phi) * sinTheta,
                    y = radius * cosTheta,
                    z = radius * Math.sin(phi) * sinTheta;

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
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};
