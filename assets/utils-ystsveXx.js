function i(t){window.open(t,"_blank")}function s(t,n){const e=Math.pow(10,n);return Math.round(t*e)/e}function u(t,n,e){let o;return e==="asc"?o=(r,a)=>r[n]>a[n]?1:-1:o=(r,a)=>r[n]>a[n]?-1:1,[...t].sort(o)}export{s as a,i as r,u as s};