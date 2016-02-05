$(function () {
	
	window.Sprites = window.Sprites || { };

	var kyloRenImg = new Image();
	var kyloLoaded = false;
	kyloRenImg.addEventListener("load", function () {
		kyloLoaded = true;
	}, false);
	kyloRenImg.src = "images/kylo-ren.jpg";

	Sprites.kyloRen = function () {
		var ctx = canvas.getContext("2d");
		var imageWidth = 200;
		var imageHeight = 200;
		var xHead = 300;
		var yHead = 0;
		var bodyWidth = 125;
		var bodyHeight = bodyWidth * 4;
		var leftArmAngle = Math.PI / 4;
		var rightArmAngle = Math.PI;
		var handRadius = 50;
		var armWidth = bodyWidth / 3;
		var armHeight = bodyHeight;

		if (kyloLoaded) {
			ctx.drawImage(kyloRenImg, xHead, yHead, imageWidth, imageHeight);
			ctx.fillRect(xHead + imageWidth / 2, imageHeight / 3 * 2, imageWidth / 3, imageHeight / 4);
			ctx.fillRect(xHead + imageWidth / 3, imageHeight - 20, bodyWidth, bodyHeight);

			ctx.save();

			ctx.restore();

		}



	}

}(jQuery));