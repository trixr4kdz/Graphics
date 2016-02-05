$(function () {

    window.Sprites = window.Sprites || { };

    Sprites.bb8 = function (specs) {
        var BODY_RADIUS = 100;
        var HEAD_OFFSET = 90;
        var HEAD_RADIUS = BODY_RADIUS / 1.5;
        var CENTER_CIRCLE_RADIUS = HEAD_RADIUS * 1.25;

        var ctx = specs.ctx;
        var headTurn = specs.headTurn || 0;
        var bodyTurn = specs.bodyTurn || 0;
        var color = specs.color || "rgb(255, 120, 0)";
        var xBody = specs.x;
        var yBody = specs.y;
        var bodyGradient = ctx.createRadialGradient(500, 250, 40, 250, 250, 400);
        var headGradient = ctx.createRadialGradient(500, 200, 60, 300, 100, 450);

        bodyGradient.addColorStop(0, "white");
        bodyGradient.addColorStop(1, "gray");

        headGradient.addColorStop(0, "white");
        headGradient.addColorStop(1, "gray");

        var render = function () {
            ctx.fillStyle = bodyGradient;
            ctx.beginPath();
            ctx.arc(xBody, yBody, BODY_RADIUS, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();

            drawCenterCross(ctx, xBody, yBody + (CENTER_CIRCLE_RADIUS), xBody, yBody - (CENTER_CIRCLE_RADIUS))
            drawCenterCross(ctx, xBody - CENTER_CIRCLE_RADIUS, yBody, xBody + CENTER_CIRCLE_RADIUS, yBody);

            ctx.fillStyle = headGradient;
            ctx.beginPath();
            ctx.save();
            ctx.scale(0.8, 1);
            ctx.arc(xBody * 5 / 4, (yBody - HEAD_OFFSET - 5), HEAD_RADIUS, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            drawInnerCircles(ctx, "black", 15, xBody, yBody - HEAD_OFFSET - 45);
            drawInnerCircles(ctx, "black", 5, xBody + 20, yBody - HEAD_OFFSET - 25);
            drawInnerCircles(ctx, color, HEAD_RADIUS * .80, xBody, yBody);
            drawInnerCircles(ctx, "white", HEAD_RADIUS / 1.75, xBody, yBody);

            ctx.fillStyle = color;
            // parameterize this
            // x = xBody, y = yBody, xOffset, yOffset 
            ctx.beginPath();
            ctx.moveTo(xBody + BODY_RADIUS * 0.8, yBody + BODY_RADIUS * .6);
            ctx.lineTo(xBody + BODY_RADIUS * 0.8, yBody - BODY_RADIUS * 0.6);
            ctx.lineTo(xBody + BODY_RADIUS * 0.8 + 10, yBody - BODY_RADIUS * .6 + 16);
            ctx.lineTo(xBody + BODY_RADIUS * 0.8 + 10, yBody + BODY_RADIUS * 0.6 - 16);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath()
            ctx.moveTo(xBody - BODY_RADIUS * 0.8, yBody + BODY_RADIUS * 0.6);
            ctx.lineTo(xBody - BODY_RADIUS * 0.8, yBody - BODY_RADIUS * 0.6);
            ctx.lineTo(xBody - BODY_RADIUS * 0.8 - 10, yBody - BODY_RADIUS * .6 + 16);
            ctx.lineTo(xBody - BODY_RADIUS * 0.8 - 10, yBody + BODY_RADIUS * 0.6 - 16);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath()
            ctx.moveTo(xBody - BODY_RADIUS * 0.6, yBody + BODY_RADIUS * 0.8);
            ctx.lineTo(xBody + BODY_RADIUS * 0.6, yBody + BODY_RADIUS * 0.8);
            ctx.lineTo(xBody + BODY_RADIUS * 0.6 - 16, yBody + BODY_RADIUS * 0.8 + 10);
            ctx.lineTo(xBody - BODY_RADIUS * 0.6 + 16, yBody + BODY_RADIUS * 0.8 + 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath()
            ctx.moveTo(xBody - BODY_RADIUS * 0.6, yBody - BODY_RADIUS * 0.8);
            ctx.lineTo(xBody + BODY_RADIUS * 0.6, yBody - BODY_RADIUS * 0.8);
            ctx.lineTo(xBody + BODY_RADIUS * 0.6 - 16, yBody - BODY_RADIUS * 0.8 - 10);
            ctx.lineTo(xBody - BODY_RADIUS * 0.6 + 16, yBody - BODY_RADIUS * 0.8 - 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        render();
    }

    var drawInnerCircles = function (ctx, fillStyle, radius, x, y) {
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    var drawCenterCross = function (ctx, x0, y0, x1, y1) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    }

    // var drawOuterCircles = function (x, y, xOffset0, yOffset0, xOffset1, yOffset1) {
    //     ctx.beginPath()
    //     ctx.moveTo(x + xOffset0, y + yOffset0 * scale);
    //     ctx.lineTo(x + xOffset0, y - yOffset0 * scale);
    //     ctx.lineTo(x + xOffset0 + xOffset1, y - yOffset0 * scale + yOffset1);
    //     ctx.lineTo(x + xOffset0 + xOffset1, y + yOffset0 * scale - yOffset1);
    //     ctx.closePath();
    //     ctx.fill();
    //     ctx.stroke();
    // }

    ctx.beginPath();
    ctx.moveTo(xBody + BODY_RADIUS * 0.8, yBody + BODY_RADIUS * .6);
    ctx.lineTo(xBody + BODY_RADIUS * 0.8, yBody - BODY_RADIUS * 0.6);
    ctx.lineTo(xBody + BODY_RADIUS * 0.8 + 10, yBody - BODY_RADIUS * .6 + 16);
    ctx.lineTo(xBody + BODY_RADIUS * 0.8 + 10, yBody + BODY_RADIUS * 0.6 - 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

}(jQuery));
