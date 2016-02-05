$(function () {

	var ctx = $("#canvas")[0].getContext("2d");
    var drawScene = function () {

    	ctx.save();
    	ctx.translate(200, 100);
    	Sprites.bb8({
    		ctx: ctx,
    		x: 200,
    		y: 200,
    		headTurn: -30
    	});
    	ctx.restore();

    	Sprites.kyloRen({
    		ctx: ctx
    	});

    	Sprites.lightsaber({
    		ctx: ctx,
    		x: 500,
    		y: 500,
    		color: "blue",
    		on: true
    	});

        window.requestAnimationFrame(drawScene);
    }
    window.requestAnimationFrame(drawScene);

}(jQuery));