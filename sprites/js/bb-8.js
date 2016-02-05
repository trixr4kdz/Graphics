$(function () {

    window.Sprites = window.Sprites || { };

    Sprites.bb8 = function (specs) {
        var BODY_RADIUS = 100;
        var HEAD_OFFSET = 90;
        var HEAD_RADIUS = BODY_RADIUS / 1.5;
        var CENTER_CIRCLE_RADIUS = HEAD_RADIUS * 1.25;

        var ctx = specs.ctx;
        var headTurn = specs.headTurn || 0;
        // var bodyTurn = specs.bodyTurn || 0;
        var color = specs.color || "rgb(255, 120, 0)";
        var xBody = specs.x;
        var yBody = specs.y;
        var bodyGradient = ctx.createRadialGradient(500, 250, 40, 250, 250, 400);
        var headGradient = ctx.createRadialGradient(500, 200, 60, 300, 100, 450);

        bodyGradient.addColorStop(0, "white");
        bodyGradient.addColorStop(1, "gray");

        headGradient.addColorStop(0, "white");
        headGradient.addColorStop(1, "gray");

        var outerCircleConstants = {
            scale0: 0.8,
            scale1: 0.6,
            offset0: 10,
            offset1: 16
        };

        var render = function () {
            ctx.fillStyle = bodyGradient;
            ctx.beginPath();
            ctx.arc(xBody, yBody, BODY_RADIUS, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = headGradient;
            ctx.beginPath();
            ctx.save();
            ctx.scale(0.8, 1);
            ctx.arc(xBody * 5 / 4, (yBody - HEAD_OFFSET - 5), HEAD_RADIUS, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            drawEye(headTurn);
            drawBody();
        }

        var drawEye = function (turn) {
            var EYE_OFFSET = 45;
            var LOWER_DOT_OFFSET = 25;
            drawInnerCircles(ctx, "black", 15, xBody + turn, yBody - HEAD_OFFSET - EYE_OFFSET);
            drawInnerCircles(ctx, "black", 5, xBody + LOWER_DOT_OFFSET + turn, yBody - HEAD_OFFSET - LOWER_DOT_OFFSET);
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

        var drawOuterCircles = function (ctx, s0, s1, s2, s3, c0, c1, c2, c3) {
            ctx.beginPath()
            ctx.moveTo(xBody + (s0 * BODY_RADIUS * c0), yBody + (s2 * BODY_RADIUS * c1));
            ctx.lineTo(xBody + (s1 * BODY_RADIUS * c0), yBody + (s3 * BODY_RADIUS * c1));
            ctx.lineTo(xBody + (s1 * BODY_RADIUS * c0) + (s0 * c2), yBody + (s3 * BODY_RADIUS * c1) + (s2 * c3));
            ctx.lineTo(xBody + (s0 * BODY_RADIUS * c0) + (s1 * c2), yBody + (s2 * BODY_RADIUS * c1) + (s3 * c3));
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        var drawBody = function () {
            drawCenterCross(ctx, xBody, yBody + (CENTER_CIRCLE_RADIUS), xBody, yBody - (CENTER_CIRCLE_RADIUS))
            drawCenterCross(ctx, xBody - CENTER_CIRCLE_RADIUS, yBody, xBody + CENTER_CIRCLE_RADIUS, yBody);
            drawInnerCircles(ctx, color, HEAD_RADIUS * .80, xBody, yBody);
            drawInnerCircles(ctx, "white", HEAD_RADIUS / 1.75, xBody, yBody);

            ctx.fillStyle = color;

            drawOuterCircles(ctx, 1, 1, 1, -1, 
                outerCircleConstants.scale0, 
                outerCircleConstants.scale1, 
                outerCircleConstants.offset0, 
                outerCircleConstants.offset1
            );

            drawOuterCircles(ctx, -1, -1, -1, 1, 
                outerCircleConstants.scale0, 
                outerCircleConstants.scale1, 
                outerCircleConstants.offset0, 
                outerCircleConstants.offset1
            );

            drawOuterCircles(ctx, -1, 1, 1, 1, 
                outerCircleConstants.scale1, 
                outerCircleConstants.scale0, 
                outerCircleConstants.offset1, 
                outerCircleConstants.offset0
            );

            drawOuterCircles(ctx, -1, 1, -1, -1, 
                outerCircleConstants.scale1, 
                outerCircleConstants.scale0, 
                outerCircleConstants.offset1, 
                outerCircleConstants.offset0
            );
        }
        render();
    }

}(jQuery));
