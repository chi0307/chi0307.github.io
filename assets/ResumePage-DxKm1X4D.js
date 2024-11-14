import{d as m,t as y,s as M,e as S,o as e,c as l,b as r,g as p,u as t,n as u,h as T,F as x,r as b,f as v,i as g}from"./main-DAF4Yoe4.js";import{_ as L}from"./_plugin-vue_export-helper-DlAUqK2U.js";const j={class:"text-1.5rem text-emphasis"},A={style:{color:"#666"}},C={key:0,class:"opacity-50 border-deep-primary border-t-2px"},D=["innerHTML"],k=m({__name:"ResumeCard",props:{data:{}},setup(_){const{startMonth:n,endMonth:a,title:s,subTitle:o,description:i}=y(_.data),{isDesktop:c,isMobile:d}=M(S());return(h,f)=>(e(),l("div",{class:u({"min-h-300px":t(c),"flex-col gap-8px":t(d)})},[r("div",{class:u(["flex-col",{"w-40% py-32px gap-16px":t(c),"gap-4px":t(d)}])},[r("p",j,p(t(n))+" ~ "+p(t(a)??""),1),r("p",null,p(t(s)),1),r("p",A,p(t(o)),1)],2),t(d)?(e(),l("hr",C)):T("",!0),r("div",{class:u([{"w-60% py-32px pl-16px":t(c)},"text-0.9rem line-height-180%"]),innerHTML:t(i)},null,10,D)],2))}}),E={class:"min-h-300px flex-col"},R={class:"text-1.4rem font-700"},B={class:"text-1.2rem inline"},V=m({__name:"SkillGroupCard",props:{list:{}},setup(_){const{isDesktop:n,isMobile:a}=M(S());return(s,o)=>(e(),l("div",E,[(e(!0),l(x,null,b(s.list,({title:i,skills:c},d)=>(e(),l("div",{key:d,class:u(["flex-col",{"gap-16px p-20px":t(n),"gap-8px py-10px":t(a)}])},[r("p",R,p(i),1),r("div",{class:u(["grid",{"grid-cols-2 gap-16px":t(n),"gap-12px":t(a)}])},[(e(!0),l(x,null,b(c,(h,f)=>(e(),l("div",{key:f,class:"flex items-center"},[o[0]||(o[0]=r("i",{class:"text-emphasis text-1rem fas fa-chevron-right mr-16px"},null,-1)),r("p",B,p(h),1)]))),128))],2)],2))),128))]))}}),G=[{startMonth:"2014/09",endMonth:"2018/07",title:"資訊管理系",subTitle:"國立高雄科技大學",description:"比賽經歷：<br/><br/>2017/12/08<br/>資管系專題發表競賽 優勝<br/><br/>2017/10/24<br/>2017 搶鮮大賽 優選<br/><br/>2017/02/17 ~ 19<br/>SIGFOX 物聯網駭客松 首獎"}],N=[{title:"前端",skills:["HTML","JavaScript","Vue.js","Vuex","Nuxt.js","SCSS","Webpack","gulp.js"]},{title:"後端",skills:["Linux","Node.js","TypeScript","Deno","Express.js","Adonis.js","Socket.io","Nginx","Docker","Ansible","GraphQL","RESTful","WebSocket","MQTT"]},{title:"資料庫",skills:["MySQL","PostgreSQL","Redis","MongoDB","CouchDB"]},{title:"設計",skills:["Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Adobe After Effects","Figma"]}],P=[{startMonth:"2019/04",endMonth:"2020/05",title:"後端工程師",subTitle:"凱茂股份有限公司",description:"開發公司產品 - 人資系統<br/><br/>前後端系統開發，<br/>前端利用 Vue.js 搭配 Vuex 進行開發，<br/>後端用 Adonis.js 搭配 PostgreSQL 開發，<br/>同時使用 GraphGL 做前後端串接。"},{startMonth:"2020/05",endMonth:"2021/08",title:"軟體設計師",subTitle:"北祥科技服務股份有限公司",description:"依照客戶需求進行系統串接，<br/>同時用 Express.js 開發 ChatBot，<br/>任職期間協助部門進行 Socket 系統重構，<br/>並且協助導入編譯、 log 記錄，<br/>與設計專案範本供部門使用。"},{startMonth:"2021/09",endMonth:null,title:"全端工程師",subTitle:"愛進化科技股份有限公司",description:"開發個人化手機殼網頁"}],$={class:"relative flex-center flex-col px-24px gap-24px py-32px"},Q=m({__name:"ResumePage",setup(_){function n(a){return a.sort((s,o)=>s.startMonth>o.startMonth?-1:1)}return(a,s)=>(e(),l("section",$,[s[0]||(s[0]=r("p",{class:"card-title"},"Work Experiences",-1)),(e(!0),l(x,null,b(n(t(P)),(o,i)=>(e(),g(k,{key:i,data:o,class:"card"},null,8,["data"]))),128)),s[1]||(s[1]=r("p",{class:"card-title"},"Educations",-1)),(e(!0),l(x,null,b(n(t(G)),(o,i)=>(e(),g(k,{key:i,data:o,class:"card"},null,8,["data"]))),128)),s[2]||(s[2]=r("p",{class:"card-title"},"Professional Skills",-1)),v(V,{list:t(N),class:"card"},null,8,["list"])]))}}),w=L(Q,[["__scopeId","data-v-2d151426"]]);export{w as default};
