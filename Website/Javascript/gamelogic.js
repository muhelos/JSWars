////Game Logic
//Movement checking
var occupiedgrid;

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