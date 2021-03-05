(function(global) {
	"use strict";

	var osakana4242 = global.osakana4242 || {};

	osakana4242.namespace = function(ns_string) {
		var parts = ns_string.split('.'),
		parent = osakana4242;
		
		if (parts[0] === "osakana4242") {
			parts = parts.slice(1);
		}
		
		for (var i = 0; i < parts.length; i += 1) {
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	}

	var DF = osakana4242.namespace("core.DF");
	DF.FPS = 24;
	DF.SLEEP_TIME = 1000 / DF.FPS;

	var util = osakana4242.namespace("core.util");

	util.StringUtil = {
		replaceText: function(text, valueList) {
			var dest = text;
			for(var key in valueList) {
				dest = StringUtil.replaceAll(dest, '#{' + key + '}', valueList[key]);
			}
			return dest;
		},
		
		/* 全置換：全ての文字列 org を dest に置き換える
		 */
		replaceAll: function (text, org, dest) {
			return text.split(org).join(dest);
		}

	};

	util.Util = {
		secToFrame: function (sec) {
			return Math.floor(sec * DF.FPS);
		},
		/*
		 * イメージの読み込み
		 * @image_src イメージのパス
		 */
		preloadImage: function (image_src)
		{
			var image = new Image();
			image.src = image_src;
		},

		/*
		 * イメージの読み込み
		 * @image_srcs イメージのパスが入った配列
		 */
		preloadImages: function (image_srcs)
		{
			for (var i = 0; i < image_srcs.length; i++) {
				Util.preloadImage(image_srcs[i]);
			}
		}
	};
	var Util = util.Util;

	util.TimeCounter = function() {
		this.time0 = 0;
		this.time1 = 0;
		this.value = 0;
		this.curTime = 0;
	}
	var TimeCounter = util.TimeCounter;
	TimeCounter.prototype.setTime = function(tarTime) {
		this.time0 = 0;
		this.time1 = Util.secToFrame(tarTime);
		this.value = 0;
	}
	TimeCounter.prototype.process = function() {
		if(this.isEnd()) {
			return;
		}
		this.time0 += 1;
		this.value = this.time0 / this.time1;
	}
	TimeCounter.prototype.isEnd = function() {
		return this.time0 == this.time1;
	}
	TimeCounter.prototype.supLiner = function(v0, v1) {
		return v0 * (this.value - 1.0) + v1 * this.value;
	}

	// from: http://phiary.me/javascript-url-parameter-query-string-parse-stringify/
	osakana4242.QueryString = {  
		parse: function(text, sep, eq, isDecode) {
			text = text || location.search.substr(1);
			sep = sep || '&';
			eq = eq || '=';
			var decode = (isDecode) ? decodeURIComponent : function(a) { return a; };
			return text.split(sep).reduce(function(obj, v) {
			var pair = v.split(eq);
			obj[pair[0]] = decode(pair[1]);
			return obj;
			}, {});
		},
		stringify: function(value, sep, eq, isEncode) {
			sep = sep || '&';
			eq = eq || '=';
			var encode = (isEncode) ? encodeURIComponent : function(a) { return a; };
			return Object.keys(value).map(function(key) {
			return key + eq + encode(value[key]);
			}).join(sep);
		},
	};

	global.osakana4242 = osakana4242;
}(window));

(function(global) {

	var osakana4242_website = osakana4242.namespace("osakana4242_website");

	var makeHeader = function(rootPath) {
		if (rootPath.indexOf("/") === (rootPath.length - 1)) {
			// ケツのスラッシュは除去.
			rootPath = rootPath.substring(0, rootPath.length - 1);
		}

		{
			var tmplData = (
				'<a class="site-title" href="${rootPath}/index.html">おさかなの不安定世界</a>'
			);
			var $tmpl = $.tmpl(tmplData, {'rootPath': rootPath});

			$tmpl.replaceAll("#main-header > h1");
		}

		{
			var tmplData = (
				'<div class="menu">'
					+ ' <a href="${rootPath}/index.html">トップ</a>'
					+ '<span class="v-separator"></span>'
					+ ' <a href="${rootPath}/music.html">おんがく</a>'
					+ '<span class="v-separator"></span>'
					// + ' <a href="${rootPath}/pc/melody.html">着メロ</a>'
					// + ' <a href="${rootPath}/itunes_furikake.html">便利ツール</a>'
					// + '<span class="v-separator"></span>'
					+ ' <a href="https://osakana4242.hatenablog.com/">ブログ</a>'
					+ '<span class="v-separator"></span>'
					+ ' <a href="http://www4.rocketbbs.com/141/sasimi.html">掲示板</a>'
					+ '<span class="v-separator"></span>'
					+ ' <a href="${rootPath}/hello.html">だれ？</a>'
				+ '</div>'
			);
			var $tmpl = $.tmpl(tmplData, {'rootPath': rootPath});

			$tmpl.appendTo("#main-header > nav");
		}
	}



	var makefooter = function(rootPath) {
		var tmplData = (
			'<div id="footer-body">'
			+ '<p style="text-align: right;">'
				+ '<a class="btn-s" href="#">▲このページの上部へ</a> '
			+ '</p>'
			+ '三途の川おさかな(2002-2021)'
			+ '</div>'
			
			+ '<script type="text/javascript" src="https://apis.google.com/js/plusone.js">'
			+ "{lang: 'ja'}"
			+ '</script>'
			
		);
		var $tmpl = $.tmpl(tmplData, {'rootPath': rootPath});
		$tmpl.appendTo("#main-footer");
	}

	osakana4242_website.init = function(rootPath) {
		makeHeader(rootPath);
		makefooter(rootPath);
	}

}(window));


//------------------------------------------------------------------------------
// google.

(function (global) {
	var _gaq = global._gaq || [];
	
	_gaq.push(['_setAccount', 'UA-11051536-4']);
	_gaq.push(['_trackPageview']);
	
	global._gaq = _gaq;

	var host = '' + document.location.host;
	var isLocalHost = (host === '127.0.0.1') || (host === 'localhost');
	if (isLocalHost) return;
	
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
}(window));

