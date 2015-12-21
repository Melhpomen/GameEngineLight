var start = function()
{
	canvas.Init(1920, 1080);
	load.Loading();
}

function initScript(dossier, scripts, init)
{
	var scriptsDone = 0;
	var callback = function()
	{
		scriptsDone++;
		if ( scriptsDone == scripts.length )
		{
			init();
		}
		else
		{
			callScript(dossier, scripts, scriptsDone, callback);
		}
	}

	callScript(dossier, scripts, scriptsDone, callback);
}

function callScript(dossier, scripts, index, callback)
{
	var script = document.createElement("script");
	
	script.id = scripts[index];
	script.setAttribute("src", "./" + dossier + scripts[index] + ".js");
	script.onload = callback;
	script.type = "text/javascript";

	document.body.appendChild(script);
}

initScript( "js/", [

		"init/CANVAS", 
		"init/PRELOAD",
		"init/LOADING",
		"init/INIT",
		"init/FPS",

		"core/INPUT",
		"core/GAMEOBJECT",
		"core/CAMERA",
		"core/MATH",
		"core/SPRITE",

		"fx/DRAW",
		"fx/COLOR",
		"fx/FILTER",
		
		"init/ANIMATE",	
		"init/RENDER"	
	], 
	start
);