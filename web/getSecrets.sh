#!/bin/bash

# Get environment variables for Linux and Mac

# Credit to @afazio1
if [[ -z "${BW_PASSWORD}" ]]; then
    echo "Please type 'export BW_PASSWORD={password} then re-run 'npm run secrets:linux'"
    exit 1;
fi

bw logout
export BW_SESSION=$(bw login product@bitsofgood.org ${BW_PASSWORD} --raw);
bw sync --session $BW_SESSION
bw get item 6623e389-906d-44f5-a3ad-b1fb001723b2 | fx .notes > ".env.local"

echo "Successfully updated .env.local"
