var IS_DEBUG = false;
var debug = {};
debug.output = function(message, level) {
	if (IS_DEBUG) {
		console.log(message);
	}
}
debug.output('test', debug.LEVEL_INFO);
debug.output('test', debug.LEVEL_ERROR);
debug.output('test', debug.LEVEL_VERBOSE);


//------------------------------------------------------------------------------
// クラス.

function Melody(name, file_name) {
	this._name = name;
	this._file_name = file_name;
}

function MelodyWorker(name, file_key_name, comment, melodies) {
	this._name = name;
	this._file_key_name = file_key_name;
	this._comment = comment;
	this._melodies = melodies;
}


$(function() {
	var package_melody = osakana4242.namespace('osakana4242_website.melody');
	
	function trackEvent(category, action, label) {
		_gaq.push(['_trackEvent', category, action, label]);
	}

	function openDrawer(name) {
		var id  = "drawer_" + name;
		$('.drawer:not(#' + id + ')').hide('fast');
		$('#' + id).show('fast');
		
		trackEvent('melody', 'switchDrawer', name);
	}

	function playAudio(worker_id, melody_id) {
		debug.output("playAudio:" + worker_id + ", " + melody_id, debug.LEVEL_VERBOSE);
		var worker = MELODY_LIST[worker_id];
		var melody = worker._melodies[melody_id];
		var melody_file_name = "data/melody/" + melody._file_name;
		var infoStr = '再生がリクエストされたファイル:<a href="../' + melody_file_name + '">' + melody._file_name + '</a>';
		
		var audio_player = document.getElementById("audio_player");
		try {
			var version = audio_player.getVersion();
			debug.output("java version is:" + version, debug.LEVEL_INFO);
		} catch(er) {
			debug.output(er, debug.LEVEL_WARNING);
		}
		var isNg = false;
		try {
			audio_player.requestPlayAudio(
				worker._name,
				melody._name,
				melody_file_name
			);
		} catch(er) {
			debug.output(er, debug.LEVEL_WARNING);
			isNg = true;
		}
		if(isNg) {
			// java のメソッドが呼び出せない. おそらく java がインストールされてないか、バージョンが古い.
			infoStr += '<br>再生に失敗しました。<a href="http://www.java.com/ja/download/">こちら(http://www.java.com/ja/download/)</a>でJavaをダウンロードして、ブラウザを再起動してみてください。';
		}
		document.getElementById("audio_player_info").innerHTML = infoStr;

	//	location.href = "index.htm?"
	//		+ "worker_id=" + worker_id
	//		+ "&melody_id=" + melody_id
	//		;
		trackEvent('melody', 'playAudio', melody_file_name);
	}

	function writeMelodyList() {
		var worker_list = [];
		for (var mw_i = 0; mw_i < MELODY_LIST.length; mw_i++) {
			var m_worker = MELODY_LIST[mw_i];
			var melody_list = [];
			for (var mel_i = 0; mel_i < m_worker._melodies.length; mel_i++) {
				var melody = m_worker._melodies[mel_i];
				var melody_file_name = "data/melody/bin/" + melody._file_name;
				melody_list.push({
					'mw_i': mw_i,
					'mel_i': mel_i,
					'melody_name': melody._name
				});
			}
			worker_list.push({
				'file_key_name': m_worker._file_key_name,
				'worker_name': m_worker._name,
				'melody_list': melody_list
			});
		}
		var $tmpl = $('#melody-list-tmpl').tmpl(worker_list);
		$tmpl.find(".artist").click(function () {
			var $this = $(this);
			var file_key_name = $this.find('input[name="file_key_name"]').attr("value");
			openDrawer(file_key_name);
		});
		$tmpl.find(".melody-name").click(function () {
			var $this = $(this);
			var mw_i = $this.find('input[name="mw_i"]').attr("value");
			var mel_i = $this.find('input[name="mel_i"]').attr("value");
			playAudio(mw_i, mel_i);
		});
		$tmpl.appendTo('#melody-list');
	}
	
	package_melody.init = function() {
		if(IS_DEBUG) {
			debug.writeTextArea();
		}
		
		writeMelodyList();
		
		var strHash = location.hash.toString();
		if(1 < strHash.length) {
			strHash = strHash.substring(1, strHash.length);
			openDrawer(strHash);
		}
	}
});
