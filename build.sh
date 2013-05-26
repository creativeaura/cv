#!/bin/sh
echo "\033[36m Building the deployment package. Please wait ...\033[0m"

START=$(date +%s)

r.js -o app.build.js optimize=none
rm -rf deploy
mkdir deploy
cp -R app/* deploy/
rm deploy/styles/*.scss
rm -rf deploy/scripts/plugins
rm -rf deploy/scripts/modules
rm deploy/scripts/app.js
rm deploy/scripts/config.js
rm deploy/scripts/main.js
rm deploy/scripts/router.js
rm deploy/scripts/social.js
rm deploy/scripts/libs/almond.js
rm deploy/scripts/libs/backbone.js
rm deploy/scripts/libs/handlebars.js
rm deploy/scripts/libs/jquery.js
rm deploy/scripts/libs/lodash.js
rm deploy/config.rb

sed 's/scripts\/config/scripts\/main-built/' < deploy/index.html > deploy/index_new.html

rm deploy/index.html
mv deploy/index_new.html deploy/index.html

END=$(date +%s)

DIFF=$(( ($END - $START)))

echo "\033[33m It took ${DIFF} seconds to finish the build process.\033[0m"
