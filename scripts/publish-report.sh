#!/bin/bash
# レポートをGitHub Pagesにpublishするスクリプト
# 使い方: bash scripts/publish-report.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
REPORTS_DIR="$PROJECT_DIR/reports"

echo "=== AI Daily Report Publisher ==="

# index.json を更新（reportsディレクトリ内の全レポートをリスト）
echo "Updating index.json..."
cd "$REPORTS_DIR"

# レポートファイル一覧を取得してindex.jsonを生成
REPORTS=$(ls -1 *_ai-daily-report.json 2>/dev/null | sort)

if [ -z "$REPORTS" ]; then
  echo "No reports found."
  exit 1
fi

# JSONを構築
echo '{' > index.json
echo '  "reports": [' >> index.json

FIRST=true
while IFS= read -r file; do
  DATE=$(echo "$file" | sed 's/_ai-daily-report\.json//')
  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    echo ',' >> index.json
  fi
  printf '    { "date": "%s", "file": "%s" }' "$DATE" "$file" >> index.json
done <<< "$REPORTS"

echo '' >> index.json
echo '  ],' >> index.json
echo "  \"last_updated\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"" >> index.json
echo '}' >> index.json

echo "index.json updated with $(echo "$REPORTS" | wc -l | tr -d ' ') reports."

# Git操作
cd "$PROJECT_DIR"

if [ -d ".git" ]; then
  echo "Committing and pushing..."
  git add reports/
  git commit -m "Update AI daily report $(date +%Y-%m-%d)" || echo "No changes to commit"
  git push origin main || git push origin master
  echo "Published successfully!"
else
  echo "Warning: Not a git repository. Skipping git push."
  echo "Initialize git and set up GitHub Pages to enable auto-publishing."
fi
