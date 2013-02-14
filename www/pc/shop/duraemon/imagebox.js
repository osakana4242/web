function ImageFile( src , width , height )
{
	this.src    = src ;
	this.width  = width ;
	this.height = height ;
	this.toString = function()
		{
		return (this.src + " / " + this.width + " / " + this.height ) ;
		}
}
var IMAGEBOX = new Array
	(
	new ImageFile( "dura05.gif" , 432 , 576 ) ,
	new ImageFile( "dura04.gif" , 432 , 576 ) ,
	new ImageFile( "dura03.gif" , 432 , 576 ) ,
	new ImageFile( "dura02.gif" , 432 , 576 ) ,
	new ImageFile( "dura01.gif" , 432 , 576 )
	) ;