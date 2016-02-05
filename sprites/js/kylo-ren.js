$(function () {
	
	window.Sprites = window.Sprites || { };

	var kyloRenImg = new Image();
	var kyloLoaded = false;

	kyloRenImg.addEventListener("load", function () {
		kyloLoaded = true;
	}, false);
	kyloRenImg.src = "images/kylo-ren.jpg";

	Sprites.kyloRen = function (specs) {
		var BODY_WIDTH = 125;
		var BODY_HEIGHT = BODY_WIDTH * 3;
		var HEAD_WIDTH = 200;
		var HEAD_HEIGHT = 200;
		var ctx = specs.ctx;
		var xHead = specs.x || 0;
		var yHead = specs.y || 0;
		var xBody = xHead + HEAD_WIDTH / 3;
		var yBody = HEAD_HEIGHT - 20;
		var shoulderOffset = yBody / 2;
		
		var leftArmAngle = specs.leftArmAngle || Math.PI / 4;
		var rightArmAngle = specs.rightArmAngle || Math.PI;
		var leftLegAngle = specs.leftLegAngle || Math.PI * 3 / 2;
		var rightLegAngle = specs.rightLegAngle || Math.PI * 3 / 2;
		var armWidth = BODY_WIDTH / 3;
		var armHeight = BODY_HEIGHT;
		var legWidth = BODY_HEIGHT * 1.5;
		var legHeight = armWidth * 0.75;
		var fistRadius = armWidth / 2
		var legOffset = shoulderOffset;

		var drawArm = function (ctx, armAngle, armHeight) {
			ctx.save();
			ctx.translate(xBody + shoulderOffset, yBody);
			ctx.rotate(armAngle);
			ctx.rect(-armWidth / 2, 0, armWidth, armHeight);
			ctx.fill();
			ctx.stroke();
			ctx.restore();
		};

		ctx.save();
		if (kyloLoaded) {
			ctx.strokeStyle = "gray";
			ctx.lineWidth = 3;
			drawArm(ctx, rightArmAngle, armHeight * 0.75);

			ctx.drawImage(kyloRenImg, xHead, yHead, HEAD_WIDTH, HEAD_HEIGHT);

			ctx.fillRect(xHead + HEAD_WIDTH / 2, HEAD_HEIGHT / 3 * 2, HEAD_WIDTH / 3, HEAD_HEIGHT / 4);
			ctx.fillRect(xBody, yBody, BODY_WIDTH, BODY_HEIGHT);

			drawArm(ctx, leftArmAngle, armHeight);

			ctx.save();
			ctx.translate(xBody + BODY_WIDTH + legOffset, yBody);
			ctx.rotate(leftLegAngle);
			ctx.rect(100, 0, legWidth, legHeight);
			ctx.stroke();
			ctx.fill();
			ctx.restore();

			ctx.beginPath();
			ctx.arc(0, armHeight + fistRadius, fistRadius, 0, 2 * Math.PI, true);
			ctx.fill();
		}
		ctx.restore();

		

	}

}(jQuery));