#!/bin/bash

remote_dir="2024-05-20"
local_dir="./opencorporates_data"

# Create the local directory if it doesn't exist
mkdir -p "$local_dir"

sshpass -p "${SFTP_PASSWORD}" sftp -q -P "${SFTP_PORT}" "${SFTP_USERNAME}@${SFTP_ENDPOINT}" <<EOF
cd $remote_dir

get -r .

lcd $local_dir
mput *

bye
EOF