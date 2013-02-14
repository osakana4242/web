function init() {
//	document.getElementById("appletArea").innerHTML = '<applet id="applet"'
//		+ ' name="gyo"'
//		+ ' codebase="http://www15.plala.or.jp/sasimi/pc/app/gyo"'
//		+ ' code ="jp.sanzunokawaosakana.gyo.App"'
//		+ ' archive="http://www15.plala.or.jp/sasimi/pc/app/gyo/gyo.jar?8"'
//		+ ' width="512"'
//		+ ' height="448"'
//		+ ' ></applet>'
//		;
//	
	gadgets.window.adjustHeight();
}
gadgets.util.registerOnLoadHandler(init);

/**
	アプレットのサイズ変更.
*/
function setAppletSize(i) {
	var SIZES = [
		[256, 224],
		[512, 448],
		[600, 448],
	];
	
	element = document.getElementById("applet");
	element.width = SIZES[i][0];
	element.height = SIZES[i][1];
	gadgets.window.adjustHeight();
}
