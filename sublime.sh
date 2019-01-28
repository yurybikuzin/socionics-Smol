#!/bin/sh
for i in tree.sublime-syntax tree.tmPreferences; do
  targetFileSpec="$HOME/Library/Application Support/Sublime Text 3/Packages/User/$i"
  rm -f "$targetFileSpec"
  ln "./$i" "$targetFileSpec"
done
