import{d as p,t as _,o as t,c as o,b as i,u as e,g as h,h as l,F as u,r as m,i as g}from"./main-B8-krk9f.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";const f={class:"flex-col items-center gap-8px"},x={class:"w-full"},k=["innerHTML"],v=["href"],w=["src"],y={key:0},j=["href"],P=p({__name:"ProjectCard",props:{data:{}},setup(n){const{description:c,previewUrl:s,link:r,image:a,deprecated:d}=_(n.data);return(L,U)=>(t(),o("div",f,[i("div",x,[i("div",{innerHTML:e(c)},null,8,k),e(r)!==null?(t(),o("a",{key:0,target:"_blank",href:e(r).url,class:"text-emphasis decoration-underline"},h(e(r).title),9,v)):l("",!0)]),i("img",{src:e(a),alt:"preview-image"},null,8,w),e(d)?(t(),o("p",y,"Deprecated")):e(s)!==null?(t(),o("a",{key:1,target:"_blank",href:e(s),class:"text-emphasis decoration-underline"}," Preview ",8,j)):l("",!0)]))}}),T=[{description:"開發一個 FB、Line 訊息共用的套件，<br/>搭配使用畫面產生 JSON 結構",image:"/chatbot-json-toolbox-preview.png",previewUrl:"https://chi0307.github.io/website-legacy-by-2024-10/side/chatbot-json-toolbox/",link:{title:"套件",url:"https://www.npmjs.com/package/@chi0307/transform-chatbot-message"}},{description:"簡單的一個 chatbot 呈現畫面，<br/>嘗試用 PWA、Vue 3.0、TS 開發，<br/>目前僅用假資料，無串接後台。",image:"/chatbot-preview.png",previewUrl:"https://chi0307.github.io/chatbot",link:null},{description:"一個簡單的娛樂用 line bot<br/>嘗試串接 Google TTS、Google STT、Google Map<br/>部署在 heroku",image:"/linebot-preview.png",previewUrl:"https://line.me/R/ti/p/%40tyo2763z",link:null,deprecated:!0}],B={class:"relative flex-center flex-col px-24px gap-24px py-32px"},S=p({__name:"ProjectsPage",setup(n){return(c,s)=>(t(),o("section",B,[(t(!0),o(u,null,m(e(T),(r,a)=>(t(),g(P,{key:a,class:"card",data:r},null,8,["data"]))),128))]))}}),G=b(S,[["__scopeId","data-v-7c3873ec"]]);export{G as default};