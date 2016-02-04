$(function () {

	window.Sprites = window.Sprites || { };

	var sabers = {

	};

	Sprites.lightsaber = function () {
		var ctx = canvas.getContext("2d");

		var draw = function () {

			// var saberGradient = ctx.createRadialGradient();
			var xHandle = 2 * 1024 / 3;
			var yHandle = 200;
			var handleWidth = 300;
			var handleHeight = handleWidth / 4;
			var crossGuardOffset = 20;
			var crossGuardWidth = handleHeight / 2;
			var crossGuardHeight = handleWidth / 2

			ctx.fillRect(xHandle, yHandle, handleWidth, handleHeight);
			ctx.fillRect(xHandle + crossGuardOffset, yHandle - crossGuardWidth, crossGuardWidth, crossGuardHeight);

			ctx.beginPath();
			ctx.moveTo(xHandle, yHandle + 10);
			ctx.quadraticCurveTo(-xHandle - handleHeight / 2 + 1000, yHandle + handleHeight / 2, xHandle, yHandle + handleHeight - 10);
			ctx.fillStyle = "red";
			ctx.fill();

			// ctx.beginPath();
			// ctx.moveTo(xHandle, yHandle);
			// ctx.lineTo(xHandle + handleWidth - cornerRadius, yHandle);
			// ctx.arcTo(xHandle + handleWidth, yHandle, xHandle + handleWidth, yHandle + cornerRadius, cornerRadius);
			// ctx.lineTo(xHandle + handleWidth, yHandle + handleHeight);
			// ctx.stroke();
		}

		// var makeHandleOutline = function (x, y, width, height, cornerRadius) {
		// 	ctx.beginPath();
		// 	ctx.moveTo(x, y);
		// 	ctx.lineTo(x + width - cornerRadius, y);
		// 	ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
		// 	ctx.lineTo(x + width, y + handleHeight);
		// 	ctx.stroke();
		// }

		// var drawBlade() {

		// }

		draw();

	}

}(jQuery));