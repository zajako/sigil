var images = new Array()

function preload()
{
	for (i = 0; i < preload.arguments.length; i++)
	{
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
}

preload(
	"./IMG/brushes/blood.png",
	"./IMG/brushes/blood2.png",
	"./IMG/brushes/charcoal.png",
	"./IMG/brushes/goldbrush.png",
	"./IMG/brushes/mercury.png",

	"./IMG/lowerscreen.png",

	"./IMG/buttons/arrowDown.png",
	"./IMG/buttons/arrowUp.png",
	"./IMG/buttons/arrowLeft.png",
	"./IMG/buttons/arrowRight.png",

	"./IMG/buttons/bloodvial.png",
	"./IMG/buttons/charcoal.png",
	"./IMG/buttons/GoldPowderPile.png",
	"./IMG/buttons/mercuryvial.png"

);