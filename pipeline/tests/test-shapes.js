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
            var d = new Shape(Shapes.diamond()),
                s = new Shape(Shapes.sphere()),
                d2 = new Shape(Shapes.diamond()),
                c = new Shape(Shapes.cone());

            d.addChild(s);
            d.addChild(d2);
            d.addChild(c);
            expect(d.getChildren()).to.eql([ s, d2, c ]);
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
            var d = new Shape(Shapes.diamond()),
                s = new Shape(Shapes.sphere()),
                d2 = new Shape(Shapes.diamond()),
                c = new Shape(Shapes.cone());
            d.addChild(s);
            d.addChild(d2);
            d.addChild(c);
            d.removeChild();
            expect(d.getChildren()).to.eql([ s, d2 ]);
            expect(d.getNumChildren()).to.eql(2);
            done();
        });
    });

    context("when there is an index provided", function () {
        it("removes the object at that index", function (done) {
            var d = new Shape(Shapes.diamond()),
                s = new Shape(Shapes.sphere()),
                d2 = new Shape(Shapes.diamond()),
                c = new Shape(Shapes.cone());
            d.addChild(s);
            d.addChild(d2);
            d.addChild(c);
            d.removeChild(1);
            expect(d.getChildren()).to.eql([ s, c ]);
            expect(d.getNumChildren()).to.eql(2);
            done();
        });
    });
});

describe("getParent", function () {
    context("when there is only one Shape object", function () {
        it("returns null", function (done) {
            var d = new Shape(Shapes.diamond());
            expect(d.getParent()).to.eql(null);
            done();
        });
    });

    context("when there are parent and child objects", function () {
        it("returns the parent Shape Object", function (done) {
            var d = new Shape(Shapes.diamond()),
                s = new Shape(Shapes.sphere());
            s.addChild(d);
            expect(d.getParent()).to.eql(s);
            done();
        })
    })
});