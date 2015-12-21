var canvas = {};
var ctx;

/******************************************************************************************************************************************************************************

	canvas.INIT

*******************************************************************************************************************************************************************************/

canvas.Init = function(width, height) // Initialisation du canvas utilisé
{
	canvas.width = width;
	canvas.height = height;
	canvas.ratio = width / height;

	canvas.main = document.getElementById("screen");
	canvas.main.oncontextmenu = new Function("return false"); // No right click
	canvas.main.width = width;
	canvas.main.height = height;
	ctx = canvas.main.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	canvas.Resize();
	window.addEventListener("resize", canvas.resize, false); // To preserve a perfect ratio at any time
};

/******************************************************************************************************************************************************************************

	canvas.RESIZE

*******************************************************************************************************************************************************************************/

canvas.Resize = function()
{
	var delta = { width : window.innerWidth, height : window.innerHeight };
	delta.ratio = delta.width / delta.height;

	if ( delta.ratio > canvas.ratio )
	{
		delta.width = delta.height * canvas.ratio;
	}
	else
	{
		delta.height = delta.width / canvas.ratio;
	}

	canvas.main.style.width = delta.width + "px";
	canvas.main.style.height = delta.height + "px";

	canvas.screenX = delta.width;
	canvas.screenY = delta.height;

	canvas.main.style.marginLeft = (-delta.width / 2) + 'px';
	canvas.main.style.marginTop = (-delta.height / 2) + 'px';
};

/******************************************************************************************************************************************************************************

	canvas.PRERENDER

*******************************************************************************************************************************************************************************/

canvas.PreRender = function (width, height, renderFunction) 
{
	var buffer = document.createElement("canvas");
	var ctxTemp = buffer.getContext("2d");
	ctxTemp.imageSmoothingEnabled = false;
	buffer.width = width;
	buffer.height = height;

	renderFunction( ctxTemp );
	return buffer;
}

/******************************************************************************************************************************************************************************

	RequestAnimFrame

*******************************************************************************************************************************************************************************/

window.requestAnimFrame = ( function()
{
	return  window.requestAnimationFrame    ||
	window.webkitRequestAnimationFrame 	||
	window.mozRequestAnimationFrame    	||
	window.oRequestAnimationFrame      	||
	window.msRequestAnimationFrame     	||
	function(callback)
	{
		window.setTimeout(callback, 1000 / 60);
	};
})();