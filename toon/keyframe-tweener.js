/*
 * A simple keyframe-tweening animation module for 2D
 * canvas elements.
 */
(function () {

    // The big one: animation initialization.  The settings parameter
    // is expected to be a JavaScript object with the following
    // properties:
    //
    // - renderingContext: the 2D canvas rendering context to use
    // - width: the width of the canvas element
    // - height: the height of the canvas element
    // - sprites: the array of sprites to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each sprite is a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the sprite
    // - keyframes: the array of keyframes that the sprite should follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          it to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the sprite (default is 0, 0)
    // - sx, sy: the scale factor of the sprite (default is 1, 1)
    // - rotate: the rotation angle of the sprite (default is 0)
    var initializeAnimation = function (settings) {

        var desert = new Image();
        var desertLoaded = false;

        desert.addEventListener("load", function () {
            desertLoaded = true;
        }, false);
        desert.src = "../toon/images/desert.jpg";

        // We need to keep track of the current frame.
        var currentFrame = 0,

            // Avoid having to go through settings to get to the
            // rendering context and sprites.
            renderingContext = settings.renderingContext,
            width = settings.width,
            height = settings.height,
            sprites = settings.sprites,
            background = function (renderingContext) {
                renderingContext.drawImage(desert, 0, 0, canvas.width, canvas.height);
            }

            previousTimestamp = null,
            nextFrame = function (timestamp) {
                // Bail-out #1: We just started.
                if (!previousTimestamp) {
                    previousTimestamp = timestamp;
                    window.requestAnimationFrame(nextFrame);
                    return;
                }

                // Bail-out #2: Too soon.
                if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 24))) {
                    window.requestAnimationFrame(nextFrame);
                    return;
                }

                // Clear the canvas.
                background(renderingContext);

                // For every sprite, go to the current pair of keyframes.
                // Then, draw the sprite based on the current frame.
                for (var i = 0, maxI = sprites.length; i < maxI; i += 1) {
                    for (var j = 0, maxJ = sprites[i].keyframes.length - 1; j < maxJ; j += 1) {
                        // We look for keyframe pairs such that the current
                        // frame is between their frame numbers.
                        if ((sprites[i].keyframes[j].frame <= currentFrame) &&
                                (currentFrame <= sprites[i].keyframes[j + 1].frame)) {
                            // Point to the start and end keyframes.
                            var startKeyframe = sprites[i].keyframes[j],
                                endKeyframe = sprites[i].keyframes[j + 1];

                            // Save the rendering context state.
                            renderingContext.save();

                            // Set up our start and distance values, using defaults
                            // if necessary.
                            var ease = startKeyframe.ease || KeyframeTweener.linear,

                                txStart = startKeyframe.tx || 0,
                                txDistance = (endKeyframe.tx || 0) - txStart,

                                tyStart = startKeyframe.ty || 0,
                                tyDistance = (endKeyframe.ty || 0) - tyStart,

                                sxStart = startKeyframe.sx || 1,
                                sxDistance = (endKeyframe.sx || 1) - sxStart,

                                syStart = startKeyframe.sy || 1,
                                syDistance = (endKeyframe.sy || 1) - syStart,

                                rotateStart = (startKeyframe.rotate || 0) * Math.PI / 180,
                                rotateDistance = (endKeyframe.rotate || 0) * Math.PI / 180 - rotateStart,

                                currentTweenFrame = currentFrame - startKeyframe.frame,
                                duration = endKeyframe.frame - startKeyframe.frame + 1;

                            // Build our transform according to where we should be.
                            renderingContext.translate(
                                ease(currentTweenFrame, txStart, txDistance, duration),
                                ease(currentTweenFrame, tyStart, tyDistance, duration)
                            );
                            renderingContext.scale(
                                ease(currentTweenFrame, sxStart, sxDistance, duration),
                                ease(currentTweenFrame, syStart, syDistance, duration)
                            );
                            renderingContext.rotate(
                                ease(currentTweenFrame, rotateStart, rotateDistance, duration)
                            );

                            var tweenSpec = function (startKeyframe, ease, duration) {
                                var spec = Object.keys(startKeyframe);
                                for (var key of spec) {
                                    var dist = endKeyframe[key] - startKeyframe[key];
                                    if (typeof startKeyframe[key] !== "function") {
                                        startKeyframe[key] = ease(currentTweenFrame, startKeyframe[key], dist, duration);
                                    }
                                }
                                return startKeyframe;
                            }
                            
                            // Draw the sprite.
                            sprites[i].draw(renderingContext, 
                                tweenSpec(
                                    startKeyframe, 
                                    ease,
                                    duration
                                ));

                            // Clean up.
                            renderingContext.restore();
                        }
                    }
                }

                // Move to the next frame.
                currentFrame += 1;
                previousTimestamp = timestamp;
                window.requestAnimationFrame(nextFrame);
            };

        window.requestAnimationFrame(nextFrame);
    };

    window.KeyframeTweener = {
        // The module comes with a library of common easing functions.
        linear: function (currentTime, start, distance, duration) {
            var percentComplete = currentTime / duration;
            return distance * percentComplete + start;
        },

        quadEaseIn: function (currentTime, start, distance, duration) {
            var percentComplete = currentTime / duration;
            return distance * percentComplete * percentComplete + start;
        },

        quadEaseOut: function (currentTime, start, distance, duration) {
            var percentComplete = currentTime / duration;
            return -distance * percentComplete * (percentComplete - 2) + start;
        },

        quadEaseInAndOut: function (currentTime, start, distance, duration) {
            var percentComplete = currentTime / (duration / 2);
            return (percentComplete < 1) ?
                    (distance / 2) * percentComplete * percentComplete + start :
                    (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
        },

        elastic: function (currentTime, start, distance, duration) {
            var percentComplete = currentTime / duration;
            return distance * (-1 * Math.pow(4, -8 * percentComplete) * Math.sin((percentComplete * 6 - 1) * (2 * Math.PI) / 2) + 1) + start;
        },

        bounce: function (currentTime, start, distance, duration) {
            var percentComplete = currentTime / duration;
            if (percentComplete < (1 / 2.75)) {
                return distance * (7.5625 * percentComplete * percentComplete) + start;
            } else if (percentComplete < (2 / 2.75)) {
                return distance * (7.5625 * (percentComplete -= (1.5 / 2.75)) * percentComplete + 0.75) + start;
            } else if (percentComplete < (2.5 / 2.75)) {
                return distance * (7.5625 * (percentComplete -= (2.25 / 2.75)) * percentComplete + 0.9375) + start;
            } else {
                return distance * (7.5625 * (percentComplete -= (2.625 / 2.75)) * percentComplete + 0.984375) + start;
            }
        },

        easeInElastic: function (currentTime, start, distance, duration) {
            var easingChange = 1.70158;
            var changeInDuration = 0;
            var previousDistance = distance;
            if (currentTime == 0) {
                return start;  
            }
            if ((currentTime /= duration) == 1) {
                return start + distance;  
            }
            if (!changeInDuration) {
                changeInDuration = duration * 0.3;
            }
            if (previousDistance < Math.abs(distance)) { 
                previousDistance = distance; 
                var easingChange = changeInDuration / 4; 
            }
            else {
                var easingChange = changeInDuration / (2 * Math.PI) * Math.asin (distance / previousDistance);
            }
            return -(previousDistance * Math.pow(2, 10 * (currentTime -= 1)) * 
                      Math.sin((currentTime * duration - easingChange) * 
                      (2 * Math.PI) / changeInDuration)) + start;
        },  

        initialize: initializeAnimation
    };
}());
