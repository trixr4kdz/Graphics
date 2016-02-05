$(function () {

	window.Sprites = window.Sprites || { };

	Sprites.lightsaber = function () {
		var ctx = canvas.getContext("2d");

		var draw = function () {
			var xHandle = 2 * 1024 / 3;
			var yHandle = 200;
			var handleWidth = 300;
			var handleHeight = handleWidth / 4;
			var crossGuardOffset = 20;
			var crossGuardWidth = handleHeight / 2;
			var crossGuardHeight = handleWidth / 2
			var bladeOffset = 10;

			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.ellipse(xHandle + crossGuardOffset + crossGuardWidth / 2, yHandle - crossGuardWidth + crossGuardHeight / 2, 10, 200, 0, 0, 2 * Math.PI);
			ctx.fill();

			drawHandle(ctx, xHandle, yHandle, handleWidth, handleHeight, crossGuardWidth, crossGuardHeight, crossGuardOffset);
			// drawMainBlade(ctx, xHandle, yHandle, bladeOffset, -500, "red");

			ctx.beginPath();
			ctx.moveTo(xHandle, yHandle + bladeOffset);
			ctx.quadraticCurveTo(-500, yHandle + handleHeight / 2, xHandle, yHandle + handleHeight - bladeOffset);
			ctx.fillStyle = "red";
			ctx.fill();
		}

		var drawHandle = function (ctx, x, y, mainWidth, mainHeight, crossGuardWidth, crossGuardHeight, offset) {
			ctx.fillStyle = "black";
			ctx.fillRect(x, y, mainWidth, mainHeight);
			ctx.fillRect(x + offset, y - crossGuardWidth, crossGuardWidth, crossGuardHeight);
		}

		var drawMainBlade = function (ctx, x, y, offset, bladeHeight, color) {
			ctx.beginPath();
			ctx.moveTo(x, y + offset);
			ctx.quadraticCurveTo(bladeHeight, y + handleHeight / 2, x, y + handleHeight - offset);
			ctx.fillStyle = color;
			ctx.fill();
		}

		var drawSideBlades = function (ctx, x, y, bladeHeight color) {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.ellipse(x + crossGuardOffset + crossGuardWidth / 2, y - crossGuardWidth + crossGuardHeight / 2, 10, bladeHeight, 0, 0, 2 * Math.PI);
			ctx.fill();
		}
		draw();

	}

}(jQuery));