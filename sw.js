if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let l={};const c=e=>i(e,n),o={module:{uri:n},exports:l,require:c};s[n]=Promise.all(r.map((e=>o[e]||c(e)))).then((e=>(a(...e),l)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"aboutMe.html",revision:"9c0eddb495a7e41243c5a788c9c161d7"},{url:"apple-touch-icon.png",revision:"8f2a61c54060f2b07dc8b1646f489bc7"},{url:"assets/_plugin-vue_export-helper-DlAUqK2U.js",revision:null},{url:"assets/AboutMePage-BrAeWqKc.css",revision:null},{url:"assets/AboutMePage-DBVcdBvI.js",revision:null},{url:"assets/bestMileageCards-CsvtcGU2.css",revision:null},{url:"assets/fa-brands-400-BU4mH_I_.woff2",revision:null},{url:"assets/fa-brands-400-CArp7j8S.ttf",revision:null},{url:"assets/fa-regular-400-Cy4iLbxs.woff2",revision:null},{url:"assets/fa-regular-400-D4OwLFL7.ttf",revision:null},{url:"assets/fa-solid-900-BAw_JAW6.ttf",revision:null},{url:"assets/fa-solid-900-CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility-B9t6EWrS.woff2",revision:null},{url:"assets/fa-v4compatibility-ch80hpM0.ttf",revision:null},{url:"assets/index-CrLKPhYB.js",revision:null},{url:"assets/index-CSC5wCk7.css",revision:null},{url:"assets/index-f1g9dClV.js",revision:null},{url:"assets/main-D3f8hFqO.js",revision:null},{url:"assets/materialdesignicons-webfont-B7mPwVP_.ttf",revision:null},{url:"assets/materialdesignicons-webfont-CSr8KVlo.eot",revision:null},{url:"assets/materialdesignicons-webfont-Dp5v-WZN.woff2",revision:null},{url:"assets/materialdesignicons-webfont-PXm3-2wK.woff",revision:null},{url:"assets/pinia-Cn08k1i0.js",revision:null},{url:"assets/projects/averageExchangeRate-DWCp42yO.js",revision:null},{url:"assets/projects/bestMileageCards-C46ovbVC.js",revision:null},{url:"assets/ProjectsPage-B4KoXB3u.css",revision:null},{url:"assets/ProjectsPage-CDP48bXO.js",revision:null},{url:"assets/ResumePage-CXB8STFc.js",revision:null},{url:"assets/ResumePage-WKnT0pPD.css",revision:null},{url:"assets/sorts-BPW8KRTv.js",revision:null},{url:"assets/StorageManager-BxSXdpTc.css",revision:null},{url:"assets/StorageManager-DTqY_k9W.js",revision:null},{url:"average-exchange-rate-preview.webp",revision:"0177fa3feec83b548c933023bccf80db"},{url:"best-mileage-cards-preview.webp",revision:"abc7f4ee5dbdcbf505a58d483d3ae462"},{url:"chatbot-json-toolbox-preview.webp",revision:"c94e870a7e1156834927db52bb24f8f1"},{url:"chatbot-preview.webp",revision:"5f14ec46e0c0d75e806e6e9cc63fec09"},{url:"favicon-96x96.png",revision:"893cadb2b9acc1f8acc1d0c1ecf89e62"},{url:"favicon.ico",revision:"d19f6cf3eea7a4dde020458f1e7c4d58"},{url:"favicon.svg",revision:"20c8e7cc9f648beec6bc6080ef56fa7b"},{url:"index.html",revision:"9c0eddb495a7e41243c5a788c9c161d7"},{url:"linebot-preview.webp",revision:"0fdc2ebf12ef5bb294bf5bd389103d1e"},{url:"manifests/website.json",revision:"e70e44f515271ba4b501351cbc16be5d"},{url:"profile.webp",revision:"61703ec4d8bed5e0101d62bfc6d8c480"},{url:"projects.html",revision:"9c0eddb495a7e41243c5a788c9c161d7"},{url:"projects/averageExchangeRate.html",revision:"50c271c1825464943e2ddd7ddbcb75cd"},{url:"projects/averageExchangeRate/apple-touch-icon.png",revision:"ce674bb0c440738c9a3a62d27d5d8417"},{url:"projects/averageExchangeRate/favicon-96x96.png",revision:"9c2c090bae15ff333b75e49a9004cdc1"},{url:"projects/averageExchangeRate/favicon.ico",revision:"7355bed5f0af9b21c0ee01590aaf45d0"},{url:"projects/averageExchangeRate/favicon.svg",revision:"d179bdda721953382cf5df90870015f6"},{url:"projects/averageExchangeRate/site.webmanifest",revision:"a97c27b300a111706074e99de4f099f2"},{url:"projects/averageExchangeRate/web-app-manifest-192x192.png",revision:"06703415e1a06728a62ffc1fc0b1bae7"},{url:"projects/averageExchangeRate/web-app-manifest-512x512.png",revision:"d89ec88d1599d0f6b3bc99c15398a37e"},{url:"projects/bestMileageCards.html",revision:"f7c1a5bd0fe523c4b437a176feac7a2a"},{url:"projects/bestMileageCards/apple-touch-icon.png",revision:"6f46a8002abd3d4c67a7e067579d4713"},{url:"projects/bestMileageCards/favicon-96x96.png",revision:"91a2679be4b617c5ca3166f4a9727e48"},{url:"projects/bestMileageCards/favicon.ico",revision:"fc4409811edd7918acad6df86321bfdc"},{url:"projects/bestMileageCards/favicon.svg",revision:"2b750f263ef38bbee3dca6f5fd4b57ce"},{url:"projects/bestMileageCards/site.webmanifest",revision:"f3b5a0054410c3e5940627f70a2815a5"},{url:"projects/bestMileageCards/web-app-manifest-192x192.png",revision:"baf97848583335ee5bb7ac60789bb7a5"},{url:"projects/bestMileageCards/web-app-manifest-512x512.png",revision:"0d5f71510ad847ef70f4f66346d63d56"},{url:"README.md",revision:"aad67d2e61ff444da48753729e31662b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"resume.html",revision:"9c0eddb495a7e41243c5a788c9c161d7"},{url:"web-app-manifest-192x192.png",revision:"5cba04023d6693f3fc30b25f26c70581"},{url:"web-app-manifest-512x512.png",revision:"897bac9423a2ee30585c0ba89f6a0902"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
