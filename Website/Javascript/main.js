var _canvas = null;
var _buffer = null;
var canvas = null; //AKA: Context
var buffer = null; //AKA: Buffer Context

<<<<<<< HEAD
var gridPixel = 32;

=======
>>>>>>> 9aa00511aee9f7df80650fc59f43aa30e76def19
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
		addUnit(new Unit(30,50,10,0,true));
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
<<<<<<< HEAD
			unitList[0].gridMove(-1,0);
			break;

		case 38: // Up
			unitList[0].gridMove(0,-1);
			break;

		case 39: // Right
			unitList[0].gridMove(1,0);
			break;

		case 40: // Down
			unitList[0].gridMove(0,1);
=======
			unitList[0].move(-20,0);
			break;

		case 38: // Up
			unitList[0].move(0,-20);
			break;

		case 39: // Right
			unitList[0].move(20,0);
			break;

		case 40: // Down
			unitList[0].move(0,20);
>>>>>>> 9aa00511aee9f7df80650fc59f43aa30e76def19
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
	
	this.move = function(xdelt, ydelt)
	{
		this.x+=xdelt;
		this.y+=ydelt;
	}
<<<<<<< HEAD
	
	this.gridMove = function(xdelt, ydelt)
	{
		this.x+=xdelt*gridPixel;
		this.y+=ydelt*gridPixel;
	}
=======
>>>>>>> 9aa00511aee9f7df80650fc59f43aa30e76def19
}