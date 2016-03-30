var expect = chai.expect;

describe("Lookup number of children", function () {
    context("when there are no child nodes", function () { 
        it("should be 0", function (done) {
            var d = new Shape(Shapes.diamond()),
                numChildren = d.children.length;
            expect(numChildren).to.eql(0);
            done();
        });
    });

    context("when a child is appended", function () {
        it("should be 1", function (done) {
            var d = new Shape(Shapes.diamond()),
                numChildren;
            d.addChild(new Shape(Shapes.diamond()));
            numChildren = d.children.length;
            expect(numChildren).to.eql(1);
            done();
        });
    });
});

describe("Lookup children", function () {
    context("when there are no child nodes", function () {
        it("should be the empty array", function (done) {
            var d = new Shape(Shapes.diamond());
            expect(d.children).to.eql([]);
            done();
        });
    });

    context("when there are appended child nodes", function () {
        it("should be an array of Shape objects", function (done) {
            var d = new Shape(Shapes.diamond()),
                s = new Shape(Shapes.sphere()),
                d2 = new Shape(Shapes.diamond()),
                c = new Shape(Shapes.cone());

            d.addChild(s);
            d.addChild(d2);
            d.addChild(c);
            expect(d.children).to.eql([ s, d2, c ]);
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
            expect(d.children).to.eql([ s, d2 ]);
            expect(d.children.length).to.eql(2);
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
            expect(d.children).to.eql([ s, c ]);
            expect(d.children.length).to.eql(2);
            done();
        });
    });
});

describe("Lookup parent", function () {
    context("when there is only one Shape object", function () {
        it("should be null", function (done) {
            var d = new Shape(Shapes.diamond());
            expect(d.parent).to.eql(null);
            done();
        });
    });

    context("when there are parent and child objects", function () {
        it("should be the parent Shape Object", function (done) {
            var d = new Shape(Shapes.diamond()),
                s = new Shape(Shapes.sphere());
            s.addChild(d);
            expect(d.parent).to.eql(s);
            done();
        })
    })
});