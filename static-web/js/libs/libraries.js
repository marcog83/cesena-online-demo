/* perfect-scrollbar v0.6.13 */
!function t(e,n,r){function o(i,s){if(!n[i]){if(!e[i]){var a="function"==typeof require&&require;if(!s&&a)return a(i,!0);if(l)return l(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[i]={exports:{}};e[i][0].call(u.exports,function(t){var n=e[i][1][t];return o(n?n:t)},u,u.exports,t,e,n,r)}return n[i].exports}for(var l="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(t,e,n){"use strict";var r=t("../main");"function"==typeof define&&define.amd?define('perfect_scrollbar',r):(window.PerfectScrollbar=r,"undefined"==typeof window.Ps&&(window.Ps=r))},{"../main":7}],2:[function(t,e,n){"use strict";function r(t,e){var n=t.className.split(" ");n.indexOf(e)<0&&n.push(e),t.className=n.join(" ")}function o(t,e){var n=t.className.split(" "),r=n.indexOf(e);r>=0&&n.splice(r,1),t.className=n.join(" ")}n.add=function(t,e){t.classList?t.classList.add(e):r(t,e)},n.remove=function(t,e){t.classList?t.classList.remove(e):o(t,e)},n.list=function(t){return t.classList?Array.prototype.slice.apply(t.classList):t.className.split(" ")}},{}],3:[function(t,e,n){"use strict";function r(t,e){return window.getComputedStyle(t)[e]}function o(t,e,n){return"number"==typeof n&&(n=n.toString()+"px"),t.style[e]=n,t}function l(t,e){for(var n in e){var r=e[n];"number"==typeof r&&(r=r.toString()+"px"),t.style[n]=r}return t}var i={};i.e=function(t,e){var n=document.createElement(t);return n.className=e,n},i.appendTo=function(t,e){return e.appendChild(t),t},i.css=function(t,e,n){return"object"==typeof e?l(t,e):"undefined"==typeof n?r(t,e):o(t,e,n)},i.matches=function(t,e){return"undefined"!=typeof t.matches?t.matches(e):"undefined"!=typeof t.matchesSelector?t.matchesSelector(e):"undefined"!=typeof t.webkitMatchesSelector?t.webkitMatchesSelector(e):"undefined"!=typeof t.mozMatchesSelector?t.mozMatchesSelector(e):"undefined"!=typeof t.msMatchesSelector?t.msMatchesSelector(e):void 0},i.remove=function(t){"undefined"!=typeof t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)},i.queryChildren=function(t,e){return Array.prototype.filter.call(t.childNodes,function(t){return i.matches(t,e)})},e.exports=i},{}],4:[function(t,e,n){"use strict";var r=function(t){this.element=t,this.events={}};r.prototype.bind=function(t,e){"undefined"==typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e),this.element.addEventListener(t,e,!1)},r.prototype.unbind=function(t,e){var n="undefined"!=typeof e;this.events[t]=this.events[t].filter(function(r){return!(!n||r===e)||(this.element.removeEventListener(t,r,!1),!1)},this)},r.prototype.unbindAll=function(){for(var t in this.events)this.unbind(t)};var o=function(){this.eventElements=[]};o.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return"undefined"==typeof e&&(e=new r(t),this.eventElements.push(e)),e},o.prototype.bind=function(t,e,n){this.eventElement(t).bind(e,n)},o.prototype.unbind=function(t,e,n){this.eventElement(t).unbind(e,n)},o.prototype.unbindAll=function(){for(var t=0;t<this.eventElements.length;t++)this.eventElements[t].unbindAll()},o.prototype.once=function(t,e,n){var r=this.eventElement(t),o=function(t){r.unbind(e,o),n(t)};r.bind(e,o)},e.exports=o},{}],5:[function(t,e,n){"use strict";e.exports=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}()},{}],6:[function(t,e,n){"use strict";var r=t("./class"),o=t("./dom"),l=n.toInt=function(t){return parseInt(t,10)||0},i=n.clone=function(t){if(t){if(t.constructor===Array)return t.map(i);if("object"==typeof t){var e={};for(var n in t)e[n]=i(t[n]);return e}return t}return null};n.extend=function(t,e){var n=i(t);for(var r in e)n[r]=i(e[r]);return n},n.isEditable=function(t){return o.matches(t,"input,[contenteditable]")||o.matches(t,"select,[contenteditable]")||o.matches(t,"textarea,[contenteditable]")||o.matches(t,"button,[contenteditable]")},n.removePsClasses=function(t){for(var e=r.list(t),n=0;n<e.length;n++){var o=e[n];0===o.indexOf("ps-")&&r.remove(t,o)}},n.outerWidth=function(t){return l(o.css(t,"width"))+l(o.css(t,"paddingLeft"))+l(o.css(t,"paddingRight"))+l(o.css(t,"borderLeftWidth"))+l(o.css(t,"borderRightWidth"))},n.startScrolling=function(t,e){r.add(t,"ps-in-scrolling"),"undefined"!=typeof e?r.add(t,"ps-"+e):(r.add(t,"ps-x"),r.add(t,"ps-y"))},n.stopScrolling=function(t,e){r.remove(t,"ps-in-scrolling"),"undefined"!=typeof e?r.remove(t,"ps-"+e):(r.remove(t,"ps-x"),r.remove(t,"ps-y"))},n.env={isWebKit:"WebkitAppearance"in document.documentElement.style,supportsTouch:"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,supportsIePointer:null!==window.navigator.msMaxTouchPoints}},{"./class":2,"./dom":3}],7:[function(t,e,n){"use strict";var r=t("./plugin/destroy"),o=t("./plugin/initialize"),l=t("./plugin/update");e.exports={initialize:o,update:l,destroy:r}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(t,e,n){"use strict";e.exports={handlers:["click-rail","drag-scrollbar","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipePropagation:!0,useBothWheelAxes:!1,wheelPropagation:!1,wheelSpeed:1,theme:"default"}},{}],9:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/dom"),l=t("./instances");e.exports=function(t){var e=l.get(t);e&&(e.event.unbindAll(),o.remove(e.scrollbarX),o.remove(e.scrollbarY),o.remove(e.scrollbarXRail),o.remove(e.scrollbarYRail),r.removePsClasses(t),l.remove(t))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(t,e,n){"use strict";function r(t,e){function n(t){return t.getBoundingClientRect()}var r=function(t){t.stopPropagation()};e.event.bind(e.scrollbarY,"click",r),e.event.bind(e.scrollbarYRail,"click",function(r){var o=r.pageY-window.pageYOffset-n(e.scrollbarYRail).top,s=o>e.scrollbarYTop?1:-1;i(t,"top",t.scrollTop+s*e.containerHeight),l(t),r.stopPropagation()}),e.event.bind(e.scrollbarX,"click",r),e.event.bind(e.scrollbarXRail,"click",function(r){var o=r.pageX-window.pageXOffset-n(e.scrollbarXRail).left,s=o>e.scrollbarXLeft?1:-1;i(t,"left",t.scrollLeft+s*e.containerWidth),l(t),r.stopPropagation()})}var o=t("../instances"),l=t("../update-geometry"),i=t("../update-scroll");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(t,e,n){"use strict";function r(t,e){function n(n){var o=r+n*e.railXRatio,i=Math.max(0,e.scrollbarXRail.getBoundingClientRect().left)+e.railXRatio*(e.railXWidth-e.scrollbarXWidth);o<0?e.scrollbarXLeft=0:o>i?e.scrollbarXLeft=i:e.scrollbarXLeft=o;var s=l.toInt(e.scrollbarXLeft*(e.contentWidth-e.containerWidth)/(e.containerWidth-e.railXRatio*e.scrollbarXWidth))-e.negativeScrollAdjustment;c(t,"left",s)}var r=null,o=null,s=function(e){n(e.pageX-o),a(t),e.stopPropagation(),e.preventDefault()},u=function(){l.stopScrolling(t,"x"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarX,"mousedown",function(n){o=n.pageX,r=l.toInt(i.css(e.scrollbarX,"left"))*e.railXRatio,l.startScrolling(t,"x"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}function o(t,e){function n(n){var o=r+n*e.railYRatio,i=Math.max(0,e.scrollbarYRail.getBoundingClientRect().top)+e.railYRatio*(e.railYHeight-e.scrollbarYHeight);o<0?e.scrollbarYTop=0:o>i?e.scrollbarYTop=i:e.scrollbarYTop=o;var s=l.toInt(e.scrollbarYTop*(e.contentHeight-e.containerHeight)/(e.containerHeight-e.railYRatio*e.scrollbarYHeight));c(t,"top",s)}var r=null,o=null,s=function(e){n(e.pageY-o),a(t),e.stopPropagation(),e.preventDefault()},u=function(){l.stopScrolling(t,"y"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarY,"mousedown",function(n){o=n.pageY,r=l.toInt(i.css(e.scrollbarY,"top"))*e.railYRatio,l.startScrolling(t,"y"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}var l=t("../../lib/helper"),i=t("../../lib/dom"),s=t("../instances"),a=t("../update-geometry"),c=t("../update-scroll");e.exports=function(t){var e=s.get(t);r(t,e),o(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(t,e,n){"use strict";function r(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&r<0)return!e.settings.wheelPropagation}var l=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===l&&n<0||l>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}var r=!1;e.event.bind(t,"mouseenter",function(){r=!0}),e.event.bind(t,"mouseleave",function(){r=!1});var i=!1;e.event.bind(e.ownerDocument,"keydown",function(c){if(!(c.isDefaultPrevented&&c.isDefaultPrevented()||c.defaultPrevented)){var u=l.matches(e.scrollbarX,":focus")||l.matches(e.scrollbarY,":focus");if(r||u){var d=document.activeElement?document.activeElement:e.ownerDocument.activeElement;if(d){if("IFRAME"===d.tagName)d=d.contentDocument.activeElement;else for(;d.shadowRoot;)d=d.shadowRoot.activeElement;if(o.isEditable(d))return}var p=0,f=0;switch(c.which){case 37:p=c.metaKey?-e.contentWidth:c.altKey?-e.containerWidth:-30;break;case 38:f=c.metaKey?e.contentHeight:c.altKey?e.containerHeight:30;break;case 39:p=c.metaKey?e.contentWidth:c.altKey?e.containerWidth:30;break;case 40:f=c.metaKey?-e.contentHeight:c.altKey?-e.containerHeight:-30;break;case 33:f=90;break;case 32:f=c.shiftKey?90:-90;break;case 34:f=-90;break;case 35:f=c.ctrlKey?-e.contentHeight:-e.containerHeight;break;case 36:f=c.ctrlKey?t.scrollTop:e.containerHeight;break;default:return}a(t,"top",t.scrollTop-f),a(t,"left",t.scrollLeft+p),s(t),i=n(p,f),i&&c.preventDefault()}}})}var o=t("../../lib/helper"),l=t("../../lib/dom"),i=t("../instances"),s=t("../update-geometry"),a=t("../update-scroll");e.exports=function(t){var e=i.get(t);r(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(t,e,n){"use strict";function r(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&r<0)return!e.settings.wheelPropagation}var l=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===l&&n<0||l>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}function r(t){var e=t.deltaX,n=-1*t.deltaY;return"undefined"!=typeof e&&"undefined"!=typeof n||(e=-1*t.wheelDeltaX/6,n=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,n*=10),e!==e&&n!==n&&(e=0,n=t.wheelDelta),t.shiftKey?[-n,-e]:[e,n]}function o(e,n){var r=t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");if(r){if(!window.getComputedStyle(r).overflow.match(/(scroll|auto)/))return!1;var o=r.scrollHeight-r.clientHeight;if(o>0&&!(0===r.scrollTop&&n>0||r.scrollTop===o&&n<0))return!0;var l=r.scrollLeft-r.clientWidth;if(l>0&&!(0===r.scrollLeft&&e<0||r.scrollLeft===l&&e>0))return!0}return!1}function s(s){var c=r(s),u=c[0],d=c[1];o(u,d)||(a=!1,e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(d?i(t,"top",t.scrollTop-d*e.settings.wheelSpeed):i(t,"top",t.scrollTop+u*e.settings.wheelSpeed),a=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(u?i(t,"left",t.scrollLeft+u*e.settings.wheelSpeed):i(t,"left",t.scrollLeft-d*e.settings.wheelSpeed),a=!0):(i(t,"top",t.scrollTop-d*e.settings.wheelSpeed),i(t,"left",t.scrollLeft+u*e.settings.wheelSpeed)),l(t),a=a||n(u,d),a&&(s.stopPropagation(),s.preventDefault()))}var a=!1;"undefined"!=typeof window.onwheel?e.event.bind(t,"wheel",s):"undefined"!=typeof window.onmousewheel&&e.event.bind(t,"mousewheel",s)}var o=t("../instances"),l=t("../update-geometry"),i=t("../update-scroll");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(t,e,n){"use strict";function r(t,e){e.event.bind(t,"scroll",function(){l(t)})}var o=t("../instances"),l=t("../update-geometry");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19}],15:[function(t,e,n){"use strict";function r(t,e){function n(){var t=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"";return 0===t.toString().length?null:t.getRangeAt(0).commonAncestorContainer}function r(){c||(c=setInterval(function(){return l.get(t)?(s(t,"top",t.scrollTop+u.top),s(t,"left",t.scrollLeft+u.left),void i(t)):void clearInterval(c)},50))}function a(){c&&(clearInterval(c),c=null),o.stopScrolling(t)}var c=null,u={top:0,left:0},d=!1;e.event.bind(e.ownerDocument,"selectionchange",function(){t.contains(n())?d=!0:(d=!1,a())}),e.event.bind(window,"mouseup",function(){d&&(d=!1,a())}),e.event.bind(window,"keyup",function(){d&&(d=!1,a())}),e.event.bind(window,"mousemove",function(e){if(d){var n={x:e.pageX,y:e.pageY},l={left:t.offsetLeft,right:t.offsetLeft+t.offsetWidth,top:t.offsetTop,bottom:t.offsetTop+t.offsetHeight};n.x<l.left+3?(u.left=-5,o.startScrolling(t,"x")):n.x>l.right-3?(u.left=5,o.startScrolling(t,"x")):u.left=0,n.y<l.top+3?(l.top+3-n.y<5?u.top=-5:u.top=-20,o.startScrolling(t,"y")):n.y>l.bottom-3?(n.y-l.bottom+3<5?u.top=5:u.top=20,o.startScrolling(t,"y")):u.top=0,0===u.top&&0===u.left?a():r()}})}var o=t("../../lib/helper"),l=t("../instances"),i=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){var e=l.get(t);r(t,e)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(t,e,n){"use strict";function r(t,e,n,r){function o(n,r){var o=t.scrollTop,l=t.scrollLeft,i=Math.abs(n),s=Math.abs(r);if(s>i){if(r<0&&o===e.contentHeight-e.containerHeight||r>0&&0===o)return!e.settings.swipePropagation}else if(i>s&&(n<0&&l===e.contentWidth-e.containerWidth||n>0&&0===l))return!e.settings.swipePropagation;return!0}function a(e,n){s(t,"top",t.scrollTop-n),s(t,"left",t.scrollLeft-e),i(t)}function c(){w=!0}function u(){w=!1}function d(t){return t.targetTouches?t.targetTouches[0]:t}function p(t){return!(!t.targetTouches||1!==t.targetTouches.length)||!(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE)}function f(t){if(p(t)){Y=!0;var e=d(t);g.pageX=e.pageX,g.pageY=e.pageY,v=(new Date).getTime(),null!==y&&clearInterval(y),t.stopPropagation()}}function h(t){if(!Y&&e.settings.swipePropagation&&f(t),!w&&Y&&p(t)){var n=d(t),r={pageX:n.pageX,pageY:n.pageY},l=r.pageX-g.pageX,i=r.pageY-g.pageY;a(l,i),g=r;var s=(new Date).getTime(),c=s-v;c>0&&(m.x=l/c,m.y=i/c,v=s),o(l,i)&&(t.stopPropagation(),t.preventDefault())}}function b(){!w&&Y&&(Y=!1,clearInterval(y),y=setInterval(function(){return l.get(t)&&(m.x||m.y)?Math.abs(m.x)<.01&&Math.abs(m.y)<.01?void clearInterval(y):(a(30*m.x,30*m.y),m.x*=.8,void(m.y*=.8)):void clearInterval(y)},10))}var g={},v=0,m={},y=null,w=!1,Y=!1;n&&(e.event.bind(window,"touchstart",c),e.event.bind(window,"touchend",u),e.event.bind(t,"touchstart",f),e.event.bind(t,"touchmove",h),e.event.bind(t,"touchend",b)),r&&(window.PointerEvent?(e.event.bind(window,"pointerdown",c),e.event.bind(window,"pointerup",u),e.event.bind(t,"pointerdown",f),e.event.bind(t,"pointermove",h),e.event.bind(t,"pointerup",b)):window.MSPointerEvent&&(e.event.bind(window,"MSPointerDown",c),e.event.bind(window,"MSPointerUp",u),e.event.bind(t,"MSPointerDown",f),e.event.bind(t,"MSPointerMove",h),e.event.bind(t,"MSPointerUp",b)))}var o=t("../../lib/helper"),l=t("../instances"),i=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){if(o.env.supportsTouch||o.env.supportsIePointer){var e=l.get(t);r(t,e,o.env.supportsTouch,o.env.supportsIePointer)}}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/class"),l=t("./instances"),i=t("./update-geometry"),s={"click-rail":t("./handler/click-rail"),"drag-scrollbar":t("./handler/drag-scrollbar"),keyboard:t("./handler/keyboard"),wheel:t("./handler/mouse-wheel"),touch:t("./handler/touch"),selection:t("./handler/selection")},a=t("./handler/native-scroll");e.exports=function(t,e){e="object"==typeof e?e:{},o.add(t,"ps-container");var n=l.add(t);n.settings=r.extend(n.settings,e),o.add(t,"ps-theme-"+n.settings.theme),n.settings.handlers.forEach(function(e){s[e](t)}),a(t),i(t)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(t,e,n){"use strict";function r(t){function e(){a.add(t,"ps-focus")}function n(){a.remove(t,"ps-focus")}var r=this;r.settings=s.clone(c),r.containerWidth=null,r.containerHeight=null,r.contentWidth=null,r.contentHeight=null,r.isRtl="rtl"===u.css(t,"direction"),r.isNegativeScroll=function(){var e=t.scrollLeft,n=null;return t.scrollLeft=-1,n=t.scrollLeft<0,t.scrollLeft=e,n}(),r.negativeScrollAdjustment=r.isNegativeScroll?t.scrollWidth-t.clientWidth:0,r.event=new d,r.ownerDocument=t.ownerDocument||document,r.scrollbarXRail=u.appendTo(u.e("div","ps-scrollbar-x-rail"),t),r.scrollbarX=u.appendTo(u.e("div","ps-scrollbar-x"),r.scrollbarXRail),r.scrollbarX.setAttribute("tabindex",0),r.event.bind(r.scrollbarX,"focus",e),r.event.bind(r.scrollbarX,"blur",n),r.scrollbarXActive=null,r.scrollbarXWidth=null,r.scrollbarXLeft=null,r.scrollbarXBottom=s.toInt(u.css(r.scrollbarXRail,"bottom")),r.isScrollbarXUsingBottom=r.scrollbarXBottom===r.scrollbarXBottom,r.scrollbarXTop=r.isScrollbarXUsingBottom?null:s.toInt(u.css(r.scrollbarXRail,"top")),r.railBorderXWidth=s.toInt(u.css(r.scrollbarXRail,"borderLeftWidth"))+s.toInt(u.css(r.scrollbarXRail,"borderRightWidth")),u.css(r.scrollbarXRail,"display","block"),r.railXMarginWidth=s.toInt(u.css(r.scrollbarXRail,"marginLeft"))+s.toInt(u.css(r.scrollbarXRail,"marginRight")),u.css(r.scrollbarXRail,"display",""),r.railXWidth=null,r.railXRatio=null,r.scrollbarYRail=u.appendTo(u.e("div","ps-scrollbar-y-rail"),t),r.scrollbarY=u.appendTo(u.e("div","ps-scrollbar-y"),r.scrollbarYRail),r.scrollbarY.setAttribute("tabindex",0),r.event.bind(r.scrollbarY,"focus",e),r.event.bind(r.scrollbarY,"blur",n),r.scrollbarYActive=null,r.scrollbarYHeight=null,r.scrollbarYTop=null,r.scrollbarYRight=s.toInt(u.css(r.scrollbarYRail,"right")),r.isScrollbarYUsingRight=r.scrollbarYRight===r.scrollbarYRight,r.scrollbarYLeft=r.isScrollbarYUsingRight?null:s.toInt(u.css(r.scrollbarYRail,"left")),r.scrollbarYOuterWidth=r.isRtl?s.outerWidth(r.scrollbarY):null,r.railBorderYWidth=s.toInt(u.css(r.scrollbarYRail,"borderTopWidth"))+s.toInt(u.css(r.scrollbarYRail,"borderBottomWidth")),u.css(r.scrollbarYRail,"display","block"),r.railYMarginHeight=s.toInt(u.css(r.scrollbarYRail,"marginTop"))+s.toInt(u.css(r.scrollbarYRail,"marginBottom")),u.css(r.scrollbarYRail,"display",""),r.railYHeight=null,r.railYRatio=null}function o(t){return t.getAttribute("data-ps-id")}function l(t,e){t.setAttribute("data-ps-id",e)}function i(t){t.removeAttribute("data-ps-id")}var s=t("../lib/helper"),a=t("../lib/class"),c=t("./default-setting"),u=t("../lib/dom"),d=t("../lib/event-manager"),p=t("../lib/guid"),f={};n.add=function(t){var e=p();return l(t,e),f[e]=new r(t),f[e]},n.remove=function(t){delete f[o(t)],i(t)},n.get=function(t){return f[o(t)]}},{"../lib/class":2,"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(t,e,n){"use strict";function r(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function o(t,e){var n={width:e.railXWidth};e.isRtl?n.left=e.negativeScrollAdjustment+t.scrollLeft+e.containerWidth-e.contentWidth:n.left=t.scrollLeft,e.isScrollbarXUsingBottom?n.bottom=e.scrollbarXBottom-t.scrollTop:n.top=e.scrollbarXTop+t.scrollTop,s.css(e.scrollbarXRail,n);var r={top:t.scrollTop,height:e.railYHeight};e.isScrollbarYUsingRight?e.isRtl?r.right=e.contentWidth-(e.negativeScrollAdjustment+t.scrollLeft)-e.scrollbarYRight-e.scrollbarYOuterWidth:r.right=e.scrollbarYRight-t.scrollLeft:e.isRtl?r.left=e.negativeScrollAdjustment+t.scrollLeft+2*e.containerWidth-e.contentWidth-e.scrollbarYLeft-e.scrollbarYOuterWidth:r.left=e.scrollbarYLeft+t.scrollLeft,s.css(e.scrollbarYRail,r),s.css(e.scrollbarX,{left:e.scrollbarXLeft,width:e.scrollbarXWidth-e.railBorderXWidth}),s.css(e.scrollbarY,{top:e.scrollbarYTop,height:e.scrollbarYHeight-e.railBorderYWidth})}var l=t("../lib/helper"),i=t("../lib/class"),s=t("../lib/dom"),a=t("./instances"),c=t("./update-scroll");e.exports=function(t){var e=a.get(t);e.containerWidth=t.clientWidth,e.containerHeight=t.clientHeight,e.contentWidth=t.scrollWidth,e.contentHeight=t.scrollHeight;var n;t.contains(e.scrollbarXRail)||(n=s.queryChildren(t,".ps-scrollbar-x-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarXRail,t)),t.contains(e.scrollbarYRail)||(n=s.queryChildren(t,".ps-scrollbar-y-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarYRail,t)),!e.settings.suppressScrollX&&e.containerWidth+e.settings.scrollXMarginOffset<e.contentWidth?(e.scrollbarXActive=!0,e.railXWidth=e.containerWidth-e.railXMarginWidth,e.railXRatio=e.containerWidth/e.railXWidth,e.scrollbarXWidth=r(e,l.toInt(e.railXWidth*e.containerWidth/e.contentWidth)),e.scrollbarXLeft=l.toInt((e.negativeScrollAdjustment+t.scrollLeft)*(e.railXWidth-e.scrollbarXWidth)/(e.contentWidth-e.containerWidth))):e.scrollbarXActive=!1,!e.settings.suppressScrollY&&e.containerHeight+e.settings.scrollYMarginOffset<e.contentHeight?(e.scrollbarYActive=!0,e.railYHeight=e.containerHeight-e.railYMarginHeight,e.railYRatio=e.containerHeight/e.railYHeight,e.scrollbarYHeight=r(e,l.toInt(e.railYHeight*e.containerHeight/e.contentHeight)),e.scrollbarYTop=l.toInt(t.scrollTop*(e.railYHeight-e.scrollbarYHeight)/(e.contentHeight-e.containerHeight))):e.scrollbarYActive=!1,e.scrollbarXLeft>=e.railXWidth-e.scrollbarXWidth&&(e.scrollbarXLeft=e.railXWidth-e.scrollbarXWidth),e.scrollbarYTop>=e.railYHeight-e.scrollbarYHeight&&(e.scrollbarYTop=e.railYHeight-e.scrollbarYHeight),o(t,e),e.scrollbarXActive?i.add(t,"ps-active-x"):(i.remove(t,"ps-active-x"),e.scrollbarXWidth=0,e.scrollbarXLeft=0,c(t,"left",0)),e.scrollbarYActive?i.add(t,"ps-active-y"):(i.remove(t,"ps-active-y"),e.scrollbarYHeight=0,e.scrollbarYTop=0,c(t,"top",0))}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(t,e,n){"use strict";var r,o,l=t("./instances"),i=function(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e};e.exports=function(t,e,n){if("undefined"==typeof t)throw"You must provide an element to the update-scroll function";if("undefined"==typeof e)throw"You must provide an axis to the update-scroll function";if("undefined"==typeof n)throw"You must provide a value to the update-scroll function";"top"===e&&n<=0&&(t.scrollTop=n=0,t.dispatchEvent(i("ps-y-reach-start"))),"left"===e&&n<=0&&(t.scrollLeft=n=0,t.dispatchEvent(i("ps-x-reach-start")));var s=l.get(t);"top"===e&&n>=s.contentHeight-s.containerHeight&&(n=s.contentHeight-s.containerHeight,n-t.scrollTop<=1?n=t.scrollTop:t.scrollTop=n,t.dispatchEvent(i("ps-y-reach-end"))),"left"===e&&n>=s.contentWidth-s.containerWidth&&(n=s.contentWidth-s.containerWidth,n-t.scrollLeft<=1?n=t.scrollLeft:t.scrollLeft=n,t.dispatchEvent(i("ps-x-reach-end"))),r||(r=t.scrollTop),o||(o=t.scrollLeft),"top"===e&&n<r&&t.dispatchEvent(i("ps-scroll-up")),"top"===e&&n>r&&t.dispatchEvent(i("ps-scroll-down")),"left"===e&&n<o&&t.dispatchEvent(i("ps-scroll-left")),"left"===e&&n>o&&t.dispatchEvent(i("ps-scroll-right")),"top"===e&&(t.scrollTop=r=n,t.dispatchEvent(i("ps-scroll-y"))),"left"===e&&(t.scrollLeft=o=n,t.dispatchEvent(i("ps-scroll-x")))}},{"./instances":18}],21:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/dom"),l=t("./instances"),i=t("./update-geometry"),s=t("./update-scroll");e.exports=function(t){var e=l.get(t);e&&(e.negativeScrollAdjustment=e.isNegativeScroll?t.scrollWidth-t.clientWidth:0,o.css(e.scrollbarXRail,"display","block"),o.css(e.scrollbarYRail,"display","block"),e.railXMarginWidth=r.toInt(o.css(e.scrollbarXRail,"marginLeft"))+r.toInt(o.css(e.scrollbarXRail,"marginRight")),e.railYMarginHeight=r.toInt(o.css(e.scrollbarYRail,"marginTop"))+r.toInt(o.css(e.scrollbarYRail,"marginBottom")),o.css(e.scrollbarXRail,"display","none"),o.css(e.scrollbarYRail,"display","none"),i(t),s(t,"top",t.scrollTop),s(t,"left",t.scrollLeft),o.css(e.scrollbarXRail,"display",""),o.css(e.scrollbarYRail,"display",""))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]);
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define('most',["exports"],e):e(t.most=t.most||{})}(this,function(t){"use strict";function e(t){this.source=t}function n(t,e){var n=e.length,i=new Array(n+1);i[0]=t;for(var r=0;r<n;++r)i[r+1]=e[r];return i}function i(t,e){for(var n=e.length,i=new Array(n+1),r=0;r<n;++r)i[r]=e[r];return i[n]=t,i}function r(t,e){if(t<0)throw new TypeError("n must be >= 0");var n=e.length;return 0===t||0===n?e:t>=n?[]:o(t,e,n-t)}function o(t,e,n){for(var i=new Array(n),r=0;r<n;++r)i[r]=e[t+r];return i}function s(t){return r(1,t)}function u(t){for(var e=t.length,n=new Array(e),i=0;i<e;++i)n[i]=t[i];return n}function h(t,e){for(var n=e.length,i=new Array(n),r=0;r<n;++r)i[r]=t(e[r]);return i}function c(t,e,n){for(var i=e,r=0,o=n.length;r<o;++r)i=t(i,n[r],r);return i}function p(t,e,n){if(e<0)throw new TypeError("i must be >= 0");for(var i=n.length,r=new Array(i),o=0;o<i;++o)r[o]=e===o?t:n[o];return r}function f(t,e){if(t<0)throw new TypeError("i must be >= 0");var n=e.length;return 0===n||t>=n?e:1===n?[]:a(t,e,n-1)}function a(t,e,n){var i,r=new Array(n);for(i=0;i<t;++i)r[i]=e[i];for(i=t;i<n;++i)r[i]=e[i+1];return r}function d(t,e){for(var n,i=e.length,r=new Array(i),o=0,s=0;s<i;++s)n=e[s],t(n)||(r[o]=n,++o);return r.length=o,r}function l(t,e){for(var n=0,i=e.length;n<i;++n)if(t===e[n])return n;return-1}function y(t){return null!=t&&"number"==typeof t.length&&"function"!=typeof t}function v(t,e){this._dispose=t,this._data=e}function w(){this.disposable=void 0,this.disposed=!1,this._resolve=void 0;var t=this;this.result=new Promise(function(e){t._resolve=e})}function k(t){return null!==t&&"object"==typeof t&&"function"==typeof t.then}function m(t,e,n){var i=E(e);return k(i)?i.catch(function(e){n.error(t,e)}):i}function _(t,e){return T(new v(t,e))}function b(){return new v(Fi,void 0)}function g(t){return _(x,t)}function x(t){return Promise.all(Oi(E,t))}function E(t){try{return t.dispose()}catch(t){return Promise.reject(t)}}function A(){return new w}function T(t){return new v(P,M(t))}function P(t){return t.disposed||(t.disposed=!0,t.value=E(t.disposable),t.disposable=void 0),t.value}function M(t){return{disposed:!1,disposable:t,value:void 0}}function R(t){setTimeout(function(){throw t},0)}function I(t,e,n){this._run=t,this.value=e,this.sink=n,this.active=!0}function L(t,e,n){n.error(t,e)}function W(t,e,n){n.event(t,e)}function C(t,e,n){n.end(t,e)}function N(t){return new e(new q(t))}function q(t){this.value=t}function B(t,e,n){n.event(t,e),n.end(t,void 0)}function S(){return Gi}function j(){}function V(t){return t.dispose()}function D(){return Hi}function U(){}function z(t){return new e(new O(t))}function O(t){this.array=t}function F(t,e,n){function i(t){n.end(t)}for(var r=0,o=e.length;r<o&&this.active;++r)n.event(t,e[r]);this.active&&i(t)}function G(t){return"function"==typeof t[Ji]}function H(t){return t[Ji]()}function J(t){return new e(new K(t))}function K(t){this.iterable=t}function Q(t,e,n){this.scheduler=n,this.iterator=t,this.task=new I(X,this,e),n.asap(this.task)}function X(t,e,n){var i=e.iterator.next();i.done?n.end(t,i.value):n.event(t,i.value),e.scheduler.asap(e.task)}function Y(t){var e,n=t.Symbol;return"function"==typeof n?n.observable?e=n.observable:(e=n("observable"),n.observable=e):e="@@observable",e}function Z(t){var e=null;if(t){var n=t[Qi];if("function"==typeof n&&(e=n.call(t),!e||"function"!=typeof e.subscribe))throw new TypeError("invalid observable "+e)}return e}function $(t){return new e(new tt(t))}function tt(t){this.observable=t}function et(t,e){this.sink=t,this.scheduler=e}function nt(t){return t.unsubscribe()}function it(t){if(t instanceof e)return t;var n=Z(t);if(null!=n)return $(n);if(Array.isArray(t)||y(t))return z(t);if(G(t))return J(t);throw new TypeError("from(x) must be observable, iterable, or array-like: "+t)}function rt(t,n){return new e(new ot(t,n))}function ot(t,e){this.period=t,this.value=e}function st(t,e,n,i){this.time=t,this.period=e,this.task=n,this.scheduler=i,this.active=!0}function ut(t){return Promise.resolve(t).then(ht)}function ht(t){try{return t.run()}catch(e){return t.error(e)}}function ct(t,e){this.timer=t,this.timeline=e,this._timer=null,this._nextArrival=1/0;var n=this;this._runReadyTasksBound=function(){n._runReadyTasks(n.now())}}function pt(){}function ft(t){this.f=t,this.active=!0}function at(t){var e=new ft(t);return ut(e),e}function dt(){this.tasks=[]}function lt(t,e,n){for(var i=e.events,r=0;r<i.length;++r){var o=i[r];o.active&&(t(o),o.period>=0&&o.active&&(o.time=o.time+o.period,yt(o,n)))}return n}function yt(t,e){var n=e.length;if(0===n)return void e.push(kt(t.time,[t]));var i=wt(t.time,e);i>=n?e.push(kt(t.time,[t])):t.time===e[i].time?e[i].events.push(t):e.splice(i,0,kt(t.time,[t]))}function vt(t,e){e.events=d(t,e.events)}function wt(t,e){for(var n,i,r=0,o=e.length;r<o;){if(n=Math.floor((r+o)/2),i=e[n],t===i.time)return n;t<i.time?o=n:r=n+1}return o}function kt(t,e){return{time:t,events:e}}function mt(t,e){if(null==t||"object"!=typeof t)throw new TypeError("subscriber must be an object");var n=A(),i=new _t(R,t,n);return n.setDisposable(e.source.run(i,Xi)),new bt(n)}function _t(t,e,n){this.fatalError=t,this.subscriber=e,this.disposable=n}function bt(t){this.disposable=t}function gt(t,e,n,i,r,o){Promise.resolve(r.dispose()).then(function(){"function"==typeof n&&n.call(e,o)}).catch(function(t){"function"==typeof i&&i.call(e,t)}).catch(t)}function xt(t,e){return t(e)}function Et(t,e,n){try{n.event(t,e)}catch(e){n.error(t,e)}}function At(t,e,n){try{n.end(t,e)}catch(e){n.error(t,e)}}function Tt(t,e,n){this.event=t,this.source=e,this.capture=n}function Pt(t){var e=t.target;e.source.removeEventListener(e.event,t.addEvent,e.capture)}function Mt(t){this.sink=t,this.events=[],this.active=!0}function Rt(t,e,n){this.sink=t,this.events=n,this.time=e}function It(t,e,n){this.time=t,this.value=e,this.sink=n}function Lt(t,e,n){this.time=t,this.value=e,this.sink=n}function Wt(t,e){this.event=t,this.source=e}function Ct(t){var e=t.target;e.source.removeListener(e.event,t.addEvent)}function Nt(t,n,i){var r;if("function"==typeof n.addEventListener&&"function"==typeof n.removeEventListener)arguments.length<3&&(i=!1),r=new Tt(t,n,i);else{if("function"!=typeof n.addListener||"function"!=typeof n.removeListener)throw new Error("source must support addEventListener/removeEventListener or addListener/removeListener");r=new Wt(t,n)}return new e(r)}function qt(t){return Bt(t,Xi)}function Bt(t,e){return new Promise(function(n,i){St(t,e,n,i)})}function St(t,e,n,i){var r=A(),o=new jt(n,i,r);r.setDisposable(t.run(o,e))}function jt(t,e,n){this._end=t,this._error=e,this._disposable=n,this.active=!0}function Vt(t,e,n,i){Promise.resolve(n.dispose()).then(function(){t(i)},e)}function Dt(t){this.sink=t}function Ut(t,e){this.p=t,this.source=e}function zt(t,e){this.p=t,this.sink=e}function Ot(t,e){return function(n){return t(n)&&e(n)}}function Ft(t,e,n){this.p=t,this.f=e,this.source=n}function Gt(t,e,n){this.p=t,this.f=e,this.sink=n}function Ht(t,e){this.f=t,this.source=e}function Jt(t,e){this.f=t,this.sink=e}function Kt(t,n){return new e(Ht.create(t,n.source))}function Qt(t,e){return Kt(function(){return t},e)}function Xt(t,n){return new e(new Yt(t,n.source))}function Yt(t,e){this.source=e,this.f=t}function Zt(t,e){this.sink=e,this.f=t}function $t(t,e){return te(Xt(t,e))}function te(t){return qt(t.source)}function ee(t,n,i){return new e(new ne(t,n,i.source))}function ne(t,e,n){this.step=t,this.seed=e,this.source=n}function ie(t,e,n){this.step=t,this.seed=e,this.sink=n}function re(t,n,i){return new e(new oe(t,n,i.source))}function oe(t,e,n){this.source=n,this.f=t,this.value=e}function se(t,e,n){this.f=t,this.value=e,this.sink=n}function ue(t,e,n){return qt(new he(t,e,n.source))}function he(t,e,n){this.source=n,this.f=t,this.value=e}function ce(t,e,n){this.f=t,this.value=e,this.sink=n}function pe(t,n){return new e(new fe(t,n))}function fe(t,e){this.f=t,this.value=e}function ae(t,e,n,i){function r(t){s.sink.error(s.scheduler.now(),t)}function o(t){return de(t,e)}this.f=t,this.sink=n,this.scheduler=i,this.active=!0;var s=this;Promise.resolve(this).then(o).catch(r)}function de(t,e){var n=t.f;return Promise.resolve(n(e)).then(function(e){return le(t,e)})}function le(t,e){return e.done?(t.sink.end(t.scheduler.now(),e.value),e.value):(t.sink.event(t.scheduler.now(),e.value),t.active?de(t,e.seed):e.value)}function ye(t,n){return new e(new ve(t,n))}function ve(t,e){this.f=t,this.value=e}function we(t,e,n,i){function r(t){u.sink.error(u.scheduler.now(),t)}function o(t){return ke(t,s)}this.f=t,this.sink=n,this.scheduler=i,this.active=!0;var s=e,u=this;Promise.resolve(this).then(o).catch(r)}function ke(t,e){if(t.sink.event(t.scheduler.now(),e),!t.active)return e;var n=t.f;return Promise.resolve(n(e)).then(function(e){return me(t,e)})}function me(t,e){return t.active?ke(t,e):t.value}function _e(t){return new e(new be(t,s(arguments)))}function be(t,e){this.f=t,this.args=e}function ge(t,e,n){function i(t){r.sink.error(r.scheduler.now(),t)}this.iterator=t,this.sink=e,this.scheduler=n,this.active=!0;var r=this;Promise.resolve(this).then(xe).catch(i)}function xe(t,e){return t.active?Ee(t,t.iterator.next(e)):e}function Ee(t,e){return e.done?t.sink.end(t.scheduler.now(),e.value):Promise.resolve(e.value).then(function(e){return Ae(t,e)},function(e){return Te(t,e)})}function Ae(t,e){return t.sink.event(t.scheduler.now(),e),xe(t,e)}function Te(t,e){return Ee(t,t.iterator.throw(e))}function Pe(t,n){return new e(new Me(t,n.source))}function Me(t,e){this.f=t,this.source=e}function Re(t,e,n,i){this.f=t,this.sink=n,this.scheduler=i,this.active=!0,this.disposable=T(e.run(this,i))}function Ie(t,e){return Le(N(t),e)}function Le(t,e){return Pe(function(){return e},t)}function We(t,e){this.sink=e,this.index=t,this.active=!0,this.value=void 0}function Ce(t,e){switch(e.length){case 0:return t();case 1:return t(e[0]);case 2:return t(e[0],e[1]);case 3:return t(e[0],e[1],e[2]);case 4:return t(e[0],e[1],e[2],e[3]);case 5:return t(e[0],e[1],e[2],e[3],e[4]);default:return t.apply(void 0,e)}}function Ne(t){return qe(t,Zi(arguments))}function qe(t,n){var i=n.length;return 0===i?S():1===i?Kt(t,n[0]):new e(Be(t,n))}function Be(t,e){return new je(t,Yi(Se,e))}function Se(t){return t.source}function je(t,e){this.f=t,this.sources=e}function Ve(t,e,n,i){var r=this;this.sink=n,this.disposables=t,this.sinks=e,this.f=i;var o=e.length;this.awaiting=o,this.values=new Array(o),this.hasValue=new Array(o);for(var s=0;s<o;++s)r.hasValue[s]=!1;this.activeCount=e.length}function De(t,e){return Ne(zi,t,e)}function Ue(t,n){return new e(new ze(t,n.source))}function ze(t,e){this.transducer=t,this.source=e}function Oe(t,e){this.xf=t,this.sink=e}function Fe(t){this.time=-(1/0),this.sink=t}function Ge(t){return"function"==typeof t["@@transducer/step"]?new He(t):new Je(t)}function He(t){this.tx=t}function Je(t){this.tx=t}function Ke(){this.head=null,this.length=0}function Qe(t,e){return Xe(Di,t,e)}function Xe(t,n,i){return new e(new Ye(t,n,i.source))}function Ye(t,e,n){this.f=t,this.concurrency=e,this.source=n}function Ze(t,e,n,i,r){this.f=t,this.concurrency=e,this.sink=i,this.scheduler=r,this.pending=[],this.current=new Ke,this.disposable=T(n.run(this,r)),this.active=!0}function $e(t,e,n,i){return t(e).source.run(n,i)}function tn(t,e,n){this.prev=this.next=null,this.time=t,this.outer=e,this.sink=n,this.disposable=void 0}function en(t,e){return Xe(t,1/0,e)}function nn(t){return Qe(1/0,t)}function rn(t,e){return Xe(t,1,e)}function on(){return sn($i(arguments))}function sn(t){var n=t.length;return 0===n?S():1===n?t[0]:new e(un(t))}function un(t){return new cn(tr(hn,[],t))}function hn(t,e){var n=e.source;return n instanceof cn?t.concat(n.sources):t.concat(n)}function cn(t){this.sources=t}function pn(t,e,n){this.sink=n,this.disposables=t,this.activeCount=e.length}function fn(t,e){return dn(t,e,r(2,arguments))}function an(t,n){return new e(new yn(Di,t.source,[n.source]))}function dn(t,n,i){return new e(new yn(t,n.source,h(ln,i)))}function ln(t){return t.source}function yn(t,e,n){this.f=t,this.sampler=e,this.sources=n}function vn(t){this.sink=t,this.hasValue=!1}function wn(t,e,n){this.f=t,this.sinks=e,this.sink=n,this.active=!1}function kn(t){return t.hasValue}function mn(t){return t.value}function _n(t){this._capacity=t||32,this._length=0,this._head=0}function bn(t,e,n,i,r){for(var o=0;o<r;++o)n[o+i]=t[o+e],t[o+e]=void 0}function gn(t){return xn(t,nr(arguments))}function xn(t,n){return 0===n.length?S():1===n.length?Kt(t,n[0]):new e(new An(t,er(En,n)))}function En(t){return t.source}function An(t,e){this.f=t,this.sources=e}function Tn(t,e,n,i){this.f=t,this.sinks=n,this.sink=i,this.buffers=e}function Pn(t,e,n,i){i.event(e,Ce(t,er(Mn,n)))}function Mn(t){return t.shift()}function Rn(t,e){for(var n=0,i=t.length;n<i;++n)if(t[n].isEmpty()&&!e[n].active)return!0;return!1}function In(t){for(var e=0,n=t.length;e<n;++e)if(t[e].isEmpty())return!1;return!0}function Ln(t){return new e(new Wn(t.source))}function Wn(t){this.source=t}function Cn(t,e){this.sink=t,this.scheduler=e,this.current=null,this.ended=!1}function Nn(t,e,n,i){this.min=t,this.max=e,this.outer=n,this.sink=i,this.disposable=b()}function qn(t,n){return new e(Ut.create(t,n.source))}function Bn(t){return Sn(Dn,t)}function Sn(t,n){return new e(new jn(t,n.source))}function jn(t,e){this.equals=t,this.source=e}function Vn(t,e){this.equals=t,this.sink=e,this.value=void 0,this.init=!0}function Dn(t,e){return t===e}function Un(t,e){return On(0,t,e)}function zn(t,e){return On(t,1/0,e)}function On(t,n,i){return n<=t?S():new e(Fn(t,n,i.source))}function Fn(t,e,n){return n instanceof Ht?Gn(t,e,n):n instanceof Jn?Hn(t,e,n):new Jn(t,e,n)}function Gn(t,e,n){return Ht.create(n.f,Fn(t,e,n.source))}function Hn(t,e,n){return t+=n.min,e=Math.min(e+n.min,n.max),new Jn(t,e,n.source)}function Jn(t,e,n){this.source=n,this.min=t,this.max=e}function Kn(t,e,n,i,r){this.sink=i,this.skip=t,this.take=e,this.disposable=T(n.run(this,r))}function Qn(t,n){return new e(new Xn(t,n.source))}function Xn(t,e){this.p=t,this.source=e}function Yn(t,e,n,i){this.p=t,this.sink=n,this.active=!0,this.disposable=T(e.run(this,i))}function Zn(t,n){return new e(new $n(t,n.source))}function $n(t,e){this.p=t,this.source=e}function ti(t,e){this.p=t,this.sink=e,this.skipping=!0}function ei(t,n){return new e(new ri(t.source,n.source))}function ni(t,n){return new e(new oi(t.source,n.source))}function ii(t,e){return ei(nn(t),ni(t,e))}function ri(t,e){this.maxSignal=t,this.source=e}function oi(t,e){this.minSignal=t,this.source=e}function si(t,e){this.value=t,this.sink=e}function ui(t,e,n){this.min=t,this.max=e,this.sink=n}function hi(t,e,n){this.value=1/0,this.sink=e,this.disposable=t.run(this,n)}function ci(t,e,n){this.value=1/0,this.sink=e,this.disposable=t.run(this,n)}function pi(){}function fi(t,n){return t<=0?n:new e(new ai(t,n.source))}function ai(t,e){this.dt=t,this.source=e}function di(t,e,n){this.dt=t,this.sink=e,this.scheduler=n}function li(t){return new e(new yi(t.source))}function yi(t){this.source=t}function vi(t){this.sink=t}function wi(t,n){return new e(ki(t,n.source))}function ki(t,e){return e instanceof Ht?mi(t,e):e instanceof bi?_i(t,e):new bi(t,e)}function mi(t,e){return Ht.create(e.f,ki(t,e.source))}function _i(t,e){return new bi(Math.max(t,e.period),e.source)}function bi(t,e){this.period=t,this.source=e}function gi(t,e){this.time=0,this.period=t,this.sink=e}function xi(t,n){return new e(new Ei(t,n.source))}function Ei(t,e){this.dt=t,this.source=e}function Ai(t,e,n,i){this.dt=t,this.sink=n,this.scheduler=i,this.value=void 0,this.timer=null;var r=e.run(this,i);this.disposable=g([this,r])}function Ti(t){return Pi(N(t))}function Pi(t){return new e(new Mi(t.source))}function Mi(t){this.source=t}function Ri(t,e){this.sink=t,this.scheduler=e,this.queue=Promise.resolve();var n=this;this._eventBound=function(t){n.sink.event(n.scheduler.now(),t)},this._endBound=function(t){n.sink.end(n.scheduler.now(),t)},this._errorBound=function(t){n.sink.error(n.scheduler.now(),t)}}function Ii(t){this.sink=t,this.active=!0}function Li(t,n){return new e(new qi(t,n.source))}function Wi(t){return new e(new Ci(t))}function Ci(t){this.value=t}function Ni(t,e,n){n.error(t,e)}function qi(t,e){this.f=t,this.source=e}function Bi(t,e,n,i){this.f=t,this.sink=new Ii(n),this.scheduler=i,this.disposable=e.run(this,i)}function Si(t,e,n){try{n.event(t,e)}catch(e){n.error(t,e)}}function ji(t,e,n){try{n.end(t,e)}catch(e){n.error(t,e)}}function Vi(t){var e=t.source;return e instanceof ur?t:new t.constructor(new ur(e))}var Di=function(t){return t},Ui=function(t,e){return function(n){return t(e(n))}},zi=function(t,e){return t(e)};v.prototype.dispose=function(){return this._dispose(this._data)},w.prototype.setDisposable=function(t){if(void 0!==this.disposable)throw new Error("setDisposable called more than once");this.disposable=t,this.disposed&&this._resolve(t.dispose())},w.prototype.dispose=function(){return this.disposed?this.result:(this.disposed=!0,void 0!==this.disposable&&(this.result=this.disposable.dispose()),this.result)};var Oi=h,Fi=Di;I.event=function(t,e){return new I(W,t,e)},I.end=function(t,e){return new I(C,t,e)},I.error=function(t,e){return new I(L,t,e)},I.prototype.dispose=function(){this.active=!1},I.prototype.run=function(t){this.active&&this._run(t,this.value,this.sink)},I.prototype.error=function(t,e){return this.active?void this.sink.error(t,e):R(e)},q.prototype.run=function(t,e){return e.asap(new I(B,this.value,t))},j.prototype.run=function(t,e){var n=I.end(void 0,t);return e.asap(n),_(V,n)};var Gi=new e(new j);U.prototype.run=function(){return b()};var Hi=new e(new U);O.prototype.run=function(t,e){return e.asap(new I(F,this.array,t))};var Ji;Ji="function"==typeof Set&&"function"==typeof(new Set)["@@iterator"]?"@@iterator":"function"==typeof Symbol&&Symbol.iterator||"_es6shim_iterator_",K.prototype.run=function(t,e){return new Q(H(this.iterable),t,e)},Q.prototype.dispose=function(){return this.task.dispose()};var Ki;Ki="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof module?module:Function("return this")();var Qi=Y(Ki);tt.prototype.run=function(t,e){var n=this.observable.subscribe(new et(t,e));if("function"==typeof n)return _(n);if(n&&"function"==typeof n.unsubscribe)return _(nt,n);throw new TypeError("Observable returned invalid subscription "+String(n))},et.prototype.next=function(t){this.sink.event(this.scheduler.now(),t)},et.prototype.complete=function(t){this.sink.end(this.scheduler.now(),t)},et.prototype.error=function(t){this.sink.error(this.scheduler.now(),t)},ot.prototype.run=function(t,e){return e.periodic(this.period,I.event(this.value,t))},st.prototype.run=function(){return this.task.run(this.time)},st.prototype.error=function(t){return this.task.error(this.time,t)},st.prototype.dispose=function(){return this.scheduler.cancel(this),this.task.dispose()},ct.prototype.now=function(){return this.timer.now()},ct.prototype.asap=function(t){return this.schedule(0,-1,t)},ct.prototype.delay=function(t,e){return this.schedule(t,-1,e)},ct.prototype.periodic=function(t,e){return this.schedule(0,t,e)},ct.prototype.schedule=function(t,e,n){var i=this.now(),r=new st(i+Math.max(0,t),e,n,this);return this.timeline.add(r),this._scheduleNextRun(i),r},ct.prototype.cancel=function(t){t.active=!1,this.timeline.remove(t)&&this._reschedule()},ct.prototype.cancelAll=function(t){this.timeline.removeAll(t),this._reschedule()},ct.prototype._reschedule=function(){this.timeline.isEmpty()?this._unschedule():this._scheduleNextRun(this.now())},ct.prototype._unschedule=function(){this.timer.clearTimer(this._timer),this._timer=null},ct.prototype._scheduleNextRun=function(t){if(!this.timeline.isEmpty()){var e=this.timeline.nextArrival();null===this._timer?this._scheduleNextArrival(e,t):e<this._nextArrival&&(this._unschedule(),this._scheduleNextArrival(e,t))}},ct.prototype._scheduleNextArrival=function(t,e){this._nextArrival=t;var n=Math.max(0,t-e);this._timer=this.timer.setTimer(this._runReadyTasksBound,n)},ct.prototype._runReadyTasks=function(t){this._timer=null,this.timeline.runTasks(t,ht),this._scheduleNextRun(this.now())},pt.prototype.now=Date.now,pt.prototype.setTimer=function(t,e){return e<=0?at(t):setTimeout(t,e)},pt.prototype.clearTimer=function(t){return t instanceof ft?t.cancel():clearTimeout(t)},ft.prototype.run=function(){return this.active&&this.f()},ft.prototype.error=function(t){throw t},ft.prototype.cancel=function(){this.active=!1},dt.prototype.nextArrival=function(){return this.isEmpty()?1/0:this.tasks[0].time},dt.prototype.isEmpty=function(){return 0===this.tasks.length},dt.prototype.add=function(t){yt(t,this.tasks)},dt.prototype.remove=function(t){var e=wt(t.time,this.tasks);if(e>=0&&e<this.tasks.length){var n=l(t,this.tasks[e].events);if(n>=0)return this.tasks[e].events.splice(n,1),!0}return!1},dt.prototype.removeAll=function(t){for(var e=this,n=0,i=this.tasks.length;n<i;++n)vt(t,e.tasks[n])},dt.prototype.runTasks=function(t,e){for(var n=this,i=this.tasks,r=i.length,o=0;o<r&&i[o].time<=t;)++o;this.tasks=i.slice(o);for(var s=0;s<o;++s)n.tasks=lt(e,i[s],n.tasks)};var Xi=new ct(new pt,new dt);_t.prototype.event=function(t,e){"function"==typeof this.subscriber.next&&this.subscriber.next(e)},_t.prototype.end=function(t,e){var n=this.subscriber;gt(this.fatalError,n,n.complete,n.error,this.disposable,e)},_t.prototype.error=function(t,e){var n=this.subscriber;gt(this.fatalError,n,n.error,n.error,this.disposable,e)},bt.prototype.unsubscribe=function(){this.disposable.dispose()},Tt.prototype.run=function(t,e){function n(n){Et(e.now(),n,t)}return this.source.addEventListener(this.event,n,this.capture),_(Pt,{target:this,addEvent:n})},Mt.prototype.event=function(t,e){this.active&&(0===this.events.length&&ut(new Rt(this.sink,t,this.events)),this.events.push({time:t,value:e}))},Mt.prototype.end=function(t,e){this.active&&this._end(new It(t,e,this.sink))},Mt.prototype.error=function(t,e){this._end(new Lt(t,e,this.sink))},Mt.prototype._end=function(t){this.active=!1,ut(t)},Rt.prototype.run=function(){for(var t,e=this,n=this.events,i=this.sink,r=0,o=n.length;r<o;++r)t=n[r],e.time=t.time,i.event(t.time,t.value);n.length=0},Rt.prototype.error=function(t){this.sink.error(this.time,t)},It.prototype.run=function(){this.sink.end(this.time,this.value)},It.prototype.error=function(t){this.sink.error(this.time,t)},Lt.prototype.run=function(){this.sink.error(this.time,this.value)},Lt.prototype.error=function(t){throw t},Wt.prototype.run=function(t,e){function n(t){var n=arguments,r=arguments.length;if(r>1){for(var o=new Array(r),s=0;s<r;++s)o[s]=n[s];Et(e.now(),o,i)}else Et(e.now(),t,i)}var i=new Mt(t);return this.source.addListener(this.event,n),_(Ct,{target:this,addEvent:n})},jt.prototype.event=function(t,e){},jt.prototype.end=function(t,e){this.active&&(this.active=!1,Vt(this._end,this._error,this._disposable,e))},jt.prototype.error=function(t,e){this.active=!1,Vt(this._error,this._error,this._disposable,e)},Dt.prototype.event=function(t,e){return this.sink.event(t,e)},Dt.prototype.end=function(t,e){return this.sink.end(t,e)},Dt.prototype.error=function(t,e){return this.sink.error(t,e)},Ut.create=function(t,e){return e instanceof Ut?new Ut(Ot(e.p,t),e.source):new Ut(t,e)},Ut.prototype.run=function(t,e){return this.source.run(new zt(this.p,t),e)},zt.prototype.end=Dt.prototype.end,zt.prototype.error=Dt.prototype.error,zt.prototype.event=function(t,e){var n=this.p;n(e)&&this.sink.event(t,e)},Ft.prototype.run=function(t,e){return this.source.run(new Gt(this.p,this.f,t),e)},Gt.prototype.event=function(t,e){var n=this.f,i=this.p;i(e)&&this.sink.event(t,n(e))},Gt.prototype.end=Dt.prototype.end,Gt.prototype.error=Dt.prototype.error,Ht.create=function(t,e){return e instanceof Ht?new Ht(Ui(t,e.f),e.source):e instanceof Ut?new Ft(e.p,t,e.source):new Ht(t,e)},Ht.prototype.run=function(t,e){return this.source.run(new Jt(this.f,t),e)},Jt.prototype.end=Dt.prototype.end,Jt.prototype.error=Dt.prototype.error,Jt.prototype.event=function(t,e){var n=this.f;this.sink.event(t,n(e))},Yt.prototype.run=function(t,e){return this.source.run(new Zt(this.f,t),e)},Zt.prototype.end=Dt.prototype.end,Zt.prototype.error=Dt.prototype.error,Zt.prototype.event=function(t,e){var n=this.f;n(e),this.sink.event(t,e)},ne.prototype.run=function(t,e){return this.source.run(new ie(this.step,this.seed,t),e)},ie.prototype.error=Dt.prototype.error,ie.prototype.event=function(t,e){var n=this.step(this.seed,e);this.seed=n.seed,this.sink.event(t,n.value)},ie.prototype.end=function(t){this.sink.end(t,this.seed)},oe.prototype.run=function(t,e){var n=e.asap(I.event(this.value,t)),i=this.source.run(new se(this.f,this.value,t),e);return g([n,i])},se.prototype.event=function(t,e){var n=this.f;this.value=n(this.value,e),this.sink.event(t,this.value)},se.prototype.error=Dt.prototype.error,se.prototype.end=Dt.prototype.end,he.prototype.run=function(t,e){return this.source.run(new ce(this.f,this.value,t),e)},ce.prototype.event=function(t,e){var n=this.f;this.value=n(this.value,e),this.sink.event(t,this.value)},ce.prototype.error=Dt.prototype.error,ce.prototype.end=function(t){this.sink.end(t,this.value)},fe.prototype.run=function(t,e){return new ae(this.f,this.value,t,e)},ae.prototype.dispose=function(){this.active=!1},ve.prototype.run=function(t,e){return new we(this.f,this.value,t,e)},we.prototype.dispose=function(){this.active=!1},be.prototype.run=function(t,e){return new ge(this.f.apply(void 0,this.args),t,e)},ge.prototype.dispose=function(){this.active=!1},Me.prototype.run=function(t,e){return new Re(this.f,this.source,t,e)},Re.prototype.error=Dt.prototype.error,Re.prototype.event=function(t,e){this.active&&this.sink.event(t,e)},Re.prototype.end=function(t,e){this.active&&(m(t,this.disposable,this.sink),this._startNext(t,e,this.sink))},Re.prototype._startNext=function(t,e,n){try{this.disposable=this._continue(this.f,e,n)}catch(e){n.error(t,e)}},Re.prototype._continue=function(t,e,n){return t(e).source.run(n,this.scheduler)},Re.prototype.dispose=function(){return this.active=!1,this.disposable.dispose()},We.prototype.event=function(t,e){this.active&&(this.value=e,this.sink.event(t,this))},We.prototype.end=function(t,e){this.active&&(this.active=!1,this.sink.end(t,{index:this.index,value:e}))},We.prototype.error=Dt.prototype.error;var Yi=h,Zi=s;je.prototype.run=function(t,e){for(var n,i=this,r=this.sources.length,o=new Array(r),s=new Array(r),u=new Ve(o,s,t,this.f),h=0;h<r;++h)n=s[h]=new We(h,u),o[h]=i.sources[h].run(n,e);return g(o)},Ve.prototype.error=Dt.prototype.error,Ve.prototype.event=function(t,e){var n=e.index,i=this._updateReady(n);this.values[n]=e.value,0===i&&this.sink.event(t,Ce(this.f,this.values))},Ve.prototype._updateReady=function(t){return this.awaiting>0&&(this.hasValue[t]||(this.hasValue[t]=!0,this.awaiting-=1)),this.awaiting},Ve.prototype.end=function(t,e){m(t,this.disposables[e.index],this.sink),0===--this.activeCount&&this.sink.end(t,e.value)},ze.prototype.run=function(t,e){var n=this.transducer(new Fe(t));return this.source.run(new Oe(Ge(n),t),e)},Oe.prototype.event=function(t,e){var n=this.xf.step(t,e);return this.xf.isReduced(n)?this.sink.end(t,this.xf.getResult(n)):n},Oe.prototype.end=function(t,e){return this.xf.result(e)},Oe.prototype.error=function(t,e){return this.sink.error(t,e)},Fe.prototype["@@transducer/init"]=Fe.prototype.init=function(){},Fe.prototype["@@transducer/step"]=Fe.prototype.step=function(t,e){return isNaN(t)||(this.time=Math.max(t,this.time)),this.sink.event(this.time,e)},Fe.prototype["@@transducer/result"]=Fe.prototype.result=function(t){return this.sink.end(this.time,t)},He.prototype.step=function(t,e){return this.tx["@@transducer/step"](t,e)},He.prototype.result=function(t){return this.tx["@@transducer/result"](t)},He.prototype.isReduced=function(t){return null!=t&&t["@@transducer/reduced"]},He.prototype.getResult=function(t){return t["@@transducer/value"]},Je.prototype.step=function(t,e){return this.tx.step(t,e)},Je.prototype.result=function(t){return this.tx.result(t)},Je.prototype.isReduced=function(t){return null!=t&&t.__transducers_reduced__},Je.prototype.getResult=function(t){return t.value},Ke.prototype.add=function(t){null!==this.head&&(this.head.prev=t,t.next=this.head),this.head=t,++this.length},Ke.prototype.remove=function(t){--this.length,t===this.head&&(this.head=this.head.next),null!==t.next&&(t.next.prev=t.prev,t.next=null),null!==t.prev&&(t.prev.next=t.next,t.prev=null)},Ke.prototype.isEmpty=function(){return 0===this.length},Ke.prototype.dispose=function(){if(this.isEmpty())return Promise.resolve();var t=[],e=this.head;for(this.head=null,this.length=0;null!==e;)t.push(e.dispose()),e=e.next;return Promise.all(t)},Ye.prototype.run=function(t,e){return new Ze(this.f,this.concurrency,this.source,t,e)},Ze.prototype.event=function(t,e){this._addInner(t,e)},Ze.prototype._addInner=function(t,e){this.current.length<this.concurrency?this._startInner(t,e):this.pending.push(e)},Ze.prototype._startInner=function(t,e){try{this._initInner(t,e)}catch(e){this.error(t,e)}},Ze.prototype._initInner=function(t,e){var n=new tn(t,this,this.sink);n.disposable=$e(this.f,e,n,this.scheduler),this.current.add(n)},Ze.prototype.end=function(t,e){this.active=!1,m(t,this.disposable,this.sink),this._checkEnd(t,e)},Ze.prototype.error=function(t,e){this.active=!1,this.sink.error(t,e)},Ze.prototype.dispose=function(){return this.active=!1,this.pending.length=0,Promise.all([this.disposable.dispose(),this.current.dispose()])},Ze.prototype._endInner=function(t,e,n){this.current.remove(n),m(t,n,this),0===this.pending.length?this._checkEnd(t,e):this._startInner(t,this.pending.shift())},Ze.prototype._checkEnd=function(t,e){!this.active&&this.current.isEmpty()&&this.sink.end(t,e)},tn.prototype.event=function(t,e){this.sink.event(Math.max(t,this.time),e)},tn.prototype.end=function(t,e){this.outer._endInner(Math.max(t,this.time),e,this)},tn.prototype.error=function(t,e){this.outer.error(Math.max(t,this.time),e)},tn.prototype.dispose=function(){return this.disposable.dispose()};var $i=u,tr=c;cn.prototype.run=function(t,e){for(var n,i=this,r=this.sources.length,o=new Array(r),s=new Array(r),u=new pn(o,s,t),h=0;h<r;++h)n=s[h]=new We(h,u),o[h]=i.sources[h].run(n,e);return g(o)},pn.prototype.error=Dt.prototype.error,pn.prototype.event=function(t,e){this.sink.event(t,e.value)},pn.prototype.end=function(t,e){m(t,this.disposables[e.index],this.sink),0===--this.activeCount&&this.sink.end(t,e.value)},yn.prototype.run=function(t,e){for(var n,i=this,r=this.sources.length,o=new Array(r+1),s=new Array(r),u=new wn(this.f,s,t),h=0;h<r;++h)n=s[h]=new vn(u),o[h]=i.sources[h].run(n,e);return o[h]=this.sampler.run(u,e),g(o)},vn.prototype.event=function(t,e){this.value=e,this.hasValue=!0,this.sink._notify(this)},vn.prototype.end=function(){},vn.prototype.error=Dt.prototype.error,wn.prototype._notify=function(){this.active||(this.active=this.sinks.every(kn))},wn.prototype.event=function(t){this.active&&this.sink.event(t,Ce(this.f,h(mn,this.sinks)))},wn.prototype.end=Dt.prototype.end,wn.prototype.error=Dt.prototype.error,_n.prototype.push=function(t){var e=this._length;this._checkCapacity(e+1);var n=this._head+e&this._capacity-1;this[n]=t,this._length=e+1},_n.prototype.shift=function(){var t=this._head,e=this[t];return this[t]=void 0,this._head=t+1&this._capacity-1,this._length--,e},_n.prototype.isEmpty=function(){return 0===this._length},_n.prototype.length=function(){return this._length},_n.prototype._checkCapacity=function(t){this._capacity<t&&this._ensureCapacity(this._capacity<<1)},_n.prototype._ensureCapacity=function(t){var e=this._capacity;this._capacity=t;var n=this._head+this._length;n>e&&bn(this,0,this,e,n&e-1)};var er=h,nr=s;An.prototype.run=function(t,e){for(var n,i=this,r=this.sources.length,o=new Array(r),s=new Array(r),u=new Array(r),h=new Tn(this.f,u,s,t),c=0;c<r;++c)u[c]=new _n,
n=s[c]=new We(c,h),o[c]=i.sources[c].run(n,e);return g(o)},Tn.prototype.event=function(t,e){var n=this.buffers,i=n[e.index];if(i.push(e.value),1===i.length()){if(!In(this.buffers))return;Pn(this.f,t,n,this.sink),Rn(this.buffers,this.sinks)&&this.sink.end(t,void 0)}},Tn.prototype.end=function(t,e){var n=this.buffers[e.index];n.isEmpty()&&this.sink.end(t,e.value)},Tn.prototype.error=Dt.prototype.error,Wn.prototype.run=function(t,e){var n=new Cn(t,e);return g([n,this.source.run(n,e)])},Cn.prototype.event=function(t,e){this._disposeCurrent(t),this.current=new Nn(t,1/0,this,this.sink),this.current.disposable=e.source.run(this.current,this.scheduler)},Cn.prototype.end=function(t,e){this.ended=!0,this._checkEnd(t,e)},Cn.prototype.error=function(t,e){this.ended=!0,this.sink.error(t,e)},Cn.prototype.dispose=function(){return this._disposeCurrent(this.scheduler.now())},Cn.prototype._disposeCurrent=function(t){if(null!==this.current)return this.current._dispose(t)},Cn.prototype._disposeInner=function(t,e){e._dispose(t),e===this.current&&(this.current=null)},Cn.prototype._checkEnd=function(t,e){this.ended&&null===this.current&&this.sink.end(t,e)},Cn.prototype._endInner=function(t,e,n){this._disposeInner(t,n),this._checkEnd(t,e)},Cn.prototype._errorInner=function(t,e,n){this._disposeInner(t,n),this.sink.error(t,e)},Nn.prototype.event=function(t,e){t<this.max&&this.sink.event(Math.max(t,this.min),e)},Nn.prototype.end=function(t,e){this.outer._endInner(Math.max(t,this.min),e,this)},Nn.prototype.error=function(t,e){this.outer._errorInner(Math.max(t,this.min),e,this)},Nn.prototype._dispose=function(t){this.max=t,m(t,this.disposable,this.sink)},jn.prototype.run=function(t,e){return this.source.run(new Vn(this.equals,t),e)},Vn.prototype.end=Dt.prototype.end,Vn.prototype.error=Dt.prototype.error,Vn.prototype.event=function(t,e){this.init?(this.init=!1,this.value=e,this.sink.event(t,e)):this.equals(this.value,e)||(this.value=e,this.sink.event(t,e))},Jn.prototype.run=function(t,e){return new Kn(this.min,this.max-this.min,this.source,t,e)},Kn.prototype.end=Dt.prototype.end,Kn.prototype.error=Dt.prototype.error,Kn.prototype.event=function(t,e){return this.skip>0?void(this.skip-=1):void(0!==this.take&&(this.take-=1,this.sink.event(t,e),0===this.take&&(this.dispose(),this.sink.end(t,e))))},Kn.prototype.dispose=function(){return this.disposable.dispose()},Xn.prototype.run=function(t,e){return new Yn(this.p,this.source,t,e)},Yn.prototype.end=Dt.prototype.end,Yn.prototype.error=Dt.prototype.error,Yn.prototype.event=function(t,e){if(this.active){var n=this.p;this.active=n(e),this.active?this.sink.event(t,e):(this.dispose(),this.sink.end(t,e))}},Yn.prototype.dispose=function(){return this.disposable.dispose()},$n.prototype.run=function(t,e){return this.source.run(new ti(this.p,t),e)},ti.prototype.end=Dt.prototype.end,ti.prototype.error=Dt.prototype.error,ti.prototype.event=function(t,e){if(this.skipping){var n=this.p;if(this.skipping=n(e),this.skipping)return}this.sink.event(t,e)},ri.prototype.run=function(t,e){var n=new si(-(1/0),t),i=new ci(this.maxSignal,t,e),r=this.source.run(new ui(n,i,t),e);return g([n,i,r])},oi.prototype.run=function(t,e){var n=new hi(this.minSignal,t,e),i=new si(1/0,t),r=this.source.run(new ui(n,i,t),e);return g([n,i,r])},si.prototype.error=Dt.prototype.error,si.prototype.event=pi,si.prototype.end=pi,si.prototype.dispose=pi,ui.prototype.event=function(t,e){t>=this.min.value&&t<this.max.value&&this.sink.event(t,e)},ui.prototype.error=Dt.prototype.error,ui.prototype.end=Dt.prototype.end,hi.prototype.event=function(t){t<this.value&&(this.value=t)},hi.prototype.end=pi,hi.prototype.error=Dt.prototype.error,hi.prototype.dispose=function(){return this.disposable.dispose()},ci.prototype.event=function(t,e){t<this.value&&(this.value=t,this.sink.end(t,e))},ci.prototype.end=pi,ci.prototype.error=Dt.prototype.error,ci.prototype.dispose=function(){return this.disposable.dispose()},ai.prototype.run=function(t,e){var n=new di(this.dt,t,e);return g([n,this.source.run(n,e)])},di.prototype.dispose=function(){var t=this;this.scheduler.cancelAll(function(e){return e.sink===t.sink})},di.prototype.event=function(t,e){this.scheduler.delay(this.dt,I.event(e,this.sink))},di.prototype.end=function(t,e){this.scheduler.delay(this.dt,I.end(e,this.sink))},di.prototype.error=Dt.prototype.error,yi.prototype.run=function(t,e){return this.source.run(new vi(t),e)},vi.prototype.end=Dt.prototype.end,vi.prototype.error=Dt.prototype.error,vi.prototype.event=function(t,e){this.sink.event(t,{time:t,value:e})},bi.prototype.run=function(t,e){return this.source.run(new gi(this.period,t),e)},gi.prototype.event=function(t,e){t>=this.time&&(this.time=t+this.period,this.sink.event(t,e))},gi.prototype.end=Dt.prototype.end,gi.prototype.error=Dt.prototype.error,Ei.prototype.run=function(t,e){return new Ai(this.dt,this.source,t,e)},Ai.prototype.event=function(t,e){this._clearTimer(),this.value=e,this.timer=this.scheduler.delay(this.dt,I.event(e,this.sink))},Ai.prototype.end=function(t,e){this._clearTimer()&&(this.sink.event(t,this.value),this.value=void 0),this.sink.end(t,e)},Ai.prototype.error=function(t,e){this._clearTimer(),this.sink.error(t,e)},Ai.prototype.dispose=function(){this._clearTimer()},Ai.prototype._clearTimer=function(){return null!==this.timer&&(this.timer.dispose(),this.timer=null,!0)},Mi.prototype.run=function(t,e){return this.source.run(new Ri(t,e),e)},Ri.prototype.event=function(t,e){var n=this;this.queue=this.queue.then(function(){return n._event(e)}).catch(this._errorBound)},Ri.prototype.end=function(t,e){var n=this;this.queue=this.queue.then(function(){return n._end(e)}).catch(this._errorBound)},Ri.prototype.error=function(t,e){var n=this;this.queue=this.queue.then(function(){return n._errorBound(e)}).catch(R)},Ri.prototype._event=function(t){return t.then(this._eventBound)},Ri.prototype._end=function(t){return Promise.resolve(t).then(this._endBound)},Ii.prototype.event=function(t,e){this.active&&this.sink.event(t,e)},Ii.prototype.end=function(t,e){this.active&&(this.disable(),this.sink.end(t,e))},Ii.prototype.error=function(t,e){this.disable(),this.sink.error(t,e)},Ii.prototype.disable=function(){return this.active=!1,this.sink};var ir=Li;Ci.prototype.run=function(t,e){return e.asap(new I(Ni,this.value,t))},qi.prototype.run=function(t,e){return new Bi(this.f,this.source,t,e)},Bi.prototype.event=function(t,e){Et(t,e,this.sink)},Bi.prototype.end=function(t,e){At(t,e,this.sink)},Bi.prototype.error=function(t,e){var n=this.sink.disable();m(t,this.disposable,this.sink),this._startNext(t,e,n)},Bi.prototype._startNext=function(t,e,n){try{this.disposable=this._continue(this.f,e,n)}catch(e){n.error(t,e)}},Bi.prototype._continue=function(t,e,n){var i=t(e);return i.source.run(n,this.scheduler)},Bi.prototype.dispose=function(){return this.disposable.dispose()};var rr=function(t,e){this.source=t,this.sink=e,this.disposed=!1};rr.prototype.dispose=function(){if(!this.disposed){this.disposed=!0;var t=this.source.remove(this.sink);return 0===t&&this.source._dispose()}};var or=function(t){return t.dispose()},sr={dispose:function(){}},ur=function(t){this.source=t,this.sinks=[],this._disposable=sr};ur.prototype.run=function(t,e){var n=this.add(t);return 1===n&&(this._disposable=this.source.run(this,e)),new rr(this,t)},ur.prototype._dispose=function(){var t=this._disposable;return this._disposable=sr,Promise.resolve(t).then(or)},ur.prototype.add=function(t){return this.sinks=i(t,this.sinks),this.sinks.length},ur.prototype.remove=function(t){var e=l(t,this.sinks);return e>=0&&(this.sinks=f(e,this.sinks)),this.sinks.length},ur.prototype.event=function(t,e){var n=this.sinks;if(1===n.length)return n[0].event(t,e);for(var i=0;i<n.length;++i)Si(t,e,n[i])},ur.prototype.end=function(t,e){for(var n=this.sinks,i=0;i<n.length;++i)ji(t,e,n[i])},ur.prototype.error=function(t,e){for(var n=this.sinks,i=0;i<n.length;++i)n[i].error(t,e)},e.of=N,e.empty=S,e.from=it,e.prototype.subscribe=function(t){return mt(t,this)},e.prototype[Qi]=function(){return this},e.prototype.thru=function(t){return xt(t,this)},e.prototype.observe=e.prototype.forEach=function(t){return $t(t,this)},e.prototype.drain=function(){return te(this)},e.prototype.loop=function(t,e){return ee(t,e,this)},e.prototype.scan=function(t,e){return re(t,e,this)},e.prototype.reduce=function(t,e){return ue(t,e,this)},e.prototype.concat=function(t){return Le(this,t)},e.prototype.startWith=function(t){return Ie(t,this)},e.prototype.map=function(t){return Kt(t,this)},e.prototype.ap=function(t){return De(this,t)},e.prototype.constant=function(t){return Qt(t,this)},e.prototype.tap=function(t){return Xt(t,this)},e.prototype.transduce=function(t){return Ue(t,this)},e.prototype.flatMap=e.prototype.chain=function(t){return en(t,this)},e.prototype.join=function(){return nn(this)},e.prototype.continueWith=e.prototype.flatMapEnd=function(t){return Pe(t,this)},e.prototype.concatMap=function(t){return rn(t,this)},e.prototype.mergeConcurrently=function(t){return Qe(t,this)},e.prototype.merge=function(){return sn(n(this,arguments))},e.prototype.combine=function(t){return qe(t,p(this,0,arguments))},e.prototype.sampleWith=function(t){return an(t,this)},e.prototype.sample=function(t){return dn(t,this,s(arguments))},e.prototype.zip=function(t){return xn(t,p(this,0,arguments))},e.prototype.switch=e.prototype.switchLatest=function(){return Ln(this)},e.prototype.filter=function(t){return qn(t,this)},e.prototype.skipRepeats=function(){return Bn(this)},e.prototype.skipRepeatsWith=function(t){return Sn(t,this)},e.prototype.take=function(t){return Un(t,this)},e.prototype.skip=function(t){return zn(t,this)},e.prototype.slice=function(t,e){return On(t,e,this)},e.prototype.takeWhile=function(t){return Qn(t,this)},e.prototype.skipWhile=function(t){return Zn(t,this)},e.prototype.until=e.prototype.takeUntil=function(t){return ei(t,this)},e.prototype.since=e.prototype.skipUntil=function(t){return ni(t,this)},e.prototype.during=function(t){return ii(t,this)},e.prototype.delay=function(t){return fi(t,this)},e.prototype.timestamp=function(){return li(this)},e.prototype.throttle=function(t){return wi(t,this)},e.prototype.debounce=function(t){return xi(t,this)},e.prototype.await=function(){return Pi(this)},e.prototype.recoverWith=e.prototype.flatMapError=function(t){return ir(t,this)},e.prototype.multicast=function(){return Vi(this)},t.Stream=e,t.of=N,t.just=N,t.empty=S,t.never=D,t.from=it,t.periodic=rt,t.observe=$t,t.forEach=$t,t.drain=te,t.loop=ee,t.scan=re,t.reduce=ue,t.concat=Le,t.startWith=Ie,t.map=Kt,t.constant=Qt,t.tap=Xt,t.ap=De,t.transduce=Ue,t.flatMap=en,t.chain=en,t.join=nn,t.continueWith=Pe,t.flatMapEnd=Pe,t.concatMap=rn,t.mergeConcurrently=Qe,t.merge=on,t.mergeArray=sn,t.combine=Ne,t.combineArray=qe,t.sample=fn,t.sampleArray=dn,t.sampleWith=an,t.zip=gn,t.zipArray=xn,t.switchLatest=Ln,t.switch=Ln,t.filter=qn,t.skipRepeats=Bn,t.distinct=Bn,t.skipRepeatsWith=Sn,t.distinctBy=Sn,t.take=Un,t.skip=zn,t.slice=On,t.takeWhile=Qn,t.skipWhile=Zn,t.takeUntil=ei,t.until=ei,t.skipUntil=ni,t.since=ni,t.during=ii,t.delay=fi,t.timestamp=li,t.throttle=wi,t.debounce=xi,t.fromPromise=Ti,t.awaitPromises=Pi,t.await=Pi,t.recoverWith=Li,t.flatMapError=ir,t.throwError=Wi,t.multicast=Vi,t.fromEvent=Nt,t.unfold=pe,t.iterate=ye,t.generate=_e,Object.defineProperty(t,"__esModule",{value:!0})});
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?factory(exports):typeof define==="function"&&define.amd?define('@most/prelude',["exports"],factory):factory(global.mostPrelude=global.mostPrelude||{})})(this,function(exports){"use strict";function cons(x,a){var l=a.length;var b=new Array(l+1);b[0]=x;for(var i=0;i<l;++i){b[i+1]=a[i]}return b}function append(x,a){var l=a.length;var b=new Array(l+1);for(var i=0;i<l;++i){b[i]=a[i]}b[l]=x;return b}function drop(n,a){if(n<0){throw new TypeError("n must be >= 0")}var l=a.length;if(n===0||l===0){return a}if(n>=l){return[]}return unsafeDrop(n,a,l-n)}function unsafeDrop(n,a,l){var b=new Array(l);for(var i=0;i<l;++i){b[i]=a[n+i]}return b}function tail(a){return drop(1,a)}function copy(a){var l=a.length;var b=new Array(l);for(var i=0;i<l;++i){b[i]=a[i]}return b}function map(f,a){var l=a.length;var b=new Array(l);for(var i=0;i<l;++i){b[i]=f(a[i])}return b}function reduce(f,z,a){var r=z;for(var i=0,l=a.length;i<l;++i){r=f(r,a[i],i)}return r}function replace(x,i,a){if(i<0){throw new TypeError("i must be >= 0")}var l=a.length;var b=new Array(l);for(var j=0;j<l;++j){b[j]=i===j?x:a[j]}return b}function remove(i,a){if(i<0){throw new TypeError("i must be >= 0")}var l=a.length;if(l===0||i>=l){return a}if(l===1){return[]}return unsafeRemove(i,a,l-1)}function unsafeRemove(i,a,l){var b=new Array(l);var j;for(j=0;j<i;++j){b[j]=a[j]}for(j=i;j<l;++j){b[j]=a[j+1]}return b}function removeAll(f,a){var l=a.length;var b=new Array(l);var j=0;for(var x,i=0;i<l;++i){x=a[i];if(!f(x)){b[j]=x;++j}}b.length=j;return b}function findIndex(x,a){for(var i=0,l=a.length;i<l;++i){if(x===a[i]){return i}}return-1}function isArrayLike(x){return x!=null&&typeof x.length==="number"&&typeof x!=="function"}var id=function(x){return x};var compose=function(f,g){return function(x){return f(g(x))}};var apply=function(f,x){return f(x)};function curry2(f){function curried(a,b){switch(arguments.length){case 0:return curried;case 1:return function(b){return f(a,b)};default:return f(a,b)}}return curried}function curry3(f){function curried(a,b,c){switch(arguments.length){case 0:return curried;case 1:return curry2(function(b,c){return f(a,b,c)});case 2:return function(c){return f(a,b,c)};default:return f(a,b,c)}}return curried}exports.cons=cons;exports.append=append;exports.drop=drop;exports.tail=tail;exports.copy=copy;exports.map=map;exports.reduce=reduce;exports.replace=replace;exports.remove=remove;exports.removeAll=removeAll;exports.findIndex=findIndex;exports.isArrayLike=isArrayLike;exports.id=id;exports.compose=compose;exports.apply=apply;exports.curry2=curry2;exports.curry3=curry3;Object.defineProperty(exports,"__esModule",{value:true})});
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?factory(exports,require("@most/prelude")):typeof define==="function"&&define.amd?define('@most/multicast',["exports","@most/prelude"],factory):factory(global.mostMulticast=global.mostMulticast||{},global.mostPrelude)})(this,function(exports,_most_prelude){"use strict";var MulticastDisposable=function MulticastDisposable(source,sink){this.source=source;this.sink=sink;this.disposed=false};MulticastDisposable.prototype.dispose=function dispose(){if(this.disposed){return}this.disposed=true;var remaining=this.source.remove(this.sink);return remaining===0&&this.source._dispose()};function tryEvent(t,x,sink){try{sink.event(t,x)}catch(e){sink.error(t,e)}}function tryEnd(t,x,sink){try{sink.end(t,x)}catch(e){sink.error(t,e)}}var dispose=function(disposable){return disposable.dispose()};var emptyDisposable={dispose:function dispose$1(){}};var MulticastSource=function MulticastSource(source){this.source=source;this.sinks=[];this._disposable=emptyDisposable};MulticastSource.prototype.run=function run(sink,scheduler){var n=this.add(sink);if(n===1){this._disposable=this.source.run(this,scheduler)}return new MulticastDisposable(this,sink)};MulticastSource.prototype._dispose=function _dispose(){var disposable=this._disposable;this._disposable=emptyDisposable;return Promise.resolve(disposable).then(dispose)};MulticastSource.prototype.add=function add(sink){this.sinks=_most_prelude.append(sink,this.sinks);return this.sinks.length};MulticastSource.prototype.remove=function remove$1(sink){var i=_most_prelude.findIndex(sink,this.sinks);if(i>=0){this.sinks=_most_prelude.remove(i,this.sinks)}return this.sinks.length};MulticastSource.prototype.event=function event(time,value){var s=this.sinks;if(s.length===1){return s[0].event(time,value)}for(var i=0;i<s.length;++i){tryEvent(time,value,s[i])}};MulticastSource.prototype.end=function end(time,value){var s=this.sinks;for(var i=0;i<s.length;++i){tryEnd(time,value,s[i])}};MulticastSource.prototype.error=function error(time,err){var s=this.sinks;for(var i=0;i<s.length;++i){s[i].error(time,err)}};function multicast(stream){var source=stream.source;return source instanceof MulticastSource?stream:new stream.constructor(new MulticastSource(source))}exports["default"]=multicast;exports.MulticastSource=MulticastSource;Object.defineProperty(exports,"__esModule",{value:true})});
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?factory(exports,require("most"),require("@most/multicast")):typeof define==="function"&&define.amd?define('@most/create',["exports","most","@most/multicast"],factory):factory(global.mostCreate=global.mostCreate||{},global.most,global.mostMulticast)})(this,function(exports,most,_most_multicast){"use strict";function defer(task){return Promise.resolve(task).then(runTask)}function runTask(task){try{return task.run()}catch(e){return task.error(e)}}var PropagateAllTask=function PropagateAllTask(sink,time,events){this.sink=sink;this.time=time;this.events=events};PropagateAllTask.prototype.run=function run(){var this$1=this;var events=this.events;var sink=this.sink;var event;for(var i=0,l=events.length;i<l;++i){event=events[i];this$1.time=event.time;sink.event(event.time,event.value)}events.length=0};PropagateAllTask.prototype.error=function error(e){this.sink.error(this.time,e)};var EndTask=function EndTask(t,x,sink){this.time=t;this.value=x;this.sink=sink};EndTask.prototype.run=function run(){this.sink.end(this.time,this.value)};EndTask.prototype.error=function error(e){this.sink.error(this.time,e)};var ErrorTask=function ErrorTask(t,e,sink){this.time=t;this.value=e;this.sink=sink};ErrorTask.prototype.run=function run(){this.sink.error(this.time,this.value)};ErrorTask.prototype.error=function error(e){throw e};var DeferredSink=function DeferredSink(sink){this.sink=sink;this.events=[];this.active=true};DeferredSink.prototype.event=function event(t,x){if(!this.active){return}if(this.events.length===0){defer(new PropagateAllTask(this.sink,t,this.events))}this.events.push({time:t,value:x})};DeferredSink.prototype.end=function end(t,x){if(!this.active){return}this._end(new EndTask(t,x,this.sink))};DeferredSink.prototype.error=function error(t,e){this._end(new ErrorTask(t,e,this.sink))};DeferredSink.prototype._end=function _end(task){this.active=false;defer(task)};var CreateSubscriber=function CreateSubscriber(sink,scheduler,subscribe){this.sink=sink;this.scheduler=scheduler;this._unsubscribe=this._init(subscribe)};CreateSubscriber.prototype._init=function _init(subscribe){var this$1=this;var add=function(x){return this$1.sink.event(this$1.scheduler.now(),x)};var end=function(x){return this$1.sink.end(this$1.scheduler.now(),x)};var error=function(e){return this$1.sink.error(this$1.scheduler.now(),e)};try{return subscribe(add,end,error)}catch(e){error(e)}};CreateSubscriber.prototype.dispose=function dispose(){if(typeof this._unsubscribe==="function"){return this._unsubscribe.call(void 0)}};var Create=function Create(subscribe){this._subscribe=subscribe};Create.prototype.run=function run(sink,scheduler){return new CreateSubscriber(new DeferredSink(sink),scheduler,this._subscribe)};function create(run){return new most.Stream(new _most_multicast.MulticastSource(new Create(run)))}exports.create=create;Object.defineProperty(exports,"__esModule",{value:true})});
//  Ramda v0.22.1
//  https://github.com/ramda/ramda
//  (c) 2013-2016 Scott Sauyet, Michael Hurley, and David Chambers
//  Ramda may be freely distributed under the MIT license.

(function(){"use strict";var t={"@@functional/placeholder":!0},n=function(t,n){switch(t){case 0:return function(){return n.apply(this,arguments)};case 1:return function(t){return n.apply(this,arguments)};case 2:return function(t,r){return n.apply(this,arguments)};case 3:return function(t,r,e){return n.apply(this,arguments)};case 4:return function(t,r,e,u){return n.apply(this,arguments)};case 5:return function(t,r,e,u,i){return n.apply(this,arguments)};case 6:return function(t,r,e,u,i,o){return n.apply(this,arguments)};case 7:return function(t,r,e,u,i,o,c){return n.apply(this,arguments)};case 8:return function(t,r,e,u,i,o,c,s){return n.apply(this,arguments)};case 9:return function(t,r,e,u,i,o,c,s,a){return n.apply(this,arguments)};case 10:return function(t,r,e,u,i,o,c,s,a,f){return n.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}},r=function(t){for(var n,r=[];!(n=t.next()).done;)r.push(n.value);return r},e=function(){return Array.prototype.slice.call(arguments)},u=function(t){return new RegExp(t.source,(t.global?"g":"")+(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.sticky?"y":"")+(t.unicode?"u":""))},i=function(t){return function(){return!t.apply(this,arguments)}},o=function(t,n){t=t||[],n=n||[];var r,e=t.length,u=n.length,i=[];for(r=0;e>r;)i[i.length]=t[r],r+=1;for(r=0;u>r;)i[i.length]=n[r],r+=1;return i},c=function(t,n,r){for(var e=0,u=r.length;u>e;){if(t(n,r[e]))return!0;e+=1}return!1},s=function(t,n){for(var r=0,e=n.length,u=[];e>r;)t(n[r])&&(u[u.length]=n[r]),r+=1;return u},a=function(t){return{"@@transducer/value":t,"@@transducer/reduced":!0}},f=function(t){var n=String(t).match(/^function (\w*)/);return null==n?"":n[1]},l=function(t,n){return Object.prototype.hasOwnProperty.call(n,t)},p=function(t){return t},h=function(){var t=Object.prototype.toString;return"[object Arguments]"===t.call(arguments)?function(n){return"[object Arguments]"===t.call(n)}:function(t){return l("callee",t)}}(),g=Array.isArray||function(t){return null!=t&&t.length>=0&&"[object Array]"===Object.prototype.toString.call(t)},d=function(t){return"[object Function]"===Object.prototype.toString.call(t)},y=Number.isInteger||function(t){return t<<0===t},m=function(t){return"[object Number]"===Object.prototype.toString.call(t)},v=function(t){return"[object Object]"===Object.prototype.toString.call(t)},w=function(t){return null!=t&&"object"==typeof t&&t["@@functional/placeholder"]===!0},b=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},x=function(t){return"[object String]"===Object.prototype.toString.call(t)},j=function(t){return"function"==typeof t["@@transducer/step"]},O=function(t,n){for(var r=0,e=n.length,u=Array(e);e>r;)u[r]=t(n[r]),r+=1;return u},S=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),r=1,e=arguments.length;e>r;){var u=arguments[r];if(null!=u)for(var i in u)l(i,u)&&(n[i]=u[i]);r+=1}return n},A=function(t){return[t]},E=function(t,n){return function(){return n.call(this,t.apply(this,arguments))}},_=function(t,n){return function(){var r=this;return t.apply(r,arguments).then(function(t){return n.call(r,t)})}},k=function(t){var n=t.replace(/\\/g,"\\\\").replace(/[\b]/g,"\\b").replace(/\f/g,"\\f").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t").replace(/\v/g,"\\v").replace(/\0/g,"\\0");return'"'+n.replace(/"/g,'\\"')+'"'},N=function(t){return t&&t["@@transducer/reduced"]?t:{"@@transducer/value":t,"@@transducer/reduced":!0}},I=function Mu(t,n,r){switch(arguments.length){case 1:return Mu(t,0,t.length);case 2:return Mu(t,n,t.length);default:for(var e=[],u=0,i=Math.max(0,Math.min(t.length,r)-n);i>u;)e[u]=t[n+u],u+=1;return e}},q=function(){var t=function(t){return(10>t?"0":"")+t};return"function"==typeof Date.prototype.toISOString?function(t){return t.toISOString()}:function(n){return n.getUTCFullYear()+"-"+t(n.getUTCMonth()+1)+"-"+t(n.getUTCDate())+"T"+t(n.getUTCHours())+":"+t(n.getUTCMinutes())+":"+t(n.getUTCSeconds())+"."+(n.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"}}(),W={init:function(){return this.xf["@@transducer/init"]()},result:function(t){return this.xf["@@transducer/result"](t)}},C=function(){function t(t){this.f=t}return t.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},t.prototype["@@transducer/result"]=function(t){return t},t.prototype["@@transducer/step"]=function(t,n){return this.f(t,n)},function(n){return new t(n)}}(),P=function(t,n){for(var r=0,e=n.length-(t-1),u=new Array(e>=0?e:0);e>r;)u[r]=I(n,r,r+t),r+=1;return u},T="function"==typeof Object.assign?Object.assign:S,B=function(t,n){return function(){var r=arguments.length;if(0===r)return n();var e=arguments[r-1];return g(e)||"function"!=typeof e[t]?n.apply(this,arguments):e[t].apply(e,I(arguments,0,r-1))}},F=function(t){return function n(r){return 0===arguments.length||w(r)?n:t.apply(this,arguments)}},R=function(t){return function n(r,e){switch(arguments.length){case 0:return n;case 1:return w(r)?n:F(function(n){return t(r,n)});default:return w(r)&&w(e)?n:w(r)?F(function(n){return t(n,e)}):w(e)?F(function(n){return t(r,n)}):t(r,e)}}},M=function(t){return function n(r,e,u){switch(arguments.length){case 0:return n;case 1:return w(r)?n:R(function(n,e){return t(r,n,e)});case 2:return w(r)&&w(e)?n:w(r)?R(function(n,r){return t(n,e,r)}):w(e)?R(function(n,e){return t(r,n,e)}):F(function(n){return t(r,e,n)});default:return w(r)&&w(e)&&w(u)?n:w(r)&&w(e)?R(function(n,r){return t(n,r,u)}):w(r)&&w(u)?R(function(n,r){return t(n,e,r)}):w(e)&&w(u)?R(function(n,e){return t(r,n,e)}):w(r)?F(function(n){return t(n,e,u)}):w(e)?F(function(n){return t(r,n,u)}):w(u)?F(function(n){return t(r,e,n)}):t(r,e,u)}}},U=function Uu(t,r,e){return function(){for(var u=[],i=0,o=t,c=0;c<r.length||i<arguments.length;){var s;c<r.length&&(!w(r[c])||i>=arguments.length)?s=r[c]:(s=arguments[i],i+=1),u[c]=s,w(s)||(o-=1),c+=1}return 0>=o?e.apply(this,u):n(o,Uu(t,u,e))}},L=function(t,n,r){return function(){var e=arguments.length;if(0===e)return r();var u=arguments[e-1];if(!g(u)){var i=I(arguments,0,e-1);if("function"==typeof u[t])return u[t].apply(u,i);if(j(u)){var o=n.apply(null,i);return o(u)}}return r.apply(this,arguments)}},D=function(t,n){for(var r=n.length-1;r>=0&&t(n[r]);)r-=1;return I(n,0,r+1)},z=function(){function t(t,n){this.xf=n,this.f=t,this.all=!0}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.all&&(t=this.xf["@@transducer/step"](t,!0)),this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.f(n)||(this.all=!1,t=N(this.xf["@@transducer/step"](t,!1))),t},R(function(n,r){return new t(n,r)})}(),V=function(){function t(t,n){this.xf=n,this.f=t,this.any=!1}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.any||(t=this.xf["@@transducer/step"](t,!1)),this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.f(n)&&(this.any=!0,t=N(this.xf["@@transducer/step"](t,!0))),t},R(function(n,r){return new t(n,r)})}(),K=function(){function t(t,n){this.xf=n,this.pos=0,this.full=!1,this.acc=new Array(t)}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.acc=null,this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.store(n),this.full?this.xf["@@transducer/step"](t,this.getCopy()):t},t.prototype.store=function(t){this.acc[this.pos]=t,this.pos+=1,this.pos===this.acc.length&&(this.pos=0,this.full=!0)},t.prototype.getCopy=function(){return o(I(this.acc,this.pos),I(this.acc,0,this.pos))},R(function(n,r){return new t(n,r)})}(),$=function(){function t(t,n){this.xf=n,this.n=t}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=W.result,t.prototype["@@transducer/step"]=function(t,n){return this.n>0?(this.n-=1,t):this.xf["@@transducer/step"](t,n)},R(function(n,r){return new t(n,r)})}(),H=function(){function t(t,n){this.xf=n,this.pos=0,this.full=!1,this.acc=new Array(t)}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.acc=null,this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.full&&(t=this.xf["@@transducer/step"](t,this.acc[this.pos])),this.store(n),t},t.prototype.store=function(t){this.acc[this.pos]=t,this.pos+=1,this.pos===this.acc.length&&(this.pos=0,this.full=!0)},R(function(n,r){return new t(n,r)})}(),X=function(){function t(t,n){this.xf=n,this.pred=t,this.lastValue=void 0,this.seenFirstValue=!1}return t.prototype["@@transducer/init"]=function(){return this.xf["@@transducer/init"]()},t.prototype["@@transducer/result"]=function(t){return this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){var r=!1;return this.seenFirstValue?this.pred(this.lastValue,n)&&(r=!0):this.seenFirstValue=!0,this.lastValue=n,r?t:this.xf["@@transducer/step"](t,n)},R(function(n,r){return new t(n,r)})}(),Y=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=W.result,t.prototype["@@transducer/step"]=function(t,n){if(this.f){if(this.f(n))return t;this.f=null}return this.xf["@@transducer/step"](t,n)},R(function(n,r){return new t(n,r)})}(),Z=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=W.result,t.prototype["@@transducer/step"]=function(t,n){return this.f(n)?this.xf["@@transducer/step"](t,n):t},R(function(n,r){return new t(n,r)})}(),G=function(){function t(t,n){this.xf=n,this.f=t,this.found=!1}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.found||(t=this.xf["@@transducer/step"](t,void 0)),this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.f(n)&&(this.found=!0,t=N(this.xf["@@transducer/step"](t,n))),t},R(function(n,r){return new t(n,r)})}(),J=function(){function t(t,n){this.xf=n,this.f=t,this.idx=-1,this.found=!1}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.found||(t=this.xf["@@transducer/step"](t,-1)),this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.idx+=1,this.f(n)&&(this.found=!0,t=N(this.xf["@@transducer/step"](t,this.idx))),t},R(function(n,r){return new t(n,r)})}(),Q=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t,this.last))},t.prototype["@@transducer/step"]=function(t,n){return this.f(n)&&(this.last=n),t},R(function(n,r){return new t(n,r)})}(),tt=function(){function t(t,n){this.xf=n,this.f=t,this.idx=-1,this.lastIdx=-1}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t,this.lastIdx))},t.prototype["@@transducer/step"]=function(t,n){return this.idx+=1,this.f(n)&&(this.lastIdx=this.idx),t},R(function(n,r){return new t(n,r)})}(),nt=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=W.result,t.prototype["@@transducer/step"]=function(t,n){return this.xf["@@transducer/step"](t,this.f(n))},R(function(n,r){return new t(n,r)})}(),rt=function(){function t(t,n,r,e){this.valueFn=t,this.valueAcc=n,this.keyFn=r,this.xf=e,this.inputs={}}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){var n;for(n in this.inputs)if(l(n,this.inputs)&&(t=this.xf["@@transducer/step"](t,this.inputs[n]),t["@@transducer/reduced"])){t=t["@@transducer/value"];break}return this.inputs=null,this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){var r=this.keyFn(n);return this.inputs[r]=this.inputs[r]||[r,this.valueAcc],this.inputs[r][1]=this.valueFn(this.inputs[r][1],n),t},U(4,[],function(n,r,e,u){return new t(n,r,e,u)})}(),et=function(){function t(t,n){this.xf=n,this.n=t,this.i=0}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=W.result,t.prototype["@@transducer/step"]=function(t,n){this.i+=1;var r=0===this.n?t:this.xf["@@transducer/step"](t,n);return this.i>=this.n?N(r):r},R(function(n,r){return new t(n,r)})}(),ut=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=W.result,t.prototype["@@transducer/step"]=function(t,n){return this.f(n)?this.xf["@@transducer/step"](t,n):N(t)},R(function(n,r){return new t(n,r)})}(),it=R(function(t,n){return Number(t)+Number(n)}),ot=M(function(t,n,r){if(n>=r.length||n<-r.length)return r;var e=0>n?r.length:0,u=e+n,i=o(r);return i[u]=t(r[u]),i}),ct=R(L("all",z,function(t,n){for(var r=0;r<n.length;){if(!t(n[r]))return!1;r+=1}return!0})),st=F(function(t){return function(){return t}}),at=R(function(t,n){return t&&n}),ft=R(L("any",V,function(t,n){for(var r=0;r<n.length;){if(t(n[r]))return!0;r+=1}return!1})),lt=R(L("aperture",K,P)),pt=R(function(t,n){return o(n,[t])}),ht=R(function(t,n){return t.apply(this,n)}),gt=M(function(t,n,r){var e={};for(var u in r)e[u]=r[u];return e[t]=n,e}),dt=M(function Lu(t,n,r){switch(t.length){case 0:return n;case 1:return gt(t[0],n,r);default:return gt(t[0],Lu(I(t,1),n,Object(r[t[0]])),r)}}),yt=R(function(t,r){return n(t.length,function(){return t.apply(r,arguments)})}),mt=M(function(t,n,r){if(t>n)throw new Error("min must not be greater than max in clamp(min, max, value)");return t>r?t:r>n?n:r}),vt=F(function(t){return function(n,r){return t(n,r)?-1:t(r,n)?1:0}}),wt=R(function(t,r){return 1===t?F(r):n(t,U(t,[],r))}),bt=it(-1),xt=R(function(t,n){return null==n||n!==n?t:n}),jt=M(function(t,n,r){for(var e=[],u=0,i=n.length;i>u;)c(t,n[u],r)||c(t,n[u],e)||e.push(n[u]),u+=1;return e}),Ot=R(function(t,n){var r={};for(var e in n)e!==t&&(r[e]=n[e]);return r}),St=R(function Du(t,n){switch(t.length){case 0:return n;case 1:return Ot(t[0],n);default:var r=t[0],e=I(t,1);return null==n[r]?n:gt(r,Du(e,n[r]),n)}}),At=R(function(t,n){return t/n}),Et=R(L("dropWhile",Y,function(t,n){for(var r=0,e=n.length;e>r&&t(n[r]);)r+=1;return I(n,r)})),_t=F(function(t){return null!=t&&"function"==typeof t.empty?t.empty():null!=t&&null!=t.constructor&&"function"==typeof t.constructor.empty?t.constructor.empty():g(t)?[]:x(t)?"":v(t)?{}:h(t)?function(){return arguments}():void 0}),kt=R(function zu(t,n){var r,e,u,i={};for(e in n)r=t[e],u=typeof r,i[e]="function"===u?r(n[e]):"object"===u?zu(t[e],n[e]):n[e];return i}),Nt=R(L("find",G,function(t,n){for(var r=0,e=n.length;e>r;){if(t(n[r]))return n[r];r+=1}})),It=R(L("findIndex",J,function(t,n){for(var r=0,e=n.length;e>r;){if(t(n[r]))return r;r+=1}return-1})),qt=R(L("findLast",Q,function(t,n){for(var r=n.length-1;r>=0;){if(t(n[r]))return n[r];r-=1}})),Wt=R(L("findLastIndex",tt,function(t,n){for(var r=n.length-1;r>=0;){if(t(n[r]))return r;r-=1}return-1})),Ct=R(B("forEach",function(t,n){for(var r=n.length,e=0;r>e;)t(n[e]),e+=1;return n})),Pt=F(function(t){for(var n={},r=0;r<t.length;)n[t[r][0]]=t[r][1],r+=1;return n}),Tt=R(function(t,n){for(var r=[],e=0,u=n.length;u>e;){for(var i=e+1;u>i&&t(n[e],n[i]);)i+=1;r.push(n.slice(e,i)),e=i}return r}),Bt=R(function(t,n){return t>n}),Ft=R(function(t,n){return t>=n}),Rt=R(l),Mt=R(function(t,n){return t in n}),Ut=R(function(t,n){return t===n?0!==t||1/t===1/n:t!==t&&n!==n}),Lt=F(p),Dt=M(function(t,n,r){return wt(Math.max(t.length,n.length,r.length),function(){return t.apply(this,arguments)?n.apply(this,arguments):r.apply(this,arguments)})}),zt=it(1),Vt=M(function(t,n,r){t=t<r.length&&t>=0?t:r.length;var e=I(r);return e.splice(t,0,n),e}),Kt=M(function(t,n,r){return t=t<r.length&&t>=0?t:r.length,o(o(I(r,0,t),n),I(r,t))}),$t=R(B("intersperse",function(t,n){for(var r=[],e=0,u=n.length;u>e;)e===u-1?r.push(n[e]):r.push(n[e],t),e+=1;return r})),Ht=R(function(t,n){return null!=n&&n.constructor===t||n instanceof t}),Xt=F(function(t){return g(t)?!0:t?"object"!=typeof t?!1:x(t)?!1:1===t.nodeType?!!t.length:0===t.length?!0:t.length>0?t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1):!1:!1}),Yt=F(function(t){return null==t}),Zt=function(){var t=!{toString:null}.propertyIsEnumerable("toString"),n=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],r=function(){return arguments.propertyIsEnumerable("length")}(),e=function(t,n){for(var r=0;r<t.length;){if(t[r]===n)return!0;r+=1}return!1};return F("function"!=typeof Object.keys||r?function(u){if(Object(u)!==u)return[];var i,o,c=[],s=r&&h(u);for(i in u)!l(i,u)||s&&"length"===i||(c[c.length]=i);if(t)for(o=n.length-1;o>=0;)i=n[o],l(i,u)&&!e(c,i)&&(c[c.length]=i),o-=1;return c}:function(t){return Object(t)!==t?[]:Object.keys(t)})}(),Gt=F(function(t){var n,r=[];for(n in t)r[r.length]=n;return r}),Jt=F(function(t){return null!=t&&m(t.length)?t.length:NaN}),Qt=R(function(t,n){return n>t}),tn=R(function(t,n){return n>=t}),nn=M(function(t,n,r){for(var e=0,u=r.length,i=[],o=[n];u>e;)o=t(o[0],r[e]),i[e]=o[1],e+=1;return[o[0],i]}),rn=M(function(t,n,r){for(var e=r.length-1,u=[],i=[n];e>=0;)i=t(i[0],r[e]),u[e]=i[1],e-=1;return[i[0],u]}),en=R(function(t,n){return n.match(t)||[]}),un=R(function(t,n){return y(t)?!y(n)||1>n?NaN:(t%n+n)%n:NaN}),on=R(function(t,n){return n>t?n:t}),cn=M(function(t,n,r){return t(r)>t(n)?r:n}),sn=R(function(t,n){return T({},t,n)}),an=F(function(t){return T.apply(null,[{}].concat(t))}),fn=M(function(t,n,r){var e,u={};for(e in n)l(e,n)&&(u[e]=l(e,r)?t(e,n[e],r[e]):n[e]);for(e in r)l(e,r)&&!l(e,u)&&(u[e]=r[e]);return u}),ln=R(function(t,n){return t>n?n:t}),pn=M(function(t,n,r){return t(r)<t(n)?r:n}),hn=R(function(t,n){return t%n}),gn=R(function(t,n){return t*n}),dn=R(function(t,n){switch(t){case 0:return function(){return n.call(this)};case 1:return function(t){return n.call(this,t)};case 2:return function(t,r){return n.call(this,t,r)};case 3:return function(t,r,e){return n.call(this,t,r,e)};case 4:return function(t,r,e,u){return n.call(this,t,r,e,u)};case 5:return function(t,r,e,u,i){return n.call(this,t,r,e,u,i)};case 6:return function(t,r,e,u,i,o){return n.call(this,t,r,e,u,i,o)};case 7:return function(t,r,e,u,i,o,c){return n.call(this,t,r,e,u,i,o,c)};case 8:return function(t,r,e,u,i,o,c,s){return n.call(this,t,r,e,u,i,o,c,s)};case 9:return function(t,r,e,u,i,o,c,s,a){return n.call(this,t,r,e,u,i,o,c,s,a)};case 10:return function(t,r,e,u,i,o,c,s,a,f){return n.call(this,t,r,e,u,i,o,c,s,a,f)};default:throw new Error("First argument to nAry must be a non-negative integer no greater than ten")}}),yn=F(function(t){return-t}),mn=R(i(L("any",V,ft))),vn=F(function(t){return!t}),wn=R(function(t,n){var r=0>t?n.length+t:t;return x(n)?n.charAt(r):n[r]}),bn=F(function(t){var n=0>t?1:t+1;return wt(n,function(){return wn(t,arguments)})}),xn=R(function(t,n){var r={};return r[t]=n,r}),jn=F(A),On=F(function(t){var r,e=!1;return n(t.length,function(){return e?r:(e=!0,r=t.apply(this,arguments))})}),Sn=R(function(t,n){return t||n}),An=function(){var t=function(n){return{value:n,map:function(r){return t(r(n))}}};return M(function(n,r,e){return n(function(n){return t(r(n))})(e).value})}(),En=R(function(t,n){return[t,n]}),_n=R(function(t,n){for(var r=n,e=0;e<t.length;){if(null==r)return;r=r[t[e]],e+=1}return r}),kn=M(function(t,n,r){return xt(t,_n(n,r))}),Nn=M(function(t,n,r){return n.length>0&&t(_n(n,r))}),In=R(function(t,n){for(var r={},e=0;e<t.length;)t[e]in n&&(r[t[e]]=n[t[e]]),e+=1;return r}),qn=R(function(t,n){for(var r={},e=0,u=t.length;u>e;){var i=t[e];r[i]=n[i],e+=1}return r}),Wn=R(function(t,n){var r={};for(var e in n)t(n[e],e,n)&&(r[e]=n[e]);return r}),Cn=R(function(t,n){return o([t],n)}),Pn=R(function(t,n){return n[t]}),Tn=M(function(t,n,r){return Ht(t,r[n])}),Bn=M(function(t,n,r){return null!=r&&l(n,r)?r[n]:t}),Fn=M(function(t,n,r){return t(r[n])}),Rn=R(function(t,n){for(var r=t.length,e=[],u=0;r>u;)e[u]=n[t[u]],u+=1;return e}),Mn=R(function(t,n){if(!m(t)||!m(n))throw new TypeError("Both arguments to range must be numbers");for(var r=[],e=t;n>e;)r.push(e),e+=1;return r}),Un=M(function(t,n,r){for(var e=r.length-1;e>=0;)n=t(n,r[e]),e-=1;return n}),Ln=F(N),Dn=M(function(t,n,r){return o(I(r,0,Math.min(t,r.length)),I(r,Math.min(r.length,t+n)))}),zn=M(function(t,n,r){return r.replace(t,n)}),Vn=F(function(t){return x(t)?t.split("").reverse().join(""):I(t).reverse()}),Kn=M(function(t,n,r){for(var e=0,u=r.length,i=[n];u>e;)n=t(n,r[e]),i[e+1]=n,e+=1;return i}),$n=M(function(t,n,r){return An(t,st(n),r)}),Hn=M(B("slice",function(t,n,r){return Array.prototype.slice.call(r,t,n)})),Xn=R(function(t,n){return I(n).sort(t)}),Yn=R(function(t,n){return I(n).sort(function(n,r){var e=t(n),u=t(r);return u>e?-1:e>u?1:0})}),Zn=R(function(t,n){return[Hn(0,t,n),Hn(t,Jt(n),n)]}),Gn=R(function(t,n){if(0>=t)throw new Error("First argument to splitEvery must be a positive integer");for(var r=[],e=0;e<n.length;)r.push(Hn(e,e+=t,n));return r}),Jn=R(function(t,n){for(var r=0,e=n.length,u=[];e>r&&!t(n[r]);)u.push(n[r]),r+=1;return[u,I(n,r)]}),Qn=R(function(t,n){return Number(t)-Number(n)}),tr=B("tail",Hn(1,1/0)),nr=R(L("take",et,function(t,n){return Hn(0,0>t?1/0:t,n)})),rr=R(function(t,n){for(var r=n.length-1;r>=0&&t(n[r]);)r-=1;return I(n,r+1,1/0)}),er=R(L("takeWhile",ut,function(t,n){for(var r=0,e=n.length;e>r&&t(n[r]);)r+=1;return I(n,0,r)})),ur=R(function(t,n){return t(n),n}),ir=R(function(t,n){var r,e=Number(n),u=0;if(0>e||isNaN(e))throw new RangeError("n must be a non-negative number");for(r=new Array(e);e>u;)r[u]=t(u),u+=1;return r}),or=F(function(t){var n=[];for(var r in t)l(r,t)&&(n[n.length]=[r,t[r]]);return n}),cr=F(function(t){var n=[];for(var r in t)n[n.length]=[r,t[r]];return n}),sr=F(function(t){for(var n=0,r=[];n<t.length;){for(var e=t[n],u=0;u<e.length;)"undefined"==typeof r[u]&&(r[u]=[]),r[u].push(e[u]),u+=1;n+=1}return r}),ar=function(){var t="	\n\f\r   ᠎             　\u2028\u2029\ufeff",n="​",r="function"==typeof String.prototype.trim;return F(r&&!t.trim()&&n.trim()?function(t){return t.trim()}:function(n){var r=new RegExp("^["+t+"]["+t+"]*"),e=new RegExp("["+t+"]["+t+"]*$");return n.replace(r,"").replace(e,"")})}(),fr=R(function(t,r){return n(t.length,function(){try{return t.apply(this,arguments)}catch(n){return r.apply(this,o([n],arguments))}})}),lr=F(function(t){return null===t?"Null":void 0===t?"Undefined":Object.prototype.toString.call(t).slice(8,-1)}),pr=F(function(t){return function(){return t(I(arguments))}}),hr=F(function(t){return dn(1,t)}),gr=R(function(t,n){return wt(t,function(){for(var r,e=1,u=n,i=0;t>=e&&"function"==typeof u;)r=e===t?arguments.length:i+u.length,u=u.apply(this,I(arguments,i,r)),e+=1,i=r;return u})}),dr=R(function(t,n){for(var r=t(n),e=[];r&&r.length;)e[e.length]=r[0],r=t(r[1]);return e}),yr=R(function(t,n){for(var r,e=0,u=n.length,i=[];u>e;)r=n[e],c(t,r,i)||(i[i.length]=r),e+=1;return i}),mr=M(function(t,n,r){return t(r)?r:n(r)}),vr=M(function(t,n,r){for(var e=r;!t(e);)e=n(e);return e}),wr=M(function(t,n,r){return ot(st(n),t,r)}),br=R(function(t,n){return wt(n.length,function(){for(var r=[],e=0;e<n.length;)r.push(n[e].call(this,arguments[e])),e+=1;return t.apply(this,r.concat(I(arguments,n.length)))})}),xr=F(function(t){for(var n=Zt(t),r=n.length,e=[],u=0;r>u;)e[u]=t[n[u]],u+=1;return e}),jr=F(function(t){var n,r=[];for(n in t)r[r.length]=t[n];return r}),Or=function(){var t=function(t){return{value:t,map:function(){return this}}};return R(function(n,r){return n(t)(r).value})}(),Sr=M(function(t,n,r){return t(r)?n(r):r}),Ar=R(function(t,n){for(var r in t)if(l(r,t)&&!t[r](n[r]))return!1;return!0}),Er=R(function(t,n){return wt(t.length,function(){return n.apply(this,o([t],arguments))})}),_r=R(function(t,n){for(var r,e=0,u=t.length,i=n.length,o=[];u>e;){for(r=0;i>r;)o[o.length]=[t[e],n[r]],r+=1;e+=1}return o}),kr=R(function(t,n){for(var r=[],e=0,u=Math.min(t.length,n.length);u>e;)r[e]=[t[e],n[e]],e+=1;return r}),Nr=R(function(t,n){for(var r=0,e=Math.min(t.length,n.length),u={};e>r;)u[t[r]]=n[r],r+=1;return u}),Ir=M(function(t,n,r){for(var e=[],u=0,i=Math.min(n.length,r.length);i>u;)e[u]=t(n[u],r[u]),u+=1;return e}),qr=st(!1),Wr=st(!0),Cr=function Vu(t,n,r,e){var i=function(u){for(var i=n.length,o=0;i>o;){if(t===n[o])return r[o];o+=1}n[o+1]=t,r[o+1]=u;for(var c in t)u[c]=e?Vu(t[c],n,r,!0):t[c];return u};switch(lr(t)){case"Object":return i({});case"Array":return i([]);case"Date":return new Date(t.valueOf());case"RegExp":return u(t);default:return t}},Pr=function(t){return R(function(r,e){return n(Math.max(0,r.length-e.length),function(){return r.apply(this,t(e,arguments))})})},Tr=function(t,n){return nr(t<n.length?n.length-t:0,n)},Br=function Ku(t,n,e,u){if(Ut(t,n))return!0;if(lr(t)!==lr(n))return!1;if(null==t||null==n)return!1;if("function"==typeof t.equals||"function"==typeof n.equals)return"function"==typeof t.equals&&t.equals(n)&&"function"==typeof n.equals&&n.equals(t);switch(lr(t)){case"Arguments":case"Array":case"Object":if("function"==typeof t.constructor&&"Promise"===f(t.constructor))return t===n;break;case"Boolean":case"Number":case"String":if(typeof t!=typeof n||!Ut(t.valueOf(),n.valueOf()))return!1;break;case"Date":if(!Ut(t.valueOf(),n.valueOf()))return!1;break;case"Error":return t.name===n.name&&t.message===n.message;case"RegExp":if(t.source!==n.source||t.global!==n.global||t.ignoreCase!==n.ignoreCase||t.multiline!==n.multiline||t.sticky!==n.sticky||t.unicode!==n.unicode)return!1;break;case"Map":case"Set":if(!Ku(r(t.entries()),r(n.entries()),e,u))return!1;break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":break;case"ArrayBuffer":break;default:return!1}var i=Zt(t);if(i.length!==Zt(n).length)return!1;for(var o=e.length-1;o>=0;){if(e[o]===t)return u[o]===n;o-=1}for(e.push(t),u.push(n),o=i.length-1;o>=0;){var c=i[o];if(!l(c,n)||!Ku(n[c],t[c],e,u))return!1;o-=1}return e.pop(),u.pop(),!0},Fr=function(t){return function n(r){for(var e,u,i,o=[],c=0,s=r.length;s>c;){if(Xt(r[c]))for(e=t?n(r[c]):r[c],i=0,u=e.length;u>i;)o[o.length]=e[i],i+=1;else o[o.length]=r[c];c+=1}return o}},Rr=function(){function t(t,n,r){for(var e=0,u=r.length;u>e;){if(n=t["@@transducer/step"](n,r[e]),n&&n["@@transducer/reduced"]){n=n["@@transducer/value"];break}e+=1}return t["@@transducer/result"](n)}function n(t,n,r){for(var e=r.next();!e.done;){if(n=t["@@transducer/step"](n,e.value),n&&n["@@transducer/reduced"]){n=n["@@transducer/value"];break}e=r.next()}return t["@@transducer/result"](n)}function r(t,n,r){return t["@@transducer/result"](r.reduce(yt(t["@@transducer/step"],t),n))}var e="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";return function(u,i,o){if("function"==typeof u&&(u=C(u)),Xt(o))return t(u,i,o);if("function"==typeof o.reduce)return r(u,i,o);if(null!=o[e])return n(u,i,o[e]());if("function"==typeof o.next)return n(u,i,o);throw new TypeError("reduce: list must be array or iterable")}}(),Mr=function(){var t={"@@transducer/init":Array,"@@transducer/step":function(t,n){return t.push(n),t},"@@transducer/result":p},n={"@@transducer/init":String,"@@transducer/step":function(t,n){return t+n},"@@transducer/result":p},r={"@@transducer/init":Object,"@@transducer/step":function(t,n){return T(t,Xt(n)?xn(n[0],n[1]):n)},"@@transducer/result":p};return function(e){if(j(e))return e;if(Xt(e))return t;if("string"==typeof e)return n;if("object"==typeof e)return r;throw new Error("Cannot create transformer for "+e)}}(),Ur=function(){function t(t,n){this.f=t,this.retained=[],this.xf=n}return t.prototype["@@transducer/init"]=W.init,t.prototype["@@transducer/result"]=function(t){return this.retained=null,this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.f(n)?this.retain(t,n):this.flush(t,n)},t.prototype.flush=function(t,n){return t=Rr(this.xf["@@transducer/step"],t,this.retained),this.retained=[],this.xf["@@transducer/step"](t,n)},t.prototype.retain=function(t,n){return this.retained.push(n),t},R(function(n,r){return new t(n,r)})}(),Lr=F(function(t){return wt(t.length,function(){var n=0,r=arguments[0],e=arguments[arguments.length-1],u=I(arguments);return u[0]=function(){var t=r.apply(this,o(arguments,[n,e]));return n+=1,t},t.apply(this,u)})}),Dr=F(function(t){return dn(2,t)}),zr=F(function(t){return null!=t&&"function"==typeof t.clone?t.clone():Cr(t,[],[],!0)}),Vr=F(function(t){return wt(t.length,t)}),Kr=R(L("drop",$,function(t,n){return Hn(Math.max(0,t),1/0,n)})),$r=R(L("dropLast",H,Tr)),Hr=R(L("dropLastWhile",Ur,D)),Xr=R(function(t,n){return Br(t,n,[],[])}),Yr=R(L("filter",Z,function(t,n){return v(n)?Rr(function(r,e){return t(n[e])&&(r[e]=n[e]),r},{},Zt(n)):s(t,n)})),Zr=F(Fr(!0)),Gr=F(function(t){return Vr(function(n,r){var e=I(arguments);return e[0]=r,e[1]=n,t.apply(this,e)})}),Jr=wn(0),Qr=Hn(0,-1),te=M(function(t,n,r){var e,u;n.length>r.length?(e=n,u=r):(e=r,u=n);for(var i=[],o=0;o<u.length;)c(t,u[o],e)&&(i[i.length]=u[o]),o+=1;return yr(t,i)}),ne=M(function(t,n,r){return j(t)?Rr(n(t),t["@@transducer/init"](),r):Rr(n(Mr(t)),Cr(t,[],[],!1),r)}),re=F(function(t){for(var n=Zt(t),r=n.length,e=0,u={};r>e;){var i=n[e],o=t[i],c=l(o,u)?u[o]:u[o]=[];c[c.length]=i,e+=1}return u}),ee=F(function(t){for(var n=Zt(t),r=n.length,e=0,u={};r>e;){var i=n[e];u[t[i]]=i,e+=1}return u}),ue=F(function(t){return null!=t&&Xr(t,_t(t))}),ie=wn(-1),oe=R(function(t,n){if("function"!=typeof n.lastIndexOf||g(n)){for(var r=n.length-1;r>=0;){if(Xr(n[r],t))return r;r-=1}return-1}return n.lastIndexOf(t)}),ce=R(L("map",nt,function(t,n){switch(Object.prototype.toString.call(n)){case"[object Function]":return wt(n.length,function(){return t.call(this,n.apply(this,arguments))});case"[object Object]":return Rr(function(r,e){return r[e]=t(n[e]),r},{},Zt(n));default:return O(t,n)}})),se=R(function(t,n){return Rr(function(r,e){return r[e]=t(n[e],e,n),r},{},Zt(n))}),ae=M(function(t,n,r){return fn(function(n,r,e){return t(r,e)},n,r)}),fe=Pr(o),le=Pr(Gr(o)),pe=M(function(t,n,r){return Xr(_n(t,r),n)}),he=R(function(t,n){return ce(Pn(t),n)}),ge=br(O,[qn,Lt]),de=M(function(t,n,r){return Xr(n,r[t])}),ye=M(Rr),me=U(4,[],L("reduceBy",rt,function(t,n,r,e){return Rr(function(e,u){var i=r(u);return e[i]=t(l(i,e)?e[i]:n,u),e},{},e)})),ve=U(4,[],function(t,n,r,e){return Rr(function(r,e){return t(r,e)?n(r,e):N(r)},r,e)}),we=R(function(t,n){return Yr(i(t),n)}),be=R(function(t,n){return ir(st(t),n)}),xe=ye(it,0),je=R(function(t,n){return Kr(t>=0?n.length-t:0,n)}),Oe=wt(4,function(t,n,r,e){return Rr(t("function"==typeof n?C(n):n),r,e)}),Se=M(function(t,n,r){return yr(t,o(n,r))}),Ae=R(function(t,n){return Ar(ce(Xr,t),n)}),Ee=function(){var t=function(t){return{"@@transducer/init":W.init,"@@transducer/result":function(n){return t["@@transducer/result"](n)},"@@transducer/step":function(n,r){var e=t["@@transducer/step"](n,r);return e["@@transducer/reduced"]?a(e):e}}};return function(n){var r=t(n);return{"@@transducer/init":W.init,"@@transducer/result":function(t){return r["@@transducer/result"](t)},"@@transducer/step":function(t,n){return Xt(n)?Rr(r,t,n):Rr(r,t,[n])}}}}(),_e=function(t,n,r){var e,u;if("function"==typeof t.indexOf)switch(typeof n){case"number":if(0===n){for(e=1/n;r<t.length;){if(u=t[r],0===u&&1/u===e)return r;r+=1}return-1}if(n!==n){for(;r<t.length;){if(u=t[r],"number"==typeof u&&u!==u)return r;r+=1}return-1}return t.indexOf(n,r);case"string":case"boolean":case"function":case"undefined":return t.indexOf(n,r);case"object":if(null===n)return t.indexOf(n,r)}for(;r<t.length;){if(Xr(t[r],n))return r;r+=1}return-1},ke=R(function(t,n){return ce(t,Ee(n))}),Ne=F(function(t){return wt(ye(on,0,he("length",t)),function(){for(var n=0,r=t.length;r>n;){if(!t[n].apply(this,arguments))return!1;n+=1}return!0})}),Ie=F(function(t){return wt(ye(on,0,he("length",t)),function(){
for(var n=0,r=t.length;r>n;){if(t[n].apply(this,arguments))return!0;n+=1}return!1})}),qe=R(function(t,n){return"function"==typeof t.ap?t.ap(n):"function"==typeof t?function(r){return t(r)(n(r))}:Rr(function(t,r){return o(t,ce(r,n))},[],t)}),We=F(function $u(t){return t=ce(function(t){return"function"==typeof t?t:$u(t)},t),wt(ye(on,0,he("length",xr(t))),function(){var n=arguments;return ce(function(t){return ht(t,n)},t)})}),Ce=Vr(function(t){return t.apply(this,I(arguments,1))}),Pe=R(L("chain",ke,function(t,n){return"function"==typeof n?function(){return n.call(this,t.apply(this,arguments)).apply(this,arguments)}:Fr(!1)(ce(t,n))})),Te=F(function(t){var r=ye(on,0,ce(function(t){return t[0].length},t));return n(r,function(){for(var n=0;n<t.length;){if(t[n][0].apply(this,arguments))return t[n][1].apply(this,arguments);n+=1}})}),Be=R(function(t,n){if(t>10)throw new Error("Constructor with greater than ten arguments");return 0===t?function(){return new n}:Vr(dn(t,function(t,r,e,u,i,o,c,s,a,f){switch(arguments.length){case 1:return new n(t);case 2:return new n(t,r);case 3:return new n(t,r,e);case 4:return new n(t,r,e,u);case 5:return new n(t,r,e,u,i);case 6:return new n(t,r,e,u,i,o);case 7:return new n(t,r,e,u,i,o,c);case 8:return new n(t,r,e,u,i,o,c,s);case 9:return new n(t,r,e,u,i,o,c,s,a);case 10:return new n(t,r,e,u,i,o,c,s,a,f)}}))}),Fe=R(function(t,n){return wt(ye(on,0,he("length",n)),function(){var r=arguments,e=this;return t.apply(e,O(function(t){return t.apply(e,r)},n))})}),Re=me(function(t,n){return t+1},0),Me=R(L("dropRepeatsWith",X,function(t,n){var r=[],e=1,u=n.length;if(0!==u)for(r[0]=n[0];u>e;)t(ie(r),n[e])||(r[r.length]=n[e]),e+=1;return r})),Ue=M(function(t,n,r){return Xr(t(n),t(r))}),Le=M(function(t,n,r){return Xr(n[t],r[t])}),De=R(B("groupBy",me(function(t,n){return null==t&&(t=[]),t.push(n),t},null))),ze=me(function(t,n){return n},null),Ve=R(function(t,n){return"function"!=typeof n.indexOf||g(n)?_e(n,t,0):n.indexOf(t)}),Ke=F(function(t){return Fe(e,t)}),$e=R(function(t,n){return function(r){return function(e){return ce(function(t){return n(t,e)},r(t(e)))}}}),He=F(function(t){return $e(wn(t),wr(t))}),Xe=F(function(t){return $e(_n(t),dt(t))}),Ye=F(function(t){return $e(Pn(t),gt(t))}),Ze=R(function(t,n){var r=wt(t,n);return wt(t,function(){return Rr(qe,ce(r,arguments[0]),I(arguments,1))})}),Ge=F(function(t){return xe(t)/t.length}),Je=F(function(t){var n=t.length;if(0===n)return NaN;var r=2-n%2,e=(n-r)/2;return Ge(I(t).sort(function(t,n){return n>t?-1:t>n?1:0}).slice(e,e+r))}),Qe=Ke([Yr,we]),tu=function(){if(0===arguments.length)throw new Error("pipe requires at least one argument");return n(arguments[0].length,ye(E,arguments[0],tr(arguments)))},nu=function(){if(0===arguments.length)throw new Error("pipeP requires at least one argument");return n(arguments[0].length,ye(_,arguments[0],tr(arguments)))},ru=ye(gn,1),eu=R(function(t,n){return"function"==typeof n.sequence?n.sequence(t):Un(function(t,n){return qe(ce(Cn,n),t)},t([]),n)}),uu=M(function(t,n,r){return eu(t,ce(n,r))}),iu=Pe(p),ou=function(t,n){return _e(n,t,0)>=0},cu=function Hu(t,n){var r=function(r){var e=n.concat([t]);return ou(r,e)?"<Circular>":Hu(r,e)},e=function(t,n){return O(function(n){return k(n)+": "+r(t[n])},n.slice().sort())};switch(Object.prototype.toString.call(t)){case"[object Arguments]":return"(function() { return arguments; }("+O(r,t).join(", ")+"))";case"[object Array]":return"["+O(r,t).concat(e(t,we(function(t){return/^\d+$/.test(t)},Zt(t)))).join(", ")+"]";case"[object Boolean]":return"object"==typeof t?"new Boolean("+r(t.valueOf())+")":t.toString();case"[object Date]":return"new Date("+(isNaN(t.valueOf())?r(NaN):k(q(t)))+")";case"[object Null]":return"null";case"[object Number]":return"object"==typeof t?"new Number("+r(t.valueOf())+")":1/t===-(1/0)?"-0":t.toString(10);case"[object String]":return"object"==typeof t?"new String("+r(t.valueOf())+")":k(t);case"[object Undefined]":return"undefined";default:if("function"==typeof t.toString){var u=t.toString();if("[object Object]"!==u)return u}return"{"+e(t,Zt(t)).join(", ")+"}"}},su=function(){if(0===arguments.length)throw new Error("compose requires at least one argument");return tu.apply(this,Vn(arguments))},au=function(){return su.apply(this,Cn(Lt,ce(Pe,arguments)))},fu=function(){if(0===arguments.length)throw new Error("composeP requires at least one argument");return nu.apply(this,Vn(arguments))},lu=F(function(t){return Be(t.length,t)}),pu=R(ou),hu=R(function(t,n){for(var r=[],e=0,u=t.length;u>e;)ou(t[e],n)||ou(t[e],r)||(r[r.length]=t[e]),e+=1;return r}),gu=F(L("dropRepeats",X(Xr),Me(Xr))),du=F(function(t){return Ze(t.length,t)}),yu=R(function(t,n){var r={};for(var e in n)ou(e,t)||(r[e]=n[e]);return r}),mu=function(){return au.apply(this,Vn(arguments))},vu=F(function(t){return cu(t,[])}),wu=R(function(t,n){return we(Gr(ou)(t),n)}),bu=function(){function t(){this._nativeSet="function"==typeof Set?new Set:null,this._items={}}function n(t,n,r){var e,u,i=typeof t;switch(i){case"string":case"number":return 0===t&&1/t===-(1/0)?r._items["-0"]?!0:(n&&(r._items["-0"]=!0),!1):null!==r._nativeSet?n?(e=r._nativeSet.size,r._nativeSet.add(t),u=r._nativeSet.size,u===e):r._nativeSet.has(t):i in r._items?t in r._items[i]?!0:(n&&(r._items[i][t]=!0),!1):(n&&(r._items[i]={},r._items[i][t]=!0),!1);case"boolean":if(i in r._items){var o=t?1:0;return r._items[i][o]?!0:(n&&(r._items[i][o]=!0),!1)}return n&&(r._items[i]=t?[!1,!0]:[!0,!1]),!1;case"function":return null!==r._nativeSet?n?(e=r._nativeSet.size,r._nativeSet.add(t),u=r._nativeSet.size,u>e):r._nativeSet.has(t):i in r._items?ou(t,r._items[i])?!0:(n&&r._items[i].push(t),!1):(n&&(r._items[i]=[t]),!1);case"undefined":return r._items[i]?!0:(n&&(r._items[i]=!0),!1);case"object":if(null===t)return r._items["null"]?!0:(n&&(r._items["null"]=!0),!1);default:return i=Object.prototype.toString.call(t),i in r._items?ou(t,r._items[i])?!0:(n&&r._items[i].push(t),!1):(n&&(r._items[i]=[t]),!1)}}return t.prototype.add=function(t){return!n(t,!0,this)},t.prototype.has=function(t){return n(t,!1,this)},t}(),xu=R(function(t,n){return d(t)?function(){return t.apply(this,arguments)&&n.apply(this,arguments)}:du(at)(t,n)}),ju=du(vn),Ou=R(function(t,n){if(null==t||!d(t.concat))throw new TypeError(vu(t)+' does not have a method named "concat"');if(g(t)&&!g(n))throw new TypeError(vu(n)+" is not an array");return t.concat(n)}),Su=R(function(t,n){return d(t)?function(){return t.apply(this,arguments)||n.apply(this,arguments)}:du(Sn)(t,n)}),Au=R(function(t,n){return wt(t+1,function(){var r=arguments[t];if(null!=r&&d(r[n]))return r[n].apply(r,I(arguments,0,t));throw new TypeError(vu(r)+' does not have a method named "'+n+'"')})}),Eu=Au(1,"join"),_u=F(function(t){var r={};return n(t.length,function(){var n=vu(arguments);return l(n,r)||(r[n]=t.apply(this,arguments)),r[n]})}),ku=Au(1,"split"),Nu=R(function(t,n){return Ou(hu(t,n),hu(n,t))}),Iu=M(function(t,n,r){return Ou(jt(t,n,r),jt(t,r,n))}),qu=R(function(t,n){if(!b(t))throw new TypeError("‘test’ requires a value of type RegExp as its first argument; received "+vu(t));return u(t).test(n)}),Wu=Au(0,"toLowerCase"),Cu=Au(0,"toUpperCase"),Pu=R(function(t,n){for(var r,e,u=new bu,i=[],o=0;o<n.length;)e=n[o],r=t(e),u.add(r)&&i.push(e),o+=1;return i}),Tu=Pu(Lt),Bu=R(function(t,n){var r,e;return t.length>n.length?(r=t,e=n):(r=n,e=t),Tu(s(Gr(ou)(r),e))}),Fu=R(su(Tu,o)),Ru={F:qr,T:Wr,__:t,add:it,addIndex:Lr,adjust:ot,all:ct,allPass:Ne,always:st,and:at,any:ft,anyPass:Ie,ap:qe,aperture:lt,append:pt,apply:ht,applySpec:We,assoc:gt,assocPath:dt,binary:Dr,bind:yt,both:xu,call:Ce,chain:Pe,clamp:mt,clone:zr,comparator:vt,complement:ju,compose:su,composeK:au,composeP:fu,concat:Ou,cond:Te,construct:lu,constructN:Be,contains:pu,converge:Fe,countBy:Re,curry:Vr,curryN:wt,dec:bt,defaultTo:xt,difference:hu,differenceWith:jt,dissoc:Ot,dissocPath:St,divide:At,drop:Kr,dropLast:$r,dropLastWhile:Hr,dropRepeats:gu,dropRepeatsWith:Me,dropWhile:Et,either:Su,empty:_t,eqBy:Ue,eqProps:Le,equals:Xr,evolve:kt,filter:Yr,find:Nt,findIndex:It,findLast:qt,findLastIndex:Wt,flatten:Zr,flip:Gr,forEach:Ct,fromPairs:Pt,groupBy:De,groupWith:Tt,gt:Bt,gte:Ft,has:Rt,hasIn:Mt,head:Jr,identical:Ut,identity:Lt,ifElse:Dt,inc:zt,indexBy:ze,indexOf:Ve,init:Qr,insert:Vt,insertAll:Kt,intersection:Bu,intersectionWith:te,intersperse:$t,into:ne,invert:re,invertObj:ee,invoker:Au,is:Ht,isArrayLike:Xt,isEmpty:ue,isNil:Yt,join:Eu,juxt:Ke,keys:Zt,keysIn:Gt,last:ie,lastIndexOf:oe,length:Jt,lens:$e,lensIndex:He,lensPath:Xe,lensProp:Ye,lift:du,liftN:Ze,lt:Qt,lte:tn,map:ce,mapAccum:nn,mapAccumRight:rn,mapObjIndexed:se,match:en,mathMod:un,max:on,maxBy:cn,mean:Ge,median:Je,memoize:_u,merge:sn,mergeAll:an,mergeWith:ae,mergeWithKey:fn,min:ln,minBy:pn,modulo:hn,multiply:gn,nAry:dn,negate:yn,none:mn,not:vn,nth:wn,nthArg:bn,objOf:xn,of:jn,omit:yu,once:On,or:Sn,over:An,pair:En,partial:fe,partialRight:le,partition:Qe,path:_n,pathEq:pe,pathOr:kn,pathSatisfies:Nn,pick:In,pickAll:qn,pickBy:Wn,pipe:tu,pipeK:mu,pipeP:nu,pluck:he,prepend:Cn,product:ru,project:ge,prop:Pn,propEq:de,propIs:Tn,propOr:Bn,propSatisfies:Fn,props:Rn,range:Mn,reduce:ye,reduceBy:me,reduceRight:Un,reduceWhile:ve,reduced:Ln,reject:we,remove:Dn,repeat:be,replace:zn,reverse:Vn,scan:Kn,sequence:eu,set:$n,slice:Hn,sort:Xn,sortBy:Yn,split:ku,splitAt:Zn,splitEvery:Gn,splitWhen:Jn,subtract:Qn,sum:xe,symmetricDifference:Nu,symmetricDifferenceWith:Iu,tail:tr,take:nr,takeLast:je,takeLastWhile:rr,takeWhile:er,tap:ur,test:qu,times:ir,toLower:Wu,toPairs:or,toPairsIn:cr,toString:vu,toUpper:Cu,transduce:Oe,transpose:sr,traverse:uu,trim:ar,tryCatch:fr,type:lr,unapply:pr,unary:hr,uncurryN:gr,unfold:dr,union:Fu,unionWith:Se,uniq:Tu,uniqBy:Pu,uniqWith:yr,unless:mr,unnest:iu,until:vr,update:wr,useWith:br,values:xr,valuesIn:jr,view:Or,when:Sr,where:Ar,whereEq:Ae,without:wu,wrap:Er,xprod:_r,zip:kr,zipObj:Nr,zipWith:Ir};"object"==typeof exports?module.exports=Ru:"function"==typeof define&&define.amd?define('ramda',[],function(){return Ru}):this.R=Ru}).call(this);

/*
qs v.0.4.6 - Simple query string tokens parser
10-10-2016
*/
!function(a,b){"function"==typeof define&&define.amd?define('qs',[],b):"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():a.QS=b()}(this,function(){return function a(b){function c(a){return null!==a?isNaN(a)||Number(a).toString()!==a?"true"===a?!0:"false"===a?!1:"undefined"===a?void 0:"null"===a?null:a:Number(a):void 0}function d(){var a="",b=e.url.substr(0,e.url.indexOf("?")>0&&e.url.indexOf("?")||e.url.length),c=e.url.indexOf("#")>0&&e.url.substr(e.url.indexOf("#"));arrTokens=[];for(var d in e.tokens)e.tokens.hasOwnProperty(d)&&arrTokens.push(encodeURIComponent(d)+(e.tokens[d]?"="+encodeURIComponent(e.tokens[d]):""));a=b,a+=arrTokens.length>0?"?"+arrTokens.join("&"):"",a+=c&&c.length>0?c:"",e.url=a}var e={version:a.version,url:b||"undefined"!=typeof window&&window.location.href||"",tokens:{},has:function(a){return e.tokens.hasOwnProperty(a)},get:function(a){return e.tokens[a]},getAll:function(){return e.tokens},set:function(a,b){return e.tokens[a]=b,d(),e},remove:function(a){return delete e.tokens[a],d(),e},go:function(){document.location.href=e.url},log:function(){console.log(e.tokens)}};return a.version="0.4.6",function(){var a,b=/[?&]([^=&#]+)(?:=([^&#]+))?/g;for(a=b.exec(e.url);null!==a;)e.tokens[decodeURIComponent(a[1])]=a[2]?c(decodeURIComponent(a[2])):null,a=b.exec(e.url);d()}(),e}});
/*!

 handlebars v4.0.5

Copyright (C) 2011-2015 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
define("handlebars/utils",["exports"],function(a){"use strict";function b(a){return j[a]}function c(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1}function e(a){if("string"!=typeof a){if(a&&a.toHTML)return a.toHTML();if(null==a)return"";if(!a)return a+"";a=""+a}return l.test(a)?a.replace(k,b):a}function f(a){return a||0===a?o(a)&&0===a.length?!0:!1:!0}function g(a){var b=c({},a);return b._parent=a,b}function h(a,b){return a.path=b,a}function i(a,b){return(a?a+".":"")+b}a.__esModule=!0,a.extend=c,a.indexOf=d,a.escapeExpression=e,a.isEmpty=f,a.createFrame=g,a.blockParams=h,a.appendContextPath=i;var j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},k=/[&<>"'`=]/g,l=/[&<>"'`=]/,m=Object.prototype.toString;a.toString=m;var n=function(a){return"function"==typeof a};n(/x/)&&(a.isFunction=n=function(a){return"function"==typeof a&&"[object Function]"===m.call(a)}),a.isFunction=n;var o=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===m.call(a):!1};a.isArray=o}),define("handlebars/exception",["exports","module"],function(a,b){"use strict";function c(a,b){var e=b&&b.loc,f=void 0,g=void 0;e&&(f=e.start.line,g=e.start.column,a+=" - "+f+":"+g);for(var h=Error.prototype.constructor.call(this,a),i=0;i<d.length;i++)this[d[i]]=h[d[i]];Error.captureStackTrace&&Error.captureStackTrace(this,c),e&&(this.lineNumber=f,this.column=g)}var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b.exports=c}),define("handlebars/helpers/block-helper-missing",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerHelper("blockHelperMissing",function(b,d){var e=d.inverse,f=d.fn;if(b===!0)return f(this);if(b===!1||null==b)return e(this);if(c.isArray(b))return b.length>0?(d.ids&&(d.ids=[d.name]),a.helpers.each(b,d)):e(this);if(d.data&&d.ids){var g=c.createFrame(d.data);g.contextPath=c.appendContextPath(d.data.contextPath,d.name),d={data:g}}return f(b,d)})}}),define("handlebars/helpers/each",["exports","module","../utils","../exception"],function(a,b,c,d){"use strict";function e(a){return a&&a.__esModule?a:{"default":a}}var f=e(d);b.exports=function(a){a.registerHelper("each",function(a,b){function d(b,d,f){j&&(j.key=b,j.index=d,j.first=0===d,j.last=!!f,k&&(j.contextPath=k+b)),i+=e(a[b],{data:j,blockParams:c.blockParams([a[b],b],[k+b,null])})}if(!b)throw new f["default"]("Must pass iterator to #each");var e=b.fn,g=b.inverse,h=0,i="",j=void 0,k=void 0;if(b.data&&b.ids&&(k=c.appendContextPath(b.data.contextPath,b.ids[0])+"."),c.isFunction(a)&&(a=a.call(this)),b.data&&(j=c.createFrame(b.data)),a&&"object"==typeof a)if(c.isArray(a))for(var l=a.length;l>h;h++)h in a&&d(h,h,h===a.length-1);else{var m=void 0;for(var n in a)a.hasOwnProperty(n)&&(void 0!==m&&d(m,h-1),m=n,h++);void 0!==m&&d(m,h-1,!0)}return 0===h&&(i=g(this)),i})}}),define("handlebars/helpers/helper-missing",["exports","module","../exception"],function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}var e=d(c);b.exports=function(a){a.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new e["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')})}}),define("handlebars/helpers/if",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerHelper("if",function(a,b){return c.isFunction(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||c.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})})}}),define("handlebars/helpers/log",["exports","module"],function(a,b){"use strict";b.exports=function(a){a.registerHelper("log",function(){for(var b=[void 0],c=arguments[arguments.length-1],d=0;d<arguments.length-1;d++)b.push(arguments[d]);var e=1;null!=c.hash.level?e=c.hash.level:c.data&&null!=c.data.level&&(e=c.data.level),b[0]=e,a.log.apply(a,b)})}}),define("handlebars/helpers/lookup",["exports","module"],function(a,b){"use strict";b.exports=function(a){a.registerHelper("lookup",function(a,b){return a&&a[b]})}}),define("handlebars/helpers/with",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerHelper("with",function(a,b){c.isFunction(a)&&(a=a.call(this));var d=b.fn;if(c.isEmpty(a))return b.inverse(this);var e=b.data;return b.data&&b.ids&&(e=c.createFrame(b.data),e.contextPath=c.appendContextPath(b.data.contextPath,b.ids[0])),d(a,{data:e,blockParams:c.blockParams([a],[e&&e.contextPath])})})}}),define("handlebars/helpers",["exports","./helpers/block-helper-missing","./helpers/each","./helpers/helper-missing","./helpers/if","./helpers/log","./helpers/lookup","./helpers/with"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}function j(a){k["default"](a),l["default"](a),m["default"](a),n["default"](a),o["default"](a),p["default"](a),q["default"](a)}a.__esModule=!0,a.registerDefaultHelpers=j;var k=i(b),l=i(c),m=i(d),n=i(e),o=i(f),p=i(g),q=i(h)}),define("handlebars/decorators/inline",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerDecorator("inline",function(a,b,d,e){var f=a;return b.partials||(b.partials={},f=function(e,f){var g=d.partials;d.partials=c.extend({},g,b.partials);var h=a(e,f);return d.partials=g,h}),b.partials[e.args[0]]=e.fn,f})}}),define("handlebars/decorators",["exports","./decorators/inline"],function(a,b){"use strict";function c(a){return a&&a.__esModule?a:{"default":a}}function d(a){e["default"](a)}a.__esModule=!0,a.registerDefaultDecorators=d;var e=c(b)}),define("handlebars/logger",["exports","module","./utils"],function(a,b,c){"use strict";var d={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(a){if("string"==typeof a){var b=c.indexOf(d.methodMap,a.toLowerCase());a=b>=0?b:parseInt(a,10)}return a},log:function(a){if(a=d.lookupLevel(a),"undefined"!=typeof console&&d.lookupLevel(d.level)<=a){var b=d.methodMap[a];console[b]||(b="log");for(var c=arguments.length,e=Array(c>1?c-1:0),f=1;c>f;f++)e[f-1]=arguments[f];console[b].apply(console,e)}}};b.exports=d}),define("handlebars/base",["exports","./utils","./exception","./helpers","./decorators","./logger"],function(a,b,c,d,e,f){"use strict";function g(a){return a&&a.__esModule?a:{"default":a}}function h(a,b,c){this.helpers=a||{},this.partials=b||{},this.decorators=c||{},d.registerDefaultHelpers(this),e.registerDefaultDecorators(this)}a.__esModule=!0,a.HandlebarsEnvironment=h;var i=g(c),j=g(f),k="4.0.5";a.VERSION=k;var l=7;a.COMPILER_REVISION=l;var m={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};a.REVISION_CHANGES=m;var n="[object Object]";h.prototype={constructor:h,logger:j["default"],log:j["default"].log,registerHelper:function(a,c){if(b.toString.call(a)===n){if(c)throw new i["default"]("Arg not supported with multiple helpers");b.extend(this.helpers,a)}else this.helpers[a]=c},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,c){if(b.toString.call(a)===n)b.extend(this.partials,a);else{if("undefined"==typeof c)throw new i["default"]('Attempting to register a partial called "'+a+'" as undefined');this.partials[a]=c}},unregisterPartial:function(a){delete this.partials[a]},registerDecorator:function(a,c){if(b.toString.call(a)===n){if(c)throw new i["default"]("Arg not supported with multiple decorators");b.extend(this.decorators,a)}else this.decorators[a]=c},unregisterDecorator:function(a){delete this.decorators[a]}};var o=j["default"].log;a.log=o,a.createFrame=b.createFrame,a.logger=j["default"]}),define("handlebars/safe-string",["exports","module"],function(a,b){"use strict";function c(a){this.string=a}c.prototype.toString=c.prototype.toHTML=function(){return""+this.string},b.exports=c}),define("handlebars/runtime",["exports","./utils","./exception","./base"],function(a,b,c,d){"use strict";function e(a){return a&&a.__esModule?a:{"default":a}}function f(a){var b=a&&a[0]||1,c=d.COMPILER_REVISION;if(b!==c){if(c>b){var e=d.REVISION_CHANGES[c],f=d.REVISION_CHANGES[b];throw new n["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+e+") or downgrade your runtime to an older version ("+f+").")}throw new n["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function g(a,c){function d(d,e,f){f.hash&&(e=b.extend({},e,f.hash),f.ids&&(f.ids[0]=!0)),d=c.VM.resolvePartial.call(this,d,e,f);var g=c.VM.invokePartial.call(this,d,e,f);if(null==g&&c.compile&&(f.partials[f.name]=c.compile(d,a.compilerOptions,c),g=f.partials[f.name](e,f)),null!=g){if(f.indent){for(var h=g.split("\n"),i=0,j=h.length;j>i&&(h[i]||i+1!==j);i++)h[i]=f.indent+h[i];g=h.join("\n")}return g}throw new n["default"]("The partial "+f.name+" could not be compiled when running in runtime-only mode")}function e(b){function c(b){return""+a.main(f,b,f.helpers,f.partials,g,i,h)}var d=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],g=d.data;e._setup(d),!d.partial&&a.useData&&(g=l(b,g));var h=void 0,i=a.useBlockParams?[]:void 0;return a.useDepths&&(h=d.depths?b!==d.depths[0]?[b].concat(d.depths):d.depths:[b]),(c=m(a.main,c,f,d.depths||[],g,i))(b,d)}if(!c)throw new n["default"]("No environment passed to template");if(!a||!a.main)throw new n["default"]("Unknown template object: "+typeof a);a.main.decorator=a.main_d,c.VM.checkRevision(a.compiler);var f={strict:function(a,b){if(!(b in a))throw new n["default"]('"'+b+'" not defined in '+a);return a[b]},lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:b.escapeExpression,invokePartial:d,fn:function(b){var c=a[b];return c.decorator=a[b+"_d"],c},programs:[],program:function(a,b,c,d,e){var f=this.programs[a],g=this.fn(a);return b||e||d||c?f=h(this,a,g,b,c,d,e):f||(f=this.programs[a]=h(this,a,g)),f},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,c){var d=a||c;return a&&c&&a!==c&&(d=b.extend({},c,a)),d},noop:c.VM.noop,compilerInfo:a.compiler};return e.isTop=!0,e._setup=function(b){b.partial?(f.helpers=b.helpers,f.partials=b.partials,f.decorators=b.decorators):(f.helpers=f.merge(b.helpers,c.helpers),a.usePartial&&(f.partials=f.merge(b.partials,c.partials)),(a.usePartial||a.useDecorators)&&(f.decorators=f.merge(b.decorators,c.decorators)))},e._child=function(b,c,d,e){if(a.useBlockParams&&!d)throw new n["default"]("must pass block params");if(a.useDepths&&!e)throw new n["default"]("must pass parent depths");return h(f,b,a[b],c,0,d,e)},e}function h(a,b,c,d,e,f,g){function h(b){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],h=g;return g&&b!==g[0]&&(h=[b].concat(g)),c(a,b,a.helpers,a.partials,e.data||d,f&&[e.blockParams].concat(f),h)}return h=m(c,h,a,g,d,f),h.program=b,h.depth=g?g.length:0,h.blockParams=e||0,h}function i(a,b,c){return a?a.call||c.name||(c.name=a,a=c.partials[a]):a="@partial-block"===c.name?c.data["partial-block"]:c.partials[c.name],a}function j(a,c,e){e.partial=!0,e.ids&&(e.data.contextPath=e.ids[0]||e.data.contextPath);var f=void 0;if(e.fn&&e.fn!==k&&(e.data=d.createFrame(e.data),f=e.data["partial-block"]=e.fn,f.partials&&(e.partials=b.extend({},e.partials,f.partials))),void 0===a&&f&&(a=f),void 0===a)throw new n["default"]("The partial "+e.name+" could not be found");return a instanceof Function?a(c,e):void 0}function k(){return""}function l(a,b){return b&&"root"in b||(b=b?d.createFrame(b):{},b.root=a),b}function m(a,c,d,e,f,g){if(a.decorator){var h={};c=a.decorator(c,h,d,e&&e[0],f,g,e),b.extend(c,h)}return c}a.__esModule=!0,a.checkRevision=f,a.template=g,a.wrapProgram=h,a.resolvePartial=i,a.invokePartial=j,a.noop=k;var n=e(c)}),define("handlebars/no-conflict",["exports","module"],function(a,b){"use strict";b.exports=function(a){var b="undefined"!=typeof global?global:window,c=b.Handlebars;a.noConflict=function(){return b.Handlebars===a&&(b.Handlebars=c),a}}}),define("handlebars.runtime",["exports","module","./handlebars/base","./handlebars/safe-string","./handlebars/exception","./handlebars/utils","./handlebars/runtime","./handlebars/no-conflict"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}function j(){var a=new c.HandlebarsEnvironment;return f.extend(a,c),a.SafeString=k["default"],a.Exception=l["default"],a.Utils=f,a.escapeExpression=f.escapeExpression,a.VM=g,a.template=function(b){return g.template(b,a)},a}var k=i(d),l=i(e),m=i(h),n=j();n.create=j,m["default"](n),n["default"]=n,b.exports=n}),define("handlebars/compiler/ast",["exports","module"],function(a,b){"use strict";var c={helpers:{helperExpression:function(a){return"SubExpression"===a.type||("MustacheStatement"===a.type||"BlockStatement"===a.type)&&!!(a.params&&a.params.length||a.hash)},scopedId:function(a){return/^\.|this\b/.test(a.original)},simpleId:function(a){return 1===a.parts.length&&!c.helpers.scopedId(a)&&!a.depth}}};b.exports=c}),define("handlebars/compiler/parser",["exports"],function(a){"use strict";var b=function(){function a(){this.yy={}}var b={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition_plus0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,mustache_repetition0:49,mustache_option0:50,OPEN_UNESCAPED:51,mustache_repetition1:52,mustache_option1:53,CLOSE_UNESCAPED:54,OPEN_PARTIAL:55,partialName:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,param:63,sexpr:64,OPEN_SEXPR:65,sexpr_repetition0:66,sexpr_option0:67,CLOSE_SEXPR:68,hash:69,hash_repetition_plus0:70,hashSegment:71,ID:72,EQUALS:73,blockParams:74,OPEN_BLOCK_PARAMS:75,blockParams_repetition_plus0:76,CLOSE_BLOCK_PARAMS:77,path:78,dataName:79,STRING:80,NUMBER:81,BOOLEAN:82,UNDEFINED:83,NULL:84,DATA:85,pathSegments:86,SEP:87,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",51:"OPEN_UNESCAPED",54:"CLOSE_UNESCAPED",55:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",65:"OPEN_SEXPR",68:"CLOSE_SEXPR",72:"ID",73:"EQUALS",75:"OPEN_BLOCK_PARAMS",77:"CLOSE_BLOCK_PARAMS",80:"STRING",81:"NUMBER",82:"BOOLEAN",83:"UNDEFINED",84:"NULL",85:"DATA",87:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],[12,3],[59,5],[63,1],[63,1],[64,5],[69,1],[71,3],[74,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[56,1],[56,1],[79,2],[78,1],[86,3],[86,1],[6,0],[6,2],[17,1],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[49,0],[49,2],[50,0],[50,1],[52,0],[52,2],[53,0],[53,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[66,0],[66,2],[67,0],[67,1],[70,1],[70,2],[76,1],[76,2]],performAction:function(a,b,c,d,e,f,g){var h=f.length-1;switch(e){case 1:return f[h-1];case 2:this.$=d.prepareProgram(f[h]);break;case 3:this.$=f[h];break;case 4:this.$=f[h];break;case 5:this.$=f[h];break;case 6:this.$=f[h];break;case 7:this.$=f[h];break;case 8:this.$=f[h];break;case 9:this.$={type:"CommentStatement",value:d.stripComment(f[h]),strip:d.stripFlags(f[h],f[h]),loc:d.locInfo(this._$)};break;case 10:this.$={type:"ContentStatement",original:f[h],value:f[h],loc:d.locInfo(this._$)};break;case 11:this.$=d.prepareRawBlock(f[h-2],f[h-1],f[h],this._$);break;case 12:this.$={path:f[h-3],params:f[h-2],hash:f[h-1]};break;case 13:this.$=d.prepareBlock(f[h-3],f[h-2],f[h-1],f[h],!1,this._$);break;case 14:this.$=d.prepareBlock(f[h-3],f[h-2],f[h-1],f[h],!0,this._$);break;case 15:this.$={open:f[h-5],path:f[h-4],params:f[h-3],hash:f[h-2],blockParams:f[h-1],strip:d.stripFlags(f[h-5],f[h])};break;case 16:this.$={path:f[h-4],params:f[h-3],hash:f[h-2],blockParams:f[h-1],strip:d.stripFlags(f[h-5],f[h])};break;case 17:this.$={path:f[h-4],params:f[h-3],hash:f[h-2],blockParams:f[h-1],strip:d.stripFlags(f[h-5],f[h])};break;case 18:this.$={strip:d.stripFlags(f[h-1],f[h-1]),program:f[h]};break;case 19:var i=d.prepareBlock(f[h-2],f[h-1],f[h],f[h],!1,this._$),j=d.prepareProgram([i],f[h-1].loc);j.chained=!0,this.$={strip:f[h-2].strip,program:j,chain:!0};break;case 20:this.$=f[h];break;case 21:this.$={path:f[h-1],strip:d.stripFlags(f[h-2],f[h])};break;case 22:this.$=d.prepareMustache(f[h-3],f[h-2],f[h-1],f[h-4],d.stripFlags(f[h-4],f[h]),this._$);break;case 23:this.$=d.prepareMustache(f[h-3],f[h-2],f[h-1],f[h-4],d.stripFlags(f[h-4],f[h]),this._$);break;case 24:this.$={type:"PartialStatement",name:f[h-3],params:f[h-2],hash:f[h-1],indent:"",strip:d.stripFlags(f[h-4],f[h]),loc:d.locInfo(this._$)};break;case 25:this.$=d.preparePartialBlock(f[h-2],f[h-1],f[h],this._$);break;case 26:this.$={path:f[h-3],params:f[h-2],hash:f[h-1],strip:d.stripFlags(f[h-4],f[h])};break;case 27:this.$=f[h];break;case 28:this.$=f[h];break;case 29:this.$={type:"SubExpression",path:f[h-3],params:f[h-2],hash:f[h-1],loc:d.locInfo(this._$)};break;case 30:this.$={type:"Hash",pairs:f[h],loc:d.locInfo(this._$)};break;case 31:this.$={type:"HashPair",key:d.id(f[h-2]),value:f[h],loc:d.locInfo(this._$)};break;case 32:this.$=d.id(f[h-1]);break;case 33:this.$=f[h];break;case 34:this.$=f[h];break;case 35:this.$={type:"StringLiteral",value:f[h],original:f[h],loc:d.locInfo(this._$)};break;case 36:this.$={type:"NumberLiteral",value:Number(f[h]),original:Number(f[h]),loc:d.locInfo(this._$)};break;case 37:this.$={type:"BooleanLiteral",value:"true"===f[h],original:"true"===f[h],loc:d.locInfo(this._$)};break;case 38:this.$={type:"UndefinedLiteral",original:void 0,value:void 0,loc:d.locInfo(this._$)};break;case 39:this.$={type:"NullLiteral",original:null,value:null,loc:d.locInfo(this._$)};break;case 40:this.$=f[h];break;case 41:this.$=f[h];break;case 42:this.$=d.preparePath(!0,f[h],this._$);break;case 43:this.$=d.preparePath(!1,f[h],this._$);break;case 44:f[h-2].push({part:d.id(f[h]),original:f[h],separator:f[h-1]}),this.$=f[h-2];break;case 45:this.$=[{part:d.id(f[h]),original:f[h]}];break;case 46:this.$=[];break;case 47:f[h-1].push(f[h]);break;case 48:this.$=[f[h]];break;case 49:f[h-1].push(f[h]);break;case 50:this.$=[];break;case 51:f[h-1].push(f[h]);break;case 58:this.$=[];break;case 59:f[h-1].push(f[h]);break;case 64:this.$=[];break;case 65:f[h-1].push(f[h]);break;case 70:this.$=[];break;case 71:f[h-1].push(f[h]);break;case 78:this.$=[];break;case 79:f[h-1].push(f[h]);break;case 82:this.$=[];break;case 83:f[h-1].push(f[h]);break;case 86:this.$=[];break;case 87:f[h-1].push(f[h]);break;case 90:this.$=[];break;case 91:f[h-1].push(f[h]);break;case 94:this.$=[];break;case 95:f[h-1].push(f[h]);break;case 98:this.$=[f[h]];break;case 99:f[h-1].push(f[h]);break;case 100:this.$=[f[h]];break;case 101:f[h-1].push(f[h])}},table:[{3:1,4:2,5:[2,46],6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:[1,12],15:[1,20],16:17,19:[1,23],24:15,27:16,29:[1,21],34:[1,22],39:[2,2],44:[2,2],47:[2,2],48:[1,13],51:[1,14],55:[1,18],59:19,60:[1,24]},{1:[2,1]},{5:[2,47],14:[2,47],15:[2,47],19:[2,47],29:[2,47],34:[2,47],39:[2,47],44:[2,47],47:[2,47],48:[2,47],51:[2,47],55:[2,47],60:[2,47]},{5:[2,3],14:[2,3],15:[2,3],19:[2,3],29:[2,3],34:[2,3],39:[2,3],44:[2,3],47:[2,3],48:[2,3],51:[2,3],55:[2,3],60:[2,3]},{5:[2,4],14:[2,4],15:[2,4],19:[2,4],29:[2,4],34:[2,4],39:[2,4],44:[2,4],47:[2,4],48:[2,4],51:[2,4],55:[2,4],60:[2,4]},{5:[2,5],14:[2,5],15:[2,5],19:[2,5],29:[2,5],34:[2,5],39:[2,5],44:[2,5],47:[2,5],48:[2,5],51:[2,5],55:[2,5],60:[2,5]},{5:[2,6],14:[2,6],15:[2,6],19:[2,6],29:[2,6],34:[2,6],39:[2,6],44:[2,6],47:[2,6],48:[2,6],51:[2,6],55:[2,6],60:[2,6]},{5:[2,7],14:[2,7],15:[2,7],19:[2,7],29:[2,7],34:[2,7],39:[2,7],44:[2,7],47:[2,7],48:[2,7],51:[2,7],55:[2,7],60:[2,7]},{5:[2,8],14:[2,8],15:[2,8],19:[2,8],29:[2,8],34:[2,8],39:[2,8],44:[2,8],47:[2,8],48:[2,8],51:[2,8],55:[2,8],60:[2,8]},{5:[2,9],14:[2,9],15:[2,9],19:[2,9],29:[2,9],34:[2,9],39:[2,9],44:[2,9],47:[2,9],48:[2,9],51:[2,9],55:[2,9],60:[2,9]},{20:25,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:36,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:37,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{4:38,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{13:40,15:[1,20],17:39},{20:42,56:41,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:45,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{5:[2,10],14:[2,10],15:[2,10],18:[2,10],19:[2,10],29:[2,10],34:[2,10],39:[2,10],44:[2,10],47:[2,10],48:[2,10],51:[2,10],55:[2,10],60:[2,10]},{20:46,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:47,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:48,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:42,56:49,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[2,78],49:50,65:[2,78],72:[2,78],80:[2,78],81:[2,78],82:[2,78],83:[2,78],84:[2,78],85:[2,78]},{23:[2,33],33:[2,33],54:[2,33],65:[2,33],68:[2,33],72:[2,33],75:[2,33],80:[2,33],81:[2,33],82:[2,33],83:[2,33],84:[2,33],85:[2,33]},{23:[2,34],33:[2,34],54:[2,34],65:[2,34],68:[2,34],72:[2,34],75:[2,34],80:[2,34],81:[2,34],82:[2,34],83:[2,34],84:[2,34],85:[2,34]},{23:[2,35],33:[2,35],54:[2,35],65:[2,35],68:[2,35],72:[2,35],75:[2,35],80:[2,35],81:[2,35],82:[2,35],83:[2,35],84:[2,35],85:[2,35]},{23:[2,36],33:[2,36],54:[2,36],65:[2,36],68:[2,36],72:[2,36],75:[2,36],80:[2,36],81:[2,36],82:[2,36],83:[2,36],84:[2,36],85:[2,36]},{23:[2,37],33:[2,37],54:[2,37],65:[2,37],68:[2,37],72:[2,37],75:[2,37],80:[2,37],81:[2,37],82:[2,37],83:[2,37],84:[2,37],85:[2,37]},{23:[2,38],33:[2,38],54:[2,38],65:[2,38],68:[2,38],72:[2,38],75:[2,38],80:[2,38],81:[2,38],82:[2,38],83:[2,38],84:[2,38],85:[2,38]},{23:[2,39],33:[2,39],54:[2,39],65:[2,39],68:[2,39],72:[2,39],75:[2,39],80:[2,39],81:[2,39],82:[2,39],83:[2,39],84:[2,39],85:[2,39]},{23:[2,43],33:[2,43],54:[2,43],65:[2,43],68:[2,43],72:[2,43],75:[2,43],80:[2,43],81:[2,43],82:[2,43],83:[2,43],84:[2,43],85:[2,43],87:[1,51]},{72:[1,35],86:52},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{52:53,54:[2,82],65:[2,82],72:[2,82],80:[2,82],81:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82]},{25:54,38:56,39:[1,58],43:57,44:[1,59],45:55,47:[2,54]},{28:60,43:61,44:[1,59],47:[2,56]},{13:63,15:[1,20],18:[1,62]},{15:[2,48],18:[2,48]},{33:[2,86],57:64,65:[2,86],72:[2,86],80:[2,86],81:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86]},{33:[2,40],65:[2,40],72:[2,40],80:[2,40],81:[2,40],82:[2,40],83:[2,40],84:[2,40],85:[2,40]},{33:[2,41],65:[2,41],72:[2,41],80:[2,41],81:[2,41],82:[2,41],83:[2,41],84:[2,41],85:[2,41]},{20:65,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:66,47:[1,67]},{30:68,33:[2,58],65:[2,58],72:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],84:[2,58],85:[2,58]},{33:[2,64],35:69,65:[2,64],72:[2,64],75:[2,64],80:[2,64],81:[2,64],82:[2,64],83:[2,64],84:[2,64],85:[2,64]},{21:70,23:[2,50],65:[2,50],72:[2,50],80:[2,50],81:[2,50],82:[2,50],83:[2,50],84:[2,50],85:[2,50]},{33:[2,90],61:71,65:[2,90],72:[2,90],80:[2,90],81:[2,90],82:[2,90],83:[2,90],84:[2,90],85:[2,90]},{20:75,33:[2,80],50:72,63:73,64:76,65:[1,44],69:74,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{72:[1,80]},{23:[2,42],33:[2,42],54:[2,42],65:[2,42],68:[2,42],72:[2,42],75:[2,42],80:[2,42],81:[2,42],82:[2,42],83:[2,42],84:[2,42],85:[2,42],87:[1,51]},{20:75,53:81,54:[2,84],63:82,64:76,65:[1,44],69:83,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:84,47:[1,67]},{47:[2,55]},{4:85,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{47:[2,20]},{20:86,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:87,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{26:88,47:[1,67]},{47:[2,57]},{5:[2,11],14:[2,11],15:[2,11],19:[2,11],29:[2,11],34:[2,11],39:[2,11],44:[2,11],47:[2,11],48:[2,11],51:[2,11],55:[2,11],60:[2,11]},{15:[2,49],18:[2,49]},{20:75,33:[2,88],58:89,63:90,64:76,65:[1,44],69:91,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{65:[2,94],66:92,68:[2,94],72:[2,94],80:[2,94],81:[2,94],82:[2,94],83:[2,94],84:[2,94],85:[2,94]},{5:[2,25],14:[2,25],15:[2,25],19:[2,25],29:[2,25],34:[2,25],39:[2,25],44:[2,25],47:[2,25],48:[2,25],51:[2,25],55:[2,25],60:[2,25]},{20:93,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,31:94,33:[2,60],63:95,64:76,65:[1,44],69:96,70:77,71:78,72:[1,79],75:[2,60],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,66],36:97,63:98,64:76,65:[1,44],69:99,70:77,71:78,72:[1,79],75:[2,66],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,22:100,23:[2,52],63:101,64:76,65:[1,44],69:102,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,92],62:103,63:104,64:76,65:[1,44],69:105,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,106]},{33:[2,79],65:[2,79],72:[2,79],80:[2,79],81:[2,79],82:[2,79],83:[2,79],84:[2,79],85:[2,79]},{33:[2,81]},{23:[2,27],33:[2,27],54:[2,27],65:[2,27],68:[2,27],72:[2,27],75:[2,27],80:[2,27],81:[2,27],82:[2,27],83:[2,27],84:[2,27],85:[2,27]},{23:[2,28],33:[2,28],54:[2,28],65:[2,28],68:[2,28],72:[2,28],75:[2,28],80:[2,28],81:[2,28],82:[2,28],83:[2,28],84:[2,28],85:[2,28]},{23:[2,30],33:[2,30],54:[2,30],68:[2,30],71:107,72:[1,108],75:[2,30]},{23:[2,98],33:[2,98],54:[2,98],68:[2,98],72:[2,98],75:[2,98]},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],73:[1,109],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{23:[2,44],33:[2,44],54:[2,44],65:[2,44],68:[2,44],72:[2,44],75:[2,44],80:[2,44],81:[2,44],82:[2,44],83:[2,44],84:[2,44],85:[2,44],87:[2,44]},{54:[1,110]},{54:[2,83],65:[2,83],72:[2,83],80:[2,83],81:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83]},{54:[2,85]},{5:[2,13],14:[2,13],15:[2,13],19:[2,13],29:[2,13],34:[2,13],39:[2,13],44:[2,13],47:[2,13],48:[2,13],51:[2,13],55:[2,13],60:[2,13]},{38:56,39:[1,58],43:57,44:[1,59],45:112,46:111,47:[2,76]},{33:[2,70],40:113,65:[2,70],72:[2,70],75:[2,70],80:[2,70],81:[2,70],82:[2,70],83:[2,70],84:[2,70],85:[2,70]},{47:[2,18]},{5:[2,14],14:[2,14],15:[2,14],19:[2,14],29:[2,14],34:[2,14],39:[2,14],44:[2,14],47:[2,14],48:[2,14],51:[2,14],55:[2,14],60:[2,14]},{33:[1,114]},{33:[2,87],65:[2,87],72:[2,87],80:[2,87],81:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87]},{33:[2,89]},{20:75,63:116,64:76,65:[1,44],67:115,68:[2,96],69:117,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,118]},{32:119,33:[2,62],74:120,75:[1,121]},{33:[2,59],65:[2,59],72:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],84:[2,59],85:[2,59]},{33:[2,61],75:[2,61]},{33:[2,68],37:122,74:123,75:[1,121]},{33:[2,65],65:[2,65],72:[2,65],75:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],84:[2,65],85:[2,65]},{33:[2,67],75:[2,67]},{23:[1,124]},{23:[2,51],65:[2,51],72:[2,51],80:[2,51],81:[2,51],82:[2,51],83:[2,51],84:[2,51],85:[2,51]},{23:[2,53]},{33:[1,125]},{33:[2,91],65:[2,91],72:[2,91],80:[2,91],81:[2,91],82:[2,91],83:[2,91],84:[2,91],85:[2,91]},{33:[2,93]},{5:[2,22],14:[2,22],15:[2,22],19:[2,22],29:[2,22],34:[2,22],39:[2,22],44:[2,22],47:[2,22],48:[2,22],51:[2,22],55:[2,22],60:[2,22]},{23:[2,99],33:[2,99],54:[2,99],68:[2,99],72:[2,99],75:[2,99]},{73:[1,109]},{20:75,63:126,64:76,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,23],14:[2,23],15:[2,23],19:[2,23],29:[2,23],34:[2,23],39:[2,23],44:[2,23],47:[2,23],48:[2,23],51:[2,23],55:[2,23],60:[2,23]},{47:[2,19]},{47:[2,77]},{20:75,33:[2,72],41:127,63:128,64:76,65:[1,44],69:129,70:77,71:78,72:[1,79],75:[2,72],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,24],14:[2,24],15:[2,24],19:[2,24],29:[2,24],34:[2,24],39:[2,24],44:[2,24],47:[2,24],48:[2,24],51:[2,24],55:[2,24],60:[2,24]},{68:[1,130]},{65:[2,95],68:[2,95],72:[2,95],80:[2,95],81:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95]},{68:[2,97]},{5:[2,21],14:[2,21],15:[2,21],19:[2,21],29:[2,21],34:[2,21],39:[2,21],44:[2,21],47:[2,21],48:[2,21],51:[2,21],55:[2,21],60:[2,21]},{33:[1,131]},{33:[2,63]},{72:[1,133],76:132},{33:[1,134]},{33:[2,69]},{15:[2,12]},{14:[2,26],15:[2,26],19:[2,26],29:[2,26],34:[2,26],47:[2,26],48:[2,26],51:[2,26],55:[2,26],60:[2,26]},{23:[2,31],33:[2,31],54:[2,31],68:[2,31],72:[2,31],75:[2,31]},{33:[2,74],42:135,74:136,75:[1,121]},{33:[2,71],65:[2,71],72:[2,71],75:[2,71],80:[2,71],81:[2,71],82:[2,71],83:[2,71],84:[2,71],85:[2,71]},{33:[2,73],75:[2,73]},{23:[2,29],33:[2,29],54:[2,29],65:[2,29],68:[2,29],72:[2,29],75:[2,29],80:[2,29],81:[2,29],82:[2,29],83:[2,29],84:[2,29],85:[2,29]},{14:[2,15],15:[2,15],19:[2,15],29:[2,15],34:[2,15],39:[2,15],44:[2,15],47:[2,15],48:[2,15],51:[2,15],55:[2,15],60:[2,15]},{72:[1,138],77:[1,137]},{72:[2,100],77:[2,100]},{14:[2,16],15:[2,16],19:[2,16],29:[2,16],34:[2,16],44:[2,16],47:[2,16],48:[2,16],51:[2,16],55:[2,16],60:[2,16]},{33:[1,139]},{33:[2,75]},{33:[2,32]},{72:[2,101],77:[2,101]},{14:[2,17],15:[2,17],19:[2,17],29:[2,17],34:[2,17],39:[2,17],44:[2,17],47:[2,17],48:[2,17],51:[2,17],55:[2,17],60:[2,17]}],defaultActions:{4:[2,1],55:[2,55],57:[2,20],61:[2,57],74:[2,81],83:[2,85],87:[2,18],91:[2,89],102:[2,53],105:[2,93],111:[2,19],112:[2,77],117:[2,97],120:[2,63],123:[2,69],124:[2,12],136:[2,75],137:[2,32]},parseError:function(a,b){throw new Error(a)},parse:function(a){function b(){var a;return a=c.lexer.lex()||1,"number"!=typeof a&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0;this.lexer.setInput(a),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var l=this.lexer.yylloc;f.push(l);
var m=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var n,o,p,q,r,s,t,u,v,w={};;){if(p=d[d.length-1],this.defaultActions[p]?q=this.defaultActions[p]:((null===n||"undefined"==typeof n)&&(n=b()),q=g[p]&&g[p][n]),"undefined"==typeof q||!q.length||!q[0]){var x="";if(!k){v=[];for(s in g[p])this.terminals_[s]&&s>2&&v.push("'"+this.terminals_[s]+"'");x=this.lexer.showPosition?"Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[n]||n)+"'":"Parse error on line "+(i+1)+": Unexpected "+(1==n?"end of input":"'"+(this.terminals_[n]||n)+"'"),this.parseError(x,{text:this.lexer.match,token:this.terminals_[n]||n,line:this.lexer.yylineno,loc:l,expected:v})}}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+p+", token: "+n);switch(q[0]){case 1:d.push(n),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(q[1]),n=null,o?(n=o,o=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,l=this.lexer.yylloc,k>0&&k--);break;case 2:if(t=this.productions_[q[1]][1],w.$=e[e.length-t],w._$={first_line:f[f.length-(t||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(t||1)].first_column,last_column:f[f.length-1].last_column},m&&(w._$.range=[f[f.length-(t||1)].range[0],f[f.length-1].range[1]]),r=this.performAction.call(w,h,j,i,this.yy,q[1],e,f),"undefined"!=typeof r)return r;t&&(d=d.slice(0,-1*t*2),e=e.slice(0,-1*t),f=f.slice(0,-1*t)),d.push(this.productions_[q[1]][0]),e.push(w.$),f.push(w._$),u=g[d[d.length-2]][d[d.length-1]],d.push(u);break;case 3:return!0}}return!0}},c=function(){var a={EOF:1,parseError:function(a,b){if(!this.yy.parser)throw new Error(a);this.yy.parser.parseError(a,b)},setInput:function(a){return this._input=a,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var b=a.match(/(?:\r\n?|\n).*/g);return b?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var b=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-b-1),this.offset-=b;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-b},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-b]),this},more:function(){return this._more=!0,this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=new Array(a.length+1).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,c,d,e;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),g=0;g<f.length&&(c=this._input.match(this.rules[f[g]]),!c||b&&!(c[0].length>b[0].length)||(b=c,d=g,this.options.flex));g++);return b?(e=b[0].match(/(?:\r\n?|\n).*/g),e&&(this.yylineno+=e.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:e?e[e.length-1].length-e[e.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+b[0].length},this.yytext+=b[0],this.match+=b[0],this.matches=b,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(b[0].length),this.matched+=b[0],a=this.performAction.call(this,this.yy,this,f[d],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a?a:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return"undefined"!=typeof a?a:this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(a){this.begin(a)}};return a.options={},a.performAction=function(a,b,c,d){function e(a,c){return b.yytext=b.yytext.substr(a,b.yyleng-c)}switch(c){case 0:if("\\\\"===b.yytext.slice(-2)?(e(0,1),this.begin("mu")):"\\"===b.yytext.slice(-1)?(e(0,1),this.begin("emu")):this.begin("mu"),b.yytext)return 15;break;case 1:return 15;case 2:return this.popState(),15;case 3:return this.begin("raw"),15;case 4:return this.popState(),"raw"===this.conditionStack[this.conditionStack.length-1]?15:(b.yytext=b.yytext.substr(5,b.yyleng-9),"END_RAW_BLOCK");case 5:return 15;case 6:return this.popState(),14;case 7:return 65;case 8:return 68;case 9:return 19;case 10:return this.popState(),this.begin("raw"),23;case 11:return 55;case 12:return 60;case 13:return 29;case 14:return 47;case 15:return this.popState(),44;case 16:return this.popState(),44;case 17:return 34;case 18:return 39;case 19:return 51;case 20:return 48;case 21:this.unput(b.yytext),this.popState(),this.begin("com");break;case 22:return this.popState(),14;case 23:return 48;case 24:return 73;case 25:return 72;case 26:return 72;case 27:return 87;case 28:break;case 29:return this.popState(),54;case 30:return this.popState(),33;case 31:return b.yytext=e(1,2).replace(/\\"/g,'"'),80;case 32:return b.yytext=e(1,2).replace(/\\'/g,"'"),80;case 33:return 85;case 34:return 82;case 35:return 82;case 36:return 83;case 37:return 84;case 38:return 81;case 39:return 75;case 40:return 77;case 41:return 72;case 42:return b.yytext=b.yytext.replace(/\\([\\\]])/g,"$1"),72;case 43:return"INVALID";case 44:return 5}},a.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^\/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[(\\\]|[^\]])*\])/,/^(?:.)/,/^(?:$)/],a.conditions={mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[6],inclusive:!1},raw:{rules:[3,4,5],inclusive:!1},INITIAL:{rules:[0,1,44],inclusive:!0}},a}();return b.lexer=c,a.prototype=b,b.Parser=a,new a}();a.__esModule=!0,a["default"]=b}),define("handlebars/compiler/visitor",["exports","module","../exception"],function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(){this.parents=[]}function f(a){this.acceptRequired(a,"path"),this.acceptArray(a.params),this.acceptKey(a,"hash")}function g(a){f.call(this,a),this.acceptKey(a,"program"),this.acceptKey(a,"inverse")}function h(a){this.acceptRequired(a,"name"),this.acceptArray(a.params),this.acceptKey(a,"hash")}var i=d(c);e.prototype={constructor:e,mutating:!1,acceptKey:function(a,b){var c=this.accept(a[b]);if(this.mutating){if(c&&!e.prototype[c.type])throw new i["default"]('Unexpected node type "'+c.type+'" found when accepting '+b+" on "+a.type);a[b]=c}},acceptRequired:function(a,b){if(this.acceptKey(a,b),!a[b])throw new i["default"](a.type+" requires "+b)},acceptArray:function(a){for(var b=0,c=a.length;c>b;b++)this.acceptKey(a,b),a[b]||(a.splice(b,1),b--,c--)},accept:function(a){if(a){if(!this[a.type])throw new i["default"]("Unknown type: "+a.type,a);this.current&&this.parents.unshift(this.current),this.current=a;var b=this[a.type](a);return this.current=this.parents.shift(),!this.mutating||b?b:b!==!1?a:void 0}},Program:function(a){this.acceptArray(a.body)},MustacheStatement:f,Decorator:f,BlockStatement:g,DecoratorBlock:g,PartialStatement:h,PartialBlockStatement:function(a){h.call(this,a),this.acceptKey(a,"program")},ContentStatement:function(){},CommentStatement:function(){},SubExpression:f,PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(a){this.acceptArray(a.pairs)},HashPair:function(a){this.acceptRequired(a,"value")}},b.exports=e}),define("handlebars/compiler/whitespace-control",["exports","module","./visitor"],function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.options=a}function f(a,b,c){void 0===b&&(b=a.length);var d=a[b-1],e=a[b-2];return d?"ContentStatement"===d.type?(e||!c?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(d.original):void 0:c}function g(a,b,c){void 0===b&&(b=-1);var d=a[b+1],e=a[b+2];return d?"ContentStatement"===d.type?(e||!c?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(d.original):void 0:c}function h(a,b,c){var d=a[null==b?0:b+1];if(d&&"ContentStatement"===d.type&&(c||!d.rightStripped)){var e=d.value;d.value=d.value.replace(c?/^\s+/:/^[ \t]*\r?\n?/,""),d.rightStripped=d.value!==e}}function i(a,b,c){var d=a[null==b?a.length-1:b-1];if(d&&"ContentStatement"===d.type&&(c||!d.leftStripped)){var e=d.value;return d.value=d.value.replace(c?/\s+$/:/[ \t]+$/,""),d.leftStripped=d.value!==e,d.leftStripped}}var j=d(c);e.prototype=new j["default"],e.prototype.Program=function(a){var b=!this.options.ignoreStandalone,c=!this.isRootSeen;this.isRootSeen=!0;for(var d=a.body,e=0,j=d.length;j>e;e++){var k=d[e],l=this.accept(k);if(l){var m=f(d,e,c),n=g(d,e,c),o=l.openStandalone&&m,p=l.closeStandalone&&n,q=l.inlineStandalone&&m&&n;l.close&&h(d,e,!0),l.open&&i(d,e,!0),b&&q&&(h(d,e),i(d,e)&&"PartialStatement"===k.type&&(k.indent=/([ \t]+$)/.exec(d[e-1].original)[1])),b&&o&&(h((k.program||k.inverse).body),i(d,e)),b&&p&&(h(d,e),i((k.inverse||k.program).body))}}return a},e.prototype.BlockStatement=e.prototype.DecoratorBlock=e.prototype.PartialBlockStatement=function(a){this.accept(a.program),this.accept(a.inverse);var b=a.program||a.inverse,c=a.program&&a.inverse,d=c,e=c;if(c&&c.chained)for(d=c.body[0].program;e.chained;)e=e.body[e.body.length-1].program;var j={open:a.openStrip.open,close:a.closeStrip.close,openStandalone:g(b.body),closeStandalone:f((d||b).body)};if(a.openStrip.close&&h(b.body,null,!0),c){var k=a.inverseStrip;k.open&&i(b.body,null,!0),k.close&&h(d.body,null,!0),a.closeStrip.open&&i(e.body,null,!0),!this.options.ignoreStandalone&&f(b.body)&&g(d.body)&&(i(b.body),h(d.body))}else a.closeStrip.open&&i(b.body,null,!0);return j},e.prototype.Decorator=e.prototype.MustacheStatement=function(a){return a.strip},e.prototype.PartialStatement=e.prototype.CommentStatement=function(a){var b=a.strip||{};return{inlineStandalone:!0,open:b.open,close:b.close}},b.exports=e}),define("handlebars/compiler/helpers",["exports","../exception"],function(a,b){"use strict";function c(a){return a&&a.__esModule?a:{"default":a}}function d(a,b){if(b=b.path?b.path.original:b,a.path.original!==b){var c={loc:a.path.loc};throw new o["default"](a.path.original+" doesn't match "+b,c)}}function e(a,b){this.source=a,this.start={line:b.first_line,column:b.first_column},this.end={line:b.last_line,column:b.last_column}}function f(a){return/^\[.*\]$/.test(a)?a.substr(1,a.length-2):a}function g(a,b){return{open:"~"===a.charAt(2),close:"~"===b.charAt(b.length-3)}}function h(a){return a.replace(/^\{\{~?\!-?-?/,"").replace(/-?-?~?\}\}$/,"")}function i(a,b,c){c=this.locInfo(c);for(var d=a?"@":"",e=[],f=0,g="",h=0,i=b.length;i>h;h++){var j=b[h].part,k=b[h].original!==j;if(d+=(b[h].separator||"")+j,k||".."!==j&&"."!==j&&"this"!==j)e.push(j);else{if(e.length>0)throw new o["default"]("Invalid path: "+d,{loc:c});".."===j&&(f++,g+="../")}}return{type:"PathExpression",data:a,depth:f,parts:e,original:d,loc:c}}function j(a,b,c,d,e,f){var g=d.charAt(3)||d.charAt(2),h="{"!==g&&"&"!==g,i=/\*/.test(d);return{type:i?"Decorator":"MustacheStatement",path:a,params:b,hash:c,escaped:h,strip:e,loc:this.locInfo(f)}}function k(a,b,c,e){d(a,c),e=this.locInfo(e);var f={type:"Program",body:b,strip:{},loc:e};return{type:"BlockStatement",path:a.path,params:a.params,hash:a.hash,program:f,openStrip:{},inverseStrip:{},closeStrip:{},loc:e}}function l(a,b,c,e,f,g){e&&e.path&&d(a,e);var h=/\*/.test(a.open);b.blockParams=a.blockParams;var i=void 0,j=void 0;if(c){if(h)throw new o["default"]("Unexpected inverse block on decorator",c);c.chain&&(c.program.body[0].closeStrip=e.strip),j=c.strip,i=c.program}return f&&(f=i,i=b,b=f),{type:h?"DecoratorBlock":"BlockStatement",path:a.path,params:a.params,hash:a.hash,program:b,inverse:i,openStrip:a.strip,inverseStrip:j,closeStrip:e&&e.strip,loc:this.locInfo(g)}}function m(a,b){if(!b&&a.length){var c=a[0].loc,d=a[a.length-1].loc;c&&d&&(b={source:c.source,start:{line:c.start.line,column:c.start.column},end:{line:d.end.line,column:d.end.column}})}return{type:"Program",body:a,strip:{},loc:b}}function n(a,b,c,e){return d(a,c),{type:"PartialBlockStatement",name:a.path,params:a.params,hash:a.hash,program:b,openStrip:a.strip,closeStrip:c&&c.strip,loc:this.locInfo(e)}}a.__esModule=!0,a.SourceLocation=e,a.id=f,a.stripFlags=g,a.stripComment=h,a.preparePath=i,a.prepareMustache=j,a.prepareRawBlock=k,a.prepareBlock=l,a.prepareProgram=m,a.preparePartialBlock=n;var o=c(b)}),define("handlebars/compiler/base",["exports","./parser","./whitespace-control","./helpers","../utils"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}function g(a,b){if("Program"===a.type)return a;h["default"].yy=j,j.locInfo=function(a){return new j.SourceLocation(b&&b.srcName,a)};var c=new i["default"](b);return c.accept(h["default"].parse(a))}a.__esModule=!0,a.parse=g;var h=f(b),i=f(c);a.parser=h["default"];var j={};e.extend(j,d)}),define("handlebars/compiler/compiler",["exports","../exception","../utils","./ast"],function(a,b,c,d){"use strict";function e(a){return a&&a.__esModule?a:{"default":a}}function f(){}function g(a,b,c){if(null==a||"string"!=typeof a&&"Program"!==a.type)throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+a);b=b||{},"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var d=c.parse(a,b),e=(new c.Compiler).compile(d,b);return(new c.JavaScriptCompiler).compile(e,b)}function h(a,b,c){function d(){var d=c.parse(a,b),e=(new c.Compiler).compile(d,b),f=(new c.JavaScriptCompiler).compile(e,b,void 0,!0);return c.template(f)}function e(a,b){return f||(f=d()),f.call(this,a,b)}if(void 0===b&&(b={}),null==a||"string"!=typeof a&&"Program"!==a.type)throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+a);"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var f=void 0;return e._setup=function(a){return f||(f=d()),f._setup(a)},e._child=function(a,b,c,e){return f||(f=d()),f._child(a,b,c,e)},e}function i(a,b){if(a===b)return!0;if(c.isArray(a)&&c.isArray(b)&&a.length===b.length){for(var d=0;d<a.length;d++)if(!i(a[d],b[d]))return!1;return!0}}function j(a){if(!a.path.parts){var b=a.path;a.path={type:"PathExpression",data:!1,depth:0,parts:[b.original+""],original:b.original+"",loc:b.loc}}}a.__esModule=!0,a.Compiler=f,a.precompile=g,a.compile=h;var k=e(b),l=e(d),m=[].slice;f.prototype={compiler:f,equals:function(a){var b=this.opcodes.length;if(a.opcodes.length!==b)return!1;for(var c=0;b>c;c++){var d=this.opcodes[c],e=a.opcodes[c];if(d.opcode!==e.opcode||!i(d.args,e.args))return!1}b=this.children.length;for(var c=0;b>c;c++)if(!this.children[c].equals(a.children[c]))return!1;return!0},guid:0,compile:function(a,b){this.sourceNode=[],this.opcodes=[],this.children=[],this.options=b,this.stringParams=b.stringParams,this.trackIds=b.trackIds,b.blockParams=b.blockParams||[];var c=b.knownHelpers;if(b.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0},c)for(var d in c)d in c&&(b.knownHelpers[d]=c[d]);return this.accept(a)},compileProgram:function(a){var b=new this.compiler,c=b.compile(a,this.options),d=this.guid++;return this.usePartial=this.usePartial||c.usePartial,this.children[d]=c,this.useDepths=this.useDepths||c.useDepths,d},accept:function(a){if(!this[a.type])throw new k["default"]("Unknown type: "+a.type,a);this.sourceNode.unshift(a);var b=this[a.type](a);return this.sourceNode.shift(),b},Program:function(a){this.options.blockParams.unshift(a.blockParams);for(var b=a.body,c=b.length,d=0;c>d;d++)this.accept(b[d]);return this.options.blockParams.shift(),this.isSimple=1===c,this.blockParams=a.blockParams?a.blockParams.length:0,this},BlockStatement:function(a){j(a);var b=a.program,c=a.inverse;b=b&&this.compileProgram(b),c=c&&this.compileProgram(c);var d=this.classifySexpr(a);"helper"===d?this.helperSexpr(a,b,c):"simple"===d?(this.simpleSexpr(a),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("emptyHash"),this.opcode("blockValue",a.path.original)):(this.ambiguousSexpr(a,b,c),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},DecoratorBlock:function(a){var b=a.program&&this.compileProgram(a.program),c=this.setupFullMustacheParams(a,b,void 0),d=a.path;this.useDecorators=!0,this.opcode("registerDecorator",c.length,d.original)},PartialStatement:function(a){this.usePartial=!0;var b=a.program;b&&(b=this.compileProgram(a.program));var c=a.params;if(c.length>1)throw new k["default"]("Unsupported number of partial arguments: "+c.length,a);c.length||(this.options.explicitPartialContext?this.opcode("pushLiteral","undefined"):c.push({type:"PathExpression",parts:[],depth:0}));var d=a.name.original,e="SubExpression"===a.name.type;e&&this.accept(a.name),this.setupFullMustacheParams(a,b,void 0,!0);var f=a.indent||"";this.options.preventIndent&&f&&(this.opcode("appendContent",f),f=""),this.opcode("invokePartial",e,d,f),this.opcode("append")},PartialBlockStatement:function(a){this.PartialStatement(a)},MustacheStatement:function(a){this.SubExpression(a),a.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},Decorator:function(a){this.DecoratorBlock(a)},ContentStatement:function(a){a.value&&this.opcode("appendContent",a.value)},CommentStatement:function(){},SubExpression:function(a){j(a);var b=this.classifySexpr(a);"simple"===b?this.simpleSexpr(a):"helper"===b?this.helperSexpr(a):this.ambiguousSexpr(a)},ambiguousSexpr:function(a,b,c){var d=a.path,e=d.parts[0],f=null!=b||null!=c;this.opcode("getContext",d.depth),this.opcode("pushProgram",b),this.opcode("pushProgram",c),d.strict=!0,this.accept(d),this.opcode("invokeAmbiguous",e,f)},simpleSexpr:function(a){var b=a.path;b.strict=!0,this.accept(b),this.opcode("resolvePossibleLambda")},helperSexpr:function(a,b,c){var d=this.setupFullMustacheParams(a,b,c),e=a.path,f=e.parts[0];if(this.options.knownHelpers[f])this.opcode("invokeKnownHelper",d.length,f);else{if(this.options.knownHelpersOnly)throw new k["default"]("You specified knownHelpersOnly, but used the unknown helper "+f,a);e.strict=!0,e.falsy=!0,this.accept(e),this.opcode("invokeHelper",d.length,e.original,l["default"].helpers.simpleId(e))}},PathExpression:function(a){this.addDepth(a.depth),this.opcode("getContext",a.depth);var b=a.parts[0],c=l["default"].helpers.scopedId(a),d=!a.depth&&!c&&this.blockParamIndex(b);d?this.opcode("lookupBlockParam",d,a.parts):b?a.data?(this.options.data=!0,this.opcode("lookupData",a.depth,a.parts,a.strict)):this.opcode("lookupOnContext",a.parts,a.falsy,a.strict,c):this.opcode("pushContext")},StringLiteral:function(a){this.opcode("pushString",a.value)},NumberLiteral:function(a){this.opcode("pushLiteral",a.value)},BooleanLiteral:function(a){this.opcode("pushLiteral",a.value)},UndefinedLiteral:function(){this.opcode("pushLiteral","undefined")},NullLiteral:function(){this.opcode("pushLiteral","null")},Hash:function(a){var b=a.pairs,c=0,d=b.length;for(this.opcode("pushHash");d>c;c++)this.pushParam(b[c].value);for(;c--;)this.opcode("assignToHash",b[c].key);this.opcode("popHash")},opcode:function(a){this.opcodes.push({opcode:a,args:m.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function(a){a&&(this.useDepths=!0)},classifySexpr:function(a){var b=l["default"].helpers.simpleId(a.path),c=b&&!!this.blockParamIndex(a.path.parts[0]),d=!c&&l["default"].helpers.helperExpression(a),e=!c&&(d||b);if(e&&!d){var f=a.path.parts[0],g=this.options;g.knownHelpers[f]?d=!0:g.knownHelpersOnly&&(e=!1)}return d?"helper":e?"ambiguous":"simple"},pushParams:function(a){for(var b=0,c=a.length;c>b;b++)this.pushParam(a[b])},pushParam:function(a){var b=null!=a.value?a.value:a.original||"";if(this.stringParams)b.replace&&(b=b.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")),a.depth&&this.addDepth(a.depth),this.opcode("getContext",a.depth||0),this.opcode("pushStringParam",b,a.type),"SubExpression"===a.type&&this.accept(a);else{if(this.trackIds){var c=void 0;if(!a.parts||l["default"].helpers.scopedId(a)||a.depth||(c=this.blockParamIndex(a.parts[0])),c){var d=a.parts.slice(1).join(".");this.opcode("pushId","BlockParam",c,d)}else b=a.original||b,b.replace&&(b=b.replace(/^this(?:\.|$)/,"").replace(/^\.\//,"").replace(/^\.$/,"")),this.opcode("pushId",a.type,b)}this.accept(a)}},setupFullMustacheParams:function(a,b,c,d){var e=a.params;return this.pushParams(e),this.opcode("pushProgram",b),this.opcode("pushProgram",c),a.hash?this.accept(a.hash):this.opcode("emptyHash",d),e},blockParamIndex:function(a){for(var b=0,d=this.options.blockParams.length;d>b;b++){var e=this.options.blockParams[b],f=e&&c.indexOf(e,a);if(e&&f>=0)return[b,f]}}}}),define("handlebars/compiler/code-gen",["exports","module","../utils"],function(a,b,c){"use strict";function d(a,b,d){if(c.isArray(a)){for(var e=[],f=0,g=a.length;g>f;f++)e.push(b.wrap(a[f],d));return e}return"boolean"==typeof a||"number"==typeof a?a+"":a}function e(a){this.srcFile=a,this.source=[]}var f=void 0;try{if("function"!=typeof define||!define.amd){var g=require("source-map");f=g.SourceNode}}catch(h){}f||(f=function(a,b,c,d){this.src="",d&&this.add(d)},f.prototype={add:function(a){c.isArray(a)&&(a=a.join("")),this.src+=a},prepend:function(a){c.isArray(a)&&(a=a.join("")),this.src=a+this.src},toStringWithSourceMap:function(){return{code:this.toString()}},toString:function(){return this.src}}),e.prototype={isEmpty:function(){return!this.source.length},prepend:function(a,b){this.source.unshift(this.wrap(a,b))},push:function(a,b){this.source.push(this.wrap(a,b))},merge:function(){var a=this.empty();return this.each(function(b){a.add(["  ",b,"\n"])}),a},each:function(a){for(var b=0,c=this.source.length;c>b;b++)a(this.source[b])},empty:function(){var a=this.currentLocation||{start:{}};return new f(a.start.line,a.start.column,this.srcFile)},wrap:function(a){var b=arguments.length<=1||void 0===arguments[1]?this.currentLocation||{start:{}}:arguments[1];return a instanceof f?a:(a=d(a,this,b),new f(b.start.line,b.start.column,this.srcFile,a))},functionCall:function(a,b,c){return c=this.generateList(c),this.wrap([a,b?"."+b+"(":"(",c,")"])},quotedString:function(a){return'"'+(a+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(a){var b=[];for(var c in a)if(a.hasOwnProperty(c)){var e=d(a[c],this);"undefined"!==e&&b.push([this.quotedString(c),":",e])}var f=this.generateList(b);return f.prepend("{"),f.add("}"),f},generateList:function(a){for(var b=this.empty(),c=0,e=a.length;e>c;c++)c&&b.add(","),b.add(d(a[c],this));return b},generateArray:function(a){var b=this.generateList(a);return b.prepend("["),b.add("]"),b}},b.exports=e}),define("handlebars/compiler/javascript-compiler",["exports","module","../base","../exception","../utils","./code-gen"],function(a,b,c,d,e,f){"use strict";function g(a){return a&&a.__esModule?a:{"default":a}}function h(a){this.value=a}function i(){}function j(a,b,c,d){var e=b.popStack(),f=0,g=c.length;for(a&&g--;g>f;f++)e=b.nameLookup(e,c[f],d);return a?[b.aliasable("container.strict"),"(",e,", ",b.quotedString(c[f]),")"]:e}var k=g(d),l=g(f);i.prototype={nameLookup:function(a,b){return i.isValidJavaScriptVariableName(b)?[a,".",b]:[a,"[",JSON.stringify(b),"]"]},depthedLookup:function(a){return[this.aliasable("container.lookup"),'(depths, "',a,'")']},compilerInfo:function(){var a=c.COMPILER_REVISION,b=c.REVISION_CHANGES[a];return[a,b]},appendToBuffer:function(a,b,c){return e.isArray(a)||(a=[a]),a=this.source.wrap(a,b),this.environment.isSimple?["return ",a,";"]:c?["buffer += ",a,";"]:(a.appendToBuffer=!0,a)},initializeBuffer:function(){return this.quotedString("")},compile:function(a,b,c,d){this.environment=a,this.options=b,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!d,this.name=this.environment.name,this.isChild=!!c,this.context=c||{decorators:[],programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.blockParams=[],this.compileChildren(a,b),this.useDepths=this.useDepths||a.useDepths||a.useDecorators||this.options.compat,this.useBlockParams=this.useBlockParams||a.useBlockParams;var e=a.opcodes,f=void 0,g=void 0,h=void 0,i=void 0;for(h=0,i=e.length;i>h;h++)f=e[h],this.source.currentLocation=f.loc,g=g||f.loc,this[f.opcode].apply(this,f.args);if(this.source.currentLocation=g,this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new k["default"]("Compile completed with content left on stack");this.decorators.isEmpty()?this.decorators=void 0:(this.useDecorators=!0,this.decorators.prepend("var decorators = container.decorators;\n"),this.decorators.push("return fn;"),d?this.decorators=Function.apply(this,["fn","props","container","depth0","data","blockParams","depths",this.decorators.merge()]):(this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"),this.decorators.push("}\n"),this.decorators=this.decorators.merge()));var j=this.createFunctionContext(d);if(this.isChild)return j;var l={compiler:this.compilerInfo(),main:j};this.decorators&&(l.main_d=this.decorators,l.useDecorators=!0);var m=this.context,n=m.programs,o=m.decorators;for(h=0,i=n.length;i>h;h++)n[h]&&(l[h]=n[h],o[h]&&(l[h+"_d"]=o[h],l.useDecorators=!0));return this.environment.usePartial&&(l.usePartial=!0),this.options.data&&(l.useData=!0),this.useDepths&&(l.useDepths=!0),this.useBlockParams&&(l.useBlockParams=!0),this.options.compat&&(l.compat=!0),d?l.compilerOptions=this.options:(l.compiler=JSON.stringify(l.compiler),this.source.currentLocation={start:{line:1,column:0}},l=this.objectLiteral(l),b.srcName?(l=l.toStringWithSourceMap({file:b.destName}),l.map=l.map&&l.map.toString()):l=l.toString()),l},preamble:function(){this.lastContext=0,this.source=new l["default"](this.options.srcName),this.decorators=new l["default"](this.options.srcName)},createFunctionContext:function(a){var b="",c=this.stackVars.concat(this.registers.list);c.length>0&&(b+=", "+c.join(", "));var d=0;for(var e in this.aliases){var f=this.aliases[e];this.aliases.hasOwnProperty(e)&&f.children&&f.referenceCount>1&&(b+=", alias"+ ++d+"="+e,f.children[0]="alias"+d)}var g=["container","depth0","helpers","partials","data"];(this.useBlockParams||this.useDepths)&&g.push("blockParams"),this.useDepths&&g.push("depths");var h=this.mergeSource(b);return a?(g.push(h),Function.apply(this,g)):this.source.wrap(["function(",g.join(","),") {\n  ",h,"}"])},mergeSource:function(a){var b=this.environment.isSimple,c=!this.forceBuffer,d=void 0,e=void 0,f=void 0,g=void 0;return this.source.each(function(a){a.appendToBuffer?(f?a.prepend("  + "):f=a,g=a):(f&&(e?f.prepend("buffer += "):d=!0,g.add(";"),f=g=void 0),e=!0,b||(c=!1))}),c?f?(f.prepend("return "),g.add(";")):e||this.source.push('return "";'):(a+=", buffer = "+(d?"":this.initializeBuffer()),f?(f.prepend("return buffer + "),g.add(";")):this.source.push("return buffer;")),a&&this.source.prepend("var "+a.substring(2)+(d?"":";\n")),this.source.merge()},blockValue:function(a){var b=this.aliasable("helpers.blockHelperMissing"),c=[this.contextName(0)];this.setupHelperArgs(a,0,c);var d=this.popStack();c.splice(1,0,d),this.push(this.source.functionCall(b,"call",c))},ambiguousBlockValue:function(){var a=this.aliasable("helpers.blockHelperMissing"),b=[this.contextName(0)];this.setupHelperArgs("",0,b,!0),this.flushInline();var c=this.topStack();b.splice(1,0,c),this.pushSource(["if (!",this.lastHelper,") { ",c," = ",this.source.functionCall(a,"call",b),"}"])},appendContent:function(a){this.pendingContent?a=this.pendingContent+a:this.pendingLocation=this.source.currentLocation,this.pendingContent=a},append:function(){if(this.isInline())this.replaceStack(function(a){return[" != null ? ",a,' : ""']}),this.pushSource(this.appendToBuffer(this.popStack()));else{var a=this.popStack();this.pushSource(["if (",a," != null) { ",this.appendToBuffer(a,void 0,!0)," }"]),this.environment.isSimple&&this.pushSource(["else { ",this.appendToBuffer("''",void 0,!0)," }"])}},appendEscaped:function(){this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"),"(",this.popStack(),")"]))},getContext:function(a){this.lastContext=a},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(a,b,c,d){var e=0;d||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(a[e++])),this.resolvePath("context",a,e,b,c)},lookupBlockParam:function(a,b){this.useBlockParams=!0,this.push(["blockParams[",a[0],"][",a[1],"]"]),this.resolvePath("context",b,1)},lookupData:function(a,b,c){a?this.pushStackLiteral("container.data(data, "+a+")"):this.pushStackLiteral("data"),this.resolvePath("data",b,0,!0,c)},resolvePath:function(a,b,c,d,e){var f=this;if(this.options.strict||this.options.assumeObjects)return void this.push(j(this.options.strict&&e,this,b,a));for(var g=b.length;g>c;c++)this.replaceStack(function(e){var g=f.nameLookup(e,b[c],a);return d?[" && ",g]:[" != null ? ",g," : ",e]})},resolvePossibleLambda:function(){this.push([this.aliasable("container.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function(a,b){this.pushContext(),this.pushString(b),"SubExpression"!==b&&("string"==typeof a?this.pushString(a):this.pushStackLiteral(a))},emptyHash:function(a){this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),
this.push("{}")),this.pushStackLiteral(a?"undefined":"{}")},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var a=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push(this.objectLiteral(a.ids)),this.stringParams&&(this.push(this.objectLiteral(a.contexts)),this.push(this.objectLiteral(a.types))),this.push(this.objectLiteral(a.values))},pushString:function(a){this.pushStackLiteral(this.quotedString(a))},pushLiteral:function(a){this.pushStackLiteral(a)},pushProgram:function(a){null!=a?this.pushStackLiteral(this.programExpression(a)):this.pushStackLiteral(null)},registerDecorator:function(a,b){var c=this.nameLookup("decorators",b,"decorator"),d=this.setupHelperArgs(b,a);this.decorators.push(["fn = ",this.decorators.functionCall(c,"",["fn","props","container",d])," || fn;"])},invokeHelper:function(a,b,c){var d=this.popStack(),e=this.setupHelper(a,b),f=c?[e.name," || "]:"",g=["("].concat(f,d);this.options.strict||g.push(" || ",this.aliasable("helpers.helperMissing")),g.push(")"),this.push(this.source.functionCall(g,"call",e.callParams))},invokeKnownHelper:function(a,b){var c=this.setupHelper(a,b);this.push(this.source.functionCall(c.name,"call",c.callParams))},invokeAmbiguous:function(a,b){this.useRegister("helper");var c=this.popStack();this.emptyHash();var d=this.setupHelper(0,a,b),e=this.lastHelper=this.nameLookup("helpers",a,"helper"),f=["(","(helper = ",e," || ",c,")"];this.options.strict||(f[0]="(helper = ",f.push(" != null ? helper : ",this.aliasable("helpers.helperMissing"))),this.push(["(",f,d.paramsInit?["),(",d.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",d.callParams)," : helper))"])},invokePartial:function(a,b,c){var d=[],e=this.setupParams(b,1,d);a&&(b=this.popStack(),delete e.name),c&&(e.indent=JSON.stringify(c)),e.helpers="helpers",e.partials="partials",e.decorators="container.decorators",a?d.unshift(b):d.unshift(this.nameLookup("partials",b,"partial")),this.options.compat&&(e.depths="depths"),e=this.objectLiteral(e),d.push(e),this.push(this.source.functionCall("container.invokePartial","",d))},assignToHash:function(a){var b=this.popStack(),c=void 0,d=void 0,e=void 0;this.trackIds&&(e=this.popStack()),this.stringParams&&(d=this.popStack(),c=this.popStack());var f=this.hash;c&&(f.contexts[a]=c),d&&(f.types[a]=d),e&&(f.ids[a]=e),f.values[a]=b},pushId:function(a,b,c){"BlockParam"===a?this.pushStackLiteral("blockParams["+b[0]+"].path["+b[1]+"]"+(c?" + "+JSON.stringify("."+c):"")):"PathExpression"===a?this.pushString(b):"SubExpression"===a?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:i,compileChildren:function(a,b){for(var c=a.children,d=void 0,e=void 0,f=0,g=c.length;g>f;f++){d=c[f],e=new this.compiler;var h=this.matchExistingProgram(d);null==h?(this.context.programs.push(""),h=this.context.programs.length,d.index=h,d.name="program"+h,this.context.programs[h]=e.compile(d,b,this.context,!this.precompile),this.context.decorators[h]=e.decorators,this.context.environments[h]=d,this.useDepths=this.useDepths||e.useDepths,this.useBlockParams=this.useBlockParams||e.useBlockParams):(d.index=h,d.name="program"+h,this.useDepths=this.useDepths||d.useDepths,this.useBlockParams=this.useBlockParams||d.useBlockParams)}},matchExistingProgram:function(a){for(var b=0,c=this.context.environments.length;c>b;b++){var d=this.context.environments[b];if(d&&d.equals(a))return b}},programExpression:function(a){var b=this.environment.children[a],c=[b.index,"data",b.blockParams];return(this.useBlockParams||this.useDepths)&&c.push("blockParams"),this.useDepths&&c.push("depths"),"container.program("+c.join(", ")+")"},useRegister:function(a){this.registers[a]||(this.registers[a]=!0,this.registers.list.push(a))},push:function(a){return a instanceof h||(a=this.source.wrap(a)),this.inlineStack.push(a),a},pushStackLiteral:function(a){this.push(new h(a))},pushSource:function(a){this.pendingContent&&(this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation)),this.pendingContent=void 0),a&&this.source.push(a)},replaceStack:function(a){var b=["("],c=void 0,d=void 0,e=void 0;if(!this.isInline())throw new k["default"]("replaceStack on non-inline");var f=this.popStack(!0);if(f instanceof h)c=[f.value],b=["(",c],e=!0;else{d=!0;var g=this.incrStack();b=["((",this.push(g)," = ",f,")"],c=this.topStack()}var i=a.call(this,c);e||this.popStack(),d&&this.stackSlot--,this.push(b.concat(i,")"))},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var a=this.inlineStack;this.inlineStack=[];for(var b=0,c=a.length;c>b;b++){var d=a[b];if(d instanceof h)this.compileStack.push(d);else{var e=this.incrStack();this.pushSource([e," = ",d,";"]),this.compileStack.push(e)}}},isInline:function(){return this.inlineStack.length},popStack:function(a){var b=this.isInline(),c=(b?this.inlineStack:this.compileStack).pop();if(!a&&c instanceof h)return c.value;if(!b){if(!this.stackSlot)throw new k["default"]("Invalid stack pop");this.stackSlot--}return c},topStack:function(){var a=this.isInline()?this.inlineStack:this.compileStack,b=a[a.length-1];return b instanceof h?b.value:b},contextName:function(a){return this.useDepths&&a?"depths["+a+"]":"depth"+a},quotedString:function(a){return this.source.quotedString(a)},objectLiteral:function(a){return this.source.objectLiteral(a)},aliasable:function(a){var b=this.aliases[a];return b?(b.referenceCount++,b):(b=this.aliases[a]=this.source.wrap(a),b.aliasable=!0,b.referenceCount=1,b)},setupHelper:function(a,b,c){var d=[],e=this.setupHelperArgs(b,a,d,c),f=this.nameLookup("helpers",b,"helper"),g=this.aliasable(this.contextName(0)+" != null ? "+this.contextName(0)+" : {}");return{params:d,paramsInit:e,name:f,callParams:[g].concat(d)}},setupParams:function(a,b,c){var d={},e=[],f=[],g=[],h=!c,i=void 0;h&&(c=[]),d.name=this.quotedString(a),d.hash=this.popStack(),this.trackIds&&(d.hashIds=this.popStack()),this.stringParams&&(d.hashTypes=this.popStack(),d.hashContexts=this.popStack());var j=this.popStack(),k=this.popStack();(k||j)&&(d.fn=k||"container.noop",d.inverse=j||"container.noop");for(var l=b;l--;)i=this.popStack(),c[l]=i,this.trackIds&&(g[l]=this.popStack()),this.stringParams&&(f[l]=this.popStack(),e[l]=this.popStack());return h&&(d.args=this.source.generateArray(c)),this.trackIds&&(d.ids=this.source.generateArray(g)),this.stringParams&&(d.types=this.source.generateArray(f),d.contexts=this.source.generateArray(e)),this.options.data&&(d.data="data"),this.useBlockParams&&(d.blockParams="blockParams"),d},setupHelperArgs:function(a,b,c,d){var e=this.setupParams(a,b,c);return e=this.objectLiteral(e),d?(this.useRegister("options"),c.push("options"),["options=",e]):c?(c.push(e),""):e}},function(){for(var a="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "),b=i.RESERVED_WORDS={},c=0,d=a.length;d>c;c++)b[a[c]]=!0}(),i.isValidJavaScriptVariableName=function(a){return!i.RESERVED_WORDS[a]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)},b.exports=i}),define("handlebars",["exports","module","./handlebars.runtime","./handlebars/compiler/ast","./handlebars/compiler/base","./handlebars/compiler/compiler","./handlebars/compiler/javascript-compiler","./handlebars/compiler/visitor","./handlebars/no-conflict"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(a){return a&&a.__esModule?a:{"default":a}}function k(){var a=q();return a.compile=function(b,c){return f.compile(b,c,a)},a.precompile=function(b,c){return f.precompile(b,c,a)},a.AST=m["default"],a.Compiler=f.Compiler,a.JavaScriptCompiler=n["default"],a.Parser=e.parser,a.parse=e.parse,a}var l=j(c),m=j(d),n=j(g),o=j(h),p=j(i),q=l["default"].create,r=k();r.create=k,p["default"](r),r.Visitor=o["default"],r["default"]=r,b.exports=r});
(function(){ var curSystem = typeof System != 'undefined' ? System : undefined;
/* */ 
"format global";
"exports $traceurRuntime";
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  var $apply = Function.prototype.call.bind(Function.prototype.apply);
  function $bind(operand, thisArg, args) {
    var argArray = [thisArg];
    for (var i = 0; i < args.length; i++) {
      argArray[i + 1] = args[i];
    }
    var func = $apply(Function.prototype.bind, operand, argArray);
    return func;
  }
  function $construct(func, argArray) {
    var object = new ($bind(func, null, argArray));
    return object;
  }
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var privateNames = $create(null);
  function isPrivateName(s) {
    return privateNames[s];
  }
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  var CONTINUATION_TYPE = Object.create(null);
  function createContinuation(operand, thisArg, argsArray) {
    return [CONTINUATION_TYPE, operand, thisArg, argsArray];
  }
  function isContinuation(object) {
    return object && object[0] === CONTINUATION_TYPE;
  }
  var isTailRecursiveName = null;
  function setupProperTailCalls() {
    isTailRecursiveName = createPrivateName();
    Function.prototype.call = initTailRecursiveFunction(function call(thisArg) {
      var result = tailCall(function(thisArg) {
        var argArray = [];
        for (var i = 1; i < arguments.length; ++i) {
          argArray[i - 1] = arguments[i];
        }
        var continuation = createContinuation(this, thisArg, argArray);
        return continuation;
      }, this, arguments);
      return result;
    });
    Function.prototype.apply = initTailRecursiveFunction(function apply(thisArg, argArray) {
      var result = tailCall(function(thisArg, argArray) {
        var continuation = createContinuation(this, thisArg, argArray);
        return continuation;
      }, this, arguments);
      return result;
    });
  }
  function initTailRecursiveFunction(func) {
    if (isTailRecursiveName === null) {
      setupProperTailCalls();
    }
    func[isTailRecursiveName] = true;
    return func;
  }
  function isTailRecursive(func) {
    return !!func[isTailRecursiveName];
  }
  function tailCall(func, thisArg, argArray) {
    var continuation = argArray[0];
    if (isContinuation(continuation)) {
      continuation = $apply(func, thisArg, continuation[3]);
      return continuation;
    }
    continuation = createContinuation(func, thisArg, argArray);
    while (true) {
      if (isTailRecursive(func)) {
        continuation = $apply(func, continuation[2], [continuation]);
      } else {
        continuation = $apply(func, continuation[2], continuation[3]);
      }
      if (!isContinuation(continuation)) {
        return continuation;
      }
      func = continuation[1];
    }
  }
  function construct() {
    var object;
    if (isTailRecursive(this)) {
      object = $construct(this, [createContinuation(null, null, arguments)]);
    } else {
      object = $construct(this, arguments);
    }
    return object;
  }
  var $traceurRuntime = {
    initTailRecursiveFunction: initTailRecursiveFunction,
    call: tailCall,
    continuation: createContinuation,
    construct: construct
  };
  (function() {
    function nonEnum(value) {
      return {
        configurable: true,
        enumerable: false,
        value: value,
        writable: true
      };
    }
    var method = nonEnum;
    var symbolInternalProperty = newUniqueString();
    var symbolDescriptionProperty = newUniqueString();
    var symbolDataProperty = newUniqueString();
    var symbolValues = $create(null);
    function isShimSymbol(symbol) {
      return typeof symbol === 'object' && symbol instanceof SymbolValue;
    }
    function typeOf(v) {
      if (isShimSymbol(v))
        return 'symbol';
      return typeof v;
    }
    function Symbol(description) {
      var value = new SymbolValue(description);
      if (!(this instanceof Symbol))
        return value;
      throw new TypeError('Symbol cannot be new\'ed');
    }
    $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
    $defineProperty(Symbol.prototype, 'toString', method(function() {
      var symbolValue = this[symbolDataProperty];
      return symbolValue[symbolInternalProperty];
    }));
    $defineProperty(Symbol.prototype, 'valueOf', method(function() {
      var symbolValue = this[symbolDataProperty];
      if (!symbolValue)
        throw TypeError('Conversion from symbol to string');
      if (!getOption('symbols'))
        return symbolValue[symbolInternalProperty];
      return symbolValue;
    }));
    function SymbolValue(description) {
      var key = newUniqueString();
      $defineProperty(this, symbolDataProperty, {value: this});
      $defineProperty(this, symbolInternalProperty, {value: key});
      $defineProperty(this, symbolDescriptionProperty, {value: description});
      freeze(this);
      symbolValues[key] = this;
    }
    $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
    $defineProperty(SymbolValue.prototype, 'toString', {
      value: Symbol.prototype.toString,
      enumerable: false
    });
    $defineProperty(SymbolValue.prototype, 'valueOf', {
      value: Symbol.prototype.valueOf,
      enumerable: false
    });
    var hashProperty = createPrivateName();
    var hashPropertyDescriptor = {value: undefined};
    var hashObjectProperties = {
      hash: {value: undefined},
      self: {value: undefined}
    };
    var hashCounter = 0;
    function getOwnHashObject(object) {
      var hashObject = object[hashProperty];
      if (hashObject && hashObject.self === object)
        return hashObject;
      if ($isExtensible(object)) {
        hashObjectProperties.hash.value = hashCounter++;
        hashObjectProperties.self.value = object;
        hashPropertyDescriptor.value = $create(null, hashObjectProperties);
        $defineProperty(object, hashProperty, hashPropertyDescriptor);
        return hashPropertyDescriptor.value;
      }
      return undefined;
    }
    function freeze(object) {
      getOwnHashObject(object);
      return $freeze.apply(this, arguments);
    }
    function preventExtensions(object) {
      getOwnHashObject(object);
      return $preventExtensions.apply(this, arguments);
    }
    function seal(object) {
      getOwnHashObject(object);
      return $seal.apply(this, arguments);
    }
    freeze(SymbolValue.prototype);
    function isSymbolString(s) {
      return symbolValues[s] || privateNames[s];
    }
    function toProperty(name) {
      if (isShimSymbol(name))
        return name[symbolInternalProperty];
      return name;
    }
    function removeSymbolKeys(array) {
      var rv = [];
      for (var i = 0; i < array.length; i++) {
        if (!isSymbolString(array[i])) {
          rv.push(array[i]);
        }
      }
      return rv;
    }
    function getOwnPropertyNames(object) {
      return removeSymbolKeys($getOwnPropertyNames(object));
    }
    function keys(object) {
      return removeSymbolKeys($keys(object));
    }
    function getOwnPropertySymbols(object) {
      var rv = [];
      var names = $getOwnPropertyNames(object);
      for (var i = 0; i < names.length; i++) {
        var symbol = symbolValues[names[i]];
        if (symbol) {
          rv.push(symbol);
        }
      }
      return rv;
    }
    function getOwnPropertyDescriptor(object, name) {
      return $getOwnPropertyDescriptor(object, toProperty(name));
    }
    function hasOwnProperty(name) {
      return $hasOwnProperty.call(this, toProperty(name));
    }
    function getOption(name) {
      return global.$traceurRuntime.options[name];
    }
    function defineProperty(object, name, descriptor) {
      if (isShimSymbol(name)) {
        name = name[symbolInternalProperty];
      }
      $defineProperty(object, name, descriptor);
      return object;
    }
    function polyfillObject(Object) {
      $defineProperty(Object, 'defineProperty', {value: defineProperty});
      $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
      $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
      $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
      $defineProperty(Object, 'freeze', {value: freeze});
      $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
      $defineProperty(Object, 'seal', {value: seal});
      $defineProperty(Object, 'keys', {value: keys});
    }
    function exportStar(object) {
      for (var i = 1; i < arguments.length; i++) {
        var names = $getOwnPropertyNames(arguments[i]);
        for (var j = 0; j < names.length; j++) {
          var name = names[j];
          if (name === '__esModule' || name === 'default' || isSymbolString(name))
            continue;
          (function(mod, name) {
            $defineProperty(object, name, {
              get: function() {
                return mod[name];
              },
              enumerable: true
            });
          })(arguments[i], names[j]);
        }
      }
      return object;
    }
    function isObject(x) {
      return x != null && (typeof x === 'object' || typeof x === 'function');
    }
    function toObject(x) {
      if (x == null)
        throw $TypeError();
      return $Object(x);
    }
    function checkObjectCoercible(argument) {
      if (argument == null) {
        throw new TypeError('Value cannot be converted to an Object');
      }
      return argument;
    }
    var hasNativeSymbol;
    function polyfillSymbol(global, Symbol) {
      if (!global.Symbol) {
        global.Symbol = Symbol;
        Object.getOwnPropertySymbols = getOwnPropertySymbols;
        hasNativeSymbol = false;
      } else {
        hasNativeSymbol = true;
      }
      if (!global.Symbol.iterator) {
        global.Symbol.iterator = Symbol('Symbol.iterator');
      }
      if (!global.Symbol.observer) {
        global.Symbol.observer = Symbol('Symbol.observer');
      }
    }
    function hasNativeSymbolFunc() {
      return hasNativeSymbol;
    }
    function setupGlobals(global) {
      polyfillSymbol(global, Symbol);
      global.Reflect = global.Reflect || {};
      global.Reflect.global = global.Reflect.global || global;
      polyfillObject(global.Object);
    }
    setupGlobals(global);
    global.$traceurRuntime = {
      call: tailCall,
      checkObjectCoercible: checkObjectCoercible,
      construct: construct,
      continuation: createContinuation,
      createPrivateName: createPrivateName,
      defineProperties: $defineProperties,
      defineProperty: $defineProperty,
      exportStar: exportStar,
      getOwnHashObject: getOwnHashObject,
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
      getOwnPropertyNames: $getOwnPropertyNames,
      hasNativeSymbol: hasNativeSymbolFunc,
      initTailRecursiveFunction: initTailRecursiveFunction,
      isObject: isObject,
      isPrivateName: isPrivateName,
      isSymbolString: isSymbolString,
      keys: $keys,
      options: {},
      setupGlobals: setupGlobals,
      toObject: toObject,
      toProperty: toProperty,
      typeof: typeOf
    };
  })();
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__3 = $traceurRuntime,
      canonicalizeUrl = $__3.canonicalizeUrl,
      resolveUrl = $__3.resolveUrl,
      isAbsolute = $__3.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  }
  function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  }
  ModuleEvaluationError.prototype = Object.create(Error.prototype);
  ModuleEvaluationError.prototype.constructor = ModuleEvaluationError;
  ModuleEvaluationError.prototype.stripError = function(message) {
    return message.replace(/.*Error:/, this.constructor.name + ':');
  };
  ModuleEvaluationError.prototype.stripCause = function(cause) {
    if (!cause)
      return '';
    if (!cause.message)
      return cause + '';
    return this.stripError(cause.message);
  };
  ModuleEvaluationError.prototype.loadedBy = function(moduleName) {
    this.stack += '\n loaded by ' + moduleName;
  };
  ModuleEvaluationError.prototype.stripStack = function(causeStack) {
    var stack = [];
    causeStack.split('\n').some(function(frame) {
      if (/UncoatedModuleInstantiator/.test(frame))
        return true;
      stack.push(frame);
    });
    stack[0] = this.stripError(stack[0]);
    return stack.join('\n');
  };
  function beforeLines(lines, number) {
    var result = [];
    var first = number - 3;
    if (first < 0)
      first = 0;
    for (var i = first; i < number; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function afterLines(lines, number) {
    var last = number + 1;
    if (last > lines.length - 1)
      last = lines.length - 1;
    var result = [];
    for (var i = number; i <= last; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function columnSpacing(columns) {
    var result = '';
    for (var i = 0; i < columns - 1; i++) {
      result += '-';
    }
    return result;
  }
  function UncoatedModuleInstantiator(url, func) {
    UncoatedModuleEntry.call(this, url, null);
    this.func = func;
  }
  UncoatedModuleInstantiator.prototype = Object.create(UncoatedModuleEntry.prototype);
  UncoatedModuleInstantiator.prototype.getUncoatedModule = function() {
    var $__2 = this;
    if (this.value_)
      return this.value_;
    try {
      var relativeRequire;
      if (typeof $traceurRuntime !== undefined && $traceurRuntime.require) {
        relativeRequire = $traceurRuntime.require.bind(null, this.url);
      }
      return this.value_ = this.func.call(global, relativeRequire);
    } catch (ex) {
      if (ex instanceof ModuleEvaluationError) {
        ex.loadedBy(this.url);
        throw ex;
      }
      if (ex.stack) {
        var lines = this.func.toString().split('\n');
        var evaled = [];
        ex.stack.split('\n').some(function(frame, index) {
          if (frame.indexOf('UncoatedModuleInstantiator.getUncoatedModule') > 0)
            return true;
          var m = /(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(frame);
          if (m) {
            var line = parseInt(m[2], 10);
            evaled = evaled.concat(beforeLines(lines, line));
            if (index === 1) {
              evaled.push(columnSpacing(m[3]) + '^ ' + $__2.url);
            } else {
              evaled.push(columnSpacing(m[3]) + '^');
            }
            evaled = evaled.concat(afterLines(lines, line));
            evaled.push('= = = = = = = = =');
          } else {
            evaled.push(frame);
          }
        });
        ex.stack = evaled.join('\n');
      }
      throw new ModuleEvaluationError(this.url, ex);
    }
  };
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach(function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    });
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== 'string')
        throw new TypeError('module name must be a string, not ' + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, function() {
        return module;
      });
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, deps, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, deps, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__2 = arguments;
            var depMap = {};
            deps.forEach(function(dep, index) {
              return depMap[dep] = $__2[index];
            });
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    }
  };
  var moduleStoreModule = new Module({ModuleStore: ModuleStore});
  ModuleStore.set('@traceur/src/runtime/ModuleStore.js', moduleStoreModule);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    registerModule: ModuleStore.registerModule.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
System.registerModule("traceur-runtime@0.0.91/src/runtime/async.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/async.js";
  if (typeof $traceurRuntime !== 'object') {
    throw new Error('traceur runtime not found.');
  }
  var $createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $create = Object.create;
  var thisName = $createPrivateName();
  var argsName = $createPrivateName();
  var observeName = $createPrivateName();
  function AsyncGeneratorFunction() {}
  function AsyncGeneratorFunctionPrototype() {}
  AsyncGeneratorFunction.prototype = AsyncGeneratorFunctionPrototype;
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  $defineProperty(AsyncGeneratorFunctionPrototype, 'constructor', {enumerable: false});
  var AsyncGeneratorContext = function() {
    function AsyncGeneratorContext(observer) {
      var $__2 = this;
      this.decoratedObserver = $traceurRuntime.createDecoratedGenerator(observer, function() {
        $__2.done = true;
      });
      this.done = false;
      this.inReturn = false;
    }
    return ($traceurRuntime.createClass)(AsyncGeneratorContext, {
      throw: function(error) {
        if (!this.inReturn) {
          throw error;
        }
      },
      yield: function(value) {
        if (this.done) {
          this.inReturn = true;
          throw undefined;
        }
        var result;
        try {
          result = this.decoratedObserver.next(value);
        } catch (e) {
          this.done = true;
          throw e;
        }
        if (result === undefined) {
          return;
        }
        if (result.done) {
          this.done = true;
          this.inReturn = true;
          throw undefined;
        }
        return result.value;
      },
      yieldFor: function(observable) {
        var ctx = this;
        return $traceurRuntime.observeForEach(observable[$traceurRuntime.toProperty(Symbol.observer)].bind(observable), function(value) {
          if (ctx.done) {
            this.return();
            return;
          }
          var result;
          try {
            result = ctx.decoratedObserver.next(value);
          } catch (e) {
            ctx.done = true;
            throw e;
          }
          if (result === undefined) {
            return;
          }
          if (result.done) {
            ctx.done = true;
          }
          return result;
        });
      }
    }, {});
  }();
  AsyncGeneratorFunctionPrototype.prototype[Symbol.observer] = function(observer) {
    var observe = this[observeName];
    var ctx = new AsyncGeneratorContext(observer);
    $traceurRuntime.schedule(function() {
      return observe(ctx);
    }).then(function(value) {
      if (!ctx.done) {
        ctx.decoratedObserver.return(value);
      }
    }).catch(function(error) {
      if (!ctx.done) {
        ctx.decoratedObserver.throw(error);
      }
    });
    return ctx.decoratedObserver;
  };
  $defineProperty(AsyncGeneratorFunctionPrototype.prototype, Symbol.observer, {enumerable: false});
  function initAsyncGeneratorFunction(functionObject) {
    functionObject.prototype = $create(AsyncGeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = AsyncGeneratorFunctionPrototype;
    return functionObject;
  }
  function createAsyncGeneratorInstance(observe, functionObject) {
    for (var args = [],
        $__10 = 2; $__10 < arguments.length; $__10++)
      args[$__10 - 2] = arguments[$__10];
    var object = $create(functionObject.prototype);
    object[thisName] = this;
    object[argsName] = args;
    object[observeName] = observe;
    return object;
  }
  function observeForEach(observe, next) {
    return new Promise(function(resolve, reject) {
      var generator = observe({
        next: function(value) {
          return next.call(generator, value);
        },
        throw: function(error) {
          reject(error);
        },
        return: function(value) {
          resolve(value);
        }
      });
    });
  }
  function schedule(asyncF) {
    return Promise.resolve().then(asyncF);
  }
  var generator = Symbol();
  var onDone = Symbol();
  var DecoratedGenerator = function() {
    function DecoratedGenerator(_generator, _onDone) {
      this[generator] = _generator;
      this[onDone] = _onDone;
    }
    return ($traceurRuntime.createClass)(DecoratedGenerator, {
      next: function(value) {
        var result = this[generator].next(value);
        if (result !== undefined && result.done) {
          this[onDone].call(this);
        }
        return result;
      },
      throw: function(error) {
        this[onDone].call(this);
        return this[generator].throw(error);
      },
      return: function(value) {
        this[onDone].call(this);
        return this[generator].return(value);
      }
    }, {});
  }();
  function createDecoratedGenerator(generator, onDone) {
    return new DecoratedGenerator(generator, onDone);
  }
  Array.prototype[$traceurRuntime.toProperty(Symbol.observer)] = function(observer) {
    var done = false;
    var decoratedObserver = createDecoratedGenerator(observer, function() {
      return done = true;
    });
    var $__6 = true;
    var $__7 = false;
    var $__8 = undefined;
    try {
      for (var $__4 = void 0,
          $__3 = (this)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
        var value = $__4.value;
        {
          decoratedObserver.next(value);
          if (done) {
            return;
          }
        }
      }
    } catch ($__9) {
      $__7 = true;
      $__8 = $__9;
    } finally {
      try {
        if (!$__6 && $__3.return != null) {
          $__3.return();
        }
      } finally {
        if ($__7) {
          throw $__8;
        }
      }
    }
    decoratedObserver.return();
    return decoratedObserver;
  };
  $defineProperty(Array.prototype, $traceurRuntime.toProperty(Symbol.observer), {enumerable: false});
  $traceurRuntime.initAsyncGeneratorFunction = initAsyncGeneratorFunction;
  $traceurRuntime.createAsyncGeneratorInstance = createAsyncGeneratorInstance;
  $traceurRuntime.observeForEach = observeForEach;
  $traceurRuntime.schedule = schedule;
  $traceurRuntime.createDecoratedGenerator = createDecoratedGenerator;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/classes.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/classes.js";
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
  var $getPrototypeOf = Object.getPrototypeOf;
  var $__1 = Object,
      getOwnPropertyNames = $__1.getOwnPropertyNames,
      getOwnPropertySymbols = $__1.getOwnPropertySymbols;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superConstructor(ctor) {
    return ctor.__proto__;
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      var value = descriptor.value;
      if (value)
        return value;
      if (!descriptor.get)
        return value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError(("super has no setter '" + name + "'."));
  }
  function forEachPropertyKey(object, f) {
    getOwnPropertyNames(object).forEach(f);
    getOwnPropertySymbols(object).forEach(f);
  }
  function getDescriptors(object) {
    var descriptors = {};
    forEachPropertyKey(object, function(key) {
      descriptors[key] = $getOwnPropertyDescriptor(object, key);
      descriptors[key].enumerable = false;
    });
    return descriptors;
  }
  var nonEnum = {enumerable: false};
  function makePropertiesNonEnumerable(object) {
    forEachPropertyKey(object, function(key) {
      $defineProperty(object, key, nonEnum);
    });
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      makePropertiesNonEnumerable(object);
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.superConstructor = superConstructor;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/destructuring.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/destructuring.js";
  function iteratorToArray(iter) {
    var rv = [];
    var i = 0;
    var tmp;
    while (!(tmp = iter.next()).done) {
      rv[i++] = tmp.value;
    }
    return rv;
  }
  $traceurRuntime.iteratorToArray = iteratorToArray;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/generators.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/generators.js";
  if (typeof $traceurRuntime !== 'object') {
    throw new Error('traceur runtime not found.');
  }
  var createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $create = Object.create;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  var RETURN_SENTINEL = {};
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.oldReturnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    maybeUncatchable: function() {
      if (this.storedException === RETURN_SENTINEL) {
        throw RETURN_SENTINEL;
      }
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    },
    wrapYieldStar: function(iterator) {
      var ctx = this;
      return {
        next: function(v) {
          return iterator.next(v);
        },
        throw: function(e) {
          var result;
          if (e === RETURN_SENTINEL) {
            if (iterator.return) {
              result = iterator.return(ctx.returnValue);
              if (!result.done) {
                ctx.returnValue = ctx.oldReturnValue;
                return result;
              }
              ctx.returnValue = result.value;
            }
            throw e;
          }
          if (iterator.throw) {
            return iterator.throw(e);
          }
          iterator.return && iterator.return();
          throw $TypeError('Inner iterator does not have a throw method');
        }
      };
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        if (x === RETURN_SENTINEL) {
          return {
            value: ctx.returnValue,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          if (x === RETURN_SENTINEL) {
            return {
              value: ctx.returnValue,
              done: true
            };
          }
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value;
        try {
          value = moveNext(ctx);
        } catch (ex) {
          if (ex === RETURN_SENTINEL) {
            value = ctx;
          } else {
            throw ex;
          }
        }
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    },
    return: function(v) {
      this[ctxName].oldReturnValue = this[ctxName].returnValue;
      this[ctxName].returnValue = v;
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', RETURN_SENTINEL);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false},
    return: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/relativeRequire.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/relativeRequire.js";
  var path;
  function relativeRequire(callerPath, requiredPath) {
    path = path || typeof require !== 'undefined' && require('path');
    function isDirectory(path) {
      return path.slice(-1) === '/';
    }
    function isAbsolute(path) {
      return path[0] === '/';
    }
    function isRelative(path) {
      return path[0] === '.';
    }
    if (isDirectory(requiredPath) || isAbsolute(requiredPath))
      return;
    return isRelative(requiredPath) ? require(path.resolve(path.dirname(callerPath), requiredPath)) : require(requiredPath);
  }
  $traceurRuntime.require = relativeRequire;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/spread.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/spread.js";
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/template.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/template.js";
  var $__1 = Object,
      defineProperty = $__1.defineProperty,
      freeze = $__1.freeze;
  var slice = Array.prototype.slice;
  var map = Object.create(null);
  function getTemplateObject(raw) {
    var cooked = arguments[1];
    var key = raw.join('${}');
    var templateObject = map[key];
    if (templateObject)
      return templateObject;
    if (!cooked) {
      cooked = slice.call(raw);
    }
    return map[key] = freeze(defineProperty(cooked, 'raw', {value: freeze(raw)}));
  }
  $traceurRuntime.getTemplateObject = getTemplateObject;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/type-assertions.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/type-assertions.js";
  var types = {
    any: {name: 'any'},
    boolean: {name: 'boolean'},
    number: {name: 'number'},
    string: {name: 'string'},
    symbol: {name: 'symbol'},
    void: {name: 'void'}
  };
  var GenericType = function() {
    function GenericType(type, argumentTypes) {
      this.type = type;
      this.argumentTypes = argumentTypes;
    }
    return ($traceurRuntime.createClass)(GenericType, {}, {});
  }();
  var typeRegister = Object.create(null);
  function genericType(type) {
    for (var argumentTypes = [],
        $__2 = 1; $__2 < arguments.length; $__2++)
      argumentTypes[$__2 - 1] = arguments[$__2];
    var typeMap = typeRegister;
    var key = $traceurRuntime.getOwnHashObject(type).hash;
    if (!typeMap[key]) {
      typeMap[key] = Object.create(null);
    }
    typeMap = typeMap[key];
    for (var i = 0; i < argumentTypes.length - 1; i++) {
      key = $traceurRuntime.getOwnHashObject(argumentTypes[i]).hash;
      if (!typeMap[key]) {
        typeMap[key] = Object.create(null);
      }
      typeMap = typeMap[key];
    }
    var tail = argumentTypes[argumentTypes.length - 1];
    key = $traceurRuntime.getOwnHashObject(tail).hash;
    if (!typeMap[key]) {
      typeMap[key] = new GenericType(type, argumentTypes);
    }
    return typeMap[key];
  }
  $traceurRuntime.GenericType = GenericType;
  $traceurRuntime.genericType = genericType;
  $traceurRuntime.type = types;
  return {};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/runtime-modules.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/runtime-modules.js";
  System.get("traceur-runtime@0.0.91/src/runtime/relativeRequire.js");
  System.get("traceur-runtime@0.0.91/src/runtime/spread.js");
  System.get("traceur-runtime@0.0.91/src/runtime/destructuring.js");
  System.get("traceur-runtime@0.0.91/src/runtime/classes.js");
  System.get("traceur-runtime@0.0.91/src/runtime/async.js");
  System.get("traceur-runtime@0.0.91/src/runtime/generators.js");
  System.get("traceur-runtime@0.0.91/src/runtime/template.js");
  System.get("traceur-runtime@0.0.91/src/runtime/type-assertions.js");
  return {};
});
System.get("traceur-runtime@0.0.91/src/runtime/runtime-modules.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/utils.js";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach(function(f) {
      return f(global);
    });
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/Map.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/Map.js";
  var $__0 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      isObject = $__0.isObject,
      registerPolyfill = $__0.registerPolyfill;
  var $__10 = $traceurRuntime,
      getOwnHashObject = $__10.getOwnHashObject,
      hasNativeSymbol = $__10.hasNativeSymbol;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function() {
    function Map() {
      var $__12,
          $__13;
      var iterable = arguments[0];
      if (!isObject(this))
        throw new TypeError('Map called on incompatible type');
      if ($hasOwnProperty.call(this, 'entries_')) {
        throw new TypeError('Map can not be reentrantly initialised');
      }
      initMap(this);
      if (iterable !== null && iterable !== undefined) {
        var $__6 = true;
        var $__7 = false;
        var $__8 = undefined;
        try {
          for (var $__4 = void 0,
              $__3 = (iterable)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
            var $__11 = $__4.value,
                key = ($__12 = $__11[$traceurRuntime.toProperty(Symbol.iterator)](), ($__13 = $__12.next()).done ? void 0 : $__13.value),
                value = ($__13 = $__12.next()).done ? void 0 : $__13.value;
            {
              this.set(key, value);
            }
          }
        } catch ($__9) {
          $__7 = true;
          $__8 = $__9;
        } finally {
          try {
            if (!$__6 && $__3.return != null) {
              $__3.return();
            }
          } finally {
            if ($__7) {
              throw $__8;
            }
          }
        }
      }
    }
    return ($traceurRuntime.createClass)(Map, {
      get size() {
        return this.entries_.length / 2 - this.deletedCount_;
      },
      get: function(key) {
        var index = lookupIndex(this, key);
        if (index !== undefined)
          return this.entries_[index + 1];
      },
      set: function(key, value) {
        var objectMode = isObject(key);
        var stringMode = typeof key === 'string';
        var index = lookupIndex(this, key);
        if (index !== undefined) {
          this.entries_[index + 1] = value;
        } else {
          index = this.entries_.length;
          this.entries_[index] = key;
          this.entries_[index + 1] = value;
          if (objectMode) {
            var hashObject = getOwnHashObject(key);
            var hash = hashObject.hash;
            this.objectIndex_[hash] = index;
          } else if (stringMode) {
            this.stringIndex_[key] = index;
          } else {
            this.primitiveIndex_[key] = index;
          }
        }
        return this;
      },
      has: function(key) {
        return lookupIndex(this, key) !== undefined;
      },
      delete: function(key) {
        var objectMode = isObject(key);
        var stringMode = typeof key === 'string';
        var index;
        var hash;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          if (hashObject) {
            index = this.objectIndex_[hash = hashObject.hash];
            delete this.objectIndex_[hash];
          }
        } else if (stringMode) {
          index = this.stringIndex_[key];
          delete this.stringIndex_[key];
        } else {
          index = this.primitiveIndex_[key];
          delete this.primitiveIndex_[key];
        }
        if (index !== undefined) {
          this.entries_[index] = deletedSentinel;
          this.entries_[index + 1] = undefined;
          this.deletedCount_++;
          return true;
        }
        return false;
      },
      clear: function() {
        initMap(this);
      },
      forEach: function(callbackFn) {
        var thisArg = arguments[1];
        for (var i = 0; i < this.entries_.length; i += 2) {
          var key = this.entries_[i];
          var value = this.entries_[i + 1];
          if (key === deletedSentinel)
            continue;
          callbackFn.call(thisArg, value, key, this);
        }
      },
      entries: $traceurRuntime.initGeneratorFunction(function $__14() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return [key, value];
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__14, this);
      }),
      keys: $traceurRuntime.initGeneratorFunction(function $__15() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return key;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__15, this);
      }),
      values: $traceurRuntime.initGeneratorFunction(function $__16() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return value;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__16, this);
      })
    }, {});
  }();
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function needsPolyfill(global) {
    var $__11 = global,
        Map = $__11.Map,
        Symbol = $__11.Symbol;
    if (!Map || !$traceurRuntime.hasNativeSymbol() || !Map.prototype[Symbol.iterator] || !Map.prototype.entries) {
      return true;
    }
    try {
      return new Map([[]]).size !== 1;
    } catch (e) {
      return false;
    }
  }
  function polyfillMap(global) {
    if (needsPolyfill(global)) {
      global.Map = Map;
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Map.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/Set.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/Set.js";
  var $__0 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      isObject = $__0.isObject,
      registerPolyfill = $__0.registerPolyfill;
  var Map = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Map.js").Map;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  function initSet(set) {
    set.map_ = new Map();
  }
  var Set = function() {
    function Set() {
      var iterable = arguments[0];
      if (!isObject(this))
        throw new TypeError('Set called on incompatible type');
      if ($hasOwnProperty.call(this, 'map_')) {
        throw new TypeError('Set can not be reentrantly initialised');
      }
      initSet(this);
      if (iterable !== null && iterable !== undefined) {
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (iterable)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var item = $__6.value;
            {
              this.add(item);
            }
          }
        } catch ($__11) {
          $__9 = true;
          $__10 = $__11;
        } finally {
          try {
            if (!$__8 && $__5.return != null) {
              $__5.return();
            }
          } finally {
            if ($__9) {
              throw $__10;
            }
          }
        }
      }
    }
    return ($traceurRuntime.createClass)(Set, {
      get size() {
        return this.map_.size;
      },
      has: function(key) {
        return this.map_.has(key);
      },
      add: function(key) {
        this.map_.set(key, key);
        return this;
      },
      delete: function(key) {
        return this.map_.delete(key);
      },
      clear: function() {
        return this.map_.clear();
      },
      forEach: function(callbackFn) {
        var thisArg = arguments[1];
        var $__4 = this;
        return this.map_.forEach(function(value, key) {
          callbackFn.call(thisArg, key, key, $__4);
        });
      },
      values: $traceurRuntime.initGeneratorFunction(function $__13() {
        var $__14,
            $__15;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__14 = $ctx.wrapYieldStar(this.map_.keys()[Symbol.iterator]());
                $ctx.sent = void 0;
                $ctx.action = 'next';
                $ctx.state = 12;
                break;
              case 12:
                $__15 = $__14[$ctx.action]($ctx.sentIgnoreThrow);
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = ($__15.done) ? 3 : 2;
                break;
              case 3:
                $ctx.sent = $__15.value;
                $ctx.state = -2;
                break;
              case 2:
                $ctx.state = 12;
                return $__15.value;
              default:
                return $ctx.end();
            }
        }, $__13, this);
      }),
      entries: $traceurRuntime.initGeneratorFunction(function $__16() {
        var $__17,
            $__18;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__17 = $ctx.wrapYieldStar(this.map_.entries()[Symbol.iterator]());
                $ctx.sent = void 0;
                $ctx.action = 'next';
                $ctx.state = 12;
                break;
              case 12:
                $__18 = $__17[$ctx.action]($ctx.sentIgnoreThrow);
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = ($__18.done) ? 3 : 2;
                break;
              case 3:
                $ctx.sent = $__18.value;
                $ctx.state = -2;
                break;
              case 2:
                $ctx.state = 12;
                return $__18.value;
              default:
                return $ctx.end();
            }
        }, $__16, this);
      })
    }, {});
  }();
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function needsPolyfill(global) {
    var $__12 = global,
        Set = $__12.Set,
        Symbol = $__12.Symbol;
    if (!Set || !$traceurRuntime.hasNativeSymbol() || !Set.prototype[Symbol.iterator] || !Set.prototype.values) {
      return true;
    }
    try {
      return new Set([1]).size !== 1;
    } catch (e) {
      return false;
    }
  }
  function polyfillSet(global) {
    if (needsPolyfill(global)) {
      global.Set = Set;
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Set.js" + '');
System.registerModule("traceur-runtime@0.0.91/node_modules/rsvp/lib/rsvp/asap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/node_modules/rsvp/lib/rsvp/asap.js";
  var len = 0;
  var toString = {}.toString;
  var vertxNext;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserWindow = (typeof window !== 'undefined') ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    var nextTick = process.nextTick;
    var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
      nextTick = setImmediate;
    }
    return function() {
      nextTick(flush);
    };
  }
  function useVertxTimer() {
    return function() {
      vertxNext(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  function attemptVertex() {
    try {
      var r = require;
      var vertx = r('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }
  var scheduleFlush;
  if (isNode) {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else if (browserWindow === undefined && typeof require === 'function') {
    scheduleFlush = attemptVertex();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/Promise.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/Promise.js";
  var async = System.get("traceur-runtime@0.0.91/node_modules/rsvp/lib/rsvp/asap.js").default;
  var registerPolyfill = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js").registerPolyfill;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: function(x) {
          promiseResolve(promise, x);
        },
        reject: function(r) {
          promiseReject(promise, r);
        }
      };
    } else {
      var result = {};
      result.promise = new C(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      });
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function() {
    function Promise(resolver) {
      if (resolver === promiseRaw)
        return;
      if (typeof resolver !== 'function')
        throw new TypeError;
      var promise = promiseInit(this);
      try {
        resolver(function(x) {
          promiseResolve(promise, x);
        }, function(r) {
          promiseReject(promise, r);
        });
      } catch (e) {
        promiseReject(promise, e);
      }
    }
    return ($traceurRuntime.createClass)(Promise, {
      catch: function(onReject) {
        return this.then(undefined, onReject);
      },
      then: function(onResolve, onReject) {
        if (typeof onResolve !== 'function')
          onResolve = idResolveHandler;
        if (typeof onReject !== 'function')
          onReject = idRejectHandler;
        var that = this;
        var constructor = this.constructor;
        return chain(this, function(x) {
          x = promiseCoerce(constructor, x);
          return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
        }, onReject);
      }
    }, {
      resolve: function(x) {
        if (this === $Promise) {
          if (isPromise(x)) {
            return x;
          }
          return promiseSet(new $Promise(promiseRaw), +1, x);
        } else {
          return new this(function(resolve, reject) {
            resolve(x);
          });
        }
      },
      reject: function(r) {
        if (this === $Promise) {
          return promiseSet(new $Promise(promiseRaw), -1, r);
        } else {
          return new this(function(resolve, reject) {
            reject(r);
          });
        }
      },
      all: function(values) {
        var deferred = getDeferred(this);
        var resolutions = [];
        try {
          var makeCountdownFunction = function(i) {
            return function(x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            };
          };
          var count = 0;
          var i = 0;
          var $__6 = true;
          var $__7 = false;
          var $__8 = undefined;
          try {
            for (var $__4 = void 0,
                $__3 = (values)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
              var value = $__4.value;
              {
                var countdownFunction = makeCountdownFunction(i);
                this.resolve(value).then(countdownFunction, function(r) {
                  deferred.reject(r);
                });
                ++i;
                ++count;
              }
            }
          } catch ($__9) {
            $__7 = true;
            $__8 = $__9;
          } finally {
            try {
              if (!$__6 && $__3.return != null) {
                $__3.return();
              }
            } finally {
              if ($__7) {
                throw $__8;
              }
            }
          }
          if (count === 0) {
            deferred.resolve(resolutions);
          }
        } catch (e) {
          deferred.reject(e);
        }
        return deferred.promise;
      },
      race: function(values) {
        var deferred = getDeferred(this);
        try {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(x) {
              deferred.resolve(x);
            }, function(r) {
              deferred.reject(r);
            });
          }
        } catch (e) {
          deferred.reject(e);
        }
        return deferred.promise;
      }
    });
  }();
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async(function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    });
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Promise.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/StringIterator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/StringIterator.js";
  var $__0 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      createIteratorResultObject = $__0.createIteratorResultObject,
      isObject = $__0.isObject;
  var toProperty = $traceurRuntime.toProperty;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function() {
    var $__3;
    function StringIterator() {}
    return ($traceurRuntime.createClass)(StringIterator, ($__3 = {}, Object.defineProperty($__3, "next", {
      value: function() {
        var o = this;
        if (!isObject(o) || !hasOwnProperty.call(o, iteratedString)) {
          throw new TypeError('this must be a StringIterator object');
        }
        var s = o[toProperty(iteratedString)];
        if (s === undefined) {
          return createIteratorResultObject(undefined, true);
        }
        var position = o[toProperty(stringIteratorNextIndex)];
        var len = s.length;
        if (position >= len) {
          o[toProperty(iteratedString)] = undefined;
          return createIteratorResultObject(undefined, true);
        }
        var first = s.charCodeAt(position);
        var resultString;
        if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
          resultString = String.fromCharCode(first);
        } else {
          var second = s.charCodeAt(position + 1);
          if (second < 0xDC00 || second > 0xDFFF) {
            resultString = String.fromCharCode(first);
          } else {
            resultString = String.fromCharCode(first) + String.fromCharCode(second);
          }
        }
        o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
        return createIteratorResultObject(resultString, false);
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__3, Symbol.iterator, {
      value: function() {
        return this;
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), $__3), {});
  }();
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[toProperty(iteratedString)] = s;
    iterator[toProperty(stringIteratorNextIndex)] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/String.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/String.js";
  var createStringIterator = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/StringIterator.js").createStringIterator;
  var $__1 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function includes(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    if (search && $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (pos != pos) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    if (searchLength + start > stringLength) {
      return false;
    }
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint(_) {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = $traceurRuntime.checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'endsWith', endsWith, 'includes', includes, 'repeat', repeat, 'startsWith', startsWith]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get includes() {
      return includes;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/String.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/ArrayIterator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/ArrayIterator.js";
  var $__0 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      toObject = $__0.toObject,
      toUint32 = $__0.toUint32,
      createIteratorResultObject = $__0.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function() {
    var $__3;
    function ArrayIterator() {}
    return ($traceurRuntime.createClass)(ArrayIterator, ($__3 = {}, Object.defineProperty($__3, "next", {
      value: function() {
        var iterator = toObject(this);
        var array = iterator.iteratorObject_;
        if (!array) {
          throw new TypeError('Object is not an ArrayIterator');
        }
        var index = iterator.arrayIteratorNextIndex_;
        var itemKind = iterator.arrayIterationKind_;
        var length = toUint32(array.length);
        if (index >= length) {
          iterator.arrayIteratorNextIndex_ = Infinity;
          return createIteratorResultObject(undefined, true);
        }
        iterator.arrayIteratorNextIndex_ = index + 1;
        if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
          return createIteratorResultObject(array[index], false);
        if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
          return createIteratorResultObject([index, array[index]], false);
        return createIteratorResultObject(index, false);
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__3, Symbol.iterator, {
      value: function() {
        return this;
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), $__3), {});
  }();
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/Array.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/Array.js";
  var $__0 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/ArrayIterator.js"),
      entries = $__0.entries,
      keys = $__0.keys,
      jsValues = $__0.values;
  var $__1 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      checkIterable = $__1.checkIterable,
      isCallable = $__1.isCallable,
      isConstructor = $__1.isConstructor,
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill,
      toInteger = $__1.toInteger,
      toLength = $__1.toLength,
      toObject = $__1.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      var $__6 = true;
      var $__7 = false;
      var $__8 = undefined;
      try {
        for (var $__4 = void 0,
            $__3 = (items)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
          var item = $__4.value;
          {
            if (mapping) {
              arr[k] = mapFn.call(thisArg, item, k);
            } else {
              arr[k] = item;
            }
            k++;
          }
        }
      } catch ($__9) {
        $__7 = true;
        $__8 = $__9;
      } finally {
        try {
          if (!$__6 && $__3.return != null) {
            $__3.return();
          }
        } finally {
          if ($__7) {
            throw $__8;
          }
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__10 = 0; $__10 < arguments.length; $__10++)
      items[$__10] = arguments[$__10];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      var value = object[i];
      if (predicate.call(thisArg, value, i, object)) {
        return returnIndex ? i : value;
      }
    }
    return returnIndex ? -1 : undefined;
  }
  function polyfillArray(global) {
    var $__11 = global,
        Array = $__11.Array,
        Object = $__11.Object,
        Symbol = $__11.Symbol;
    var values = jsValues;
    if (Symbol && Symbol.iterator && Array.prototype[Symbol.iterator]) {
      values = Array.prototype[Symbol.iterator];
    }
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Array.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/Object.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/Object.js";
  var $__0 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill;
  var $__2 = $traceurRuntime,
      defineProperty = $__2.defineProperty,
      getOwnPropertyDescriptor = $__2.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__2.getOwnPropertyNames,
      isPrivateName = $__2.isPrivateName,
      keys = $__2.keys;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = source == null ? [] : keys(source);
      var p = void 0,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (isPrivateName(name))
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (isPrivateName(name))
        continue;
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Object.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/Number.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/Number.js";
  var $__0 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      isNumber = $__0.isNumber,
      maybeAddConsts = $__0.maybeAddConsts,
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill,
      toInteger = $__0.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Number.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/fround.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/fround.js";
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $__1 = Math,
      LN2 = $__1.LN2,
      abs = $__1.abs,
      floor = $__1.floor,
      log = $__1.log,
      min = $__1.min,
      pow = $__1.pow;
  function packIEEE754(v, ebits, fbits) {
    var bias = (1 << (ebits - 1)) - 1,
        s,
        e,
        f,
        ln,
        i,
        bits,
        str,
        bytes;
    function roundToEven(n) {
      var w = floor(n),
          f = n - w;
      if (f < 0.5)
        return w;
      if (f > 0.5)
        return w + 1;
      return w % 2 ? w + 1 : w;
    }
    if (v !== v) {
      e = (1 << ebits) - 1;
      f = pow(2, fbits - 1);
      s = 0;
    } else if (v === Infinity || v === -Infinity) {
      e = (1 << ebits) - 1;
      f = 0;
      s = (v < 0) ? 1 : 0;
    } else if (v === 0) {
      e = 0;
      f = 0;
      s = (1 / v === -Infinity) ? 1 : 0;
    } else {
      s = v < 0;
      v = abs(v);
      if (v >= pow(2, 1 - bias)) {
        e = min(floor(log(v) / LN2), 1023);
        f = roundToEven(v / pow(2, e) * pow(2, fbits));
        if (f / pow(2, fbits) >= 2) {
          e = e + 1;
          f = 1;
        }
        if (e > bias) {
          e = (1 << ebits) - 1;
          f = 0;
        } else {
          e = e + bias;
          f = f - pow(2, fbits);
        }
      } else {
        e = 0;
        f = roundToEven(v / pow(2, 1 - bias - fbits));
      }
    }
    bits = [];
    for (i = fbits; i; i -= 1) {
      bits.push(f % 2 ? 1 : 0);
      f = floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
      bits.push(e % 2 ? 1 : 0);
      e = floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    str = bits.join('');
    bytes = [];
    while (str.length) {
      bytes.push(parseInt(str.substring(0, 8), 2));
      str = str.substring(8);
    }
    return bytes;
  }
  function unpackIEEE754(bytes, ebits, fbits) {
    var bits = [],
        i,
        j,
        b,
        str,
        bias,
        s,
        e,
        f;
    for (i = bytes.length; i; i -= 1) {
      b = bytes[i - 1];
      for (j = 8; j; j -= 1) {
        bits.push(b % 2 ? 1 : 0);
        b = b >> 1;
      }
    }
    bits.reverse();
    str = bits.join('');
    bias = (1 << (ebits - 1)) - 1;
    s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    e = parseInt(str.substring(1, 1 + ebits), 2);
    f = parseInt(str.substring(1 + ebits), 2);
    if (e === (1 << ebits) - 1) {
      return f !== 0 ? NaN : s * Infinity;
    } else if (e > 0) {
      return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
    } else if (f !== 0) {
      return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
    } else {
      return s < 0 ? -0 : 0;
    }
  }
  function unpackF32(b) {
    return unpackIEEE754(b, 8, 23);
  }
  function packF32(v) {
    return packIEEE754(v, 8, 23);
  }
  function fround(x) {
    if (x === 0 || !$isFinite(x) || $isNaN(x)) {
      return x;
    }
    return unpackF32(packF32(Number(x)));
  }
  return {get fround() {
      return fround;
    }};
});
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/Math.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/Math.js";
  var jsFround = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/fround.js").fround;
  var $__1 = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js"),
      maybeAddFunctions = $__1.maybeAddFunctions,
      registerPolyfill = $__1.registerPolyfill,
      toUint32 = $__1.toUint32;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $__3 = Math,
      abs = $__3.abs,
      ceil = $__3.ceil,
      exp = $__3.exp,
      floor = $__3.floor,
      log = $__3.log,
      pow = $__3.pow,
      sqrt = $__3.sqrt;
  function clz32(x) {
    x = toUint32(+x);
    if (x == 0)
      return 32;
    var result = 0;
    if ((x & 0xFFFF0000) === 0) {
      x <<= 16;
      result += 16;
    }
    ;
    if ((x & 0xFF000000) === 0) {
      x <<= 8;
      result += 8;
    }
    ;
    if ((x & 0xF0000000) === 0) {
      x <<= 4;
      result += 4;
    }
    ;
    if ((x & 0xC0000000) === 0) {
      x <<= 2;
      result += 2;
    }
    ;
    if ((x & 0x80000000) === 0) {
      x <<= 1;
      result += 1;
    }
    ;
    return result;
  }
  function imul(x, y) {
    x = toUint32(+x);
    y = toUint32(+y);
    var xh = (x >>> 16) & 0xffff;
    var xl = x & 0xffff;
    var yh = (y >>> 16) & 0xffff;
    var yl = y & 0xffff;
    return xl * yl + (((xh * yl + xl * yh) << 16) >>> 0) | 0;
  }
  function sign(x) {
    x = +x;
    if (x > 0)
      return 1;
    if (x < 0)
      return -1;
    return x;
  }
  function log10(x) {
    return log(x) * 0.434294481903251828;
  }
  function log2(x) {
    return log(x) * 1.442695040888963407;
  }
  function log1p(x) {
    x = +x;
    if (x < -1 || $isNaN(x)) {
      return NaN;
    }
    if (x === 0 || x === Infinity) {
      return x;
    }
    if (x === -1) {
      return -Infinity;
    }
    var result = 0;
    var n = 50;
    if (x < 0 || x > 1) {
      return log(1 + x);
    }
    for (var i = 1; i < n; i++) {
      if ((i % 2) === 0) {
        result -= pow(x, i) / i;
      } else {
        result += pow(x, i) / i;
      }
    }
    return result;
  }
  function expm1(x) {
    x = +x;
    if (x === -Infinity) {
      return -1;
    }
    if (!$isFinite(x) || x === 0) {
      return x;
    }
    return exp(x) - 1;
  }
  function cosh(x) {
    x = +x;
    if (x === 0) {
      return 1;
    }
    if ($isNaN(x)) {
      return NaN;
    }
    if (!$isFinite(x)) {
      return Infinity;
    }
    if (x < 0) {
      x = -x;
    }
    if (x > 21) {
      return exp(x) / 2;
    }
    return (exp(x) + exp(-x)) / 2;
  }
  function sinh(x) {
    x = +x;
    if (!$isFinite(x) || x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  }
  function tanh(x) {
    x = +x;
    if (x === 0)
      return x;
    if (!$isFinite(x))
      return sign(x);
    var exp1 = exp(x);
    var exp2 = exp(-x);
    return (exp1 - exp2) / (exp1 + exp2);
  }
  function acosh(x) {
    x = +x;
    if (x < 1)
      return NaN;
    if (!$isFinite(x))
      return x;
    return log(x + sqrt(x + 1) * sqrt(x - 1));
  }
  function asinh(x) {
    x = +x;
    if (x === 0 || !$isFinite(x))
      return x;
    if (x > 0)
      return log(x + sqrt(x * x + 1));
    return -log(-x + sqrt(x * x + 1));
  }
  function atanh(x) {
    x = +x;
    if (x === -1) {
      return -Infinity;
    }
    if (x === 1) {
      return Infinity;
    }
    if (x === 0) {
      return x;
    }
    if ($isNaN(x) || x < -1 || x > 1) {
      return NaN;
    }
    return 0.5 * log((1 + x) / (1 - x));
  }
  function hypot(x, y) {
    var length = arguments.length;
    var args = new Array(length);
    var max = 0;
    for (var i = 0; i < length; i++) {
      var n = arguments[i];
      n = +n;
      if (n === Infinity || n === -Infinity)
        return Infinity;
      n = abs(n);
      if (n > max)
        max = n;
      args[i] = n;
    }
    if (max === 0)
      max = 1;
    var sum = 0;
    var compensation = 0;
    for (var i = 0; i < length; i++) {
      var n = args[i] / max;
      var summand = n * n - compensation;
      var preliminary = sum + summand;
      compensation = (preliminary - sum) - summand;
      sum = preliminary;
    }
    return sqrt(sum) * max;
  }
  function trunc(x) {
    x = +x;
    if (x > 0)
      return floor(x);
    if (x < 0)
      return ceil(x);
    return x;
  }
  var fround,
      f32;
  if (typeof Float32Array === 'function') {
    f32 = new Float32Array(1);
    fround = function(x) {
      f32[0] = Number(x);
      return f32[0];
    };
  } else {
    fround = jsFround;
  }
  function cbrt(x) {
    x = +x;
    if (x === 0)
      return x;
    var negate = x < 0;
    if (negate)
      x = -x;
    var result = pow(x, 1 / 3);
    return negate ? -result : result;
  }
  function polyfillMath(global) {
    var Math = global.Math;
    maybeAddFunctions(Math, ['acosh', acosh, 'asinh', asinh, 'atanh', atanh, 'cbrt', cbrt, 'clz32', clz32, 'cosh', cosh, 'expm1', expm1, 'fround', fround, 'hypot', hypot, 'imul', imul, 'log10', log10, 'log1p', log1p, 'log2', log2, 'sign', sign, 'sinh', sinh, 'tanh', tanh, 'trunc', trunc]);
  }
  registerPolyfill(polyfillMath);
  return {
    get clz32() {
      return clz32;
    },
    get imul() {
      return imul;
    },
    get sign() {
      return sign;
    },
    get log10() {
      return log10;
    },
    get log2() {
      return log2;
    },
    get log1p() {
      return log1p;
    },
    get expm1() {
      return expm1;
    },
    get cosh() {
      return cosh;
    },
    get sinh() {
      return sinh;
    },
    get tanh() {
      return tanh;
    },
    get acosh() {
      return acosh;
    },
    get asinh() {
      return asinh;
    },
    get atanh() {
      return atanh;
    },
    get hypot() {
      return hypot;
    },
    get trunc() {
      return trunc;
    },
    get fround() {
      return fround;
    },
    get cbrt() {
      return cbrt;
    },
    get polyfillMath() {
      return polyfillMath;
    }
  };
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/Math.js" + '');
System.registerModule("traceur-runtime@0.0.91/src/runtime/polyfills/polyfills.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.91/src/runtime/polyfills/polyfills.js";
  var polyfillAll = System.get("traceur-runtime@0.0.91/src/runtime/polyfills/utils.js").polyfillAll;
  polyfillAll(Reflect.global);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
System.get("traceur-runtime@0.0.91/src/runtime/polyfills/polyfills.js" + '');

System = curSystem; })();
!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1","1"], [], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
$__System.register("2", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      $__export('default', Object.freeze({load: function(id) {
          return new Promise(function(resolve, reject) {
            return window.require([id], resolve, reject);
          });
        }}));
    }
  };
});

$__System.register("3", ["4"], function($__export) {
  "use strict";
  var EventDispatcher;
  return {
    setters: [function($__m) {
      EventDispatcher = $__m.default;
    }],
    execute: function() {
      $__export('default', function() {
        var REGISTERED_ELEMENTS = {};
        function create(id) {
          return function(Mediator) {
            var customProto = Mediator();
            var proto = Object.assign(Object.create(HTMLElement.prototype), customProto, {dispatcher: EventDispatcher});
            document.registerElement(id, {prototype: proto});
            return true;
          };
        }
        function findMediators(definitions, loader) {
          return function(node) {
            var id = node.tagName.toLowerCase();
            if (REGISTERED_ELEMENTS[id]) {
              return Promise.resolve(true);
            } else {
              REGISTERED_ELEMENTS[id] = true;
              return loader.load(definitions[id]).then(create(id));
            }
          };
        }
        function hasMediator(definitions) {
          return function(node) {
            var id = node.tagName.toLowerCase();
            return (definitions[id] && !REGISTERED_ELEMENTS[id]);
          };
        }
        var KE = ["abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "command", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
        var query = KE.map(function(e) {
          return ":not(" + e + ")";
        }).reduce(function(prev, curr) {
          return prev + curr;
        }, "*");
        function getAllElements(node) {
          return [node].concat([].slice.call(node.querySelectorAll(query), 0));
        }
        return Object.freeze({
          destroy: function(_) {
            return true;
          },
          findMediators: findMediators,
          hasMediator: hasMediator,
          getAllElements: getAllElements
        });
      });
      ;
    }
  };
});

$__System.registerDynamic("5", ["6", "7"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _checkForMethod = $__require('6');
  var _curry2 = $__require('7');
  module.exports = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
    var len = list.length;
    var idx = 0;
    while (idx < len) {
      fn(list[idx]);
      idx += 1;
    }
    return list;
  }));
  return module.exports;
});

$__System.register("8", ["9", "5", "a", "b", "c"], function($__export) {
  "use strict";
  var map,
      forEach,
      flatten,
      compose,
      filter;
  return {
    setters: [function($__m) {
      map = $__m.default;
    }, function($__m) {
      forEach = $__m.default;
    }, function($__m) {
      flatten = $__m.default;
    }, function($__m) {
      compose = $__m.default;
    }, function($__m) {
      filter = $__m.default;
    }],
    execute: function() {
      $__export('default', function(domWatcher, loader, handler, definitions) {
        var _handleNodesRemoved = compose(forEach(handler.destroy), flatten);
        var getMediators = compose(function(promises) {
          return Promise.all(promises);
        }, map(handler.findMediators(definitions, loader)), filter(handler.hasMediator(definitions)), flatten);
        domWatcher.onAdded.connect(getMediators);
        domWatcher.onRemoved.connect(_handleNodesRemoved);
        var bootstrap = compose(getMediators, map(handler.getAllElements), function() {
          var root = arguments[0] !== (void 0) ? arguments[0] : document.body;
          return [root];
        });
        return Object.freeze({bootstrap: bootstrap});
      });
    }
  };
});

$__System.register("d", [], function($__export) {
  "use strict";
  function Signal() {
    var listenerBoxes = [];
    function registerListener(listener, scope, once) {
      listenerBoxes.filter(function(box) {
        return (box.listener === listener && box.scope === scope) && (function(box) {
          return (box.once && !once) || (once && !box.once);
        });
      }).forEach(function(_) {
        throw new Error('You cannot addOnce() then try to add() the same listener without removing the relationship first.');
      });
      listenerBoxes = listenerBoxes.concat([{
        listener: listener,
        scope: scope,
        once: once
      }]);
    }
    function emit() {
      var args = arguments;
      listenerBoxes.forEach(function($__1) {
        var $__2 = $__1,
            listener = $__2.listener,
            scope = $__2.scope,
            once = $__2.once;
        once && disconnect(listener, scope);
        listener.apply(scope, args);
      });
    }
    var connect = function(slot, scope) {
      return registerListener(slot, scope, false);
    };
    var connectOnce = function(slot, scope) {
      return registerListener(slot, scope, true);
    };
    function disconnect(slot, _scope) {
      listenerBoxes = listenerBoxes.filter(function($__1) {
        var $__2 = $__1,
            listener = $__2.listener,
            scope = $__2.scope;
        return listener !== slot && scope !== _scope;
      });
    }
    function disconnectAll() {
      listenerBoxes.forEach(function($__1) {
        var $__2 = $__1,
            listener = $__2.listener,
            scope = $__2.scope;
        return disconnect(listener, scope);
      });
    }
    return Object.freeze({
      connect: connect,
      connectOnce: connectOnce,
      disconnect: disconnect,
      disconnectAll: disconnectAll,
      emit: emit
    });
  }
  $__export("default", Signal);
  return {
    setters: [],
    execute: function() {}
  };
});

$__System.registerDynamic("e", ["f"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var isArrayLike = $__require('f');
  module.exports = function _makeFlat(recursive) {
    return function flatt(list) {
      var value,
          jlen,
          j;
      var result = [];
      var idx = 0;
      var ilen = list.length;
      while (idx < ilen) {
        if (isArrayLike(list[idx])) {
          value = recursive ? flatt(list[idx]) : list[idx];
          j = 0;
          jlen = value.length;
          while (j < jlen) {
            result[result.length] = value[j];
            j += 1;
          }
        } else {
          result[result.length] = list[idx];
        }
        idx += 1;
      }
      return result;
    };
  };
  return module.exports;
});

$__System.registerDynamic("a", ["10", "e"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry1 = $__require('10');
  var _makeFlat = $__require('e');
  module.exports = _curry1(_makeFlat(true));
  return module.exports;
});

$__System.registerDynamic("11", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _map(fn, functor) {
    var idx = 0;
    var len = functor.length;
    var result = Array(len);
    while (idx < len) {
      result[idx] = fn(functor[idx]);
      idx += 1;
    }
    return result;
  };
  return module.exports;
});

$__System.registerDynamic("12", ["7", "13"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  var _xfBase = $__require('13');
  module.exports = (function() {
    function XMap(f, xf) {
      this.xf = xf;
      this.f = f;
    }
    XMap.prototype['@@transducer/init'] = _xfBase.init;
    XMap.prototype['@@transducer/result'] = _xfBase.result;
    XMap.prototype['@@transducer/step'] = function(result, input) {
      return this.xf['@@transducer/step'](result, this.f(input));
    };
    return _curry2(function _xmap(f, xf) {
      return new XMap(f, xf);
    });
  }());
  return module.exports;
});

$__System.registerDynamic("14", ["15", "16"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _arity = $__require('15');
  var _isPlaceholder = $__require('16');
  module.exports = function _curryN(length, received, fn) {
    return function() {
      var combined = [];
      var argsIdx = 0;
      var left = length;
      var combinedIdx = 0;
      while (combinedIdx < received.length || argsIdx < arguments.length) {
        var result;
        if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
          result = received[combinedIdx];
        } else {
          result = arguments[argsIdx];
          argsIdx += 1;
        }
        combined[combinedIdx] = result;
        if (!_isPlaceholder(result)) {
          left -= 1;
        }
        combinedIdx += 1;
      }
      return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
    };
  };
  return module.exports;
});

$__System.registerDynamic("17", ["15", "10", "7", "14"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _arity = $__require('15');
  var _curry1 = $__require('10');
  var _curry2 = $__require('7');
  var _curryN = $__require('14');
  module.exports = _curry2(function curryN(length, fn) {
    if (length === 1) {
      return _curry1(fn);
    }
    return _arity(length, _curryN(length, [], fn));
  });
  return module.exports;
});

$__System.registerDynamic("9", ["7", "18", "11", "19", "12", "17", "1a"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  var _dispatchable = $__require('18');
  var _map = $__require('11');
  var _reduce = $__require('19');
  var _xmap = $__require('12');
  var curryN = $__require('17');
  var keys = $__require('1a');
  module.exports = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
    switch (Object.prototype.toString.call(functor)) {
      case '[object Function]':
        return curryN(functor.length, function() {
          return fn.call(this, functor.apply(this, arguments));
        });
      case '[object Object]':
        return _reduce(function(acc, key) {
          acc[key] = fn(functor[key]);
          return acc;
        }, {}, keys(functor));
      default:
        return _map(fn, functor);
    }
  }));
  return module.exports;
});

$__System.registerDynamic("1b", ["7"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  module.exports = _curry2(function prop(p, obj) {
    return obj[p];
  });
  return module.exports;
});

$__System.registerDynamic("1c", ["7", "9", "1b"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  var map = $__require('9');
  var prop = $__require('1b');
  module.exports = _curry2(function pluck(p, list) {
    return map(prop(p), list);
  });
  return module.exports;
});

$__System.registerDynamic("1d", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _pipe(f, g) {
    return function() {
      return g.call(this, f.apply(this, arguments));
    };
  };
  return module.exports;
});

$__System.registerDynamic("1e", ["1f", "19"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry3 = $__require('1f');
  var _reduce = $__require('19');
  module.exports = _curry3(_reduce);
  return module.exports;
});

$__System.registerDynamic("6", ["20", "21"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _isArray = $__require('20');
  var _slice = $__require('21');
  module.exports = function _checkForMethod(methodname, fn) {
    return function() {
      var length = arguments.length;
      if (length === 0) {
        return fn();
      }
      var obj = arguments[length - 1];
      return (_isArray(obj) || typeof obj[methodname] !== 'function') ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
    };
  };
  return module.exports;
});

$__System.registerDynamic("1f", ["10", "7", "16"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry1 = $__require('10');
  var _curry2 = $__require('7');
  var _isPlaceholder = $__require('16');
  module.exports = function _curry3(fn) {
    return function f3(a, b, c) {
      switch (arguments.length) {
        case 0:
          return f3;
        case 1:
          return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
            return fn(a, _b, _c);
          });
        case 2:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
            return fn(_a, b, _c);
          }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
            return fn(a, _b, _c);
          }) : _curry1(function(_c) {
            return fn(a, b, _c);
          });
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
            return fn(_a, _b, c);
          }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
            return fn(_a, b, _c);
          }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
            return fn(a, _b, _c);
          }) : _isPlaceholder(a) ? _curry1(function(_a) {
            return fn(_a, b, c);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a, _b, c);
          }) : _isPlaceholder(c) ? _curry1(function(_c) {
            return fn(a, b, _c);
          }) : fn(a, b, c);
      }
    };
  };
  return module.exports;
});

$__System.registerDynamic("22", ["6", "1f"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _checkForMethod = $__require('6');
  var _curry3 = $__require('1f');
  module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
    return Array.prototype.slice.call(list, fromIndex, toIndex);
  }));
  return module.exports;
});

$__System.registerDynamic("23", ["6", "22"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _checkForMethod = $__require('6');
  var slice = $__require('22');
  module.exports = _checkForMethod('tail', slice(1, Infinity));
  return module.exports;
});

$__System.registerDynamic("24", ["15", "1d", "1e", "23"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _arity = $__require('15');
  var _pipe = $__require('1d');
  var reduce = $__require('1e');
  var tail = $__require('23');
  module.exports = function pipe() {
    if (arguments.length === 0) {
      throw new Error('pipe requires at least one argument');
    }
    return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
  };
  return module.exports;
});

$__System.registerDynamic("25", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
  };
  return module.exports;
});

$__System.registerDynamic("26", ["10", "25", "21"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry1 = $__require('10');
  var _isString = $__require('25');
  var _slice = $__require('21');
  module.exports = _curry1(function reverse(list) {
    return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
  });
  return module.exports;
});

$__System.registerDynamic("b", ["24", "26"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var pipe = $__require('24');
  var reverse = $__require('26');
  module.exports = function compose() {
    if (arguments.length === 0) {
      throw new Error('compose requires at least one argument');
    }
    return pipe.apply(this, reverse(arguments));
  };
  return module.exports;
});

$__System.register("27", ["d", "9", "a", "1c", "b", "c"], function($__export) {
  "use strict";
  var Signal,
      map,
      flatten,
      pluck,
      compose,
      filter;
  return {
    setters: [function($__m) {
      Signal = $__m.default;
    }, function($__m) {
      map = $__m.default;
    }, function($__m) {
      flatten = $__m.default;
    }, function($__m) {
      pluck = $__m.default;
    }, function($__m) {
      compose = $__m.default;
    }, function($__m) {
      filter = $__m.default;
    }],
    execute: function() {
      $__export('default', function(getAllElements) {
        var root = arguments[1] !== (void 0) ? arguments[1] : document.body;
        var onAdded = Signal();
        var onRemoved = Signal();
        function makeChain(prop, emit) {
          return compose(emit, filter(function(nodes) {
            return nodes.length > 0;
          }), map(getAllElements), filter(function(node) {
            return node.querySelectorAll;
          }), flatten, pluck(prop));
        }
        var getAdded = makeChain("addedNodes", onAdded.emit);
        var getRemoved = makeChain("removedNodes", onRemoved.emit);
        var handleMutations = function(mutations) {
          getAdded(mutations);
          getRemoved(mutations);
          var attributesChanged = mutations.filter(function(mutation) {
            return mutation.type == "attributes" && mutation.attributeName == "mediatorid" && mutation.target.getAttribute("mediatorid") == null;
          }).map(function(mutation) {
            return mutation.target;
          });
          onRemoved.emit(attributesChanged);
          onAdded.emit(attributesChanged);
        };
        var observer = new MutationObserver(handleMutations);
        observer.observe(root, {
          attributes: true,
          childList: true,
          characterData: false,
          subtree: true
        });
        return Object.freeze({
          onAdded: onAdded,
          onRemoved: onRemoved
        });
      });
    }
  };
});

$__System.register("28", [], function($__export) {
  "use strict";
  function getPromise() {
    if (System.import) {
      return function(url) {
        return System.import(url);
      };
    } else {
      return function(url) {
        return Promise.resolve(System.get(url));
      };
    }
  }
  return {
    setters: [],
    execute: function() {
      $__export('default', Object.freeze({load: function(id) {
          return getPromise()(id).then(function(e) {
            return e.default ? e.default : e;
          }).catch(function(e) {
            console.log(e);
          });
        }}));
    }
  };
});

$__System.register("29", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      $__export('default', function() {
        function RJSEvent(type) {
          var data = arguments[1] !== (void 0) ? arguments[1] : null;
          var bubbles = arguments[2] !== (void 0) ? arguments[2] : false;
          var cancelable = arguments[3] !== (void 0) ? arguments[3] : false;
          this.data = data;
          this.type = type;
          this.bubbles = bubbles;
          this.cancelable = cancelable;
          this.timeStamp = (new Date()).getTime();
          this.defaultPrevented = false;
          this.propagationStopped = false;
          this.immediatePropagationStopped = false;
          this.removed = false;
          this.target;
          this.currentTarget;
          this.eventPhase = 0;
        }
        return ($traceurRuntime.createClass)(RJSEvent, {
          preventDefault: function() {
            this.defaultPrevented = true;
          },
          stopPropagation: function() {
            this.propagationStopped = true;
          },
          stopImmediatePropagation: function() {
            this.immediatePropagationStopped = this.propagationStopped = true;
          },
          remove: function() {
            this.removed = true;
          },
          clone: function() {
            return new RJSEvent(this.type, this.data, this.bubbles, this.cancelable);
          }
        }, {});
      }());
    }
  };
});

$__System.register("4", ["29"], function($__export) {
  "use strict";
  var RJSEvent,
      EventDispatcher,
      makeDispatcher;
  return {
    setters: [function($__m) {
      RJSEvent = $__m.default;
    }],
    execute: function() {
      EventDispatcher = function() {
        function EventDispatcher() {
          this._listeners = {};
        }
        return ($traceurRuntime.createClass)(EventDispatcher, {
          addEventListener: function(type, listener, useCapture) {
            var listeners;
            if (useCapture) {
              listeners = this._captureListeners = this._captureListeners || {};
            } else {
              listeners = this._listeners = this._listeners || {};
            }
            var arr = listeners[type];
            if (arr) {
              this.removeEventListener(type, listener, useCapture);
            }
            arr = listeners[type];
            if (!arr) {
              listeners[type] = [listener];
            } else {
              arr.push(listener);
            }
            return listener;
          },
          removeEventListener: function(type, listener, useCapture) {
            var listeners = useCapture ? this._captureListeners : this._listeners;
            if (!listeners) {
              return;
            }
            var arr = listeners[type];
            if (!arr) {
              return;
            }
            for (var i = 0,
                l = arr.length; i < l; i++) {
              if (arr[i] == listener) {
                if (l == 1) {
                  delete(listeners[type]);
                } else {
                  arr.splice(i, 1);
                }
                break;
              }
            }
          },
          removeAllEventListeners: function(type) {
            if (!type) {
              this._listeners = this._captureListeners = null;
            } else {
              if (this._listeners) {
                delete(this._listeners[type]);
              }
              if (this._captureListeners) {
                delete(this._captureListeners[type]);
              }
            }
          },
          dispatchEvent: function(eventObj) {
            if (typeof eventObj == "string") {
              var listeners = this._listeners;
              if (!listeners || !listeners[eventObj]) {
                return false;
              }
              eventObj = new RJSEvent(eventObj);
            } else if (eventObj.target && eventObj.clone) {
              eventObj = eventObj.clone();
            }
            try {
              eventObj.target = this;
            } catch (e) {}
            if (!eventObj.bubbles || !this.parent) {
              this._dispatchEvent(eventObj, 2);
            } else {
              var top = this,
                  list = [top];
              while (top.parent) {
                list.push(top = top.parent);
              }
              var i,
                  l = list.length;
              for (i = l - 1; i >= 0 && !eventObj.propagationStopped; i--) {
                list[i]._dispatchEvent(eventObj, 1 + (i == 0));
              }
              for (i = 1; i < l && !eventObj.propagationStopped; i++) {
                list[i]._dispatchEvent(eventObj, 3);
              }
            }
            return eventObj.defaultPrevented;
          },
          hasEventListener: function(type) {
            var listeners = this._listeners,
                captureListeners = this._captureListeners;
            return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
          },
          _dispatchEvent: function(eventObj, eventPhase) {
            var l,
                listeners = (eventPhase == 1) ? this._captureListeners : this._listeners;
            if (eventObj && listeners) {
              var arr = listeners[eventObj.type];
              if (!arr || !(l = arr.length)) {
                return;
              }
              try {
                eventObj.currentTarget = this;
              } catch (e) {}
              try {
                eventObj.eventPhase = eventPhase;
              } catch (e) {}
              eventObj.removed = false;
              arr = arr.slice();
              for (var i = 0; i < l && !eventObj.immediatePropagationStopped; i++) {
                var o = arr[i];
                if (o.handleEvent) {
                  o.handleEvent(eventObj);
                } else {
                  o(eventObj);
                }
                if (eventObj.removed) {
                  this.removeEventListener(eventObj.type, o, eventPhase == 1);
                  eventObj.removed = false;
                }
              }
            }
          }
        }, {});
      }();
      $__export('default', new EventDispatcher());
      makeDispatcher = function() {
        return new EventDispatcher();
      };
      $__export("makeDispatcher", makeDispatcher);
    }
  };
});

$__System.registerDynamic("2a", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _reduced(x) {
    return x && x['@@transducer/reduced'] ? x : {
      '@@transducer/value': x,
      '@@transducer/reduced': true
    };
  };
  return module.exports;
});

$__System.registerDynamic("2b", ["7", "2a", "13"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  var _reduced = $__require('2a');
  var _xfBase = $__require('13');
  module.exports = (function() {
    function XFind(f, xf) {
      this.xf = xf;
      this.f = f;
      this.found = false;
    }
    XFind.prototype['@@transducer/init'] = _xfBase.init;
    XFind.prototype['@@transducer/result'] = function(result) {
      if (!this.found) {
        result = this.xf['@@transducer/step'](result, void 0);
      }
      return this.xf['@@transducer/result'](result);
    };
    XFind.prototype['@@transducer/step'] = function(result, input) {
      if (this.f(input)) {
        this.found = true;
        result = _reduced(this.xf['@@transducer/step'](result, input));
      }
      return result;
    };
    return _curry2(function _xfind(f, xf) {
      return new XFind(f, xf);
    });
  }());
  return module.exports;
});

$__System.registerDynamic("2c", ["7", "18", "2b"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  var _dispatchable = $__require('18');
  var _xfind = $__require('2b');
  module.exports = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      if (fn(list[idx])) {
        return list[idx];
      }
      idx += 1;
    }
  }));
  return module.exports;
});

$__System.registerDynamic("2d", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _isTransformer(obj) {
    return typeof obj['@@transducer/step'] === 'function';
  };
  return module.exports;
});

$__System.registerDynamic("21", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _slice(args, from, to) {
    switch (arguments.length) {
      case 1:
        return _slice(args, 0, args.length);
      case 2:
        return _slice(args, from, args.length);
      default:
        var list = [];
        var idx = 0;
        var len = Math.max(0, Math.min(args.length, to) - from);
        while (idx < len) {
          list[idx] = args[from + idx];
          idx += 1;
        }
        return list;
    }
  };
  return module.exports;
});

$__System.registerDynamic("18", ["20", "2d", "21"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _isArray = $__require('20');
  var _isTransformer = $__require('2d');
  var _slice = $__require('21');
  module.exports = function _dispatchable(methodname, xf, fn) {
    return function() {
      var length = arguments.length;
      if (length === 0) {
        return fn();
      }
      var obj = arguments[length - 1];
      if (!_isArray(obj)) {
        var args = _slice(arguments, 0, length - 1);
        if (typeof obj[methodname] === 'function') {
          return obj[methodname].apply(obj, args);
        }
        if (_isTransformer(obj)) {
          var transducer = xf.apply(null, args);
          return transducer(obj);
        }
      }
      return fn.apply(this, arguments);
    };
  };
  return module.exports;
});

$__System.registerDynamic("2e", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _filter(fn, list) {
    var idx = 0;
    var len = list.length;
    var result = [];
    while (idx < len) {
      if (fn(list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
  return module.exports;
});

$__System.registerDynamic("2f", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
  };
  return module.exports;
});

$__System.registerDynamic("30", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = (function() {
    function XWrap(fn) {
      this.f = fn;
    }
    XWrap.prototype['@@transducer/init'] = function() {
      throw new Error('init not implemented on XWrap');
    };
    XWrap.prototype['@@transducer/result'] = function(acc) {
      return acc;
    };
    XWrap.prototype['@@transducer/step'] = function(acc, x) {
      return this.f(acc, x);
    };
    return function _xwrap(fn) {
      return new XWrap(fn);
    };
  }());
  return module.exports;
});

$__System.registerDynamic("15", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _arity(n, fn) {
    switch (n) {
      case 0:
        return function() {
          return fn.apply(this, arguments);
        };
      case 1:
        return function(a0) {
          return fn.apply(this, arguments);
        };
      case 2:
        return function(a0, a1) {
          return fn.apply(this, arguments);
        };
      case 3:
        return function(a0, a1, a2) {
          return fn.apply(this, arguments);
        };
      case 4:
        return function(a0, a1, a2, a3) {
          return fn.apply(this, arguments);
        };
      case 5:
        return function(a0, a1, a2, a3, a4) {
          return fn.apply(this, arguments);
        };
      case 6:
        return function(a0, a1, a2, a3, a4, a5) {
          return fn.apply(this, arguments);
        };
      case 7:
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return fn.apply(this, arguments);
        };
      case 8:
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return fn.apply(this, arguments);
        };
      case 9:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
          return fn.apply(this, arguments);
        };
      case 10:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return fn.apply(this, arguments);
        };
      default:
        throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
    }
  };
  return module.exports;
});

$__System.registerDynamic("31", ["15", "7"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _arity = $__require('15');
  var _curry2 = $__require('7');
  module.exports = _curry2(function bind(fn, thisObj) {
    return _arity(fn.length, function() {
      return fn.apply(thisObj, arguments);
    });
  });
  return module.exports;
});

$__System.registerDynamic("20", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = Array.isArray || function _isArray(val) {
    return (val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]');
  };
  return module.exports;
});

$__System.registerDynamic("f", ["10", "20"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry1 = $__require('10');
  var _isArray = $__require('20');
  module.exports = _curry1(function isArrayLike(x) {
    if (_isArray(x)) {
      return true;
    }
    if (!x) {
      return false;
    }
    if (typeof x !== 'object') {
      return false;
    }
    if (x instanceof String) {
      return false;
    }
    if (x.nodeType === 1) {
      return !!x.length;
    }
    if (x.length === 0) {
      return true;
    }
    if (x.length > 0) {
      return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }
    return false;
  });
  return module.exports;
});

$__System.registerDynamic("19", ["30", "31", "f"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _xwrap = $__require('30');
  var bind = $__require('31');
  var isArrayLike = $__require('f');
  module.exports = (function() {
    function _arrayReduce(xf, acc, list) {
      var idx = 0;
      var len = list.length;
      while (idx < len) {
        acc = xf['@@transducer/step'](acc, list[idx]);
        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value'];
          break;
        }
        idx += 1;
      }
      return xf['@@transducer/result'](acc);
    }
    function _iterableReduce(xf, acc, iter) {
      var step = iter.next();
      while (!step.done) {
        acc = xf['@@transducer/step'](acc, step.value);
        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value'];
          break;
        }
        step = iter.next();
      }
      return xf['@@transducer/result'](acc);
    }
    function _methodReduce(xf, acc, obj) {
      return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
    }
    var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
    return function _reduce(fn, acc, list) {
      if (typeof fn === 'function') {
        fn = _xwrap(fn);
      }
      if (isArrayLike(list)) {
        return _arrayReduce(fn, acc, list);
      }
      if (typeof list.reduce === 'function') {
        return _methodReduce(fn, acc, list);
      }
      if (list[symIterator] != null) {
        return _iterableReduce(fn, acc, list[symIterator]());
      }
      if (typeof list.next === 'function') {
        return _iterableReduce(fn, acc, list);
      }
      throw new TypeError('reduce: list must be array or iterable');
    };
  }());
  return module.exports;
});

$__System.registerDynamic("7", ["10", "16"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry1 = $__require('10');
  var _isPlaceholder = $__require('16');
  module.exports = function _curry2(fn) {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2;
        case 1:
          return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
            return fn(a, _b);
          });
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
            return fn(_a, b);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a, _b);
          }) : fn(a, b);
      }
    };
  };
  return module.exports;
});

$__System.registerDynamic("13", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = {
    init: function() {
      return this.xf['@@transducer/init']();
    },
    result: function(result) {
      return this.xf['@@transducer/result'](result);
    }
  };
  return module.exports;
});

$__System.registerDynamic("32", ["7", "13"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  var _xfBase = $__require('13');
  module.exports = (function() {
    function XFilter(f, xf) {
      this.xf = xf;
      this.f = f;
    }
    XFilter.prototype['@@transducer/init'] = _xfBase.init;
    XFilter.prototype['@@transducer/result'] = _xfBase.result;
    XFilter.prototype['@@transducer/step'] = function(result, input) {
      return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
    };
    return _curry2(function _xfilter(f, xf) {
      return new XFilter(f, xf);
    });
  }());
  return module.exports;
});

$__System.registerDynamic("16", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _isPlaceholder(a) {
    return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
  };
  return module.exports;
});

$__System.registerDynamic("10", ["16"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _isPlaceholder = $__require('16');
  module.exports = function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  };
  return module.exports;
});

$__System.registerDynamic("33", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
  return module.exports;
});

$__System.registerDynamic("34", ["33"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _has = $__require('33');
  module.exports = (function() {
    var toString = Object.prototype.toString;
    return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
      return toString.call(x) === '[object Arguments]';
    } : function _isArguments(x) {
      return _has('callee', x);
    };
  }());
  return module.exports;
});

$__System.registerDynamic("1a", ["10", "33", "34"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry1 = $__require('10');
  var _has = $__require('33');
  var _isArguments = $__require('34');
  module.exports = (function() {
    var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
    var hasArgsEnumBug = (function() {
      'use strict';
      return arguments.propertyIsEnumerable('length');
    }());
    var contains = function contains(list, item) {
      var idx = 0;
      while (idx < list.length) {
        if (list[idx] === item) {
          return true;
        }
        idx += 1;
      }
      return false;
    };
    return typeof Object.keys === 'function' && !hasArgsEnumBug ? _curry1(function keys(obj) {
      return Object(obj) !== obj ? [] : Object.keys(obj);
    }) : _curry1(function keys(obj) {
      if (Object(obj) !== obj) {
        return [];
      }
      var prop,
          nIdx;
      var ks = [];
      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
      for (prop in obj) {
        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
          ks[ks.length] = prop;
        }
      }
      if (hasEnumBug) {
        nIdx = nonEnumerableProps.length - 1;
        while (nIdx >= 0) {
          prop = nonEnumerableProps[nIdx];
          if (_has(prop, obj) && !contains(ks, prop)) {
            ks[ks.length] = prop;
          }
          nIdx -= 1;
        }
      }
      return ks;
    });
  }());
  return module.exports;
});

$__System.registerDynamic("c", ["7", "18", "2e", "2f", "19", "32", "1a"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var _curry2 = $__require('7');
  var _dispatchable = $__require('18');
  var _filter = $__require('2e');
  var _isObject = $__require('2f');
  var _reduce = $__require('19');
  var _xfilter = $__require('32');
  var keys = $__require('1a');
  module.exports = _curry2(_dispatchable('filter', _xfilter, function(pred, filterable) {
    return (_isObject(filterable) ? _reduce(function(acc, key) {
      if (pred(filterable[key])) {
        acc[key] = filterable[key];
      }
      return acc;
    }, {}, keys(filterable)) : _filter(pred, filterable));
  }));
  return module.exports;
});

$__System.register("35", ["4", "2c", "c"], function($__export) {
  "use strict";
  var makeDispatcher,
      find,
      filter,
      noop,
      nextUid;
  return {
    setters: [function($__m) {
      makeDispatcher = $__m.makeDispatcher;
    }, function($__m) {
      find = $__m.default;
    }, function($__m) {
      filter = $__m.default;
    }],
    execute: function() {
      noop = function() {};
      nextUid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };
      $__export('default', function() {
        var MEDIATORS_CACHE = [];
        var eventDispatcher = makeDispatcher();
        function create(node) {
          return function(Mediator) {
            var mediatorId = nextUid();
            node.setAttribute('mediatorid', mediatorId);
            var disposeFunction = Mediator(node, eventDispatcher) || noop;
            var disposable = {
              mediatorId: mediatorId,
              node: node,
              dispose: disposeFunction
            };
            MEDIATORS_CACHE.push(disposable);
            return disposable;
          };
        }
        function destroy(node) {
          var disposable = find(function(mediator) {
            return mediator.node == node;
          }, MEDIATORS_CACHE);
          if (disposable) {
            disposable.dispose();
            MEDIATORS_CACHE = filter(function(_disposable) {
              return _disposable != disposable;
            }, MEDIATORS_CACHE);
            disposable.node = null;
            return true;
          }
        }
        var DATA_MEDIATOR = "data-mediator";
        var findMediators = function(definitions, loader) {
          return function(node) {
            return loader.load(definitions[node.getAttribute(DATA_MEDIATOR)]).then(create(node));
          };
        };
        var hasMediator = function(definitions) {
          return function(node) {
            return (definitions[node.getAttribute(DATA_MEDIATOR)] && !node.getAttribute("mediatorid"));
          };
        };
        var getAllElements = function(node) {
          return [node].concat([].slice.call(node.querySelectorAll("[" + DATA_MEDIATOR + "]"), 0));
        };
        return Object.freeze({
          destroy: destroy,
          findMediators: findMediators,
          hasMediator: hasMediator,
          getAllElements: getAllElements
        });
      });
      ;
    }
  };
});

$__System.register("36", ["8", "27", "28", "35"], function($__export) {
  "use strict";
  var MediatorsBuilder,
      DomWatcher,
      ScriptLoader,
      MediatorHandler;
  return {
    setters: [function($__m) {
      MediatorsBuilder = $__m.default;
    }, function($__m) {
      DomWatcher = $__m.default;
    }, function($__m) {
      ScriptLoader = $__m.default;
    }, function($__m) {
      MediatorHandler = $__m.default;
    }],
    execute: function() {
      $__export('default', function($__1) {
        var $__3,
            $__4,
            $__5,
            $__6;
        var $__2 = $__1,
            definitions = $__2.definitions,
            domWatcher = ($__3 = $__2.domWatcher) === void 0 ? DomWatcher : $__3,
            loader = ($__4 = $__2.loader) === void 0 ? ScriptLoader : $__4,
            mediatorHandler = ($__5 = $__2.mediatorHandler) === void 0 ? MediatorHandler() : $__5,
            root = ($__6 = $__2.root) === void 0 ? document.body : $__6;
        var domWatcher = DomWatcher(mediatorHandler.getAllElements);
        var builder = MediatorsBuilder(domWatcher, loader, mediatorHandler, definitions);
        return builder.bootstrap(root);
      });
    }
  };
});

$__System.register("1", ["28", "2", "4", "29", "d", "27", "8", "3", "36"], function($__export) {
  "use strict";
  var _ScriptLoader,
      _AMDScriptLoader,
      _EventDispatcher,
      _RJSEvent,
      _Signal,
      _DomWatcher,
      _MediatorsBuilder,
      _CustomElementHandler,
      _bootstrap,
      ScriptLoader,
      AMDScriptLoader,
      EventDispatcher,
      RJSEvent,
      Signal,
      DomWatcher,
      MediatorsBuilder,
      CustomElementHandler,
      bootstrap;
  return {
    setters: [function($__m) {
      _ScriptLoader = $__m.default;
    }, function($__m) {
      _AMDScriptLoader = $__m.default;
    }, function($__m) {
      _EventDispatcher = $__m.default;
    }, function($__m) {
      _RJSEvent = $__m.default;
    }, function($__m) {
      _Signal = $__m.default;
    }, function($__m) {
      _DomWatcher = $__m.default;
    }, function($__m) {
      _MediatorsBuilder = $__m.default;
    }, function($__m) {
      _CustomElementHandler = $__m.default;
    }, function($__m) {
      _bootstrap = $__m.default;
    }],
    execute: function() {
      ScriptLoader = _ScriptLoader;
      $__export("ScriptLoader", ScriptLoader);
      AMDScriptLoader = _AMDScriptLoader;
      $__export("AMDScriptLoader", AMDScriptLoader);
      EventDispatcher = _EventDispatcher;
      $__export("EventDispatcher", EventDispatcher);
      RJSEvent = _RJSEvent;
      $__export("RJSEvent", RJSEvent);
      Signal = _Signal;
      $__export("Signal", Signal);
      DomWatcher = _DomWatcher;
      $__export("DomWatcher", DomWatcher);
      MediatorsBuilder = _MediatorsBuilder;
      $__export("MediatorsBuilder", MediatorsBuilder);
      CustomElementHandler = _CustomElementHandler;
      $__export("CustomElementHandler", CustomElementHandler);
      bootstrap = _bootstrap;
      $__export("bootstrap", bootstrap);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define("robojs",[], factory);
  else
    window.robojs=factory();
});
//# sourceMappingURL=robojs.es6.js.map;
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

define("fetch", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.fetch;
    };
}(this)));

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define('delegate',[],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.delegate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
  while (element && element !== document) {
    if (element.matches(selector)) return element;
    element = element.parentNode;
  }
}

module.exports = closest;

},{}],2:[function(require,module,exports){
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":1}]},{},[2])(2)
});
