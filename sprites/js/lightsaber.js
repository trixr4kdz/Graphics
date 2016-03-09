$(function () {

    window.Sprites = window.Sprites || { };

    Sprites.lightsaber = function (specs) {
        var ctx = specs.ctx;
        var HANDLE_WIDTH = 300;
        var HANDLE_HEIGHT = HANDLE_WIDTH / 4;
        var CROSSGUARD_OFFSET = 20;
        var CROSSGUARD_WIDTH = HANDLE_HEIGHT / 2;
        var CROSSGUARD_HEIGHT = HANDLE_WIDTH / 2
        var BLADE_OFFSET = 10;

        var draw = function () {
            var xHandle = 0;
            var yHandle = 0;
            var color = specs.color || "red";
            var on = specs.on || true;

            if (on) {
                drawSideBlades(ctx, xHandle, yHandle, 200, color);
                drawMainBlade(ctx, xHandle, yHandle, BLADE_OFFSET, -500, color);
            }
            drawHandle(ctx, xHandle, yHandle, HANDLE_WIDTH, HANDLE_HEIGHT, CROSSGUARD_WIDTH, CROSSGUARD_HEIGHT, CROSSGUARD_OFFSET);
        }

        var drawHandle = function (ctx, x, y, mainWidth, mainHeight, crossGuardWidth, crossGuardHeight, offset) {
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, mainWidth, mainHeight);
            ctx.fillRect(x + offset, y - crossGuardWidth, crossGuardWidth, crossGuardHeight);
        }

        var drawMainBlade = function (ctx, x, y, offset, bladeHeight, color) {
            ctx.beginPath();
            ctx.moveTo(x, y + offset);
            ctx.quadraticCurveTo(bladeHeight, y + HANDLE_HEIGHT / 2, x, y + HANDLE_HEIGHT - offset);
            ctx.fillStyle = color;
            ctx.fill();
        }

        var drawSideBlades = function (ctx, x, y, bladeHeight, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.ellipse(x + CROSSGUARD_OFFSET + CROSSGUARD_WIDTH / 2, y - CROSSGUARD_WIDTH + CROSSGUARD_HEIGHT / 2, 10, bladeHeight, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
        draw();
    }

}(jQuery));