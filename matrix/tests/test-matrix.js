var expect = chai.expect;

describe("Matrix object constructor", function () {
    it("successfully creates the 4x4 identity matrix", function (done) {
        var m = new Matrix();
        expect(m.elements).to.eql([
            [ 1, 0, 0, 0 ],
            [ 0, 1, 0, 0 ],
            [ 0, 0, 1, 0 ],
            [ 0, 0, 0, 1 ]
        ]);
        done();
    });

    it("successfully creates an arbitrary 4x4 matrix", function (done) {
        var m = new Matrix(
            [ 1, 2, 3, 4 ],
            [ 2, 3, 4, 5 ],
            [ 3, 4, 5, 6 ],
            [ 4, 5, 6, 7 ]
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

describe("multiply()", function () {
    it("successfully multiplies identity matrix with arbitrary matrix", function (done) {
        var m1 = new Matrix(
            [ 1, 2, 3, 4 ],
            [ 4, 3, 2, 1 ],
            [ 2, 1, 3, 4 ],
            [ 4, 2, 1, 3 ]
        );
        var m2 = new Matrix();
        var result = m1.multiply(m2);
        expect(result.elements).to.eql([
            [ 1, 2, 3, 4 ],
            [ 4, 3, 2, 1 ],
            [ 2, 1, 3, 4 ],
            [ 4, 2, 1, 3 ]
        ]);
        done();
    });
    it("successfully multiplies 2 arbitrary matrices", function (done) {
        var m1 = new Matrix(
            [ 1, 2, 3, 4 ],
            [ 4, 3, 2, 1 ],
            [ 2, 1, 3, 4 ],
            [ 4, 2, 1, 3 ]
        );
        var m2 = new Matrix(
            [ 4, 5, 6, 7 ],
            [ 7, 6, 5, 4 ],
            [ 7, 4, 6, 5 ],
            [ 4, 7, 6, 5 ]
        );
        var result = m1.multiply(m2);
        expect(result.elements).to.eql([
            [ 55, 57, 58, 50 ],
            [ 55, 53, 57, 55 ],
            [ 52, 56, 59, 53 ],
            [ 49, 57, 58, 56 ]
        ]);
        done();
    });
});


describe("getRotationMatrix()", function () {
    it("returns the identity matrix when x = y = z = 0", function (done) {
        var m = new Matrix().getRotationMatrix(45, 0, 0, 0);
        expect(m.elements).to.eql(new Matrix().elements);
        done();
    });
    it("successfully returns the rotation matrix when only x = 1", function (done) {
        var m = new Matrix(),
            rotated = m.getRotationMatrix(45, 1, 0, 0),
            sqrtTwoOverTwo = Math.sqrt(2) / 2,
            errorMargin = 0.000000000000001;

        expect(rotated.elements[0]).to.eql([ 1.0, 0.0, 0.0, 0.0 ]);
        expect(rotated.elements[3]).to.eql([ 0.0, 0.0, 0.0, 1.0 ]);

        expect(rotated.elements[1][0]).to.eql(0.0);
        expect(rotated.elements[1][1]).to.be.closeTo(sqrtTwoOverTwo, errorMargin);
        expect(rotated.elements[1][2]).to.be.closeTo(-sqrtTwoOverTwo, errorMargin);
        expect(rotated.elements[1][3]).to.eql(0.0);

        expect(rotated.elements[2][0]).to.eql(0.0);
        expect(rotated.elements[2][1]).to.be.closeTo(sqrtTwoOverTwo, errorMargin);
        expect(rotated.elements[2][2]).to.be.closeTo(sqrtTwoOverTwo, errorMargin);
        expect(rotated.elements[2][3]).to.eql(0.0);

        done();
    });
    it("successfully returns the rotation matrix when only y = 1", function (done) {
        var m = new Matrix().getRotationMatrix(30, 0, 1, 0),
            sqrtThreeOverTwo = Math.sqrt(3) / 2,
            errorMargin = 0.000000000000001;

        expect(m.elements[1]).to.eql([ 0.0, 1.0, 0.0, 0.0 ]);
        expect(m.elements[3]).to.eql([ 0.0, 0.0, 0.0, 1.0 ]);

        expect(m.elements[0][0]).to.be.closeTo(sqrtThreeOverTwo, errorMargin);
        expect(m.elements[0][1]).to.eql(0.0);
        expect(m.elements[0][2]).to.be.closeTo(0.5, errorMargin);
        expect(m.elements[0][3]).to.eql(0.0);

        expect(m.elements[2][0]).to.be.closeTo(-0.5, errorMargin);
        expect(m.elements[2][1]).to.eql(0.0);
        expect(m.elements[2][2]).to.be.closeTo(sqrtThreeOverTwo, errorMargin);
        expect(m.elements[2][3]).to.eql(0.0);

        done();
    });
    it("successfully returns the rotation matrix when only z = 1", function (done) {
        var m = new Matrix().getRotationMatrix(90, 0, 0, 1),
            errorMargin = 0.000000000000001;

        expect(m.elements[2]).to.eql([ 0.0, 0.0, 1.0, 0.0 ]);
        expect(m.elements[3]).to.eql([ 0.0, 0.0, 0.0, 1.0 ]);

        expect(m.elements[0][0]).to.be.closeTo(0.0, errorMargin);
        expect(m.elements[0][1]).to.eql(-1.0);
        expect(m.elements[0][2]).to.eql(0.0);
        expect(m.elements[0][3]).to.eql(0.0);

        expect(m.elements[1][0]).to.eql(1.0);
        expect(m.elements[1][1]).to.be.closeTo(0.0, errorMargin);
        expect(m.elements[1][2]).to.eql(0.0);
        expect(m.elements[1][3]).to.eql(0.0);

        done();
    });
});

describe("getTranslationMatrix()", function () {
    it("successfully returns the translation matrix", function (done) {
        var m = new Matrix(),
            translated = m.getTranslationMatrix(1, 2, 3);

        expect(translated.elements).to.eql([
            [ 1, 0, 0, 1 ],
            [ 0, 1, 0, 2 ],
            [ 0, 0, 1, 3 ],
            [ 0, 0, 0, 1 ]
        ]);
        done();
    });
});

describe("getScalingMatrix()", function () {
    it("successfully returns the scaling matrix", function (done) {
        var m = new Matrix(),
            scaled = m.getScalingMatrix(1, 2, 3);

        expect(scaled.elements).to.eql([
            [ 1, 0, 0, 0 ],
            [ 0, 2, 0, 0 ],
            [ 0, 0, 3, 0 ],
            [ 0, 0, 0, 1 ]
        ]);
        done();
    });
});

describe("getPerspectMatrix()", function () {
    it("successfully returns the correct frustum matrix", function (done) {
        var m = (new Matrix()).getPerspectMatrix(1, 6, 1, 6, 1, 6);
        expect(m).to.eql(new Matrix(
            [ 2.0 / 5.0, 0.0, 7.0 / 5.0, 0.0 ],
            [ 0.0, 2.0 / 5.0, 7.0 / 5.0, 0.0 ],
            [ 0.0, 0.0, -7.0 / 5.0, -2.0 * 6.0 / 5.0 ],
            [ 0.0, 0.0, -1.0, 0.0 ]
        ));
        done();
    });
});

describe("getOrthoMatrix", function () {
    it("successfully returns the correct orthogonal matrix", function (done) {
        var m = new Matrix();
        var result = m.getOrthoMatrix(1, 6, 1, 6, 1, 6);
        expect(result).to.eql(new Matrix(
            [ 2.0 / 5.0, 0, 0, -7.0 / 5.0 ],
            [ 0.0, 2 / 5.0, 0, -7.0 / 5.0 ],
            [ 0.0, 0.0, -2.0 / 5.0, -7.0 / 5.0 ],
            [ 0.0, 0.0, 0.0, 1.0 ]
        ));
        done();
    });
});

describe("convert()", function () {
    it("successfully creates a 16x1 array from an arbitrary matrix for WebGL consumption", function (done) {
        var m = new Matrix(
            [ 1, 3, 1, 4 ],
            [ 2, 3, 4, 5 ],
            [ 3, 4, 5, 6 ],
            [ 4, 5, 6, 7 ]
        );
        expect(m.convert()).to.eql([
            1, 2, 3, 4,
            3, 3, 4, 5,
            1, 4, 5, 6,
            4, 5, 6, 7
        ]);
        done();
    });

    it("successfully changes a perspective projection matrix into 16x1 array for WebGL consumption", function () {
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