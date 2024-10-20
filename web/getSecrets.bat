@echo off

REM Get environment variables for Windows

REM Credit to ChatGPT based on code from @afazio1
for /f "tokens=*" %%i in ('bw login product@bitsofgood.org %BW_PASSWORD% --raw') do set BW_SESSION=%%i
bw get item --session %BW_SESSION% 6623e389-906d-44f5-a3ad-b1fb001723b2 | fx .notes > .env.local

echo Successfully updated .env.local