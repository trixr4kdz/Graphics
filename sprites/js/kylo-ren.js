$(function () {
	
	window.Sprites = window.Sprites || { };

	var kyloRenImg = new Image();
	var kyloLoaded = false;

	kyloRenImg.addEventListener("load", function () {
		kyloLoaded = true;
	}, false);

	kyloRenImg.src = "images/kylo-ren.jpg";

	Sprites.kyloRen = function (specs) {
		var ctx = specs.ctx;
		var imageWidth = 200;
		var imageHeight = 200;
		var xHead = 300;
		var yHead = 0;
		var bodyWidth = 125;
		var bodyHeight = bodyWidth * 4;
		var leftArmAngle = specs.leftArmAngle || Math.PI / 4;
		var rightArmAngle = specs.rightArmAngle || -Math.PI;
		var handRadius = 50;
		var armWidth = bodyWidth / 3;
		var armHeight = bodyHeight / 2;

		ctx.save();
		if (kyloLoaded) {
			ctx.drawImage(kyloRenImg, xHead, yHead, imageWidth, imageHeight);

			ctx.fillRect(xHead + imageWidth / 2, imageHeight / 3 * 2, imageWidth / 3, imageHeight / 4);
			ctx.fillRect(xHead + imageWidth / 3, imageHeight - 20, bodyWidth, bodyHeight);

			ctx.save();
			ctx.translate(-bodyWidth / 2, imageHeight / 2);
			ctx.rotate(leftArmAngle);
			ctx.fillRect(-armWidth / 2, 0, armWidth, armHeight);
			ctx.restore();

			ctx.save();
			ctx.translate(bodyWidth / 2, imageHeight / 2);
			ctx.rotate(rightArmAngle);
			ctx.fillRect(-armWidth / 2, 0, armWidth, armHeight);
			ctx.restore();

			var fistRadius = armWidth / 2

			ctx.beginPath();
			ctx.arc(0, armHeight + fistRadius, fistRadius, 0, 2 * Math.PI, true);
			ctx.fill();
		}
		ctx.restore();

		var drawArm = function (ctx, armOffset, armAngle) {
			ctx.save();
			ctx.translate(armOffset, imageHeight / 2);
			ctx.rotate(armAngle);
			ctx.fillRect(-armWidth / 2, 0, armWidth, armHeight);
			ctx.restore();
		}

	}

}(jQuery));