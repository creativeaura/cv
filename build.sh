#!/bin/sh

HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

echo "\n${HR}"
echo "\033[36m Building the deployment package. Please wait ...\033[0m"
echo "${HR}\n"

START=$(date +%s)

echo "Optimizing project with r.js ......		\033[32m✔\033[39m Done" 
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

echo "Updating deployment index.html......		\033[32m✔\033[39m Done"

sed 's/scripts\/config/scripts\/main-built/' < deploy/index.html > deploy/index_new.html

rm deploy/index.html
mv deploy/index_new.html deploy/index.html

END=$(date +%s)

DIFF=$(( ($END - $START)))

echo "\n${HR}"
echo "\033[33m It took ${DIFF} seconds to finish the build process.\033[0m"
echo "${HR}\n"

echo "Thanks"
echo "<3 @gauravjassal\n"
