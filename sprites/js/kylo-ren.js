$(function () {
	
	window.Sprites = window.Sprites || { };

	var kyloRenImg = new Image();
	var kyloLoaded = false;
	kyloRenImg.addEventListener("load", function () {
		kyloLoaded = true;
	}, false);
	kyloRenImg.src = "images/kylo-ren.jpg";
	kyloRenImg.style.width = "100px";
	kyloRenImg.style.height = "100px";

	Sprites.kyloRen = function () {
		// var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");

		if (kyloLoaded) {
			ctx.drawImage(kyloRenImg, 0, 0);
		}



	}

}(jQuery));