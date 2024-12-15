var me=Object.defineProperty;var ue=(o,t,a)=>t in o?me(o,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[t]=a;var u=(o,t,a)=>ue(o,typeof t!="symbol"?t+"":t,a);import{o as ye,b,c as Y,f as G,d as Z,B as _,g as v,j as U,k as A,x as P,C,u as f,e as te,F as $,l as j,v as V,D as se,t as N,y as Pe,m as he,K as _e,E as ge,A as we}from"../index-Cw0h8tbD.js";import{d as Ae,s as ne,c as Me}from"../pinia-DMLGGzXO.js";import{C as ve,v as Le}from"../StorageManager-CkDa4NAj.js";import{a as re,b as ae}from"../sorts-BPW8KRTv.js";import{r as fe,b as Q,g as ie,c as Te}from"../index-CZjE7_pj.js";import{_ as q}from"../_plugin-vue_export-helper-DlAUqK2U.js";const M=fe(2);class D{constructor({type:t,name:a,pointsPerMile:s,milesPerUnit:r}){u(this,"_type");u(this,"_name");u(this,"_pointsPerMile");u(this,"_milesPerUnit");this._type=t,this._name=a,this._pointsPerMile=s,this._milesPerUnit=r}get type(){return this._type}get name(){return this._name}_pointsConvertToMiles(t){return t*this._milesPerUnit/this._pointsPerMile}calculateRangeMilesCost(t,a){const s=[];for(let l=t;l<=a;l++){const c=M(l/this.calculateMiles(l));isNaN(c)||c===1/0||c===-1/0||s.push(c)}s.sort((l,c)=>l-c);const r=s[s.length-1],p=s[0];if(r===void 0||p===void 0)throw new Error("cannot be calculated");const i=s.reduce((l,c)=>l+c,0)/s.length;return{max:r,min:p,average:M(i)}}}class be extends D{constructor({pointBackRates:a,...s}){super(s);u(this,"_pointBackRates");this._pointBackRates=a}get _maxRete(){return this._pointBackRates.reduce((a,{rate:s})=>a+s,0)}get baselineCostPerMile(){return M(100/this._pointsConvertToMiles(this._maxRete))}get bestCaseCostPerMile(){return M(Math.ceil(100/this._maxRete/2)/this._pointsConvertToMiles(1))}get maximumCostPerMile(){return M((Math.ceil(150/this._maxRete)-1)/this._pointsConvertToMiles(1))}get description(){return`消費${this._pointBackRates.length>1?"最高":""}${this._maxRete.toString()}%回饋點數(四捨五入)，${this._pointsPerMile.toString()}點兌換${this._milesPerUnit.toString()}哩程`}calculateMiles(a){let s=0;for(const{rate:r,limit:p=1/0}of this._pointBackRates)s+=Math.min(Math.round(a*(r/100)),p);return M(this._pointsConvertToMiles(s))}toJSON(){return{type:this._type,name:this._name,pointsPerMile:this._pointsPerMile,milesPerUnit:this._milesPerUnit,pointBackRates:this._pointBackRates}}}class ke extends D{constructor({pointBackRates:a,...s}){super(s);u(this,"_pointBackRates");this._pointBackRates=a}get _maxRete(){return this._pointBackRates.reduce((a,{rate:s})=>a+s,0)}get baselineCostPerMile(){return M(100/this._pointsConvertToMiles(this._maxRete))}get bestCaseCostPerMile(){return this.baselineCostPerMile}get maximumCostPerMile(){return M((Math.ceil(200/this._maxRete)-1)/this._pointsConvertToMiles(1))}get description(){return`消費${this._pointBackRates.length>1?"最高":""}${this._maxRete.toString()}%回饋點數(無條件捨去)，${this._pointsPerMile.toString()}點兌換${this._milesPerUnit.toString()}哩程`}calculateMiles(a){let s=0;for(const{rate:r,limit:p=1/0}of this._pointBackRates)s+=Math.min(Math.floor(a*(r/100)),p);return M(this._pointsConvertToMiles(s))}toJSON(){return{type:this._type,name:this._name,pointsPerMile:this._pointsPerMile,milesPerUnit:this._milesPerUnit,pointBackRates:this._pointBackRates}}}class Ce extends D{constructor({spendingPerPoint:a,...s}){super(s);u(this,"_spendingPerPoint");this._spendingPerPoint=a}get baselineCostPerMile(){return M(this._spendingPerPoint/this._pointsConvertToMiles(1))}get bestCaseCostPerMile(){return this.baselineCostPerMile}get maximumCostPerMile(){return M((this._spendingPerPoint*2-1)/this._pointsConvertToMiles(1))}get description(){return`每消費${this._spendingPerPoint.toString()}元累積1點，${this._pointsPerMile.toString()}點兌換${this._milesPerUnit.toString()}哩程`}calculateMiles(a){const s=Math.floor(a/this._spendingPerPoint);return M(this._pointsConvertToMiles(s))}toJSON(){return{type:this._type,name:this._name,pointsPerMile:this._pointsPerMile,milesPerUnit:this._milesPerUnit,spendingPerPoint:this._spendingPerPoint}}}class Be extends D{constructor({spendingPerMile:a,...s}){super({...s,pointsPerMile:1,milesPerUnit:1});u(this,"_spendingPerMile");this._spendingPerMile=a}get baselineCostPerMile(){return this._spendingPerMile}get bestCaseCostPerMile(){return this.baselineCostPerMile}get maximumCostPerMile(){return this.baselineCostPerMile}get description(){return`每消費${this._spendingPerMile.toString()}元累積1哩程 (小數會進行累計)`}calculateMiles(a){return M(a/this._spendingPerMile)}toJSON(){return{type:this._type,name:this._name,spendingPerMile:this._spendingPerMile}}}class Re extends D{constructor({spendingPerMile:a,...s}){super({...s,pointsPerMile:1,milesPerUnit:1});u(this,"_spendingPerMile");this._spendingPerMile=a}get baselineCostPerMile(){return this._spendingPerMile}get bestCaseCostPerMile(){return this.baselineCostPerMile}get maximumCostPerMile(){return this._spendingPerMile+this._spendingPerMile-1}get description(){return`每消費${this._spendingPerMile.toString()}元累積1哩程 (小數不累計)`}calculateMiles(a){return Math.floor(a/this._spendingPerMile)}toJSON(){return{type:this._type,name:this._name,spendingPerMile:this._spendingPerMile}}}const Se={RoundedPointsRewardPercentage:be,TruncatedPointsRewardPercentage:ke,PointsRewardThreshold:Ce,DirectMilesAccumulation:Be,RoundedMilesAccumulation:Re};function Ue(o){return new Se[o.type](o)}class xe{constructor(t,a,s){u(this,"_name");u(this,"_rewards");u(this,"_condition");if(this._name=t,this._condition=a,s.length===0)throw new Error(`Plan "${t??"unknown"}" must have at least one reward rule.`);this._rewards=s}get name(){return this._name}get storeList(){return Q(this._rewards.flatMap(t=>[...t.stores]))}checkPlanIsVisible(t){return this._condition===null||!!(t!=null&&t.includes(this._condition))}getApplicableReward({transactionStore:t=null,acceptedPayments:a=[],transactionAttributesType:s,currentConditions:r=null}){return this._condition!==null&&!(r!=null&&r.includes(this._condition))?null:this._rewards.find(({stores:p,payments:i,transactionType:l,paymentBlackList:c,storeBlackList:d,condition:g})=>{const L=t===null||p.size===0||p.has(t),w=t===null||d.size===0||!d.has(t),k=a.length===0||i.size===0||a.some(h=>i.has(h)),e=a.length===0||c.size===0||a.some(h=>!c.has(h)),n=l===null||s===l,m=g===null||!!(r!=null&&r.includes(g));return L&&w&&k&&e&&n&&m})??null}getRewardMiles({transactionStore:t,acceptedPayments:a,amount:s,transactionAttributesType:r,currentConditions:p}){const i=this.getApplicableReward({acceptedPayments:a,transactionStore:t,transactionAttributesType:r,currentConditions:p});if(i===null)return null;const l=a===void 0?[...i.payments.values()]:a.filter(c=>i.payments.has(c));return{name:i.reward.name,miles:i.reward.calculateMiles(s),payments:l.filter(c=>!i.paymentBlackList.has(c))}}toJSON(){return{name:this._name,condition:this._condition,rewards:this._rewards.map(({reward:t,stores:a,payments:s,transactionType:r,paymentBlackList:p,storeBlackList:i,condition:l})=>({reward:t.toJSON(),stores:[...a.values()],storeBlackList:[...i.values()],payments:[...s.values()],paymentBlackList:[...p.values()],transactionType:r,condition:l}))}}}const Ee=["信用卡","Apple Pay","Samsung Pay","Google Pay","Line Pay","Fitbit Pay","Garmin Pay","Hami Pay","街口支付","全盈+PAY","全支付","Pi錢包","橘子支付","歐付寶","icash pay","OPEN錢包","My FamiPay","悠遊付","ezPay","GOMAJI Pay","friday wallet","PayPal","PX Pay","中油Pay","台灣Pay","支付寶"],Oe={SJX:"星宇航空",EVA:"長榮航空",ANA:"全日空",JAL:"日航",CPA:"國泰航空",CAL:"華航"};class oe{constructor({name:t,description:a,plans:s,storeBlackList:r,paymentBlackList:p,cardUrl:i,updateAt:l,airLines:c}){u(this,"_selectedPlanId");u(this,"_name");u(this,"_description");u(this,"_plans");u(this,"_cardUrl");u(this,"_storeBlackList");u(this,"_paymentBlackList");u(this,"_updateAt");u(this,"_airLines");this._name=t,this._description=a,this._plans=s,this._cardUrl=i,this._storeBlackList=r,this._paymentBlackList=p,this._updateAt=l,this._airLines=c;const d=this._plans.keys().next().value;if(this._plans.size===0||d===void 0)throw new Error("this credit card no any plan");this._selectedPlanId=d}get airLines(){return Oe[this._airLines]}get airLinesCode(){return this._airLines}get selectedPlan(){return this._getPlan(this._selectedPlanId)}get name(){return this._name}get description(){return this._description}get selectedPlanId(){return this._selectedPlanId}get selectablePlan(){return[...this._plans.entries()].map(([t,{name:a}])=>({id:t,name:a}))}get storeList(){return Q([...[...this._plans.values()].flatMap(t=>t.storeList),...this._storeBlackList])}get cardUrl(){return this._cardUrl}updatePlan(t){return this._plans.get(t)?(this._selectedPlanId=t,!0):!1}_getPlan(t){const a=this._plans.get(t);if(a===void 0)throw new Error(`plan id ${t} not found. Available plans: ${[...this._plans.keys()].join(", ")}`);return a}_rewardMilesWithPlan(t,a){var c;const s=this._getPlan(t),r={planId:null,planName:s.name,name:null,miles:0,payments:[]},p=a.transactionStore!==void 0&&this._storeBlackList.has(a.transactionStore),i=(c=a.acceptedPayments)==null?void 0:c.some(d=>this._paymentBlackList.has(d));if(p||i)return r;const l=s.getRewardMiles(a);return l===null?r:{planId:t,planName:s.name,...l}}currentPlanRewardMiles(t){return this._rewardMilesWithPlan(this._selectedPlanId,t)}getAllPlanRewardMiles(t){return[...this._plans.keys()].filter(a=>this._getPlan(a).checkPlanIsVisible(t.currentConditions??null)).map(a=>this._rewardMilesWithPlan(a,t))}toJSON(){return{name:this._name,description:this._description,cardUrl:this._cardUrl,storeBlackList:[...this._storeBlackList.values()],paymentBlackList:[...this._paymentBlackList.values()],plans:[...this._plans.values()].map(t=>t.toJSON()),updateAt:this._updateAt.toISOString(),airLines:this._airLines}}}function Ie({name:o,description:t,storeBlackList:a,paymentBlackList:s,cardUrl:r,plans:p,updateAt:i,airLines:l}){const c=new Map(p.map(({name:d,condition:g,rewards:L})=>[ie(),new xe(d,g??null,L.map(({stores:w,payments:k,transactionType:e,reward:n,paymentBlackList:m,storeBlackList:h,condition:T})=>({reward:Ue(n),stores:new Set(w),storeBlackList:new Set(h),payments:new Set(k),paymentBlackList:new Set(m),transactionType:e??null,condition:T??null})))]));return new oe({name:o,description:t,plans:c,storeBlackList:new Set(a),paymentBlackList:new Set(s),cardUrl:r,updateAt:new Date(i),airLines:l})}const E=["分期付款"],O=[],z=["信用卡","Apple Pay","Samsung Pay","Google Pay","Fitbit Pay","Garmin Pay","Hami Pay"];function I(o,t,a){const s={reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:.3}],pointsPerMile:t,milesPerUnit:a}};return[{name:"集精選",rewards:[{reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:2}],pointsPerMile:t,milesPerUnit:a},stores:["家樂福","LOPIA台灣","全聯福利中心","台灣中油-直營站","7-ELEVEN","全家便利商店","IKEA宜家家居"],payments:[...z,"PX Pay","My FamiPay","OPEN錢包"]},s]},{name:"玩數位",rewards:[{reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:o}],pointsPerMile:t,milesPerUnit:a},stores:["App Store","Apple Music","iCloud","Apple TV+","Apple Arcade","Apple One","iTunes","Google Play","Disney+","Netflix","Spotify","KKBOX","YouTube Premium","蝦皮購物","momo購物網","PChome 24h購物(不含儲值及電子票券)","博客來","小樹購","Coupang 酷澎(台灣)","淘寶/天貓"],paymentBlackList:["Line Pay","街口支付"]},{...s,storeBlackList:["全聯福利中心"]}]},{name:"樂饗購",rewards:[{reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:o}],pointsPerMile:t,milesPerUnit:a},stores:["遠東SOGO百貨","遠東Garden City","太平洋百貨","新光三越","SKM Park","BELLAVITA","微風廣場","遠東百貨","Big City遠東巨城購物中心","誠品生活","環球購物中心","CITYLINK","統一時代","台北101","ATT 4 FUN","明曜百貨","京站","美麗華","大葉高島屋","比漾廣場","大江國際購物中心","中友百貨","廣三SOGO","Tiger City","勤美誠品綠園道","大魯閣新時代","耐斯廣場","南紡購物中心","夢時代","漢神百貨","漢神巨蛋","MITSUI OUTLET PARK 林口","MITSUI OUTLET PARK 台中港","MITSUI OUTLET PARK 台南","Mitsui Shopping Park LaLaport 台中","義大世界購物廣場","華泰名品城","義享天地","麗寶OUTLET Mall","秀泰生活","台茂購物中心","新月廣場","三創生活","宏匯廣場","高雄棧貳庫/大港倉","NOKE忠泰樂生活","Uber Eats (不含 Uber One)","foodpanda","foodomo","國內餐飲(不含餐券)","麥當勞","康是美","屈臣氏"],payments:z},{...s,storeBlackList:["全聯福利中心"]}]},{name:"趣旅行",rewards:[{reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:o}],pointsPerMile:t,milesPerUnit:a},stores:["海外實體消費","東京迪士尼樂園","東京華納兄弟哈利波特影城","大阪環球影城(USJ)","吉卜力公園","Apple Wallet SUICA","Apple Wallet PASMO","Apple Wallet ICOCA","Uber","Grab","台灣高鐵","yoxi","台灣大車隊","iRent","和運租車","格上租車","中華航空","長榮航空","星宇航空","台灣虎航","國泰航空","樂桃航空","阿聯酋航空","酷航","捷星航空","日本航空","亞洲航空","聯合航空","ANA全日空","新加坡航空","越捷航空","大韓航空","達美航空","土耳其航空","卡達航空","法國航空","國內飯店住宿","星野集團","全球迪士尼飯店","東橫INN","KKday","Agoda","Klook","Airbnb","Hotels.com","Expedia","Booking.com","Trip.com","AsiaYo","ezTravel易遊網","雄獅旅遊","可樂旅遊","東南旅遊","五福旅遊","燦星旅遊","山富旅遊","長汎假期","鳳凰旅行社","Ezfly易飛網","理想旅遊","永利旅行社","三賀旅行社","173WIFI","JetFi mobile","威訊 WaySim","AIRSIM","SIM88"],payments:z},{...s,storeBlackList:["全聯福利中心"]}]},{name:"來支付",rewards:[{reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:2}],pointsPerMile:t,milesPerUnit:a},payments:["Line Pay"]},{...s,storeBlackList:["全聯福利中心"]}]},{name:"慶生月",condition:"Birthday",rewards:[{reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:10}],pointsPerMile:t,milesPerUnit:a},stores:["東京迪士尼樂園","大阪環球影城(USJ)","名古屋樂高樂園","紅葉蛋糕官方網站","法朋烘焙甜點坊","興波咖啡 華山旗艦店","海底撈火鍋","輕井澤鍋物","老四川巴蜀麻辣燙","二本松涮涮屋","橋山.壽喜燒","Umai屋馬燒肉","老井極上燒肉","燒肉中山(台中大墩)","藏壽司台灣","貳樓","膳馨民間創作料理","馨苑小料理","雅室牛排 仁愛圓環店","ABV餐飲集團","WAT","臺虎精釀(信義 | 西門 | 臺中 | 啜飲室大安)","BAR Bodega","BAR MED","JiN Her 今鶴","錢櫃KTV","好樂迪KTV","星聚點KTV","享溫馨KTV","Nintendo","巴哈姆特動畫瘋","閃動格子CyberCube"]},{reward:{type:"RoundedPointsRewardPercentage",name:null,pointBackRates:[{rate:3.5}],pointsPerMile:t,milesPerUnit:a},stores:["新光三越","Uber Eats (不含 Uber One)","Agoda","Trip.com","Klook","國內飯店住宿","星野集團","全球迪士尼飯店","東橫INN"]},{...s,storeBlackList:["全聯福利中心"]}]}]}const Ne=[{name:"Cube 卡",description:"Cube 卡 (Level 1) 回饋方案",cardUrl:"https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/",storeBlackList:E,paymentBlackList:O,updateAt:"2024-12-01T00:00:00.000Z",airLines:"EVA",plans:I(2,360,1e3)},{name:"Cube 卡",description:"Cube 卡 (Level 2) 回饋方案",cardUrl:"https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/",storeBlackList:E,paymentBlackList:O,updateAt:"2024-12-01T00:00:00.000Z",airLines:"EVA",plans:I(3,360,1e3)},{name:"Cube 卡",description:"Cube 卡 (Level 3) 回饋方案",cardUrl:"https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/",storeBlackList:E,paymentBlackList:O,updateAt:"2024-12-01T00:00:00.000Z",airLines:"EVA",plans:I(3.3,360,1e3)},{name:"Cube 卡",description:"Cube 卡 (Level 1) 回饋方案 + 長榮世界卡",cardUrl:"https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/",storeBlackList:E,paymentBlackList:O,updateAt:"2024-12-01T00:00:00.000Z",airLines:"EVA",plans:I(2,300,1e3)},{name:"Cube 卡",description:"Cube 卡 (Level 2) 回饋方案 + 長榮世界卡",cardUrl:"https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/",storeBlackList:E,paymentBlackList:O,updateAt:"2024-12-01T00:00:00.000Z",airLines:"EVA",plans:I(3,300,1e3)},{name:"Cube 卡",description:"Cube 卡 (Level 3) 回饋方案 + 長榮世界卡",cardUrl:"https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/",storeBlackList:E,paymentBlackList:O,updateAt:"2024-12-01T00:00:00.000Z",airLines:"EVA",plans:I(3.3,300,1e3)}],J=["政府稅款","公共事業代扣繳","交通違規罰鍰","分期付款","全聯福利中心","7-ELEVEN","全家便利商店"],K=[],Ve=[{name:"星宇世界卡",description:"",cardUrl:"https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card",storeBlackList:J,paymentBlackList:K,airLines:"SJX",plans:[{name:null,rewards:[{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:5},transactionType:"Foreign",condition:"Birthday"},{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:10},transactionType:"Foreign"},{reward:{type:"DirectMilesAccumulation",name:"國內消費",spendingPerMile:20},transactionType:"Domestic"}]}],updateAt:new Date("2024/12/01 00:00:00").toISOString()},{name:"星宇商務鈦金卡",description:"",cardUrl:"https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card",storeBlackList:J,paymentBlackList:K,airLines:"SJX",plans:[{name:null,rewards:[{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:7.5},transactionType:"Foreign",condition:"Birthday"},{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:15},transactionType:"Foreign"},{reward:{type:"DirectMilesAccumulation",name:"國內消費",spendingPerMile:25},transactionType:"Domestic"}]}],updateAt:new Date("2024/12/01 00:00:00").toISOString()},{name:"星宇鈦金卡",description:"",cardUrl:"https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card",storeBlackList:J,paymentBlackList:K,airLines:"SJX",plans:[{name:null,rewards:[{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:20},transactionType:"Foreign"},{reward:{type:"DirectMilesAccumulation",name:"國內消費",spendingPerMile:28},transactionType:"Domestic"}]}],updateAt:new Date("2024/12/01 00:00:00").toISOString()}],X=["台灣中油-直營店","台灣大車隊","台鐵","高鐵","UBER","Yoxi","LINEGO","新光三越","遠東百貨","遠東SOGO百貨","誠品生活","漢神百貨","微風廣場","微風信義","微風南京","微風南山","微風台北車站","環球購物中心","台北101","華泰名品城","三井OUTLET","遠東巨城","昇恆昌","夢時代購物中心","京站","美麗華","南紡購物中心","秀泰生活","台茂購物中心","lalaport","統領廣場","采盟","UBEREATS","FOODPANDA","星巴克","EZTABLE","王品瘋美食","摩斯漢堡","FOODOMO","漢來美食","饗Joy","饗食天堂","果然匯","小福利","饗饗","旭集","開飯","饗泰多","真珠","瓦城","非常泰","大心","1010","時時香","BOBO","乾杯集團","路易莎","中華航空","長榮航空","日本航空","台灣虎航","樂桃航空","酷航","立榮航空","華信航空","Agoda","booking.com","Hotels.com","AsiaYo","Expedia","KKday","KLOOK","雄獅旅遊","可樂旅遊","東南旅行社","Apple直營店","小米台灣","全國電子","燦坤","迪卡儂","屈臣氏","康是美","IKEA","特力屋","特力和樂","UNIQLO","NET","大樹藥局","丁丁藥妝","momo購物網","蝦皮購物","淘寶網","Coupang酷澎","東森購物","雅虎奇摩購物中心","博客來","玉山Wallet愛心捐款-單筆捐款","玉山Wallet愛心捐款-定期定額","特斯拉","Gogoro電池資費","YouBike 2.0","日本實體","韓國實體","泰國實體","越南實體","新加坡實體","中國實體","香港實體","澳門實體","美國實體","英國實體","法國實體","德國實體","義大利實體"],De=[{name:"UniCard 卡",description:"",cardUrl:"https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard",storeBlackList:J,paymentBlackList:K,airLines:"EVA",plans:[{name:"任意選 (需要切換店家)",rewards:[{reward:{type:"TruncatedPointsRewardPercentage",name:null,pointBackRates:[{rate:1},{rate:2.5,limit:500}],pointsPerMile:200,milesPerUnit:300},stores:X},{reward:{type:"TruncatedPointsRewardPercentage",name:null,pointBackRates:[{rate:1},{rate:2.5,limit:500}],pointsPerMile:200,milesPerUnit:300},payments:["Line Pay","街口支付","悠遊付","橘子支付","icash pay"]}]},{name:"簡單選",rewards:[{reward:{type:"TruncatedPointsRewardPercentage",name:null,pointBackRates:[{rate:1},{rate:2,limit:500}],pointsPerMile:200,milesPerUnit:300},stores:X},{reward:{type:"TruncatedPointsRewardPercentage",name:null,pointBackRates:[{rate:1},{rate:2,limit:500}],pointsPerMile:200,milesPerUnit:300},payments:["Line Pay","街口支付","悠遊付","橘子支付","icash pay"]}]},{name:"UP選",rewards:[{reward:{type:"TruncatedPointsRewardPercentage",name:null,pointBackRates:[{rate:1},{rate:3.5,limit:2e3}],pointsPerMile:200,milesPerUnit:300},stores:X},{reward:{type:"TruncatedPointsRewardPercentage",name:null,pointBackRates:[{rate:1},{rate:3.5,limit:2e3}],pointsPerMile:200,milesPerUnit:300},payments:["Line Pay","街口支付","悠遊付","橘子支付","icash pay"]}]}],updateAt:new Date("2024/12/01 00:00:00").toISOString()}],W=["政府稅款","公共事業代扣繳","交通違規罰鍰","分期付款"],H=["全盈+PAY","icash pay","OPEN錢包","My FamiPay"],Fe=[{name:"旅人無限卡",description:"",cardUrl:"https://www.hsbc.com.tw/credit-cards/products/travel/visa-infinite/",storeBlackList:W,paymentBlackList:H,airLines:"EVA",plans:[{name:null,rewards:[{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:10},transactionType:"Foreign"},{reward:{type:"DirectMilesAccumulation",name:"國內消費",spendingPerMile:18},transactionType:"Domestic"}]}],updateAt:new Date("2024/12/01 00:00:00").toISOString()},{name:"旅人御璽卡",description:"",cardUrl:"https://www.hsbc.com.tw/credit-cards/products/travel/visa-signature/",storeBlackList:W,paymentBlackList:H,airLines:"EVA",plans:[{name:null,rewards:[{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:15},transactionType:"Foreign"},{reward:{type:"DirectMilesAccumulation",name:"國內消費",spendingPerMile:18},transactionType:"Domestic"}]}],updateAt:new Date("2024/12/01 00:00:00").toISOString()},{name:"旅人輕旅卡",description:"",cardUrl:"https://www.hsbc.com.tw/credit-cards/products/travel/visa-light/",storeBlackList:W,paymentBlackList:H,airLines:"EVA",plans:[{name:null,rewards:[{reward:{type:"DirectMilesAccumulation",name:"國外消費",spendingPerMile:20},transactionType:"Foreign"},{reward:{type:"DirectMilesAccumulation",name:"國內消費",spendingPerMile:20},transactionType:"Domestic"}]}],updateAt:new Date("2024/12/01 00:00:00").toISOString()}],Je=[Fe[2],Ne[4],Ve[0],De[0]].filter(Te),Ke=o=>o==="AllPlanRewardMiles"||o==="CurrentPlanRewardMiles",R=new ve(localStorage,{showRewardMilesType:Ke,commonPaymentMethods:(()=>{const o=new Set(["信用卡","Apple Pay","Samsung Pay","Google Pay","Line Pay","Fitbit Pay","Garmin Pay","Hami Pay","街口支付","全盈+PAY","全支付","Pi錢包","橘子支付","歐付寶","icash pay","OPEN錢包","My FamiPay","悠遊付","ezPay","GOMAJI Pay","friday wallet","PayPal","PX Pay","中油Pay","台灣Pay","支付寶"]);return t=>Array.isArray(t)&&t.every(a=>o.has(a)===!0)})(),cardConfigs:(()=>{const o=new Set(["信用卡","Apple Pay","Samsung Pay","Google Pay","Line Pay","Fitbit Pay","Garmin Pay","Hami Pay","街口支付","全盈+PAY","全支付","Pi錢包","橘子支付","歐付寶","icash pay","OPEN錢包","My FamiPay","悠遊付","ezPay","GOMAJI Pay","friday wallet","PayPal","PX Pay","中油Pay","台灣Pay","支付寶"]),t=new Set(["信用卡","Apple Pay","Samsung Pay","Google Pay","Line Pay","Fitbit Pay","Garmin Pay","Hami Pay","街口支付","全盈+PAY","全支付","Pi錢包","橘子支付","歐付寶","icash pay","OPEN錢包","My FamiPay","悠遊付","ezPay","GOMAJI Pay","friday wallet","PayPal","PX Pay","中油Pay","台灣Pay","支付寶"]),a=new Set(["信用卡","Apple Pay","Samsung Pay","Google Pay","Line Pay","Fitbit Pay","Garmin Pay","Hami Pay","街口支付","全盈+PAY","全支付","Pi錢包","橘子支付","歐付寶","icash pay","OPEN錢包","My FamiPay","悠遊付","ezPay","GOMAJI Pay","friday wallet","PayPal","PX Pay","中油Pay","台灣Pay","支付寶"]),s=e=>typeof e.name=="string"&&typeof e.description=="string"&&(e.cardUrl===null||typeof e.cardUrl=="string")&&(e.storeBlackList===void 0||Array.isArray(e.storeBlackList)&&e.storeBlackList.every(n=>typeof n=="string"))&&(e.paymentBlackList===void 0||Array.isArray(e.paymentBlackList)&&e.paymentBlackList.every(n=>o.has(n)===!0))&&Array.isArray(e.plans)&&e.plans.every(n=>typeof n=="object"&&n!==null&&r(n))&&(e.airLines==="SJX"||e.airLines==="EVA"||e.airLines==="ANA"||e.airLines==="JAL"||e.airLines==="CPA"||e.airLines==="CAL")&&typeof e.updateAt=="string"&&RegExp(/^[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\x2d[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\x2d[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?T[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?:[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?:[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\.[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?Z$/).test(e.updateAt),r=e=>(e.name===null||typeof e.name=="string")&&Array.isArray(e.rewards)&&e.rewards.every(n=>typeof n=="object"&&n!==null&&p(n))&&(e.condition===null||e.condition===void 0||e.condition==="Birthday"),p=e=>typeof e.reward=="object"&&e.reward!==null&&k(e.reward)&&(e.transactionType===null||e.transactionType===void 0||e.transactionType==="Domestic"||e.transactionType==="Foreign")&&(e.stores===void 0||Array.isArray(e.stores)&&e.stores.every(n=>typeof n=="string"))&&(e.storeBlackList===void 0||Array.isArray(e.storeBlackList)&&e.storeBlackList.every(n=>typeof n=="string"))&&(e.payments===void 0||Array.isArray(e.payments)&&e.payments.every(n=>t.has(n)===!0))&&(e.paymentBlackList===void 0||Array.isArray(e.paymentBlackList)&&e.paymentBlackList.every(n=>a.has(n)===!0))&&(e.condition===null||e.condition===void 0||e.condition==="Birthday"),i=e=>Array.isArray(e.pointBackRates)&&e.pointBackRates.every(n=>typeof n=="object"&&n!==null&&l(n))&&e.type==="RoundedPointsRewardPercentage"&&(e.name===null||typeof e.name=="string")&&typeof e.pointsPerMile=="number"&&typeof e.milesPerUnit=="number",l=e=>typeof e.rate=="number"&&(e.limit===void 0||typeof e.limit=="number"),c=e=>Array.isArray(e.pointBackRates)&&e.pointBackRates.every(n=>typeof n=="object"&&n!==null&&d(n))&&e.type==="TruncatedPointsRewardPercentage"&&(e.name===null||typeof e.name=="string")&&typeof e.pointsPerMile=="number"&&typeof e.milesPerUnit=="number",d=e=>typeof e.rate=="number"&&(e.limit===void 0||typeof e.limit=="number"),g=e=>typeof e.spendingPerPoint=="number"&&e.type==="PointsRewardThreshold"&&(e.name===null||typeof e.name=="string")&&typeof e.pointsPerMile=="number"&&typeof e.milesPerUnit=="number",L=e=>typeof e.spendingPerMile=="number"&&e.type==="DirectMilesAccumulation"&&(e.name===null||typeof e.name=="string"),w=e=>typeof e.spendingPerMile=="number"&&e.type==="RoundedMilesAccumulation"&&(e.name===null||typeof e.name=="string"),k=e=>e.type==="TruncatedPointsRewardPercentage"?c(e):e.type==="RoundedPointsRewardPercentage"?i(e):e.type==="PointsRewardThreshold"?g(e):e.type==="RoundedMilesAccumulation"?w(e):e.type==="DirectMilesAccumulation"?L(e):!1;return e=>Array.isArray(e)&&e.every(n=>typeof n=="object"&&n!==null&&s(n))})(),conditionTypes:o=>Array.isArray(o)&&o.every(t=>t==="Birthday")},"bestMileageCards"),le=Ae("BestMileageCards",()=>{ye(()=>{const d=R.get("cardConfigs")??[];r.value=new Map(d.map(g=>[ie(),g]))});const o=b(R.get("showRewardMilesType")??"AllPlanRewardMiles");function t(d){R.set("showRewardMilesType",d),o.value=d}const a=b(R.get("commonPaymentMethods")??["信用卡","Apple Pay","Line Pay","街口支付"]);function s([...d]){d=[...new Set(d)],R.set("commonPaymentMethods",d),a.value=d}const r=b(new Map),p=Y(()=>(r.value.size===0?Je:[...r.value.values()]).map(g=>Ie(g)));function i(d,g){r.value.set(d,g),R.set("cardConfigs",[...r.value.values()])}const l=b(R.get("conditionTypes")??[]);function c([...d]){l.value=d,R.set("conditionTypes",d)}return{showRewardMilesType:G(o),updateShowRewardMilesType:t,commonPaymentMethods:G(a),updateCommonPaymentMethods:s,cards:p,updateCardConfig:i,conditionTypes:G(l),updateConditionTypes:c}}),$e={class:"flex-col gap-24px my-16px"},Ge={class:"flex-center gap-8px"},ze={class:"flex mx-16px"},Xe=Z({__name:"CommonSettings",setup(o){const t=le(),{showRewardMilesType:a,commonPaymentMethods:s,conditionTypes:r}=ne(t);return(p,i)=>{const l=_("v-label"),c=_("v-radio"),d=_("v-radio-group"),g=_("v-select"),L=_("v-switch");return v(),U("div",$e,[A("div",Ge,[P(l,{text:"回饋顯示"}),P(d,{"model-value":f(a),"hide-details":"",inline:"","onUpdate:modelValue":i[0]||(i[0]=w=>w!==null&&f(t).updateShowRewardMilesType(w))},{default:C(()=>[P(c,{density:"compact",label:"全部方案",value:"AllPlanRewardMiles"}),P(c,{density:"compact",label:"當前方案",value:"CurrentPlanRewardMiles"})]),_:1},8,["model-value"])]),A("div",null,[P(g,{"model-value":f(s),items:f(re)(f(Ee),"asc"),label:"使用中的付款方式",multiple:"","hide-details":"","onUpdate:modelValue":i[1]||(i[1]=w=>w!==null&&f(t).updateCommonPaymentMethods(w))},null,8,["model-value","items"])]),A("div",null,[P(l,{text:"其他設定"}),A("div",ze,[P(L,{"model-value":f(r),label:"生日中",value:"Birthday","hide-details":"",color:"blue","onUpdate:modelValue":i[2]||(i[2]=w=>w!==null&&f(t).updateConditionTypes(w))},null,8,["model-value"])])])])}}}),We={};function He(o,t){return"管理信用卡的設定"}const Ye=q(We,[["render",He]]),je={"7-ELEVEN":["7-11","Seven Eleven","統一超商","小7"],ANA全日空:["ANA","全日空","All Nippon Airways","NH"],"ATT 4 FUN":["ATT4FUN","ATT信義"],"App Store":["蘋果應用商店"],"Apple Arcade":["蘋果遊戲訂閱服務"],"Apple Music":["蘋果音樂","Apple音樂"],"Apple One":["蘋果One訂閱"],"Apple TV+":["Apple TV Plus"],"Apple Wallet ICOCA":["ICOCA電子票","Apple錢包ICOCA"],"Apple Wallet PASMO":["PASMO電子票","Apple錢包PASMO"],"Apple Wallet SUICA":["SUICA電子票","Apple錢包SUICA"],CITYLINK:["City Link"],"Disney+":["Disney Plus","迪士尼+"],"Google Play":["Google應用商店"],Grab:["Grab Taxi","Grab叫車"],"MITSUI OUTLET PARK 台中港":["三井台中港","三井OUTLET台中"],"MITSUI OUTLET PARK 台南":["三井台南","三井OUTLET台南"],"MITSUI OUTLET PARK 林口":["三井林口","三井OUTLET林口"],"Mitsui Shopping Park LaLaport 台中":["LaLaport台中","三井LaLaport台中"],Netflix:["網飛"],Nintendo:["任天堂","Switch","老任"],"PChome 24h購物(不含儲值及電子票券)":["PChome","PChome購物"],"Tiger City":["老虎城","Tiger City購物中心"],"Trip.com":["攜程"],"Uber Eats (不含 Uber One)":["優步外送"],foodpanda:["熊貓外送","Food Panda"],iCloud:["蘋果雲端","iCloud雲端"],iRent:["i Rent"],iTunes:["蘋果iTunes"],中友百貨:["中友"],中華航空:["China Airlines","CAL","CI","華航"],亞洲航空:["AirAsia","亞航","AXM","AK"],京站:["Q Square","京站商場"],全家便利商店:["FamilyMart","全家"],全球迪士尼飯店:["Disney Hotels"],全聯福利中心:["PX Mart"],南紡購物中心:["Tainan Spinnery Mall","南紡"],博客來:["Books.com.tw"],卡達航空:["Qatar Airways","卡航","QTR","QR"],可樂旅遊:["Cola Travel","可樂旅行社"],台北101:["Taipei 101","101大樓"],"台灣中油-直營站":["中油直營","直營中油"],台灣大車隊:["Taiwan Taxi","大車隊"],台灣虎航:["Tigerair Taiwan","台虎","TWA","IT"],台灣高鐵:["Taiwan High Speed Rail"],台茂購物中心:["TaiMall"],吉卜力公園:["Ghibli Park"],國泰航空:["Cathay Pacific","國泰","CPA","CX","Cathay Pacific Airways"],土耳其航空:["Turkish Airlines","土航","THY","TK"],夢時代:["Dream Mall"],"大阪環球影城(USJ)":["Universal Studios Japan"],大韓航空:["Korean Air","韓航","KAL","KE"],大魯閣新時代:["Taroko Mall","大魯閣"],太平洋百貨:["Pacific Department Store","太平洋"],好樂迪KTV:["Holiday"],家樂福:["Carrefour"],屈臣氏:["Watsons"],康是美:["Cosmed"],捷星航空:["JST","JQ","Jetstar Airways"],新加坡航空:["SIA","SQ","Singapore Airlines"],日本航空:["JAL","JL","Japan Airlines"],星宇航空:["starlux","SJX","JX","STARLUX Airlines"],樂桃航空:["APJ","MM","Peach Aviation"],法國航空:["AFR","AF","Air France"],聯合航空:["UAL","UA","United Airlines"],蝦皮購物:["shopee"],越捷航空:["VJC","VJ","VietJet Air"],達美航空:["DAL","DL","Delta Air Lines"],遠東百貨:["遠百"],酷航:["SCO","TR","Scoot"],長榮航空:["EVA","BR","EVA Airlines","EVA Air"],阿聯酋航空:["UAE","EK","Emirates"],麥當勞:["McDonald's"]},Ze={class:"flex-col gap-8px h-full"},Qe={class:"flex items-center flex-wrap gap-x-8px"},qe={class:"flex-center gap-8px"},et={ref:"rewardCardList",class:"gap-4px flex-col flex-grow-1 overflow-y-auto"},tt={class:"flex items-center justify-between"},at={class:"flex items-end gap-4px"},st={class:"text-12px opacity-50 p-4px"},nt={key:0,class:"fa-solid fa-circle-check"},rt={class:"flex-col gap-8px"},it={class:"text-0.75rem"},ot="其他店家",lt=Z({__name:"SearchReward",setup(o){const{showRewardMilesType:t,commonPaymentMethods:a,cards:s,conditionTypes:r}=ne(le()),p=b(0),i=b(""),l=b("Domestic"),c=b([]),d=te("rewardCardList"),g=te("storeAutoComplete"),L=Y(()=>{const m=re(Q(s.value.flatMap(h=>h.storeList)),"asc").map(h=>({store:h,aliases:je[h]??[]}));return[{store:ot},...m]});function w(n,m,h){return m=m.toLowerCase(),[n,...(h==null?void 0:h.raw.aliases)??[]].map(B=>B.toLowerCase()).some(B=>B.includes(m))}function k(n,m){return t.value==="CurrentPlanRewardMiles"?[n.currentPlanRewardMiles(m)]:n.getAllPlanRewardMiles(m)}const e=Y(()=>{var h;const n={amount:p.value,acceptedPayments:c.value,transactionAttributesType:l.value,currentConditions:[...r.value]};i.value!==""&&(n.transactionStore=i.value);const m=[];for(const T of s.value){if(!(T instanceof oe))continue;const B=k(T,n);for(const S of B){const F={cardName:T.name,planName:S.planName,rewardName:S.name,miles:S.miles,payments:S.payments,targetAirLines:T.airLinesCode,isSelectedPlan:t.value==="AllPlanRewardMiles"&&S.planId===T.selectedPlanId};m.push(F)}}return(h=d.value)==null||h.scrollTo({top:0,behavior:"smooth"}),ae(ae(m,"isSelectedPlan","desc"),"miles","desc")});return(n,m)=>{const h=_("v-text-field"),T=_("v-autocomplete"),B=_("v-label"),S=_("v-checkbox"),F=_("v-radio"),ce=_("v-radio-group"),de=_("v-card");return v(),U("div",Ze,[P(h,{"model-value":p.value,class:"flex-grow-0",density:"comfortable","hide-details":"",label:"交易金額",inputmode:"decimal",clearable:p.value!==0,"onUpdate:modelValue":m[0]||(m[0]=y=>p.value=isNaN(parseFloat(y))?0:parseFloat(y))},null,8,["model-value","clearable"]),P(T,{ref:"storeAutoComplete",modelValue:i.value,"onUpdate:modelValue":m[1]||(m[1]=y=>i.value=y),"custom-filter":w,class:"flex-grow-0",density:"comfortable","hide-details":"","item-value":"store","item-title":"store",label:"消費店家",items:L.value,clearable:i.value!=="",placeholder:"全部店家","onUpdate:menu":m[2]||(m[2]=y=>{var x;return!y&&((x=f(g))==null?void 0:x.blur())})},null,8,["modelValue","items","clearable"]),A("div",null,[P(B,{text:"支援的付款方式"}),A("div",Qe,[(v(!0),U($,null,j(f(a),(y,x)=>(v(),V(S,{key:x,modelValue:c.value,"onUpdate:modelValue":m[3]||(m[3]=pe=>c.value=pe),density:"compact",value:y,"hide-details":"",label:y},null,8,["modelValue","value","label"]))),128))])]),A("div",qe,[P(B,{text:"交易類型"}),P(ce,{modelValue:l.value,"onUpdate:modelValue":m[4]||(m[4]=y=>l.value=y),"hide-details":"",inline:""},{default:C(()=>[P(F,{density:"compact",label:"國內交易",value:"Domestic"}),P(F,{density:"compact",label:"國外交易",value:"Foreign"})]),_:1},8,["modelValue"])]),A("div",et,[(v(!0),U($,null,j(e.value,(y,x)=>(v(),V(de,{key:x,density:"compact",class:"mx-auto w-full flex-shrink-0",variant:"outlined"},{title:C(()=>[A("div",tt,[A("div",at,[se(N(y.miles)+" ",1),A("p",st,N(y.targetAirLines),1)]),y.isSelectedPlan?(v(),U("i",nt)):Pe("",!0)])]),text:C(()=>[A("div",rt,[A("p",it,N(`${y.cardName} ${y.planName??""} ${y.rewardName??""}`)+" "+N(y.payments.length===0?"":` (支付方式: ${y.payments.join(", ")})`),1)])]),_:2},1024))),128))],512)])}}}),ct=q(lt,[["__scopeId","data-v-9eda357c"]]),dt={};function pt(o,t){return" 實作商店別名，方便查詢（目標上面做個開關，可以切換自動用專案的名詞，或是自己設定別名） "}const mt=q(dt,[["render",pt]]),ut={style:{height:"calc(100dvh - 56px)"},class:"overflow-hidden mt-56px p-8px"},yt=Z({__name:"App",setup(o){const t={查詢回饋:ct,信用卡管理:Ye,商家管理:mt,喜好設定:Xe},a=Object.keys(t),s=b(!1),r=b(a[0]);return(p,i)=>{const l=_("v-app-bar-nav-icon"),c=_("v-app-bar-title"),d=_("v-app-bar"),g=_("v-list-item"),L=_("v-divider"),w=_("v-navigation-drawer"),k=_("v-app");return v(),V(k,null,{default:C(()=>[P(d,{density:"comfortable",elevation:2},{prepend:C(()=>[P(l,{onClick:i[0]||(i[0]=e=>s.value=!s.value)},{default:C(()=>i[2]||(i[2]=[A("i",{class:"fa-solid fa-bars"},null,-1)])),_:1}),P(c,null,{default:C(()=>[se(N(r.value),1)]),_:1})]),_:1}),P(w,{modelValue:s.value,"onUpdate:modelValue":i[1]||(i[1]=e=>s.value=e)},{default:C(()=>[(v(!0),U($,null,j(f(a),(e,n)=>(v(),U($,{key:n},[P(g,{title:e,class:he(["h-48px",{"text-emphasis":r.value===e}]),onClick:()=>{r.value=e,s.value=!1}},null,8,["title","class","onClick"]),P(L)],64))),128))]),_:1},8,["modelValue"]),A("main",ut,[(v(),V(_e,null,[(v(),V(ge(t[r.value])))],1024))])]),_:1})}}}),ee=we(yt);ee.use(Le);ee.use(Me());ee.mount("#app");
//# sourceMappingURL=bestMileageCards-UrUleixH.js.map
