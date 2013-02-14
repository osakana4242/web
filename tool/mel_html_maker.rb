# coding: Shift_JIS
#-------------------------------------------------------------------------------
#	MelodyHtmlMaker.rb
#	着メロ関連のHTML群の吐き出し.
#	2008.08.28 Osakana Sanzunokawa
#		melodty_worker.html, melody.html の吐き出しができた.
#	2008.08.27 Osakana Sanzunokawa
#		melody_list.js の吐き出しができた.
#	2008.08.26 Osakana Sanzunokawa
#-------------------------------------------------------------------------------

require 'csv.rb'

#local
this_script_path = File.dirname(File.expand_path(__FILE__))
require this_script_path + "/debug.rb"
require this_script_path + "/util.rb"

#-------------------------------------------------------------------------------
# メロディ.
class Melody
	# コンストラクタ.
	def initialize
		@name
		@file_key_name
		@comment
		@files = Hash.new
		@files[".mid"] = Hash.new
		@files[".mld"] = Hash.new
		@files[".mmf"] = Hash.new
	end
	
	attr_accessor(
		:name,
		:file_key_name,
		:comment,
		:files
	)
end

#-------------------------------------------------------------------------------
# 画像切り出し情報.
class MelodyWorker
	# メロディの親.
	def initialize
		@name
		@file_key_name
		@comment
		@melodies = Array::new
	end
	
	attr_accessor(
		:name,
		:file_key_name,
		:comment,
		:melodies
	)
end

#-------------------------------------------------------------------------------
#

class MelodyHtmlMaker
	FILE_VERSION = 0x0105
	TAB = "\t"
	BR = "\n"

	attr_reader :melodyWorkers

	# コンストラクタ.
	def initialize
		@filename = nil
		@melodyWorkers = Array::new
		@html_title = "おさかなの不安定世界"
		@html_extension = ".html"
		# ヘッダ.
		@html_head = <<-EOS
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html charset=Shift_JIS">
		<meta name="viewport" content="width=240">
		<title>#{@html_title}</title>
		<link rel="StyleSheet" type="text/css" href="../../data/css_fp/base.css">
	</head>
	<body>
		<div id="main">
		EOS
		
		# フッタ.
		@html_foot = <<-EOS
		</div>
	</body>
</html>
		EOS
		
	end
	
	##
	#
	##
	def dbgPrint(str, level)
		Debug::instance.print("MelodyHtmlMaker::" + str, level)
	end
	
	##
	# Csvの解析.
	##
	def analyzeCsv(filename)
		@filename = filename
		analyze_uv_sheet(@filename)
		dbgPrint("melody_workers numbers:#{@melodyWorkers.length}\n", Debug::LEVEL_INFO)
	end
	
	##
	# UVの解析.
	##
	def analyze_uv_sheet(sheet)
		parseColIndex = 0 # 走査中の行番号.
		rowIDs = Hash.new
		mode = "none"
		
		temp_melody_worker = nil
		CSV.foreach(sheet) {
			|row|
			# puts "col:" + parseColIndex.to_s
			if row[0] != nil && "#" == row[0][0, 1]
				# 行頭に#がある行は除外.
				# pass
			elsif row[0] != nil && row[0] == "end"
				dbgPrint("end #{mode}", Debug::LEVEL_VERBOSE)
				mode = "none"
			else
				# データ読み込み.
				case(mode)
				when "none"
					# 新しい行グループを検索.
					if row[0] != nil && row[0].index("newRowNames") == 0
						# 新しい列. モードを変更して、列の名前を解析.
						
						# +モードを解析.
						mode = row[0].split(/\s* \s*/)[1]
						dbgPrint("mode->#{mode}", Debug::LEVEL_VERBOSE)
						case(mode)
						when "melody"
						else
							raise("Unsupported rownames:" + mode)
						end
						
						# +列の名前を解析.
						rowIDs.clear()
						for i in 0..row.length
							rowIDs[row[i]] = i
						end
					else
						raise("Invalid col:" + parseColIndex)
					end
				when "melody"
					worker_name = row[rowIDs["worker"]]
					if(worker_name != nil)
						#---------------------------------------------------------------------
						# MelodyWorker
						dbgPrint("loading worker[" + @melodyWorkers.length.to_s + "]:" + worker_name, Debug::LEVEL_VERBOSE)
						temp_melody_worker = MelodyWorker::new
						temp_melody_worker.name = worker_name
						temp_melody_worker.file_key_name = row[rowIDs["file_key_name"]]
						temp_melody_worker.comment = row[rowIDs["comment"]]
						@melodyWorkers << temp_melody_worker
					else
						#---------------------------------------------------------------------
						# MelodyWorker<-Melody
						melody = Melody::new
						melody.name = row[rowIDs["title"]]
						melody.file_key_name = row[rowIDs["file_key_name"]]
						melody.comment = row[rowIDs["comment"]]
						temp_melody_worker.melodies << melody
					end
				end
			end
			parseColIndex = parseColIndex + 1
		}
		
		#各ファイルの存在チェック.
		base_dir = "www/fp/m"
		melody_dir = "www/data/melody"
		@melodyWorkers.each {
			|m_worker|
			m_worker.melodies.each {
				|melody|
				melody_types = Hash.new
				melody_types = ["04", "16", "16fm", "16pcm"]
				
				melody.files.each_pair {
					|extension, type_list|
					
					melody_types.each {
						|type|
						file_name = "#{m_worker.file_key_name}_#{melody.file_key_name}_#{type}#{extension}"
						abs_file_name = File.expand_path(melody_dir + "/" + file_name)
						if(File.exist?(abs_file_name))
							type_list[type] = file_name
							#puts "#{file_name} #{type}\n"
						else
							#puts "unexist #{abs_file_name}\n"
						end
					}
				}
			}
		}
		#解析情報吐き出し.
		@melodyWorkers.each {
			|m_worker|
			m_worker.melodies.each {
				|melody|
				melody.files.each_pair {
					|extension, type_list|
					
					type_list.each_pair {
						|type, value|
						puts 'exist ' + type + " " + value + "\n"
					}
				}
			}
		}
	end
	private :analyze_uv_sheet
	

	def outputJavaScriptList(fileName)
		file = File.open(fileName, 'w')
		#解析情報吐き出し.
		mw_i = 0
		file << "var MELODY_LIST = [" + BR
		@melodyWorkers.each {
			|m_worker|
			if(0 < mw_i)
				file << ", " + BR
			end
			file << TAB + "new MelodyWorker(" + BR
			file << TAB + TAB + "\"#{m_worker.name}\"," + BR
			file << TAB + TAB + "\"#{m_worker.file_key_name}\"," + BR
			file << TAB + TAB + "\"#{m_worker.comment}\"," + BR
			file << TAB + TAB + "[" + BR
			mel_i = 0
			m_worker.melodies.each {
				|melody|
				melody.files[".mid"].each_pair {
					|type, value|
					
					if(0 < mel_i)
						file << "," + BR
					end
					file <<  TAB + TAB + TAB + "new Melody(\"#{melody.name}\", \"#{value}\")"
					mel_i += 1
					break
				}
			}
			file << BR
			file << TAB + TAB + "]" + BR
			file << TAB + ")"
			mw_i += 1
		}
		file << BR
		file << "]" + BR
		
		file.close
		dbgPrint("出力ファイル：" + fileName, Debug::LEVEL_INFO)
	end

	def outputMelodiesHtml(path, melody_dir)
		@melodyWorkers.each {
			|m_worker|
			m_worker.melodies.each {
				|melody|
				file_name = path + "/#{m_worker.file_key_name}_#{melody.file_key_name}.html"
				# ファイルの更新が必要かチェック.
				doUpdate = !File.exist?(file_name)
				doUpdate = true
				if(!doUpdate)
					melody.files.each_value {
						|format|
						format.each_value {
							|value|
							bin_file_name = melody_dir + "/" + value
							if(File.mtime(file_name) < File.mtime(bin_file_name))
								doUpdate = true
								break
							end
						}
						if(doUpdate)
							break
						end
					}
				end
				if(doUpdate)
					# ファイル更新.
					file = File.open(file_name, 'w')
					file << @html_head
					file << TAB + TAB + TAB + "<h1>#{melody.name}</h1>" + BR
					file << TAB + TAB + TAB + "<ul>" + BR
					targets = ["smartphone", "docomo", "au/softbank"]
					formats = [".mid", ".mld", ".mmf"]
					format_i = 0
					formats.each {
						|format_name|
						
						type_i = 0
						file << TAB + TAB + TAB + TAB + "<li>#{targets[format_i]}:"
						melody.files[format_name].each_pair {
							|type_name, bin_file_name|
							if(0 < type_i)
								file << ","
							end
							file << "<a href=\"../../data/melody/#{bin_file_name}\">#{type_name}</a>"
							type_i += 1
						}
						file << "</li>" + BR
						format_i += 1
					}
					
					file << TAB + TAB + TAB + "</ul>" + BR
					file << TAB + TAB + TAB + "<p>#{melody.comment}</p>" + BR
					file << TAB + TAB + TAB + "<a href=\"#{m_worker.file_key_name}.html\">もどる</a>" + BR
					file << @html_foot
					file.close
					dbgPrint("出力ファイル：" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
				else
					#dbgPrint("パス：" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
				end
			}
		}
	end

	def outputMelodyWorkersHtml(path)
		@melodyWorkers.each {
			|m_worker|
			file_name = path + "/#{m_worker.file_key_name}.html"
			doUpdate = !File.exist?(file_name)
			if(!doUpdate)
				m_worker.melodies.each {
					|melody|
					melody_html_file_name = path + "/#{m_worker.file_key_name}_#{melody.file_key_name}.html"
					if(File.mtime(file_name) < File.mtime(melody_html_file_name))
						doUpdate = true
						break
					end
				}
			end
			# ファイルの更新が必要かチェック.
			if(doUpdate)
				# ファイル更新.
				file = File.open(file_name, 'w')
				file << @html_head
				file << TAB + TAB + TAB + "<h1>#{m_worker.name}</h1>" + BR
				file << TAB + TAB + TAB + "<ul>" + BR
				m_worker.melodies.each {
					|melody|
					melody_html_file_name = "#{m_worker.file_key_name}_#{melody.file_key_name}.html"
					file << TAB + TAB + TAB + TAB + "<li><a href=\"#{melody_html_file_name}\">#{melody.name}</a></li>" + BR
				}
				
				file << TAB + TAB + TAB + "</ul>" + BR
				file << TAB + TAB + TAB + "<p>#{m_worker.comment}</p>" + BR
				file << TAB + TAB + TAB + "<a href=\"index.html\">もどる</a>" + BR
				file << @html_foot
				file.close
				dbgPrint("出力ファイル：" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
			else
				#dbgPrint("パス：" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
			end
		}
	end

	##
	# c, c++ 用ヘッダー出力
	##
	def outputIndexHtml(path, melody_dir)
		outputMelodiesHtml(path, melody_dir)
		
		#---------------------------------------------------------------------------
		file_name = path + "/index.html"
		file = File.open(file_name, 'w')
		
		worker_list = ""
		
		@melodyWorkers.each {
			| m_worker |
			puts("#{m_worker.file_key_name} / #{m_worker.name}")
			worker_list += "\t\t\t\t" + "<li><a href=\"#{m_worker.file_key_name}.html\">" + m_worker.name + "</a></li>\n"
		}
		
		
		file << @html_head
		
		file << '<h1>着メロ</h1>'
		file << '<div>リンク切れで着メロがダウンロードできない場合は<a href="../index.html#etc">トップのメールアドレス</a>まで連絡いただけると助かります。修正します。</div>'
		file << '<ul>'
		file << worker_list
		file << '</ul>'
		file << "<a href=\"../index#{@html_extension}#menu\">もどる</a>"
		file << @html_foot

		file.close
		dbgPrint("出力ファイル：" + file_name, Debug::LEVEL_INFO)
	end
	
	# メイン.
	def MelodyHtmlMaker.main(args)
		# このプログラムの情報を出力.
		puts <<-EOS
MelodyHtmlMaker
Version:2008/08/28

		EOS
		
		# 引数解析
		if (args[0] == nil)
			# 引数指定が無い.
			# 使い方を出力して終了.
			puts <<-EOS
使い方
ruby MelodyHtmlMaker.rb [hoge.tanim.xls]
			EOS
			exit
		end
		
		animFileName = args[0]
		if(Util::checkExtension(animFileName, ".csv"))
			# インデックスアニメ.
			Debug::instance.setOutputLevel(Debug::LEVEL_TEST)
			baseFileName = File.basename(animFileName, ".csv")
			conv = MelodyHtmlMaker.new()
			conv.analyzeCsv(animFileName)
			conv.outputMelodiesHtml("www/fp/m", "www/data/melody")
			conv.outputMelodyWorkersHtml("www/fp/m")
			conv.outputIndexHtml("www/fp/m", "www/data/melody")
			conv.outputJavaScriptList("www/pc/js/melody_list.js")
		else
			raise("Unsupported file:#{animFileName}")
		end
		
	end
end

#---------------------------------------------------------------------------------------------------
#! プログラム本体
#
# $0		# $0は、実行スクリプト名前
# __FILE__	# これがこのスクリプト自身の名前
#
if File.basename( $0 ) == File.basename( __FILE__ )
	# 実行.
	MelodyHtmlMaker.main(ARGV)
end
