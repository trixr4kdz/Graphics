$(function () {

	var canvas = $("canvas");
	var ctx = canvas.getContext("2d");
    var drawScene = function () {
        Sprites.bb8();
        Sprites.kyloRen();
        Sprites.tieFighter();

        window.requestAnimationFrame(drawScene);
    }
    window.requestAnimationFrame(drawScene);

}(jQuery));