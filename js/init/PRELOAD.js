var load = {};
var img = new Array(); // Contains all the loaded images of the game
load.nbImage = 0;
load.nbLoaded = 0;
load.isLoading = new Array();

load.Preload = function(liste)
{
	for ( var type in liste )
	{
		load.nbImage += liste[type].length;
		img[type] = new Array();

		for ( var i in liste[type] )
		{
			var link = liste[type][i];
			img[type][link] = new Image();
			img[type][link].src = "img/" + type + "/" + link + ".png";

			var tmp = i + load.nbImage - liste[type].length;
			img[type][link].id = tmp;
			load.isLoading[tmp] = { type : type, lien : link };

			img[type][link].onload = function() 
			{
				// console.log( load.isLoading[this.id].lien + " : " + img[load.isLoading[this.id].type][load.isLoading[this.id].lien].complete);
				load.nbLoaded++;
				if ( load.nbLoaded == load.nbImage )
				{
					load.Animation = null;
					game.Init();
				}
			}
		}
	}

	if ( load.nbImage == 0 ) { game.Init(); }
}

load.Animation = function()
{
	var pourcentage = load.nbLoaded / load.nbImage * 100;

	ctx.fillStyle = "green";
	ctx.fillRect(0,0, canvas.width*pourcentage, canvas.height);

	if ( load.nbLoaded != load.nbImage ) { requestAnimFrame(load.Animation); }
}