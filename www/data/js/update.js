function numberChange(comeValue)
{
	comeValue = comeValue.toString();
	var returnValue = "";
	for(var n = 0; n < comeValue.length; n++)
		{
		returnValue += String.fromCharCode(65248 + comeValue.charAt(n).charCodeAt(0));
		}
	return returnValue;
}

var ID_MELODY = '<img src="i_melody.gif" title="着メロ" width="16" height="16" style = "float: left;">';
var ID_MUSIC = '<img src="i_music.gif" title="おんがく" width="16" height="16" style="float: left;">';
var ID_STORY = '<img src = "i_story.gif" title="おはなし" width="16" height="16" style = "float: left;">';
var ID_DIARY = '<img src = "i_diary.gif" title="その日のさかな" width="16" height="16" style = "float: left;">';
var ID_SHOP = '<img src = "i_shop.gif" title="せっちゃんのおみせ" width="16" height="16" style = "float: left;">';
var ID_MUZIE = '<img src = "i_muzie.gif" title="おさかなのお気に入り" width="16" height="16" style = "float: left;">';

var UPDATA_ETC = new Array
	(2005, 11, 29,
	'おさかなの不安定世界は今日も良い天気です。',
	ID_SHOP + '交換まんががおさかなにより6ページ更新されました'
	);

var HISTORY = [
	[ 2005, 11, 29,
	ID_SHOP + '交換まんががおさかなにより6ページ更新されました'
	],
	[ 2005, 11, 10,
	ID_SHOP + '交換まんがが春日総一さんにより2ページ更新されました'
	],
	[ 2005, 10, 2,
	ID_SHOP + '交換まんががおけらさんにより10ページ更新されました'
	],
	[ 2005, 9, 10,
	ID_MELODY + '空手バカボン→家族の肖像'
	],
	[ 2005, 9, 4,
	ID_MELODY + '空手バカボン→おおもうけバカボン',
	ID_MELODY + '空手バカボン→のんきな兄さん'
	],
	[ 2005, 8, 20,
	ID_MUZIE + '体育倉庫。→ミニモくん。春夏秋冬りんりんF@CKだポン！ミニハム＠☆♪★',
	ID_MUZIE + '体育倉庫。→奥まで突いてよ！【FUNK MIX】',
	ID_MUZIE + 'つなくそ→ウイルス'
	],
	[ 2005, 8, 11,
	ID_MELODY + 'cali≠gari→新宿エレキテル(の尻尾)'
	],
	[ 2005, 8, 10,
	ID_MELODY + 'cali≠gari→新宿エレキテル',
	'リンクにしーなねこのページを追加'
	],
	[ 2005, 7, 11,
	ID_MELODY + 'グルグル映畫館→レツゴー日常、こんにちは非日常。'
	],
	[ 2005, 6, 15,
	ID_MELODY + 'グルグル映畫館→帰り道の小唄'
	],
	[ 2005, 5, 30,
	ID_MELODY + '(更新)犬神サーカス団→最新型アンドロイド'
	],
	[ 2005, 5, 25,
	'ぎょを更新'
	],
	[ 2005, 4, 11,
	ID_MELODY + '犬神サーカス団→最新型アンドロイド（とりあえず3和音版）'
	],
	[ 2005, 3, 4,
	ID_MUZIE + 'ボラボラ「宇宙旅行」'
	],
	[ 2005, 2, 17,
	ID_MUSIC + '紺クレヨンの森'
	],
	[ 2005, 2, 10,
	ID_MELODY + 'その他→ネコ戦艦よ永遠なれ(星条旗よ永遠なれ)～極上パロディウスより',
	ID_MELODY + 'その他→玄関のチャイム'
	],
	[ 2005, 2, 4,
	ID_MUSIC + 'かるがもパニック'
	],
	[ 2005, 1, 19,
	ID_MUZIE + '自分ＢＯＸ「ＮＹＡＮ　ＮＹＡＮ節」'
	],

	[ 2005, 1, 14,
	ID_MELODY + 'グルグル映畫館→赤い花･空の青'
	],

	[ 2005, 1, 7,
	ID_MELODY + 'グルグル映畫館→日曜日の朝'
	],

	[ 2004, 12, 11,
	'JAVAアプレット｢ぎょ｣',
	ID_MELODY + '麻原彰晃尊師→ガネーシャ体操',
	ID_MELODY + '(ほんのり改変)麻原彰晃尊師→麻原彰晃マーチ(ライブ・バージョン)'
	],

	[ 2004, 11, 17,
	ID_MELODY + '麻原彰晃尊師→麻原彰晃マーチ（ライブ・バージョン）',
	ID_MELODY + '筋肉少女帯→オレンジ・エビス',
	ID_MELODY + '(改変)空手バカボン→屋根の上の猫とボク',
	ID_MELODY + '(改変)筋肉少女帯→哀愁のこたつみかん',
	ID_MELODY + '(改変)SUPER BELL"Z→MOTOR MAN 名古屋 急行新鵜沼行',
	ID_MELODY + '(vodafoneでDL出来ないのを修正)犬神サーカス団→ウロコの女'
	],
	
	[ 2004, 11,  12,
	ID_MELODY + '空手バカボン→屋根の上の猫とボク'
	],

	[ 2004, 11,  8,
	ID_STORY + '一連の流れ',
	ID_STORY + '救いの糸'
	],
	
	[ 2004, 11,  4,
	ID_MELODY + 'SUPER BELL"Z→MOTOR MAN 名古屋 急行新鵜沼行'
	],

	[ 2004, 10, 29,
	ID_MELODY + '空手バカボン→中央線ヤクザブルース'
	],
	
	[ 2004, 10, 25,
	ID_MELODY + 'YMO→ABSOLUTE EGO DANCE',
	ID_MELODY + '(改変)犬神サーカス団→赤い蛇',
	ID_MELODY + '(改変)犬神サーカス団→ウロコの女',
	ID_MELODY + '(さらに改変)SUPER BELL"Z→MOTOR MAN 中華特急みなとみらい'
	],
	
	[ 2004, 10, 21,
	ID_MELODY + '犬神サーカス団→ウロコの女',
	ID_MELODY + '(改変)SUPER BELL"Z→MOTOR MAN 中華特急みなとみらい'
	],
	
	[ 2004, 10, 4,
	ID_MUSIC + 'ひかり探索'
	],
	
	[ 2004, 9, 19,
	'めちゃらさんのお蔵一点追加',
	ID_MELODY + '大槻ケンヂ→猫のリンナ'
	],
	
	[ 2004, 8, 27,
	ID_MELODY + '特撮→シーサイド美術館'
	],

	[ 2004, 8, 12,
	ID_SHOP + '交換まんが（３７～４６ページ追加）',
	ID_MELODY + '筋肉少女帯→ドリフター',
	],

	[ 2004, 8, 6,
	ID_MUSIC + '（リメイク）麻原彰晃マーチ‐洗脳mix‐',
	ID_MUSIC + '（リメイク）森のいざこざ',
	ID_SHOP + '交換まんが（３２～３６ページ追加）'
	],

	[ 2004, 7, 7,
	ID_SHOP + '交換まんが（１９～２５ページ追加）'
	],

	[ 2004, 7, 5,
	'めちゃらさんのおくら→一点追加',
	ID_SHOP + '交換まんが（１１～１８ページ追加）'
	],

	[ 2004, 7, 3,
	ID_SHOP + '交換まんが掲載開始（１～１０ページ追加）'
	],

	[ 2004, 7, 2,
	ID_MELODY + 'SUPER BELL"Z→MOTOR MAN 中華特急みなとみらい'
	],

	[ 2004, 6, 16,
	ID_MELODY + 'その他→山道 ～奇々怪界 月夜草子より',
	ID_MELODY + 'おさかな（笑）→ねこ宇宙（ケータイ版のみ）',
	ID_MUSIC + 'OPENING'
	],

	[ 2004, 6, 16,
	ID_MELODY + '筋肉少女帯→タイアップ'
	],

	[ 2004, 6, 8,
	ID_SHOP + 'おさかなサウンド'
	],

	[ 2004, 6, 2,
	ID_MUSIC + '神々の黄昏'
	],

	[ 2004, 5, 31,
	ID_MUSIC + '麻原彰晃ファミリーコンサート2004 ～ゲスト 福永法源～'
	],

	[ 2004, 5, 16,
	'リンク→苅田狼藉のページ'
	],

	[ 2004, 5, 11,
		ID_MELODY + '人生→笠じぞう',
		ID_MUZIE + '人形町「サヨナラタイヨウ／白い電車」'
	],

	[ 2004, 5, 3,
		ID_SHOP + 'トミータくんの作文',
		ID_MUZIE + '苅田狼藉「カリスマキャッチャー親父を挟んで訴える」',
		ID_MUZIE + 'キラーコンドルズ「パノラマ」'
	],
	[ 2004, 4, 23,
	ID_MUSIC + 'もうじき日が暮れる'
	],
	
	[ 2004, 4, 10,
	ID_MELODY + 'YMO→東風'
	],
	[ 2004, 4, 5,
	ID_MUSIC + '秋の風に木の葉舞い…',
	ID_MELODY + 'YMO→COSMIC SURFIN',
	ID_MELODY + 'おさかな(笑)→もう、さめることのないゆめ（ケータイ版のみ）'
	],
	
	[ 2004, 3, 22,
	ID_MUSIC + '機械',
	'ё｢マスクヘッドホンおばさん｣ほか１４点追加'
	],

	[ 2004, 3, 21, 
	ID_MUSIC + 'ねこ宇宙',
	ID_STORY + '全てに飽き果てたその先に',
	ID_STORY + 'ソウイツカ'
	],

	[ 2004, 3, 4, "●深いところに棲むいきもの" ],

	[ 2004, 2, 27, 
	"♪人生→おさびし山",
	"♪特撮→オム・ライズ"
	],

	[ 2004, 2, 23, "●お風呂場" ],
	
	[ 2004, 2, 2,
	ID_MUSIC + 'ノイザーディストーション'
	],

	[ 2004, 1, 24,
	ID_MELODY + '特撮→プログレ・エディ',
	ID_MELODY + 'その他→よ～く考えよ～',
	ID_MELODY + 'おさかな（笑）→開けてはいけないその木箱（ケータイ版のみ）'
	],

	[ 2004, 1, 19,
	'ё１点追加'
	],

	[ 2004, 1, 5,
	ID_MELODY + '犬神サーカス団→兄の病の特効薬は血の池地獄の死臭漂う人肉スープの形而上学'
	],

	[ 2004, 1, 1,
	ID_MELODY + '特撮→友よ'
	],

	[ 2003, 12, 21,
	ID_MUSIC + '血まみれのコックさん',
	ID_MUSIC + 'シヅカナ森(ふるーと三重奏)',
	ID_MUSIC + '作業が終わらない'
	],

	[ 2003, 11, 27,
	ID_MUSIC + '機械（筋少とは関係無しなのです）まだ暫定版。'
	],
	
	[ 2003, 11, 17,
	ID_MELODY + 'その他→なにみてはねる？　～極上パロディウスより（民謡メドレー）'
	],
	
	[ 2003, 11, 8,
	ID_MELODY + '（改変）犬神サーカス団→涅槃に咲く白い花～凶子のダンチョネ節～',
	ID_MELODY + '（改変）特撮→花火',
	ID_MELODY + '（改変）筋肉少女帯→サンフランシスコ'
	],

	[ 2003, 11, 7,
	ID_MELODY + '犬神サーカス団→涅槃に咲く白い花～凶子のダンチョネ節～'
	],

	[ 2003, 11, 6,
	ID_MELODY + '特撮→花火'
	],
	
	[ 2003, 11, 2,
	ID_MELODY + '筋肉少女帯→サンフランシスコ（新）'
	],
	
	[ 2003, 10, 24,
	ID_MELODY + 'その他→ＴＲＩＣＫ'
	],
	[ 2003, 10, 8,
	ID_MELODY + '特撮→パティー・サワディー'
	],

	[ 2003, 10, 6,
	'ёめちゃらさんのおくらＯＰＥＮ！'
	],

	[ 2003,  9, 30,
	ID_MUSIC + '紅茶の見た夢'
	],

	[ 2003,  9, 23,
	ID_STORY + '実験'
	],
	
	[ 2003,  9, 22,
	ID_MELODY + 'おさかな→血まみれのコックさん（携帯版のみ）'
	],
	
	[ 2003,  9, 11,
	ID_MELODY + '筋肉少女帯→サボテンとバントライン',
	ID_MELODY + 'おさかな→夜は更けて…（携帯版のみ）'
	],
	
	[ 2003,  8, 31,
	ID_MELODY + '（修正）筋肉少女帯→香菜、頭をよくしてあげよう<br>ちょっとだけ内容も修正'
	],
	
	[	2003,  8, 28,
	ID_MELODY + '筋肉少女帯→香奈、頭を良くしてあげよう'
	],

	[	2003,  8, 16,
	ID_MUZIE + 'はとぽっぽ by ふうせん猫さん'
	],

	[	2003,  8, 15,
	ID_MUZIE + '☆東京花火★ by Joe Orcinus Orca Organisation 420さん',
	ID_MUZIE + '平成ロボ合戦・ち☆ぽこ by HAL SAITSUさん'
	],
	
	[	2003,  8, 12,
	ID_MELODY + 'その他→やさしい思い出'
	],

	[	2003,  8, 7,
	ID_STORY + 'ファイアーダンス',
	ID_MUSIC + 'ひと雨来るぞ',
	'トップ用BGM SFCソフト バハムートラグーンより｢砂漠の地ダフィラ｣',
	ID_SHOP + 'ヅラエモン'
	],

	[	2003,  7, 25,
	ID_MUSIC + '夜はあのお屋敷で遊びませう'
	],

	[	2003,  7, 22,
	ID_MUSIC + 'ひと雨来るぞ（暫定版）',
	ID_MELODY + '筋肉少女帯→夜歩く'
	],

	[	2003,  7, 18,
	ID_MUZIE + '神社マニア（蛙の宮ＭＩＸ）　ｂｙ　二年生植物さん',
	ID_MUZIE + 'まぐろゴスペル　ｂｙ　発芽玄米さん'
	],

	[	2003,  7, 17,
	ID_MUZIE + 'BOX超特急 -BOX EXPRESS- by 自分BOXさん'
	],

	[	2003,  7, 14,
	'更新履歴のコーナーを追加',
	ID_MUZIE + '満月の夜に by Rupi-Piさん',
	ID_MELODY + '筋肉少女帯→月とテブクロ'
	],

	[	2003,  7, 11,
	ID_STORY + 'ねじ'
	],

	[	2003,  6, 29,
	ID_MUSIC + '森のいざこざ（改良！）'
	],
	
	[ 2003,  6, 27,
	ID_MUZIE + '胎児 by 松菌さん',
	ID_MUZIE + '狂った小学生 by 松菌さん'
	],

	[ 2003,  6, 23,
	'※新こーなー｢おさかなのお気に入り｣(右下)',
	ID_MUSIC + '盗み食い'
	],
	
	[ 2003,  6, 16,
	'※ごあいさつのデザインを変えました。',
	ID_STORY + 'いのなかかわず',
	ID_STORY + 'デザインを変えました。',
	ID_MELODY + 'SUPER BELL"Z→MOTERMAN 南部支線'
	],

	[ 2003,  6, 9,
	ID_MELODY + '犬神サーカス団→洗脳',
	ID_MELODY + 'EZwebに対応させました。でも未確認なので（仮）',
	ID_MELODY + 'ちょっとだけデザインを変えました。'
	],
	
	[ 2003,  6, 4,
		ID_MUSIC + 'シヅカナ森'
	],

	[ 2003,  5, 26,
		ID_MELODY + '筋肉少女帯→マタンゴ'
	],
	
	[ 2003,  5, 12,
		ID_MUSIC + 'ナルトシャッカーのテーマ',
		ID_MELODY + '試聴する時に一部でおさかなの描いた変てこなイラストが現れる用になりました。<br>随時追加予定なのです。',
		ID_MELODY + '電気グルーヴ→あすなろサンシャイン（Ilbon 2000 version）',
		ID_MELODY + '（修正）犬神サーカス団→青蛾の群',
		ID_MELODY + '（修正）犬神サーカス団→陽炎<br>　※Ｊ－ＳＫＹでＤＬ不可能となっておりました。ごめんなさひ。'
	],

	[ 2003,  5, 10,
		ID_MELODY + '犬神サーカス団→青蛾の群',
		ID_MELODY + '（修正）犬神サーカス団→見世物小屋口上',
		ID_MELODY + '（修正）犬神サーカス団→路上',
		'㈲ちょっと改装しました。',
		'㈲雪の降る街、明かりが灯り',
		'㈲これでいいのだ（短く切った版）'
	],

	[ 2003,  5,  1,
	  ID_MUSIC + 'なんだかにぎやかになりました。',
	  ID_MELODY + '（修正）筋肉少女帯→ララミー',
	  ID_MELODY + '（修正）大槻ケンヂ→恋人よ逃げよう世界はこわれたおもちゃだから',
	  '★なまもの→せっちゃん'
	],

	[ 2003,  4, 23,
	  ID_MUSIC + 'ＮＡＲＵＴＯ－２' 
	],

	[ 2003,  4, 21,
	  ID_MELODY + '筋肉少女帯→ララミー'
	],

	[ 2003,  4, 12,
	  ID_MELODY + '大槻ケンヂ→恋人よ逃げよう世界はこわれたおもちゃだから'
	],

	[ 2003,  4,  5,
	  ID_STORY + 'サカナ部屋'
	],

	[ 2003,  3, 27,
	  ID_MUSIC + '麻原彰晃マーチ‐洗脳ｍｉｘ‐'
	],

	[ 2003,  3, 10,
	  ID_MELODY + '大槻ケンヂ→モンブランケーキ'
	],

	[ 2003,  3,  8,
	  ID_MELODY + '（修正）ＺＵＮＴＡＴＡ→ＦＬＡＲＥ'
	],

	[ 2003,  3,  5,
	  ID_MELODY + 'ＺＵＮＴＡＴＡ→ＦＬＡＲＥ'
	],
	
	[ 2003,  3,  2,
		ID_MELODY + '筋肉少女帯→少女の王国'
	],

	[ 2003,  2, 18,
		ID_MELODY + '犬神サーカス団→黒髪',
		ID_MELODY + 'グルグル映畫館→そのままでいいよ。',
		ID_MELODY + '真理の御霊・最聖・麻原彰晃尊師→エンマの数え歌',
		ID_MELODY + '電気グルーヴ→Nothing’s Gonna Change',
		ID_MELODY + '筋肉少女帯→トゥルー・ロマンス',
		ID_MELODY + '（修正）筋肉少女帯→詩人オウムの世界' 
	],

	[ 2003,  2,  7,
		ID_MELODY + '（修正）筋肉少女帯→詩人オウムの世界' 
	],

	[ 2003,  2,  5,
		ID_MELODY + '筋肉少女帯→詩人オウムの世界' 
	],

	[ 2003,  2,  3,
		ID_MUSIC + '雪降り積もる平原にて',
		ID_MUSIC + '踊り食い',
		ID_STORY + '夜は明けない',
		ID_MELODY + '筋肉少女帯→哀愁のこたつみかん' 
	
	],
	
	[ 2003,  1, 20,
		ID_MELODY + '犬神サーカス団→血の贖い',
		 ID_MELODY + 'その他→Ｈｏｔｅｌ　１',
		 ID_MELODY + 'ＪａｖａＳｃｒｉｐｔの改変',
		 ID_MUSIC + 'ＪａｖａＳｃｒｉｐｔの改変',
		 '㈲迷い人',
		 '㈲温泉マークのおふだ'
	],

	[ 2003,  1,  9, ID_MELODY + '筋肉少女帯→ゴーゴー蟲娘',
		ID_STORY + '妄想の文その２' ],

	[ 2003,  1,  5, ID_MELODY + '特撮→うさぎ',
		ID_MELODY + '（修正）筋肉少女帯→えー、まあ、そーゆー事で…で、えー…さよなら～っ！！' ],

	[ 2003,  1,  4, ID_MELODY + '筋肉少女帯→えー、まあ、そーゆー事で…で、えー…さよなら～っ！！' ],

	[ 2002, 12, 92, ID_MELODY + 'ＺＵＮＴＡＴＡ→生命の風が吹く場所（ｒａｙｏｎｓ　ｄｅ　ｌ’Ａｉｒ　ｖｅｒｓｉｏｎ）',					ID_MELODY + 'ＺＵＮＴＡＴＡ→女の子にはセンチメンタルなんて感情はない',
		'新コーナー：せっちゃんのおみせ' ],

	[ 2002, 12, 91, ID_STORY + '甘く温かくまろやかな' ],

	[ 2002, 12, 10, ID_MUSIC + 'アバラボネ',
		ID_STORY + '三途の川でひとときを（おばかなものを…）',
		ID_MELODY + '大槻ケンヂ→あのさぁ' ],

	[ 2002, 11, 29, ID_STORY + 'つまらなくなるはなし' ],

	[ 2002, 11, 16, ID_MELODY + '（修正）筋肉少女帯→愛のためいき',
		ID_MELODY + '筋肉少女帯→リミックス・リルカの葬列' ],

	[ 2002, 10, 30, ID_STORY + '高速道路',
		ID_STORY + '自虐電波とアメリカ少年' ],

	[ 2002, 10, 28, ID_MELODY + '筋肉少女帯→愛のためいき',
		ID_MELODY + '（修正）犬神サーカス団→路上' ],

	[ 2002, 10, 20, ID_MELODY + '犬神サーカス団→路上' ],

	[ 2002, 10, 16, ID_MELODY + '電気グルーヴ→ＣＯＳＭＩＣ　ＳＵＲＦＩＮ’　Ｅｃｓｔａｓｙ　ｂａｔｈｒｏｏｍ　ｍｉｘ',
		ID_MELODY + 'ＺＵＮＴＡＴＡ→９９％じゃ駄目だ、１００％じゃなきゃ駄目なんだ',
		ID_MELODY + '（修正）特撮→殺神',
		ID_MELODY + '（修正）筋肉少女帯→外道節' ],

	[ 2002, 10, 90, ID_STORY + '今日の天気' ],

	[ 2002,  9, 30, '新コーナー：おりぢなる音楽',
		ID_MELODY + '筋肉少女帯→外道節',
		ID_MELODY + '特撮→殺神',
		ID_MELODY + '（修正）特撮→バーバレラ' ],

	[ 2002,  9,  8, ID_STORY + '合わせ鏡のような',
		ID_STORY + 'それは幸せでもあるし、やっぱり不幸せでもある',
		ID_MELODY + '電気グルーヴ→ドリクキング社歌２００１' ],

	[ 2002,  8, 11, '※ＰＣ用サイト稼動！！',
		'★なまもの系→へんぎん',
		ID_STORY + 'シヅカナ森',
		ID_MELODY + '犬神サーカス団→赤猫',
		ID_MELODY + '特撮→ゴスロリちゃん綱渡りから落下す' ],

	[ 2002,  7, 31, ID_MELODY + '真理の御霊・最聖　麻原彰晃尊師→救えオウム　ヤマトのように' ],

	[ 2002,  7, 30, ID_MELODY + '筋肉少女帯→孤島の鬼',
		ID_MELODY + '犬神サーカス団→赤痣の娼婦' ],

	[ 2002,  7, 27, ID_STORY + '少年とぱらそる',
		ID_MELODY + '犬神サーカス団→陽炎' ],

	[ 2002,  7, 24, ID_MELODY + 'グルグル映畫館→雨で飛び立つ男と女' ],

	[ 2002,  7, 19, ID_MELODY + '（修正）犬神サーカス団→地獄の子守唄' ],

	[ 2002,  7, 17, ID_STORY + '自分が何だかわからなくなる瞬間',
		ID_MELODY + '（修正）犬神サーカス団→赤い蛇' ],

	[ 2002,  7, 13, ID_MELODY + '筋肉少女帯→イタコ・ＬＯＶＥ～ブルーハート～' ],

	[ 2002,  7, 12, ID_MELODY + '筋肉少女帯→ノゾミ・カナエ・タマエ',
		ID_STORY + '青いたぬき',
		ID_MELODY + 'ＺＵＮＴＡＴＡ→ｓｔａｇｅ４' ],

	[ 2002,  7,  8, '※Ｊ－ＳＫＹで♪がダウンロード出来ないのを修正',
		ID_MELODY + '（修正）真理の御霊・最聖　麻原彰晃尊師→真理教、魔を祓う尊師の歌' ],

	[ 2002,  6, 22, ID_MELODY + '犬神サーカス団→赤い蛇',
		ID_MELODY + '犬神サーカス団→見世物小屋口上',
		ID_MELODY + '電気グルーヴ→虹（Ｉｌｂｏｎ２０００ｖｅｒｓｉｏｎ）',
		ID_MELODY + '電気グルーヴ→Ｓｈａｎｇｒｉ－Ｌａ（Ｉｌｂｏｎ２０００ｖｅｒｓｉｏｎ）' ],

	[ 2002,  6,  3, ID_MELODY + '真理の御霊・最聖　麻原彰晃尊師→はばたけ！明日に向かって' ],

	[ 2002,  6,  1, '※ごあいさつの追加',
		'※おさかなのプロフの追加',
		'※サイト内のデザインが全体的に、よりシンプルになった。',
		'★なまもの系→おさかな' ],

	[ 2002,  4, 27, ID_STORY + '（改変）広がる広がる地底世界' ],

	[ 2002,  4, 16, ID_MELODY + '筋肉少女帯→おサル音頭',
		ID_STORY + '広がる広がる地底世界' ],

	[ 2002,  4, 10, ID_MELODY + '（修正）電気グルーヴ→虹（Ｉｌｂｏｎ２０００ｖｅｒｓｉｏｎ）' ],

	[ 2002,  3, 26, '★（修正）なまもの系→夏猫' ],

	[ 2002,  3, 25, ID_MELODY + 'ＺＵＮＴＡＴＡ→９９％じゃ駄目だ、１００％じゃなきゃ駄目なんだ' ],

	[ 2002,  3, 16, ID_STORY + '死して亡くなる' ],

	[ 2002,  3, 14, '※新コーナーおはなし' ],

	[ 2002,  3, 12, ID_MELODY + '（修正）特撮→バーバレラ' ],

	[ 2002,  3, 10, ID_MELODY + '特撮→バーバレラ',
		'★なまもの系→てるてる坊主' ],

	[ 2002,  3,  8, ID_MELODY + 'ＺＵＮＴＡＴＡ→ＳＬＡＵＧＨＴＥＲ　ＨＯＵＲ' ],

	[ 2002,  3,  4, ID_MELODY + '電気グルーヴ→虹（Ｉｌｂｏｎ２０００ｖｅｒｓｉｏｎ）' ],

	[ 2002,  3,  2, '※掲示板を設置' ],

	[ 2002,  2, 23, '★一発系→御霊前' ] 

];