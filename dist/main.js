!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=e=>1===e.toString().length?"0"+e:e;var r=e=>{scrollBy({top:e.getBoundingClientRect().top,behavior:"smooth"})};var c=()=>{const e=document.querySelector("menu"),t=()=>{e.classList.toggle("active-menu")};document.addEventListener("click",n=>{const o=n.target,c=o.closest(".close-btn"),s=o.closest(".menu"),l=o.closest("menu > ul > li"),a=!o.closest("menu");s||c||a&&e.classList.contains("active-menu")?(n.preventDefault(),t()):l&&(n.preventDefault(),r(document.getElementById(""+n.target.getAttribute("href").slice(1))),t())})};var s=({timing:e,draw:t,duration:n})=>{const o=performance.now(),r=c=>{let s=(c-o)/n;s>1&&(s=1);const l=e(s);t(l),s<1&&requestAnimationFrame(r)};requestAnimationFrame(r)};var l=()=>{const e=document.querySelector(".popup"),t=e.querySelector(".popup-content");document.querySelectorAll(".popup-btn").forEach(n=>n.addEventListener("click",()=>{if(e.style.display="block",document.documentElement.clientWidth>=768){t.style.top="-100%";s({duration:800,timing:(e=>t=>1-e(1-t))(e=>{for(let t=0,n=1;;t+=n,n/=2)if(e>=(7-4*t)/11)return-Math.pow((11-6*t-11*e)/4,2)+Math.pow(n,2)}),draw(e){t.style.top=10*e+"%"}})}})),e.addEventListener("click",n=>{let o=n.target;o.classList.contains("popup-close")?document.documentElement.clientWidth>=768?(s({duration:300,timing:e=>e,draw(e){t.style.top=-100*e+"%"}}),setTimeout(()=>{e.style.display="",t.style.top=""},320)):e.style.display="":(o=o.closest(".popup-content"),o||(e.style.display=""))})};var a=()=>{const e=document.querySelector(".js-scroll-btn"),t=document.querySelector(".service");e.addEventListener("click",e=>{e.preventDefault(),r(t)})};var i=()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),n=document.querySelectorAll(".service-tab");e.addEventListener("click",e=>{const o=e.target.closest(".service-header-tab");o&&t.forEach((e,r)=>{e===o&&(e=>{for(let o=0;o<n.length;o++)e===o?(t[o].classList.add("active"),n[o].classList.remove("d-none")):(t[o].classList.remove("active"),n[o].classList.add("d-none"))})(r)})})};var d=()=>{const e=document.querySelector(".portfolio-content"),t=e.querySelectorAll(".portfolio-item"),n=e.getElementsByClassName("dot");(()=>{const n=e.querySelector(".portfolio-dots");for(let e=0;e<t.length;e++){const t=document.createElement("li");t.classList.add("dot"),0===e&&t.classList.add("dot-active"),n.append(t)}})();let o,r=0;const c=(e,t,n)=>e[t].classList.remove(n),s=(e,t,n)=>e[t].classList.add(n),l=()=>{c(t,r,"portfolio-item-active"),c(n,r,"dot-active"),r++,r>=t.length&&(r=0),s(t,r,"portfolio-item-active"),s(n,r,"dot-active")},a=(e=3e3)=>o=setInterval(l,e);e.addEventListener("click",e=>{const o=e.target;e.preventDefault(),o.matches(".portfolio-btn, .dot")&&(c(t,r,"portfolio-item-active"),c(n,r,"dot-active"),o.matches("#arrow-right")?r++:o.matches("#arrow-left")?r--:o.matches(".dot")&&[...n].forEach((e,t)=>{e===o&&(r=t)}),r>=t.length&&(r=0),r<0&&(r=t.length-1),s(t,r,"portfolio-item-active"),s(n,r,"dot-active"))}),e.addEventListener("mouseover",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(o)}),e.addEventListener("mouseout",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&a()}),a()};var u=()=>{const e=document.querySelector(".command .row");let t;e.addEventListener("mouseover",e=>{e.target.classList.contains("command__photo")&&(t=e.target.src,e.target.src=e.target.dataset.img)}),e.addEventListener("mouseout",e=>{e.target.classList.contains("command__photo")&&(e.target.src=t)})};var m=(e=100)=>{const t=document.querySelector(".calc-block"),n=t.querySelector(".calc-type"),o=t.querySelector(".calc-square"),r=t.querySelector(".calc-count"),c=t.querySelector(".calc-day"),l=document.getElementById("total");t.addEventListener("input",t=>{const a=t.target;(a.matches("select")||a.matches("input"))&&(a.matches("input")&&(a.value=a.value.replace(/\D/g,"")),(()=>{let t=0,a=1,i=1;const d=n.options[n.selectedIndex].value,u=+o.value;r.value>1&&(a+=(r.value-1)/10),c.value&&c.value<5?i*=2:c.value&&c.value<10&&(i*=1.5),d&&u&&(t=e*d*u*a*i),s({duration:500,timing:e=>e,draw(e){l.textContent=Math.round(e*t)}})})())})};var v=(e,t="+7 (___) ___-__-__")=>{const n=document.querySelectorAll(e);function o(e){const n=e.code,o=t,r=o.replace(/\D/g,""),c=this.value.replace(/\D/g,"");let s=0,l=o.replace(/[_\d]/g,e=>s<c.length?c.charAt(s++)||r.charAt(s):e);s=l.indexOf("_"),-1!==s&&(l=l.slice(0,s));let a=o.substr(0,this.value.length).replace(/_+/g,e=>"\\d{1,"+e.length+"}").replace(/[+()]/g,"\\$&");a=new RegExp("^"+a+"$"),(!a.test(this.value)||this.value.length<5||n>47&&n<58)&&(this.value=l),"blur"===e.type&&this.value.length<5&&(this.value="")}for(const e of n)e.addEventListener("input",o),e.addEventListener("focus",o),e.addEventListener("blur",o)};var p=()=>{v('input[name="user_phone"]');const e={user_name:/^[а-яё ]+$/i,user_email:/^[\w.]+@\w+\.\w{2,}$/i,user_phone:/^\+?[78]([-() ]*\d){10}$/,user_message:/^[а-яё ]+$/i},t=document.createElement("div");t.style.cssText="font-size: 2rem; color: #ffffff";document.body.addEventListener("submit",n=>{n.preventDefault();const o=new Set,r=[...n.target.elements].filter(e=>"button"!==e.tagName.toLowerCase()&&"button"!==e.type);if(r.forEach(t=>{t.value.trim()&&e[t.name].test(t.value)?(t.style.border="",o.delete(t)):(t.style.border="2px solid red",o.add(t))}),!o.size){n.target.append(t),t.innerHTML='<div class="sk-circle-bounce">\n                  <div class="sk-child sk-circle-1"></div>\n                  <div class="sk-child sk-circle-2"></div>\n                  <div class="sk-child sk-circle-3"></div>\n                  <div class="sk-child sk-circle-4"></div>\n                  <div class="sk-child sk-circle-5"></div>\n                  <div class="sk-child sk-circle-6"></div>\n                  <div class="sk-child sk-circle-7"></div>\n                  <div class="sk-child sk-circle-8"></div>\n                  <div class="sk-child sk-circle-9"></div>\n                  <div class="sk-child sk-circle-10"></div>\n                  <div class="sk-child sk-circle-11"></div>\n                  <div class="sk-child sk-circle-12"></div>\n                </div>';const e={};new FormData(n.target).forEach((t,n)=>e[n]=t.trim()),(e=>fetch("server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(e).then(e=>{if(200!==e.status)throw new Error("Error");t.textContent="Спасибо! Мы скоро с Вами свяжемся!",r.forEach(e=>e.value="")}).catch(e=>{t.textContent="Что-то пошло не так...",console.error(e)})}}),document.body.addEventListener("input",e=>{const t=e.target;(t.matches('input[name="user_name"]')||t.matches('input[name="user_message"]'))&&(t.value=t.value.replace(/[^а-яё ]/gi,""))})};(e=>{const t=document.getElementById("timer-hours"),n=document.getElementById("timer-minutes"),r=document.getElementById("timer-seconds");let c;const s=()=>{const s=(()=>{const t=(new Date(e).getTime()-(new Date).getTime())/1e3,n=Math.floor(t%60),o=Math.floor(t/60%60);return{timeRemaining:t,hours:Math.floor(t/3600),minutes:o,seconds:n}})();s.timeRemaining>0?(t.textContent=o(s.hours),n.textContent=o(s.minutes),r.textContent=o(s.seconds)):(clearInterval(c),t.textContent="00",n.textContent="00",r.textContent="00")};s(),c=setInterval(s,1e3)})("24 september 2020 00:00"),c(),l(),a(),i(),d(),u(),m(),p()}]);