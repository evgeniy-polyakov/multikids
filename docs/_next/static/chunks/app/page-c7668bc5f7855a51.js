(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6698:function(e,t,s){Promise.resolve().then(s.bind(s,912)),Promise.resolve().then(s.bind(s,1481)),Promise.resolve().then(s.bind(s,948))},948:function(e,t,s){"use strict";let n;s.d(t,{Body:function(){return ec}});var a,r,i,c,l=s(7437),o=s(8798);class u{static load(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];for(let e of t){if(this.cache[e])continue;let t=new o.Howl({src:"".concat(this.basePath,"/audio/").concat(e,".mp3")});t.load(),this.cache[e]=t}}static play(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.load(e);let s=this.cache[e];s&&(s.volume(t),s.play())}static loop(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.load(e);let s=this.cache[e];s&&(s.volume(t),s.loop(!0),s.play())}}function d(e){let{children:t,onClick:s,className:n,clickSFX:a}=e;return(0,l.jsxs)("button",{className:n,onClick:()=>{!1!==a&&u.play(null!=a?a:"clear"),null==s||s()},children:[(0,l.jsx)("span",{className:"button-bg"}),(0,l.jsx)("span",{className:"text",children:t})]})}function h(e){let{onClick:t}=e;return(0,l.jsx)("table",{className:"keyboard",children:(0,l.jsx)("tbody",{children:[[1,2,3],[4,5,6],[7,8,9],[-1,0,-2]].map((e,s)=>(0,l.jsx)("tr",{children:e.map((e,s)=>(0,l.jsx)("td",{className:"code-".concat(e),children:(0,l.jsx)(d,{onClick:()=>t(e),clickSFX:!1,children:-2===e?"V":-1===e?"X":e})},s))},s))})})}function L(e,t){let s=[];if(s.generator=e,"number"==typeof t)for(let n=0;n<t;n++)s.push(e(n,void 0));else if("object"==typeof t)for(let n of Object.getOwnPropertyNames(t))s.push(e(n,t[n]));return s}u.basePath="",u.cache={},(a=i||(i={}))[a.Delete=-1]="Delete",a[a.Enter=-2]="Enter",(r=c||(c={})).Multi="*",r.Div="/";let f=L(e=>L(t=>[e,t,e*t],11),11),p=f.map(e=>e.reduce((e,t)=>{let[s,n,a]=t;return 0===s&&0===n||(0===a?e.push(s>0?[a,s,n]:[a,n,s]):e.push([a,s,n],[a,n,s])),e},[]));function x(e,t,s){let[n,a,r]=t;return 0!==r&&(e.push("".concat(n,"?").concat(s).concat(a,"=").concat(r)),e.push("".concat(n).concat(s).concat(a,"?=").concat(r))),e.push("".concat(n).concat(s).concat(a,"=").concat(r,"?")),e}let m=[...f.reduce((e,t)=>[...e,...t],[]).sort((e,t)=>e[0]===t[0]?e[1]-t[1]:e[0]-t[0]).reduce((e,t)=>x(e,t,"*"),[]),...p.reduce((e,t)=>[...e,...t],[]).reduce((e,t)=>{let s=t.join("");return e.map[s]||(e.map[s]=!0,e.result.push(t)),e},{result:[],map:{}}).result.sort((e,t)=>e[0]===t[0]?e[1]-t[1]:e[0]-t[0]).reduce((e,t)=>x(e,t,"/"),[])];function g(e){let t=/^(\d+\??)([*/])(\d+\??)=(\d+\??)$/.exec(e);if(!t)return{operator:"*",question:0,score:0,0:0,1:0,2:0};let s=t[1].lastIndexOf("?")>0?0:t[3].lastIndexOf("?")>0?1:2,n=[1,3,4].map(e=>parseInt(t[e].replace("?","")));return{operator:t[2],question:s,...n,score:n[s]?n[s]:Math.max(...n)}}var j=s(2265);class v{static bool(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.5;return Math.random()<e}static sign(){return .5>Math.random()?-1:1}static item(e,t){if(t){let s=e.reduce((e,s)=>e+t(s),0),n=this.float(s);for(let s of e)if((n-=t(s))<0)return s}return e[Math.floor(Math.random()*e.length)]}static float(e,t){let s=Math.random();if(void 0!==e&&void 0!==t){let n=Math.min(e,t);return s*(Math.max(e,t)-n)+n}return void 0!==e?s*e:s}static integer(e,t){return Math.floor(v.float(e,t))}static normal(e,t){let s=(Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random())/6;if(void 0!==e&&void 0!==t){let n=Math.min(e,t);return s*(Math.max(e,t)-n)+n}return void 0!==e?s*e:s}static normalSkewed(e,t,s){e>s&&(e=s),t<e&&(t=e),t>s&&(t=s);let n=v.normal(),a=(t-e)/(s-e);return e+(n=n<.5?2*n*a:1-2*(1-n)*(1-a))*(s-e)}static shuffle(e){for(let t=e.length-1;t>0;t--){let s=Math.floor(Math.random()*(t+1));if(s!==t){let n=e[s];e[s]=e[t],e[t]=n}}return e}static next(e){let t=e.shift();return this.shuffle(e),e.push(t),t}static cycle(e){let t=e.shift();return e.push(t),t}}function w(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return t.map(e=>"string"==typeof e?e:"object"==typeof e?Object.keys(e).filter(t=>e[t]).join(" "):"").join(" ")}var y=s(2216),H=s.n(y);async function V(){if(k())return!0;if(H().isStandalone())return!1;try{let{result:e}=await (n||(n=H().send("VKWebAppInit",{})));return e}catch(e){}return!1}async function b(){if(!M())return;let e=!1;async function t(){if(!e)try{let{result:t}=await H().send("VKWebAppShowBannerAd",{banner_location:"bottom",layout_type:"resize"});e=t}catch(e){}await new Promise(e=>setTimeout(e,1e4));let{result:s}=await H().send("VKWebAppCheckBannerAd",{});e=s,await t()}await t()}function M(){return k()||!H().isStandalone()}function k(){try{return window.top===window.self&&/\/\/(localhost)|(127\.0\.0\.1)/.test(window.location.href)}catch(e){}return!1}async function N(){if(k())return!0;try{let{success:e}=await H().send("VKWebAppShowInviteBox");return e}catch(e){console.error(e)}return!1}async function S(e,t){if(k())return!0;function s(){let t=e.question;return"".concat(0===t?"?":e[0]," ").concat(e.operator===c.Div?":":"*"," ").concat(1===t?"?":e[1]," = ").concat(2===t?"?":e[2])}try{let n=t?"Я решил ".concat(s(),' в игре "Дикое умножение"! Ответ: ').concat(e[e.question],". Попробуйте сами!"):"Помогите решить ".concat(s(),' в игре "Дикое умножение"!'),{post_id:a}=await H().send("VKWebAppShowWallPostBox",{message:n,attachments:E()});return void 0!==a}catch(e){console.error(e)}return!1}function E(){return"https://vk.com/app52517644"}function C(e){let{newEquation:t,setNewEquation:s,input:n,gameModel:a}=e,[r,i]=(0,j.useState)(),[c,o]=(0,j.useState)(-1),[d,h]=(0,j.useState)([]);return(0,j.useEffect)(()=>{t&&(r||h(a.getHistory()),function(){if(r&&"insert"===t){let e=g(r),t=c===e[e.question],s=[r,c,t];h([...d,s]),a.addHistory(s),t?a.addScore(e.score):a.addScore(-c),t?u.play("win"):u.play("lose",.6)}let e=a.getFailures();if(e.length>0&&v.bool())i(v.item(e));else{let e=a.getSuccesses(),t=m.filter(t=>!e[t]);i(v.item(t.length>0?t:m))}o(-1),s(!1)}())},[t]),(0,j.useEffect)(()=>{r&&n>-1&&o(n)},[n]),(0,l.jsxs)("div",{className:"game",children:[d.slice(-10).map((e,t,s)=>{let[n,r,i]=e;return(0,l.jsx)(B,{model:n,input:r,correct:i,cta:!1,dismissCta:()=>a.dismissCta("equation")},t)}),r&&(0,l.jsx)(B,{model:r,input:n})]})}function B(e){let{model:t,input:s,correct:n,cta:a,dismissCta:r}=e,i=g(t),o=void 0!==n&&!1;function d(e){return i.question===e?(0,l.jsx)(O,{value:i[e],input:s}):(0,l.jsx)("span",{children:i[e]})}return(0,l.jsxs)("article",{className:w("equation",void 0===n?"none":n?"win":"lose",{interactive:o}),onClick:async()=>{o&&(u.play("clear"),null==r||r(),await S(i,n))},children:[a&&(0,l.jsx)("span",{className:"cta left"}),d(0),"\xa0",(0,l.jsx)("span",{children:i.operator===c.Multi?"*":":"}),"\xa0",d(1),"\xa0",(0,l.jsx)("span",{children:"="}),"\xa0",d(2),a&&(0,l.jsx)("span",{className:"cta right"})]})}function O(e){let{input:t,value:s}=e;return(0,l.jsxs)("span",{className:"input",children:[(0,l.jsx)("span",{className:"input",children:t<0?"?":t}),(0,l.jsx)("span",{className:"value",children:s})]})}function Z(e){let{gameModel:t}=e,s=t.getShareReward();return(0,l.jsxs)(d,{onClick:async()=>{await N()&&t.addScore(s)},className:"button-share",children:[(0,l.jsx)(A,{}),(0,l.jsx)("span",{className:"sign",children:"+"}),"$",s]})}function A(){return(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"68px",height:"56px",viewBox:"0 0 68 56",children:[(0,l.jsx)("path",{d:"M-0,10 L5,10 L5,13 L10,13 L10,5 L13,5 L13,-0 L17,-0 L17,3 L26,3 L26,-0 L30,-0 L30,5 L33,5 L33,13 L38,13 L38,10 L43,10 L43,15 L40,15 L40,18 L3,18 L3,15 L-0,15 L-0,10 Z"}),(0,l.jsx)("path",{d:"M10,16 L33,16 L33,28 L30,28 L30,31 L27,31 L27,34 L16,34 L16,31 L13,31 L13,28 L10,28 L10,16 Z"}),(0,l.jsx)("path",{d:"M2,56 L2,53 L5,53 L5,46 L8,46 L8,43 L11,43 L11,40 L15,40 L15,37 L28,37 L28,40 L32,40 L32,43 L35,43 L35,46 L38,46 L38,53 L41,53 L41,56 L1,56 Z"}),(0,l.jsx)("path",{d:"M47,22 L47,17 L50,17 L50,20 L55,20 L55,17 L58,17 L58,22 M61,22 L61,26 L64,26 L64,23 L68,23 L68,26 L66,26 L66,29 L39,29 L39,26 L37,26 L37,23 L41,23 L41,26 L44,26 L44,22 "}),(0,l.jsx)("path",{d:"M44,37 L47,37 L47,41 L58,41 L58,37 L61,37 L61,27 L44,27 "}),(0,l.jsx)("path",{d:"M42,50 L42,47 L47,47 L47,44 L58,44 L58,47 L62,47 L62,50 L65,50 L65,53 L68,53 L68,56 L48,56 L48,53 L45,53 L45,50 L42,50 Z"})]})}function D(e){let{onClickItem:t,gameModel:s,inventoryOpen:n,setInventoryOpen:a}=e,r=function(e,t){let s=(0,j.useRef)(null);return(0,j.useEffect)(()=>{let t=t=>{s.current&&!s.current.contains(t.target)&&(null==e||e())};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}},[s]),s}(()=>{a(!1)}),i=s.getScore(),c=!s.ctaDismissed("inventory")&&s.getHistory().length>1&&i>0;return(0,l.jsxs)("div",{ref:r,className:w("score",{negative:i<0}),children:[c&&(0,l.jsx)("span",{className:"cta"}),(0,l.jsx)(d,{onClick:()=>{s.dismissCta("inventory"),a(!n)},children:(0,l.jsx)(P,{value:i})}),(0,l.jsx)(_,{value:i}),(0,l.jsx)(I,{open:n,gameModel:s,onClick:e=>{t(e)&&(u.play("clear"),a(!1))}})]})}function P(e){let{value:t,dollarSign:s=!0,explicitPlus:n}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{className:"sign",children:t<0?"-":n?"+":""}),s?"$":"",Math.abs(t)]})}function _(e){let{value:t}=e,[s,n]=(0,j.useState)(t),[a,r]=(0,j.useState)(t),i=a-s,[c,o]=(0,j.useState)(!1);return(0,j.useEffect)(()=>{let e=-1;return a!==t&&(o(!0),e=window.setTimeout(()=>{o(!1)},1e3)),n(a),r(t),()=>{o(!1),clearTimeout(e)}},[t]),(0,l.jsxs)("div",{className:w("increment",{negative:i<0,positive:i>0,visible:c}),children:[(0,l.jsx)("span",{className:"button-bg"}),(0,l.jsx)("span",{className:"text",children:(0,l.jsx)(P,{value:i,dollarSign:!1,explicitPlus:!0})})]})}function I(e){let{open:t,onClick:s,gameModel:n}=e;return(0,l.jsxs)("ul",{className:w("inventory",{open:t}),children:[[1,2,3,4].map(e=>{let t="bg".concat(e),a=!n.isUnlocked(t);return(0,l.jsx)("li",{"data-item":e,className:w({locked:a}),children:(0,l.jsxs)(d,{onClick:()=>s(t),children:[(0,l.jsx)("span",{className:"icon"}),a&&(0,l.jsx)(q,{}),a&&(0,l.jsxs)("span",{className:"price",children:["$",n.getPrice(t)]})]})},e)}),M()&&(0,l.jsx)("li",{className:"share",children:(0,l.jsx)(Z,{gameModel:n})},-1)]})}function q(){return(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"50px",height:"61px",viewBox:"0 0 50 61",children:[(0,l.jsx)("path",{fill:"#000",d:"M5,28 L5,10 L8,10 L8,5 L14,5 L14,0 L36,0 L36,5 L42,5 L42,10 L45,10 L45,28 L34,28 L34,16 L28,16 L28,11 L22,11 L22,16 L16,16 L16,28 L5,28 Z"}),(0,l.jsx)("path",{fill:"#000",d:"M0,27 L50,27 L50,61 L0,61 L0,27 Z"}),(0,l.jsx)("path",{fill:"#fff",d:"M8,31 L8,13 L10,13 L10,8 L17,8 L17,3 L33,3 L33,8 L40,8 L40,13 L42,13 L42,31 L37,31 L37,13 L37,13 L30,13 L30,8 L20,8 L20,13 L13,13 L13,31 L8,31 Z"}),(0,l.jsx)("path",{fill:"#fff",d:"M3,30 L47,30 L47,58 L3,58 L3,30 Z"}),(0,l.jsx)("path",{fill:"#000",d:"M22,37 L28,37 L28,51 L22,51 L22,37 Z"})]})}function F(e){let t=(0,j.useRef)(null);return(0,j.useEffect)(()=>{var s,n;e?null===(s=t.current)||void 0===s||s.showModal():null===(n=t.current)||void 0===n||n.close()},[t,e]),t}function K(e){let{open:t,onClose:s}=e;return(0,l.jsxs)("dialog",{className:"help",ref:F(t),onClose:()=>{u.play("clear"),s()},children:[(0,l.jsx)(d,{className:"button-close",onClick:s,clickSFX:!1,children:"X"}),(0,l.jsx)("div",{className:"scroll",children:(0,l.jsxs)("div",{className:"scrolled",children:[[1,2,3,4,5,6,7,8,9,10].map(e=>(0,l.jsx)("ul",{children:[0,1,2,3,4,5,6,7,8,9,10].map(t=>(0,l.jsxs)("li",{children:[e," * ",t," = ",e*t]},t))},e)),(0,l.jsx)("p",{children:(0,l.jsx)("a",{href:"mailto:evgeniy.s.polyakov@gmail.com",children:"evgeniy.s.polyakov@gmail.com"})}),(0,l.jsxs)("p",{children:["v","3.1.3"]})]})})]})}var W="/multikids/_next/static/media/title.2c39c7e7.png";function R(e){let{gameModel:t}=e,s=t.getMute();function n(){Howler.mute(s||document.hidden)}return(0,j.useEffect)(()=>(n(),document.addEventListener("visibilitychange",n,!1),()=>{document.removeEventListener("visibilitychange",n,!1)}),[s]),(0,l.jsx)(d,{className:"button-mute",onClick:()=>t.setMute(!s),children:s?(0,l.jsx)(T,{}):(0,l.jsx)(U,{})})}function T(){return(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"35px",height:"38px",viewBox:"3 0 35 38",children:[(0,l.jsx)("path",{d:"M17 21 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V23 H23 V25 H25 V27 H27 V29 H29 V31 H31 V34 H35 V31 H32 V29 H30 V27 H28 V25 H26 V23 H24 V21 H22 V19 H20 V21 Z"}),(0,l.jsx)("path",{d:"M21 6 H24 V9 H34 V6 H31 V3 H21 V0 H17 V14 H15 V12 H13 V10 H11 V8 H9 V6 H7 V3 H3 V6 H6 V8 H8 V10 H10 V12 H12 V14 H14 V16 H16 V18 H18 V16 H21 Z"}),(0,l.jsx)("path",{d:"M34 9 H38 V13 H34 Z"})]})}function U(){return(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"35px",height:"38px",viewBox:"3 0 35 38",children:[(0,l.jsx)("path",{d:"M17 0 V17 H14 V20 H17 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V20 H24 V17 H21 V6 H24 V9 H34 V6 H31 V3 H21 V0 Z"}),(0,l.jsx)("path",{d:"M34 9 H38 V13 H34 Z"})]})}function X(e){let{open:t,onClose:s,setHelpOpen:n,gameModel:a}=e;return(0,l.jsxs)("dialog",{className:"pause",ref:F(t),onClose:()=>{u.play("clear"),s()},children:[(0,l.jsx)("img",{src:W,alt:"Дикое Умножение",className:"title"}),(0,l.jsx)(d,{onClick:s,className:"button-play",children:(0,l.jsx)($,{})}),(0,l.jsxs)("div",{className:"row",children:[(0,l.jsx)(d,{className:"button-help",onClick:()=>n(!0),children:"?"}),(0,l.jsx)(R,{gameModel:a}),M()&&(0,l.jsx)(Z,{gameModel:a})]})]})}function $(){return(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"64px",height:"64px",viewBox:"0 0 64 64",children:(0,l.jsx)("path",{d:"M4,2 L12,2 L12,6 L20,6 L20,10 L28,10 L28,14 L36,14 L36,18 L44,18 L44,22 L52,22 L52,26 L60,26 L60,38 L52,38 L52,42 L44,42 L44,46 L36,46 L36,50 L28,50 L28,54 L20,54 L20,58 L12,58 L12,62 L4,62 Z"})})}function J(e){let{onClick:t}=e;return(0,l.jsx)(d,{className:"button-pause",onClick:t,children:(0,l.jsx)(z,{})})}function z(){return(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"43px",height:"38px",viewBox:"0 0 43 38",children:[(0,l.jsxs)("g",{children:[(0,l.jsx)("rect",{x:"0",y:"13",width:"3",height:"4"}),(0,l.jsx)("rect",{x:"0",y:"30",width:"3",height:"4"}),(0,l.jsx)("path",{d:"M3,9 L5,9 L5,6 L8,6 L8,4 L13,4 L13,2 L17,2 L17,0 L20,0 L20,11 L19,11 L19,13 L6,13 L6,16 L16,16 L16,13 L19,13 L19,22 L6,22 L6,25 L16,25 L16,22 L19,22 L19,31 L6,31 L6,34 L16,34 L16,31 L19,31 L19,33 L20,33 L20,38 L3,38 Z"})]}),(0,l.jsxs)("g",{transform:"translate(43,0) scale(-1,1)",children:[(0,l.jsx)("rect",{x:"0",y:"13",width:"3",height:"4"}),(0,l.jsx)("rect",{x:"0",y:"30",width:"3",height:"4"}),(0,l.jsx)("path",{d:"M3,9 L5,9 L5,6 L8,6 L8,4 L13,4 L13,2 L17,2 L17,0 L20,0 L20,11 L19,11 L19,13 L6,13 L6,16 L16,16 L16,13 L19,13 L19,22 L6,22 L6,25 L16,25 L16,22 L19,22 L19,31 L6,31 L6,34 L16,34 L16,31 L19,31 L19,33 L20,33 L20,38 L3,38 Z"})]})]})}function Y(e){let{bg:t}=e;return(0,l.jsx)("div",{className:"background","data-bg":t,children:[0,1,2].map(e=>(0,l.jsx)("div",{"data-layer":e},e))})}let G=[0,1,2,3,4,5,6,7,8,9].reduce((e,t)=>[...e,"Digit".concat(t),"Numpad".concat(t)],[]);function Q(e){let{basePath:t,gameModel:s}=e,n=(0,j.useRef)(null),[a,r]=(0,j.useState)(!1),[c,o]=(0,j.useState)(-1),[d,L]=(0,j.useState)(!1),[f,p]=(0,j.useState)(!0),[x,m]=(0,j.useState)(!1),[g,v]=(0,j.useState)(!1),[w,y]=(0,j.useState)(!1);function H(e){switch(e){case i.Delete:o(-1),u.play("clear");break;case i.Enter:c>-1&&(o(-1),r("insert"));break;default:if(u.play("shot",.4),c<0)o(e);else{let t=10*c+e;t<=100&&o(t)}}}function V(e){var t,s,a;if(d)return;let r=G.indexOf(e.code)>=0,c="Backspace"===e.code||"Delete"===e.code;if("Escape"===e.key&&(null===(s=n.current)||void 0===s||s.focus()),n.current!==document.activeElement&&(null===(t=n.current)||void 0===t?void 0:t.contains(document.activeElement))){if(!r&&!c)return;null===(a=n.current)||void 0===a||a.focus()}x&&m(!1),r?H(parseInt(e.code.replace(/\D+/ig,""))):c?H(i.Delete):("Enter"===e.code||"NumpadEnter"===e.code||"Space"===e.code)&&H(i.Enter)}return(0,j.useEffect)(()=>(document.addEventListener("keydown",V,!1),()=>{document.removeEventListener("keydown",V,!1)}),[c,d,x]),(0,j.useEffect)(()=>{g||(u.basePath=t,u.load("clear","lose","shot","win"),u.loop("music"),v(!0),r("insert"))},[g]),(0,l.jsxs)(l.Fragment,{children:[w&&(0,l.jsx)(Y,{bg:s.getBg()}),w&&(0,l.jsxs)("main",{ref:n,tabIndex:-1,children:[(0,l.jsx)(D,{gameModel:s,onClickItem:function(e){return s.isUnlocked(e)?(s.setBg(e),!0):!!s.purchase(e)&&(s.setBg(e),!0)},inventoryOpen:x,setInventoryOpen:m}),(0,l.jsx)("div",{className:"controls",children:(0,l.jsx)(J,{onClick:()=>p(!0)})}),(0,l.jsx)(C,{newEquation:a,setNewEquation:r,input:c,gameModel:s}),(0,l.jsx)(h,{onClick:H})]}),(0,l.jsx)(X,{open:f,onClose:function(){p(!1),w||(y(!0),b())},setHelpOpen:L,gameModel:s}),(0,l.jsx)(K,{open:d,onClose:function(){L(!1),o(-1),r("replace")}})]})}let ee=["bg1"],et={bg2:1e3,bg3:2e3,bg4:3e3},es=[1,2,3,4].map(e=>"bg".concat(e));class en{addHistory(e){let t=this.data.history;for(t.push([new Date().getTime(),...e]);t.length>1e3;)t.shift();let s=this.data.failures,[n,,a]=e;if(a)this.data.failures=s.filter(e=>e!==n),this.data.successes[n]=!0;else if(0>s.indexOf(n))for(s.push(n);s.length>100;)s.shift();this.update()}setScore(e){this.data.score=e,this.update()}addScore(e){this.data.score+=e,this.update()}setBg(e){this.data.background=e,this.update()}getHistory(){var e;return null!==(e=this.data.history.map(e=>e.slice(1)))&&void 0!==e?e:[]}getScore(){return this.data.score}getFailures(){return this.data.failures}getSuccesses(){return this.data.successes}isUnlocked(e){return ee.indexOf(e)>=0||this.data.unlocked.indexOf(e)>=0}getPrice(e){var t;return null!==(t=et[e])&&void 0!==t?t:0}getBg(){return this.data.background}purchase(e){if(this.isUnlocked(e))return!1;let t=this.getPrice(e);return t<=this.data.score&&(this.data.score-=t,this.data.unlocked.push(e),this.update(),!0)}getMute(){var e;return null!==(e=this.data.mute)&&void 0!==e&&e}setMute(e){this.data.mute=e,this.update()}ctaDismissed(e){var t;return null!==(t=this.data["".concat(e,"_cta_dismissed")])&&void 0!==t&&t}dismissCta(e){this.data["".concat(e,"_cta_dismissed")]=!0,this.update()}getShareReward(){return 100}update(){this.setData({...this.data})}constructor(e,t){this.data=e,this.setData=t}}let ea="multikids-data1";function er(){let e;try{var t;e=JSON.parse(null!==(t=localStorage.getItem(ea))&&void 0!==t?t:"{}"),isNaN(e.score)&&(e.score=0),Array.isArray(e.history)||(e.history=[]),Array.isArray(e.unlocked)||(e.unlocked=[]),Array.isArray(e.failures)||(e.failures=[])}catch(t){e={score:0,background:"bg1",history:[],unlocked:[],failures:[],successes:{}}}let s=e.background;return 0>es.indexOf(s)&&(e.background=es[0]),e.successes={},e.history.forEach(t=>{let[,s,,n]=t;n&&(e.successes[s]=!0)}),e}function ei(){return(0,l.jsxs)("dialog",{className:"redirect",open:!0,children:[(0,l.jsx)("img",{src:W,alt:"Дикое Умножение",className:"title"}),(0,l.jsx)(d,{onClick:()=>window.location.assign(E()),children:"VK"}),(0,l.jsx)(d,{children:"Yandex"})]})}function ec(e){let{basePath:t}=e,s=function(){let[e,t]=(0,j.useState)(er);return(0,j.useEffect)(()=>{var t;t={...t=e},delete t.successes,localStorage.setItem(ea,JSON.stringify(t))},[e]),new en(e,t)}(),[n,a]=(0,j.useState)(void 0);return(0,j.useEffect)(()=>{n||V().then(e=>a(e))},[n]),(0,l.jsxs)(l.Fragment,{children:[!0===n&&(0,l.jsx)(Q,{basePath:t,gameModel:s}),!1===n&&(0,l.jsx)(ei,{})]})}}},function(e){e.O(0,[18,971,23,744],function(){return e(e.s=6698)}),_N_E=e.O()}]);