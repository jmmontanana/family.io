#!/bin/bash

IFS=$'\n'; for i in *.jpeg; do mv $i ${i%jpeg}jpg; done; IFS=$' ';

IFS=$'\n';
for i in *.jpg; do 
size=$(identify -format "%wx%h" $i);

width=$(echo $size | cut -d'x' -f1);
height=$(echo $size | cut -d'x' -f2);

if [ $width -gt $height ]; then
    max_dimension=$width;
else
    max_dimension=$height;
fi;
echo "Maximum dimension: $i $max_dimension";
convert $i -gravity center -extent ${max_dimension}x${max_dimension} ${i}_resized.jpg;
mv ${i}_resized.jpg $i;
done;

IFS=$' ';

