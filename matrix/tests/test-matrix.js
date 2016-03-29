var expect = chai.expect;

describe("Constructing a default matrix", function () {
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
});

// describe("Constructing a 4x4 matrix", function () {
//     it("successfully creates the 4x4 matrix with specified elements", function (done) {
//         var m = new Matrix(
//             [1, 2, 3, 4],
//             [2, 3, 4, 5],
//             [3, 4, 5, 6],
//             [4, 5, 6, 7]
//         );
//         expect(m.elements).to.eql([
//             [1, 2, 3, 4],
//             [2, 3, 4, 5],
//             [3, 4, 5, 6],
//             [4, 5, 6, 7]
//         ]);
//         done();
//     });
// });

describe("Matrix multiplication", function () {
    it("successfully multiplies 2 matrices", function (done) {
        var m1 = new Matrix();
        var m2 = new Matrix();
        var result = m1.multiply(m2);
        expect(result.elements).to.eql([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
        done();
    });
});


describe("Rotating", function () {
    it("successfully rotates the matrix", function (done) {
        var m = new Matrix();
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
        var m = new Matrix();
        expect(m.convert()).to.eql([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        done();
    })
})

