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

    sphere: function () {
        var vertices = [],
            indices = [],
            radius = 0.5,
            vertical = 0.5,
            horizontal = 0.5;

        for (var i = 0; i < vertical; i++) {

            // hDelta = [(rightColor[0] - leftColor[0]) / (2 * r),
            //           (rightColor[1] - leftColor[1]) / (2 * r),
            //           (rightColor[2] - leftColor[2]) / (2 * r)];

            for (var j = 0; j < Math.PI * 2; j += 0.1) {
                var dist = Math.sqrt(Math.pow(Math.sin(j), 2) + Math.pow(Math.cos(j), 2));
                if (dist <= radius) {
                    vertices.push([radius, j, i]);
                }
                // var dist = Math.sqrt(Math.pow(xc - j, 2) + Math.pow(yc - i, 2));
                // if (dist <= radius) {
                //     module.setPixel(context, j, i,
                //             currentColor[0],
                //             currentColor[1],
                //             currentColor[2]);

                //     currentColor[0] += hDelta[0];
                //     currentColor[1] += hDelta[1];
                //     currentColor[2] += hDelta[2];

                //     vertices.push();
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
