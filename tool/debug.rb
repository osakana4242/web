# coding: utf-8
#
#---------------------------------------------------------------------------------------------------
#
class Debug
	LEVEL_ERROE = 0;
	LEVEL_INFO = 1;
	LEVEL_VERBOSE = 2;
	LEVEL_TEST = 3;
	LEVEL_STRINGS =
	[
		"ERROR  :",
		"INFO   :",
		"VERBOSE:",
		"TEST   :",
	];
	@@debug = nil;
	
	#
	# Debugのシングルトンインスタンスの取得.
	#
	def self.instance()
		if(@@debug == nil)
			@@debug = Debug::new;
		end
		return @@debug;
	end
	
	def initialize()
		@outputLevel = LEVEL_TEST;
	end
	
	#
	# デバッグ出力のレベルを設定.
	#
	def setOutputLevel(level)
		@outputLevel = level;
	end
	
	def print(str, level)
		if(level <= @outputLevel)
			puts(LEVEL_STRINGS[level] + str);
		end
	end
end

