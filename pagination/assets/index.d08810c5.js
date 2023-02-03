(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const E={},de=(e,t)=>e===t,ge=Symbol("solid-track"),K={equals:de};let pe=ie;const $=1,F=2,Z={owned:null,cleanups:null,context:null,owner:null};var y=null;let L=null,g=null,m=null,N=null,H=0;function I(e,t){const n=g,s=y,i=e.length===0,l=i?Z:{owned:null,cleanups:null,context:null,owner:t||s},r=i?e:()=>e(()=>D(()=>v(l)));y=l,g=null;try{return M(r,!0)}finally{g=n,y=s}}function z(e,t){t=t?Object.assign({},K,t):K;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),te(n,i));return[ee.bind(n),s]}function k(e,t,n){const s=ne(e,t,!1,$);q(s)}function S(e,t,n){n=n?Object.assign({},K,n):K;const s=ne(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,q(s),ee.bind(s)}function D(e){const t=g;g=null;try{return e()}finally{g=t}}function ye(e){return y===null||(y.cleanups===null?y.cleanups=[e]:y.cleanups.push(e)),e}function ee(){const e=L;if(this.sources&&(this.state||e))if(this.state===$||e)q(this);else{const t=m;m=null,M(()=>B(this),!1),m=t}if(g){const t=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(t)):(g.sources=[this],g.sourceSlots=[t]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function te(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&M(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],r=L&&L.running;r&&L.disposed.has(l),(r&&!l.tState||!r&&!l.state)&&(l.pure?m.push(l):N.push(l),l.observers&&le(l)),r||(l.state=$)}if(m.length>1e6)throw m=[],new Error},!1)),t}function q(e){if(!e.fn)return;v(e);const t=y,n=g,s=H;g=y=e,me(e,e.value,s),g=n,y=t}function me(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=$,e.owned&&e.owned.forEach(v),e.owned=null),oe(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?te(e,s):e.value=s,e.updatedAt=n)}function ne(e,t,n,s=$,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:y,context:null,pure:n};return y===null||y!==Z&&(y.owned?y.owned.push(l):y.owned=[l]),l}function se(e){const t=L;if(e.state===0||t)return;if(e.state===F||t)return B(e);if(e.suspense&&D(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<H);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===$||t)q(e);else if(e.state===F||t){const i=m;m=null,M(()=>B(e,n[0]),!1),m=i}}function M(e,t){if(m)return e();let n=!1;t||(m=[]),N?n=!0:N=[],H++;try{const s=e();return be(n),s}catch(s){m||(N=null),oe(s)}}function be(e){if(m&&(ie(m),m=null),e)return;const t=N;N=null,t.length&&M(()=>pe(t),!1)}function ie(e){for(let t=0;t<e.length;t++)se(e[t])}function B(e,t){const n=L;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===$||n?i!==t&&se(i):(i.state===F||n)&&B(i,t))}}function le(e){const t=L;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=F,s.pure?m.push(s):N.push(s),s.observers&&le(s))}}function v(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),r=n.observerSlots.pop();s<i.length&&(l.sourceSlots[r]=s,i[s]=l,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)v(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function we(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function oe(e){throw e=we(e),e}const xe=Symbol("fallback");function G(e){for(let t=0;t<e.length;t++)e[t]()}function Ae(e,t,n={}){let s=[],i=[],l=[],r=0,o=t.length>1?[]:null;return ye(()=>G(l)),()=>{let u=e()||[],c,f;return u[ge],D(()=>{let h=u.length,w,A,P,j,a,b,d,C,O;if(h===0)r!==0&&(G(l),l=[],s=[],i=[],r=0,o&&(o=[])),n.fallback&&(s=[xe],i[0]=I(he=>(l[0]=he,n.fallback())),r=1);else if(r===0){for(i=new Array(h),f=0;f<h;f++)s[f]=u[f],i[f]=I(p);r=h}else{for(P=new Array(h),j=new Array(h),o&&(a=new Array(h)),b=0,d=Math.min(r,h);b<d&&s[b]===u[b];b++);for(d=r-1,C=h-1;d>=b&&C>=b&&s[d]===u[C];d--,C--)P[C]=i[d],j[C]=l[d],o&&(a[C]=o[d]);for(w=new Map,A=new Array(C+1),f=C;f>=b;f--)O=u[f],c=w.get(O),A[f]=c===void 0?-1:c,w.set(O,f);for(c=b;c<=d;c++)O=s[c],f=w.get(O),f!==void 0&&f!==-1?(P[f]=i[c],j[f]=l[c],o&&(a[f]=o[c]),f=A[f],w.set(O,f)):l[c]();for(f=b;f<h;f++)f in P?(i[f]=P[f],l[f]=j[f],o&&(o[f]=a[f],o[f](f))):i[f]=I(p);i=i.slice(0,r=h),s=u.slice(0)}return i});function p(h){if(l[f]=h,o){const[w,A]=z(f);return o[f]=A,t(u[f],w)}return t(u[f])}}}function re(e,t){return D(()=>e(t||{}))}function Ce(e){const t="fallback"in e&&{fallback:()=>e.fallback};return S(Ae(()=>e.each,e.children,t||void 0))}const Se=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Ee=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Se]),Pe=new Set(["innerHTML","textContent","innerText","children"]),Le=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),X=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),Ne=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),$e={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Oe(e,t,n){let s=n.length,i=t.length,l=s,r=0,o=0,u=t[i-1].nextSibling,c=null;for(;r<i||o<l;){if(t[r]===n[o]){r++,o++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===r){const f=l<s?o?n[o-1].nextSibling:n[l-o]:u;for(;o<l;)e.insertBefore(n[o++],f)}else if(l===o)for(;r<i;)(!c||!c.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[l-1]&&n[o]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--l],f),t[i]=n[l]}else{if(!c){c=new Map;let p=o;for(;p<l;)c.set(n[p],p++)}const f=c.get(t[r]);if(f!=null)if(o<f&&f<l){let p=r,h=1,w;for(;++p<i&&p<l&&!((w=c.get(t[p]))==null||w!==f+h);)h++;if(h>f-o){const A=t[r];for(;o<f;)e.insertBefore(n[o++],A)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const Q="_$DX_DELEGATE";function Te(e,t,n,s={}){let i;return I(l=>{i=l,t===document?e():R(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function fe(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function ce(e,t=window.document){const n=t[Q]||(t[Q]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,Be))}}function ue(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function ke(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function _e(e,t){t==null?e.removeAttribute("class"):e.className=t}function je(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n)}function Me(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let l,r;for(l=0,r=i.length;l<r;l++){const o=i[l];!o||o==="undefined"||t[o]||(W(e,o,!1),delete n[o])}for(l=0,r=s.length;l<r;l++){const o=s[l],u=!!t[o];!o||o==="undefined"||n[o]===u||!u||(W(e,o,!0),n[o]=u)}return n}function Ue(e,t,n){if(!t)return n?ue(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function Ie(e,t={},n,s){const i={};return s||k(()=>i.children=_(e,t.children,i.children)),k(()=>t.ref&&t.ref(e)),k(()=>Ke(e,t,n,!0,i,!0)),i}function R(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return _(e,t,s,n);k(i=>_(e,t(),i,n),s)}function Ke(e,t,n,s,i={},l=!1){t||(t={});for(const r in i)if(!(r in t)){if(r==="children")continue;i[r]=J(e,r,null,i[r],n,l)}for(const r in t){if(r==="children"){s||_(e,t.children);continue}const o=t[r];i[r]=J(e,r,o,i[r],n,l)}}function Fe(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function W(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],n)}function J(e,t,n,s,i,l){let r,o,u;if(t==="style")return Ue(e,n,s);if(t==="classList")return Me(e,n,s);if(n===s)return s;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const c=t.slice(3);s&&e.removeEventListener(c,s),n&&e.addEventListener(c,n)}else if(t.slice(0,10)==="oncapture:"){const c=t.slice(10);s&&e.removeEventListener(c,s,!0),n&&e.addEventListener(c,n,!0)}else if(t.slice(0,2)==="on"){const c=t.slice(2).toLowerCase(),f=Ne.has(c);if(!f&&s){const p=Array.isArray(s)?s[0]:s;e.removeEventListener(c,p)}(f||n)&&(je(e,c,n,f),f&&ce([c]))}else if((u=Pe.has(t))||!i&&(X[t]||(o=Ee.has(t)))||(r=e.nodeName.includes("-")))t==="class"||t==="className"?_e(e,n):r&&!o&&!u?e[Fe(t)]=n:e[X[t]||t]=n;else{const c=i&&t.indexOf(":")>-1&&$e[t.split(":")[0]];c?ke(e,c,t,n):ue(e,Le[t]||t,n)}return n}function Be(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),E.registry&&!E.done&&(E.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>{for(;s&&s.nodeType!==8&&s.nodeValue!=="pl-"+e;){let i=s.nextSibling;s.remove(),s=i}s&&s.remove()}));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function _(e,t,n,s,i){for(E.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(E.context)return n;if(l==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=T(e,n,s,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(E.context)return n;n=T(e,n,s)}else{if(l==="function")return k(()=>{let o=t();for(;typeof o=="function";)o=o();n=_(e,o,n,s)}),()=>n;if(Array.isArray(t)){const o=[],u=n&&Array.isArray(n);if(V(o,t,n,i))return k(()=>n=_(e,o,n,s,!0)),()=>n;if(E.context){if(!o.length)return n;for(let c=0;c<o.length;c++)if(o[c].parentNode)return n=o}if(o.length===0){if(n=T(e,n,s),r)return n}else u?n.length===0?Y(e,o,s):Oe(e,n,o):(n&&T(e),Y(e,o));n=o}else if(t instanceof Node){if(E.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=T(e,n,s,t);T(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function V(e,t,n,s){let i=!1;for(let l=0,r=t.length;l<r;l++){let o=t[l],u=n&&n[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))i=V(e,o,u)||i;else if(typeof o=="function")if(s){for(;typeof o=="function";)o=o();i=V(e,Array.isArray(o)?o:[o],Array.isArray(u)?u:[u])||i}else e.push(o),i=!0;else{const c=String(o);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return i}function Y(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function T(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(i!==o){const u=o.parentNode===e;!l&&!r?u?e.replaceChild(i,o):e.insertBefore(i,n):u&&o.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}var x=()=>{},De=e=>typeof e=="function"&&!e.length?e():e;const ae={pages:1,maxPages:10,showDisabled:!0,showFirst:!0,showPrev:!0,showNext:!0,showLast:!0,firstContent:"|<",prevContent:"<",nextContent:">",lastContent:">|"},U=(e,t,n,s)=>typeof t=="boolean"?t:typeof t=="function"?t(n,s):ae[e],qe=e=>{const t=S(()=>Object.assign({},ae,De(e))),[n,s]=z(t().initialPage||1),i=a=>(typeof a=="function"&&(a=a(n())),a>=1&&a<=t().pages?s(a):n()),l=(a,b)=>({ArrowLeft:()=>i(d=>d-1),ArrowRight:()=>i(d=>d+1),Home:()=>i(1),End:()=>i(t().pages),Space:()=>i(a),Return:()=>i(a)}[b.key]||x)(),r=[...Array(t().pages)].map((a,b)=>(d=>Object.defineProperties({children:d.toString(),onClick:[i,d],onKeyUp:[l,d]},{"aria-current":{get:()=>n()===d?"true":void 0,set:x,enumerable:!0},page:{value:d,enumerable:!1}}))(b+1)),o=Object.defineProperties({onClick:[i,1],onKeyUp:[l,1]},{disabled:{get:()=>n()<=1,set:x,enumerable:!0},children:{get:()=>t().firstContent,set:x,enumerable:!0},page:{value:1,enumerable:!1}}),u=Object.defineProperties({onClick:()=>i(a=>a>1?a-1:a),onKeyUp:a=>l(n()-1,a)},{disabled:{get:()=>n()<=1,set:x,enumerable:!0},children:{get:()=>t().prevContent,set:x,enumerable:!0},page:{get:()=>Math.min(1,n()-1),enumerable:!1}}),c=Object.defineProperties({onClick:()=>i(a=>a<t().pages?a+1:a),onKeyUp:a=>l(n()-1,a)},{disabled:{get:()=>n()>=t().pages,set:x,enumerable:!0},children:{get:()=>t().nextContent,set:x,enumerable:!0},page:{get:()=>Math.max(t().pages,n()+1),enumerable:!1}}),f=Object.defineProperties({onClick:()=>i(t().pages),onKeyUp:a=>l(t().pages,a)},{disabled:{get:()=>n()>=t().pages,set:x,enumerable:!0},children:{get:()=>t().lastContent,set:x,enumerable:!0},page:{get:()=>t().pages,enumerable:!1}}),p=S(()=>Math.min(t().pages-t().maxPages,Math.max(1,n()-(t().maxPages>>1))-1)),h=S(()=>U("showFirst",t().showFirst,n(),t().pages)),w=S(()=>U("showPrev",t().showPrev,n(),t().pages)),A=S(()=>U("showNext",t().showNext,n(),t().pages)),P=S(()=>U("showLast",t().showLast,n(),t().pages));return[S(()=>{const a=[];return h()&&a.push(o),w()&&a.push(u),a.push(...r.slice(p(),p()+t().maxPages)),A()&&a.push(c),P()&&a.push(f),a}),n,i]},ve=fe('<div class="p-24 box-border w-full min-h-screen flex flex-col justify-center items-center space-y-4 bg-gray-800 text-white"><div class="wrapper-v"><h4>Pagination component</h4><p>Current page: <!> / 100</p><nav class="flex flex-row"></nav><button>jump to random page</button></div></div>'),Re=fe("<button></button>"),Ve=()=>{const[e,t,n]=qe({pages:100});return(()=>{const s=ve.cloneNode(!0),i=s.firstChild,l=i.firstChild,r=l.nextSibling,o=r.firstChild,u=o.nextSibling;u.nextSibling;const c=r.nextSibling,f=c.nextSibling;return R(r,t,u),R(c,re(Ce,{get each(){return e()},children:p=>(()=>{const h=Re.cloneNode(!0);return Ie(h,p,!1,!1),h})()})),f.$$click=()=>n(Math.round(Math.random()*100+1)),s})()};Te(()=>re(Ve,{}),document.getElementById("root"));ce(["click"]);
