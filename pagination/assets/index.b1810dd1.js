(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const P={},Ee=(e,t)=>e===t,$e=Symbol("solid-track"),G={equals:Ee};let Le=me;const v=1,X=2,de={owned:null,cleanups:null,context:null,owner:null},ee={};var S=null;let M=null,p=null,C=null,I=null,se=0;function R(e,t){const n=p,s=S,i=e.length===0,l=i?de:{owned:null,cleanups:null,context:null,owner:t||s},r=i?e:()=>e(()=>j(()=>W(l)));S=l,p=null;try{return T(r,!0)}finally{p=n,S=s}}function _(e,t){t=t?Object.assign({},G,t):G;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),pe(n,i));return[ge.bind(n),s]}function te(e,t,n){const s=ie(e,t,!0,v);F(s)}function K(e,t,n){const s=ie(e,t,!1,v);F(s)}function L(e,t,n){n=n?Object.assign({},G,n):G;const s=ie(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,F(s),ge.bind(s)}function Pe(e,t,n){let s,i,l;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,i=e,l=t||{}):(s=e,i=t,l=n||{});let r=null,o=ee,a=null,f=!1,c="initialValue"in l,y=typeof s=="function"&&L(s);const d=new Set,[m,E]=(l.storage||_)(l.initialValue),[$,N]=_(void 0),[k,u]=_(void 0,{equals:!1}),[h,b]=_(c?"ready":"unresolved");if(P.context){a=`${P.context.id}${P.context.count++}`;let g;l.ssrLoadFrom==="initial"?o=l.initialValue:P.load&&(g=P.load(a))&&(o=g[0])}function w(g,x,A,D){return r===g&&(r=null,c=!0,(g===o||x===o)&&l.onHydrated&&queueMicrotask(()=>l.onHydrated(D,{value:x})),o=ee,Y(x,A)),x}function Y(g,x){T(()=>{x||E(()=>g),b(x?"errored":"ready"),N(x);for(const A of d.keys())A.decrement();d.clear()},!1)}function Z(){const g=ke,x=m(),A=$();if(A&&!r)throw A;return p&&!p.user&&g&&te(()=>{k(),r&&(g.resolved||d.has(g)||(g.increment(),d.add(g)))}),x}function z(g=!0){if(g!==!1&&f)return;f=!1;const x=y?y():s;if(x==null||x===!1){w(r,j(m));return}const A=o!==ee?o:j(()=>i(x,{value:m(),refetching:g}));return typeof A!="object"||!(A&&"then"in A)?(w(r,A,void 0,x),A):(r=A,f=!0,queueMicrotask(()=>f=!1),T(()=>{b(c?"refreshing":"pending"),u()},!1),A.then(D=>w(A,D,void 0,x),D=>w(A,void 0,we(D),x)))}return Object.defineProperties(Z,{state:{get:()=>h()},error:{get:()=>$()},loading:{get(){const g=h();return g==="pending"||g==="refreshing"}},latest:{get(){if(!c)return Z();const g=$();if(g&&!r)throw g;return m()}}}),y?te(()=>z(!1)):z(!1),[Z,{refetch:z,mutate:E}]}function Ne(e){return T(e,!1)}function j(e){const t=p;p=null;try{return e()}finally{p=t}}function he(e){return S===null||(S.cleanups===null?S.cleanups=[e]:S.cleanups.push(e)),e}let ke;function ge(){const e=M;if(this.sources&&(this.state||e))if(this.state===v||e)F(this);else{const t=C;C=null,T(()=>Q(this),!1),C=t}if(p){const t=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(t)):(p.sources=[this],p.sourceSlots=[t]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function pe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&T(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],r=M&&M.running;r&&M.disposed.has(l),(r&&!l.tState||!r&&!l.state)&&(l.pure?C.push(l):I.push(l),l.observers&&be(l)),r||(l.state=v)}if(C.length>1e6)throw C=[],new Error},!1)),t}function F(e){if(!e.fn)return;W(e);const t=S,n=p,s=se;p=S=e,Oe(e,e.value,s),p=n,S=t}function Oe(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=v,e.owned&&e.owned.forEach(W),e.owned=null),xe(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?pe(e,s):e.value=s,e.updatedAt=n)}function ie(e,t,n,s=v,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:S,context:null,pure:n};return S===null||S!==de&&(S.owned?S.owned.push(l):S.owned=[l]),l}function ye(e){const t=M;if(e.state===0||t)return;if(e.state===X||t)return Q(e);if(e.suspense&&j(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<se);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===v||t)F(e);else if(e.state===X||t){const i=C;C=null,T(()=>Q(e,n[0]),!1),C=i}}function T(e,t){if(C)return e();let n=!1;t||(C=[]),I?n=!0:I=[],se++;try{const s=e();return _e(n),s}catch(s){C||(I=null),xe(s)}}function _e(e){if(C&&(me(C),C=null),e)return;const t=I;I=null,t.length&&T(()=>Le(t),!1)}function me(e){for(let t=0;t<e.length;t++)ye(e[t])}function Q(e,t){const n=M;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===v||n?i!==t&&ye(i):(i.state===X||n)&&Q(i,t))}}function be(e){const t=M;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=X,s.pure?C.push(s):I.push(s),s.observers&&be(s))}}function W(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),r=n.observerSlots.pop();s<i.length&&(l.sourceSlots[r]=s,i[s]=l,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)W(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function we(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function xe(e){throw e=we(e),e}const je=Symbol("fallback");function le(e){for(let t=0;t<e.length;t++)e[t]()}function Te(e,t,n={}){let s=[],i=[],l=[],r=0,o=t.length>1?[]:null;return he(()=>le(l)),()=>{let a=e()||[],f,c;return a[$e],j(()=>{let d=a.length,m,E,$,N,k,u,h,b,w;if(d===0)r!==0&&(le(l),l=[],s=[],i=[],r=0,o&&(o=[])),n.fallback&&(s=[je],i[0]=R(Y=>(l[0]=Y,n.fallback())),r=1);else if(r===0){for(i=new Array(d),c=0;c<d;c++)s[c]=a[c],i[c]=R(y);r=d}else{for($=new Array(d),N=new Array(d),o&&(k=new Array(d)),u=0,h=Math.min(r,d);u<h&&s[u]===a[u];u++);for(h=r-1,b=d-1;h>=u&&b>=u&&s[h]===a[b];h--,b--)$[b]=i[h],N[b]=l[h],o&&(k[b]=o[h]);for(m=new Map,E=new Array(b+1),c=b;c>=u;c--)w=a[c],f=m.get(w),E[c]=f===void 0?-1:f,m.set(w,c);for(f=u;f<=h;f++)w=s[f],c=m.get(w),c!==void 0&&c!==-1?($[c]=i[f],N[c]=l[f],o&&(k[c]=o[f]),c=E[c],m.set(w,c)):l[f]();for(c=u;c<d;c++)c in $?(i[c]=$[c],l[c]=N[c],o&&(o[c]=k[c],o[c](c))):i[c]=R(y);i=i.slice(0,r=d),s=a.slice(0)}return i});function y(d){if(l[c]=d,o){const[m,E]=_(c);return o[c]=E,t(a[c],m)}return t(a[c])}}}function H(e,t){return j(()=>e(t||{}))}function oe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return L(Te(()=>e.each,e.children,t||void 0))}function ve(e){let t=!1;const n=e.keyed,s=L(()=>e.when,void 0,{equals:(i,l)=>t?i===l:!i==!l});return L(()=>{const i=s();if(i){const l=e.children,r=typeof l=="function"&&l.length>0;return t=n||r,r?j(()=>l(i)):l}return e.fallback},void 0,void 0)}const Me=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Ie=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Me]),Ue=new Set(["innerHTML","textContent","innerText","children"]),qe=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),re=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),Ke=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Be={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function De(e,t,n){let s=n.length,i=t.length,l=s,r=0,o=0,a=t[i-1].nextSibling,f=null;for(;r<i||o<l;){if(t[r]===n[o]){r++,o++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===r){const c=l<s?o?n[o-1].nextSibling:n[l-o]:a;for(;o<l;)e.insertBefore(n[o++],c)}else if(l===o)for(;r<i;)(!f||!f.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[l-1]&&n[o]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--l],c),t[i]=n[l]}else{if(!f){f=new Map;let y=o;for(;y<l;)f.set(n[y],y++)}const c=f.get(t[r]);if(c!=null)if(o<c&&c<l){let y=r,d=1,m;for(;++y<i&&y<l&&!((m=f.get(t[y]))==null||m!==c+d);)d++;if(d>c-o){const E=t[r];for(;o<c;)e.insertBefore(n[o++],E)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const ce="_$DX_DELEGATE";function Fe(e,t,n,s={}){let i;return R(l=>{i=l,t===document?e():q(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function J(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Ae(e,t=window.document){const n=t[ce]||(t[ce]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,Ze))}}function Se(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Ve(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function Re(e,t){t==null?e.removeAttribute("class"):e.className=t}function He(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n)}function Ge(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let l,r;for(l=0,r=i.length;l<r;l++){const o=i[l];!o||o==="undefined"||t[o]||(fe(e,o,!1),delete n[o])}for(l=0,r=s.length;l<r;l++){const o=s[l],a=!!t[o];!o||o==="undefined"||n[o]===a||!a||(fe(e,o,!0),n[o]=a)}return n}function Xe(e,t,n){if(!t)return n?Se(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function Qe(e,t={},n,s){const i={};return s||K(()=>i.children=B(e,t.children,i.children)),K(()=>t.ref&&t.ref(e)),K(()=>Je(e,t,n,!0,i,!0)),i}function We(e,t,n){return j(()=>e(t,n))}function q(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return B(e,t,s,n);K(i=>B(e,t(),i,n),s)}function Je(e,t,n,s,i={},l=!1){t||(t={});for(const r in i)if(!(r in t)){if(r==="children")continue;i[r]=ue(e,r,null,i[r],n,l)}for(const r in t){if(r==="children"){s||B(e,t.children);continue}const o=t[r];i[r]=ue(e,r,o,i[r],n,l)}}function Ye(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function fe(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],n)}function ue(e,t,n,s,i,l){let r,o,a;if(t==="style")return Xe(e,n,s);if(t==="classList")return Ge(e,n,s);if(n===s)return s;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const f=t.slice(3);s&&e.removeEventListener(f,s),n&&e.addEventListener(f,n)}else if(t.slice(0,10)==="oncapture:"){const f=t.slice(10);s&&e.removeEventListener(f,s,!0),n&&e.addEventListener(f,n,!0)}else if(t.slice(0,2)==="on"){const f=t.slice(2).toLowerCase(),c=Ke.has(f);if(!c&&s){const y=Array.isArray(s)?s[0]:s;e.removeEventListener(f,y)}(c||n)&&(He(e,f,n,c),c&&Ae([f]))}else if((a=Ue.has(t))||!i&&(re[t]||(o=Ie.has(t)))||(r=e.nodeName.includes("-")))t==="class"||t==="className"?Re(e,n):r&&!o&&!a?e[Ye(t)]=n:e[re[t]||t]=n;else{const f=i&&t.indexOf(":")>-1&&Be[t.split(":")[0]];f?Ve(e,f,t,n):Se(e,qe[t]||t,n)}return n}function Ze(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),P.registry&&!P.done&&(P.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>{for(;s&&s.nodeType!==8&&s.nodeValue!=="pl-"+e;){let i=s.nextSibling;s.remove(),s=i}s&&s.remove()}));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function B(e,t,n,s,i){for(P.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(P.context)return n;if(l==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=U(e,n,s,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(P.context)return n;n=U(e,n,s)}else{if(l==="function")return K(()=>{let o=t();for(;typeof o=="function";)o=o();n=B(e,o,n,s)}),()=>n;if(Array.isArray(t)){const o=[],a=n&&Array.isArray(n);if(ne(o,t,n,i))return K(()=>n=B(e,o,n,s,!0)),()=>n;if(P.context){if(!o.length)return n;for(let f=0;f<o.length;f++)if(o[f].parentNode)return n=o}if(o.length===0){if(n=U(e,n,s),r)return n}else a?n.length===0?ae(e,o,s):De(e,n,o):(n&&U(e),ae(e,o));n=o}else if(t instanceof Node){if(P.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=U(e,n,s,t);U(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ne(e,t,n,s){let i=!1;for(let l=0,r=t.length;l<r;l++){let o=t[l],a=n&&n[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))i=ne(e,o,a)||i;else if(typeof o=="function")if(s){for(;typeof o=="function";)o=o();i=ne(e,Array.isArray(o)?o:[o],Array.isArray(a)?a:[a])||i}else e.push(o),i=!0;else{const f=String(o);a&&a.nodeType===3&&a.data===f?e.push(a):e.push(document.createTextNode(f))}}return i}function ae(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function U(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(i!==o){const a=o.parentNode===e;!l&&!r?a?e.replaceChild(i,o):e.insertBefore(i,n):a&&o.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}var O=()=>{},ze=e=>typeof e=="function"&&!e.length?e():e;function et(e,t,n){const s=new IntersectionObserver(t,n),i=f=>{s.observe(f)},l=f=>s.unobserve(f),r=()=>e.forEach(i),o=()=>s.disconnect(),a=()=>s.takeRecords().forEach(f=>l(f.target));return r(),he(o),{add:i,remove:l,start:r,stop:o,reset:a,instance:s}}const Ce={pages:1,maxPages:10,showDisabled:!0,showFirst:!0,showPrev:!0,showNext:!0,showLast:!0,firstContent:"|<",prevContent:"<",nextContent:">",lastContent:">|"},V=(e,t,n,s)=>typeof t=="boolean"?t:typeof t=="function"?t(n,s):Ce[e],tt=e=>{const t=L(()=>Object.assign({},Ce,ze(e))),[n,s]=_(t().initialPage||1),i=u=>(typeof u=="function"&&(u=u(n())),u>=1&&u<=t().pages?s(u):n()),l=(u,h)=>({ArrowLeft:()=>i(b=>b-1),ArrowRight:()=>i(b=>b+1),Home:()=>i(1),End:()=>i(t().pages),Space:()=>i(u),Return:()=>i(u)}[h.key]||O)(),r=L(()=>Math.min(t().maxPages,t().pages)),o=L(u=>[...Array(t().pages)].map((h,b)=>u[b]||(w=>Object.defineProperties({children:w.toString(),onClick:[i,w],onKeyUp:[l,w]},{"aria-current":{get:()=>n()===w?"true":void 0,set:O,enumerable:!0},page:{value:w,enumerable:!1}}))(b+1)),[]),a=Object.defineProperties({onClick:[i,1],onKeyUp:[l,1]},{disabled:{get:()=>n()<=1,set:O,enumerable:!0},children:{get:()=>t().firstContent,set:O,enumerable:!0},page:{value:1,enumerable:!1}}),f=Object.defineProperties({onClick:()=>i(u=>u>1?u-1:u),onKeyUp:u=>l(n()-1,u)},{disabled:{get:()=>n()<=1,set:O,enumerable:!0},children:{get:()=>t().prevContent,set:O,enumerable:!0},page:{get:()=>Math.min(1,n()-1),enumerable:!1}}),c=Object.defineProperties({onClick:()=>i(u=>u<t().pages?u+1:u),onKeyUp:u=>l(n()-1,u)},{disabled:{get:()=>n()>=t().pages,set:O,enumerable:!0},children:{get:()=>t().nextContent,set:O,enumerable:!0},page:{get:()=>Math.max(t().pages,n()+1),enumerable:!1}}),y=Object.defineProperties({onClick:()=>i(t().pages),onKeyUp:u=>l(t().pages,u)},{disabled:{get:()=>n()>=t().pages,set:O,enumerable:!0},children:{get:()=>t().lastContent,set:O,enumerable:!0},page:{get:()=>t().pages,enumerable:!1}}),d=L(()=>Math.min(t().pages-r(),Math.max(1,n()-(r()>>1))-1)),m=L(()=>V("showFirst",t().showFirst,n(),t().pages)),E=L(()=>V("showPrev",t().showPrev,n(),t().pages)),$=L(()=>V("showNext",t().showNext,n(),t().pages)),N=L(()=>V("showLast",t().showLast,n(),t().pages));return[L(()=>{const u=[];return m()&&u.push(a),E()&&u.push(f),u.push(...o().slice(d(),d()+r())),$()&&u.push(c),N()&&u.push(y),u}),n,i]};function nt(e){const[t,n]=_([]),[s,i]=_(0),[l,r]=_(!1),{add:o}=et([],f=>{f.length>0&&f[0].isIntersecting&&!l()&&!a.loading&&i(c=>c+1)}),[a]=Pe(s,e);return te(()=>{const f=a();!f||Ne(()=>{f.length===0&&r(!0),n(c=>[...c,...f])})}),[t,o,{page:s,setPage:i,setPages:n,end:l,setEnd:r}]}const st=J("<h1>Loading...</h1>"),it=J('<div class="w-full min-h-screen flex"><div class="p-24 box-border w-1/2 flex flex-col justify-center items-center space-y-4 bg-gray-800 text-white"><div class="wrapper-v"><h4>Pagination component</h4><p>Current page: <!> / 100</p><nav class="flex flex-row"></nav><button>jump to random page</button></div></div><div class="bg-gray-800 w-1/2 text-white max-h-screen flex flex-col"><div class="h-[10%] overflow-scroll flex items-center justify-center"><h1>Infinite Scrolling:</h1></div><div class="h-[90%] overflow-scroll"></div></div></div>'),lt=J("<button></button>"),ot=J("<p></p>");async function rt(e){let t=[],n=await fetch(`https://openlibrary.org/search.json?q=hello%20world&page=${e+1}`,{method:"GET"});return n.ok&&(await n.json()).docs.forEach(i=>t.push(i.title)),t}const ct=()=>{const[e,t,n]=tt({pages:100}),[s,i,{end:l}]=nt(rt);return(()=>{const r=it.cloneNode(!0),o=r.firstChild,a=o.firstChild,f=a.firstChild,c=f.nextSibling,y=c.firstChild,d=y.nextSibling;d.nextSibling;const m=c.nextSibling,E=m.nextSibling,$=o.nextSibling,N=$.firstChild,k=N.nextSibling;return q(c,t,d),q(m,H(oe,{get each(){return e()},children:u=>(()=>{const h=lt.cloneNode(!0);return Qe(h,u,!1,!1),h})()})),E.$$click=()=>n(Math.round(Math.random()*100+1)),q(k,H(oe,{get each(){return s()},children:u=>(()=>{const h=ot.cloneNode(!0);return q(h,u),h})()}),null),q(k,H(ve,{get when(){return!l()},get children(){const u=st.cloneNode(!0);return We(i,u,()=>!0),u}}),null),r})()};Fe(()=>H(ct,{}),document.getElementById("root"));Ae(["click"]);
