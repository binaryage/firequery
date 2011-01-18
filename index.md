---
layout: product
title: FireQuery is a Firebug extension for jQuery development
product_title: FireQuery
product_subtitle: a Firebug extension for jQuery development
download: https://addons.mozilla.org/en-US/firefox/addon/12632
downloadtitle: Install 0.8
#note: Not seeing the latest version 0.8 on AMO?<br>It is probably waiting for review, check <a href="https://addons.mozilla.org/en-US/firefox/addons/versions/12632">experimental versions</a>.
buttons: <a href="/test" class="button button-300 product-button-thumbup"><div><div><div class="trial-note">after restart</div>Visit Test Page<div class="product-specs">to check that your installation works correctly</div></div></div></a>
repo: http://github.com/darwin/firequery
advert: After installation and Firefox restart you can visit the <a href="/test/index.html">FireQuery test page</a>
meta_title: FireQuery is a Firebug extension for jQuery development
meta_keywords: jquery,firebug,firefox,addon,firequery,lint,javascript,binaryage,productivity,software,web,development,antonin hildebrand
meta_description: jQuery expressions are intelligently presented in Firebug Console and DOM inspector
meta_image: http://www.binaryage.com/shared/img/icons/firequery-256.png
facebook: 1
retweet: 1
buzz: 1
fbsdk: 1
flattr: "http://firequery.binaryage.com"
ogmeta: {
    site_name: "BinaryAge website",
    description: "FireQuery is a Firebug extension for jQuery development",
    email: "support@binaryage.com",
    type: "product",
    title: "FireQuery",
    url: "http://firequery.binaryage.com",
    image: "http://www.binaryage.com/shared/img/icons/firequery-256.png"
}
shots: [{
    title: "FireQuery in action! Please note inlined datas in the HTML Panel",
    thumb: "/shared/img/firequery-mainshot.png",
    full: "/shared/img/firequery-mainshot-full.png"
}]
---

## Features

### FireQuery is a Firefox extension integrated with Firebug

* jQuery expressions are intelligently presented in Firebug Console and DOM inspector
* attached jQuery data are first class citizens
* elements in jQuery collections are highlighted on hover
* jQuerify: enables you to inject jQuery into any web page
* [jQuery Lint](http://github.com/jamespadolsey/jQuery-Lint): enables you to automatically inject jQuery Lint into the page as it is loaded (great for ad-hoc code validation)

### Compatibility

Both Firefox and Firebug are moving targets. Please make sure you use compatible versions. I'm unable to test all possible combinations.

* **v0.8** works with official Firebug 1.3.3, 1.4.5, 1.5.4 and 1.6, also worked for me with early beta of Firebug 1.7 (Firefox 3.0 - 3.7)
* **v0.7** works with official Firebug 1.3.3, 1.4.5 and 1.5 (Firefox 3.0 - 3.6)
* **v0.6** works with official Firebug 1.3.3, 1.4.5 and 1.5 (Firefox 3.0 - 3.6)
* **v0.5** works with official Firebug 1.3.3, 1.4.5 and 1.5 (Firefox 3.0 - 3.6)
* **v0.4.1** works with official Firebug 1.3.3, 1.4.5 and betas of Firebug 1.5 (Firefox 3.0 - 3.6)
* **v0.4** works with beta Firebug 1.5 (Firefox 3.5 - 3.6) - BROKEN with Firebug 1.4!
* **v0.3** works with official Firebug 1.3 and official Firebug 1.4 (Firefox 2.0 - 3.5)
* **v0.2** works with beta Firebug 1.4 (Firefox 3.0.x or Firefox 3.5)

## Screencast

### Intro ScreenCast by [**the Changelog**](http://thechangelog.com/post/383855879/firequery-jquery-love-for-firebug), which brings fresh news about open-source.

<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,115,0' width='100%' height="600"><param name='movie' value='http://screenr.com/Content/assets/screenr_1116090935.swf' ></param><param name='flashvars' value='i=46448' ></param><param name='allowFullScreen' value='true' ></param><embed src='http://screenr.com/Content/assets/screenr_1116090935.swf' flashvars='i=46448' allowFullScreen='true' width='100%' height="600" pluginspage='http://www.macromedia.com/go/getflashplayer'></embed></object>
<div style="position:relative; top: -2px; float:right; font-size:11px;font-weight:bold;">the screencast was produced by <a href="http://wynnnetherland.com/">Wynn Netherland</a>, thanks!</div>
<br style="clear:both">

## Installation

### **[Install the addon][download]** from addons.mozilla.org.

After you restart Firefox, you should visit [FireQuery Test Page][testpage] to make sure all is working correctly.

---

### How to build FireQuery from source

If you want to install the addon from the latest source, you need to build it. It should be simple, but make sure you have these tools in your path:

* git
* zip
* ruby and rake

#### Build steps:

    git clone git://github.com/darwin/firequery.git
    cd firequery
    rake
  
After that your XPI should be available in ``build/firequery-X.Y.xpi``.

You should now be able to install the XPI file in Firefox: ``File -> Open File`` ... and browse for ``firequery-X.Y.xpi``.

### Security Note

**<span style="color: #a00">This extension may be insecure!</span>**

So please don't browse porn sites with this enabled. I still don't fully understand the Firefox extension security model. The reality is that I'm interacting with naked HTML page from privileged code which may be insecure. 

A good solution is to have dedicated [Firefox profile](http://support.mozilla.com/en-US/kb/Profiles) for development and use it only for safe sites.

## FAQ

#### How can I specify my own jQuery when pressing jQuerify button?
> You can specify your own URL in `about:config` for the key `extensions.firebug.firequery.jQueryURL`.<br>For example you can use Google's jQuery urls [http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery](http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery)

#### How can I use jQuery Lint with FireQuery?
<a target="_blank" href="/img/firequery-with-lint.png"><img src="/img/firequery-with-lint.png" width="600"></a>

#### How can I specify my own jQuery Lint version?
> You can specify your own URL in `about:config` for the key `extensions.firebug.firequery.jQueryLintURL`.

#### When I update values via $.data() I don't see changes in HTML panel. What's wrong?
> You have to enable Console panel for this feature to work

## Changelog

* **v0.8** (30.10.2010)
  * [[darwin][darwin]] fixed compatibility with Firebug 1.6 and early Firebug 1.7 alpha
  * [[darwin][darwin]] upgraded jQuerify to inject jQuery v1.4.3
  * [[darwin][darwin]] upgraded jQuery Lint to v1.01

* **v0.7** (28.02.2010)
  * [[darwin][darwin]] added jQuery Lint support, see: <a href="http://github.com/jamespadolsey/jQuery-Lint">http://github.com/jamespadolsey/jQuery-Lint</a>
  * [[darwin][darwin]] fixed Firebug version check bug
  * [[darwin][darwin]] fixed incorrect object representation in console (<a href="http://github.com/darwin/firequery/issues/closed#issue/10">issue #10</a>)

* **v0.6** (20.02.2010)
  * [[darwin][darwin]] fix retrieval of jQuery.data with jQuery 1.4+ (missing data in HTML panel and missing small envelope icons)
  * [[darwin][darwin]] extended test page to enable testing historical jQuery versions
  * [[darwin][darwin]] jQuerify script upgraded to jQuery 1.4.2

* **v0.5** (20.01.2010)
  * [[darwin][darwin]] jQuerify script upgraded to jQuery 1.4
  * [[sroussey][sroussey]] Firebug 1.5 compatibility (thanks to Steven Roussey)
  * [[darwin][darwin]] fixed mysterious bug with jQueryUI and its datepicker (<a href="http://getsatisfaction.com/binaryage/topics/breaks_the_jquery_ui_datepicker">more info</a>)

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