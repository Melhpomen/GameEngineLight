/******************************************************************************************************************************************************************************

	FINDOBJECT

*******************************************************************************************************************************************************************************/

function findObject(type, id) // Search GameObject by type and ID
{
	var length = O[type].length;
	for ( var i = 0; i < length; i++ )
	{
		if ( O[type][i].id == id ) { return O[type][i]; }
	}
}

/******************************************************************************************************************************************************************************

	GAME OBJECT

		In another object ( player for exemple ) :
		
		function Player()
		{
			GameObject(this, pos, size);
		}

*******************************************************************************************************************************************************************************/

function GameObject(Object, pos, size) // Take any object and add shared properties
{
	Object.visible = true;
	Object.active = true;

	Object.id = Math.random()*98765432123456789;
	Object.init = { pos : { x : pos.x, y : pos.y } };
	Object.type = "Object";

	Object.pos = { x : pos.x + size.width/2, y : pos.y + size.height/2, orientation : "Right" };
	Object.size = { width : size != null ? size.width : 0, height : size != null ? size.height : 0 };

	Object.fixed = false;
	Object.grounded = false; 		// On the ground ?
	Object.side = ""; 				// Collision's side
	Object.gravity = false; 			// Affected by gravity ?
	
	Object.forces = new Array();
	Object.v = { x : 0, y : 0, max : 5 };			// V.max to avoid weird things
	Object.phy = { x : 0, y : 0, friction : 10 };
	Object.hitbox = null;
	Object.interacts = new Array(); 			// Types of objects interacting with it

	Object.action = null;
	Object.sprite = null;
	Object.buffer = null;

	Object.timer = new Array();
	Object.timer["Destroy"] = -1;
	Object.destroy = false;

	/*
		add any function shared with all gameObject like so :

		Object.FunctionName = function() {}
	*/
}