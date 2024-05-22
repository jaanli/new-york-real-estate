#!/bin/bash

data_dir="$HOME/data/opencorporates"
md5sum_file="$data_dir/md5sum.txt"

# Check if md5sum.txt exists
if [ ! -f "$md5sum_file" ]; then
  echo "Error: md5sum.txt not found in $data_dir"
  exit 1
fi

# Verify md5 checksums
cd "$data_dir"
md5sum -c "$md5sum_file"