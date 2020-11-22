@chcp 65001
@rem webページにファイルを同期する.

pushd %~d0%~p0

@rem LOCAL_PATH を相対パスから絶対パスに変換する.
pushd %~d0%~p0..\www
set LOCAL_PATH=%CD%
popd

set REMOTE_PATH=/home/osakana4242/www
set WIN_SCP=.\no_commit\WinSCP\WinSCP.exe
set SESSION=osakana4242@osakana4242.sakura.ne.jp

@if not exist %WIN_SCP% (
	@echo %WIN_SCP% が見つかりません. %WIN_SCP% を配置してください.
	@pause
	exit /b 1
)

:goto_confirm_sync
@set /p x="%REMOTE_PATH% を同期します。（y/n)："

@if "%x%" == "y" (
	%WIN_SCP% %SESSION% /console /script="./upload_script.txt" /log="./no_commit/upload.log.txt"
	goto :goto_confirm_sync
) else (
	@rem そのまま抜けて終了.
)

popd
exit /b
