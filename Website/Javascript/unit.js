////Classes
function Unit(xc, yc, hp, sprt, drw)
{
	this.x = xc;
	this.y = yc;
	this.gx = Math.round(this.x/gridPixel);
	this.gy = Math.round(this.x/gridPixel);
	this.health = hp;
	this.sprite = sprt;
	this.draw = drw;
	this.solid = true;
	
	this.moveRelative = function(xdelt, ydelt)
	{
		this.x+=xdelt;
		this.y+=ydelt;
		this.gx = Math.round(this.gx+xdelt/gridPixel);
		this.gy = Math.round(this.gy+ydelt/gridPixel);
	}
	
	this.gridMoveRelative = function(xdelt, ydelt)
	{
		this.moveRelative(xdelt*gridPixel,ydelt*gridPixel);
	}
	
	this.moveAbsolute = function(xdelt, ydelt)
	{
		this.x=xdelt;
		this.y=ydelt;
		this.gx = Math.round(xdelt/gridPixel);
		this.gy = Math.round(ydelt/gridPixel);
	}
	
	this.gridMoveAbsolute = function(xdelt, ydelt)
	{
		this.moveAbsolute(this.gridXAdd(xdelt),this.gridYAdd(ydelt));
	}
	
	this.playerMove = function(gxdelt, gydelt) // relative e.g. (0,1) will go up 1 grid square
	{
		if (validGridMove(this.gridXAdd(gxdelt), this.gridYAdd(gydelt)))		// check grid to see if legit							
		{
			var tempgx = this.gx;
			var tempgy = this.gy;
			
			this.gridMoveRelative(gxdelt,gydelt);
			moveUnit(this, tempgx, tempgy, this.gx, this.gy);
		}
	}
	
	this.setSolid = function()
	{
		this.solid = true;
	}
	
	this.setUnSolid = function()
	{
		this.solid = false;
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