document.write( '<style>.drawer { display : none ; } </style>' ) ;

/* changeVision メソッド =======================================================
* 引き出し（依存性高し）
==============================================================================*/
function changeVision( comeValue , max )
	{
	var value = "block" ; // スタイルシート display の状態
	var id  = "drawer" + comeValue ;
	if ( document.all )
		{
		if( document.all( id ).style.display == value ) value = "none" ;
		for( var n = 0 ; n < max ; n++ )
			{
			document.all( "drawer" + n ).style.display = "none" ;
			}
		document.all( id ).style.display = value ; 
		location.hash = "goto" + comeValue ;
		}
	else if ( document.getElementById )
		{	
		if( document.getElementById( id ).style.display == value ) value = "none" ;
		for(var n = 0 ; n < max ; n++ ) document.getElementById( "drawer" + n ).style.display = "none" ;
		document.getElementById( id ).style.display = value ; 
		location.hash = "goto" + comeValue ;
		}
	}
