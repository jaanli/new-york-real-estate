#!/bin/bash

sshpass -p "${SFTP_PASSWORD}" sftp -q -P "${SFTP_PORT}" "${SFTP_USERNAME}@${SFTP_ENDPOINT}" <<EOF
lcd .
ls -l .
bye
EOF | grep -v "^sftp>" | awk '$1 ~ /^-/ {print $NF}'