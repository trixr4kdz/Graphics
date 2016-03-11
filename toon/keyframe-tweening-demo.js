/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        bb8 = function (renderingContext, spec) {
            Sprites.bb8({
                ctx: renderingContext,
                bodyTurn: spec.bodyTurn,
                headTurn: spec.headTurn,
                headTilt: spec.headTilt
            });
        },

        lightsaber = function (renderingContext, spec) {
            Sprites.lightsaber({
                ctx: renderingContext,
                on: spec.on,

            });
        },

        kyloRen = function (renderingContext, spec) {
            Sprites.kyloRen({
                ctx: renderingContext,
                leftArmAngle: spec.leftArmAngle,
                rightArmAngle: spec.rightArmAngle,
                leftLegAngle: spec.leftLegAngle,
                rightLegAngle: spec.rightLegAngle
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
                        ease: KeyframeTweener.linear,
                        bodyTurn: 100,
                        headTurn: -40,
                        headTilt: 30,
                    },

                    {
                        frame: 100,
                        tx: canvas.width / 2 + 150,
                        ty: canvas.height * 0.75,
                        ease: KeyframeTweener.elastic,
                        bodyTurn: -70,
                        headTurn: -40,
                        headTilt: 30
                    },

                    // BB-8 bumps into lightsaber
                    {
                        frame: 105,
                        tx: canvas.width / 2 + 150 + 5,
                        ty: canvas.height * 0.75,
                        bodyTurn: -65,
                        headTurn: -40,
                        headTilt: 20
                    },

                    {
                        frame: 240,
                        tx: canvas.width / 2 + 150 + 5,
                        ty: canvas.height * 0.75,
                        bodyTurn: -65,
                        headTurn: -40,
                        ease: KeyframeTweener.quadEaseOut
                        // headTilt: 30
                    },

                    {
                        frame: 300,
                        tx: 0,
                        ty: canvas.height * 0.75,
                        bodyTurn: -300,
                        headTurn: -40,
                        headTilt: 30,
                    },
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
                        on: false
                    },

                    {
                        frame: 104,
                        tx: canvas.width / 2,
                        ty: canvas.height * 0.85,
                        sx: 0.3,
                        sy: 0.3,
                        on: false
                    },

                    {
                        frame: 105,
                        tx: canvas.width / 2,
                        ty: canvas.height * 0.85,
                        sx: 0.3,
                        sy: 0.3,
                        on: true
                    },

                    {
                        frame: 200,
                        tx: canvas.width / 2,
                        ty: canvas.height * 0.85,
                        sx: 0.3,
                        sy: 0.3,
                        ease: KeyframeTweener.easeInElastic,
                        on: true
                    },

                    {
                        frame: 250,
                        rotate: 60,
                        tx: canvas.width - 350,
                        ty: canvas.height / 2 - 100,
                        sx: 0.3,
                        sy: 0.3,
                        on: true,
                    },

                    {
                        frame: 270,
                        // rotate: 60,
                        tx: canvas.width - 350,
                        ty: canvas.height / 2 - 100,
                        sx: 0.3,
                        sy: 0.3,
                        on: true
                    }


                ]
            },

            {
                draw: kyloRen,
                keyframes: [
                    {
                        frame: 100,
                        tx: canvas.width,
                        ty: canvas.height * 0.1,
                        ease: KeyframeTweener.linear,
                        sx: 0.5,
                        sy: 0.5,
                        rightArmAngle: 10,
                        leftArmAngle: -20,
                        rightLegAngle: 10,
                        leftLegAngle: -20
                    },

                    {
                        frame: 230,
                        tx: canvas.width - 200,
                        ty: canvas.height * 0.1,
                        sx: 0.5,
                        sy: 0.5,
                        rightArmAngle: 30,
                        leftArmAngle: 30,
                        rightLegAngle: 30,
                        leftLegAngle: 30
                    },

                    {
                        frame: 400,
                        tx: canvas.width - 200,
                        ty: canvas.height * 0.1,
                        sx: 0.5,
                        sy: 0.5,
                        
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
        sprites: sprites
    });
}());
