if(!self.define){let e,s={};const r=(r,a)=>(r=new URL(r+".js",a).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(a,i)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let n={};const o=e=>r(e,l),t={module:{uri:l},exports:n,require:o};s[l]=Promise.all(a.map((e=>t[e]||o(e)))).then((e=>(i(...e),n)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"fa81f4e8b097b03e60e0eaf710bd0191"},{url:"aboutMe.html",revision:"3509daf7fb425c49bf594c56b00fa050"},{url:"apple-touch-icon.png",revision:"8f2a61c54060f2b07dc8b1646f489bc7"},{url:"assets/_plugin-vue_export-helper-DlAUqK2U.js",revision:null},{url:"assets/_plugin-vue_export-helper-DlAUqK2U.js.map",revision:null},{url:"assets/aboutMe-F-cY1PTL.js.map",revision:null},{url:"assets/AboutMePage-BrAeWqKc.css",revision:null},{url:"assets/AboutMePage-CN9rDQ0-.js",revision:null},{url:"assets/AboutMePage-CN9rDQ0-.js.map",revision:null},{url:"assets/bestMileageCards-DSGMfyDB.css",revision:null},{url:"assets/fa-brands-400-BU4mH_I_.woff2",revision:null},{url:"assets/fa-brands-400-CArp7j8S.ttf",revision:null},{url:"assets/fa-regular-400-Cy4iLbxs.woff2",revision:null},{url:"assets/fa-regular-400-D4OwLFL7.ttf",revision:null},{url:"assets/fa-solid-900-BAw_JAW6.ttf",revision:null},{url:"assets/fa-solid-900-CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility-B9t6EWrS.woff2",revision:null},{url:"assets/fa-v4compatibility-ch80hpM0.ttf",revision:null},{url:"assets/index-DoOaPqx1.js",revision:null},{url:"assets/index-DoOaPqx1.js.map",revision:null},{url:"assets/index-Dwa1jC74.css",revision:null},{url:"assets/index-f1g9dClV.js",revision:null},{url:"assets/index-f1g9dClV.js.map",revision:null},{url:"assets/main-F-cY1PTL.js.map",revision:null},{url:"assets/main-psxj4Doh.js",revision:null},{url:"assets/main-psxj4Doh.js.map",revision:null},{url:"assets/materialdesignicons-webfont-B7mPwVP_.ttf",revision:null},{url:"assets/materialdesignicons-webfont-CSr8KVlo.eot",revision:null},{url:"assets/materialdesignicons-webfont-Dp5v-WZN.woff2",revision:null},{url:"assets/materialdesignicons-webfont-PXm3-2wK.woff",revision:null},{url:"assets/pinia-DwUF_5rD.js",revision:null},{url:"assets/pinia-DwUF_5rD.js.map",revision:null},{url:"assets/projects-F-cY1PTL.js.map",revision:null},{url:"assets/projects/averageExchangeRate-qSg4LSnk.js",revision:null},{url:"assets/projects/averageExchangeRate-qSg4LSnk.js.map",revision:null},{url:"assets/projects/bestMileageCards-BdINdtmC.js",revision:null},{url:"assets/projects/bestMileageCards-BdINdtmC.js.map",revision:null},{url:"assets/ProjectsPage-C0X_3PUD.css",revision:null},{url:"assets/ProjectsPage-DVudlreV.js",revision:null},{url:"assets/ProjectsPage-DVudlreV.js.map",revision:null},{url:"assets/resume-F-cY1PTL.js.map",revision:null},{url:"assets/ResumePage-DXlcvN0y.css",revision:null},{url:"assets/ResumePage-g4ruj5X9.js",revision:null},{url:"assets/ResumePage-g4ruj5X9.js.map",revision:null},{url:"assets/sorts-BPW8KRTv.js",revision:null},{url:"assets/sorts-BPW8KRTv.js.map",revision:null},{url:"assets/StorageManager-BxSXdpTc.css",revision:null},{url:"assets/StorageManager-DcRJVMpv.js",revision:null},{url:"assets/StorageManager-DcRJVMpv.js.map",revision:null},{url:"chatbot-json-toolbox-preview.webp",revision:"c94e870a7e1156834927db52bb24f8f1"},{url:"chatbot-preview.webp",revision:"5f14ec46e0c0d75e806e6e9cc63fec09"},{url:"favicon-96x96.png",revision:"893cadb2b9acc1f8acc1d0c1ecf89e62"},{url:"favicon.ico",revision:"d19f6cf3eea7a4dde020458f1e7c4d58"},{url:"favicon.svg",revision:"20c8e7cc9f648beec6bc6080ef56fa7b"},{url:"index.html",revision:"3509daf7fb425c49bf594c56b00fa050"},{url:"linebot-preview.webp",revision:"0fdc2ebf12ef5bb294bf5bd389103d1e"},{url:"manifests/website.json",revision:"e70e44f515271ba4b501351cbc16be5d"},{url:"profile.webp",revision:"61703ec4d8bed5e0101d62bfc6d8c480"},{url:"projects.html",revision:"3509daf7fb425c49bf594c56b00fa050"},{url:"projects/averageExchangeRate.html",revision:"61f23d0a25a399ab879c4416efca710d"},{url:"projects/averageExchangeRate/apple-touch-icon.png",revision:"ce674bb0c440738c9a3a62d27d5d8417"},{url:"projects/averageExchangeRate/favicon-96x96.png",revision:"9c2c090bae15ff333b75e49a9004cdc1"},{url:"projects/averageExchangeRate/favicon.ico",revision:"7355bed5f0af9b21c0ee01590aaf45d0"},{url:"projects/averageExchangeRate/favicon.svg",revision:"d179bdda721953382cf5df90870015f6"},{url:"projects/averageExchangeRate/site.webmanifest",revision:"a97c27b300a111706074e99de4f099f2"},{url:"projects/averageExchangeRate/web-app-manifest-192x192.png",revision:"06703415e1a06728a62ffc1fc0b1bae7"},{url:"projects/averageExchangeRate/web-app-manifest-512x512.png",revision:"d89ec88d1599d0f6b3bc99c15398a37e"},{url:"projects/bestMileageCards.html",revision:"cc44fb9d208e41635f80791c60cad5a0"},{url:"projects/bestMileageCards/apple-touch-icon.png",revision:"6f46a8002abd3d4c67a7e067579d4713"},{url:"projects/bestMileageCards/favicon-96x96.png",revision:"91a2679be4b617c5ca3166f4a9727e48"},{url:"projects/bestMileageCards/favicon.ico",revision:"fc4409811edd7918acad6df86321bfdc"},{url:"projects/bestMileageCards/favicon.svg",revision:"2b750f263ef38bbee3dca6f5fd4b57ce"},{url:"projects/bestMileageCards/site.webmanifest",revision:"f3b5a0054410c3e5940627f70a2815a5"},{url:"projects/bestMileageCards/web-app-manifest-192x192.png",revision:"baf97848583335ee5bb7ac60789bb7a5"},{url:"projects/bestMileageCards/web-app-manifest-512x512.png",revision:"0d5f71510ad847ef70f4f66346d63d56"},{url:"README.md",revision:"aad67d2e61ff444da48753729e31662b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"resume.html",revision:"3509daf7fb425c49bf594c56b00fa050"},{url:"web-app-manifest-192x192.png",revision:"5cba04023d6693f3fc30b25f26c70581"},{url:"web-app-manifest-512x512.png",revision:"897bac9423a2ee30585c0ba89f6a0902"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
