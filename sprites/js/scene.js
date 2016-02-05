$(function () {

    var ctx = $("#canvas")[0].getContext("2d");
    var drawScene = function () {
        ctx.save();
        ctx.translate(100, 100);
        Sprites.bb8({
            ctx: ctx,
            x: 200,
            y: 200,
            headTurn: -30
        });
        ctx.restore();

        ctx.save();
        ctx.translate(700, 50);
        ctx.scale(0.5, 0.5);
        Sprites.kyloRen({
            ctx: ctx,
            x: 300,
            y: 0,
            leftArmAngle: Math.PI / 4,
            rightArmAngle: Math.PI / 2
        });
        ctx.restore();

        ctx.save();
        ctx.translate(600, 150);
        ctx.scale(0.25, 0.25);
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