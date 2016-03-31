var expect = chai.expect;

describe("Constructing a matrix", function () {
    it("successfully creates the 4x4 identity matrix", function (done) {
        var m = new Matrix();
        expect(m.elements).to.eql([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
        done();
    });

    it("successfully creates an arbitrary 4x4 matrix", function (done) {
        var m = new Matrix(
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [3, 4, 5, 6],
            [4, 5, 6, 7]
        );
        expect(m.elements).to.eql([
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [3, 4, 5, 6],
            [4, 5, 6, 7]
        ]);
        done();
    })
});

describe("Matrix multiplication", function () {
    it("successfully multiplies identity matrix with arbitrary matrix", function (done) {
        var m1 = new Matrix(
            [1, 2, 3, 4],
            [4, 3, 2, 1],
            [2, 1, 3, 4],
            [4, 2, 1, 3]
        );
        var m2 = new Matrix();
        var result = m1.multiply(m2);
        expect(result.elements).to.eql([
            [1, 2, 3, 4],
            [4, 3, 2, 1],
            [2, 1, 3, 4],
            [4, 2, 1, 3]
        ]);
        done();
    });
    it("successfully multiplies 2 arbitrary matrices", function (done) {
        var m1 = new Matrix(
            [1, 2, 3, 4],
            [4, 3, 2, 1],
            [2, 1, 3, 4],
            [4, 2, 1, 3]
        );
        var m2 = new Matrix(
            [4, 5, 6, 7],
            [7, 6, 5, 4],
            [7, 4, 6, 5],
            [4, 7, 6, 5]
        );
        var result = m1.multiply(m2);
        expect(result.elements).to.eql([
            [55, 57, 58, 50],
            [55, 53, 57, 55],
            [52, 56, 59, 53],
            [49, 57, 58, 56]
        ]);
        done();
    });
});


describe("Rotating", function () {
    it("successfully rotates the matrix", function (done) {
        var m = new Matrix(),
            rotated = m.getTranslationMatrix(45, 1, 2, 3);
        done();
    });
});

describe("Translating", function () {
    it("successfully translates the matrix", function (done) {
        var m = new Matrix(),
            translated = m.getTranslationMatrix(1, 2, 3);

        expect(translated.elements).to.eql([
            [1, 0, 0, 1],
            [0, 1, 0, 2],
            [0, 0, 1, 3],
            [0, 0, 0, 1]
        ]);
        done();
    });
});

describe("Scaling", function () {
    it("successfully scales the matrix", function (done) {
        var m = new Matrix(),
            scaled = m.getScalingMatrix(1, 2, 3);

        expect(scaled.elements).to.eql([
            [1, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 3, 0],
            [0, 0, 0, 1]
        ]);
        done();
    });
});

describe("Conversion for WebGL consumption", function () {
    it("successfully creates a 16x1 vector", function (done) {
        var m = new Matrix(
            [1, 3, 1, 4],
            [2, 3, 4, 5],
            [3, 4, 5, 6],
            [4, 5, 6, 7]
        );
        expect(m.convert()).to.eql([
            1, 2, 3, 4,
            3, 3, 4, 5,
            1, 4, 5, 6,
            4, 5, 6, 7
        ]);
        done();
    });

    it("successfully changes a perspective projection matrix into 16x1", function () {
        var m = (new Matrix()).getPerspectMatrix(1, 6, 1, 6, 1, 6).convert();
        expect(m).to.eql([
            2.0 / 5.0,
            0.0, 
            0.0,
            0.0,

            0.0, 
            2.0 / 5.0, 
            0.0, 
            0.0,

            7.0 / 5.0, 
            7.0 / 5.0, 
            -7.0 / 5.0, 
            -1.0,

            0.0, 
            0.0, 
            -2.0 * 6.0 / 5.0, 
            0.0
        ]);
    })
});

describe("Perspective projection", function () {
    it("successfully returns the correct matrix for the projection", function (done) {
        var m = (new Matrix()).getPerspectMatrix(1, 6, 1, 6, 1, 6);
        expect(m).to.eql(new Matrix(
            [2.0 / 5.0, 0.0, 7.0 / 5.0, 0.0],
            [0.0, 2.0 / 5.0, 7.0 / 5.0, 0.0],
            [0.0, 0.0, -7.0 / 5.0, -2.0 * 6.0 / 5.0],
            [0.0, 0.0, -1.0, 0.0]
        ));
        done();
    });
});

describe("Orthographic projection", function () {
    it("successfully returns the correct matrix for the projection", function (done) {
        var m = new Matrix();
        var result = m.getOrthoMatrix(1, 6, 1, 6, 1, 6);
        expect(result).to.eql(new Matrix(
            [2.0 / 5.0, 0, 0, -7.0 / 5.0],
            [0.0, 2 / 5.0, 0, -7.0 / 5.0],
            [0.0, 0.0, -2.0 / 5.0, -7.0 / 5.0],
            [0.0, 0.0, 0.0, 1.0]
        ));
        done();
    });
});
