function ImageFile(src, width, height) {
	this.src    = src;
	this.width  = width;
	this.height = height;
	this.toString = function() {
		return (this.src + " / " + this.width + " / " + this.height);
	}
}
var BLOCK = 5; // まとめて表示するページ量
var IMAGEBOX = new Array(47);
var MAXPAGE = Math.ceil(IMAGEBOX.length / BLOCK);
var KETA = 4;
for (var i = 0; i < IMAGEBOX.length; i++) {
	var src = i.toString();

	var limit = KETA - src.length;
	for (var j = 0; j < limit; j++) {
		src = '0' + src;
	}
	src += '.jpg';
	IMAGEBOX[i] = new ImageFile(src, -1, -1);
}
	
IMAGEBOX[IMAGEBOX.length - 1] = new ImageFile("fin.gif", -1, -1);
