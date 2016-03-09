/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        bb8 = function (renderingContext) {
            Sprites.bb8({
                ctx: renderingContext
            });
        },

        lightsaber = function (renderingContext) {
            Sprites.lightsaber({
                ctx: renderingContext
            });
        },

        kyloRen = function (renderingContext) {
            Sprites.kyloRen({
                ctx: renderingContext
            });
        },

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
                        tx: canvas.width,
                        ty: canvas.height * 0.75,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 20,
                        tx: canvas.width * 0.9,
                        ty: canvas.height * 0.75,
                        ease: KeyframeTweener.linear
                    },

                    // // The last keyframe does not need an easing function.
                    // {
                    //     frame: 80,
                    //     tx: 80,
                    //     ty: 500,
                    //     rotate: 60 // Keyframe.rotate uses degrees.
                    // }
                ]
            },

            {
                draw: lightsaber,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            },

            {
                draw: kyloRen,
                keyframes: [
                    {
                        frame: 50,
                        tx: canvas.width * 0.9,
                        ty: canvas.height * 0.75,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 100,
                        tx: canvas.width,
                        ty: canvas.height * 0.75,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600
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
    });
}());
