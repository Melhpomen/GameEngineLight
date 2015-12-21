/******************************************************************************************************************

	DRAW

******************************************************************************************************************/

var draw = {};

draw.forme = function(forme, pos, size, triangle)
{
	switch ( forme )
	{
		case "Line" : {
			ctx.beginPath();
			ctx.moveTo( pos.x, pos.y );
			ctx.lineTo( size.x, size.y );
			
			ctx.lineWidth = 5;
			ctx.closePath();
			ctx.stroke();
		}; break;

		case "Rect" : {
			ctx.fillRect( Math.round(pos.x - size.width/2), Math.round(pos.y - size.height/2), size.width, size.height); 
		}; break;

		case "Tri" : {
			var t = triangle.points; // Triangle is an Array with 3 objects { x : 0, y : 0 }

			ctx.beginPath();
			ctx.moveTo( t[0].x, t[0].y );

			for ( var i = 0; i < 3; i++ )
			{
				var p = t[ i == 2 ? 0 : i + 1 ];
				ctx.lineTo(p.x, p.y);
			}

			ctx.closePath();
			ctx.fill();
		}; break;

		case "Circle" : {
			ctx.beginPath();
			ctx.arc( pos.x, pos.y, size.width/2, 0, 2 * Math.PI, false );
			ctx.closePath();
			ctx.fill();
		}; break;
	}
}

/***********************************************************************************************************************************************************************************

	draw.TEXT

***********************************************************************************************************************************************************************************/

draw.text = function(text, pos, args)
{
	ctx.globalAlpha = 1;
	ctx.fillStyle = "white";
	ctx.font = "24px Calibri";

	if ( args != null )
	{
		if ( args.align != null )		{ ctx.textAlign = args.align; }			// Horizontal
		if ( args.line != null )		{ ctx.textBaseline = args.line; }		// Vertical
		if ( args.op != null )		{ ctx.globalAlpha = args.op; }			// Opacity
		if ( args.color != null )		{ ctx.fillStyle = args.color; }			// Color
		if ( args.size != null )		{ ctx.font = args.size + "px Calibri"; }	// Size
	}
	
	ctx.fillText( text, pos.x, pos.y );
	ctx.textAlign = "initial";
	ctx.textBaseline = "alphabetic";
}