import{d as s,o as t,c as r,b as o,t as c,g as p,F as d,r as u,u as g,h}from"./main-BO__8yvM.js";import{_}from"./_plugin-vue_export-helper-DlAUqK2U.js";const m={class:"flex-col items-center gap-8px"},b={class:"w-full"},k=["innerHTML"],v=["href"],w=["src"],f=s({__name:"ProjectCard",props:{description:{},image:{},previewUrl:{},link:{}},setup(n){return(e,a)=>(t(),r("div",m,[o("div",b,[o("div",{innerHTML:e.description},null,8,k),e.link!==null?(t(),r("a",{key:0,href:e.link.url,class:"text-emphasis decoration-underline"},c(e.link.title),9,v)):p("",!0)]),o("img",{src:e.image,alt:"preview-image"},null,8,w)]))}}),x=[{description:"開發一個 FB、Line 訊息共用的套件，<br/>搭配使用畫面產生 JSON 結構",image:"/chatbot-json-toolbox-preview.png",previewUrl:"https://chi0307.github.io/website-legacy-by-2024-10/side/chatbot-json-toolbox/",link:{title:"套件",url:"https://www.npmjs.com/package/@chi0307/transform-chatbot-message"}},{description:"簡單的一個 chatbot 呈現畫面，<br/>嘗試用 PWA、Vue 3.0、TS 開發，<br/>目前僅用假資料，無串接後台。",image:"/chatbot-preview.png",previewUrl:"https://chi0307.github.io/chatbot",link:null},{description:"一個簡單的娛樂用 line bot<br/>嘗試串接 Google TTS、Google STT、Google Map<br/>部署在 heroku",image:"/linebot-preview.png",previewUrl:"https://line.me/R/ti/p/%40tyo2763z",link:null}],j={class:"relative flex-center flex-col px-24px gap-24px py-32px"},y=s({__name:"ProjectsPage",setup(n){return(e,a)=>(t(),r("section",j,[(t(!0),r(d,null,u(g(x),(i,l)=>(t(),h(f,{key:l,class:"card",description:i.description,image:i.image,"preview-url":i.previewUrl,link:i.link},null,8,["description","image","preview-url","link"]))),128))]))}}),B=_(y,[["__scopeId","data-v-95b9cbb9"]]);export{B as default};
