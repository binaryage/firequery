---
title: FireQuery = Firebug extension for jQuery development
product_title: FireQuery
subtitle: Firebug extension for jQuery development
layout: product
logo: /shared/img/firequery-logo.png
icon: /shared/img/firequery-icon.png
repo: http://github.com/darwin/firequery
support: http://github.com/darwin/firequery/issues
downloadtitle: Install v0.4.1
download: https://addons.mozilla.org/en-US/firefox/addon/12632
subdownload: 
subdownloadlink:
mainshot: /shared/img/firequery-mainshot.png
mainshotfull: /shared/img/firequery-mainshot-full.png
overlaysx: 880px
overlaysy: 608px
overlaycx: 25px
overlaycy: 10px
facebook: 1
retweet: 1
---

<div class="more-box more-box-align">
    <div class="tf-ad-2">Hint: after installation and Firefox restart</div>
    <div class="tf-ad-2">you may visit <a href="/test/index.html">FireQuery test page</a></div>
</div>

## Features

### FireQuery is a Firefox extension integrated with Firebug

* jQuery expressions are intelligently presented in Firebug Console and DOM inspector
* attached jQuery datas are first class citizens
* elements in jQuery collections are highlighted on hover
* jQuerify: enables you to inject jQuery into any web page

### Compatibility

* **v0.4.1** works with official Firebug 1.3.3, 1.4.5 and betas of Firebug 1.5 (Firefox 3.0 - 3.6)
* **v0.4** works with beta Firebug 1.5 (Firefox 3.5 - 3.6) - BROKEN with Firebug 1.4!
* **v0.3** works with official Firebug 1.3 and official Firebug 1.4 (Firefox 2.0 - 3.5)
* **v0.2** works with beta Firebug 1.4 (Firefox 3.0.x or Firefox 3.5)

## Installation

The best way is to **[install the addon][download]** from [addons.mozilla.org](http://addons.mozilla.org) or you can go wild and build this on your own.

After you restart Firefox, you can visit [FireQuery test page][testpage] to make sure all is working correctly.

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

## FAQ

#### How can I specify my own jQuery when pressing jQuerify button?
> You can specify your own URL in `about:config` for the key `extensions.firebug.firequery.jQueryURL`.<br>For example you can use Google's jQuery urls [http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery](http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery)

#### When I update values via $.data() I don't see changes in HTML panel. What is wrong?
> You have to enable Console panel for this feature to work

## History

* **v0.4.1** (24.12.2009)
  * [[darwin][darwin]] Fixed broken compatibility with Firebug 1.4

* **v0.4** (13.12.2009)
  * [[sroussey][sroussey]] Firebug 1.5 compatibility
  * [[darwin][darwin]] Firefox 3.6 compatibility
  * [[darwin][darwin]] SeaMonkey 2.0 support
  * [[darwin][darwin]] It is possible to specify your own jQuery URL (see [FAQ](#faq))

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
[sroussey]: http://github.com/sroussey
[download]: https://addons.mozilla.org/en-US/firefox/addon/12632
[firebug]: https://addons.mozilla.org/en-US/firefox/addon/1843
[testsource]: http://github.com/darwin/firequery/tree/gh-pages/test/index.html
[testpage]: /test/index.html