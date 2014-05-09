#/!bin/sh
rm -f jayme.zip
rm -rf jayme
mkdir jayme
cp -r js img css index.html jayme
if [ "$1" == "turbo" ]; then
	cp -r manifest.webapp_x jayme/manifest.webapp
	rm jayme/js/program_pumba.js
else
	cp -r manifest.webapp jayme/manifest.webapp
	rm jayme/js/program_timon.js
fi

cd jayme
zip -r ../jayme.zip *
