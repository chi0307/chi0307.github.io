self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});self.addEventListener("install",()=>{self.skipWaiting()});self.addEventListener("fetch",e=>{const n=new URL(e.request.url);n.origin!==self.location.origin||[{"revision":"92a1e6036fddae1833a8e04a2fa9def0","url":"aboutMe.html"},{"revision":"ae2076c30497a29ebef6378df0d9092c","url":"css/AboutMePage-BrAeWqKc.css"},{"revision":"27afd7b4875607e9c56d347c042d12f6","url":"css/bestMileageCards-CsvtcGU2.css"},{"revision":"626f52864c3ceedb2c54c49857bcd65e","url":"css/index-CSC5wCk7.css"},{"revision":"95409cc7f672ec8105c9e2b688660c3e","url":"css/ProjectsPage-B4KoXB3u.css"},{"revision":"7130d8322f8741bdfca6bf181f04d41a","url":"css/ResumePage-WKnT0pPD.css"},{"revision":"86a8fe37c7d165236620db62f5ba1ad4","url":"css/StorageManager-BxSXdpTc.css"},{"revision":"92a1e6036fddae1833a8e04a2fa9def0","url":"index.html"},{"revision":"0e586d1b4a12b5dbfee7c2ac453f4801","url":"js/_plugin-vue_export-helper-DlAUqK2U.js"},{"revision":"f7e1ae95fbfc3605b7cac9f460bae0f1","url":"js/AboutMePage-s7ScVt9b.js"},{"revision":"07ee6ea5522d7bf3d8c260dfa9c61d51","url":"js/index-Bys5My-t.js"},{"revision":"822d2e77b9c8d55b3e20893e6a1e84b8","url":"js/index-f1g9dClV.js"},{"revision":"e53d6e8786428c7b90e15e2e863c57fc","url":"js/main-DA516VfZ.js"},{"revision":"3f94b132ef642f9a2e1530be8941c6f6","url":"js/pinia-D15VhbaU.js"},{"revision":"491a6a78c0cf3b09018d450d08d19d22","url":"js/projects/averageExchangeRate-CS6935H4.js"},{"revision":"d6a0a2cdbaa93c655287f7628fa8380c","url":"js/projects/bestMileageCards-CWCaKJ9d.js"},{"revision":"8fb9c83d7e694ec0753ad53d4e8ecb45","url":"js/ProjectsPage-Bz1JsKRu.js"},{"revision":"427c05b2706ed1ca241ed5e87aecf2f8","url":"js/ResumePage-Dh788U12.js"},{"revision":"ef170f83a1e90e34e674ca04b96ff43d","url":"js/sorts-BPW8KRTv.js"},{"revision":"4c20c5d45e31f974ded5321b5dbdc1e7","url":"js/StorageManager-Br6xOBCX.js"},{"revision":"92a1e6036fddae1833a8e04a2fa9def0","url":"projects.html"},{"revision":"f4a619bc451fd368ee9281d3eaf869cb","url":"projects/averageExchangeRate.html"},{"revision":"050fc9ab30f3cf26d331a30b49df9cff","url":"projects/bestMileageCards.html"},{"revision":"1872c500de691dce40960bb85481de07","url":"registerSW.js"},{"revision":"92a1e6036fddae1833a8e04a2fa9def0","url":"resume.html"}].map(t=>{const i=typeof t=="string"?t:t.url;return new URL(i,self.location.origin).pathname}).includes(n.pathname)});
//# sourceMappingURL=sw.js.map
