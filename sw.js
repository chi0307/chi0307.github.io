if(!self.define){let e,s={};const a=(a,r)=>(a=new URL(a+".js",r).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const f=e=>a(e,c),o={module:{uri:c},exports:n,require:f};s[c]=Promise.all(r.map((e=>o[e]||f(e)))).then((e=>(i(...e),n)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/fa-brands-400-BU4mH_I_.woff2",revision:null},{url:"assets/fa-brands-400-CArp7j8S.ttf",revision:null},{url:"assets/fa-regular-400-Cy4iLbxs.woff2",revision:null},{url:"assets/fa-regular-400-D4OwLFL7.ttf",revision:null},{url:"assets/fa-solid-900-BAw_JAW6.ttf",revision:null},{url:"assets/fa-solid-900-CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility-B9t6EWrS.woff2",revision:null},{url:"assets/fa-v4compatibility-ch80hpM0.ttf",revision:null},{url:"assets/materialdesignicons-webfont-B7mPwVP_.ttf",revision:null},{url:"assets/materialdesignicons-webfont-CSr8KVlo.eot",revision:null},{url:"assets/materialdesignicons-webfont-Dp5v-WZN.woff2",revision:null},{url:"assets/materialdesignicons-webfont-PXm3-2wK.woff",revision:null},{url:"css/AboutMePage-BrAeWqKc.css",revision:"ae2076c30497a29ebef6378df0d9092c"},{url:"css/bestMileageCards-CsvtcGU2.css",revision:"27afd7b4875607e9c56d347c042d12f6"},{url:"css/index-CSC5wCk7.css",revision:"626f52864c3ceedb2c54c49857bcd65e"},{url:"css/ProjectsPage-B4KoXB3u.css",revision:"95409cc7f672ec8105c9e2b688660c3e"},{url:"css/ResumePage-WKnT0pPD.css",revision:"7130d8322f8741bdfca6bf181f04d41a"},{url:"css/StorageManager-BxSXdpTc.css",revision:"86a8fe37c7d165236620db62f5ba1ad4"},{url:"js/_plugin-vue_export-helper-DlAUqK2U.js",revision:"0e586d1b4a12b5dbfee7c2ac453f4801"},{url:"js/AboutMePage-s7ScVt9b.js",revision:"f7e1ae95fbfc3605b7cac9f460bae0f1"},{url:"js/index-Bys5My-t.js",revision:"07ee6ea5522d7bf3d8c260dfa9c61d51"},{url:"js/index-f1g9dClV.js",revision:"822d2e77b9c8d55b3e20893e6a1e84b8"},{url:"js/main-DA516VfZ.js",revision:"e53d6e8786428c7b90e15e2e863c57fc"},{url:"js/pinia-D15VhbaU.js",revision:"3f94b132ef642f9a2e1530be8941c6f6"},{url:"js/projects/averageExchangeRate-CS6935H4.js",revision:"491a6a78c0cf3b09018d450d08d19d22"},{url:"js/projects/bestMileageCards-CWCaKJ9d.js",revision:"d6a0a2cdbaa93c655287f7628fa8380c"},{url:"js/ProjectsPage-Bz1JsKRu.js",revision:"8fb9c83d7e694ec0753ad53d4e8ecb45"},{url:"js/ResumePage-Dh788U12.js",revision:"427c05b2706ed1ca241ed5e87aecf2f8"},{url:"js/sorts-BPW8KRTv.js",revision:"ef170f83a1e90e34e674ca04b96ff43d"},{url:"js/StorageManager-Br6xOBCX.js",revision:"4c20c5d45e31f974ded5321b5dbdc1e7"},{url:"projects/averageExchangeRate.html",revision:"f4a619bc451fd368ee9281d3eaf869cb"},{url:"projects/averageExchangeRate/apple-touch-icon.png",revision:"ce674bb0c440738c9a3a62d27d5d8417"},{url:"projects/averageExchangeRate/favicon-96x96.png",revision:"9c2c090bae15ff333b75e49a9004cdc1"},{url:"projects/averageExchangeRate/favicon.ico",revision:"7355bed5f0af9b21c0ee01590aaf45d0"},{url:"projects/averageExchangeRate/favicon.svg",revision:"d179bdda721953382cf5df90870015f6"},{url:"projects/averageExchangeRate/site.webmanifest",revision:"a97c27b300a111706074e99de4f099f2"},{url:"projects/averageExchangeRate/web-app-manifest-192x192.png",revision:"06703415e1a06728a62ffc1fc0b1bae7"},{url:"projects/averageExchangeRate/web-app-manifest-512x512.png",revision:"d89ec88d1599d0f6b3bc99c15398a37e"},{url:"projects/bestMileageCards.html",revision:"050fc9ab30f3cf26d331a30b49df9cff"},{url:"projects/bestMileageCards/apple-touch-icon.png",revision:"6f46a8002abd3d4c67a7e067579d4713"},{url:"projects/bestMileageCards/favicon-96x96.png",revision:"91a2679be4b617c5ca3166f4a9727e48"},{url:"projects/bestMileageCards/favicon.ico",revision:"fc4409811edd7918acad6df86321bfdc"},{url:"projects/bestMileageCards/favicon.svg",revision:"2b750f263ef38bbee3dca6f5fd4b57ce"},{url:"projects/bestMileageCards/site.webmanifest",revision:"f3b5a0054410c3e5940627f70a2815a5"},{url:"projects/bestMileageCards/web-app-manifest-192x192.png",revision:"baf97848583335ee5bb7ac60789bb7a5"},{url:"projects/bestMileageCards/web-app-manifest-512x512.png",revision:"0d5f71510ad847ef70f4f66346d63d56"},{url:"index.html",revision:"92a1e6036fddae1833a8e04a2fa9def0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
