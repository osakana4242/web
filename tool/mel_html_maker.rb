# coding: Shift_JIS
#-------------------------------------------------------------------------------
#	MelodyHtmlMaker.rb
#	�������֘A��HTML�Q�̓f���o��.
#	2008.08.28 Osakana Sanzunokawa
#		melodty_worker.html, melody.html �̓f���o�����ł���.
#	2008.08.27 Osakana Sanzunokawa
#		melody_list.js �̓f���o�����ł���.
#	2008.08.26 Osakana Sanzunokawa
#-------------------------------------------------------------------------------

require 'csv.rb'

#local
this_script_path = File.dirname(File.expand_path(__FILE__))
require this_script_path + "/debug.rb"
require this_script_path + "/util.rb"

#-------------------------------------------------------------------------------
# �����f�B.
class Melody
	# �R���X�g���N�^.
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
# �摜�؂�o�����.
class MelodyWorker
	# �����f�B�̐e.
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

	# �R���X�g���N�^.
	def initialize
		@filename = nil
		@melodyWorkers = Array::new
		@html_title = "�������Ȃ̕s���萢�E"
		@html_extension = ".html"
		# �w�b�_.
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
		
		# �t�b�^.
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
	# Csv�̉��.
	##
	def analyzeCsv(filename)
		@filename = filename
		analyze_uv_sheet(@filename)
		dbgPrint("melody_workers numbers:#{@melodyWorkers.length}\n", Debug::LEVEL_INFO)
	end
	
	##
	# UV�̉��.
	##
	def analyze_uv_sheet(sheet)
		parseColIndex = 0 # �������̍s�ԍ�.
		rowIDs = Hash.new
		mode = "none"
		
		temp_melody_worker = nil
		CSV.foreach(sheet) {
			|row|
			# puts "col:" + parseColIndex.to_s
			if row[0] != nil && "#" == row[0][0, 1]
				# �s����#������s�͏��O.
				# pass
			elsif row[0] != nil && row[0] == "end"
				dbgPrint("end #{mode}", Debug::LEVEL_VERBOSE)
				mode = "none"
			else
				# �f�[�^�ǂݍ���.
				case(mode)
				when "none"
					# �V�����s�O���[�v������.
					if row[0] != nil && row[0].index("newRowNames") == 0
						# �V������. ���[�h��ύX���āA��̖��O�����.
						
						# +���[�h�����.
						mode = row[0].split(/\s* \s*/)[1]
						dbgPrint("mode->#{mode}", Debug::LEVEL_VERBOSE)
						case(mode)
						when "melody"
						else
							raise("Unsupported rownames:" + mode)
						end
						
						# +��̖��O�����.
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
		
		#�e�t�@�C���̑��݃`�F�b�N.
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
		#��͏��f���o��.
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
		#��͏��f���o��.
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
		dbgPrint("�o�̓t�@�C���F" + fileName, Debug::LEVEL_INFO)
	end

	def outputMelodiesHtml(path, melody_dir)
		@melodyWorkers.each {
			|m_worker|
			m_worker.melodies.each {
				|melody|
				file_name = path + "/#{m_worker.file_key_name}_#{melody.file_key_name}.html"
				# �t�@�C���̍X�V���K�v���`�F�b�N.
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
					# �t�@�C���X�V.
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
					file << TAB + TAB + TAB + "<a href=\"#{m_worker.file_key_name}.html\">���ǂ�</a>" + BR
					file << @html_foot
					file.close
					dbgPrint("�o�̓t�@�C���F" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
				else
					#dbgPrint("�p�X�F" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
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
			# �t�@�C���̍X�V���K�v���`�F�b�N.
			if(doUpdate)
				# �t�@�C���X�V.
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
				file << TAB + TAB + TAB + "<a href=\"index.html\">���ǂ�</a>" + BR
				file << @html_foot
				file.close
				dbgPrint("�o�̓t�@�C���F" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
			else
				#dbgPrint("�p�X�F" + file_name + " at:" + File.ctime(file_name).to_s, Debug::LEVEL_INFO)
			end
		}
	end

	##
	# c, c++ �p�w�b�_�[�o��
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
		
		file << '<h1>������</h1>'
		file << '<div>�����N�؂�Œ��������_�E�����[�h�ł��Ȃ��ꍇ��<a href="../index.html#etc">�g�b�v�̃��[���A�h���X</a>�܂ŘA������������Ə�����܂��B�C�����܂��B</div>'
		file << '<ul>'
		file << worker_list
		file << '</ul>'
		file << "<a href=\"../index#{@html_extension}#menu\">���ǂ�</a>"
		file << @html_foot

		file.close
		dbgPrint("�o�̓t�@�C���F" + file_name, Debug::LEVEL_INFO)
	end
	
	# ���C��.
	def MelodyHtmlMaker.main(args)
		# ���̃v���O�����̏����o��.
		puts <<-EOS
MelodyHtmlMaker
Version:2008/08/28

		EOS
		
		# �������
		if (args[0] == nil)
			# �����w�肪����.
			# �g�������o�͂��ďI��.
			puts <<-EOS
�g����
ruby MelodyHtmlMaker.rb [hoge.tanim.xls]
			EOS
			exit
		end
		
		animFileName = args[0]
		if(Util::checkExtension(animFileName, ".csv"))
			# �C���f�b�N�X�A�j��.
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
#! �v���O�����{��
#
# $0		# $0�́A���s�X�N���v�g���O
# __FILE__	# ���ꂪ���̃X�N���v�g���g�̖��O
#
if File.basename( $0 ) == File.basename( __FILE__ )
	# ���s.
	MelodyHtmlMaker.main(ARGV)
end
