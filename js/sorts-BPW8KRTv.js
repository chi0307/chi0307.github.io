function i(e,r){let s;return r==="asc"?s=(t,n)=>t>n?1:t<n?-1:0:s=(t,n)=>t>n?-1:t<n?1:0,[...e].sort(s)}function c(e,r,s){let t;return s==="asc"?t=(n,a)=>{const u=n[r],o=a[r];return u>o?1:u<o?-1:0}:t=(n,a)=>{const u=n[r],o=a[r];return u>o?-1:u<o?1:0},[...e].sort(t)}function l(e,r,s){return c(e,r,s)}export{i as a,c as b,l as s};
//# sourceMappingURL=sorts-BPW8KRTv.js.map
