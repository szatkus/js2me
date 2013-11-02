#!/bin/sh

source ./config

for i in out/*.jar; do
	phantomjs runTest.js $HOST/launch.html?src=$i > __tmp
	if cat __tmp | grep -q SUCCESS; then
		echo "$i - OK"
	else
		cat __tmp
	fi
	sleep 1
done

rm __tmp
