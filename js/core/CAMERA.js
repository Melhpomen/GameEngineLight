/***********************************************************************************************************************************************************************************

	CAMERA

***********************************************************************************************************************************************************************************/

var camera = {};

function Camera(objet)
{
	this.pos = { x : 0, y : 0 };
	this.initPos = { x : 0, y : 0 };
	this.v = { x : 0, y : 0, s : 5 };

	this.focus = objet != null ? objet : { type : "PLAYER" }; // By default, the camera follow the player
	this.cible = { x : 0, y : 0, cX : 0, cY : 0, lastX : 0, lastY : 0 };

	this.zoomLvl = 5;
	this.initZoom = 0.4;
	this.zoom = 0.4;	
	this.newZoom = 0.4;
	this.deltaZoom = 0;

	this.showHitbox = false;
	this.bounds = false;
	this.animations = new Array();
}

/***********************************************************************************************************************************************************************************

	Camera.ANIMATE

***********************************************************************************************************************************************************************************/

Camera.prototype.Animate = function()
{
	this.following();
}

/***********************************************************************************************************************************************************************************

	Camera.CHANGEZOOM

***********************************************************************************************************************************************************************************/

Camera.prototype.ChangeZoom = function(sens)
{
	this.zoomLvl += sens == true ? 1 : -1;

	if ( this.zoomLvl > 13 || this.zoomLvl < 0 )
	{
		this.zoomLvl = this.zoomLvl > 13 ? 13 : 0;
	}
	
	switch ( this.zoomLvl )
	{
		case 0 : 	this.newZoom = 0.05;	break;
		case 1 : 	this.newZoom = 0.1;	break;
		case 2 : 	this.newZoom = 0.15;	break;
		case 3 : 	this.newZoom = 0.2;	break;
		case 4 : 	this.newZoom = 0.3;	break;
		case 5 : 	this.newZoom = 0.4;	break;
		case 6 : 	this.newZoom = 0.55;	break;
		case 7 : 	this.newZoom = 0.7;	break;
		case 8 : 	this.newZoom = 0.85;	break;
		case 9 : 	this.newZoom = 1;		break;
		case 10 : 	this.newZoom = 1.25;	break;
		case 11 : 	this.newZoom = 1.5;	break;
		case 12 : 	this.newZoom = 1.75;	break;
		case 13 : 	this.newZoom = 2;	break;
	}

	this.deltaZoom = this.newZoom - this.zoom;
	if ( !sens ) 	{ this.deltaZoom = this.zoom - this.newZoom; }
}

/***********************************************************************************************************************************************************************************

	Camera.CHAMP

***********************************************************************************************************************************************************************************/

Camera.prototype.Champ = function(decal)
{
	var zoomSpeed = this.deltaZoom / 50;
	if ( Charles.ON ) { zoomSpeed = this.deltaZoom / 20; }

	if ( this.newZoom > this.zoom ) 						{ this.zoom += zoomSpeed; }
	else if ( this.newZoom < this.zoom ) 						{ this.zoom -= zoomSpeed; }
	if ( Math.abs(this.newZoom - this.zoom) < this.deltaZoom/10 ) 	{ this.zoom = this.newZoom; }
}

/***********************************************************************************************************************************************************************************

	Camera.FOLLOWING

***********************************************************************************************************************************************************************************/

Camera.prototype.following = function() // Suivi de la cible souhaitée
{
	if ( this.focus != null ) // Si jamais une cible est donnée, on doit bouger la caméra
	{
		var decal = null;
		if ( this.focus.type == "PLAYER" ) { decal = player; }
		else { decal = findObject(this.focus.type, this.focus.id); }
		
		this.champ(decal); // Pour la gestion du champ de vision

		this.pos.x = Math.floor( ( decal.pos.x + this.cible.x ) * this.zoom - canvas.width/2 );
		this.pos.y = Math.floor( ( decal.pos.y + this.cible.y ) * this.zoom - canvas.height/2 );

		/*
		if ( this.bounds )
		{
			if ( this.pos.x <= 0 ) { // Quand le joueur arrive en bout de map à gauche
				this.pos.x = 0;
			}
			else if ( this.pos.x >= (LD.current.size.width * this.zoom) - canvas.width ) { // S'il arrive au bout droite du terrain
				this.pos.x = (LD.current.size.width * this.zoom) - canvas.width;
			}
			if ( this.pos.y <= 0 ) { // Pour le haut
				this.pos.y = 0;
			}
			else if ( this.pos.y >= (LD.current.size.height * this.zoom) - canvas.height ) { // Pour le bas
				this.pos.y = (LD.current.size.height * this.zoom) - canvas.height;
			}
		}
		*/
	}
}

/***********************************************************************************************************************************************************************************

	Camera.CONTROLS

***********************************************************************************************************************************************************************************/

Camera.prototype.Controls = function()
{
	var ratio = 10 * this.zoom;

	if ( INPUT.key["LEFT"] || INPUT.key["RIGHT"] ) 
		{ this.cible.x -= INPUT.key["LEFT"] ? 400 / ratio : -400 / ratio; }

	if ( INPUT.key["UP"] || INPUT.key["DOWN"] ) 
		{ this.cible.y -= INPUT.key["UP"] ? 400 / ratio : -400 / ratio; }

	if ( MOUSE.molette ) // Free moves
	{	
		if ( MOUSE.x > canvas.width/2 )		{ this.cible.x += ( MOUSE.x - canvas.width/2 ) / ratio; }
		if ( MOUSE.x < canvas.width/2 )		{ this.cible.x -= ( canvas.width/2 - MOUSE.x ) / ratio; }
		if ( MOUSE.y > canvas.height/2 )		{ this.cible.y += ( MOUSE.y - canvas.height/2 ) / ratio; }
		if ( MOUSE.y < canvas.height/2 )		{ this.cible.y -= ( canvas.height/2 - MOUSE.y ) / ratio; }
	}

	if ( INPUT.key["ESPACE"] ) // Return to initial position
	{
		this.cible.x = 0;
		this.cible.y = 0;
	}

	if ( INPUT.key["+"] || INPUT.key["-"] )
	{
		this.changeZoom( INPUT.key["+"] );
		INPUT.key["+"] = false;
		INPUT.key["-"] = false;
	}
}