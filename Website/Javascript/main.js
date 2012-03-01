var _canvas = null;
var _buffer = null;
var canvas = null; //AKA: Context
var buffer = null; //AKA: Buffer Context
var showOccupiedSpaces = false;

<<<<<<< HEAD

=======
>>>>>>> c59735b6b8cb9025ca894c8627a5d06603268cca
var gridPixel = 32;

function Game()
{
    this.gameLoop = null;
    var self = this;

    
    this.Init = function()
	{
        _canvas = document.getElementById('canvas');
        if (_canvas && _canvas.getContext)
		{
            canvas = _canvas.getContext('2d');
            
            _buffer = document.createElement('canvas');
            _buffer.width = _canvas.width;
            _buffer.height = _canvas.height;
            buffer = _buffer.getContext('2d');
            
            buffer.strokeStyle = "rgb(255, 255, 255)";
            buffer.fillStyle = "rgb(255, 255, 255)";
            buffer.font = "bold 25px sans-serif";
        }
		loadImages();
	}
    
    this.Run = function()
	{
		addUnit(new Unit(0,0,10,0,true));
        if(canvas != null)
		{
            self.gameLoop = setInterval(self.Loop, 50);
        }
    }
    
    this.Update = function()
	{
    }
    
    this.Draw = function()
	{
        buffer.clearRect(0, 0, _buffer.width, _buffer.height);
        canvas.clearRect(0, 0, _canvas.width, _canvas.height);
        
        //Draw Code
		drawToBuffer();
        canvas.drawImage(_buffer, 0, 0);
    }
    
    this.Loop = function()
	{
        self.Update();
        self.Draw();    
    }
}
//Vars Used Below This Line
var unitList = new Array();

//Loading functions
var imageFnameList = ['square.png'];

function loadImages()
{
	for(var i = 0; i < imageFnameList.length; i++)
	{
		addImage(imageFnameList[i]);
	}
}

//Update functions
function addUnit(u)
{
	unitList = unitList.concat([u]);
}

//Drawing functions & vars
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

//Input
window.addEventListener('keydown', function(event) 
{
	switch (event.keyCode) 
	{
		case 37: // Left
			unitList[0].playerMove(-1,0);
			break;

		case 38: // Up
			unitList[0].playerMove(0,-1);
			break;

		case 39: // Right
			unitList[0].playerMove(1,0);
			break;

		case 40: // Down
			unitList[0].playerMove(0,1);
			break;
	}
}, false);

//Classes
function Unit(xc, yc, hp, sprt, drw)
{
	this.x = xc;
	this.y = yc;
	this.health = hp;
	this.sprite = sprt;
	this.draw = drw;
	
	this.moveRelative = function(xdelt, ydelt)
	{
		this.x+=xdelt;
		this.y+=ydelt;
	}
	
	this.gridMoveRelative = function(xdelt, ydelt)
<<<<<<< HEAD
	{
		this.moveRelative(xdelt*gridPixel,ydelt*gridPixel);
	}
	
	this.moveAbsolute = function(xdelt, ydelt)
	{
		this.x=xdelt;
		this.y=ydelt;
	}
	
	this.gridMoveAbsolute = function(xdelt, ydelt)
	{
		this.moveAbsolute(this.x+xdelt,this.y+ydelt);
	} 
	
	this.playerMove = function(xdelt, ydelt)
	{
		var tempx = this.x+xdelt*gridPixel;
		var tempy = this.y+ydelt*gridPixel;
		if (tempx >= 0 && tempy >= 0 && tempx <_buffer.width && tempy < _buffer.height)
		{
			this.gridMoveRelative(xdelt,ydelt);
		}
=======
	{
		this.moveRelative(xdelt*gridPixel,ydelt*gridPixel);
	}
	
	this.moveAbsolute = function(xdelt, ydelt)
	{
		this.x=xdelt;
		this.y=ydelt;
	}
	
	this.gridMoveAbsolute = function(xdelt, ydelt)
	{
		this.moveAbsolute(this.gridXAdd(xdelt),this.gridYAdd(ydelt));
	} 
	
	validMove = function(x, y)	// absolute - input grid location not pixel location
	{
		if (x >= 0 && y >= 0 && x <_buffer.width/gridPixel && y < _buffer.height/gridPixel)
		{
			if (!occupied(x, y))
			{
				return true;
			}
		}
		return false;
	}
	
	var occupiedgrid = new Array(_buffer.width*_buffer.height);
	
	this.playerMove = function(xdelt, ydelt) // relative e.g. (0,1) will go up 1 grid square
	{
		if (validMove(this.gridXAdd(xdelt), this.gridYAdd(ydelt)))		// check grid to see if legit							
		{
			setUnOccupied(this.gridX(),this.gridY());	//set old grid square unoccupied
			setOccupied(this.gridXAdd(xdelt),this.gridYAdd(ydelt));
			setOccupied(1,1);
			this.gridMoveRelative(xdelt,ydelt);		
		}
	}
	
	this.gridX = function()
	{
		return this.x/gridPixel;
	}	
	this.gridXAdd = function(xdelt)
	{
		return this.x/gridPixel + xdelt;
	}
	this.gridY = function()
	{
		return this.y/gridPixel;
	}
	this.gridYAdd = function(ydelt)
	{
		return this.y/gridPixel + ydelt;
	}

	
	validMoveRelative = function(xdelt, ydelt)	// relative - input grid location not pixel location
	{
		var tempx =this.gridXAdd(xdelt);
		var tempy = this.gridYAdd(ydelt);
		if (tempx >= 0 && tempy >= 0 &&  tempx <_buffer.width/gridPixel && tempy < _buffer.height/gridPixel)
		{
			if (!occupied(tempx, tempy))
			{
				return true;
			}
		}
		return false;
	}
	
	setOccupied = function (x, y)
	{
		occupiedgrid[occupiedArrayConvert(x,y)] = true;
	}
	
	setUnOccupied = function (x, y)
	{
		occupiedgrid[occupiedArrayConvert(x,y)] = false;
	}
	
	occupied = function(x, y)	// absolute, input grid location not pixel location
	{
		if (occupiedgrid[occupiedArrayConvert(x,y)] == true)
		{
			return true;
		}
		return false;
	}		
	
	occupiedRelative = function(xdelt, ydelt)	// relative, input grid location not pixel location
	{
		if (occupiedgrid[occupiedArrayConvert(this.gridXAdd(xdelt), this.gridYAdd(ydelt))])
		{
			return true;
		}
		return false;
	}
	
	occupiedArrayConvert = function (x, y)
	{
		return y*(_buffer.height/gridPixel) + x;
>>>>>>> c59735b6b8cb9025ca894c8627a5d06603268cca
	}
}