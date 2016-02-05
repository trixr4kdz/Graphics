$(function () {

	var ctx = $("#canvas")[0].getContext("2d");
    var drawScene = function () {

    	// ctx.save();
    	// ctx.translate(100, 0);
    	Sprites.bb8({
    		ctx: ctx
    	});

    	Sprites.kyloRen({
    		ctx: ctx
    	});

    	Sprites.lightsaber({
    		ctx: ctx
    	})

        Sprites.bb8();
        Sprites.kyloRen();
        Sprites.lightsaber();

        window.requestAnimationFrame(drawScene);
    }
    window.requestAnimationFrame(drawScene);

}(jQuery));