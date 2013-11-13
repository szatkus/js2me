#!/bin/sh

source ./config

for i in out/*.jar; do
	echo -n "$i"
	if phantomjs runTest.js "$HOST/launch.html?src=$i" | tee __tmp | grep -q SUCCESS; then
		 echo " - OK"
	else
		cat __tmp
	fi
	sleep 1
done

rm __tmp
