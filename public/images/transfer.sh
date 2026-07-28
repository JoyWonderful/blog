#! /usr/bin/bash
TARGET_DIR="."
QUALITY=80 # 图片保留质量
EXTENSIONS=("png" "jpeg" "jpg" "bmp" "gif")

for ext in "${EXTENSIONS[@]}"; do
    echo -e "\033[1;36m$ext\033[0m"
    for i in $(find $TARGET_DIR -iname "*.${ext}"); do
        echo -e "\033[32m$i\033[0m \033[2m=> \033[0;32m${i%.*}.webp\033[0m"
        cwebp -q $QUALITY "$i" -o "${i%.*}.webp"
        rm "$i"
    done
done
