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

    	ctx.save();
    	ctx.translate(300, 0);
    	Sprites.kyloRen({
    		ctx: ctx,
    		x: 300,
    		y: 0
    	});
    	ctx.restore();

    	ctx.save();
    	Sprites.lightsaber({
    		ctx: ctx,
    		x: 500,
    		y: 500,
    		color: "blue",
    		on: true
    	});
    	ctx.restore();

        window.requestAnimationFrame(drawScene);
    }
    window.requestAnimationFrame(drawScene);

}(jQuery));