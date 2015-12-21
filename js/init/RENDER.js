var screenshot = null;

/***********************************************************************************************************************************************************************************

	Game.RENDER

***********************************************************************************************************************************************************************************/

game.Render = function()
{
	ctx.globalAlpha = 1;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.save();
	
		ctx.translate( Math.round(-camera.pos.x), Math.round(-camera.pos.y) );

		if ( camera.zoom != 1 )
			{ ctx.scale( camera.zoom, camera.zoom ); }

		// All render function after this

	ctx.restore();

	// If you want to draw something not affected by the camera (HUD, Menu, etc), put the functions here
}

/***********************************************************************************************************************************************************************************

	Game.AFFICHAGE

***********************************************************************************************************************************************************************************/

game.Affichage = function(array, args)
{
	var length = array.length;
	for ( var i = 0; i < length; i++ )
	{
		var callback = array[i].Render(args);
		if ( callback == "destroy" ) { array.splice(i, 1); i--; length--; }
	}
}