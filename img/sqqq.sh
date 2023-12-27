#!/bin/bash


for i in Adela.jpg; do 
size=$(identify -format "%wx%h" $i)

width=$(echo $size | cut -d'x' -f1)
height=$(echo $size | cut -d'x' -f2)

if [ $width -gt $height ]; then
    max_dimension=$width
else
    max_dimension=$height
fi
echo "Maximum dimension: $max_dimension"
convert $i -resize "${max_dimension}x${max_dimension}^" -gravity center -extent ${max_dimension}x${max_dimension} ${i}_resized.jpg
done;
