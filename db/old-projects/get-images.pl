#!/usr/bin/env perl

foreach $file (@ARGV) {
  print "$file\n";
  open(IN, "xmllint $file --xpath \"//xmlroot//hopobject//imagefile\" |");
  while(<IN>) {
    if(s#<imagefile>data:image/(.*);base64,(.*)</imagefile>##) {
      $format = $1;
      $data = $2;
      $filename = $file;
      $filename =~ s/\.xml$/.$format/;
      print "$format\n";
      open(OUT, "| base64 -d > images/$filename");
      print OUT "$data\n";
      open(OUTXML, "> xml/$file");
      open(INXML, "$file");
      while(<INXML>) {
        s#<imagefile>(.*)</imagefile>#<imagefile>$filename</imagefile>#;
	print OUTXML $_;
      }
    }
  }
}
# <imagefile>data:image/gif;base64,R0lGODlhnwKmAaECAAAAAP8z
# xmllint 485.xml --xpath "//xmlroot//hopobject//imagefile" | sed -e "s/<imagefile>.*,//" | sed -e "s#</imagefile>##" | base64 -d > 485.jpeg
