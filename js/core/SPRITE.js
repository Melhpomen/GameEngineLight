var SPR = new Array(); // Contains every frame from each sprite

/***********************************************************************************************************************************************************************************

	SPRITE

		sprite = new Sprite( img["folder"]["filename"], { x : 0, y : 0 }, { x : 0, y 0 } );
		max is the number of cases in the sprite
		decal is an optionnal parameter if the sprite should not be displayed at the same coordinates than its parent

***********************************************************************************************************************************************************************************/

function Sprite(img, max, decal)
{
	this.frame = 0;
	this.frames = 0;
	this.framerate = 0.21; // Animation Speed

	this.image = img;
	if ( SPR[img.src] == null ) { SPR[img.src] = new Array(); }

	this.size = { width : img.width, height : img.height };
	this.pos = { x : 0, y : 0, orientation : "RIGHT" };
	this.cases = { width : Math.floor(img.width/max.x), height : Math.floor(img.height/max.y) };

	this.decal = { x : 0, y : 0 };
	if ( decal != null ) 
	{
		if ( decal.x != null ) { this.decal.x = decal.x; }
		if ( decal.y != null ) { this.decal.y = decal.y; }
	}

	this.last = { name : "", frame : 0 };
	this.buffer = null;
	this.fixed = false;
	this.invert = false;

	this.op = 1;
	this.angle = 0;

	this.stay = 0;
	this.zoom = 1;

	this.name = "";
	this.majSprite();
}

/***********************************************************************************************************************************************************************************

	Sprite.MAJ

***********************************************************************************************************************************************************************************/

Sprite.prototype.Maj = function(name, pos, frames, fixed, invert, stay) // Change the animation
{
	if ( name != this.name )
	{
		this.invert = false;
		this.name = name;
		this.pos.x = pos.x != null ? pos.x : 0;
		this.pos.y = pos.y != null ? pos.y : 0;
		this.frames = frames;
		this.frame = 0;
		this.fixed = fixed != null ? fixed : false;

		if ( stay != null ) { this.stay = stay; } // If you want the animation to have an ending lag time
		else { this.stay = 0; }
		if ( this.fixed ) { this.majSprite(); }
		if ( invert )
		{
			this.invert = true;
			this.frame = this.frames - 0.1;
		}
	}	
}

/***********************************************************************************************************************************************************************************

	Sprite.MAJSPRITE

***********************************************************************************************************************************************************************************/

Sprite.prototype.MajSprite = function()
{
	var condition = false;
	var length = SPR[this.image.src].length;

	for ( var i = 0; i < length; i++ )
	{
		var d = SPR[this.image.src][i];
		if ( this.name == d.name && this.pos.orientation == d.orient && Math.floor(this.frame) == d.frame )
		{
			this.buffer = SPR[this.image.src][i].image;
			condition = true;
			return;
		}
	}

	if ( condition == false ) // If the image doesn't exist
	{
		var o = { image : this.image, width : this.cases.width, height : this.cases.height, x : this.pos.x, y : this.pos.y, orient : this.pos.orientation, frame : Math.floor(this.frame) + this.pos.x, angle : this.angle, decal : this.decal };
		var buff = canvas.PreRender( this.cases.width, this.cases.height, function(ctxTemp) 
		{
			var decal = { x : 0, y : 0 };
			var sens = { x : 1, y : 1 };

			ctxTemp.save();

			if ( o.orient == "LEFT" ) 
				{ decal.x = -o.width; sens.x = -1; }
			if ( decal.x !=0 || decal.y != 0 || o.decal.y != 0 ) 
				{ ctxTemp.translate( Math.floor(decal.x * sens.x), Math.floor(decal.y + o.decal.y) ); }
			if ( sens.x != 1 || sens.y != 1 )
				{ ctxTemp.scale( sens.x, sens.y ); }
			

			ctxTemp.drawImage( o.image, o.width*o.frame, o.y*o.height, o.width, o.height, 0, 0, o.width, o.height );
			ctxTemp.restore();
		});

		this.buffer = buff;
		var dec = { image : buff, name : this.name, frame : Math.floor(this.frame), orient : this.pos.orientation };
		SPR[this.image.src].push(dec);
	}	
}

/***********************************************************************************************************************************************************************************

	Sprite.ANIMATE

***********************************************************************************************************************************************************************************/

Sprite.prototype.Animate = function(parent)
{
	this.frame += (this.invert == true ? -this.framerate : this.framerate);

	if ( this.stay > 0 )
	{
		this.stay -= (this.invert == true ? -this.framerate : this.framerate);
		if ( this.stay < 1 ) { this.stay = 0; }
	}
	
	if ( this.stay == 0 && ( ( !this.invert && this.frame > this.frames ) || ( this.invert && this.frame <= 0 ) ) ) // End of animation
	{
		this.name = "";
		this.frame = 0;
		if ( this.invert ) { this.frame = this.frames - 0.1; }
	}
	else if ( !this.fixed && this.frame < this.frames && ( this.last.name != this.name || Math.floor(this.last.frame) != Math.floor(this.frame) ) )
	{
		this.MajSprite();
	}
	this.last.name = this.name;
	this.last.frame = this.frame;
}

/***********************************************************************************************************************************************************************************

	Sprite.RENDER

***********************************************************************************************************************************************************************************/

Sprite.prototype.Render = function(parent)
{
	if ( !this.fixed || this.frames > 0 ) { this.animate(parent); }

	ctx.save();
	ctx.translate( Math.ceil(parent.pos.x), Math.ceil(parent.pos.y) );

	if ( this.angle != 0 )
		{ ctx.rotate(this.angle*Math.PI/180); }

	ctx.globalAlpha = this.op;

	var z = this.zoom;
	ctx.drawImage( this.buffer,  -this.cases.width/2 * z, -this.cases.height/2 * z, this.cases.width * z, this.cases.height * z );
	ctx.restore();
}