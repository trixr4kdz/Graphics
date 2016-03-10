/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),

        bb8 = function () {
            Sprites.bb8({
                ctx: renderingContext
            });
        },

        lightsaber = function () {
            Sprites.lightsaber({
                ctx: renderingContext,
                on: true
            })
        };

    renderingContext.save();
    renderingContext.translate(200, 200);
    bb8();
    renderingContext.restore();

    renderingContext.save();
    renderingContext.translate(300, 350);
    renderingContext.scale(0.5, 0.5);
    lightsaber();
    renderingContext.restore();

    // Set a little event handler to apply the filter.
    $("#apply-sepia-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.sepia
            ),
            0, 0
        );
    });

    $("#apply-grid-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.grid
            ),
            0, 0
        );
    });

}());
