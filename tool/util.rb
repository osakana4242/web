# coding: utf-8

#---------------------------------------------------------------------------------------------------
#
class Util
	def self.getAbsolutePath(filename)
		fso = WIN32OLE.new("Scripting.FileSystemObject");
		return fso.GetAbsolutePathName(filename);
	end
	
	# 指定 xls ファイル 内の各シートを csv にして、指定フォルダへ吐き出す.
	def self.xlsToCsvFiles(filename, dirname)
		Dir::mkdir(dirname);
		program = File.dirname(File.expand_path(__FILE__)) + "\\csvmake\\csvmake.exe";
		absFileName = Util.getAbsolutePath(filename);
		
		execstr = program +
			" " + filename +
			" " + dirname;
		puts(execstr); # コンソールでexecの内容を確認.
		system(execstr); # 実行.
		
	end
	
	def self.rmdir(dirname)
		# サブディレクトリを階層が深い順にソートした配列を作成
		dirlist = Dir::glob(dirname + "**/").sort {
			|a,b| b.split('/').size <=> a.split('/').size
		}

		# サブディレクトリ配下の全ファイルを削除後、サブディレクトリを削除
		dirlist.each {|d|
			Dir::foreach(d) {|f|
				File::delete(d+f) if ! (/\.+$/ =~ f)
			}
			Dir::rmdir(d)
		}
	end
	
	# 拡張子のチェック. ファイル名のおしりが指定の拡張子なら true.
	def self.checkExtension(filename, extension)
		basename = File.basename(filename, extension);
		return filename != basename;
	end
		
end

