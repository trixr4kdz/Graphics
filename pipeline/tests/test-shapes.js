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
            expect(d.getChildren()).to.eql([]);
            done();
        });
    });

    context("when there are appended child nodes", function () {
        it("returns an array of Shape objects", function (done) {
            var d = new Shape(Shapes.diamond());
            d.addChild(new Shape(Shapes.sphere()));
            d.addChild(new Shape(Shapes.diamond()));
            d.addChild(new Shape(Shapes.cone()));
            expect(d.getChildren()).to.eql([
                new Shape(Shapes.sphere()), 
                new Shape(Shapes.diamond()), 
                new Shape(Shapes.cone())
            ]);
            done();
        });
    });
});

describe("removeChild", function () {
    context("when there are no child nodes", function () {
        it("throws something?", function (done) {
        //     var d = new Shape(Shapes.diamond());
        //     console.log(d.getChildren());
        //     expect(d.getChildren()).to.eql([]);
            done();
        });
    });

    context("when there is no index provided", function () {
        it("removes the last object appended", function (done) {
            var d = new Shape(Shapes.diamond());
            d.addChild(new Shape(Shapes.sphere()));
            d.addChild(new Shape(Shapes.diamond()));
            d.addChild(new Shape(Shapes.cone()));
            d.removeChild(1);
            expect(d.getChildren()).to.eql([
                new Shape(Shapes.sphere()), 
                new Shape(Shapes.cone()), 
            ]);
            expect(d.getNumChildren()).to.eql(2);
            done();
        });
    });

    context("when there is an index provided", function () {
        it("removes the object at that index", function (done) {
            var d = new Shape(Shapes.diamond());
            d.addChild(new Shape(Shapes.sphere()));
            d.addChild(new Shape(Shapes.diamond()));
            d.addChild(new Shape(Shapes.cone()));
            d.removeChild();
            expect(d.getChildren()).to.eql([
                new Shape(Shapes.sphere()), 
                new Shape(Shapes.diamond()), 
            ]);
            expect(d.getNumChildren()).to.eql(2);
            done();
        });
    });
});