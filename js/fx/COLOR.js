/******************************************************************************************************************

	COLOR

******************************************************************************************************************/

function Color(color)
{
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.a = 1;

	this.lerping = false;
	this.delta = { r : 0, g : 0, b : 0, a : 0 };
	this.newColor = {};

	if ( typeof(color) == "string" )
	{
		switch(color)
		{
			case "white" : 		{ this.r = 255; this.g = 255; this.b = 255; }; 	break;
			case "black" : 		{ this.r = 0; this.g = 0; this.b = 0; }; 			break;
			case "red" : 		{ this.r = 255; }; 						break;
			case "blue" : 		{ this.g = 190; this.b = 255; }; 				break;
			case "yellow" : 		{ this.r = 255; this.g = 255; }; 				break;
			case "orange" : 		{ this.r = 240; this.g = 110; }; 				break;
			case "green" : 		{ this.r = 50; this.g = 200; this.b = 50; }; 		break;
			case "blood" : 		{ this.r = 140; }; 						break;
			case "gold" : 		{ this.r = 255; this.g = 165; }; 				break;
			case "brown" : 		{ this.r = 150; this.g = 50; this.b = 50; }; 		break;
			case "deepblue" : 	{ this.r = 60; this.g = 40; this.b = 150; }; 		break;
			case "purple" : 		{ this.r = 200; this.g = 120; this.b = 200; }; 	break;
			case "pink" : 		{ this.r = 255; this.g = 190; this.b = 200; }; 	break;
			case "grey" : 		{ this.r = 120; this.g = 120; this.b = 120; }; 	break;
		}
	}
	else
	{
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
		this.a = color.a;
	}
}

/******************************************************************************************************************

	color.ANIMATE

******************************************************************************************************************/

Color.prototype.Animate = function()
{
	if ( this.lerping )
	{
		if ( 	math.InRange(this.r, this.newColor.r, 1)	&&
			math.InRange(this.g, this.newColor.g, 1) 	&&
			math.InRange(this.b, this.newColor.b, 1) 	&&
			math.InRange(this.a, this.newColor.a, 1)	 )
		{
			this.lerping = false;
		}
		else
		{
			this.r -= this.delta.r;
			this.g -= this.delta.g;
			this.b -= this.delta.b;
			this.a -= this.delta.a;
		}
	}
}

/******************************************************************************************************************

	color.CONVERT

******************************************************************************************************************/

Color.prototype.Convert = function(format)
{
	var callback = "";

	switch (format)
	{
		case "RGB" : {
			callback = "rgb(" + Math.round(this.r) + "," + Math.round(this.g) + "," + Math.round(this.b) + ")";
		}; break;

		case "RGBA" : default : {
			callback = "rgba(" + Math.round(this.r) + "," + Math.round(this.g) + "," + Math.round(this.b) + "," + this.a + ")";
		}; break;

		// Add HEX support
	}

	return callback;
}

/******************************************************************************************************************

	color.LERP

******************************************************************************************************************/

Color.prototype.Lerp = function(newC, duration) // Change the color smoothly
{
	this.newColor = newC;
	var delta = { r : this.r - newC.r, g : this.g - newC.g, b : this.b - newC.b, a : this.a - newC.a };
	this.delta.r = delta.r / duration;
	this.delta.g = delta.g / duration;
	this.delta.b = delta.b / duration;
	this.delta.a = delta.a / duration;
	this.lerping = true;
}

/******************************************************************************************************************

	color.MIXCOLORS

******************************************************************************************************************/

Color.prototype.MixColors = function(C, newC, mix) // mix = 0, color = C | mix = 100, color = newC
{
	var delta = { r : C.r - newC.r, g : C.g - newC.g, b : C.b - newC.b, a : C.a - newC.a };
	this.r = C.r - (delta.r / 100) * mix;
	this.g = C.g - (delta.g / 100) * mix;
	this.b = C.b - (delta.b / 100) * mix;
	this.a = C.a - (delta.a / 100) * mix;
}