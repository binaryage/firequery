---
title: FireQuery
layout: product
logo: /shared/img/firequery-logo.png
repo: http://github.com/darwin/firequery
support: http://github.com/darwin/firequery/issues
download: https://addons.mozilla.org/en-US/firefox/addon/12632
version: Version 0.3
---

# FireQuery is a collection of Firebug enhancements for jQuery

Why? Because I was sick of clicking on green object links to see what is contained in jQuery expressions in Firebug 1.3

<a href="/img/intro.png"><img src="/img/intro-small.png" width="800" height="800" class="small-shadow"></a>

Screenshots were taken for [this test HTML file][testsource].

# Features

* jQuery expressions are intelligently presented in Firebug Console and DOM inspector
* attached jQuery datas are first class citizens
* elements in jQuery collections are highlighted on hover
* jQuerify: enables you to inject jQuery into any web page

# Status

* v0.3 works with official Firebug 1.3 and beta Firebug 1.4 (Firefox 2.0 - 3.5)
* v0.2 works with beta Firebug 1.4 (Firefox 3.0.x or Firefox 3.5)

# Note about security

<b>This extension may be insecure</b>, so please don't browse porn sites with this enabled. 
I still don't fully understand Firefox extension security model.
The reality is that I'm interacting with naked HTML page from privileged code which may be insecure.

Good solution is to have dedicated [Firefox profile](http://support.mozilla.com/en-US/kb/Profiles) for development and use it only for safe sites.

# Install 

The best way is to **[install the addon][download]** from [addons.mozilla.org](http://addons.mozilla.org) or you can go wild and build this on your own.

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

* v0.3 (27.06.2009)
  * [[darwin][darwin]] Firebug 1.3 compatibility
  * [[darwin][darwin]] correct support for jQuery.removeData

* v0.2 (26.06.2009)
  * [[darwin][darwin]] effective way how to retrieve jQuery data
  * [[darwin][darwin]] mutation events
  * [[darwin][darwin]] integrated jQuerify
  * [[darwin][darwin]] works with jQuery loaded dynamically (late binding)

* v0.1 (07.01.2009)
  * [[darwin][darwin]] support for jQuery expressions
  * [[darwin][darwin]] support for jQuery data
  * [[darwin][darwin]] highlighter for jQuery collections 

[darwin]: http://github.com/darwin
[download]: https://addons.mozilla.org/en-US/firefox/addon/12632
[firebug]: https://addons.mozilla.org/en-US/firefox/addon/1843
[testsource]: http://github.com/darwin/firequery/tree/master/test/index.html