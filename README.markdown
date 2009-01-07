# FireQuery

jQuery specific enhancements for Firebug.

# Why?

Because I was sick of clicking on green object links to see what is contained in jQuery expressions.

# Features

* jQuery expressions are intelligently presented in Firebug Console and DOM inspector
* attached jQuery data are first class citizens
* elements in jQuery collections are highlighted on hover

# Facelift
[For this HTML file ...][testsource]

## Before

![fbconsole][fbconsole]
![fbhtml][fbhtml]

## After

![fqconsole][fqconsole]
![fqhtml][fqhtml]

# Current status

This extension is highly experimental. It worked with 06/01/09 night build of Minefield and trunk of firebug 1.4. Use at your own risk!

Mutation effects have been not implemented yet. So, changing jQuery data on elements after they were rendered into HTML panel has no effect on the view.

# Build instructions

If you want to install latest addon from sources, you need to build it. 
It should be simple, but make sure you have these tools on your paths:

* git
* zip
* ruby and rake

## Build steps:

    git clone git://github.com/darwin/firequery.git
    cd firequery
    rake
  
After that your XPI should be available in ``build/firequery-X.Y.xpi``.

You should be able to install XPI file into Firefox: ``File -> Open File`` ... and browse for ``firequery-X.Y.xpi``.

# History

* v0.1 (public preview)
  * support for jQuery expressions
  * support for JQuery data
  * jQuery collections highlighter

[fqconsole]: http://github.com/darwin/firequery/tree/master/support/screenshot.png?raw=true "console panel with FireQuery"
[fqhtml]: http://github.com/darwin/firequery/tree/master/support/screenshot.png?raw=true "html panel with FireQuery"
[fbconsole]: http://github.com/darwin/firequery/tree/master/support/screenshot.png?raw=true "original Firebug console panel"
[fbhtml]: http://github.com/darwin/firequery/tree/master/support/screenshot.png?raw=true "original Firebug html panel"
[firebug]: https://addons.mozilla.org/en-US/firefox/addon/1843
[testsource]: http://github.com/darwin/firequery/support/test/index.html