#!/bin/sh

source ./config

mkdir -p out
cd tests

function make_test {
	i=$1
	cd $i
	mkdir tmp
	javac -cp $J2ME_JARS -d tmp -source 1.3 -target 1.3  -encoding UTF-8  -sourcepath .:.. Test.java
	cp *.* tmp
	name=`echo $i | tr -d /`
	cd tmp
	jar cfm ../../../out/$name.jar ../../MANIFEST.MF *
	cd ..
	rm -rf tmp
	cd ..
}

if [ -z "$1" ]; then
	for i in */; do
		make_test $i
	done
else
	make_test $1
fi
