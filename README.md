# GameEngineLight
Small template with some basics for a game engine <br/>
The code is I think self-explanatory, though there is some comments for particular points

_______________________________________________________
###INIT folder :

- **REQUIRE.js**<br/> 
Call every script needed

- **CANVAS.js** <br/>
Can be also used for pre-rendering images canvas.PreRender()

- **LOADING.js / PRELOAD.js**<br/>
Load every image wanted, the game will start only after all images are loaded (create an img folder)

- **INIT.js**<br/>
Instantiate the GAME Object, initialize it, contains the gameplay loop

- **ANIMATE.js**<br/>
Contains functions for moving objects, physics, AI, etc

- **RENDER.js**<br/>
Must only be used to call the functions that draw in the canvas

- **FPS.js**<br/>
Number of frames that could be drawn in one second, also animate/render loop execution time (ms)

_______________________________________________________
###CORE folder :

- **INPUT.js**<br/>
Check for keyboard and mouse inputs

- **MATH.js**<br/>
Math library with some basic useful functions

- **SPRITE.js**<br/>
Convert a charaset in a animated sprite

- **GAMEOBJECT.js**<br/>
Basic variables/functions shared by many objects (inheritance)

- **CAMERA.js**<br/>
Simple camera that can move around, with zoom

_______________________________________________________
###FX folder :

- **COLOR.js**<br/>
Color Object with useful functions

- **DRAW.js**<br/>
Simplification for drawing basic shapes

- **FILTER.js**<br/>
Apply a filter above everything (black & white effect for instance)
