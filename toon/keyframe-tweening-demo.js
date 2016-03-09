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
                ctx: renderingContext,
                on: false
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
                        frame: 100,
                        tx: canvas.width / 2 + 150,
                        ty: canvas.height * 0.75,
                        ease: KeyframeTweener.linear
                    },

                    // // The last keyframe does not need an easing function.
                    {
                        frame: 300,
                        tx: canvas.width / 2 + 150,
                        ty: canvas.height * 0.75,
                        // rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },

            {
                draw: lightsaber,
                keyframes: [
                    {
                        frame: 0,
                        tx: canvas.width / 2,
                        ty: canvas.height * 0.85,
                        sx: 0.3,
                        sy: 0.3,
                    },

                    {
                        frame: 100,
                        tx: canvas.width / 2,
                        ty: canvas.height * 0.85,
                        sx: 0.3,
                        sy: 0.3
                    },

                    {
                        frame: 150,
                        rotate: 60,
                        tx: canvas.width - 200,
                        ty: canvas.height / 2 - 100,
                        sx: 0.3,
                        sy: 0.3,
                    },

                    // {
                    //     frame: 100,
                    //     tx: 300,
                    //     ty: 0,
                    //     ease: KeyframeTweener.linear
                    // },

                    // {
                    //     frame: 150,
                    //     tx: 300,
                    //     ty: 600,
                    // }
                ]
            },

            {
                draw: kyloRen,
                keyframes: [
                    // {
                    //     frame: 50,
                    //     tx: 0,
                    //     ty: canvas.height * 0.75,
                    //     ease: KeyframeTweener.linear
                    // },

                    {
                        frame: 100,
                        tx: canvas.width,
                        ty: 155,
                        ease: KeyframeTweener.linear,
                        sx: 0.5,
                        sy: 0.5
                    },

                    {
                        frame: 230,
                        tx: canvas.width - 200,
                        ty: 155,
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
    });
}());
