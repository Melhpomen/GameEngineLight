var game = {}; // Contains the whole game

game.paused = false;
game.gravity = 1.3;

var O = new Array(); // Contains every object of the game

/***********************************************************************************************************************************************************************************

	Game.INIT

***********************************************************************************************************************************************************************************/

game.Init = function() // When all the scripts are loaded
{
	// 
	camera = new Camera();

	FPS.timer.last = new Date().getTime();
	game.Loop(); // When everything has been setup, the game starts
}

/***********************************************************************************************************************************************************************************

	Game.LOOP

***********************************************************************************************************************************************************************************/

game.Loop = function()
{
	requestAnimFrame(game.Loop);

	if ( !game.paused )
	{
		FPS.timer.start = new Date().getTime();
		game.Animate();
		FPS.timer.mid = new Date().getTime();
		game.Render();
	}

	// function controlling game.paused ?

	FPS.Call();
}