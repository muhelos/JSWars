////Drawing functions & vars
var imageList = new Array();
var showOccupied = false;

function drawToBuffer()
{
	drawBackground();
	drawSprites();
	if (showNotOccupied)
	{
		drawNotOccupied();
	}
	if(unitMenuOpen())
	{
		drawUnitMenu();
	}
}

function drawBackground()
{
	buffer.strokeStyle = "rgb(255, 255, 255)";
    buffer.fillStyle = "rgb(255, 255, 255)";
	buffer.fillRect(0,0,_buffer.width,_buffer.height) ;
}

function drawSprites()
{
	for(var i = 0; i < unitList.length; i++)
	{
		var workingUnit = unitList[i];
		if(workingUnit.draw)
		{
			buffer.drawImage(imageList[workingUnit.sprite], workingUnit.x*gridPixel, workingUnit.y*gridPixel);
		}
	}
}

function drawUnitMenu()
{
	buffer.fillStyle = "rgb(0,0,255)";
	buffer.fillRect(unitMenu.x*gridPixel, unitMenu.y*gridPixel, unitMenu.width, unitMenu.height); //Draw the menu
	for(var i = 0; i < unitMenu.options.length; i++)
	{
		var workingOption = unitMenu.options[i];
		buffer.fillStyle = "rgb(255,0,0)";
		buffer.fillRect(workingOption.x, workingOption.y, workingOption.width, workingOption.height);
		buffer.font="14px sans-serif";
		buffer.fillStyle = "rgb(0,0,0)";
		buffer.fillText(workingOption.text, workingOption.x, workingOption.y+workingOption.height-4, workingOption.width);
	}
}

function drawNotOccupied()
{
	for (var i = 0; i < maxX; i++)
	{
		for (var j = 0; j <maxY; j++)
		{
			if (!occupied(i,j))
			{
				buffer.fillStyle = "blue";
				buffer.fillRect(i*gridPixel, j*gridPixel, gridPixel, gridPixel);
			}
		}
	}
}

function check(ctrl)
{
	//get the state of the check box
	if (ctrl.checked == true) 
	{
		showNotOccupied = true;
	}
	else
	{
		showNotOccupied = false;
	}
}

var spriteDirectory = "Resources/Sprites/";

function addImage(fname)
{
	var temp = new Image();
	temp.src = spriteDirectory+fname;
	imageList = imageList.concat([temp]);
}
