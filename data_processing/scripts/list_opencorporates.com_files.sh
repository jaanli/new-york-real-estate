#!/bin/bash

sshpass -p "${SFTP_PASSWORD}" sftp -q -P "${SFTP_PORT}" "${SFTP_USERNAME}@${SFTP_ENDPOINT}" <<EOF
ls 2024-05-20
bye
EOF