////Drawing functions & vars
var imageList = new Array();
var showOccupied = false;

function drawToBuffer()
{
	drawBackground();
	drawSprites();
	if (showOccupied)
	{
		drawOccupied();
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
			buffer.drawImage(imageList[workingUnit.sprite], workingUnit.x, workingUnit.y);
		}
	}
}



function drawOccupied()
{
	for (var i = 0; i <_buffer.width/gridPixel; i++)
	{
		for (var j = 0; j <_buffer.height/gridPixel; j++)
		{
			if (occupied(i,j))
			{
				buffer.fillStyle = "red";
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
		showOccupied = true;
	}
	else
	{
		showOccupied = false;
	}
}

var spriteDirectory = "Resources/Sprites/";

function addImage(fname)
{
	var temp = new Image();
	temp.src = spriteDirectory+fname;
	imageList = imageList.concat([temp]);
}
