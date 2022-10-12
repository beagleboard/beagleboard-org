#!/bin/bash
export DATE=`date +%Y%m%d`
export FILE=beagleboard-org-db-$DATE.csv
echo "" > $FILE
for file in *.xml
do
	cat $file | tr -d \\n | xml2 | 2csv hopobject @id @name @prototype @created @lastModified hop:parent uri time user pvcount body >> $FILE
done
