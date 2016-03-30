var expect = chai.expect;

describe("getNumChildren", function () {
    context("when there are no child nodes", function () { 
        it("returns the number of children of a Shape object as 0", function (done) {
            var d = new Shape(Shapes.diamond()),
                numChildren = d.getNumChildren();
            expect(numChildren).to.eql(0);
            done();
        });
    });

    context("when a child is appended", function () {
        it("returns 1 for the number of children", function (done) {
            var d = new Shape(Shapes.diamond()),
                numChildren;
            d.addChild(new Shape(Shapes.diamond()));
            numChildren = d.getNumChildren();
            expect(numChildren).to.eql(1);
            done();
        });
    });
});

describe("getChildren", function () {
    context("when there are no child nodes", function () {
        it("returns an empty array", function (done) {
            var d = new Shape(Shapes.diamond());
            d.addChild(new Shape(Shapes.sphere()));
            d.addChild(new Shape(Shapes.diamond()));
            d.addChild(new Shape(Shapes.cone()));
            expect(d.getChildren).to.eql([
                
            ]);
        })
    })
})