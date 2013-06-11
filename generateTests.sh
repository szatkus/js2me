#!/bin/sh

source ./config

mkdir -p out
cd tests
for i in */; do
	cd $i
	mkdir tmp
	javac -cp $J2ME_JARS -d tmp -source 1.3 -target 1.3 -sourcepath .:.. Test.java
	cp *.png tmp
	cp *.wav tmp
	name=`echo $i | tr -d /`
	cd tmp
	jar cfm ../../../out/$name.jar ../../MANIFEST.MF *
	cd ..
	rm -rf tmp
	cd ..
done
