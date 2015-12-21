/******************************************************************************************************************

	FILTER

******************************************************************************************************************/

O["FILTER"] = new Array(); // Liste de tous les filtres en cours

function Filter(type)
{
	this.type = type;
	this.operation = "color";
	this.opacity = 1;
	this.color = "black";
	this.z = 0;

	this.setup();
}

/******************************************************************************************************************

	filter.SETUP

******************************************************************************************************************/

Filter.prototype.Setup = function()
{
	switch ( this.type )
	{
		case "B&W" : {
			this.operation = "color";
			this.opacity = 1;
			this.color = "black";
			this.z = 1;
		}; break;

		case "Night" : {
			this.operation = "multiply";
			this.opacity = 0.8;
			this.color = "darkblue";
		}; break;
	}
}

/******************************************************************************************************************

	filter.RENDER

******************************************************************************************************************/

Filter.prototype.Render = function()
{
	ctx.globalCompositeOperation = this.operation;
	ctx.globalAlpha = this.opacity;
	ctx.fillStyle = this.color;
	ctx.fillRect( 0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
	ctx.globalCompositeOperation = "normal";
}

/******************************************************************************************************************

	RENDERFILTERS

******************************************************************************************************************/

function RenderFilters()
{
	var zIndex = 0;
	var count = 0;

	var length = O["FILTER"].length;
	while ( count < length )
	{
		for ( var i = 0; i < length; i++ )
		{
			var F = O["FILTER"][i];
			if ( F.z == zIndex )
			{
				F.Render();
				count++;
			}
		}
		zIndex++;
	}	
}