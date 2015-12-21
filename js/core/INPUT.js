/******************************************************************************************************************************************************************************

	KEYBOARD

*******************************************************************************************************************************************************************************/

var INPUT = {};
INPUT.key = new Array(); // True for pressed
INPUT.tap = new Array(); // Double-tap
INPUT.last = 0;
INPUT.timer = 0;
INPUT.text = ""; // Last input in text format
INPUT.clip = "";

addEventListener("keydown", function (e) {

	var NOW = new Date().getTime();
	INPUT.key[INPUT.keyToName(e.keyCode)] = true;

	if ( INPUT.last == e.keyCode && NOW - INPUT.timer < 150 ) // Default timer for double-tap : 150ms
	{ INPUT.tap[INPUT.keyToName(e.keyCode)] = true; }

	INPUT.last = e.keyCode;
	INPUT.text = INPUT.keyToName(e.keyCode);

}, false);

addEventListener("keyup", function (e) {

	INPUT.key[INPUT.keyToName(e.keyCode)] = false;
	INPUT.tap[INPUT.keyToName(e.keyCode)] = false;
	
	INPUT.timer = new Date().getTime();
	
}, false);

INPUT.keyToName = function(keycode)
{
	var name = "";
	switch(keycode)
	{
		// TOUCHES
		case 8 : name = "BACK"; break;
		case 13 : name = "ENTER"; break;
		case 16 : name = "SHIFT"; break;
		case 17 : name = "CTRL"; break;
		case 18 : name = "ALT"; break;
		case 27 : name = "ECHAP"; break;
		case 32 : name = "SPACE"; break;
		case 37 : name = "LEFT"; break;
		case 38 : name = "UP"; break;
		case 39 : name = "RIGHT"; break;
		case 40 : name = "DOWN"; break;
		case 56 : name = "UNDER"; break;

		// ALPHABET CLASSIQUE
		case 65 : name = "A"; break;
		case 66 : name = "B"; break;
		case 67 : name = "C"; break;
		case 68 : name = "D"; break;
		case 69 : name = "E"; break;
		case 70 : name = "F"; break;
		case 71 : name = "G"; break;
		case 72 : name = "H"; break;
		case 73 : name = "I"; break;
		case 74 : name = "J"; break;
		case 75 : name = "K"; break;
		case 76 : name = "L"; break;
		case 77 : name = "M"; break;
		case 78 : name = "N"; break;
		case 79 : name = "O"; break;
		case 80 : name = "P"; break;
		case 81 : name = "Q"; break;
		case 82 : name = "R"; break;
		case 83 : name = "S"; break;
		case 84 : name = "T"; break;
		case 85 : name = "U"; break;
		case 86 : name = "V"; break;
		case 87 : name = "W"; break;
		case 88 : name = "X"; break;
		case 89 : name = "Y"; break;
		case 90 : name = "Z"; break;

		// NUMEROS ET NUMPAD
		case 96 : name = "0"; break;
		case 97 : name = "1"; break;
		case 98 : name = "2"; break;
		case 99 : name = "3"; break;
		case 100 : name = "4"; break;
		case 101 : name = "5"; break;
		case 102 : name = "6"; break;
		case 103 : name = "7"; break;
		case 104 : name = "8"; break;
		case 105 : name = "9"; break;

		case 107 : name = "+"; break;
		case 109 : name = "-"; break;
	}
	return name;
}

/******************************************************************************************************************************************************************************

	MOUSE

*******************************************************************************************************************************************************************************/

var MOUSE = { x : 0, y : 0, gauche : false, molette : false, droite : false };

addEventListener("mousemove", function (e) {
	MOUSE.x = Math.round(e.offsetX || e.layerX ) * ( canvas.width / canvas.screenX );
	MOUSE.y = Math.round(e.offsetY || e.layerY ) * ( canvas.height / canvas.screenY );
}, false);

addEventListener("mousedown", function (e) {
	switch ( e.button )
	{
		case 0 : MOUSE.gauche = true; break; // Left
		case 1 : MOUSE.molette = true; break; // Middle
		case 2 : MOUSE.droite = true; break; // Right
	}
}, false);

addEventListener("mouseup", function (e) {
	switch ( e.button )
	{
		case 0 : MOUSE.gauche = false; break;
		case 1 : MOUSE.molette = false; break;
		case 2 : MOUSE.droite = false; break;
	}
}, false);