var _canvas = null;
var _buffer = null;
var canvas = null; //AKA: Context
var buffer = null; //AKA: Buffer Context

var unitList = new Array();

function Game(){
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
        if(canvas != null)
		{
            self.gameLoop = setInterval(self.Loop, 50);
        }
            
    }
    
    this.Update = function()
	{
        // Update Objects
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
//Loading functions
var imageFnameList = new Array();

function loadImages()
{
}

//Drawing functions & vars
var imageList = new Array();

function drawToBuffer()
{
	drawBackground();
	drawSprites();
	var imageObj = new Image();
	imageObj.src = "Resources/Sprites/square.png";
	buffer.drawImage(imageObj, 0, 0);
}

function drawBackground()
{
	for(var i = 0; i < unitList.length; i++)
	{
		
	}
}

var spriteDirectory = "Resources/Sprites/";

function addImage(fname)
{
	var temp = new Image();
	temp.src = spriteDirectory+fname;
	imageList = imageList.concat([temp]);
}

//Classes
function unit(x, y, hp, sprt, drw)
{
	this.x = x; //X Coordinate
	this.y = y;
	this.health = hp;
	this.sprite = sprt;
	this.draw = drw;
}