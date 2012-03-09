var optionHeight = 20; //How tall each menu option is
var menuWidth = 40;

function UnitMenu(x, y, move)
//X & Y are grid position determining where the menu is drawn.  
//All other vars are booleans determining if that part should be drawn
{
	this.x = x;
	this.y = y;
	this.move = move;
	this.options = new Array();
	
	if(this.move)
	{
		this.options = this.options.concat([new menuOption(this, 'Move')]);
	}
	
	this.width = menuWidth;
	this.height = this.options.length*optionHeight;
}

function menuOption(u, text)
//X & Y here are measured in pixel space because they're drawn sub-grid
{
	this.x = u.x*gridPixel+2; //Padding
	this.y = u.y*gridPixel+u.options.length*optionHeight+2; //Padding
	this.width = menuWidth-4;
	this.height = optionHeight-4;
	this.text = text;
	this.rgb = 'rgb(255,0,0)';
	
	this.action = function()
	{
		alert(this.text);
	}
}