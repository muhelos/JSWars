////Classes
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
		this.moveAbsolute(this.gridXAdd(xdelt),this.gridYAdd(ydelt));
	}
	
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
}