$(function () {

    window.Sprites = window.Sprites || { };

    Sprites.bb8 = function () {

        // var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var radialGradient = ctx.createRadialGradient(500, 250, 40, 250, 250, 400);

        radialGradient.addColorStop(0, "white");
        radialGradient.addColorStop(1, "gray");

        var data = {};

        var render = function () {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var bodyRadius = 100;
            var xBody = 512;
            var yBody = 300;

            var headOffset = 90;
            var headRadius = bodyRadius / 1.5;
            var centerCircleRadius = headRadius * 0.75;
            
            ctx.fillStyle = radialGradient;
            ctx.beginPath();
            ctx.arc(xBody, yBody, bodyRadius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(xBody , yBody + (centerCircleRadius * 2));
            ctx.lineTo(xBody, yBody - (centerCircleRadius * 2));
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(xBody - centerCircleRadius * 2, yBody);
            ctx.lineTo(xBody + centerCircleRadius * 2, yBody);
            ctx.stroke();

            ctx.fillStyle = "gray";
            ctx.beginPath();
            ctx.save();
            ctx.scale(0.8, 1);
            ctx.arc(xBody * 5 / 4, (yBody - headOffset - 5), headRadius, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(xBody, yBody - headOffset - 45, 15, 0, 2 * Math.PI, true);
            ctx.fillStyle = "black";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(xBody + 20, yBody - headOffset - 25, 5, 0, 2 * Math.PI, true);
            ctx.fillStyle = "black";
            ctx.fill();

            ctx.strokeStyle = "black";
            ctx.fillStyle = "rgb(255, 120, 0)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(xBody, yBody, headRadius * .80, 0, Math.PI * 2, true);
            // ctx.translate(-0.5,0);
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = "black";
            ctx.fillStyle = "white";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(xBody, yBody, headRadius / 1.75, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(xBody + bodyRadius * 0.70, yBody + bodyRadius * .7);
            ctx.lineTo(xBody + bodyRadius * 0.70, yBody - bodyRadius * 0.70);
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(xBody + bodyRadius * 0.70, yBody + bodyRadius * 0.70);
            ctx.lineTo(xBody + bodyRadius * 0.70 + 10, yBody + bodyRadius * .7 - 10);
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(xBody + bodyRadius * 0.70 + 10, yBody + bodyRadius * .7 - 10);
            ctx.lineTo(xBody + bodyRadius * 0.70 + 10, yBody - bodyRadius * 0.70 + 10);
            ctx.stroke();
            ctx.closePath();

            // ctx.moveTo();
            // ctx.lineTo();
            // ctx.stroke();
            ctx.fill();

            console.log("xBody " + xBody);
            console.log("yBody " + yBody);

            // window.requestAnimationFrame(render);
        }

        // window.requestAnimationFrame(render);
        render();
    }

}(jQuery));
