#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$GPG_JSON_KEY" \
--output google-services.json google-services.json.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$GPG_JSON_KEY" \
--output pc-api-7351306379986613694-46-29e4224fe95e.json pc-api-7351306379986613694-46-29e4224fe95e.json.gpg