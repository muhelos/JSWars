////Classes
function Unit(xc, yc, hp, sprt, drw)
{
	this.x = xc;
	this.y = yc;
	this.health = hp;
	this.sprite = sprt;
	this.draw = drw;
	this.speed = 5; //How many spaces it can move per turn
	this.solid = true;
	this.clickable = true;
	this.current = false;
	
	this.setCurrent = function()
	{
		this.current = true;
		this.sprite = 1;
	}
	this.setNotCurrent = function()
	{
		this.current = false;
		this.sprite = 0;
	}
	this.isCurrent = function()
	{
		return this.current;
	}
	
	this.moveRelative = function(xdelt, ydelt)// called by moveunitrelative by playermove
	{
		this.x += xdelt;
		this.y += ydelt;
	}
	
	this.moveAbsolute = function(x, y) // called by moveunit by playermoveabsolute
	{
		this.x = x;
		this.y = y;
	}
	
	this.playerMove = function(xdelt, ydelt) // relative e.g. (0,1) will go up 1 grid square
	{
		if (validMove(this.x + xdelt, this.y + ydelt)) // check grid to see if legit							
		{	
			moveUnitRelative(this, xdelt, ydelt);
			// OR moveUnit(this,x+xdelt,y+ydelt);
		}
	}
	
	this.playerMoveAbsolute = function(x, y) // Absolute e.g. (0,1) will go up 1 grid square
	{
		if (validMove(x,y)) // check grid to see if legit							
		{	
			moveUnit(this, x, y);
		}
	}
	
	this.validMoveRelative = function(xdelt, ydelt)	// relative - input grid location not pixel location
	{
		var tempx =this.x + xdelt;
		var tempy = this.y + ydelt;
		if (tempx >= 0 && tempy >= 0 &&  tempx < maxX && tempy < maxY)
		{
			if (!occupied(tempx, tempy))
			{
				return true;
			}
		}
		return false;
	}
	
	this.setSolid = function()
	{
		this.solid = true;
	}
	
	this.setUnSolid = function()
	{
		this.solid = false;
	}
}