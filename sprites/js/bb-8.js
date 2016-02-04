$(function () {

    window.Sprites = window.Sprites || { };

    Sprites.bb8 = function () {

        // var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var bodyGradient = ctx.createRadialGradient(500, 250, 40, 250, 250, 400);
        var headGradient = ctx.createRadialGradient(500, 200, 40, 300, 100, 450)

        bodyGradient.addColorStop(0, "white");
        bodyGradient.addColorStop(1, "gray");

        headGradient.addColorStop(0, "white");
        headGradient.addColorStop(1, "gray");

        var data = {};

        var render = function () {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var bodyRadius = 100;
            var xBody = 512;
            var yBody = 300;

            var headOffset = 90;
            var headRadius = bodyRadius / 1.5;
            var centerCircleRadius = headRadius * 0.75;
            var bbOrange = "rgb(255, 120, 0)";
            
            ctx.fillStyle = bodyGradient;
            ctx.beginPath();
            ctx.arc(xBody, yBody, bodyRadius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();

            drawCenterCross(ctx, xBody, yBody + (centerCircleRadius * 2 * 0.8), xBody, yBody - (centerCircleRadius * 2 * 0.8))
            drawCenterCross(ctx, xBody - centerCircleRadius * 2 * 0.8, yBody, xBody + centerCircleRadius * 2 * 0.8, yBody);

            // ctx.beginPath();
            // ctx.fillRect();

            ctx.fillStyle = headGradient;
            ctx.beginPath();
            ctx.save();
            ctx.scale(0.8, 1);
            ctx.arc(xBody * 5 / 4, (yBody - headOffset - 5), headRadius, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            drawInnerCircles(ctx, "black", 15, xBody, yBody - headOffset - 45);
            drawInnerCircles(ctx, "black", 5, xBody + 20, yBody - headOffset - 25);
            drawInnerCircles(ctx, bbOrange, headRadius * .80, xBody, yBody);
            drawInnerCircles(ctx, "white", headRadius / 1.75, xBody, yBody);

            // ctx.fillStyle = bbOrange;
            // ctx.beginPath();
            // ctx.fillRect(xBody, yBody - headRadius / 1.75, 10, 2 * headRadius / 1.75);

            ctx.fillStyle = bbOrange;

            // parameterize this
            // x = xBody, y = yBody, xOffset, yOffset 
            ctx.beginPath();
            ctx.moveTo(xBody + bodyRadius * 0.8, yBody + bodyRadius * .6);
            ctx.lineTo(xBody + bodyRadius * 0.8, yBody - bodyRadius * 0.6);
            ctx.lineTo(xBody + bodyRadius * 0.8 + 10, yBody - bodyRadius * .6 + 16);
            ctx.lineTo(xBody + bodyRadius * 0.8 + 10, yBody + bodyRadius * 0.6 - 16);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath()
            ctx.moveTo(xBody - bodyRadius * 0.8, yBody + bodyRadius * 0.6);
            ctx.lineTo(xBody - bodyRadius * 0.8, yBody - bodyRadius * 0.6);
            ctx.lineTo(xBody - bodyRadius * 0.8 - 10, yBody - bodyRadius * .6 + 16);
            ctx.lineTo(xBody - bodyRadius * 0.8 - 10, yBody + bodyRadius * 0.6 - 16);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath()
            ctx.moveTo(xBody - bodyRadius * 0.6, yBody + bodyRadius * 0.8);
            ctx.lineTo(xBody + bodyRadius * 0.6, yBody + bodyRadius * 0.8);
            ctx.lineTo(xBody + bodyRadius * 0.6 - 16, yBody + bodyRadius * 0.8 + 10);
            ctx.lineTo(xBody - bodyRadius * 0.6 + 16, yBody + bodyRadius * 0.8 + 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath()
            ctx.moveTo(xBody - bodyRadius * 0.6, yBody - bodyRadius * 0.8);
            ctx.lineTo(xBody + bodyRadius * 0.6, yBody - bodyRadius * 0.8);
            ctx.lineTo(xBody + bodyRadius * 0.6 - 16, yBody - bodyRadius * 0.8 - 10);
            ctx.lineTo(xBody - bodyRadius * 0.6 + 16, yBody - bodyRadius * 0.8 - 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            console.log("xBody " + xBody);
            console.log("yBody " + yBody);

            // window.requestAnimationFrame(render);
        }

        // window.requestAnimationFrame(render);
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
    //     ctx.moveTo(x + xOffset, y + bodyRadius * scale);
    //     ctx.lineTo(x + xOffset, y - bodyRadius * scale);
    //     ctx.lineTo(x + xOffset + offset, y - bodyRadius * scale + offset);
    //     ctx.lineTo(x + xOffset + offset, y + bodyRadius * scale - offset);
    //     ctx.closePath();
    //     ctx.fill();
    //     ctx.stroke();
    // }

    // Use cos wave for scaling bb-8 turning sideways

}(jQuery));
