
//------------------------------------------------------------------------------
/* osakana4242 */
(function(global) {
"use strict";

var consoleDummy = {
	log: function() {
	}
};
var console = console || consoleDummy;

var osakana4242 = global.osakana4242 || {};
var gadgets = global.gadgets;

console.log("osakana4242:" + osakana4242);
osakana4242.mixi = {
	processGet: function(response) {
		var rc = response.rc;
		console.log("rcType:" + Object.prototype.toString.call(response.rc));
		console.log("errorsType:" + Object.prototype.toString.call(response.errors));
		console.log("rc:" + rc);
		var errors = response.errors;
		var text = "";
		var $elem = $("#app-page");
		var $dev = null;
		if (rc !== 200) {
			var errorText = '';
			switch(rc) {
			case 404: // not found.
				errorText += "ページが見つかりません。";
				break;
			case 504: // timeout.
				errorText += "接続がタイムアウトしました。ページの再読み込みをお試しください。";
				break;
			default:
				errorText += "困りました。なぞのエラーです。";
				break;
			}
			
			if (errors) {
				text += "response code=" + rc + "<br />";
				var errorDetail = "";
				for (var i = 0, size = errors.length; i < size; ++i) {
					 errorDetail += "errors[" + i + "]=" + errors[i] + "<br />";
					
				}
			}
			
			var tmplData = $("#error-tmpl");
			var $tmpl = $.tmpl(tmplData, {'errorText': errorText, 'errorDetail': errorDetail});
			$dev = $tmpl;
		}
		else {
			text = response.text;
			$dev = $(text);
			if (false) {
				$dev.find("a").each(function() {
					var href = $(this).attr("href");
					$(this).attr("href", "#");
					$(this).click(function() {
						osakana4242.mixi.get(href);
					});
				});
			} else {
				var urlTop = $dev.find("#url-top").attr("href");
				urlTop = 'https://osakana4242.tank.jp/res/jump_hell2/game/index.html?pc=1';
				console.log("urlTop:" + urlTop);
				$dev = $('<iframe id="app-main-frame"></iframe>');
				$dev.attr("src", urlTop);
				console.log("iframe:" + $dev.html());
			}
		}
		
		console.log("app-page innerHTML change start");
		$elem.empty();
		gadgets.window.adjustHeight();
		$elem.append($dev);
		$('#app-main-frame').load(function () {
			gadgets.window.adjustHeight();
			console.log("adjust height end.");
		});
		console.log("app-page innerHTML change end");
		
		var h = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] ); 

		// 高さ調整.
		gadgets.window.adjustHeight();
		console.log("adjust height end.");
		
		// メッセージクリア.
		$("#app-message").fadeOut("slow");
		$("#app-page").fadeIn("fast", gadgets.window.adjustHeight);
	},
	get: function(url) {
		console.log("get:" + url);
		$("#app-page").fadeOut("fast");
		$("#app-message")
			.html(url + "<br />" + "読み込み中...<br />")
			.fadeIn("fast");
		var params = {};
		params[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.GET;
		params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
		params[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.SIGNED;
		gadgets.io.makeRequest(url, osakana4242.mixi.processGet, params);
	}
	
};
if (osakana4242) {
	console.log("osakana4242.mixi:" + osakana4242.mixi);
}
global.osakana4242 = osakana4242;
}(this));


