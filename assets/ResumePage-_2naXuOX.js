import{d as m,s as g,e as k,o as e,c as n,b as s,t as c,n as u,u as r,g as y,F as b,r as x,f as T,h as f}from"./main-BXdPycGU.js";import{_ as L}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v={class:"text-1.5rem text-emphasis"},j={style:{color:"#666"}},A={key:0,class:"opacity-50 border-deep-primary border-t-2px"},C=["innerHTML"],M=m({__name:"ResumeCard",props:{startMonth:{},endMonth:{default:null},title:{},subTitle:{},description:{}},setup(_){const{isDesktop:l,isMobile:a}=g(k());return(i,p)=>(e(),n("div",{class:u({"min-h-300px":r(l),"flex-col gap-8px":r(a)})},[s("div",{class:u(["flex-col",{"w-40% py-32px gap-16px":r(l),"gap-4px":r(a)}])},[s("p",v,c(i.startMonth)+" ~ "+c(i.endMonth??""),1),s("p",null,c(i.title),1),s("p",j,c(i.subTitle),1)],2),r(a)?(e(),n("hr",A)):y("",!0),s("div",{class:u([{"w-60% py-32px pl-16px":r(l)},"text-0.9rem line-height-180%"]),innerHTML:i.description},null,10,C)],2))}}),D={class:"min-h-300px flex-col"},B={class:"text-1.4rem font-700"},E={class:"text-1.2rem inline"},R=m({__name:"SkillGroupCard",props:{list:{}},setup(_){const{isDesktop:l,isMobile:a}=g(k());return(i,p)=>(e(),n("div",D,[(e(!0),n(b,null,x(i.list,({title:h,skills:o},t)=>(e(),n("div",{key:t,class:u(["flex-col",{"gap-16px p-20px":r(l),"gap-8px py-10px":r(a)}])},[s("p",B,c(h),1),s("div",{class:u(["grid",{"grid-cols-2 gap-16px":r(l),"gap-12px":r(a)}])},[(e(!0),n(b,null,x(o,(d,S)=>(e(),n("div",{key:S,class:"flex items-center"},[p[0]||(p[0]=s("i",{class:"text-emphasis text-1rem fas fa-chevron-right mr-16px"},null,-1)),s("p",E,c(d),1)]))),128))],2)],2))),128))]))}}),V={class:"relative flex-center flex-col px-24px gap-24px py-32px"},G=m({__name:"ResumePage",setup(_){const l=[{startMonth:"2019/04",endMonth:"2020/05",title:"後端工程師",subTitle:"凱茂股份有限公司",description:"開發公司產品 - 人資系統<br/><br/>前後端系統開發，<br/>前端利用 Vue.js 搭配 Vuex 進行開發，<br/>後端用 Adonis.js 搭配 PostgreSQL 開發，<br/>同時使用 GraphGL 做前後端串接。"},{startMonth:"2020/05",endMonth:"2021/08",title:"軟體設計師",subTitle:"北祥科技服務股份有限公司",description:"依照客戶需求進行系統串接，<br/>同時用 Express.js 開發 ChatBot，<br/>任職期間協助部門進行 Socket 系統重構，<br/>並且協助導入編譯、 log 記錄，<br/>與設計專案範本供部門使用。"},{startMonth:"2021/09",endMonth:null,title:"全端工程師",subTitle:"愛進化科技股份有限公司",description:"開發個人化手機殼網頁"}],a=[{startMonth:"2014/09",endMonth:"2018/07",title:"資訊管理系",subTitle:"國立高雄科技大學",description:"比賽經歷：<br/><br/>2017/12/08<br/>資管系專題發表競賽 優勝<br/><br/>2017/10/24<br/>2017 搶鮮大賽 優選<br/><br/>2017/02/17 ~ 19<br/>SIGFOX 物聯網駭客松 首獎"}],i=[{title:"前端",skills:["HTML","JavaScript","Vue.js","Vuex","Nuxt.js","SCSS","Webpack","gulp.js"]},{title:"後端",skills:["Linux","Node.js","TypeScript","Deno","Express.js","Adonis.js","Socket.io","Nginx","Docker","Ansible","GraphQL","RESTful","WebSocket","MQTT"]},{title:"資料庫",skills:["MySQL","PostgreSQL","Redis","MongoDB","CouchDB"]},{title:"設計",skills:["Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Adobe After Effects","Figma"]}];function p(h){return h.sort((o,t)=>o.startMonth>t.startMonth?-1:1)}return(h,o)=>(e(),n("section",V,[o[0]||(o[0]=s("p",{class:"card-title"},"Experience",-1)),(e(!0),n(b,null,x(p(l),(t,d)=>(e(),f(M,{key:d,"start-month":t.startMonth,"end-month":t.endMonth,title:t.title,"sub-title":t.subTitle,description:t.description,class:"card"},null,8,["start-month","end-month","title","sub-title","description"]))),128)),o[1]||(o[1]=s("p",{class:"card-title"},"Education",-1)),(e(!0),n(b,null,x(p(a),(t,d)=>(e(),f(M,{key:d,"start-month":t.startMonth,"end-month":t.endMonth,title:t.title,"sub-title":t.subTitle,description:t.description,class:"card"},null,8,["start-month","end-month","title","sub-title","description"]))),128)),o[2]||(o[2]=s("p",{class:"card-title"},"Professional Skills",-1)),T(R,{list:i,class:"card"})]))}}),$=L(G,[["__scopeId","data-v-b1068ae7"]]);export{$ as default};
