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
        var rightArmAngle = specs.rightArmAngle || Math.PI / 4;
        var leftLegAngle = specs.leftLegAngle || Math.PI * 2;
        var rightLegAngle = specs.rightLegAngle || Math.PI * 2;
        var armWidth = BODY_WIDTH / 3;
        var armHeight = BODY_HEIGHT;
        var legWidth = armWidth * 0.75;
        var legHeight = armHeight * 1.5;
        var fistRadius = armWidth / 2;
        var legOffset = shoulderOffset;

        var drawArm = function (ctx, armAngle, armHeight) {
            ctx.save();
            ctx.translate(xBody + shoulderOffset, yBody);
            ctx.rotate(armAngle);
            ctx.fillRect(-armWidth / 2, 0, armWidth, armHeight);
            ctx.beginPath();
            ctx.arc(0, armHeight + fistRadius, fistRadius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        var drawLeg = function (ctx, legAngle) {
            ctx.save();
            ctx.translate(xBody + BODY_WIDTH - legOffset, yBody + BODY_HEIGHT - legOffset);
            ctx.rotate(legAngle);
            ctx.fillRect(0, 0, legWidth, legHeight);
            ctx.restore();
        };

        ctx.save();
        if (kyloLoaded) {

            drawArm(ctx, rightArmAngle, armHeight * 0.75);
            ctx.drawImage(kyloRenImg, xHead, yHead, HEAD_WIDTH, HEAD_HEIGHT);
            ctx.fillRect(xHead + HEAD_WIDTH / 2, HEAD_HEIGHT / 3 * 2, HEAD_WIDTH / 3, HEAD_HEIGHT / 4);
            ctx.fillRect(xBody, yBody, BODY_WIDTH, BODY_HEIGHT);
            ctx.lineWidth = 3;
            drawArm(ctx, leftArmAngle, armHeight);

            drawLeg(ctx, leftLegAngle);
            drawLeg(ctx, rightLegAngle);
        };
        ctx.restore();

    };

}(jQuery));