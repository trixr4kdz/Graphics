/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
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
    $("#apply-mesh-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.mesh
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });

    $("#apply-psychedelic-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.psychedelic
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });
}());
