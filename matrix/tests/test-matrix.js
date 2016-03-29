var expect = chai.expect;

describe("Constructing a matrix", function () {
    it("successfully creates the default 4x4 matrix", function (done) {
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
        done();
    });
});

describe("Translating", function () {
    it("successfully translates the matrix", function (done) {
        done();
    });
});

describe("Scaling", function () {
    it("successfully scales the matrix", function (done) {
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

