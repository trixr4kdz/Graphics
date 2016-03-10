$(function () {

    var ctx = $("#canvas")[0].getContext("2d");
    var drawScene = function () {
        ctx.save();
        ctx.translate(300, 300);
        Sprites.bb8({
            ctx: ctx,
            headTurn: -30
        });
        ctx.restore();

        ctx.save();
        ctx.translate(700, 50);
        ctx.scale(0.5, 0.5);
        Sprites.kyloRen({
            ctx: ctx,
            leftArmAngle: Math.PI / 4,
            rightArmAngle: Math.PI / 2
        });
        ctx.restore();

        ctx.save();
        ctx.translate(575, 275);
        ctx.scale(0.25, 0.25);
        Sprites.lightsaber({
            ctx: ctx,
            on: true
        });
        ctx.restore();

        window.requestAnimationFrame(drawScene);
    }
    window.requestAnimationFrame(drawScene);

}(jQuery));