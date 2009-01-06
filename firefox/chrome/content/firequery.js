// This source contains copy&pasted various bits from Firebug sources.
// Some code comes from FirePHP project (http://www.firephp.org)
FBL.ns(function() {
    with(FBL) {
        const Cc = Components.classes;
        const Ci = Components.interfaces;

        const nsIPrefBranch = Ci.nsIPrefBranch;
        const nsIPrefBranch2 = Ci.nsIPrefBranch2;
        const nsIWindowMediator = Ci.nsIWindowMediator;

        const highlightCSS = "chrome://firebug/content/highlighter.css";

        const firequeryPrefService = Cc["@mozilla.org/preferences-service;1"];
        const observerService = CCSV("@mozilla.org/observer-service;1", "nsIObserverService");

        const firequeryPrefs = firequeryPrefService.getService(nsIPrefBranch2);
        const firequeryURLs = {
            main: "http://github.com/woid/firequery"
        };
        const firequeryPrefDomain = "extensions.firequery";
        var firequeryOptionUpdateMap = {};

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
                class: "objectLink objectLink-$className",
                _repObject: "$object"
            });

        const edgeSize = 1;

        function getNonFrameBody(elt)
        {
            var body = getBody(elt.ownerDocument);
            return body.localName.toUpperCase() == "FRAMESET" ? null : body;
        }

        function attachStyles(context, body)
        {
            var doc = body.ownerDocument;
            if (!context.highlightStyle)
                context.highlightStyle = createStyleSheet(doc, highlightCSS);

            if (!context.highlightStyle.parentNode || context.highlightStyle.ownerDocument != doc)
                addStyleSheet(body.ownerDocument, context.highlightStyle);
        }
        
        ////////////////////////////////////////////////////////////////////////
        // Firebug.FireQuery
        //
        Firebug.FireQuery = extend(Firebug.Module, {
            version: '0.1',
            currentPanel: null,

            /////////////////////////////////////////////////////////////////////////////////////////
            getPrefDomain: function() {
                return firequeryPrefDomain;
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            checkFirebugVersion: function() {
                var version = Firebug.getVersion();
                if (!version) return false;
                var a = version.split('.');
                if (a.length<2) return false;
                // we want Firebug version 1.2+ (including alphas/betas and other weird stuff)
                return parseInt(a[0], 10)>=1 && parseInt(a[1], 10)>=2;
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            versionCheck: function(context) {
                if (!this.checkFirebugVersion() && !context.fireQueryVersionWarningShown) {
                    // this.showMessage(context, "FireQuery Firefox extension works with Firebug 1.2 or higher (you have "+Firebug.getVersion()+"). Please upgrade Firebug to the latest version.", "sys-warning");
                    context.fireQueryVersionWarningShown = true;
                }
            },
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
            getPref: function(name) {
                dbg(">>>FireQuery.getPref: "+name);
                var prefName = firequeryPrefDomain + "." + name;
    
                var type = firequeryPrefs.getPrefType(prefName);
                if (type == nsIPrefBranch.PREF_STRING)
                return firequeryPrefs.getCharPref(prefName);
                else if (type == nsIPrefBranch.PREF_INT)
                return firequeryPrefs.getIntPref(prefName);
                else if (type == nsIPrefBranch.PREF_BOOL)
                return firequeryPrefs.getBoolPref(prefName);
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            setPref: function(name, value) {
                dbg(">>>FireQuery.setPref: "+name+"->"+value);
                var prefName = firequeryPrefDomain + "." + name;
    
                var type = firequeryPrefs.getPrefType(prefName);
                if (type == nsIPrefBranch.PREF_STRING)
                firequeryPrefs.setCharPref(prefName, value);
                else if (type == nsIPrefBranch.PREF_INT)
                firequeryPrefs.setIntPref(prefName, value);
                else if (type == nsIPrefBranch.PREF_BOOL)
                firequeryPrefs.setBoolPref(prefName, value);
            },
            /////////////////////////////////////////////////////////////////////////////////////////
            onVisitWebsite: function(which) {
                openNewTab(firequeryURLs[which]);
            }
        });
    
        ////////////////////////////////////////////////////////////////////////
        // Firebug.FireQuery.JQueryHighlighter
        //
        Firebug.FireQuery.JQueryHighlighter = function() {
            var generateGuid = function() {
                var S4 = function() {
                   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return S4()+S4();
            };
            this.seed = "highlighter-"+generateGuid();
        };

        Firebug.FireQuery.JQueryHighlighter.prototype = {
            /////////////////////////////////////////////////////////////////////////////////////////
            highlight: function(context, element) {
                if (element instanceof XULElement) return;

                var offset = getViewOffset(element, true);
                var x = offset.x, y = offset.y;
                var w = element.offsetWidth, h = element.offsetHeight;

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
                        class: "objectLink objectLink-$className",
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
    
        Firebug.registerModule(Firebug.FireQuery);
        Firebug.registerRep(Firebug.FireQuery.JQueryExpression);
    }
});