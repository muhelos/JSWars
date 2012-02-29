var _canvas = null;
var _buffer = null;
var canvas = null; //AKA: Context
var buffer = null; //AKA: Buffer Context


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

function drawToBuffer()
{
	drawBackground();
	drawSprites();
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
	}
}