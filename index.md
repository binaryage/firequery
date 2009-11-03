---
title: FireQuery = Firebug extension for jQuery development
product_title: FireQuery
subtitle: Firebug extension for jQuery development
layout: product
logo: /shared/img/firequery-logo.png
icon: /shared/img/firequery-icon.png
repo: http://github.com/darwin/firequery
support: http://github.com/darwin/firequery/issues
downloadtitle: Install v0.3
download: https://addons.mozilla.org/en-US/firefox/addon/12632
subdownload: 
subdownloadlink:
mainshot: /shared/img/firequery-mainshot.png
mainshotfull: /shared/img/firequery-mainshot-full.png
overlaysx: 880px
overlaysy: 608px
overlaycx: 25px
overlaycy: 10px
digg: 1
facebook: 1
retweet: 1
---

## Features

### FireQuery is a Firefox extension integrated with Firebug

* jQuery expressions are intelligently presented in Firebug Console and DOM inspector
* attached jQuery datas are first class citizens
* elements in jQuery collections are highlighted on hover
* jQuerify: enables you to inject jQuery into any web page


### Compatibility

* v0.3 works with official Firebug 1.3 and official Firebug 1.4 (Firefox 2.0 - 3.5)
* v0.2 works with beta Firebug 1.4 (Firefox 3.0.x or Firefox 3.5)

## Installation

The best way is to **[install the addon][download]** from [addons.mozilla.org](http://addons.mozilla.org) or you can go wild and build this on your own.

### Security

<span style="color: #a00">This extension may be insecure!</span>

So please don't browse porn sites with this enabled. I still don't fully understand Firefox extension security model. The reality is that I'm interacting with naked HTML page from privileged code which may be insecure. 

Good solution is to have dedicated [Firefox profile](http://support.mozilla.com/en-US/kb/Profiles) for development and use it only for safe sites.


### Build instructions

If you want to install latest addon from sources, you need to build it. 
It should be simple, but make sure you have these tools on your paths:

* git
* zip
* ruby and rake

Build steps:

    git clone git://github.com/darwin/firequery.git
    cd firequery
    rake
  
After that your XPI should be available in ``build/firequery-X.Y.xpi``.

You should be able to install XPI file into Firefox: ``File -> Open File`` ... and browse for ``firequery-X.Y.xpi``.

## History

* **v0.3** (27.06.2009)
  * [[darwin][darwin]] Firebug 1.3 compatibility
  * [[darwin][darwin]] correct support for jQuery.removeData

* **v0.2** (26.06.2009)
  * [[darwin][darwin]] effective way how to retrieve jQuery data
  * [[darwin][darwin]] mutation events
  * [[darwin][darwin]] integrated jQuerify
  * [[darwin][darwin]] works with jQuery loaded dynamically (late binding)

* **v0.1** (07.01.2009)
  * [[darwin][darwin]] support for jQuery expressions
  * [[darwin][darwin]] support for jQuery data
  * [[darwin][darwin]] highlighter for jQuery collections 

[darwin]: http://github.com/darwin
[download]: https://addons.mozilla.org/en-US/firefox/addon/12632
[firebug]: https://addons.mozilla.org/en-US/firefox/addon/1843
[testsource]: http://github.com/darwin/firequery/tree/master/test/index.html