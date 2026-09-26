#!/usr/bin/env bash
# Sets the site's public base URL everywhere it is used (canonical, Open Graph,
# JSON-LD, sitemap.xml, robots.txt, 404.html <base>).
#
# Usage:   ./set-site-url.sh https://yourname.github.io/your-repo/
#          ./set-site-url.sh https://www.yourdomain.in/
#
# The current value is stored in site-url.txt, so you can run this again later
# (for example when you move to a custom domain).
set -euo pipefail
cd "$(dirname "$0")"

NEW="${1:-}"
if [[ -z "$NEW" || ! "$NEW" =~ ^https?:// ]]; then
  echo "Usage: $0 https://yourname.github.io/your-repo/" >&2
  exit 1
fi
[[ "$NEW" == */ ]] || NEW="$NEW/"

OLD="$(tr -d '[:space:]' < site-url.txt)"
if [[ "$OLD" == "$NEW" ]]; then echo "Already set to $NEW"; exit 0; fi

# Escape for sed
esc() { printf '%s' "$1" | sed -e 's/[\/&|.]/\\&/g'; }
O="$(esc "$OLD")"; N="$(esc "$NEW")"

find . -path ./.git -prune -o -type f \( -name '*.html' -o -name 'sitemap.xml' -o -name 'robots.txt' \) -print0 |
  while IFS= read -r -d '' f; do
    sed -i.bak "s|$O|$N|g" "$f" && rm -f "$f.bak"
  done

echo "$NEW" > site-url.txt
echo "Site URL changed:"
echo "  from $OLD"
echo "  to   $NEW"
