var _canvas;
var _buffer;
var canvas; //AKA: Context
var buffer; //AKA: Buffer Context
var showNotOccupied = false;

var gridPixel = 32;
var maxX;
var maxY;
var controlledUnit = null; //index
var currentState;

var gameState = {
  YOURTURN: 	{value: 0, name: "Your Turn"}, 
  ADDUNIT:	 	{value: 1, name: "Add Unit"}, 
  UNITMENUOPEN:  {value: 2, name: "Unit Menu Open"},
};

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
		maxX = _buffer.width/gridPixel;
		maxY = _buffer.height/gridPixel;
		unitGrid = new Array(maxX, maxY);
		loadImages();
	}
    
    this.Run = function()
	{
		addUnit(new Unit(0,0,10,0,true));
		changeState(gameState.YOURTURN);
		addUnit(new Unit(1,1,10,0,true));
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

function changeState(newstate)
{
	if (currentState != newstate)
	{
		if (yourTurn())
		{
			setNoCurrent();
		}
		else if (addingUnit())
		{
			showNotOccupied = false;
		}
		currentState = newstate;
		if (yourTurn())
		{
		
		}
		else if (addingUnit())
		{
			showNotOccupied = true;
		}
	}
}
	
//Vars Used Below This Line
var unitList = new Array();

//Loading functions
var imageFnameList = ['square.png','highlightedsquare.png'];

function loadImages()
{
	for(var i = 0; i < imageFnameList.length; i++)
	{
		addImage(imageFnameList[i]);
	}
}

yourTurn = function()
{
	if (currentState == gameState.YOURTURN)
	{return true;}
	return false;
}
addingUnit = function()
{
	if (currentState == gameState.ADDUNIT)
	{return true;}
	return false;
}
unitMenuOpen = function()
{
	if(currentState == gameState.UNITMENUOPEN)
	{return true;}
	return false;
}
////Input
window.addEventListener('keydown', function(event) 
{	// USE TO FIND KEYCODES http://asquare.net/javascript/tests/KeyCode.html
	if (yourTurn() && controlledUnit != null)
	{
		switch (event.keyCode)  // 
		{
			case 37: // Left
				unitList[controlledUnit].playerMove(-1,0);
				break;

			case 38: // Up	
				unitList[controlledUnit].playerMove(0,-1);
				break;

			case 39: // Right
				unitList[controlledUnit].playerMove(1,0);
				break;

			case 40: // Down
				unitList[controlledUnit].playerMove(0,1);
				break;
			case 65: // a
				if (controlledUnit < unitList.length-1) 
				{controlledUnit++;}
				break;
			case 83: // s
				if (controlledUnit > 0)
				{controlledUnit--;}
				break;
			case 32: // space
				changeState(gameState.ADDUNIT);
				break;
		}
	}
	else if (addingUnit())
	{
		switch (event.keyCode)  // 
		{
			case 32: // space
			changeState(gameState.YOURTURN);
			break;
		}
	}
	else
	{
		switch (event.keyCode)  // 
		{
			case 32: // space
			changeState(gameState.ADDUNIT);
			break;
		}
	}
}, false);

function findPos(obj)  // STOLEN http://www.quirksmode.org/js/findpos.html
{
	var curleft = curtop = 0;
	if (obj.offsetParent) 
	{
		do 
		{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}	 while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

window.addEventListener('mouseup', function(event)
{
	if (event.pageX == null)	// STOLEN http://unixpapa.com/js/mouse.html
   {
      // IE case
      var d= (document.documentElement && 
              document.documentElement.scrollLeft != null) ?
             document.documentElement : document.body;
      docX= event.clientX + d.scrollLeft;
      docY= event.clientY + d.scrollTop;
   }
   else
   {
      // all other browsers
      docX= event.pageX;
      docY= event.pageY;
   }
										// END STOLEN
   var elemPos = findPos(document.getElementById('canvas'));
   mousex = docX - elemPos[0];		//Where the mouse was clicked relative to canvas(0,0)
   mousey = docY - elemPos[1];		//Same
   handleMouseClick(mousex,mousey);
 }, false);
 
handleMouseClick = function(x, y)
{
	if(unitMenuOpen())
	{menuClicked(x, y);}
	else
	{gridClicked(Math.floor(x/gridPixel),Math.floor(y/gridPixel));}
}
