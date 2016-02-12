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
        var headTilt = specs.headTilt || 0;
        var color = specs.color || "rgb(255, 120, 0)";
        var xBody = specs.x;
        var yBody = specs.y;
        var xHead = xBody;
        var yHead = yBody - HEAD_OFFSET;
        var bodyGradient = ctx.createRadialGradient(500, 250, 10, 250, 300, 800);
        var headGradient = ctx.createRadialGradient(400, 150, 10, 300, 100, 800);

        bodyGradient.addColorStop(0, "white");
        bodyGradient.addColorStop(1, "gray");

        headGradient.addColorStop(0, "white");
        headGradient.addColorStop(1, "gray");
        ctx.restore();

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

            rotateBody(bodyTurn);
            rotateHead(headTilt);
        }

        var rotateHead = function (tilt) {
            var LEFTEST = -60;
            var RIGHTEST = -LEFTEST;
            ctx.save();
            ctx.translate(xBody, yBody);
            if (tilt < LEFTEST || tilt > RIGHTEST) {
                tilt = tilt < LEFTEST ? LEFTEST : RIGHTEST;
            }
            ctx.rotate(Math.PI / 180 * tilt);
            drawHead();
            ctx.restore();
        }

        var drawHead = function () {
            ctx.fillStyle = headGradient;
            ctx.beginPath();
            ctx.save();
            ctx.scale(outerCircleConstants.scale0, 1);
            ctx.arc(0, -BODY_RADIUS + 10, HEAD_RADIUS, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.translate(0, -HEAD_OFFSET);
            drawEye(headTurn);
            ctx.restore();
        }

        var rotateBody = function (turn) {
            var convertRadianToDegrees = Math.PI / 180;
            ctx.save();
            ctx.beginPath();
            ctx.translate(xBody, yBody);
            ctx.rotate(convertRadianToDegrees * turn);
            drawBody();
            ctx.restore();        
        }

        var drawEye = function (turn) {
            ctx.save();
            var RIGHTEST = 40;
            var LEFTEST = -40;
            var EYE_OFFSET = 45;
            var LOWER_DOT_OFFSET = 25;
            var SHINY_OFFSET = 5;
            if (turn < LEFTEST || turn > RIGHTEST) {
                turn = turn < LEFTEST ? LEFTEST : RIGHTEST;
            }
            drawInnerCircles(ctx, "black", 15, turn, - EYE_OFFSET);
            drawInnerCircles(ctx, "white", 5, turn - SHINY_OFFSET, -EYE_OFFSET - SHINY_OFFSET);
            if (turn < RIGHTEST - 10) {
                drawInnerCircles(ctx, "black", 5, LOWER_DOT_OFFSET + turn, -LOWER_DOT_OFFSET);
            }
            ctx.restore();
        }

        var drawInnerCircles = function (ctx, fillStyle, radius, x, y) {
            ctx.fillStyle = fillStyle;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.stroke();
        }

        var drawCenterLine = function (ctx, x0, y0, x1, y1) {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
        }

        var drawOuterCircles = function (ctx, s0, s1, s2, s3, c0, c1, c2, c3) {
            ctx.save();
            ctx.beginPath()
            ctx.moveTo((s0 * BODY_RADIUS * c0),(s2 * BODY_RADIUS * c1));
            ctx.lineTo((s1 * BODY_RADIUS * c0),(s3 * BODY_RADIUS * c1));
            ctx.lineTo((s1 * BODY_RADIUS * c0) + (s0 * c2),(s3 * BODY_RADIUS * c1) + (s2 * c3));
            ctx.lineTo((s0 * BODY_RADIUS * c0) + (s1 * c2),(s2 * BODY_RADIUS * c1) + (s3 * c3));
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        var drawBody = function () {
            drawCenterLine(ctx, -BODY_RADIUS * outerCircleConstants.scale0, 0, BODY_RADIUS * outerCircleConstants.scale0, 0)
            drawCenterLine(ctx, 0, -BODY_RADIUS * outerCircleConstants.scale0, 0, BODY_RADIUS * outerCircleConstants.scale0);
            drawInnerCircles(ctx, color, HEAD_RADIUS * outerCircleConstants.scale0, 0, 0);
            drawInnerCircles(ctx, "white", HEAD_RADIUS / 1.75, 0, 0);
            drawInnerCircles(ctx, "gray", HEAD_RADIUS / 2.25, 0, 0);

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
