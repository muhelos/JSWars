var _canvas;
var _buffer;
var canvas; //AKA: Context
var buffer; //AKA: Buffer Context
var showOccupiedSpaces = false;

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
		unitGrid = new Array(_buffer.width/gridPixel*_buffer.height/gridPixel);
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

////Input
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

