find . -type f -name "*.html" ! -path "./index.html" ! -path "./public/404.html" ! -path "./projects/*" -exec rm {} \;
rm -rf dist
rm -rf dist-generate-html
rm -rf coverage
find . -type d -empty -depth -exec rmdir {} \;
