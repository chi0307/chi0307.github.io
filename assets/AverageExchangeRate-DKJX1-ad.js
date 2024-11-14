var K=Object.defineProperty;var Z=(t,e,n)=>e in t?K(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var F=(t,e,n)=>Z(t,typeof e!="symbol"?e+"":e,n);import{s as N,a as q}from"./utils-ystsveXx.js";import{d as ee,j as V,k as Y,w as H,l as te,c as ne,b as T,f as b,u as ae,m as p,F as re,p as k,o as oe}from"./main-Czcx73zw.js";const $=6048e5,ie=864e5,L=Symbol.for("constructDateFrom");function x(t,e){return typeof t=="function"?t(e):t&&typeof t=="object"&&L in t?t[L](e):t instanceof Date?new t.constructor(e):new Date(e)}function v(t,e){return x(e||t,t)}let se={};function C(){return se}function S(t,e){var s,m,d,i;const n=C(),a=(e==null?void 0:e.weekStartsOn)??((m=(s=e==null?void 0:e.locale)==null?void 0:s.options)==null?void 0:m.weekStartsOn)??n.weekStartsOn??((i=(d=n.locale)==null?void 0:d.options)==null?void 0:i.weekStartsOn)??0,r=v(t,e==null?void 0:e.in),o=r.getDay(),u=(o<a?7:0)+o-a;return r.setDate(r.getDate()-u),r.setHours(0,0,0,0),r}function E(t,e){return S(t,{...e,weekStartsOn:1})}function J(t,e){const n=v(t,e==null?void 0:e.in),a=n.getFullYear(),r=x(n,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const o=E(r),u=x(n,0);u.setFullYear(a,0,4),u.setHours(0,0,0,0);const s=E(u);return n.getTime()>=o.getTime()?a+1:n.getTime()>=s.getTime()?a:a-1}function R(t){const e=v(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function ue(t,...e){const n=x.bind(null,e.find(a=>typeof a=="object"));return e.map(n)}function Q(t,e){const n=v(t,e==null?void 0:e.in);return n.setHours(0,0,0,0),n}function ce(t,e,n){const[a,r]=ue(n==null?void 0:n.in,t,e),o=Q(a),u=Q(r),s=+o-R(o),m=+u-R(u);return Math.round((s-m)/ie)}function de(t,e){const n=J(t,e),a=x(t,0);return a.setFullYear(n,0,4),a.setHours(0,0,0,0),E(a)}function le(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function me(t){return!(!le(t)&&typeof t!="number"||isNaN(+v(t)))}function fe(t,e){const n=v(t,e==null?void 0:e.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}const he={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},ge=(t,e,n)=>{let a;const r=he[t];return typeof r=="string"?a=r:e===1?a=r.one:a=r.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a};function _(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const ye={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},we={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},be={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},ve={date:_({formats:ye,defaultWidth:"full"}),time:_({formats:we,defaultWidth:"full"}),dateTime:_({formats:be,defaultWidth:"full"})},Me={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},xe=(t,e,n,a)=>Me[t];function D(t){return(e,n)=>{const a=n!=null&&n.context?String(n.context):"standalone";let r;if(a==="formatting"&&t.formattingValues){const u=t.defaultFormattingWidth||t.defaultWidth,s=n!=null&&n.width?String(n.width):u;r=t.formattingValues[s]||t.formattingValues[u]}else{const u=t.defaultWidth,s=n!=null&&n.width?String(n.width):t.defaultWidth;r=t.values[s]||t.values[u]}const o=t.argumentCallback?t.argumentCallback(e):e;return r[o]}}const Pe={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Oe={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ke={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},De={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},We={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},Se={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Ye=(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},Te={ordinalNumber:Ye,era:D({values:Pe,defaultWidth:"wide"}),quarter:D({values:Oe,defaultWidth:"wide",argumentCallback:t=>t-1}),month:D({values:ke,defaultWidth:"wide"}),day:D({values:De,defaultWidth:"wide"}),dayPeriod:D({values:We,defaultWidth:"wide",formattingValues:Se,defaultFormattingWidth:"wide"})};function W(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const u=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],m=Array.isArray(s)?Ee(s,l=>l.test(u)):pe(s,l=>l.test(u));let d;d=t.valueCallback?t.valueCallback(m):m,d=n.valueCallback?n.valueCallback(d):d;const i=e.slice(u.length);return{value:d,rest:i}}}function pe(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n}function Ee(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n}function Ce(t){return(e,n={})=>{const a=e.match(t.matchPattern);if(!a)return null;const r=a[0],o=e.match(t.parsePattern);if(!o)return null;let u=t.valueCallback?t.valueCallback(o[0]):o[0];u=n.valueCallback?n.valueCallback(u):u;const s=e.slice(r.length);return{value:u,rest:s}}}const Fe=/^(\d+)(th|st|nd|rd)?/i,_e=/\d+/i,Ne={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},qe={any:[/^b/i,/^(a|c)/i]},Ve={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},He={any:[/1/i,/2/i,/3/i,/4/i]},Le={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Re={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Qe={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Ae={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Xe={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},je={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Be={ordinalNumber:Ce({matchPattern:Fe,parsePattern:_e,valueCallback:t=>parseInt(t,10)}),era:W({matchPatterns:Ne,defaultMatchWidth:"wide",parsePatterns:qe,defaultParseWidth:"any"}),quarter:W({matchPatterns:Ve,defaultMatchWidth:"wide",parsePatterns:He,defaultParseWidth:"any",valueCallback:t=>t+1}),month:W({matchPatterns:Le,defaultMatchWidth:"wide",parsePatterns:Re,defaultParseWidth:"any"}),day:W({matchPatterns:Qe,defaultMatchWidth:"wide",parsePatterns:Ae,defaultParseWidth:"any"}),dayPeriod:W({matchPatterns:Xe,defaultMatchWidth:"any",parsePatterns:je,defaultParseWidth:"any"})},Ie={code:"en-US",formatDistance:ge,formatLong:ve,formatRelative:xe,localize:Te,match:Be,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Ge(t,e){const n=v(t,e==null?void 0:e.in);return ce(n,fe(n))+1}function $e(t,e){const n=v(t,e==null?void 0:e.in),a=+E(n)-+de(n);return Math.round(a/$)+1}function U(t,e){var i,l,g,w;const n=v(t,e==null?void 0:e.in),a=n.getFullYear(),r=C(),o=(e==null?void 0:e.firstWeekContainsDate)??((l=(i=e==null?void 0:e.locale)==null?void 0:i.options)==null?void 0:l.firstWeekContainsDate)??r.firstWeekContainsDate??((w=(g=r.locale)==null?void 0:g.options)==null?void 0:w.firstWeekContainsDate)??1,u=x((e==null?void 0:e.in)||t,0);u.setFullYear(a+1,0,o),u.setHours(0,0,0,0);const s=S(u,e),m=x((e==null?void 0:e.in)||t,0);m.setFullYear(a,0,o),m.setHours(0,0,0,0);const d=S(m,e);return+n>=+s?a+1:+n>=+d?a:a-1}function Je(t,e){var s,m,d,i;const n=C(),a=(e==null?void 0:e.firstWeekContainsDate)??((m=(s=e==null?void 0:e.locale)==null?void 0:s.options)==null?void 0:m.firstWeekContainsDate)??n.firstWeekContainsDate??((i=(d=n.locale)==null?void 0:d.options)==null?void 0:i.firstWeekContainsDate)??1,r=U(t,e),o=x((e==null?void 0:e.in)||t,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),S(o,e)}function Ue(t,e){const n=v(t,e==null?void 0:e.in),a=+S(n,e)-+Je(n,e);return Math.round(a/$)+1}function c(t,e){const n=t<0?"-":"",a=Math.abs(t).toString().padStart(e,"0");return n+a}const M={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return c(e==="yy"?a%100:a,e.length)},M(t,e){const n=t.getMonth();return e==="M"?String(n+1):c(n+1,2)},d(t,e){return c(t.getDate(),e.length)},a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(t,e){return c(t.getHours()%12||12,e.length)},H(t,e){return c(t.getHours(),e.length)},m(t,e){return c(t.getMinutes(),e.length)},s(t,e){return c(t.getSeconds(),e.length)},S(t,e){const n=e.length,a=t.getMilliseconds(),r=Math.trunc(a*Math.pow(10,n-3));return c(r,e.length)}},O={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},A={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if(e==="yo"){const a=t.getFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return M.y(t,e)},Y:function(t,e,n,a){const r=U(t,a),o=r>0?r:1-r;if(e==="YY"){const u=o%100;return c(u,2)}return e==="Yo"?n.ordinalNumber(o,{unit:"year"}):c(o,e.length)},R:function(t,e){const n=J(t);return c(n,e.length)},u:function(t,e){const n=t.getFullYear();return c(n,e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return c(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return c(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return M.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return c(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=Ue(t,a);return e==="wo"?n.ordinalNumber(r,{unit:"week"}):c(r,e.length)},I:function(t,e,n){const a=$e(t);return e==="Io"?n.ordinalNumber(a,{unit:"week"}):c(a,e.length)},d:function(t,e,n){return e==="do"?n.ordinalNumber(t.getDate(),{unit:"date"}):M.d(t,e)},D:function(t,e,n){const a=Ge(t);return e==="Do"?n.ordinalNumber(a,{unit:"dayOfYear"}):c(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return c(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return c(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=a===0?7:a;switch(e){case"i":return String(r);case"ii":return c(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(a===12?r=O.noon:a===0?r=O.midnight:r=a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(a>=17?r=O.evening:a>=12?r=O.afternoon:a>=4?r=O.morning:r=O.night,e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if(e==="ho"){let a=t.getHours()%12;return a===0&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return M.h(t,e)},H:function(t,e,n){return e==="Ho"?n.ordinalNumber(t.getHours(),{unit:"hour"}):M.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return e==="Ko"?n.ordinalNumber(a,{unit:"hour"}):c(a,e.length)},k:function(t,e,n){let a=t.getHours();return a===0&&(a=24),e==="ko"?n.ordinalNumber(a,{unit:"hour"}):c(a,e.length)},m:function(t,e,n){return e==="mo"?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):M.m(t,e)},s:function(t,e,n){return e==="so"?n.ordinalNumber(t.getSeconds(),{unit:"second"}):M.s(t,e)},S:function(t,e){return M.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(a===0)return"Z";switch(e){case"X":return j(a);case"XXXX":case"XX":return P(a);case"XXXXX":case"XXX":default:return P(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return j(a);case"xxxx":case"xx":return P(a);case"xxxxx":case"xxx":default:return P(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+X(a,":");case"OOOO":default:return"GMT"+P(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+X(a,":");case"zzzz":default:return"GMT"+P(a,":")}},t:function(t,e,n){const a=Math.trunc(+t/1e3);return c(a,e.length)},T:function(t,e,n){return c(+t,e.length)}};function X(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),o=a%60;return o===0?n+String(r):n+String(r)+e+c(o,2)}function j(t,e){return t%60===0?(t>0?"-":"+")+c(Math.abs(t)/60,2):P(t,e)}function P(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=c(Math.trunc(a/60),2),o=c(a%60,2);return n+r+e+o}const B=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},z=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},ze=(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return B(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;case"PPPP":default:o=e.dateTime({width:"full"});break}return o.replace("{{date}}",B(a,e)).replace("{{time}}",z(r,e))},Ke={p:z,P:ze},Ze=/^D+$/,et=/^Y+$/,tt=["D","DD","YY","YYYY"];function nt(t){return Ze.test(t)}function at(t){return et.test(t)}function rt(t,e,n){const a=ot(t,e,n);if(console.warn(a),tt.includes(t))throw new RangeError(a)}function ot(t,e,n){const a=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const it=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,st=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ut=/^'([^]*?)'?$/,ct=/''/g,dt=/[a-zA-Z]/;function I(t,e,n){var i,l,g,w;const a=C(),r=a.locale??Ie,o=a.firstWeekContainsDate??((l=(i=a.locale)==null?void 0:i.options)==null?void 0:l.firstWeekContainsDate)??1,u=a.weekStartsOn??((w=(g=a.locale)==null?void 0:g.options)==null?void 0:w.weekStartsOn)??0,s=v(t,n==null?void 0:n.in);if(!me(s))throw new RangeError("Invalid time value");let m=e.match(st).map(y=>{const f=y[0];if(f==="p"||f==="P"){const h=Ke[f];return h(y,r.formatLong)}return y}).join("").match(it).map(y=>{if(y==="''")return{isToken:!1,value:"'"};const f=y[0];if(f==="'")return{isToken:!1,value:lt(y)};if(A[f])return{isToken:!0,value:y};if(f.match(dt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+f+"`");return{isToken:!1,value:y}});r.localize.preprocessor&&(m=r.localize.preprocessor(s,m));const d={firstWeekContainsDate:o,weekStartsOn:u,locale:r};return m.map(y=>{if(!y.isToken)return y.value;const f=y.value;(at(f)||nt(f))&&rt(f,e,String(t));const h=A[f[0]];return h(s,f,r.localize,d)}).join("")}function lt(t){const e=t.match(ut);return e?e[1].replace(ct,"'"):t}const mt=t=>typeof t=="number",ft=(()=>{const t=n=>Array.isArray(n.transactionList)&&n.transactionList.every(a=>typeof a=="object"&&a!==null&&e(a))&&typeof n.amount=="number",e=n=>typeof n.date=="string"&&typeof n.sell=="number"&&typeof n.buy=="number";return n=>typeof n=="object"&&n!==null&&t(n)})();class ht{constructor(e,n){F(this,"storage");F(this,"typeChecker");this.storage=e,this.typeChecker=n}get(e){const n=this.storage.getItem(e);if(n===null)return null;try{const a=JSON.parse(n);if(this.typeChecker[e](a))return a;console.error(`storage ${e} check typing failed`)}catch(a){a instanceof Error?console.error(`storage ${e} parse error: ${a.message}`):console.error(`storage ${e} parse error: ${a}`)}return null}set(e,n){this.storage.setItem(e,JSON.stringify(n))}remove(e){this.storage.removeItem(e)}}const G=new ht(localStorage,{averageExchangeRate:ft}),gt={class:"m-24px flex-col gap-8px"},yt={class:"flex-center w-full gap-4px"},Mt=ee({__name:"AverageExchangeRate",setup(t){const e=V(()=>{const d=N(a.value,"date","desc");let i=r.value;return d.map(g=>{const w=i>g.buy?g.buy:i;return i-=w,{date:I(g.date,"yyyy/MM/dd"),sell:g.sell,buy:g.buy,exchangeRate:q(g.sell/g.buy,4),balance:w}})}),n=V(()=>{let d=0,i=0;for(const l of e.value)l.balance>0&&(i+=l.balance,d+=l.balance*l.exchangeRate);return i===0?0:q(d/i,4)}),a=Y([]),r=Y(0),o=Y(!1);H(()=>[a,r],()=>{G.set("averageExchangeRate",{transactionList:a.value,amount:r.value})},{deep:!0}),te(()=>{const d=G.get("averageExchangeRate");d!==null&&(a.value=N(d.transactionList,"date","desc"),r.value=d.amount)}),H(o,()=>{s.value=u()});function u(){return{sell:0,buy:0,date:I(new Date,"yyyy-MM-dd'T'HH:mm")}}const s=Y(u());function m(){const{buy:d,sell:i}=s.value,l=new Date(s.value.date).toISOString();a.value.unshift({buy:d,sell:i,date:l}),o.value=!1}return(d,i)=>{const l=k("v-text-field"),g=k("v-data-table"),w=k("v-btn"),y=k("v-card"),f=k("v-dialog");return oe(),ne(re,null,[T("main",gt,[T("div",yt,[b(l,{modelValue:r.value,"onUpdate:modelValue":i[0]||(i[0]=h=>r.value=h),modelModifiers:{number:!0},label:"剩餘金額","validate-on":"invalid-input",rules:[ae(mt)],"hide-details":"auto"},null,8,["modelValue","rules"]),b(l,{modelValue:n.value,"onUpdate:modelValue":i[1]||(i[1]=h=>n.value=h),"hide-details":"auto",label:"平均匯率",disabled:""},null,8,["modelValue"])]),b(g,{items:e.value},null,8,["items"]),T("div",{class:"fixed bottom-24px right-24px",onClick:i[2]||(i[2]=h=>o.value=!0)},[b(w,{icon:""},{default:p(()=>i[7]||(i[7]=[T("i",{class:"fas fa-plus"},null,-1)])),_:1})])]),b(f,{modelValue:o.value,"onUpdate:modelValue":i[6]||(i[6]=h=>o.value=h)},{default:p(()=>[b(y,{"prepend-icon":"mdi-update",title:"Add Item"},{text:p(()=>[b(l,{modelValue:s.value.date,"onUpdate:modelValue":i[3]||(i[3]=h=>s.value.date=h),type:"datetime-local","hide-details":"auto",label:"交易日期"},null,8,["modelValue"]),b(l,{modelValue:s.value.sell,"onUpdate:modelValue":i[4]||(i[4]=h=>s.value.sell=h),modelModifiers:{number:!0},type:"number","hide-details":"auto",label:"賣出台幣"},null,8,["modelValue"]),b(l,{modelValue:s.value.buy,"onUpdate:modelValue":i[5]||(i[5]=h=>s.value.buy=h),modelModifiers:{number:!0},type:"number","hide-details":"auto",label:"買入外幣"},null,8,["modelValue"]),b(l,{"hide-details":"auto",label:"平均匯率","model-value":s.value.buy===0?0:s.value.sell/s.value.buy,disabled:""},null,8,["model-value"])]),actions:p(()=>[b(w,{class:"ms-auto",text:"Submit",onClick:m})]),_:1})]),_:1},8,["modelValue"])],64)}}});export{Mt as default};
