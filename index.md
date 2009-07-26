---
title: FireQuery
subtitle: a collection of Firebug enhancements for jQuery
layout: product
logo: /shared/img/firequery-logo.png
icon: /shared/img/firequery-icon.png
repo: http://github.com/darwin/firequery
support: http://github.com/darwin/firequery/issues
downloadtitle: Install v0.3
download: https://addons.mozilla.org/en-US/firefox/addon/12632
downloadboxwidth: 210px
donate: https://addons.mozilla.org/en-US/firefox/addons/contribute/12632?source=addon-detail
subdownload: 
subdownloadlink:
mainshot: /shared/img/firequery-mainshot.png
mainshotfull: /shared/img/firequery-mainshot-full.png
---
## Features

### FireQuery is a Firefox addon integrated with Firebug

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

<div class="advertisement">
	<div class="plug">Recommended reading:</div>
	<a href="http://www.amazon.com/gp/product/1933988355?ie=UTF8&tag=firequery-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1933988355">
		<img border="0" src="/shared/img/amazon/51REisyoeoL._SL110_.jpg">
	</a>
	<img src="http://www.assoc-amazon.com/e/ir?t=firequery-20&l=as2&o=1&a=1933988355" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
	<a href="http://www.amazon.com/gp/product/1847196705?ie=UTF8&tag=firequery-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1847196705"><img border="0" src="/shared/img/amazon/516jRKk0ykL._SL110_.jpg"></a><img src="http://www.assoc-amazon.com/e/ir?t=firequery-20&l=as2&o=1&a=1847196705" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
	<a href="http://www.amazon.com/gp/product/0596101996?ie=UTF8&tag=firequery-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596101996"><img border="0" src="/shared/img/amazon/41IVmVYhRNL._SL110_.jpg"></a><img src="http://www.assoc-amazon.com/e/ir?t=firequery-20&l=as2&o=1&a=0596101996" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
	
	<div class="offer"><a href="mailto:antonin@binaryage.com">advertise here</a></div>
</div>
<script type="text/javascript" src="http://www.assoc-amazon.com/s/link-enhancer?tag=firequery-20&o=1">
</script>
