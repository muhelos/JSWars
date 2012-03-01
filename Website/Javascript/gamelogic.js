////Game Logic
//Movement checking
var unitGrid;

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

occupied = function(x, y)	// absolute, input grid location not pixel location
{
	if (unitGrid[unitGridArrayConvert(x,y)] == undefined)
	{
		return false;
	}
	else if (unitGrid[unitGridArrayConvert(x,y)].solid == true)
	{
		return true;
	}
	return false;
}

unitGridArrayConvert = function (x, y)
{
	return y*(_buffer.height/gridPixel) + x;
} 
	
validGridMove = function(x, y)	// absolute - input grid location not pixel location
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

////Unit manipulation functions
function addUnit(u)
{
	unitList = unitList.concat([u]);
	setGridSquare(u, u.gx, u.gy);
}

function moveUnit(u, prevgx, prevgy, gx, gy)
//Moves the unit from (prevgx, prevgy) to (gx, gy)
{
	emptyGridSquare(prevgx, prevgy);
	setGridSquare(u, gx, gy);
}

function setGridSquare(u, gx, gy)
//This function and emptyGridSquare eventually need to deal with previously occupied squares
{
	unitGrid[unitGridArrayConvert(gx, gy)] = u;
}

function emptyGridSquare(gx, gy)
{
	unitGrid[unitGridArrayConvert(gx, gy)] = null;
}