import{s as g}from"./pinia-DtDWW4vp.js";import{u as M}from"./main-bcC2c0HN.js";import{d as k,g as o,j as i,k as s,m as p,u as e,t as a,y as v,F as c,l as d,D as h,x as j,v as f}from"./index-BrJnCGGl.js";import{b as S}from"./sorts-DmEn6gXZ.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";const L={class:"text-1.5rem text-emphasis"},E={style:{color:"#666"}},D={key:0,class:"opacity-50 border-deep-primary border-t-2px"},N={class:"font-bold"},b=k({__name:"ResumeCard",props:{startMonth:{},endMonth:{},title:{},subTitle:{},descriptions:{},techStacks:{}},setup(m){const{isDesktop:n,isMobile:l}=g(M());return(t,r)=>(o(),i("div",{class:p(["flex flex-col gap-16px justify-between",{"min-h-300px":e(n)}])},[s("div",{class:p(["flex",{"flex-col gap-8px":e(l),"mt-16px":e(n)}])},[s("div",{class:p(["flex-col",{"w-40% gap-16px":e(n),"gap-4px":e(l)}])},[s("p",L,a(t.startMonth)+" ~ "+a(t.endMonth??""),1),s("p",null,a(t.title),1),s("p",E,a(t.subTitle),1)],2),e(l)?(o(),i("hr",D)):v("",!0),s("div",{class:p([{"w-60% pl-16px":e(n)},"flex-col gap-16px text-0.9rem"])},[(o(!0),i(c,null,d(t.descriptions,(u,x)=>(o(),i("div",{key:x},[s("p",N,a(u.title),1),h(" "+a(u.text),1)]))),128))],2)],2),s("p",{class:p(["opacity-50 text-0.8rem",{"mb-16px":e(n)}])},[r[0]||(r[0]=h(" 技術組合: ")),r[1]||(r[1]=s("br",null,null,-1)),h(a(t.techStacks.join(", ")),1)],2)],2))}}),P={class:"flex-col min-h-300px"},Q={class:"text-1.4rem font-700"},V={class:"text-1.2rem inline"},B=k({__name:"SkillGroupCard",props:{list:{}},setup(m){const{isDesktop:n,isMobile:l}=g(M());return(t,r)=>(o(),i("div",P,[(o(!0),i(c,null,d(t.list,({title:u,skills:x},_)=>(o(),i("div",{key:_,class:p(["flex-col",{"gap-16px p-20px":e(n),"gap-8px py-10px":e(l)}])},[s("p",Q,a(u),1),s("div",{class:p(["grid",{"grid-cols-2 gap-16px":e(n),"gap-12px":e(l)}])},[(o(!0),i(c,null,d(x,(y,T)=>(o(),i("div",{key:T,class:"flex items-center"},[r[0]||(r[0]=s("i",{class:"text-emphasis text-1rem fas fa-chevron-right mr-16px"},null,-1)),s("p",V,a(y),1)]))),128))],2)],2))),128))]))}}),C=[{startMonth:"2014/09",endMonth:"2018/07",title:"資訊管理系",subTitle:"國立高雄科技大學",descriptions:[{title:"2017/12/08",text:"資管系專題發表競賽 優勝"},{title:"2017/10/24",text:"2017 搶鮮大賽 優選"},{title:"2017/02/17-19",text:"SIGFOX 物聯網駭客松 首獎"}],techStacks:["Express.js","Node.js","HTML","JavaScript","RESTful","MySQL","React Native","Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Adobe After Effects"]}],R=[{title:"前端",skills:["HTML","Vue.js","SCSS","Vite"]},{title:"後端",skills:["Linux","Node.js","TypeScript","Deno","Socket.io","Nginx","Docker","Ansible","GraphQL","RESTful","WebSocket","MQTT"]},{title:"資料庫",skills:["MySQL","PostgreSQL","Redis","MongoDB"]},{title:"設計",skills:["Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Adobe After Effects"]}],G=[{startMonth:"2019/04",endMonth:"2020/05",title:"後端工程師",subTitle:"凱茂股份有限公司",techStacks:["vue2","Adonis.js","Nuxt.js","Vuex","Ansible","Nginx","PostgreSQL","Apollo GraphQL","Docker"],descriptions:[{title:"開發公司核心產品",text:"公司人資系統的全端開發，系統設計與功能實現"},{title:"前端開發",text:"使用 Vue.js 和 Vuex 建構前台、後台介面，供企業與一般使用者使用"},{title:"後端開發",text:"採用 Adonis.js 搭配 PostgreSQL 設計並開發高效穩定的資料存取與處理模組"},{title:"前後端串接",text:"運用 GraphQL 實現資料流暢通訊，確保資料傳輸效率與一致性"}]},{startMonth:"2020/05",endMonth:"2021/08",title:"軟體設計師",subTitle:"北祥科技服務股份有限公司",techStacks:["Pug","Ejs","gulp.js","Webpack","Socket.io","Express.js","MQTT","WebSocket","Redis","MySQL","MongoDB","CouchDB"],descriptions:[{title:"客製化系統整合",text:"根據客戶需求，設計並完成系統串接方案，確保功能符合要求並穩定運行"},{title:"ChatBot 開發",text:"使用 Express.js 開發智能對話機器人，提升企業消費者自助服務能力與效率"},{title:"Socket 系統重構",text:"優化企業的 Socket 通訊架構，改善系統效能與穩定性"},{title:"技術導入與最佳實踐",text:"協助部門導入 gulp.js, Webpack 編譯工具與日誌記錄系統，提升開發效率及問題追蹤能力"},{title:"專案範本設計",text:"開發標準化專案範本，提升部門開發一致性，並降低新人學習曲線"}]},{startMonth:"2021/09",endMonth:null,title:"資深工程師",subTitle:"愛進化科技股份有限公司",techStacks:["vue3","TypeScript","Pinia","UnoCSS","Eslint","villus","Vite","Prisma","NestJS"],descriptions:[{title:"重構與維運舊系統",text:"負責舊版個人化網頁的重構與維運，提升系統的穩定性與可維護性"},{title:"新專案流程規劃與開發",text:"協助公司新專案開發，打通從網頁端到出貨端的完整流程，確保系統順暢運行"},{title:"跨部門需求整合",text:"主動協調設計、工程、營運等部門，釐清需求並提供技術解決方案，確保各部門目標一致，推動專案順利進行"}]}],I={class:"relative flex-center flex-col px-24px gap-24px py-32px"},$=k({__name:"ResumePage",setup(m){return(n,l)=>(o(),i("section",I,[l[0]||(l[0]=s("p",{class:"card-title"},"Work Experiences",-1)),(o(!0),i(c,null,d(e(S)(e(G),"startMonth","desc"),(t,r)=>(o(),f(b,{key:r,"start-month":t.startMonth,"end-month":t.endMonth,title:t.title,"sub-title":t.subTitle,descriptions:t.descriptions,"tech-stacks":t.techStacks,class:"card"},null,8,["start-month","end-month","title","sub-title","descriptions","tech-stacks"]))),128)),l[1]||(l[1]=s("p",{class:"card-title"},"Educations",-1)),(o(!0),i(c,null,d(e(S)(e(C),"startMonth","desc"),(t,r)=>(o(),f(b,{key:r,"start-month":t.startMonth,"end-month":t.endMonth,title:t.title,"sub-title":t.subTitle,descriptions:t.descriptions,"tech-stacks":t.techStacks,class:"card"},null,8,["start-month","end-month","title","sub-title","descriptions","tech-stacks"]))),128)),l[2]||(l[2]=s("p",{class:"card-title"},"Professional Skills",-1)),j(B,{list:e(R),class:"card"},null,8,["list"])]))}}),z=A($,[["__scopeId","data-v-4aa574d9"]]);export{z as default};
//# sourceMappingURL=ResumePage-90RTM8rt.js.map