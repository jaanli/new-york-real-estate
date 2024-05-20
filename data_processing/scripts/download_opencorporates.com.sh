#!/bin/bash

while IFS= read -r line; do
    file=$(echo "$line" | awk '{print $2}')
    sshpass -p "${SFTP_PASSWORD}" sftp -q -P "${SFTP_PORT}" "${SFTP_USERNAME}@${SFTP_ENDPOINT}" <<EOF
    lcd .
    cd tartu_uni/2024-05-20
    get "$file"
    bye
EOF
done < md5sum.txt