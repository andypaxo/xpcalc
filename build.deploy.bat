cmd /c "platforms\android\cordova\build.bat --release"
jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 -keystore softwarealchemist.keystore platforms\android\bin\xpcalc-release-unsigned.apk softwarealchemist
zipalign -v 4  platforms\android\bin\xpcalc-release-unsigned.apk platforms\android\bin\xpcalc-release.apk
explorer /select,platforms\android\bin\xpcalc-release.apk
