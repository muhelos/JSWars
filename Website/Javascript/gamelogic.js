////Game Logic
//Movement checking
var unitGrid;
var unitMenu = null; //Menu to be drawn

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
			if(clickedUnitIndex == controlledUnit)
			{
				var workingUnit = unitList[controlledUnit];
				unitMenu = new UnitMenu(workingUnit.x+1, workingUnit.y, true);
				changeState(gameState.UNITMENUOPEN);
				clickedUnit(clickedUnitIndex);
			}
			else
			{clickedUnit(clickedUnitIndex);}
		}
	}
	else if (addingUnit())
	{
		if (!occupied(x,y))
		{addUnit(new Unit(x, y, 10, 0, true));}
	}
	else if(unitMenuOpen())
	{
		changeState(gameState.YOURTURN);
	}
}

menuClicked = function(x, y)
//USES PIXEL SPACE
{
	if(x >= unitMenu.x*gridPixel && x <= (unitMenu.x*gridPixel)+unitMenu.width && y >= unitMenu.y*gridPixel && y <= (unitMenu.y*gridPixel)+unitMenu.height)
	{
		var workingOption = findMenuOption(x, y);
		if(workingOption != null)
		{
			workingOption.action();
		}
	}
	
	else
	{
		changeState(gameState.YOURTURN);
	}
}

findMenuOption = function(x, y)
{
	var ret = null;
	var optionArray = unitMenu.options;
	for(var i = 0; i < optionArray.length; i++)
	{
		var workingOption = optionArray[i];
		if(x >= workingOption.x && x <= workingOption.x+workingOption.width && y >= workingOption.y && y <= workingOption.y+workingOption.height)
		{
			ret = workingOption;
			break;
		}
	}
	return ret;
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