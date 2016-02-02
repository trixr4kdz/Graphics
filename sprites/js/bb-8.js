// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
$(function () {
    // Note there is not SpriteLibrary (yet)
    // window.SpriteLibrary = window.SpriteLibrary || { };

    // Ditto on using jQuery here.
    var canvas = document.getElementById("canvas");
    var renderingContext = canvas.getContext("2d");

    // Declare other variables here.
    var radialGradient = renderingContext.createRadialGradient(500, 250, 40, 250, 250, 400);

    // Put your canvas drawing code (and any other code) here.
    radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(1, "gray");


    // Separate data from function
    var data = {};

    var render = function () {

        renderingContext.clearRect(0, 0, canvas.width, canvas.height);
        var bodyRadius = 100;
        var xBody = 512;
        var yBody = 300;

        var headOffset = 90;
        var headRadius = bodyRadius / 1.5;
        // var xHead = xBody - bodyRadius
        // var yHead = 
        var trapezoidOffset = 5;
        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.arc(xBody, yBody, bodyRadius, 0, Math.PI * 2, true);
        renderingContext.fill();
        renderingContext.closePath();

        renderingContext.fillStyle = "gray";
        renderingContext.beginPath();
        renderingContext.arc(xBody, yBody - headOffset, headRadius, 0, Math.PI, true);
        renderingContext.fill();
        renderingContext.stroke();
        renderingContext.closePath();

        // renderingContext.beginPath();
        // renderingContext.moveTo(xBody - bodyRadius, yBody - bodyRadius);
        // renderingContext.lineTo(xBody + bodyRadius, yBody);
        // renderingContext.lineTo(xBody - trapezoidOffset, yBody + trapezoidOffset);
        // renderingContext.lineTo(xBody - bodyRadius, yBody + trapezoidOffset);
        // renderingContext.lineTo(xBody - bodyRadius, yBody - bodyRadius);
        // renderingContext.stroke();
        // renderingContext.closePath();

        renderingContext.strokeStyle = "orange";
        renderingContext.fillStyle = renderingContext.strokeStyle;
        renderingContext.beginPath();
        renderingContext.arc(xBody, yBody, headRadius, 0, Math.PI / 1.5, false);
        renderingContext.rotate(Math.PI);
        // renderingContext.translate(-1,0);
        renderingContext.stroke();
        renderingContext.fill();

        // renderingContext.rotate(Math.PI / 5);

        console.log("xBody " + xBody);
        console.log("yBody " + yBody);

        // window.requestAnimationFrame(render);
    }

    // window.requestAnimationFrame(render);
    render();

}(jQuery));
