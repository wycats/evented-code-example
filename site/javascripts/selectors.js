(function(u,e){var t,n,i,r,s,o,a,l,f,h;i=/^[a-z0-9_-]+$/i,t=/^[\sa-z0-9>&"#:=._\[\]\(\)]+$/i,r=/^[\sa-z0-9>"#:=._\[\]\(\)&]*$/i,n=/^[\sa-z0-9_-]+$/i,s=/{name}/g,h=/(^\s*|\s*$)/g,o={".":".{name}","#":"#{name}","[]":"[{name}]",">":"> {name}",">.":"> .{name}",">#":"> #{name}",">[]":"> [{name}]"},a=/^_/,l=/_$/,f={"&.":"&.{name}","&#":"&#{name}","&[]":"&[{name}]"};function d(e,t){var n;for(n in t)e[n]=t[n]}function c(e){if(e){c.prototype=e;return new c}}function m(n,e){var t;if(typeof n==="undefined")n="";if(n instanceof String)n=String(n);if(typeof n!=="string")throw new Error("Selector value must be a string");t=e?new c(e):this,t.toString=function e(){return n};return t}function g(e,t,n){if(e instanceof g)if(t){this.parentSelector=e.clone();if(t in e.childSelectors&&e.childSelectors[t]instanceof m)this.childSelectors=e.childSelectors[t],this.name=t,this.end=n||e;else throw new TypeError("'"+e+"' has no child selectors named '"+t+"'")}else this.parentSelector=e.parentSelector,this.childSelectors=e.childSelectors,this.name=e.name,this.end=n||e.end||e.parentSelector;else if(e instanceof g)this.childSelectors=e,this.end=n;else this.childSelectors=new m(e),this.end=n}d(g.prototype,{toString:function(){return this.childSelectors.toString()?this.fullValue():"[root selector]"},value:function(t){if(typeof t==="string"){this.childSelectors.toString=function e(){return t};return this}else return this.childSelectors.toString()},fullValue:function(){var e,t;e=this.parentSelector,t=this.value();while(e){if(e.value())t=e.value()+" "+t;e=e.parentSelector}return t},clone:function(){return new g(this)},parentSelectors:function(){var e,t;e=[],t=this.parentSelector;while(t)e.push(new g(t)),t=t.parentSelector;return e},childOf:function(t){return t instanceof g?this.parentSelectors().filter(function(e){return e.childSelectors===t.childSelectors}).length>0:false},plus:function(e){var t;if(typeof e!=="string")throw new TypeError("first argument to plus must be a string");t=new g(e),t.parentSelector=this.clone(),t.end=this;return t},def:function(e,t){if(typeof e==="undefined"||i.test(e));else throw new TypeError("selector name '"+e+"' must match "+i);if(!t)t=e;if(t in o)t=o[t];t=t.replace(s,e),this.childSelectors[e]=new m(t);return new g(this,e)},alt:function(e,t){if(this.parentSelector instanceof g);else throw new TypeError("you can only create alternate versions of selectors with a parent");if(typeof e!=="string")throw new TypeError("the first argument to alt must be a string");if(!i.test(e))throw new TypeError("selector name '"+e+"' does not match "+i);if(r.test(t));else throw new TypeError("selector value '"+t+"' does not match "+r);if(typeof t==="undefined")t=this.value()+"."+e.replace(a,"").replace(l,"");if(t in f)t=f[t];t=t.replace(s,e.replace(a,"").replace(l,"")),t=t.replace(/&/g,this.value());if(a.test(e))e=this.name+e;if(l.test(e))e=e+this.name;this.parentSelector.childSelectors[e]=new m(t,this.childSelectors);return new g(this.parentSelector,e,this)},remove:function(){if(this.parentSelector)delete this.parentSelector.childSelectors[this.name],delete this.parentSelector,delete this.name;return this},down:function(){function e(e){var t,n;t=e.replace(h,"").split(/\s+/),n=[this];while(t.length)n=f(t.shift(),n,t.length===0);if(n[0]){n[0].end=this;return n[0]}else throw new Error("selector not found")}function f(e,t,n,i){var r,s,o,a,l;a=[],l=[],i=i||[];while(t.length){s=t.shift();if(i.indexOf(s.childSelectors)===-1){i.push(s.childSelectors);for(r in s.childSelectors)if(s.childSelectors[r]instanceof m){o=new g(s,r),a.push(o);if(e===r){if(n)return[o];l.push(o)}}}}if(a.length)l=l.concat(f(e,a,false,i));return l}return e}(),up:function(e){var t,n;n=this.parentSelector;if(typeof e==="undefined")return new g(n);while(n){if(n.parentSelector&&n.parentSelector.childSelectors[e]===n.childSelectors)return new g(n.parentSelector,e);n=n.parentSelector}throw new Error("selector not found")},to:function(e){var t;t=e instanceof g?e:this.down(e);if(!t.childOf(this))throw new Error(t+" is not a child of "+this);return this.value()===""?t.toString():t.toString().replace(new RegExp("^"+this+" "),"")},from:function(e){if(this.value()==="")throw new Error("from cannot be called on a root selector");if(typeof e==="undefined")return this.parentSelectors().pop().to(this);return e instanceof g?e.to(this):this.up(e).to(this)},audit:function(e,t,n){var i,r,s,o;i=new p,t||(t=[this.childSelectors]),e||(e="");for(s in this.childSelectors)if(this.childSelectors[s]instanceof m){o=new g(this,s),i[e+s]=o.toString();if(t.indexOf(o.childSelectors)===-1){t.push(o.childSelectors);if(!n)d(i,o.audit(e+s+" ",t))}else if(!n)d(i,o.audit(e+s+" ",t,true))}return i}});function p(){}p.prototype.toString=function(){var e,t,n,i;e="",t=0;for(n in this)if(n!=="toString")t=n.length>t?n.length:t;for(n in this){i=this[n];if(n!=="toString"){while(n.length<t)n+=" ";e+=n+"     "+i+"\n"}}return e},function(){var e,n;u.Selector=function t(e){return new g(e)},u.Selector.prototype=g.prototype,u.Selector.InternalSelector=m,n=u.Selector(),u.S=function t(e){return n.down(e)},u.S.tree=n.childSelectors;for(e in n)(function(e){if(e!=="toString"&&e!=="valueOf"&&typeof n[e]==="function")u.S[e]=function(){return n[e].apply(n,arguments)}})(e);S.def("html").def("body").end.def("head")}()})(this),function(n,r){var s;if(!n)throw new Error("jquery.selectors.js requires jQuery 1.4.2 or later");if(!r)throw new Error("jquery.selectors.js requires Selectors 0.1 or later");s=$(document),n.prototype.extend({toSelector:function e(){return new r(this.selector)},to:function t(e){return this.toSelector().to(e)},from:function t(e){return this.toSelector().from(e)},up:function i(e,t){var n;n=this.toSelector().up(e);if(t)n=n.plus(t);return o(n,this.parents(n.toString()))},down:function r(e,t){var n,i;n=this.toSelector(),i=n.down(e);if(t)i=i.plus(t);return o(i,this.find(i.from(n)))}});function o(t,e){e||(e=t.toString()),e=n(e);if(t.childSelectors.prototype)e=n.merge(new i(t.childSelectors.prototype),e);e.toSelector=function e(){return t};return e}n.extend(r.prototype,{get:function(){var e,t;e=this,t=o(e,this.toString());return t},bind:function(e,t,n){var i,r;i=this;if(typeof t==="function")n=t,t=undefined;if(typeof e==="string")s.delegate(this.toString(),e,t,function(){return n.apply(o(i,this),arguments)});else for(r in e)this.bind(r,undefined,e[r]);return this},extend:function(e){this.childSelectors.prototype||(this.childSelectors.prototype=new i(n.prototype)),this.childSelectors.prototype.extend(e);return this}}),"blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" ").forEach(function(n){r.prototype[n]=function(e,t){return this.bind(n,e,t)}});function i(e){if(e){i.prototype=e;return new i}}}(jQuery,Selector)