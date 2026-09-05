#!/usr/bin/env bash
# Build the site into docs/ and push it to main, which is where GitHub
# Pages serves from. Used while GitHub Actions is unavailable.
set -euo pipefail

cd "$(cd "$(dirname "$0")/.." && pwd)"

npm run build
touch docs/.nojekyll

git add -A docs
if git diff --cached --quiet; then
  echo "docs/ unchanged, nothing to deploy"
  exit 0
fi

git commit -q -m "Deploy site build"
git push -q origin main
echo "Pushed docs/ to main"
