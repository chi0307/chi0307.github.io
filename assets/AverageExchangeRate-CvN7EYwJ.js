var U=Object.defineProperty;var z=(t,e,n)=>e in t?U(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var E=(t,e,n)=>z(t,typeof e!="symbol"?e+"":e,n);import{a as C}from"./utils-CUUEy7NB.js";import{d as K,i as _,j as N,w as p,k as Z,c as ee,b as W,t as te,f as q,u as ne,l as R,o as ae}from"./main-PFMo4qLZ.js";const V=6048e5,re=864e5,H=Symbol.for("constructDateFrom");function y(t,e){return typeof t=="function"?t(e):t&&typeof t=="object"&&H in t?t[H](e):t instanceof Date?new t.constructor(e):new Date(e)}function m(t,e){return y(e||t,t)}let ie={};function Y(){return ie}function D(t,e){var s,u,d,f;const n=Y(),a=(e==null?void 0:e.weekStartsOn)??((u=(s=e==null?void 0:e.locale)==null?void 0:s.options)==null?void 0:u.weekStartsOn)??n.weekStartsOn??((f=(d=n.locale)==null?void 0:d.options)==null?void 0:f.weekStartsOn)??0,r=m(t,e==null?void 0:e.in),i=r.getDay(),o=(i<a?7:0)+i-a;return r.setDate(r.getDate()-o),r.setHours(0,0,0,0),r}function S(t,e){return D(t,{...e,weekStartsOn:1})}function G(t,e){const n=m(t,e==null?void 0:e.in),a=n.getFullYear(),r=y(n,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const i=S(r),o=y(n,0);o.setFullYear(a,0,4),o.setHours(0,0,0,0);const s=S(o);return n.getTime()>=i.getTime()?a+1:n.getTime()>=s.getTime()?a:a-1}function Q(t){const e=m(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function oe(t,...e){const n=y.bind(null,e.find(a=>typeof a=="object"));return e.map(n)}function X(t,e){const n=m(t,e==null?void 0:e.in);return n.setHours(0,0,0,0),n}function se(t,e,n){const[a,r]=oe(n==null?void 0:n.in,t,e),i=X(a),o=X(r),s=+i-Q(i),u=+o-Q(o);return Math.round((s-u)/re)}function ue(t,e){const n=G(t,e),a=y(t,0);return a.setFullYear(n,0,4),a.setHours(0,0,0,0),S(a)}function ce(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function de(t){return!(!ce(t)&&typeof t!="number"||isNaN(+m(t)))}function le(t,e){const n=m(t,e==null?void 0:e.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}const fe={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},he=(t,e,n)=>{let a;const r=fe[t];return typeof r=="string"?a=r:e===1?a=r.one:a=r.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a};function F(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const me={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},ge={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},we={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},ye={date:F({formats:me,defaultWidth:"full"}),time:F({formats:ge,defaultWidth:"full"}),dateTime:F({formats:we,defaultWidth:"full"})},be={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},ve=(t,e,n,a)=>be[t];function P(t){return(e,n)=>{const a=n!=null&&n.context?String(n.context):"standalone";let r;if(a==="formatting"&&t.formattingValues){const o=t.defaultFormattingWidth||t.defaultWidth,s=n!=null&&n.width?String(n.width):o;r=t.formattingValues[s]||t.formattingValues[o]}else{const o=t.defaultWidth,s=n!=null&&n.width?String(n.width):t.defaultWidth;r=t.values[s]||t.values[o]}const i=t.argumentCallback?t.argumentCallback(e):e;return r[i]}}const xe={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Me={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},Pe={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},Oe={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},ke={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},De={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},We=(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},Se={ordinalNumber:We,era:P({values:xe,defaultWidth:"wide"}),quarter:P({values:Me,defaultWidth:"wide",argumentCallback:t=>t-1}),month:P({values:Pe,defaultWidth:"wide"}),day:P({values:Oe,defaultWidth:"wide"}),dayPeriod:P({values:ke,defaultWidth:"wide",formattingValues:De,defaultFormattingWidth:"wide"})};function O(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],i=e.match(r);if(!i)return null;const o=i[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],u=Array.isArray(s)?Te(s,g=>g.test(o)):Ye(s,g=>g.test(o));let d;d=t.valueCallback?t.valueCallback(u):u,d=n.valueCallback?n.valueCallback(d):d;const f=e.slice(o.length);return{value:d,rest:f}}}function Ye(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n}function Te(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n}function Ee(t){return(e,n={})=>{const a=e.match(t.matchPattern);if(!a)return null;const r=a[0],i=e.match(t.parsePattern);if(!i)return null;let o=t.valueCallback?t.valueCallback(i[0]):i[0];o=n.valueCallback?n.valueCallback(o):o;const s=e.slice(r.length);return{value:o,rest:s}}}const Fe=/^(\d+)(th|st|nd|rd)?/i,Ce=/\d+/i,_e={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Ne={any:[/^b/i,/^(a|c)/i]},pe={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},qe={any:[/1/i,/2/i,/3/i,/4/i]},Re={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},He={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Qe={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Xe={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Le={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},je={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Ae={ordinalNumber:Ee({matchPattern:Fe,parsePattern:Ce,valueCallback:t=>parseInt(t,10)}),era:O({matchPatterns:_e,defaultMatchWidth:"wide",parsePatterns:Ne,defaultParseWidth:"any"}),quarter:O({matchPatterns:pe,defaultMatchWidth:"wide",parsePatterns:qe,defaultParseWidth:"any",valueCallback:t=>t+1}),month:O({matchPatterns:Re,defaultMatchWidth:"wide",parsePatterns:He,defaultParseWidth:"any"}),day:O({matchPatterns:Qe,defaultMatchWidth:"wide",parsePatterns:Xe,defaultParseWidth:"any"}),dayPeriod:O({matchPatterns:Le,defaultMatchWidth:"any",parsePatterns:je,defaultParseWidth:"any"})},Be={code:"en-US",formatDistance:he,formatLong:ye,formatRelative:ve,localize:Se,match:Ae,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Ve(t,e){const n=m(t,e==null?void 0:e.in);return se(n,le(n))+1}function Ge(t,e){const n=m(t,e==null?void 0:e.in),a=+S(n)-+ue(n);return Math.round(a/V)+1}function I(t,e){var f,g,x,M;const n=m(t,e==null?void 0:e.in),a=n.getFullYear(),r=Y(),i=(e==null?void 0:e.firstWeekContainsDate)??((g=(f=e==null?void 0:e.locale)==null?void 0:f.options)==null?void 0:g.firstWeekContainsDate)??r.firstWeekContainsDate??((M=(x=r.locale)==null?void 0:x.options)==null?void 0:M.firstWeekContainsDate)??1,o=y((e==null?void 0:e.in)||t,0);o.setFullYear(a+1,0,i),o.setHours(0,0,0,0);const s=D(o,e),u=y((e==null?void 0:e.in)||t,0);u.setFullYear(a,0,i),u.setHours(0,0,0,0);const d=D(u,e);return+n>=+s?a+1:+n>=+d?a:a-1}function Ie(t,e){var s,u,d,f;const n=Y(),a=(e==null?void 0:e.firstWeekContainsDate)??((u=(s=e==null?void 0:e.locale)==null?void 0:s.options)==null?void 0:u.firstWeekContainsDate)??n.firstWeekContainsDate??((f=(d=n.locale)==null?void 0:d.options)==null?void 0:f.firstWeekContainsDate)??1,r=I(t,e),i=y((e==null?void 0:e.in)||t,0);return i.setFullYear(r,0,a),i.setHours(0,0,0,0),D(i,e)}function Je(t,e){const n=m(t,e==null?void 0:e.in),a=+D(n,e)-+Ie(n,e);return Math.round(a/V)+1}function c(t,e){const n=t<0?"-":"",a=Math.abs(t).toString().padStart(e,"0");return n+a}const w={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return c(e==="yy"?a%100:a,e.length)},M(t,e){const n=t.getMonth();return e==="M"?String(n+1):c(n+1,2)},d(t,e){return c(t.getDate(),e.length)},a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(t,e){return c(t.getHours()%12||12,e.length)},H(t,e){return c(t.getHours(),e.length)},m(t,e){return c(t.getMinutes(),e.length)},s(t,e){return c(t.getSeconds(),e.length)},S(t,e){const n=e.length,a=t.getMilliseconds(),r=Math.trunc(a*Math.pow(10,n-3));return c(r,e.length)}},v={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},L={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if(e==="yo"){const a=t.getFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return w.y(t,e)},Y:function(t,e,n,a){const r=I(t,a),i=r>0?r:1-r;if(e==="YY"){const o=i%100;return c(o,2)}return e==="Yo"?n.ordinalNumber(i,{unit:"year"}):c(i,e.length)},R:function(t,e){const n=G(t);return c(n,e.length)},u:function(t,e){const n=t.getFullYear();return c(n,e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return c(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return c(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return w.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return c(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=Je(t,a);return e==="wo"?n.ordinalNumber(r,{unit:"week"}):c(r,e.length)},I:function(t,e,n){const a=Ge(t);return e==="Io"?n.ordinalNumber(a,{unit:"week"}):c(a,e.length)},d:function(t,e,n){return e==="do"?n.ordinalNumber(t.getDate(),{unit:"date"}):w.d(t,e)},D:function(t,e,n){const a=Ve(t);return e==="Do"?n.ordinalNumber(a,{unit:"dayOfYear"}):c(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),i=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return c(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),i=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return c(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=a===0?7:a;switch(e){case"i":return String(r);case"ii":return c(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(a===12?r=v.noon:a===0?r=v.midnight:r=a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(a>=17?r=v.evening:a>=12?r=v.afternoon:a>=4?r=v.morning:r=v.night,e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if(e==="ho"){let a=t.getHours()%12;return a===0&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return w.h(t,e)},H:function(t,e,n){return e==="Ho"?n.ordinalNumber(t.getHours(),{unit:"hour"}):w.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return e==="Ko"?n.ordinalNumber(a,{unit:"hour"}):c(a,e.length)},k:function(t,e,n){let a=t.getHours();return a===0&&(a=24),e==="ko"?n.ordinalNumber(a,{unit:"hour"}):c(a,e.length)},m:function(t,e,n){return e==="mo"?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):w.m(t,e)},s:function(t,e,n){return e==="so"?n.ordinalNumber(t.getSeconds(),{unit:"second"}):w.s(t,e)},S:function(t,e){return w.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(a===0)return"Z";switch(e){case"X":return A(a);case"XXXX":case"XX":return b(a);case"XXXXX":case"XXX":default:return b(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return A(a);case"xxxx":case"xx":return b(a);case"xxxxx":case"xxx":default:return b(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+j(a,":");case"OOOO":default:return"GMT"+b(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+j(a,":");case"zzzz":default:return"GMT"+b(a,":")}},t:function(t,e,n){const a=Math.trunc(+t/1e3);return c(a,e.length)},T:function(t,e,n){return c(+t,e.length)}};function j(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),i=a%60;return i===0?n+String(r):n+String(r)+e+c(i,2)}function A(t,e){return t%60===0?(t>0?"-":"+")+c(Math.abs(t)/60,2):b(t,e)}function b(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=c(Math.trunc(a/60),2),i=c(a%60,2);return n+r+e+i}const B=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},J=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},$e=(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return B(t,e);let i;switch(a){case"P":i=e.dateTime({width:"short"});break;case"PP":i=e.dateTime({width:"medium"});break;case"PPP":i=e.dateTime({width:"long"});break;case"PPPP":default:i=e.dateTime({width:"full"});break}return i.replace("{{date}}",B(a,e)).replace("{{time}}",J(r,e))},Ue={p:J,P:$e},ze=/^D+$/,Ke=/^Y+$/,Ze=["D","DD","YY","YYYY"];function et(t){return ze.test(t)}function tt(t){return Ke.test(t)}function nt(t,e,n){const a=at(t,e,n);if(console.warn(a),Ze.includes(t))throw new RangeError(a)}function at(t,e,n){const a=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const rt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,it=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ot=/^'([^]*?)'?$/,st=/''/g,ut=/[a-zA-Z]/;function ct(t,e,n){var f,g,x,M;const a=Y(),r=a.locale??Be,i=a.firstWeekContainsDate??((g=(f=a.locale)==null?void 0:f.options)==null?void 0:g.firstWeekContainsDate)??1,o=a.weekStartsOn??((M=(x=a.locale)==null?void 0:x.options)==null?void 0:M.weekStartsOn)??0,s=m(t,n==null?void 0:n.in);if(!de(s))throw new RangeError("Invalid time value");let u=e.match(it).map(h=>{const l=h[0];if(l==="p"||l==="P"){const T=Ue[l];return T(h,r.formatLong)}return h}).join("").match(rt).map(h=>{if(h==="''")return{isToken:!1,value:"'"};const l=h[0];if(l==="'")return{isToken:!1,value:dt(h)};if(L[l])return{isToken:!0,value:h};if(l.match(ut))throw new RangeError("Format string contains an unescaped latin alphabet character `"+l+"`");return{isToken:!1,value:h}});r.localize.preprocessor&&(u=r.localize.preprocessor(s,u));const d={firstWeekContainsDate:i,weekStartsOn:o,locale:r};return u.map(h=>{if(!h.isToken)return h.value;const l=h.value;(tt(l)||et(l))&&nt(l,e,String(t));const T=L[l[0]];return T(s,l,r.localize,d)}).join("")}function dt(t){const e=t.match(ot);return e?e[1].replace(st,"'"):t}const $=t=>typeof t=="number",lt=(()=>{const t=e=>typeof e.date=="string"&&typeof e.sell=="number"&&typeof e.buy=="number";return e=>Array.isArray(e)&&e.every(n=>typeof n=="object"&&n!==null&&t(n))})();class ft{constructor(e,n){E(this,"storage");E(this,"typeChecker");this.storage=e,this.typeChecker=n}get(e){const n=this.storage.getItem(e);if(n===null)return null;try{const a=JSON.parse(n);if(this.typeChecker[e](a))return a;this.remove(e)}catch{this.remove(e)}return null}set(e,n){this.storage.setItem(e,JSON.stringify(n))}remove(e){this.storage.removeItem(e)}}const k=new ft(localStorage,{"averageExchangeRate/list":lt,"averageExchangeRate/amount":$}),ht={class:"m-24px"},mt={class:"h-40px flex items-center"},gt={class:"flex-center w-full"},wt={class:"flex-center flex-1"},xt=K({__name:"AverageExchangeRate",setup(t){const e=_(()=>{const i=[...a.value].sort((u,d)=>u.date>d.date?-1:1);let o=r.value;return i.map(u=>{const d=o>u.buy?u.buy:o;return o-=d,{date:ct(u.date,"yyyy/MM/dd"),sell:u.sell,buy:u.buy,exchangeRate:C(u.sell/u.buy,4),balance:d}})}),n=_(()=>{let i=0,o=0;for(const s of e.value)s.balance>0&&(o+=s.balance,i+=s.balance*s.exchangeRate);return C(i/o,4)}),a=N([]),r=N(0);return p(a,()=>{k.set("averageExchangeRate/list",a.value)},{deep:!0}),p(r,()=>{k.set("averageExchangeRate/amount",r.value)}),Z(()=>{const i=k.get("averageExchangeRate/list");i!==null&&(a.value=i),console.log("amount ",k.get("averageExchangeRate/amount")),r.value=k.get("averageExchangeRate/amount")??0}),(i,o)=>{const s=R("v-text-field"),u=R("v-data-table");return ae(),ee("main",ht,[W("p",mt,"平均匯率: "+te(n.value),1),W("div",gt,[o[1]||(o[1]=W("p",null,"剩餘金額: ",-1)),W("div",wt,[q(s,{modelValue:r.value,"onUpdate:modelValue":o[0]||(o[0]=d=>r.value=d),modelModifiers:{number:!0},"validate-on":"invalid-input",rules:[ne($)]},null,8,["modelValue","rules"])])]),q(u,{items:e.value},null,8,["items"])])}}});export{xt as default};
