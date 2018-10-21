
//====== ���������c����
function japanese( str )
{
		var after = "" ;
		var P  = "<p>" ;
		var _P = "</p>" ;
		var line = "" ;
		var counter = 0 ;
		var TEN = '<div style = "text-align : left ; height : 1em ; line-height : 0em ; padding-left : 1.4em ; padding-right : 0em ; ">�A</div>' ;
		var MARU = '<div style = "text-align : left ; height : 1em ; line-height : 0em ; padding-left : 1.4em ; padding-right : 0em ;">�B</div>' ;
		var OPEN1  = '<div style = "padding-left : 1.4em ;">��</div>' ;
		var CLOSE1 = '<div style = "text-align : left ; padding-left : 0em ; padding-right : 1em ;">��</div>' ;
		var NOBASI = '<div style = "padding-left : 0.5em ;">' + '�b' + '</div>';
		var TEN3 = '<div style = "padding-left : 0.5em ; line-height : 0.4em ;">�E<br></div>'
			+ '<div style = "padding-left : 0.5em ; line-height : 0.4em ;">�E</div>'
			+ '<div style = "padding-left : 0.5em ; line-height : 0.4em ;">�E</div>'
			;
		document.write( '<style>td.japanese { color : #442222 ; font-family : "�l�r �S�V�b�N" ; font-size : 12pt ; width : 2em ; border-style : none ; text-align : center ; vertical-align : top ; }img.japanese { visibility : hidden; width : 1.6em ; }</style>') ;
		var tagMode = false ;
		for ( var n = 0 ; n < str.length ; n++ )
			{
				if ( str.charAt( n ) == '<' ) tagMode = true ;
				if ( str.substring( n , n + BR.length ) == BR ) tagMode = false ;
					if ( !tagMode )
					{
					if ( str.substring( n , n + P.length ) == P )
						{
						line += '<td class = "japanese">' ;
						n += P.length - 1 ;
						continue ;
						}
					if ( str.substring( n , n + _P.length ) == _P )
						{
						line += '<img class = "japanese"></td>' ;
						n += _P.length - 1 ;
						after = line + after ;
						line = "" ;
						counter = 0 ;
						continue ;
						}
	
					if ( str.substring( n , n + BR.length ) == BR )
						{
						line = '<td class = "japanese">' + line + '<img class = "japanese"></td>' ;
						n += BR.length - 1 ;
						after = line + after ;
						line = "" ;
						counter = 0 ;
						continue ;
						}
					
					if ( counter >= 20 )
						{
						counter = 0 ;
						line = '<td class = "japanese">' + line + '<img class = "japanese"></td>' ;
						after = line + after ;
						line = "" ;
						}
					
					switch ( str.charAt( n ) )
						{
						case '�u' : line += OPEN1 ; break ;
						case '�v' : line += CLOSE1 ; break ;
						case '�i' : line += '��' ; break ;
						case '�j' : line += '��' ; break ;
						case '�' :
						case '�A' :
							line += TEN ; break ;
						case '�B' :
						case '�' :
							line += MARU ; break ;
						case '�[' :
						case '�\' : line += NOBASI ; break ;
						case '�c' : line += TEN3 ; break ;
						case '��' : case '��' : case '��' : case '��' : case '��' :
						case '��' :
						case '��' : case '��' : case '��' :
						case '�@' : case '�B' : case '�D' : case '�F' : case '�H' :

						case '�b' :
						case '��' : case '��' : case '��' :
							line += '<div style = "padding-left : 1em ; line-height : 0.6em ; height : 1em ;">' + str.charAt( n ) + '</div>';
							break ;
						default :
							line += '<div style = "padding-left : 0.5em ; line-height : 1em ;">' + str.charAt( n ) + '</div>';
							break ;
						}
					counter++ ;
					}
					else
					{
					line += str.charAt( n ) ;
					if ( str.charAt( n ) == '>' ) tagMode = false ;
					}
			}
		if (line.length > 0 ) after = '<td class = "japanese">' + line + '<img class = "japanese"></td>' + after ;
		after = '<table style = "border-style : none ;"><tr style = "border-style : none">' + after ;
		after += '</tr></table>' ;
		return after ;
}
