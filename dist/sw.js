if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let t={};const o=s=>l(s,i),u={module:{uri:i},exports:t,require:o};e[i]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(n(...s),t)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"about.html",revision:"d98fa7b8ade3a42429300c5800a75b68"},{url:"admin.html",revision:"832741e07871ecf8dec87eb52f82c3ce"},{url:"assets/about-BKGcj729.css",revision:null},{url:"assets/about-image-BwWGQLr9.jpg",revision:null},{url:"assets/admin-Bg9MwLIS.css",revision:null},{url:"assets/contact-8E8hMDUB.js",revision:null},{url:"assets/contact-B-2OSDcz.js",revision:null},{url:"assets/contact-BIs6HL-i.js",revision:null},{url:"assets/contact-BK_Ryn8r.js",revision:null},{url:"assets/contact-Da2aoj5Q.js",revision:null},{url:"assets/contact-DsyKycPx.js",revision:null},{url:"assets/contact-Dx5fnfOV.js",revision:null},{url:"assets/contact-knJOMRwQ.js",revision:null},{url:"assets/contact-L3KEe48h.js",revision:null},{url:"assets/contact-PzW7GA3z.css",revision:null},{url:"assets/contact-SFMEqWBD.js",revision:null},{url:"assets/drinks-yrCa8HL6.jpg",revision:null},{url:"assets/main-_CSjskSg.js",revision:null},{url:"assets/main-Cj4T5EpM.css",revision:null},{url:"assets/main-CQPtCKzO.css",revision:null},{url:"assets/main-I_0rQsh_.css",revision:null},{url:"assets/menu-CfZUXrpv.css",revision:null},{url:"assets/modulepreload-polyfill-B5Qt9EMX.js",revision:null},{url:"assets/nav-CU4BVp_i.css",revision:null},{url:"assets/order_management-B_GXFHXx.css",revision:null},{url:"assets/order-HIRpstYY.css",revision:null},{url:"assets/reservation-CPtrUj3K.css",revision:null},{url:"assets/reservation-cqJwX2no.js",revision:null},{url:"assets/reservation-legend2-DMcL8ucI.png",revision:null},{url:"assets/review-DKgv8K7F.css",revision:null},{url:"assets/RobotoMono-Bold-B8rsEFyH.ttf",revision:null},{url:"assets/RobotoMono-Regular-44XoGH_Y.ttf",revision:null},{url:"assets/sashimi-DeyDCaAw.jpg",revision:null},{url:"assets/some_more_drinks-DAGcD5Vi.jpg",revision:null},{url:"assets/some_sushi-CIAzK9EC.jpg",revision:null},{url:"assets/sushi_background-tV6M_tqv.jpg",revision:null},{url:"assets/sushi_background6-B8bk_XLU.jpg",revision:null},{url:"assets/sushi-8cYb4rHQ.jpg",revision:null},{url:"assets/table-legend-7jo0ybDs.jpg",revision:null},{url:"assets/user-CpqC1vBm.css",revision:null},{url:"contact.html",revision:"5548af53ad1806ead8eb5faf561e177f"},{url:"index.html",revision:"f8fb6256b7b4a9dbebde7dd8480a4e59"},{url:"menu.html",revision:"e55496dbc72587454b3ac3b838e8e4aa"},{url:"order_management.html",revision:"d168b435b665f0fdf1044675d09b2eb1"},{url:"order.html",revision:"0494b1f2192169857be6716c59ce12d4"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"reservation.html",revision:"dde96dffb3f319708afb83e1adedcf5f"},{url:"review.html",revision:"926192bd9461b17bc7cbec08c1e86177"},{url:"user.html",revision:"e33ac8c624c13af66bd00dc678a30396"},{url:"manifest.webmanifest",revision:"0adcfcc3abe326481034db5f4fb07789"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
