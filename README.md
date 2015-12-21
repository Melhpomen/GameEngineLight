# GameEngineLight
Small template with some basics for a game engine
The code is I think self-explanatory, though there is some comments for particular points

INIT folder :

REQUIRE.js                  // Call every script needed
CANVAS.js                   // Can be also used for pre-rendering images canvas.PreRender()
LOADING.js and PRELOAD.js   // Load every image wanted, the game will start only after all images are loaded (create an img folder)
INIT.js                     // Instantiate the GAME Object, initialize it, contains the gameplay loop
ANIMATE.js                  // Contains functions for moving objects, physics, AI, etc
RENDER.js                   // Must only be used to call the functions that draw in the canvas
FPS.js                      // Number of frames that could be drawn in one second, also animate/render loop execution time (ms)

CORE folder :

INPUT.js                    // Check for keyboard and mouse inputs
MATH.js                     // Math library with some basic useful functions
SPRITE.js                   // Convert a charaset in a animated sprite
GAMEOBJECT.js               // Basic variables/functions shared by many objects (inheritance)
CAMERA.js                   // Simple camera that can move around, with zoom

FX folder :

COLOR.js                    // Color Object with useful functions
DRAW.js                     // Simplification for drawing basic shapes
FILTER.js                   // Apply a filter above everything (black & white effect for instance)
