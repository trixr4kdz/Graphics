var expect = chai.expect;

describe("getNumChildren", function () {
    it("returns the number of children of a Shape object", function (done) {

        var d = new Shape(Shapes.diamond()),
            numChildren = d.getNumChildren();
        expect(numChildren).to.eql(0);
        done();
    })
})