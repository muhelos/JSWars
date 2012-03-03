////Game Logic
//Movement checking
var unitGrid;

gridClicked = function(x, y)
{
	if (yourTurn())
	{
		var clickedUnitIndex
		var found;
		findUnit:
		for(var i = 0; i < unitList.length; i++)
		{
			var workingUnit = unitList[i];
			if(workingUnit.clickable && workingUnit.x == x && workingUnit.y == y)
			{
				clickedUnitIndex = i;
				found = true;
				break findUnit;
			}
		}
		if (found)
		{
			clickedUnit(clickedUnitIndex);
		}
	}
	else if (addingUnit())
	{
		addUnit(new Unit(x, y, 10, 0, true));
	}
}

setNoCurrent = function()
{
	findCurrent:
	for(var i = 0; i < unitList.length; i++)
	{
		var workingUnit = unitList[i];
		if (workingUnit.isCurrent())
		{
			unitList[i].setNotCurrent();
			break findCurrent;
		}
	}
	controlledUnit = null;
}

clickedUnit = function(i)
{
	if (controlledUnit != null)
	{unitList[controlledUnit].setNotCurrent();}
	controlledUnit = i;
	unitList[controlledUnit].setCurrent();
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
	return y*(maxX) + x;
} 
	
validMove = function(x, y)	// absolute - input grid location not pixel location
{
	if (x >= 0 && y >= 0 && x < maxX && y < maxY)
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
	setGridSquare(u, u.x, u.y);
}

function moveUnit(u, x, y)
{
	emptyGridSquare(u.x, u.y);
	setGridSquare(u, x, y);
	u.moveAbsolute(x,y);
}

function moveUnitRelative(u, xdelt, ydelt)
{
	emptyGridSquare(u.x, u.y);
	setGridSquare(u, u.x+xdelt, u.y+ydelt);
	u.moveRelative(xdelt,ydelt);
}

function setGridSquare(u, x, y)
//This function and emptyGridSquare eventually need to deal with previously occupied squares
{
	unitGrid[unitGridArrayConvert(x, y)] = u;
}

function emptyGridSquare(x, y)
{
	unitGrid[unitGridArrayConvert(x, y)] = null;
}