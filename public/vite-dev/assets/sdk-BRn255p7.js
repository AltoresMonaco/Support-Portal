import{a as x,g as te,i as D}from"./AudioNotificationHelper-CDrFIep2.js";import{i as oe}from"./colorHelper-DkkSNPxc.js";import{S as ne,p as ie,a as re,C as se,b as ae,c as le}from"./sharedFrameEvents-CcDS0bVP.js";import{g as de}from"./_commonjsHelpers-BosuxZz1.js";import"./index-BP-sUqpX.js";import"./index-DaWXXnfb.js";const we=`
:root {
  --b-100: #F2F3F7;
  --s-700: #37546D;
}

.woot-widget-holder {
  box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
  opacity: 1;
  will-change: transform, opacity;
  transform: translateY(0);
  overflow: hidden !important;
  position: fixed !important;
  transition: opacity 0.2s linear, transform 0.25s linear;
  z-index: 2147483000 !important;
}

.woot-widget-holder.woot-widget-holder--flat {
  box-shadow: none;
  border-radius: 0;
  border: 1px solid var(--b-100);
}

.woot-widget-holder iframe {
  border: 0;
  color-scheme: normal;
  height: 100% !important;
  width: 100% !important;
  max-height: 100vh !important;
}

.woot-widget-holder.has-unread-view {
  border-radius: 0 !important;
  min-height: 80px !important;
  height: auto;
  bottom: 94px;
  box-shadow: none !important;
  border: 0;
}

.woot-widget-bubble {
  background: #1f93ff;
  border-radius: 100px;
  border-width: 0px;
  bottom: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .16) !important;
  cursor: pointer;
  height: 64px;
  padding: 0px;
  position: fixed;
  user-select: none;
  width: 64px;
  z-index: 2147483000 !important;
}

.woot-widget-bubble.woot-widget-bubble--flat {
  border-radius: 0;
}

.woot-widget-holder.woot-widget-holder--flat {
  bottom: 90px;
}

.woot-widget-bubble.woot-widget-bubble--flat {
  height: 56px;
  width: 56px;
}

.woot-widget-bubble.woot-widget-bubble--flat svg {
  margin: 16px;
}

.woot-widget-bubble.woot-widget-bubble--flat.woot--close::before,
.woot-widget-bubble.woot-widget-bubble--flat.woot--close::after {
  left: 28px;
  top: 16px;
}

.woot-widget-bubble.unread-notification::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4040;
  border-radius: 100%;
  top: 0px;
  right: 0px;
  border: 2px solid #ffffff;
  transition: background 0.2s ease;
}

.woot-widget-bubble.woot-widget--expanded {
  bottom: 24px;
  display: flex;
  height: 48px !important;
  width: auto !important;
  align-items: center;
}

.woot-widget-bubble.woot-widget--expanded div {
  align-items: center;
  color: #fff;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  padding-right: 20px;
  width: auto !important;
}

.woot-widget-bubble.woot-widget--expanded.woot-widget-bubble-color--lighter div{
  color: var(--s-700);
}

.woot-widget-bubble.woot-widget--expanded svg {
  height: 20px;
  margin: 14px 8px 14px 16px;
  width: 20px;
}

.woot-widget-bubble.woot-elements--left {
  left: 20px;
}

.woot-widget-bubble.woot-elements--right {
  right: 20px;
}

.woot-widget-bubble:hover {
  background: #1f93ff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .4) !important;
}

.woot-widget-bubble svg {
  all: revert;
  height: 24px;
  margin: 20px;
  width: 24px;
}

.woot-widget-bubble.woot-widget-bubble-color--lighter path{
  fill: var(--s-700);
}

@media only screen and (min-width: 667px) {
  .woot-widget-holder.woot-elements--left {
    left: 20px;
 }
  .woot-widget-holder.woot-elements--right {
    right: 20px;
 }
}

.woot--close:hover {
  opacity: 1;
}

.woot--close::before, .woot--close::after {
  background-color: #fff;
  content: ' ';
  display: inline;
  height: 24px;
  left: 32px;
  position: absolute;
  top: 20px;
  width: 2px;
}

.woot-widget-bubble-color--lighter.woot--close::before, .woot-widget-bubble-color--lighter.woot--close::after {
  background-color: var(--s-700);
}

.woot--close::before {
  transform: rotate(45deg);
}

.woot--close::after {
  transform: rotate(-45deg);
}

.woot--hide {
  bottom: -100vh !important;
  top: unset !important;
  opacity: 0;
  visibility: hidden !important;
  z-index: -1 !important;
}

.woot-widget--without-bubble {
  bottom: 20px !important;
}
.woot-widget-holder.woot--hide{
  transform: translateY(40px);
}
.woot-widget-bubble.woot--close {
  transform: translateX(0px) scale(1) rotate(0deg);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot--close.woot--hide {
  transform: translateX(8px) scale(.75) rotate(45deg);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

.woot-widget-bubble {
  transform-origin: center;
  will-change: transform, opacity;
  transform: translateX(0) scale(1) rotate(0deg);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot--hide {
  transform: translateX(8px) scale(.75) rotate(-30deg);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

.woot-widget-bubble.woot-widget--expanded {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot-widget--expanded.woot--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}
.woot-widget-bubble.woot-widget-bubble--flat.woot--close {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 10ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot-widget-bubble--flat.woot--close.woot--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}
.woot-widget-bubble.woot-widget--expanded.woot-widget-bubble--flat {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.woot-widget-bubble.woot-widget--expanded.woot-widget-bubble--flat.woot--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

@media only screen and (max-width: 667px) {
  .woot-widget-holder {
    height: 100%;
    right: 0;
    top: 0;
    width: 100%;
 }

 .woot-widget-holder iframe {
    min-height: 100% !important;
  }


 .woot-widget-holder.has-unread-view {
    height: auto;
    right: 0;
    width: auto;
    bottom: 0;
    top: auto;
    max-height: 100vh;
    padding: 0 8px;
  }

  .woot-widget-holder.has-unread-view iframe {
    min-height: unset !important;
  }

 .woot-widget-holder.has-unread-view.woot-elements--left {
    left: 0;
  }

  .woot-widget-bubble.woot--close {
    bottom: 60px;
    opacity: 0;
    visibility: hidden !important;
    z-index: -1 !important;
  }
}

@media only screen and (min-width: 667px) {
  .woot-widget-holder {
    border-radius: 16px;
    bottom: 104px;
    height: calc(90% - 64px - 20px);
    max-height: 640px !important;
    min-height: 250px !important;
    width: 400px !important;
 }
}

.woot-hidden {
  display: none !important;
}
`,ce=()=>{const e=document.createElement("style");e.innerHTML=`${we}`,e.id="cw-widget-styles",document.body.appendChild(e)},$=(e,o)=>{const t=document.getElementById(e),c=o.querySelector(`#${e}`);t&&!c&&o.appendChild(t)},_=e=>{$("cw-bubble-holder",e),$("cw-widget-holder",e),$("cw-widget-styles",e)},y=(e,o)=>{e.classList.add(...o.split(" "))},T=(e,o)=>{e.classList.toggle(o)},B=(e,o)=>{e.classList.remove(...o.split(" "))},I=({referrerURL:e,referrerHost:o})=>{u.events.onLocationChange({referrerURL:e,referrerHost:o})},ue=()=>{let e=document.location.href;const o=document.location.host,t={childList:!0,subtree:!0};I({referrerURL:e,referrerHost:o});const c=document.querySelector("body");new MutationObserver(l=>{l.forEach(()=>{e!==document.location.href&&(e=document.location.href,I({referrerURL:e,referrerHost:o}))})}).observe(c,t)},F=["standard","expanded_bubble"],H=["standard","flat"],N=["light","auto","dark"],X=e=>F.includes(e)?e:F[0],K=e=>X(e)===F[1],ge=e=>H.includes(e)?e:H[0],O=e=>e==="flat",R=e=>N.includes(e)?e:N[0],be="M240.808 240.808H122.123C56.6994 240.808 3.45695 187.562 3.45695 122.122C3.45695 56.7031 56.6994 3.45697 122.124 3.45697C187.566 3.45697 240.808 56.7031 240.808 122.122V240.808Z",q=document.getElementsByTagName("body")[0],v=document.createElement("div"),C=document.createElement("div"),L=document.createElement("button"),E=document.createElement("button");document.createElement("span");const he=e=>{if(K(window.$chatwoot.type)){const o=document.getElementById("woot-widget--expanded__text");o.innerText=e}},me=({className:e,path:o,target:t})=>{let c=`${e} woot-elements--${window.$chatwoot.position}`;const w=document.createElementNS("http://www.w3.org/2000/svg","svg");w.setAttributeNS(null,"id","woot-widget-bubble-icon"),w.setAttributeNS(null,"width","24"),w.setAttributeNS(null,"height","24"),w.setAttributeNS(null,"viewBox","0 0 240 240"),w.setAttributeNS(null,"fill","none"),w.setAttribute("xmlns","http://www.w3.org/2000/svg");const l=document.createElementNS("http://www.w3.org/2000/svg","path");if(l.setAttributeNS(null,"d",o),l.setAttributeNS(null,"fill","#FFFFFF"),w.appendChild(l),t.appendChild(w),K(window.$chatwoot.type)){const g=document.createElement("div");g.id="woot-widget--expanded__text",g.innerText="",t.appendChild(g),c+=" woot-widget--expanded"}return t.className=c,t.title="Open chat window",t},pe=e=>{e&&y(C,"woot-hidden"),y(C,"woot--bubble-holder"),C.id="cw-bubble-holder",q.appendChild(C)},S=(e={})=>{const{toggleValue:o}=e,{isOpen:t}=window.$chatwoot;if(t!==o){const c=o===void 0?!t:o;window.$chatwoot.isOpen=c,T(L,"woot--hide"),T(E,"woot--hide"),T(v,"woot--hide"),u.events.onBubbleToggle(c),c||L.focus()}},fe=()=>{C.addEventListener("click",S)},ve=()=>{const e=document.querySelector(".woot-widget-holder");y(e,"has-unread-view")},W=()=>{const e=document.querySelector(".woot-widget-holder");B(e,"has-unread-view")},xe=({eventName:e,data:o=null})=>{let t;return typeof window.CustomEvent=="function"?t=new CustomEvent(e,{detail:o}):(t=document.createEvent("CustomEvent"),t.initCustomEvent(e,!1,!1,o)),t},M=({eventName:e,data:o})=>{const t=xe({eventName:e,data:o});window.dispatchEvent(t)};var P={exports:{}},Y={exports:{}};(function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o={rotl:function(t,c){return t<<c|t>>>32-c},rotr:function(t,c){return t<<32-c|t>>>c},endian:function(t){if(t.constructor==Number)return o.rotl(t,8)&16711935|o.rotl(t,24)&4278255360;for(var c=0;c<t.length;c++)t[c]=o.endian(t[c]);return t},randomBytes:function(t){for(var c=[];t>0;t--)c.push(Math.floor(Math.random()*256));return c},bytesToWords:function(t){for(var c=[],w=0,l=0;w<t.length;w++,l+=8)c[l>>>5]|=t[w]<<24-l%32;return c},wordsToBytes:function(t){for(var c=[],w=0;w<t.length*32;w+=8)c.push(t[w>>>5]>>>24-w%32&255);return c},bytesToHex:function(t){for(var c=[],w=0;w<t.length;w++)c.push((t[w]>>>4).toString(16)),c.push((t[w]&15).toString(16));return c.join("")},hexToBytes:function(t){for(var c=[],w=0;w<t.length;w+=2)c.push(parseInt(t.substr(w,2),16));return c},bytesToBase64:function(t){for(var c=[],w=0;w<t.length;w+=3)for(var l=t[w]<<16|t[w+1]<<8|t[w+2],g=0;g<4;g++)w*8+g*6<=t.length*8?c.push(e.charAt(l>>>6*(3-g)&63)):c.push("=");return c.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/ig,"");for(var c=[],w=0,l=0;w<t.length;l=++w%4)l!=0&&c.push((e.indexOf(t.charAt(w-1))&Math.pow(2,-2*l+8)-1)<<l*2|e.indexOf(t.charAt(w))>>>6-l*2);return c}};Y.exports=o})();var ye=Y.exports,A={utf8:{stringToBytes:function(e){return A.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(A.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var o=[],t=0;t<e.length;t++)o.push(e.charCodeAt(t)&255);return o},bytesToString:function(e){for(var o=[],t=0;t<e.length;t++)o.push(String.fromCharCode(e[t]));return o.join("")}}},z=A;/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var Ce=function(e){return e!=null&&(G(e)||Se(e)||!!e._isBuffer)};function G(e){return!!e.constructor&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}function Se(e){return typeof e.readFloatLE=="function"&&typeof e.slice=="function"&&G(e.slice(0,0))}(function(){var e=ye,o=z.utf8,t=Ce,c=z.bin,w=function(l,g){l.constructor==String?g&&g.encoding==="binary"?l=c.stringToBytes(l):l=o.stringToBytes(l):t(l)?l=Array.prototype.slice.call(l,0):!Array.isArray(l)&&l.constructor!==Uint8Array&&(l=l.toString());for(var a=e.bytesToWords(l),f=l.length*8,r=1732584193,n=-271733879,s=-1732584194,i=271733878,d=0;d<a.length;d++)a[d]=(a[d]<<8|a[d]>>>24)&16711935|(a[d]<<24|a[d]>>>8)&4278255360;a[f>>>5]|=128<<f%32,a[(f+64>>>9<<4)+14]=f;for(var b=w._ff,h=w._gg,m=w._hh,p=w._ii,d=0;d<a.length;d+=16){var Z=r,Q=n,j=s,ee=i;r=b(r,n,s,i,a[d+0],7,-680876936),i=b(i,r,n,s,a[d+1],12,-389564586),s=b(s,i,r,n,a[d+2],17,606105819),n=b(n,s,i,r,a[d+3],22,-1044525330),r=b(r,n,s,i,a[d+4],7,-176418897),i=b(i,r,n,s,a[d+5],12,1200080426),s=b(s,i,r,n,a[d+6],17,-1473231341),n=b(n,s,i,r,a[d+7],22,-45705983),r=b(r,n,s,i,a[d+8],7,1770035416),i=b(i,r,n,s,a[d+9],12,-1958414417),s=b(s,i,r,n,a[d+10],17,-42063),n=b(n,s,i,r,a[d+11],22,-1990404162),r=b(r,n,s,i,a[d+12],7,1804603682),i=b(i,r,n,s,a[d+13],12,-40341101),s=b(s,i,r,n,a[d+14],17,-1502002290),n=b(n,s,i,r,a[d+15],22,1236535329),r=h(r,n,s,i,a[d+1],5,-165796510),i=h(i,r,n,s,a[d+6],9,-1069501632),s=h(s,i,r,n,a[d+11],14,643717713),n=h(n,s,i,r,a[d+0],20,-373897302),r=h(r,n,s,i,a[d+5],5,-701558691),i=h(i,r,n,s,a[d+10],9,38016083),s=h(s,i,r,n,a[d+15],14,-660478335),n=h(n,s,i,r,a[d+4],20,-405537848),r=h(r,n,s,i,a[d+9],5,568446438),i=h(i,r,n,s,a[d+14],9,-1019803690),s=h(s,i,r,n,a[d+3],14,-187363961),n=h(n,s,i,r,a[d+8],20,1163531501),r=h(r,n,s,i,a[d+13],5,-1444681467),i=h(i,r,n,s,a[d+2],9,-51403784),s=h(s,i,r,n,a[d+7],14,1735328473),n=h(n,s,i,r,a[d+12],20,-1926607734),r=m(r,n,s,i,a[d+5],4,-378558),i=m(i,r,n,s,a[d+8],11,-2022574463),s=m(s,i,r,n,a[d+11],16,1839030562),n=m(n,s,i,r,a[d+14],23,-35309556),r=m(r,n,s,i,a[d+1],4,-1530992060),i=m(i,r,n,s,a[d+4],11,1272893353),s=m(s,i,r,n,a[d+7],16,-155497632),n=m(n,s,i,r,a[d+10],23,-1094730640),r=m(r,n,s,i,a[d+13],4,681279174),i=m(i,r,n,s,a[d+0],11,-358537222),s=m(s,i,r,n,a[d+3],16,-722521979),n=m(n,s,i,r,a[d+6],23,76029189),r=m(r,n,s,i,a[d+9],4,-640364487),i=m(i,r,n,s,a[d+12],11,-421815835),s=m(s,i,r,n,a[d+15],16,530742520),n=m(n,s,i,r,a[d+2],23,-995338651),r=p(r,n,s,i,a[d+0],6,-198630844),i=p(i,r,n,s,a[d+7],10,1126891415),s=p(s,i,r,n,a[d+14],15,-1416354905),n=p(n,s,i,r,a[d+5],21,-57434055),r=p(r,n,s,i,a[d+12],6,1700485571),i=p(i,r,n,s,a[d+3],10,-1894986606),s=p(s,i,r,n,a[d+10],15,-1051523),n=p(n,s,i,r,a[d+1],21,-2054922799),r=p(r,n,s,i,a[d+8],6,1873313359),i=p(i,r,n,s,a[d+15],10,-30611744),s=p(s,i,r,n,a[d+6],15,-1560198380),n=p(n,s,i,r,a[d+13],21,1309151649),r=p(r,n,s,i,a[d+4],6,-145523070),i=p(i,r,n,s,a[d+11],10,-1120210379),s=p(s,i,r,n,a[d+2],15,718787259),n=p(n,s,i,r,a[d+9],21,-343485551),r=r+Z>>>0,n=n+Q>>>0,s=s+j>>>0,i=i+ee>>>0}return e.endian([r,n,s,i])};w._ff=function(l,g,a,f,r,n,s){var i=l+(g&a|~g&f)+(r>>>0)+s;return(i<<n|i>>>32-n)+g},w._gg=function(l,g,a,f,r,n,s){var i=l+(g&f|a&~f)+(r>>>0)+s;return(i<<n|i>>>32-n)+g},w._hh=function(l,g,a,f,r,n,s){var i=l+(g^a^f)+(r>>>0)+s;return(i<<n|i>>>32-n)+g},w._ii=function(l,g,a,f,r,n,s){var i=l+(a^(g|~f))+(r>>>0)+s;return(i<<n|i>>>32-n)+g},w._blocksize=16,w._digestsize=16,P.exports=function(l,g){if(l==null)throw new Error("Illegal argument "+l);var a=e.wordsToBytes(w(l,g));return g&&g.asBytes?a:g&&g.asString?c.bytesToString(a):e.bytesToHex(a)}})();var Ee=P.exports;const Be=de(Ee),J=["avatar_url","email","name"],$e=[...J,"identifier_hash"],k=()=>{const e="cw_user_",{websiteToken:o}=window.$chatwoot;return`${e}${o}`},_e=({identifier:e="",user:o})=>`${$e.reduce((c,w)=>`${c}${w}${o[w]||""}`,"")}identifier${e}`,Te=(...e)=>Be(_e(...e)),Me=e=>J.reduce((o,t)=>o||!!e[t],!1),U=(e,o,{expires:t=365,baseDomain:c=void 0}={})=>{const w={expires:t,sameSite:"Lax",domain:c};typeof o=="object"&&(o=JSON.stringify(o)),x.set(e,o,w)},V=(e,o="")=>U("cw_conversation",e,{baseDomain:o}),Fe=e=>{const o=re(new Date,1);U("cw_snooze_campaigns_till",Number(o),{expires:o,baseDomain:e})},u={getUrl({baseUrl:e,websiteToken:o}){return`${e}/widget?website_token=${o}`},createFrame:({baseUrl:e,websiteToken:o})=>{if(u.getAppFrame())return;ce();const t=document.createElement("iframe"),c=x.get("cw_conversation");let w=u.getUrl({baseUrl:e,websiteToken:o});c&&(w=`${w}&cw_conversation=${c}`),t.src=w,t.allow="camera;microphone;fullscreen;display-capture;picture-in-picture;clipboard-write;",t.id="chatwoot_live_chat_widget",t.style.visibility="hidden";let l=`woot-widget-holder woot--hide woot-elements--${window.$chatwoot.position}`;window.$chatwoot.hideMessageBubble&&(l+=" woot-widget--without-bubble"),O(window.$chatwoot.widgetStyle)&&(l+=" woot-widget-holder--flat"),y(v,l),v.id="cw-widget-holder",v.appendChild(t),q.appendChild(v),u.initPostMessageCommunication(),u.initWindowSizeListener(),u.preventDefaultScroll()},getAppFrame:()=>document.getElementById("chatwoot_live_chat_widget"),getBubbleHolder:()=>document.getElementsByClassName("woot--bubble-holder"),sendMessage:(e,o)=>{u.getAppFrame().contentWindow.postMessage(`chatwoot-widget:${JSON.stringify({event:e,...o})}`,"*")},initPostMessageCommunication:()=>{window.onmessage=e=>{if(typeof e.data!="string"||e.data.indexOf("chatwoot-widget:")!==0)return;const o=JSON.parse(e.data.replace("chatwoot-widget:",""));typeof u.events[o.event]=="function"&&u.events[o.event](o)}},initWindowSizeListener:()=>{window.addEventListener("resize",()=>u.toggleCloseButton())},preventDefaultScroll:()=>{v.addEventListener("wheel",e=>{const o=e.deltaY,t=v.scrollHeight,c=v.offsetHeight,w=v.scrollTop;(w===0&&o<0||c+w===t&&o>0)&&e.preventDefault()})},setFrameHeightToFitContent:(e,o)=>{const t=u.getAppFrame(),c=o?`${e}px`:"100%";t&&t.setAttribute("style",`height: ${c} !important`)},setupAudioListeners:()=>{const{baseUrl:e=""}=window.$chatwoot;te(e,{type:"widget",alertTone:"ding"}).then(()=>D.forEach(o=>{document.removeEventListener(o,u.setupAudioListeners,!1)}))},events:{loaded:e=>{V(e.config.authToken,window.$chatwoot.baseDomain),window.$chatwoot.hasLoaded=!0;const o=x.get("cw_snooze_campaigns_till");u.sendMessage("config-set",{locale:window.$chatwoot.locale,position:window.$chatwoot.position,hideMessageBubble:window.$chatwoot.hideMessageBubble,showPopoutButton:window.$chatwoot.showPopoutButton,widgetStyle:window.$chatwoot.widgetStyle,darkMode:window.$chatwoot.darkMode,showUnreadMessagesDialog:window.$chatwoot.showUnreadMessagesDialog,campaignsSnoozedTill:o}),u.onLoad({widgetColor:e.config.channelConfig.widgetColor}),u.toggleCloseButton(),window.$chatwoot.user&&u.sendMessage("set-user",window.$chatwoot.user),window.playAudioAlert=()=>{},D.forEach(t=>{document.addEventListener(t,u.setupAudioListeners,!1)}),window.$chatwoot.resetTriggered||M({eventName:se})},error:({errorType:e,data:o})=>{M({eventName:ae,data:o}),e===ne&&x.remove(k())},onEvent({eventIdentifier:e,data:o}){M({eventName:e,data:o})},setBubbleLabel(e){he(window.$chatwoot.launcherTitle||e.label)},setAuthCookie({data:{widgetAuthToken:e}}){V(e,window.$chatwoot.baseDomain)},setCampaignReadOn(){Fe(window.$chatwoot.baseDomain)},toggleBubble:e=>{let o={};e==="open"?o.toggleValue=!0:e==="close"&&(o.toggleValue=!1),S(o)},popoutChatWindow:({baseUrl:e,websiteToken:o,locale:t})=>{const c=x.get("cw_conversation");window.$chatwoot.toggle("close"),ie(e,o,t,c)},closeWindow:()=>{S({toggleValue:!1}),W()},onBubbleToggle:e=>{u.sendMessage("toggle-open",{isOpen:e}),e&&u.pushEvent("webwidget.triggered")},onLocationChange:({referrerURL:e,referrerHost:o})=>{u.sendMessage("change-url",{referrerURL:e,referrerHost:o})},updateIframeHeight:e=>{const{extraHeight:o=0,isFixedHeight:t}=e;u.setFrameHeightToFitContent(o,t)},setUnreadMode:()=>{ve(),S({toggleValue:!0})},resetUnreadMode:()=>W(),handleNotificationDot:e=>{if(window.$chatwoot.hideMessageBubble)return;const o=document.querySelector(".woot-widget-bubble");e.unreadMessageCount>0&&!o.classList.contains("unread-notification")?y(o,"unread-notification"):e.unreadMessageCount===0&&B(o,"unread-notification")},closeChat:()=>{S({toggleValue:!1})},playAudio:()=>{window.playAudioAlert()}},pushEvent:e=>{u.sendMessage("push-event",{eventName:e})},onLoad:({widgetColor:e})=>{const o=u.getAppFrame();if(o.style.visibility="",o.setAttribute("id","chatwoot_live_chat_widget"),u.getBubbleHolder().length)return;pe(window.$chatwoot.hideMessageBubble),ue();let t="woot-widget-bubble",c=`woot-elements--${window.$chatwoot.position} woot-widget-bubble woot--close woot--hide`;O(window.$chatwoot.widgetStyle)&&(t+=" woot-widget-bubble--flat",c+=" woot-widget-bubble--flat"),oe(e)&&(t+=" woot-widget-bubble-color--lighter",c+=" woot-widget-bubble-color--lighter");const w=me({className:t,path:be,target:L});y(E,c),w.style.background=e,E.style.background=e,C.appendChild(w),C.appendChild(E),fe()},toggleCloseButton:()=>{let e=!1;window.matchMedia("(max-width: 668px)").matches&&(e=!0),u.sendMessage("toggle-close-button",{isMobile:e})}},Le=({baseUrl:e,websiteToken:o})=>{if(window.$chatwoot)return;window.Turbo&&document.addEventListener("turbo:before-render",l=>_(l.detail.newBody)),window.Turbolinks&&document.addEventListener("turbolinks:before-render",l=>{_(l.data.newBody)}),document.addEventListener("astro:before-swap",l=>_(l.newDocument.body));const t=window.chatwootSettings||{};let c=t.locale,w=t.baseDomain;t.useBrowserLanguage&&(c=window.navigator.language.replace("-","_")),window.$chatwoot={baseUrl:e,baseDomain:w,hasLoaded:!1,hideMessageBubble:t.hideMessageBubble||!1,isOpen:!1,position:t.position==="left"?"left":"right",websiteToken:o,locale:c,useBrowserLanguage:t.useBrowserLanguage||!1,type:X(t.type),launcherTitle:t.launcherTitle||"",showPopoutButton:t.showPopoutButton||!1,showUnreadMessagesDialog:t.showUnreadMessagesDialog??!0,widgetStyle:ge(t.widgetStyle)||"standard",resetTriggered:!1,darkMode:R(t.darkMode),toggle(l){u.events.toggleBubble(l)},toggleBubbleVisibility(l){let g=document.querySelector(".woot--bubble-holder"),a=document.querySelector(".woot-widget-holder");l==="hide"?(y(a,"woot-widget--without-bubble"),y(g,"woot-hidden"),window.$chatwoot.hideMessageBubble=!0):l==="show"&&(B(g,"woot-hidden"),B(a,"woot-widget--without-bubble"),window.$chatwoot.hideMessageBubble=!1),u.sendMessage(le,{hideMessageBubble:window.$chatwoot.hideMessageBubble})},popoutChatWindow(){u.events.popoutChatWindow({baseUrl:window.$chatwoot.baseUrl,websiteToken:window.$chatwoot.websiteToken,locale:c})},setUser(l,g){if(typeof l!="string"&&typeof l!="number")throw new Error("Identifier should be a string or a number");if(!Me(g))throw new Error("User object should have one of the keys [avatar_url, email, name]");const a=k(),f=x.get(a),r=Te({identifier:l,user:g});r!==f&&(window.$chatwoot.identifier=l,window.$chatwoot.user=g,u.sendMessage("set-user",{identifier:l,user:g}),U(a,r,{baseDomain:w}))},setCustomAttributes(l={}){if(!l||!Object.keys(l).length)throw new Error("Custom attributes should have atleast one key");u.sendMessage("set-custom-attributes",{customAttributes:l})},deleteCustomAttribute(l=""){if(l)u.sendMessage("delete-custom-attribute",{customAttribute:l});else throw new Error("Custom attribute is required")},setConversationCustomAttributes(l={}){if(!l||!Object.keys(l).length)throw new Error("Custom attributes should have atleast one key");u.sendMessage("set-conversation-custom-attributes",{customAttributes:l})},deleteConversationCustomAttribute(l=""){if(l)u.sendMessage("delete-conversation-custom-attribute",{customAttribute:l});else throw new Error("Custom attribute is required")},setLabel(l=""){u.sendMessage("set-label",{label:l})},removeLabel(l=""){u.sendMessage("remove-label",{label:l})},setLocale(l="en"){u.sendMessage("set-locale",{locale:l})},setColorScheme(l="light"){u.sendMessage("set-color-scheme",{darkMode:R(l)})},reset(){window.$chatwoot.isOpen&&u.events.toggleBubble(),x.remove("cw_conversation"),x.remove(k());const l=u.getAppFrame();l.src=u.getUrl({baseUrl:window.$chatwoot.baseUrl,websiteToken:window.$chatwoot.websiteToken}),window.$chatwoot.resetTriggered=!0}},u.createFrame({baseUrl:e,websiteToken:o})};window.chatwootSDK={run:Le};
