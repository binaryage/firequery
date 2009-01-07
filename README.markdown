# FireQuery

jQuery specific enhancements for Firebug.

![screenshot][screenshot]

# Why?

Because I was sick of clicking on green object links to see what is contained in jQuery expressions.

# Features

* jQuery expressions are intelligently presented in Firebug Console and DOM inspector
* attached jQuery data are first class citizens when walking DOM structures

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

Remember, that you should be also using latest FireQuery library on server-side.

[screenshot]: http://github.com/darwin/firequery/tree/master/support/screenshot.png?raw=true "FireQuery in action"
[firebug]: https://addons.mozilla.org/en-US/firefox/addon/1843