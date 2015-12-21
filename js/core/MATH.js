/******************************************************************************************************************************************************************************

	MATH

*******************************************************************************************************************************************************************************/

var math = {};

/******************************************************************************************************************************************************************************

	math.VECTOR

*******************************************************************************************************************************************************************************/

math.Vector = function(A, B)
{
	var dX = B.x - A.x;
	var dY = B.y - A.y;
	return { x : dX, y : dY };
}

/******************************************************************************************************************************************************************************

	math.DISTANCE

*******************************************************************************************************************************************************************************/

math.Distance = function(A, B)
{
	return Math.pow( ( Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2) ), 0.5);
}

/******************************************************************************************************************************************************************************

	math.COMPARE

*******************************************************************************************************************************************************************************/

math.Compare = function(array, inverse) // Return the highest number from an array (inverse = true for the smallest)
{	
	var id = 0;
	var borne = array[0];

	var length = array.length;
	for ( var i = 1; i < length; i++ )
	{
		var a = array[i];
		if ( ( inverse && a < borne ) || ( !inverse && a > borne ) )
		{
			id = i;
			borne = a;
		}
	}
	return { value : borne, id : id };
}

/******************************************************************************************************************************************************************************

	math.NEAREST

*******************************************************************************************************************************************************************************/

math.Nearest = function(O, A, B) // Nearest point from O
{
	var C = Math.pow( Math.pow( ( A.x - O.x ), 2 ) + Math.pow( ( A.y - O.y ), 2 ), 0.5 );
	var D = Math.pow( Math.pow( ( B.x - O.x ), 2 ) + Math.pow( ( B.y - O.y ), 2 ), 0.5 );
	if ( C > D ) { return A; }
	else if ( D > C ) { return B; }
	else { return A; }
}

/******************************************************************************************************************************************************************************

	math.CROSS

*******************************************************************************************************************************************************************************/

math.Cross = function(A, B, C, D, segment) // Intersection between lines (or segments)
{
	var I = { x : B.x - A.x, y : B.y - A.y }; // Vector AB
	var J = { x : D.x - C.x, y : D.y - C.y }; // Vector CD

	var d = ( I.x*J.y ) - ( I.y*J.x ); // Simplification

	var m = ( I.x * ( C.y - A.y ) + I.y * ( A.x - C.x ) ) / -d;
	var k = ( J.x * ( C.y - A.y ) + J.y * ( A.x - C.x ) ) / -d;

	if ( d == 0 || ( segment == true && ( k < 0 || k > 1 || m < 0 || m > 1 ) ) )
	{
		return false;
	}

	var x = A.x + m * ( B.x - A.x );
	var y = A.y + m * ( B.y - A.y );

	return { x : x, y : y };
}

/******************************************************************************************************************************************************************************

	math.GRAVTRI

*******************************************************************************************************************************************************************************/

math.GravTri = function(A, B, C) // Center of gravity of a triangle
{
	var Ia = { x : (A.x + B.x) / 2, y : (A.y + B.y) / 2 };
	var Ib = { x : (A.x + C.x) / 2, y : (A.y + C.y) / 2 };

	return math.Cross(B, Ib, C, Ia, true);
}

/******************************************************************************************************************************************************************************

	math.ROTATE

*******************************************************************************************************************************************************************************/

math.Rotate = function(points, angle, C)
{
	var length = points.length;
	for ( var i = 0; i < length; i++ )
	{
		var A = points[i];
		var P = { x : A.x - C.x, y : A.y - C.y };
		var R = { x : P.x * Math.cos(angle) - P.y * Math.sin(angle), y : P.x * Math.sin(angle) + P.y * Math.cos(angle) };
		points[i] = { x : R.x + C.x, y : R.y + C.y };
	}

	return points;
}

/******************************************************************************************************************************************************************************

	math.POURCENT

*******************************************************************************************************************************************************************************/

math.Pourcent = function(value, max)
{
	return Math.round(value * 100 / max);
}

/******************************************************************************************************************************************************************************

	math.INRANGE

*******************************************************************************************************************************************************************************/

math.InRange = function(value, goal, range)
{
	if ( value + range > goal && value - range < goal )
	{
		return true;
	}
	return false;
}

/******************************************************************************************************************************************************************************

	math.HITLINE

*******************************************************************************************************************************************************************************/

math.HitLine = function(P1, P2, rectangle) // Intersection line/square
{
	var min = { x : rectangle.pos.x - rectangle.size.width/2, y : rectangle.pos.y - rectangle.size.height/2 };
	var max = { x : rectangle.pos.x + rectangle.size.width/2, y : rectangle.pos.y + rectangle.size.height/2 };
	var A = { x : min.x, y : min.y };
	var B = { x : max.x, y : min.y };
	var C = { x : max.x, y : max.y };
	var D = { x : min.x, y : max.y };

	if ( math.Cross(P1, P2, A, B, true) != false ) { return true; }
	if ( math.Cross(P1, P2, B, C, true) != false ) { return true; }
	if ( math.Cross(P1, P2, C, D, true) != false ) { return true; }
	if ( math.Cross(P1, P2, D, A, true) != false ) { return true; }

	return false;
}