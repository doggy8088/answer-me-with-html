#!/bin/bash
# Daily upstream sync for the zh-tw edition.
#
#   scripts/zh-tw/sync.sh            # sync if upstream moved; prints result
#
# Flow: mirror QingYunA main into origin/main, rebuild the zh-tw branch from
# the new main (convert.mjs), regenerate the bundle, run the zh-TW quality
# gate (check.mjs) and the test suite, then push. zh-tw is a generated
# branch: it is force-pushed (with lease) from the rebuilt tree.
# Prints NOCHANGE when upstream has not moved since the last sync.
set -eu
cd "$(dirname "$0")/../.."

UP=$(git ls-remote upstream main | cut -f1)
BASE_FILE=scripts/zh-tw/.base-sha
LAST=""
if git show zh-tw:$BASE_FILE >/dev/null 2>&1; then LAST=$(git show zh-tw:$BASE_FILE); fi
if [ "$UP" = "$LAST" ]; then echo "NOCHANGE upstream=$UP"; exit 0; fi

git fetch upstream main
git push origin "upstream/main:main"

git checkout -B zh-tw upstream/main
# The pipeline scripts live only on zh-tw; carry them over the reset.
git checkout "origin/zh-tw" -- scripts/zh-tw 2>/dev/null || true
export PATH="$PWD/node_modules/.bin:$PATH"
command -v opencc-cli >/dev/null || npm install -g @willh/opencc-cli@0.1.4
node scripts/zh-tw/convert.mjs
echo "$UP" > $BASE_FILE
npm ci --ignore-scripts
npm run build
node scripts/zh-tw/check.mjs
npm test

git add -A
git commit -m "zh-tw: regenerate from upstream $UP

Converted with @willh/opencc-cli (cn -> tw2) plus the settled Taiwan
vocabulary fixes; quality gate scripts/zh-tw/check.mjs passed."
git push --force-with-lease origin zh-tw
echo "SYNCED upstream=$UP"
