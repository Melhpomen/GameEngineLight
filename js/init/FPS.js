/***********************************************************************************************************************************************************************************

	FPS

		How to use it in your gameplay loop :

		FPS.timer.start = new Date().getTime();
		// AnimateLoop();
		FPS.timer.mid = new Date().getTime();
		// RenderLoop();
		FPS.call();

***********************************************************************************************************************************************************************************/

var FPS = {};

FPS.active = true; 	// Shall we draw the framerate ?
FPS.frames = 0; 		// Number of frames since last update
FPS.last = 0;		// Last FPS check date

FPS.draw = { fps : 0, animate : 0, render : 0 };
FPS.timer = { total : 0, start : 0, mid : 0, end : 0, animate : 0, render : 0 };

/***********************************************************************************************************************************************************************************

	FPS.CALL

***********************************************************************************************************************************************************************************/

FPS.Call = function()
{
	if ( this.active )
	{ 
		this.Animate();
		this.Render(); 
	}
}

/***********************************************************************************************************************************************************************************

	FPS.ANIMATE

***********************************************************************************************************************************************************************************/

FPS.Animate = function()
{
	this.timer.end = new Date().getTime(); // Current time for comparison

	this.frames++;
	this.timer.animate += this.timer.mid - this.timer.start; 	// We add last animate loop duration
	this.timer.render += this.timer.end - this.timer.mid;	// The same for the render and the total
	this.timer.total += this.timer.end - this.timer.start;

	if ( new Date().getTime() - this.last > 1000 ) // If the last calculation was more than 1000 frames ago
	{
		this.draw.fps = Math.floor( 1000 / ( this.timer.total / this.frames ) ); 	// FPS final value
		this.draw.animate = Math.floor( this.timer.animate / this.frames ); 	// Animate loop duration (ms)
		this.draw.render = Math.floor( this.timer.render / this.frames );

		// console.log( "Frames : " + this.frames + " / FPS : " + this.timer.total + " / Animate : " + this.timer.animate + " / Render : " + this.timer.render );

		if ( this.draw.animate > 16 ) // Just to check if we had a huge lag
		{
			console.log("ANIMATE LAG");
		}
		if ( this.draw.render > 16 )
		{
			console.log("RENDER LAG");
		}

		this.frames = 0; // We reset all values
		this.timer.animate = 0;
		this.timer.render = 0;
		this.timer.total = 0;
		this.last = new Date().getTime(); // Last FPS check date
	}
}

/***********************************************************************************************************************************************************************************

	FPS.RENDER

***********************************************************************************************************************************************************************************/

FPS.Render = function()
{
	ctx.globalAlpha = 1;
	ctx.fillStyle = "green";
	ctx.font = "100px Arial Black";
	ctx.fillText( this.draw.fps, 10, 80, 50, 50 );		// FPS

	ctx.fillStyle = "red";
	ctx.font = "40px Arial Black";
	ctx.fillText( this.draw.render, 70, 40, 50, 50 ); 	// RENDER (ms)

	ctx.fillStyle = "white";
	ctx.fillText( this.draw.animate, 70, 80, 50, 50 ); 	// ANIMATE (ms)
}