#!/bin/sh

source ./config

for i in out/*.jar; do
	echo -n "$i"
	phantomjs runTest.js "$HOST/index.html?app=&src=$i" > __tmp
	if cat __tmp | grep -q SUCCESS; then
		 echo " - OK"
	else
		cat __tmp
	fi
	sleep 1
done

rm __tmp
