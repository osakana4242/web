/*
 * 最終更新日からの経過日数により、画面にホコリが溜まっていくスクリプト Ver1.03
 * copyright (c) by 2006.12.16 三途の川おさかな
 */

/*
 * 指定されたidをもつエレメントを表示を無効にする
 */
function SO4242_kill(id) {
	document.getElementById(id).style.display = "none";
}

/*
 * ホコリを表示する
 */
function SO4242_createDust() {
	function parseInt2(src) {
		var index = 0;
//		document.write(src);
		for (var i = 0; i < src.length; i++) {
			if (src.substr(i, i + 1) != "0") {
				index = i;
//				document.write(src.substr(i, i+1) + "index=" + index + ", ");
				break;
			}
		}
		return parseInt(src.substr(index, src.length));
	}
	
	/*
	 * ファイルの最終更新日をDate型で返す
	 */
	function getLastModified() {
		var date = parseInt2(document.lastModified.substr(3, 2));
		var month = parseInt2(document.lastModified.substr(0, 2)) - 1;
		var year = parseInt2(document.lastModified.substr(6, 4));
//		document.write(year + "/" + month + "/" + date + ", ");
		return new Date(year, month, date);
	}

	// 最終更新日からの経過日数を求める
	var today = new Date(); // 今日
	var upday = /*new Date(2006, 8, 10);*/ getLastModified(); // 最終更新日
	var lapsedDays = Math.floor((today.getTime() - upday.getTime()) / (24 * 60 * 60 * 1000)); // 経過日数
//	document.write(document.lastModified);

	// 画面にホコリを表示する
	var DUST_MAX = 512;
	var dust_num = lapsedDays * 2 < DUST_MAX ? lapsedDays * 2: DUST_MAX;

	for (var i = 0; i < dust_num; i++) {
		var id = 'dust_' + i;
		var x = Math.random() * 95;
		var y = Math.random() * 95;
		var size = Math.random() * 16 + 16;
		var dust_image = '<img src="snow.gif" width="' + size + '" height="' + size + '">';
		document.write('<div id="' + id + '" style="z-index: 255; position: absolute; left: ' + x +'%; top: ' + y + '%;"><a onMouseOver="SO4242_kill(\'' + id + '\')">' + dust_image +'</a></div>');
	}
}

switch (navigator.appName.charAt(0)) {
case 'N' :
case 'M' :
	SO4242_createDust();
	break;
default :
	break;
}