// This source contains copy&pasted various bits from Firebug sources.
FBL.ns(function() {
    with(FBL) {
        
        if (!Firebug.CommandLine.evaluateInWebPage) {
            // backport from FB1.4
            Firebug.CommandLine.evaluateInWebPage = function(expr, context, targetWindow) {
                var win = targetWindow ? targetWindow : context.window;
                var doc = (win.wrappedJSObject ? win.wrappedJSObject.document : win.document);
                var element = addScript(doc, "_firebugInWebPage", expr);
                element.parentNode.removeChild(element);  // we don't need the script element, result is in DOM object
                return "true";
            };
        }

        const Cc = Components.classes;
        const Ci = Components.interfaces;

        const nsIPrefBranch = Ci.nsIPrefBranch;
        const nsIPrefBranch2 = Ci.nsIPrefBranch2;
        const nsIWindowMediator = Ci.nsIWindowMediator;

        const highlightCSS = "chrome://firebug/content/highlighter.css";

        const firequeryPrefService = Cc["@mozilla.org/preferences-service;1"];
        const firequeryPrefs = firequeryPrefService.getService(nsIPrefBranch2);

        const MODIFICATION = MutationEvent.MODIFICATION;
        const ADDITION = MutationEvent.ADDITION;
        const REMOVAL = MutationEvent.REMOVAL;

        // jQuerify by Karl Swedberg, taken from http://www.learningjquery.com/2009/04/better-stronger-safer-jquerify-bookmarklet and slightly modified styles
        const jQuerifyCode = "\
        (function() {\
            var el = document.createElement('div');\
            var b = document.getElementsByTagName('body')[0];\
            var otherlib = false;\
            var msg = '';\
            el.style.fontFamily = 'Arial, Verdana';\
            el.style.position = 'fixed';\
            el.style.padding = '5px 10px 5px 10px';\
            el.style.margin = '0';\
            el.style.zIndex = 1001;\
            el.style.lineHeight = '46px';\
            el.style.fontSize = '40px';\
            el.style.fontWeight = 'bold';\
            el.style.color = '#444';\
            el.style.backgroundColor = '#FFFB00';\
            el.style.MozBorderRadius = '8px';\
            el.style.opacity = '0.8';\
            el.style.textAlign = 'center';\
            if (typeof jQuery != 'undefined') {\
                msg = 'This page already using jQuery v' + jQuery.fn.jquery;\
                if (typeof $jq == 'function') {\
                    msg += ' and noConflict().<br/>Use $jq(), not $().';\
                }\
                return showMsg();\
            } else if (typeof $ == 'function') {\
                otherlib = true;\
            }\
            function getScript(url, success) {\
                var script = document.createElement('script');\
                script.src = url;\
                var head = document.getElementsByTagName('head')[0],\
                done = false;\
                script.onload = script.onreadystatechange = function() {\
                    if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {\
                        done = true;\
                        success();\
                    }\
                };\
                head.appendChild(script);\
            }\
            getScript('chrome://firequery-resources/content/jquery.js', \
            function() {\
                if (typeof jQuery == 'undefined') {\
                    msg = 'Sorry, but jQuery wasn\\'t able to load';\
                } else {\
                    msg = 'This page is now jQuerified with v' + jQuery.fn.jquery;\
                    if (otherlib) {\
                        msg += ' and noConflict().<br/>Use $jq(), not $().';\
                    }\
                }\
                return showMsg();\
            });\
            function showMsg() {\
                el.innerHTML = msg;\
                b.appendChild(el);\
                el.style.left = Math.floor((window.innerWidth - el.clientWidth) / 2) + 'px';\
                el.style.top = Math.floor((window.innerHeight - el.clientHeight) / 2) + 'px';\
                window.setTimeout(function() {\
                    if (typeof jQuery == 'undefined') {\
                        b.removeChild(el);\
                    } else {\
                        b.removeChild(el);\
                        if (otherlib) {\
                            $jq = jQuery.noConflict();\
                        }\
                    }\
                },\
                2500);\
            }\
        })();\
        ";

        const jQueryWatcherCode = "\
        (function() {\
            var timerId = setInterval(function() {\
                if (window.jQuery) {\
                    clearInterval(timerId);\
                    var event = document.createEvent('Events');\
                    event.initEvent('jQueryDetected', true, false);\
                    document.dispatchEvent(event);\
                }\
            }, 1000/*watcherInterval*/);\
        })();\
        ";

        if (Firebug.TraceModule) {
            Firebug.TraceModule.DBG_FIREQUERY = false;
            var type = firequeryPrefs.getPrefType('extensions.firebug.DBG_FIREQUERY');
            if (type != nsIPrefBranch.PREF_BOOL) try {
                firequeryPrefs.setBoolPref('extensions.firebug.DBG_FIREQUERY', false);
            } catch(e) {}
        }
    
        function dbg() {
            if (FBTrace && FBTrace.DBG_FIREQUERY) { 
                FBTrace.sysout.apply(this, arguments);
            }
        }
        
        var OBJECTBOX = this.OBJECTBOX =
            SPAN({class: "objectBox objectBox-$className"});

        var OBJECTBLOCK = this.OBJECTBLOCK =
            DIV({class: "objectBox objectBox-$className"});

        var OBJECTLINK = this.OBJECTLINK =
            A({
                class: "objectLink objectLink-$className a11yFocus",
                _repObject: "$object"
            });

        const edgeSize = 1;

        var generateGuid = function() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return S4()+S4();
        };

        function getNonFrameBody(elt) {
            var body = getBody(elt.ownerDocument);
            return body.localName.toUpperCase() == "FRAMESET" ? null : body;
        }

        function attachStyles(context, body) {
            var doc = body.ownerDocument;
            if (!context.highlightStyle)
                context.highlightStyle = createStyleSheet(doc, highlightCSS);

            if (!context.highlightStyle.parentNode || context.highlightStyle.ownerDocument != doc)
                addStyleSheet(body.ownerDocument, context.highlightStyle);
        }
        
        function evalJQueryCache(object, context) {
            try {
                var win = object.ownerDocument.defaultView;
                var wrapper = win.wrappedJSObject;
                var jQuery = wrapper.jQuery;
                return jQuery.cache[jQuery.data(object.wrappedJSObject || object)];
            } catch (ex) {}
        }

        function hasJQueryCache(object, context) {
            var cache = evalJQueryCache(object, context);
            for (var x in cache) {
                if (cache.hasOwnProperty(x)) return true;
            }
        }

        function findNodeDataBox(objectNodeBox, attrName)
        {
            var child = objectNodeBox.firstChild.lastChild.firstChild;
            for (; child; child = child.nextSibling)
            {
                if (hasClass(child, "nodeData") && child.childNodes[0].firstChild && child.childNodes[0].firstChild.nodeValue == attrName)
                {
                    return child;
                }
            }
        }
        
        function dataDescriptor(name, data, tag) {
            var rep = {};
            rep[name] = data;
            return {
                name: name,
                data: data,
                tag: tag,
                rep: rep
            };
        }

        function mutateData(target, attrChange, attrName, attrValue)  {
            this.markChange();

            var createBox = Firebug.scrollToMutations || Firebug.expandMutations;
            var objectNodeBox = createBox ? this.ioBox.createObjectBox(target) : this.ioBox.findObjectBox(target);
            if (!objectNodeBox) return;

            if (isVisible(objectNodeBox.repObject))
                removeClass(objectNodeBox, "nodeHidden");
            else
                setClass(objectNodeBox, "nodeHidden");

            if (attrChange == MODIFICATION || attrChange == ADDITION) {
                var rep = Firebug.getRep(attrValue);
                var tag = rep.shortTag ? rep.shortTag : rep.tag;
                var valRep = Firebug.HTMLPanel.DataNode.tag.replace({
                    attr: dataDescriptor(attrName, attrValue, tag)
                }, this.document);

                var nodeAttr = findNodeDataBox(objectNodeBox, attrName);
                if (nodeAttr) {
                    nodeAttr.parentNode.replaceChild(valRep, nodeAttr);
                    this.highlightMutation(valRep, objectNodeBox, "mutated");
                } else {
                    var labelBox = objectNodeBox.firstChild.lastChild;
                    labelBox.insertBefore(valRep, null);
                    this.highlightMutation(valRep, objectNodeBox, "mutated");
                }
            } else if (attrChange == REMOVAL) {
                var nodeAttr = findNodeDataBox(objectNodeBox, attrName);
                if (nodeAttr) {
                    nodeAttr.parentNode.removeChild(nodeAttr);
                    this.highlightMutation(objectNodeBox, objectNodeBox, "mutated");
                }
            }
        }
    
        function patchJQuery(jQuery, context) {
            if (jQuery.wrappedJSObject) jQuery = jQuery.wrappedJSObject;
            if (jQuery._patchedByFireQuery) return;
            jQuery._patchedByFireQuery = true;
            var origDataFn = jQuery.data;
            jQuery.data = function(elem, name, data) {
                var res = origDataFn.call(jQuery, elem, name, data);
                try {
                    if (name && data!==undefined) {
                        mutateData.call(context.getPanel('html'), elem, MODIFICATION, name, data);
                    }
                } catch (ex) {
                    // html panel may not exist yet (also want to be safe, when our highlighter throws for any reason)
                }
                return res;
            };
            var origRemoveDataFn = jQuery.removeData;
            jQuery.removeData = function(elem, name) {
                var res = origRemoveDataFn.call(jQuery, elem, name);
                try {
                    if (name) {
                        mutateData.call(context.getPanel('html'), elem, REMOVAL, name);
                    }
                } catch (ex) {
                    // html panel may not exist yet (also want to be safe, when our highlighter throws for any reason)
                }
                return res;
            };
        }

        function installJQueryWatcher(win, context) {
            try {
                var code = jQueryWatcherCode.replace(/1000\/\*watcherInterval\*\//, Firebug.FireQuery.getPref('watcherInterval'));
                Firebug.CommandLine.evaluateInWebPage(code, context);
            } catch (ex) {
                dbg("   ! "+ex, context);
            }
        }
        
        function patchWindow(win, context) {
            try {
                var wrapper = win.wrappedJSObject;
                var jQuery = wrapper.jQuery;
                patchJQuery(jQuery, context);
                dbg(">>>FireQuery: successfully found and patched jQuery in the window ", win);
            } catch (ex) {
                dbg('>>>FireQuery: jQuery not found in the window, running watcher ...', win);
                win.document.wrappedJSObject.addEventListener('jQueryDetected', function() {
                    try {
                        var wrapper = win.wrappedJSObject;
                        var jQuery = wrapper.jQuery;
                        patchJQuery(jQuery, context);
                        dbg(">>>FireQuery: successfully notified and patched late jQuery in the window ", win);
                    } catch (ex) {
                        dbg(">>>FireQuery: fatal error patching late jQuery in the window ", win);
                    }
                }, true);
                installJQueryWatcher(win, context);
            }
        }
        
        ////////////////////////////////////////////////////////////////////////
        // Firebug.FireQuery
        //
        Firebug.FireQuery = extend(Firebug.ActivableModule, {
            version: '0.3',
            /////////////////////////////////////////////////////////////////////////////////////////
            start: function() {
                dbg(">>>FireQuery.start");
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            stop: function() {
                dbg(">>>FireQuery.stop");
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            initialize: function() {
                dbg(">>>FireQuery.initialize");
                this.panelName = 'FireQuery';
                this.description = "jQuery related enhancements for Firebug.";
                Firebug.Module.initialize.apply(this, arguments);
                this.start();
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            shutdown: function() {
                dbg(">>>FireQuery.shutdown");
                this.stop();
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            initializeUI: function() {
                dbg(">>>FireQuery.initializeUI");
                Firebug.Module.initializeUI.apply(this, arguments);
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            onSuspendFirebug: function(context) {
                dbg(">>>FireQuery.onSuspendFirebug");
                this.stop();
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            onResumeFirebug: function(context) {
                dbg(">>>FireQuery.onResumeFirebug");
                this.start();
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            showPanel: function(browser, panel) {
                dbg(">>>FireQuery.showPanel "+panel.name, panel);
                var isConsole = panel.name == "console";
                var isHTML = panel.name == "html";
                if (isConsole || isHTML) {
                    this.applyPanelCSS("chrome://firequery/skin/firequery.css", panel);
                }
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            loadedContext: function(context) {
                dbg(">>>FireQuery.loadedContext ", context);
                patchWindow(context.browser.contentWindow, context);
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            buttonJQuerify: function(context) {
                dbg(">>>FireQuery.buttonJQuerify ", context);
                try {
                    Firebug.CommandLine.evaluateInWebPage(jQuerifyCode, context);
                } catch (ex) {
                    dbg("   ! "+ex, context);
                }
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            getPref: function(name) {
                var prefName = this.getPrefDomain() + "." + name;
                var type = firequeryPrefs.getPrefType(prefName);
                if (type == nsIPrefBranch.PREF_STRING)
                return xrefreshPrefs.getCharPref(prefName);
                else if (type == nsIPrefBranch.PREF_INT)
                return xrefreshPrefs.getIntPref(prefName);
                else if (type == nsIPrefBranch.PREF_BOOL)
                return xrefreshPrefs.getBoolPref(prefName);
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            setPref: function(name, value) {
                var prefName = this.getPrefDomain() + "." + name;
                var type = firequeryPrefs.getPrefType(prefName);
                if (type == nsIPrefBranch.PREF_STRING)
                xrefreshPrefs.setCharPref(prefName, value);
                else if (type == nsIPrefBranch.PREF_INT)
                xrefreshPrefs.setIntPref(prefName, value);
                else if (type == nsIPrefBranch.PREF_BOOL)
                xrefreshPrefs.setBoolPref(prefName, value);
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            applyPanelCSS: function(url, panel) {
                dbg(">>>FireQuery.applyPanelCSS "+url, panel);
                var links = FBL.getElementsBySelector(panel.document, "link");
                for (var i=0; i < links.length; i++) {
                    var link = links[i];
                    if (link.getAttribute('href')==url) return; // already applied
                }
                var styleElement = panel.document.createElement("link");
                styleElement.setAttribute("type", "text/css");
                styleElement.setAttribute("href", url);
                styleElement.setAttribute("rel", "stylesheet");
                var head = this.getHeadElement(panel.document);
                if (head) head.appendChild(styleElement);
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            getHeadElement: function(doc) {
                var heads = doc.getElementsByTagName("head");
                if (heads.length == 0) return doc.documentElement;
                return heads[0];
            }
        });
    
        ////////////////////////////////////////////////////////////////////////
        // Firebug.FireQuery.JQueryHighlighter
        //
        Firebug.FireQuery.JQueryHighlighter = function() {
            this.seed = "highlighter-"+generateGuid();
        };

        Firebug.FireQuery.JQueryHighlighter.prototype = {
            /////////////////////////////////////////////////////////////////////////////////////////
            highlight: function(context, element) {
                if (!element) return;
                if (element instanceof XULElement) return;
                try {
                    // Firebug 1.3 path
                    var dims = getViewOffset(element, true);
                    var x = dims.x, y = dims.y;
                    var w = element.offsetWidth, h = element.offsetHeight;                
                } catch (ex) {
                    try {
                        // Firebug 1.4+ path
                        var dims = getRectTRBLWH(element, context);
                        var x = dims.left, y = dims.top;
                        var w = dims.width, h = dims.height;
                    } catch (ex) {
                        dbg(' getRectTRBLWH failed: '+ex, element);
                        return;
                    }
                }

                var wacked = isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h);
                if (wacked) return;

                var nodes = this.getNodes(context, element);

                move(nodes.top, x, y-edgeSize);
                resize(nodes.top, w, edgeSize);

                move(nodes.right, x+w, y-edgeSize);
                resize(nodes.right, edgeSize, h+edgeSize*2);

                move(nodes.bottom, x, y+h);
                resize(nodes.bottom, w, edgeSize);

                move(nodes.left, x-edgeSize, y-edgeSize);
                resize(nodes.left, edgeSize, h+edgeSize*2);
                
                move(nodes.content, x, y);
                resize(nodes.content, w, h);
                
                var body = getNonFrameBody(element);
                if (!body)
                    return this.unhighlight(context);

                var needsAppend = !nodes.top.parentNode || nodes.top.ownerDocument != body.ownerDocument;
                if (needsAppend) {
                    attachStyles(context, body);
                    for (var edge in nodes) {
                        try {
                            body.appendChild(nodes[edge]);
                        }
                        catch(exc) {
                        }
                    }
                }
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            unhighlight: function(context) {
                var nodes = this.getNodes(context);
                var body = nodes.top.parentNode;
                if (body) {
                    for (var edge in nodes)
                        body.removeChild(nodes[edge]);
                }
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            getNodes: function(context) {
                if (!context[this.seed]) {
                    var doc = context.window.document;
                    function createEdge(name) {
                        var div = doc.createElementNS("http://www.w3.org/1999/xhtml", "div");
                        div.firebugIgnore = true;
                        div.className = "firebugHighlight";
                        return div;
                    }
                    function createBox(name) {
                        var div = doc.createElementNS("http://www.w3.org/1999/xhtml", "div");
                        div.firebugIgnore = true;
                        div.className = "firebugHighlight";
                        div.style.backgroundColor = "SkyBlue";
                        div.style.opacity="0.4";
                        return div;
                    }
                    context[this.seed] = {
                        content: createBox("Content"),
                        top: createEdge("Top"),
                        right: createEdge("Right"),
                        bottom: createEdge("Bottom"),
                        left: createEdge("Left")
                    };
                }
                return context[this.seed];
            }
        };

        ////////////////////////////////////////////////////////////////////////
        // monkey-patching of Firebug.Inspector.highlightObject
        //
        Firebug.Inspector.originalHighlightObject = Firebug.Inspector.highlightObject;
        Firebug.Inspector.highlightObject = function(element, context, highlightType, boxFrame) {
            if (!this.jQueryHighlighters) this.jQueryHighlighters = [];
            for (var i=0; i<this.jQueryHighlighters.length; i++) {
                var highlighter = this.jQueryHighlighters[i];
                highlighter.unhighlight(this.jQueryHighlighterContext);
            }
            this.jQueryHighlighters = [];
            
            if (!element || !element.length) {
                return Firebug.Inspector.originalHighlightObject.call(this, element, context, highlightType, boxFrame);
            } else {
                Firebug.Inspector.originalHighlightObject.call(this, null, context, highlightType, boxFrame);
            }

            if (context && context.window && context.window.document) {
                this.jQueryHighlighterContext = context;
                for (var i=0; i<element.length; i++) {
                    var highlighter = new Firebug.FireQuery.JQueryHighlighter();
                    highlighter.highlight(context, element[i]);
                    this.jQueryHighlighters.push(highlighter);
                }
            }
        };

        ////////////////////////////////////////////////////////////////////////
        // Firebug.FireQuery.JQueryExpression
        //
        Firebug.FireQuery.JQueryExpression = domplate(Firebug.Rep, {
            /////////////////////////////////////////////////////////////////////////////////////////
            tag:
                OBJECTBOX({},
                    A({
                        class: "objectLink objectLink-jquery-sign",
                        _repObject: "$object"
                    }, "jQuery"),
                    SPAN({class: "arrayLeftBracket"}, "("),
                    FOR("item", "$object|arrayIterator",
                        TAG("$item.tag", {object: "$item.object"}),
                        SPAN({class: "arrayComma"}, "$item.delim")
                    ),
                    SPAN({class: "arrayRightBracket"}, ")")
                ),
            /////////////////////////////////////////////////////////////////////////////////////////
            arrayIterator: function(array) {
                var items = [];
                for (var i = 0; i < array.length; ++i) {
                    var value = array[i];
                    var rep = Firebug.getRep(value);
                    var tag = rep.shortTag ? rep.shortTag : rep.tag;
                    var delim = (i == array.length-1 ? "" : ", ");

                    items.push({object: value, tag: tag, delim: delim});
                }
                return items;
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            className: "jquery-expression",
            /////////////////////////////////////////////////////////////////////////////////////////
            supportsObject: function(object) {
                if (!object) return;
                return !!object.jquery;
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            getRealObject: function(event, context) {
                return null;
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            getContextMenuItems: function(event) {
                return null;
            }
        });
    
        ////////////////////////////////////////////////////////////////////////
        // Firebug.FireQuery.JQueryElement
        //
        Firebug.FireQuery.JQueryElement = domplate(FirebugReps.Element, {
            /////////////////////////////////////////////////////////////////////////////////////////
            tag:
                OBJECTLINK(
                    "&lt;",
                    SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                    FOR("attr", "$object|attrIterator",
                        "&nbsp;$attr.localName=&quot;", SPAN({class: "nodeValue"}, "$attr.nodeValue"), "&quot;"
                    ),
                    "&gt;"
                 ),
            /////////////////////////////////////////////////////////////////////////////////////////
            shortTag:
                SPAN(
                    OBJECTLINK(
                        SPAN({class: "$object|getVisible"},
                            SPAN({class: "selectorTag"}, "$object|getSelectorTag"),
                            SPAN({class: "selectorId"}, "$object|getSelectorId"),
                            SPAN({class: "selectorClass"}, "$object|getSelectorClass"),
                            SPAN({class: "selectorValue"}, "$object|getValue")
                        )
                     ),
                     A({class: "objectLink objectLink-jquery-data", onclick: "$onDataClick", _objData: "$object" }, "&#9993;") // envelope sign
                ),
            ///////////////////////////////////////////////////////////////////////////////////////////
            onDataClick: function(event) {
                var object = event.currentTarget.objData;
                var cache = evalJQueryCache(object);
                if (!cache) return;
                var rep = Firebug.getRep(cache);
                rep.inspectObject(cache, FirebugContext);
            },
            ///////////////////////////////////////////////////////////////////////////////////////////
            dataIterator: function(object) {
                if (!object) return [];
                var cache = evalJQueryCache(object);
                if (!cache) return [];
                var res = [];
                for (var data in cache) {
                    if (cache.hasOwnProperty(data)) {
                        var rep = Firebug.getRep(cache[data]);
                        var tag = rep.shortTag ? rep.shortTag : rep.tag;
                        res.push(dataDescriptor(data, cache[data], tag));
                    }
                }
                return res;
            },
            ///////////////////////////////////////////////////////////////////////////////////////////
            supportsObject: function(object, type) {
                if (!FirebugReps.Element.supportsObject.call(this, object, type)) return false;
                return hasJQueryCache(object);
            }
        });
        
        ////////////////////////////////////////////////////////////////////////
        // patch Firebug.HTMLPanel.*Element
        //
        var AttrTag =
            SPAN({class: "nodeAttr editGroup"},
                "&nbsp;", SPAN({class: "nodeName editable"}, "$attr.nodeName"), "=&quot;",
                SPAN({class: "nodeValue editable"}, "$attr.nodeValue"), "&quot;"
            );
            
        var DataTag =
            SPAN({class: "nodeData", _repObject: "$attr.rep"},
                SPAN({class: "nodeName"}, "$attr.name"), "=",
                TAG("$attr.tag", {object: "$attr.data"})
            );

        Firebug.HTMLPanel.DataNode = domplate(FirebugReps.Element, {
            tag: DataTag
        }),
        
        Firebug.HTMLPanel.Element = domplate(Firebug.FireQuery.JQueryElement, {
            tag:
                DIV({class: "nodeBox containerNodeBox $object|getHidden repIgnore", _repObject: "$object"},
                    DIV({class: "nodeLabel"},
                        IMG({class: "twisty"}),
                        SPAN({class: "nodeLabelBox repTarget"},
                            "&lt;",
                            SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                            FOR("attr", "$object|attrIterator", AttrTag),
                            SPAN({class: "nodeBracket editable insertBefore"}, "&gt;"),
                            FOR("attr", "$object|dataIterator", DataTag)
                        )
                    ),
                    DIV({class: "nodeChildBox"}),
                    DIV({class: "nodeCloseLabel"},
                        SPAN({class: "nodeCloseLabelBox repTarget"},
                            "&lt;/",
                            SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                            "&gt;"
                        )
                     )
                )
        });
        
        Firebug.HTMLPanel.CompleteElement = domplate(Firebug.FireQuery.JQueryElement, {
            tag:
                DIV({class: "nodeBox open $object|getHidden repIgnore", _repObject: "$object"},
                    DIV({class: "nodeLabel"},
                        SPAN({class: "nodeLabelBox repTarget repTarget"},
                            "&lt;",
                            SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                            FOR("attr", "$object|attrIterator", AttrTag),
                            SPAN({class: "nodeBracket"}, "&gt;"),
                            FOR("attr", "$object|dataIterator", DataTag)
                        )
                    ),
                    DIV({class: "nodeChildBox"},
                        FOR("child", "$object|childIterator",
                            TAG("$child|getNodeTag", {object: "$child"})
                        )
                    ),
                    DIV({class: "nodeCloseLabel"},
                        "&lt;/",
                        SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                        "&gt;"
                     )
                ),

            getNodeTag: function(node) {
                return getNodeTag(node, true);
            },

            childIterator: function(node) {
                if (node.contentDocument)
                    return [node.contentDocument.documentElement];

                if (Firebug.showWhitespaceNodes)
                    return cloneArray(node.childNodes);
                else {
                    var nodes = [];
                    for (var child = node.firstChild; child; child = child.nextSibling) {
                        if (child.nodeType != 3 || !isWhitespaceText(child))
                            nodes.push(child);
                    }
                    return nodes;
                }
            }
        });
        
        Firebug.HTMLPanel.EmptyElement = domplate(Firebug.FireQuery.JQueryElement, {
            tag:
                DIV({class: "nodeBox emptyNodeBox $object|getHidden repIgnore", _repObject: "$object"},
                    DIV({class: "nodeLabel"},
                        SPAN({class: "nodeLabelBox repTarget"},
                            "&lt;",
                            SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                            FOR("attr", "$object|attrIterator", AttrTag),
                            SPAN({class: "nodeBracket editable insertBefore"}, "/&gt;"),
                            FOR("attr", "$object|dataIterator", DataTag)
                        )
                    )
                )
        });
        
        Firebug.HTMLPanel.TextElement = domplate(Firebug.FireQuery.JQueryElement, {
            tag:
                DIV({class: "nodeBox textNodeBox $object|getHidden repIgnore", _repObject: "$object"},
                    DIV({class: "nodeLabel"},
                        SPAN({class: "nodeLabelBox repTarget"},
                            "&lt;",
                            SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                            FOR("attr", "$object|attrIterator", AttrTag),
                            SPAN({class: "nodeBracket editable insertBefore"}, "&gt;"),
                            SPAN({class: "nodeText editable"}, "$object|getNodeText"),
                            "&lt;/",
                            SPAN({class: "nodeTag"}, "$object.localName|toLowerCase"),
                            "&gt;",
                            FOR("attr", "$object|dataIterator", DataTag)
                        )
                    )
                )
        });
        
        ////////////////////////////////////////////////////////////////////////
        // JSON-like displaing for objects
        //
        FirebugReps.Obj = domplate(FirebugReps.Obj, {
            tag: OBJECTLINK(
                "{",
                FOR("prop", "$object|propIterator",
                    " $prop.name=",
                    SPAN({class: "objectPropValue"}, "$prop.value|cropString")
                ), " }"
            )
        });
        
        Firebug.registerModule(Firebug.FireQuery);
        Firebug.reps.splice(0, 0, Firebug.FireQuery.JQueryExpression); // need to get this before array rep (jQuery expression behaves like array from JQuery 1.3)
        Firebug.reps.splice(0, 0, Firebug.FireQuery.JQueryElement); // need to get this before old Element rep
        if (Firebug.setDefaultReps)
            Firebug.setDefaultReps(FirebugReps.Func, FirebugReps.Obj); // Firebug 1.4+
        else
            Firebug.setDefaultRep(FirebugReps.Obj); // older Firebugs
    }
});