#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch.
# Used while GitHub Actions is unavailable; the branch is disposable,
# so the push is a force push of a single fresh commit.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

remote="$(git remote get-url origin)"

npm run build

cd dist
touch .nojekyll
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$root" config user.name)" \
    -c user.email="$(git -C "$root" config user.email)" \
    commit -q -m "Deploy $(git -C "$root" rev-parse --short HEAD)"
git push -q -f "$remote" gh-pages
rm -rf .git

echo "Pushed dist/ to gh-pages"
