import{d as o,g as t,j as r,k as s,t as l,y as a,F as d,l as h,u as b,v as g}from"./index-Bys5My-t.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={class:"flex-col items-center gap-8px"},m={class:"w-full"},_=["innerHTML"],v=["href"],k=["src"],f={key:0},x=["href"],y=o({__name:"ProjectCard",props:{description:{},image:{},previewUrl:{},link:{},deprecated:{type:Boolean}},setup(n){return(e,p)=>(t(),r("div",w,[s("div",m,[s("div",{innerHTML:e.description},null,8,_),e.link!==null?(t(),r("a",{key:0,target:"_blank",href:e.link.url,class:"text-emphasis decoration-underline"},l(e.link.title),9,v)):a("",!0)]),s("img",{src:e.image,class:"max-h-250px",alt:"preview-image"},null,8,k),e.deprecated?(t(),r("p",f,"Deprecated")):e.previewUrl!==null?(t(),r("a",{key:1,target:"_blank",href:e.previewUrl,class:"text-emphasis decoration-underline"}," Preview ",8,x)):a("",!0)]))}}),j=[{description:"幫助快速查詢與比較各種信用卡的哩程轉換回饋率，並根據不同的消費情境推薦最佳的回饋方案",image:"/website/best-mileage-cards-preview.webp",previewUrl:"https://chi0307.github.io/projects/bestMileageCards"},{description:"幫助紀錄每次外幣購買的匯率與金額，並考慮實際使用掉的外幣量後，計算剩餘外幣的平均購買匯率",image:"/website/average-exchange-rate-preview.webp",previewUrl:"https://chi0307.github.io/projects/averageExchangeRate"},{description:"開發一個 FB、Line 訊息共用的套件，<br/>搭配使用畫面產生 JSON 結構",image:"/website/chatbot-json-toolbox-preview.webp",previewUrl:"https://chi0307.github.io/website-legacy-by-2024-10/side/chatbot-json-toolbox/",link:{title:"套件",url:"https://www.npmjs.com/package/@chi0307/transform-chatbot-message"}},{description:"簡單的一個 chatbot 呈現畫面，<br/>嘗試用 PWA、Vue 3.0、TS 開發，<br/>目前僅用假資料，無串接後台。",image:"/website/chatbot-preview.webp",previewUrl:"https://chi0307.github.io/chatbot/",deprecated:!0},{description:"一個簡單的娛樂用 line bot<br/>嘗試串接 Google TTS、Google STT、Google Map<br/>部署在 heroku",image:"/website/linebot-preview.webp",previewUrl:"https://line.me/R/ti/p/%40tyo2763z",deprecated:!0}],U={class:"relative flex-center flex-col px-24px gap-24px py-32px"},P=o({__name:"ProjectsPage",setup(n){return(e,p)=>(t(),r("section",U,[(t(!0),r(d,null,h(b(j),(i,c)=>(t(),g(y,{key:c,class:"card",description:i.description,image:i.image,"preview-url":i.previewUrl,link:i.link??null,deprecated:i.deprecated??!1},null,8,["description","image","preview-url","link","deprecated"]))),128))]))}}),S=u(P,[["__scopeId","data-v-bbe4143a"]]);export{S as default};
//# sourceMappingURL=ProjectsPage-Bz1JsKRu.js.map
