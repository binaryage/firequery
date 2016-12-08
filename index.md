---
layout: product-home
title: FireQuery is a Firebug extension for jQuery development
product: firequery
product_title: FireQuery
product_subtitle: a Firebug extension for jQuery development
product_icon: /shared/img/icons/firequery-256.png
download: https://addons.mozilla.org/firefox/addon/firequery
downloadtitle: Install via Mozilla Addons
buttons: <a href="/test" class="button product-button-thumbup"><div><div><div class="trial-note">after install</div>Visit Test Page<div class="product-specs">to check that your installation works correctly</div></div></div></a>
repo: http://github.com/binaryage/firequery
advert: After installation and Firefox restart you can visit the <a href="/test/index.html">FireQuery test page</a>
meta_title: FireQuery is a Firebug extension for jQuery development
meta_keywords: jquery,firebug,firefox,addon,firequery,lint,javascript,binaryage,productivity,software,web,development,antonin hildebrand
meta_description: jQuery expressions are intelligently presented in Firebug Console and DOM inspector
meta_image: /shared/img/icons/firequery-256.png
build_tabs: 1
ogmeta: {
    site_name: "BinaryAge website",
    description: "FireQuery is a Firebug extension for jQuery development",
    email: "support@binaryage.com",
    type: "product",
    title: "FireQuery",
    url: "http://firequery.binaryage.com",
    image: "http://www.binaryage.com/shared/img/icons/firequery-256.png"
}
---

{% contentfor product-buttons %}
<div class="product-buttons">
  <div class="button-container">
    <a href="{{page.download}}" id="o-download-button" class="button product-button-download">
      <span><i class="fa fa-download fa-lg"></i>{{page.downloadtitle}}</span>
    </a>
  </div>
</div>
{% endcontentfor %}

## Features

<a href="/shared/img/firequery-mainshot-full.png"><img src="/shared/img/firequery-mainshot-full.png"></a>

### FireQuery is a Firefox extension integrated with Firebug

* jQuery expressions are intelligently presented in Firebug Console and DOM inspector
* attached jQuery data are first class citizens
* elements in jQuery collections are highlighted on hover
* jQuerify: enables you to inject jQuery into any web page
* [jQuery Lint](http://github.com/jamespadolsey/jQuery-Lint): enables you to automatically inject jQuery Lint into the page as it is loaded (great for ad-hoc code validation)

### Compatibility

Both Firefox and Firebug are moving targets. Please make sure you use compatible versions. I'm unable to test all possible combinations.
<ul style="margin-bottom: 0px !important">
    <li><b>v1.3</b> works with official Firebug 1.3.3, 1.4.5, 1.5.4, 1.6, 1.7, 1.8, 1.9, 1.10.3 (Firefox 3.0 - 18.0)</li>
</ul>
<a style="margin-top: 0px !important" href="javascript:$('.older-compatibility').toggle(); $(this).hide()">show compatibility of older versions &darr;</a>
<ul class="older-compatibility" style="display:none">
<li><b>v1.2</b> works with official Firebug 1.3.3, 1.4.5, 1.5.4, 1.6, 1.7, 1.8, 1.9 (Firefox 3.0 - 13.0)</li>
<li><b>v1.1</b> works with official Firebug 1.3.3, 1.4.5, 1.5.4, 1.6, 1.7, 1.8, 1.9 (Firefox 3.0 - 11.0)</li>
<li><b>v1.0</b> works with official Firebug 1.3.3, 1.4.5, 1.5.4, 1.6, 1.7 also worked for me with a beta of Firebug 1.8 (Firefox 3.0 - 5.0)</li>
<li><b>v0.9</b> works with official Firebug 1.3.3, 1.4.5, 1.5.4 and 1.6, also worked for me with early beta of Firebug 1.7 (Firefox 3.0 - 4.0)</li>
<li><b>v0.8</b> works with official Firebug 1.3.3, 1.4.5, 1.5.4 and 1.6, also worked for me with early beta of Firebug 1.7 (Firefox 3.0 - 3.7)</li>
<li><b>v0.7</b> works with official Firebug 1.3.3, 1.4.5 and 1.5 (Firefox 3.0 - 3.6)</li>
<li><b>v0.6</b> works with official Firebug 1.3.3, 1.4.5 and 1.5 (Firefox 3.0 - 3.6)</li>
<li><b>v0.5</b> works with official Firebug 1.3.3, 1.4.5 and 1.5 (Firefox 3.0 - 3.6)</li>
<li><b>v0.4.1</b> works with official Firebug 1.3.3, 1.4.5 and betas of Firebug 1.5 (Firefox 3.0 - 3.6)</li>
<li><b>v0.4</b> works with beta Firebug 1.5 (Firefox 3.5 - 3.6) - BROKEN with Firebug 1.4!</li>
<li><b>v0.3</b> works with official Firebug 1.3 and official Firebug 1.4 (Firefox 2.0 - 3.5)</li>
<li><b>v0.2</b> works with beta Firebug 1.4 (Firefox 3.0.x or Firefox 3.5)</li>
</ul>

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

    git clone git://github.com/binaryage/firequery.git
    cd firequery
    rake

After that your XPI should be available in ``build/firequery-X.Y.xpi``.

You should now be able to install the XPI file in Firefox: ``File -> Open File`` ... and browse for ``firequery-X.Y.xpi``.

### Security Note

**<span style="color: #a00">This extension may be insecure!</span>**

So please don't browse porn sites with this enabled. I still don't fully understand the Firefox extension security model. The reality is that I interact with naked HTML page from privileged code which may be insecure.

A good solution is to have dedicated [Firefox profile](http://support.mozilla.com/en-US/kb/Profiles) for development and use it only for safe sites.

## FAQ

#### How can I specify my own jQuery when pressing jQuerify button?
> You can specify your own URL in `about:config` for the key `extensions.firebug.firequery.jQueryURL`.<br>For example you can use Google's jQuery urls [http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery](http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery)

#### How can I show internal jQuery data (e.g. 'events')?
> Since jQuery 1.7.1 data() function does not return internal jQuery data structures.  You may switch FireQuery into original behavior using this option:

<a target="_blank" href="/img/firequery-internal-data.png"><img src="/img/firequery-internal-data.png" width="600"></a>

#### How can I use jQuery Lint with FireQuery?
<a target="_blank" href="/img/firequery-with-lint.png"><img src="/img/firequery-with-lint.png" width="600"></a>

#### How can I specify my own jQuery Lint version?
> You can specify your own URL in `about:config` for the key `extensions.firebug.firequery.jQueryLintURL`.

#### When I update values via $.data() I don't see changes in HTML panel. What's wrong?
> You have to enable Console panel for this feature to work

## Changelog

<div class="changelogx"></div>

<script type="text/javascript" charset="utf-8">
    $(function() {
        $('.changelogx').load('changelog.html?x='+((Math.random()+"").substring(2))+' #page');
    });
</script>

[darwin]: http://github.com/darwin
[sroussey]: http://github.com/sroussey
[download]: https://addons.mozilla.org/en-US/firefox/addon/12632
[firebug]: https://addons.mozilla.org/en-US/firefox/addon/1843
[testsource]: http://github.com/binaryage/firequery/tree/gh-pages/test/index.html
[testpage]: /test/index.html
