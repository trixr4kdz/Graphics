/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },

        bb8 = function (renderingContext) {
            Sprites.bb8({
                ctx: renderingContext,
                // x: 800,
                // y: 300,
                // headTurn: -20,
                // bodyTurn: 0,
                // headTilt: 30,
                color: "rgb(255, 120, 0)"
            });
        },

        // lightsaber = function (renderingContext) {
        //     Sprites.lightsaber({
        //         ctx: renderingContext,
        //         // x: 1024 * 2 / 3,
        //         // y: 200,
        //         // color: "red",
        //         // on: true
        //     });
        // },

        // kyloRen = function (renderingContext) {
        //     renderingContext.save();
        //     renderingContext.scale(0.5, 0.5);
        //     renderingContext.translate(300, 0);
        //     Sprites.kyloRen({
        //         ctx: renderingContext,
        //         // leftArmAngle: Math.PI / 8,
        //         // rightArmAngle: Math.PI / 2,
        //         // leftLegAngle: Math.PI / 8,
        //         // rightLegAngle: -Math.PI / 8,
        //         // x: 300,
        //         // y: 0
        //     });
        //     renderingContext.restore();
        // },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: bb8,
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.elastic
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 80,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },

            {
                draw: square,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            }
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites, 
        background: function (renderingContext) {
            renderingContext.save();
            renderingContext.fillStyle = "rgb(229, 200, 173)";
            renderingContext.fillRect(0, 0, canvas.width, canvas.height);
            renderingContext.fillStyle = "rgb(94, 52, 20)";
            renderingContext.fillStyle(canvas.width * 0.75, canvas.height * 0.75, canvas.width, canvas.height);
            renderingContext.restore();
        }
    });
}());
