(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();function W(e,...t){const a=String.raw({raw:e},...t),n=document.createElement("template");return n.innerHTML=a.trim(),n.content.children.length===1?n.content.firstElementChild:n.content}function b(e){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const E=e=>`<span class="material-symbols-rounded">${b(e)}</span>`,O=e=>`<svg class="logo" viewBox="0 0 24 24" role="img" aria-hidden="true">${e}</svg>`,Nt=(e,t=1.8)=>O(`<g fill="none" stroke="currentColor" stroke-width="${t}" stroke-linecap="round"
        stroke-linejoin="round">${e}</g>`),Ba=(e=9.4)=>Array.from({length:6},(t,a)=>{const n=a/6*Math.PI*2-Math.PI/2;return[12+Math.cos(n)*e,12+Math.sin(n)*e]}),Lt={claude:()=>O(Array.from({length:8},(e,t)=>{const a=t/8*Math.PI*2,n=12+Math.cos(a)*3.2,r=12+Math.sin(a)*3.2,o=12+Math.cos(a)*9.4,s=12+Math.sin(a)*9.4;return`<line x1="${n.toFixed(2)}" y1="${r.toFixed(2)}" x2="${o.toFixed(2)}" y2="${s.toFixed(2)}"
          stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />`}).join("")),chatgpt:()=>{const e=Ba(),t=`M ${e.map(([n,r])=>`${n.toFixed(2)} ${r.toFixed(2)}`).join(" L ")} Z`,a=[0,2,4].map(n=>`M 12 12 L ${e[n][0].toFixed(2)} ${e[n][1].toFixed(2)}`).join(" ");return Nt(`<path d="${t}" /><path d="${a}" />`,1.7)},python:()=>O(`<path d="M11.8 2.6c-2.9 0-4.7.9-4.7 3v2.3h4.9v.9H5.4C3.3 8.8 2 10.3 2 13.2c0 2.8 1.1 4.4 3.2 4.4h1.7v-2.7c0-2.2 1.8-3.9 4-3.9h4.6c1.8 0 3.1-1.4 3.1-3.1V5.6c0-1.7-1.5-2.6-3.4-2.8-.9-.1-1.7-.2-2.4-.2Zm-2.6 2.1a1.1 1.1 0 1 1 0 2.3 1.1 1.1 0 0 1 0-2.3Z" fill="currentColor" />
       <path d="M12.2 21.4c2.9 0 4.7-.9 4.7-3v-2.3H12v-.9h6.6c2.1 0 3.4-1.5 3.4-4.4 0-2.8-1.1-4.4-3.2-4.4h-1.7v2.7c0 2.2-1.8 3.9-4 3.9H8.5c-1.8 0-3.1 1.4-3.1 3.1v3.3c0 1.7 1.5 2.6 3.4 2.8.9.1 1.7.2 2.4.2Zm2.6-2.1a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3Z" fill="currentColor" opacity="0.55" />`),vue:()=>O(`<path d="M2 3.5h4.2L12 13.6 17.8 3.5H22L12 20.8Z" fill="currentColor" />
       <path d="M6.9 3.5h3L12 7.3l2.1-3.8h3L12 12.6Z" fill="currentColor" opacity="0.45" />`),react:()=>O(`<circle cx="12" cy="12" r="2.1" fill="currentColor" />
       <g fill="none" stroke="currentColor" stroke-width="1.15">
         <ellipse cx="12" cy="12" rx="10" ry="3.9" />
         <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(60 12 12)" />
         <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(120 12 12)" />
       </g>`),node:()=>O(`<path d="M12 1.8 21.4 7v10L12 22.2 2.6 17V7Z" fill="currentColor" />
       <path d="M12 7.6c-2.2 0-3.4.9-3.4 2.4 0 1.6 1.2 2.1 3.2 2.4 2.1.3 2.3.6 2.3 1.1 0 .6-.5 1-1.9 1-1.5 0-2-.4-2.2-1.2a.4.4 0 0 0-.4-.3h-1a.4.4 0 0 0-.4.4c.1 1.6 1.2 2.6 3.9 2.6 2.4 0 3.8-1 3.8-2.7 0-1.6-1.1-2.1-3.4-2.4-2.2-.3-2.4-.4-2.4-1 0-.5.2-1 1.8-1 1.4 0 1.9.3 2.1 1.1a.4.4 0 0 0 .4.3h1a.4.4 0 0 0 .4-.4c-.2-1.6-1.3-2.3-3.8-2.3Z"
         fill="var(--md-sys-color-surface-container-lowest)" />`),laravel:()=>O('<path d="M2 6.2 6.4 3.6l4.4 2.6v5.1l4.4-2.5 4.4 2.5v5.1l-8.8 5.1-8.8-5.1Zm4.4-.8L3.8 6.9l2.6 1.5L9 6.9Zm-3.1 2.4v8.6l7.5 4.3v-8.6Zm8.4 12.9 7.5-4.3v-8.6l-7.5 4.3Zm3.5-11 2.6-1.5 2.6 1.5-2.6 1.5Z" fill="currentColor" />'),flutter:()=>O(`<path d="M13.6 1.5 3.2 11.9l3.2 3.2L20 1.5Z" fill="currentColor" opacity="0.45" />
       <path d="M13.5 11.4 8 16.9l3.3 3.4 3.2-3.2 5.5-5.7Z" fill="currentColor" />
       <path d="m8 16.9 5.5-5.5 2.2 2.2-5.4 5.5Z" fill="currentColor" opacity="0.7" />`),swift:()=>O(`<rect x="1.6" y="1.6" width="20.8" height="20.8" rx="6" fill="currentColor" />
       <path d="M16.6 15.6c-1.9 1.1-4.5 1.2-7.1 0a11.4 11.4 0 0 1-3.6-2.8c.5.4 1.1.7 1.7 1 2.4 1.2 4.8 1.1 6.5.1-2.4-1.9-4.5-4.3-6-6.3.4.4.8.8 1.3 1.1 1.5 1.3 3.9 3 4.8 3.5-1.9-2-3.6-4.5-3.5-4.4a41 41 0 0 0 6.7 5.4c.1.2.2.5.2.8.2.8 0 1.7-.4 2.4.5.6.4 1.7.2 2.2-.3-.9-.9-1.2-1.4-1.3Z"
         fill="var(--md-sys-color-surface-container-lowest)" />`)},Ft=(e,{size:t=8.4,y:a=15.2,x:n=12}={})=>`<text x="${n}" y="${a}" text-anchor="middle" font-size="${t}" font-weight="700"
     letter-spacing="-0.4" font-family="var(--cae-font-display)"
     fill="var(--md-sys-color-surface-container-lowest)">${e}</text>`,Ye=e=>O(`<rect x="1.8" y="1.8" width="20.4" height="20.4" rx="5.6" fill="currentColor" />${e}`),Ke=(e="")=>O(`<ellipse cx="12" cy="5.6" rx="7.8" ry="3" fill="currentColor" />
     <path d="M4.2 5.6v12.8c0 1.7 3.5 3 7.8 3s7.8-1.3 7.8-3V5.6c0 1.7-3.5 3-7.8 3s-7.8-1.3-7.8-3Z"
       fill="currentColor" opacity="0.42" />${e}`);Object.assign(Lt,{gemini:()=>O(`<path d="M12 1.4c.5 5.1 3.5 8.9 9.4 10.6-5.9 1.7-8.9 5.5-9.4 10.6-.5-5.1-3.5-8.9-9.4-10.6C8.5 10.3 11.5 6.5 12 1.4Z"
         fill="currentColor" />`),mcp:()=>Nt(`<path d="M3 15.4 10.8 7.6a3.1 3.1 0 0 1 4.4 4.4L9.6 17.6" />
       <path d="M6.9 19.3 15 11.2a3.1 3.1 0 0 1 4.4 4.4l-4.6 4.6" />
       <path d="M12.6 4.6a3.1 3.1 0 0 1 4.4 0l2.7 2.7" />`,1.7),ocr:()=>O(`<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
         <path d="M3 8V5.4A2.4 2.4 0 0 1 5.4 3H8M16 3h2.6A2.4 2.4 0 0 1 21 5.4V8M21 16v2.6a2.4 2.4 0 0 1-2.4 2.4H16M8 21H5.4A2.4 2.4 0 0 1 3 18.6V16" />
       </g>
       <g fill="currentColor">
         <rect x="7" y="8.6" width="10" height="1.7" rx="0.85" />
         <rect x="7" y="11.5" width="10" height="1.7" rx="0.85" opacity="0.6" />
         <rect x="7" y="14.4" width="6.4" height="1.7" rx="0.85" opacity="0.4" />
       </g>`),prompt:()=>O(`<path d="M4.4 3h15.2A2.4 2.4 0 0 1 22 5.4v9.8a2.4 2.4 0 0 1-2.4 2.4H10l-5.2 3.6a.7.7 0 0 1-1.1-.6v-3H4.4A2.4 2.4 0 0 1 2 15.2V5.4A2.4 2.4 0 0 1 4.4 3Z"
         fill="currentColor" />
       <g fill="none" stroke="var(--md-sys-color-surface-container-lowest)" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
         <path d="m7.4 7.6 2.8 2.7-2.8 2.7" /><path d="M12.4 13.4h4.4" />
       </g>`),javascript:()=>Ye(Ft("JS")),php:()=>O(`<ellipse cx="12" cy="12" rx="10.6" ry="6.6" fill="currentColor" />
       ${Ft("php",{size:7.4,y:14.6})}`),dart:()=>O(`<path d="M2.4 12.6 9.1 5.9l3.2 3.2-6.7 6.7Z" fill="currentColor" opacity="0.45" />
       <path d="M9.1 5.9h6.6l5.9 5.9v9.3h-9.3l-6.6-6.6Z" fill="currentColor" />`),html:()=>Nt('<path d="m8.4 7.6-5 4.4 5 4.4" /><path d="m15.6 7.6 5 4.4-5 4.4" /><path d="M13.6 4.8 10.4 19.2" />',2),tailwind:()=>O(`<path d="M7.4 6.2c-2.6 0-4.2 1.3-4.9 3.9.9-1.3 2-1.8 3.3-1.5.7.2 1.2.7 1.8 1.3.9 1 2 2.1 4.3 2.1 2.6 0 4.2-1.3 4.9-3.9-.9 1.3-2 1.8-3.3 1.5-.7-.2-1.2-.7-1.8-1.3-.9-1-2-2.1-4.3-2.1Z"
         fill="currentColor" />
       <path d="M12.3 13.9c-2.6 0-4.2 1.3-4.9 3.9.9-1.3 2-1.8 3.3-1.5.7.2 1.2.7 1.8 1.3.9 1 2 2.1 4.3 2.1 2.6 0 4.2-1.3 4.9-3.9-.9 1.3-2 1.8-3.3 1.5-.7-.2-1.2-.7-1.8-1.3-.9-1-2-2.1-4.3-2.1Z"
         fill="currentColor" opacity="0.55" />`),material3:()=>O(`<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.35" />
       <path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor" />
       <circle cx="12" cy="12" r="4.1" fill="var(--md-sys-color-surface-container-lowest)" />`),apple:()=>O(`<path d="M16.3 12.6c0-2.2 1.7-3.3 1.8-3.4-1-1.5-2.6-1.7-3.1-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1.1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.5Z"
         fill="currentColor" />
       <path d="M14.4 6.1c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.4-.6.6-1 1.7-.9 2.6 1 .1 2-.5 2.6-1.3Z"
         fill="currentColor" />`),vite:()=>O(`<path d="M2.2 4.6 12 21.6 21.8 4.6Z" fill="currentColor" opacity="0.4" />
       <path d="M13.9 2.4 8.6 12.5l3-.4-1.3 6.6 5.4-9.9-3 .4Z" fill="currentColor" />`),restapi:()=>O(`<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
         <path d="M7 3.4C4.6 3.4 5.4 8 5.4 9.6c0 1.4-.8 2.4-2.4 2.4 1.6 0 2.4 1 2.4 2.4 0 1.6-.8 6.2 1.6 6.2" />
         <path d="M17 3.4c2.4 0 1.6 4.6 1.6 6.2 0 1.4.8 2.4 2.4 2.4-1.6 0-2.4 1-2.4 2.4 0 1.6.8 6.2-1.6 6.2" />
         <path d="M12 9.6v4.8M12 12l-2.6-1.5M12 12l2.6-1.5" />
       </g>
       <g fill="currentColor">
         <circle cx="12" cy="8.2" r="1.7" /><circle cx="8.7" cy="15.4" r="1.5" />
         <circle cx="15.3" cy="15.4" r="1.5" />
       </g>`),nextjs:()=>O(`<circle cx="12" cy="12" r="10.2" fill="currentColor" />
       ${Ft("N",{size:10,y:15.9})}
       <path d="M14.6 8.4h1.6v8.4h-1.6Z" fill="var(--md-sys-color-surface-container-lowest)" />`),server:()=>O(`<g fill="currentColor">
         <rect x="2.6" y="3.4" width="18.8" height="5.6" rx="2" />
         <rect x="2.6" y="10.6" width="18.8" height="5.6" rx="2" opacity="0.62" />
         <rect x="2.6" y="17.8" width="18.8" height="2.8" rx="1.4" opacity="0.4" />
       </g>
       <g fill="var(--md-sys-color-surface-container-lowest)">
         <circle cx="6.4" cy="6.2" r="1.1" /><circle cx="6.4" cy="13.4" r="1.1" />
       </g>`),nginx:()=>{const t=`M ${Ba(10).map(([a,n])=>`${a.toFixed(2)} ${n.toFixed(2)}`).join(" L ")} Z`;return O(`<path d="${t}" fill="currentColor" />${Ft("N",{size:10,y:15.9})}`)},docker:()=>O(`<g fill="currentColor">
         <rect x="6.1" y="9.4" width="3.4" height="3.4" rx="0.6" />
         <rect x="10.3" y="9.4" width="3.4" height="3.4" rx="0.6" />
         <rect x="14.5" y="9.4" width="3.4" height="3.4" rx="0.6" />
         <rect x="10.3" y="5.4" width="3.4" height="3.4" rx="0.6" opacity="0.55" />
       </g>
       <path d="M2.4 14.2h19.2c0 3.7-2.9 6.4-7.4 6.4H8.6c-3.6 0-6.2-2.3-6.2-5.6Z" fill="currentColor" opacity="0.75" />`),actions:()=>O(`<g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
         <path d="M20.4 12a8.4 8.4 0 1 1-2.9-6.3" />
       </g>
       <path d="M18.6 2.6v4.2h-4.2Z" fill="currentColor" />
       <circle cx="12" cy="12" r="3.4" fill="currentColor" />`),mysql:()=>Ke(`<path d="M6.6 15.4c2.4.2 4-.7 5.1-2 1-1.3 2.4-2.1 4.4-1.9"
         fill="none" stroke="var(--md-sys-color-surface-container-lowest)"
         stroke-width="1.6" stroke-linecap="round" />`),mariadb:()=>Ke(`<path d="M8.2 16.4c1.3-2.6 3.6-3.6 6-3.4l1.8-2 .6 2.6"
         fill="none" stroke="var(--md-sys-color-surface-container-lowest)"
         stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />`),postgres:()=>O(`<path d="M12 2.2c4.6 0 7.9 3 7.9 7.3 0 3-1 5.1-1 7.6 0 1.9-1.2 3.2-2.7 3.2-1.2 0-1.9-.8-1.9-2 0-1.5.7-2.7.7-4.4 0-1.6-1.1-2.7-3-2.7s-3 1.1-3 2.7c0 1.7.7 2.9.7 4.4 0 1.2-.7 2-1.9 2-1.5 0-2.7-1.3-2.7-3.2 0-2.5-1-4.6-1-7.6C4.1 5.2 7.4 2.2 12 2.2Z"
         fill="currentColor" />
       <g fill="var(--md-sys-color-surface-container-lowest)">
         <circle cx="9.1" cy="8.6" r="1.3" /><circle cx="14.9" cy="8.6" r="1.3" />
       </g>`),firebase:()=>O(`<path d="M4.6 17.8 8.1 2.6l3.1 5.6-2.3 4.3Z" fill="currentColor" opacity="0.45" />
       <path d="m4.6 17.8 9.7-14.4 2.2 3.6-1.9 3.4 4.8 7.4Z" fill="currentColor" />
       <path d="M4.6 17.8 12 22.2l7.4-4.4-7.4-3.6Z" fill="currentColor" opacity="0.7" />`),aws:()=>O(`<g fill="currentColor">
         <rect x="3" y="4" width="5.2" height="5.2" rx="1.4" />
         <rect x="9.4" y="4" width="5.2" height="5.2" rx="1.4" opacity="0.7" />
         <rect x="15.8" y="4" width="5.2" height="5.2" rx="1.4" opacity="0.45" />
       </g>
       <path d="M2.6 14.6c5.2 3.4 13.6 3.4 18.8 0" fill="none" stroke="currentColor"
         stroke-width="1.9" stroke-linecap="round" />
       <path d="m18.6 15.8 3.4-1.6-1.3 3.5Z" fill="currentColor" />`),cloudflare:()=>O(`<path d="M17.4 19.4H7a5 5 0 0 1-.5-10 6.4 6.4 0 0 1 12.1 1.6 4.2 4.2 0 0 1-1.2 8.4Z" fill="currentColor" />
       <path d="M9.4 14.2h8.4a1.1 1.1 0 0 1 0 2.2H9.4a1.1 1.1 0 0 1 0-2.2Z"
         fill="var(--md-sys-color-surface-container-lowest)" />`),redis:()=>O(`<g fill="currentColor">
         <path d="M12 2.6 22 6.4 12 10.2 2 6.4Z" />
         <path d="M12 10 22 6.2v2.6L12 12.6 2 8.8V6.2Z" opacity="0.66" />
         <path d="M12 14.4 22 10.6v2.6L12 17 2 13.2v-2.6Z" opacity="0.45" />
         <path d="M12 18.8 22 15v2.6L12 21.4 2 17.6V15Z" opacity="0.3" />
       </g>`),figma:()=>O(`<g fill="currentColor">
         <path d="M8.6 1.8h3.2v6.4H8.6a3.2 3.2 0 0 1 0-6.4Z" />
         <path d="M12.2 1.8h3.2a3.2 3.2 0 0 1 0 6.4h-3.2Z" opacity="0.7" />
         <path d="M8.6 8.8h3.2v6.4H8.6a3.2 3.2 0 0 1 0-6.4Z" opacity="0.55" />
         <path d="M8.6 15.8h3.2v3.2a3.2 3.2 0 1 1-3.2-3.2Z" opacity="0.4" />
         <circle cx="15.4" cy="12" r="3.2" opacity="0.85" />
       </g>`),zed:()=>Ye(Ft("Z",{size:10.4,y:16})),github:()=>O(`<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
         fill="currentColor" />`)});Lt.codex=Lt.chatgpt;const Fe=e=>(Lt[e]??Lt.chatgpt)();Object.assign(Lt,{email:()=>Nt(`<rect x="2.6" y="4.9" width="18.8" height="14.2" rx="3.4" />
       <path d="M4.4 8.1l6.6 4.7a1.8 1.8 0 0 0 2 0l6.6-4.7" />`),threads:()=>Nt(`<path d="M18.4 7.9C17.4 5.2 15.2 3.8 12 3.8 7.6 3.8 5 6.9 5 12.9s2.6 8.9 7.2 8.9" />
       <path d="M12.2 21.8c3.2 0 5.4-1.6 5.4-4.1 0-2.4-1.9-3.8-5-3.8-1.9 0-3.2.9-3.2 2.2 0 1.1 1 1.9 2.3 1.9
                1.9 0 3-1.4 3.2-4.1.2-2.5-1-4-3.1-4-1.4 0-2.4.5-3 1.5" />`),instagram:()=>O(`<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
          stroke-linejoin="round">
         <rect x="3.1" y="3.1" width="17.8" height="17.8" rx="5.4" />
         <circle cx="12" cy="12" r="4.2" />
       </g>
       <circle cx="16.9" cy="7.1" r="1.25" fill="currentColor" />`),whatsapp:()=>O(`<path d="M12.1 3.4a8.6 8.6 0 0 0-7.3 13.1l-1.3 4.1 4.3-1.3A8.6 8.6 0 1 0 12.1 3.4Z"
         fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
       <path d="M9.5 8.6c.4-.1.7 0 .9.4l.7 1.5c.1.3 0 .5-.2.7l-.6.5c.6 1.3 1.6 2.2 2.9 2.7l.5-.6c.2-.3.5-.3.8-.2
                l1.5.7c.4.2.5.5.4.9-.3 1-1.1 1.6-2.2 1.5-3-.3-5.6-2.9-6-6-.1-1 .4-1.8 1.3-2.1Z"
         fill="currentColor" />`)});const B=e=>Math.round(e*100)/100,he=Math.PI*2;function Re(e,t,a){const n=e/2,r=[];for(let i=0;i<a;i+=1){const c=i/a*he-Math.PI/2,d=t(c)*n;r.push([n+d*Math.cos(c),n+d*Math.sin(c)])}const o=i=>r[(i+r.length)%r.length],s=[`M ${B(r[0][0])} ${B(r[0][1])}`];for(let i=0;i<r.length;i+=1){const[c,d,l,u]=[o(i-1),o(i),o(i+1),o(i+2)],p=[d[0]+(l[0]-c[0])/6,d[1]+(l[1]-c[1])/6],y=[l[0]-(u[0]-d[0])/6,l[1]-(u[1]-d[1])/6];s.push(`C ${B(p[0])} ${B(p[1])} ${B(y[0])} ${B(y[1])} ${B(l[0])} ${B(l[1])}`)}return s.push("Z"),s.join(" ")}function qa(e,t,a,n,r){const o=Math.max(1,Math.ceil(Math.abs(r-n)/(Math.PI/2))),s=(r-n)/o,i=4/3*Math.tan(s/4),c=[];for(let d=0;d<o;d+=1){const l=n+d*s,u=l+s,p=[e+a*Math.cos(l),t+a*Math.sin(l)],y=[e+a*Math.cos(u),t+a*Math.sin(u)],x=[p[0]-i*a*Math.sin(l),p[1]+i*a*Math.cos(l)],v=[y[0]+i*a*Math.sin(u),y[1]-i*a*Math.cos(u)];c.push([x,v,y])}return c}function za(e,t=.265){const a=t*e,n=e/2,r=Math.sqrt(Math.max(0,a*a-(n-a)**2)),o=[[e-a,a],[e-a,e-a],[a,e-a],[a,a]],s=[[n,a-r],[e-a+r,n],[n,e-a+r],[a-r,n]],i=([d,l],[u,p])=>Math.atan2(p-l,u-d),c=[`M ${B(s[0][0])} ${B(s[0][1])}`];for(let d=0;d<4;d+=1){const l=o[d],u=i(l,s[d]);let p=i(l,s[(d+1)%4]);for(;p<u;)p+=he;for(const[y,x,v]of qa(l[0],l[1],a,u,p))c.push(`C ${B(y[0])} ${B(y[1])} ${B(x[0])} ${B(x[1])} ${B(v[0])} ${B(v[1])}`)}return c.push("Z"),c.join(" ")}const Xe=(e,t=32)=>Re(e,()=>1,t),pe=(e,t)=>(a,n)=>Re(a,r=>1-e+e*Math.cos(n*(r+Math.PI/2)),n*t),_e=pe(.07,8),Je=pe(.13,8),cn=pe(.2,10),dn=pe(.16,6);function un(e,t=12){return Re(e,a=>.62+.38*Math.abs(Math.cos(t/2*(a+Math.PI/2)))**.35,t*6)}function hn(e){const t=e/2,a=e*.16,n=[`M 0 ${B(e-a)}`,`L 0 ${B(t)}`];for(const[r,o,s]of qa(t,t,t,Math.PI,he))n.push(`C ${B(r[0])} ${B(r[1])} ${B(o[0])} ${B(o[1])} ${B(s[0])} ${B(s[1])}`);return n.push(`L ${B(e)} ${B(e-a)}`,`Q ${B(e)} ${B(e)} ${B(e-a)} ${B(e)}`,`L ${B(a)} ${B(e)}`,`Q 0 ${B(e)} 0 ${B(e-a)}`,"Z"),n.join(" ")}function ve(e,t=5,a=.18){const n=e/2,r=[];for(let s=0;s<t;s+=1){const i=s/t*he-Math.PI/2;r.push([n+n*Math.cos(i),n+n*Math.sin(i)])}const o=[];for(let s=0;s<t;s+=1){const i=r[(s-1+t)%t],c=r[s],d=r[(s+1)%t],l=(y,x,v)=>[y[0]+(x[0]-y[0])*v,y[1]+(x[1]-y[1])*v],u=l(c,i,a),p=l(c,d,a);o.push(s===0?`M ${B(u[0])} ${B(u[1])}`:`L ${B(u[0])} ${B(u[1])}`,`Q ${B(c[0])} ${B(c[1])} ${B(p[0])} ${B(p[1])}`)}return o.push("Z"),o.join(" ")}const Qe={clover:e=>za(e),circle:e=>Xe(e,32),circle12:e=>Xe(e,96),cookie:e=>_e(e,7),cookie4:e=>Je(e,4),cookie8:e=>_e(e,8),cookie12:e=>_e(e,12),sunny:e=>Je(e,8),flower:e=>cn(e,8),burst:e=>un(e,12),softBurst:e=>dn(e,10),arch:e=>hn(e),pentagon:e=>ve(e,5,.18),gem:e=>ve(e,6,.22),diamond:e=>ve(e,4,.24)};function pn(e,t){return(Qe[e]??Qe.cookie)(t)}function rt(e,t){return`path("${pn(e,t)}")`}const ke="アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFZ<>*+-/|=",Oa=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches,xe=(e,t)=>getComputedStyle(e).getPropertyValue(t).trim(),Kt=e=>new Promise(t=>setTimeout(t,e));function mn(e){const t=e.getContext("2d"),a=13,n=10;let r=[],o=0,s=0;const i=xe(e,"--term-accent"),c=xe(e,"--term-tail"),d=xe(e,"--cae-font-mono")||"monospace",l=h=>({y:h,speed:140+Math.random()*260,offset:Math.floor(Math.random()*ke.length)});function u(){const h=Math.min(window.devicePixelRatio||1,2),f=e.getBoundingClientRect();o=Math.max(f.width,1),s=Math.max(f.height,1),e.width=Math.round(o*h),e.height=Math.round(s*h),t.setTransform(h,0,0,h,0,0),t.font=`${a}px ${d}`,t.textBaseline="top";const _=Math.ceil(o/a);r=Array.from({length:_},(A,M)=>r[M]??l(Math.random()*s)),r.length=_}function p(h,f){t.globalCompositeOperation="destination-out",t.globalAlpha=.09,t.fillStyle=i,t.fillRect(0,0,o,s),t.globalCompositeOperation="source-over",r.forEach((_,A)=>{const M=A*a;_.y+=_.speed*h,_.y-n*a>s&&Object.assign(_,l(-a*Math.random()*12));const $=Math.floor(_.y/a)*a;for(let I=0;I<n;I+=1){const P=$-I*a;if(P<-a||P>s)continue;t.globalAlpha=I===0?1:Math.max(.05,.62-I*.07),t.fillStyle=I===0?i:c;const q=ke[(_.offset+I*7+(I===0?f:0))%ke.length];t.fillText(q,M,P)}}),t.globalAlpha=1}u();const y=()=>u();window.addEventListener("resize",y);let x=0,v=performance.now(),k=0;const w=h=>{if(!e.isConnected)return g();const f=Math.min((h-v)/1e3,.05);v=h,k+=1,p(f,k),x=requestAnimationFrame(w)};x=requestAnimationFrame(w);function g(){cancelAnimationFrame(x),window.removeEventListener("resize",y)}return g}function fn(e){const t=document.createElement("span");t.textContent="M".repeat(20),t.style.cssText="position:absolute;visibility:hidden;white-space:pre;",e.append(t);const a=t.getBoundingClientRect().width/20,n=t.getBoundingClientRect().height;return t.remove(),a&&n?a/n:.5}function gn(e,{columns:t,ramp:a,ratio:n,crop:r}){return new Promise((o,s)=>{const i=new Image;i.crossOrigin="anonymous",i.onerror=s,i.onload=()=>{const c={x:r?.x*i.width,y:r?.y*i.height,width:r?.width*i.width,height:r?.height*i.height},d=Math.max(1,Math.round(t*c.height*n/c.width)),l=document.createElement("canvas");l.width=t,l.height=d;const u=l.getContext("2d",{willReadFrequently:!0});u.drawImage(i,c.x,c.y,c.width,c.height,0,0,t,d);const{data:p}=u.getImageData(0,0,t,d),y=[];for(let x=0;x<d;x+=1){let v="";for(let k=0;k<t;k+=1){const w=(x*t+k)*4,g=p[w+3]/255,f=(.2126*p[w]+.7152*p[w+1]+.0722*p[w+2])/255*g+(1-g),_=Math.min(a.length-1,Math.round((1-f)*(a.length-1)));v+=a[_]}y.push(v.replace(/\s+$/,""))}o(y)},i.src=e})}function ta(e,t,a=90){return Oa()||!t?(e.textContent=t,Promise.resolve()):(e.textContent="",new Promise(n=>{const r=performance.now(),o=s=>{if(!e.isConnected)return n();const i=Math.floor((s-r)/1e3*a);if(e.textContent=t.slice(0,i),i>=t.length)return e.textContent=t,n();requestAnimationFrame(o)};requestAnimationFrame(o)}))}async function yn(e,{photo:t,ramp:a,columns:n,crop:r,loaderMs:o=3e3}){const s=e.querySelector(".term-boot"),i=e.querySelector(".term-rain"),c=e.querySelector(".term-boot__log"),d=e.querySelector(".term-ascii"),l=e.querySelector(".term-readout"),u=()=>e.isConnected,p=Oa(),y=gn(t,{columns:n,ramp:a,crop:r,ratio:fn(d)}).catch(()=>null),x=p?()=>{}:mn(i),v=[...c.querySelectorAll(".term-boot__line")],k=(o-400)/Math.max(v.length,1);for(const h of v){if(!u())return x();const f=performance.now();h.classList.add("is-live"),await ta(h.querySelector(".term-boot__text"),h.dataset.text,130),await Kt(p?0:Math.max(0,k-(performance.now()-f)))}if(await Kt(p?0:260),!u())return x();s.classList.add("is-done"),await Kt(p?0:420),x(),s.remove(),e.classList.add("is-booted");const w=await y;if(!u())return;w&&(d.textContent="",w.forEach((h,f)=>{const _=document.createElement("span");_.className="term-ascii__row",_.style.setProperty("--row",String(f)),_.textContent=h||" ",d.append(_)}));const g=[...l.querySelectorAll(".term-field")];for(const h of g){if(!u())return;h.classList.add("is-live"),await ta(h.querySelector(".term-field__value"),h.dataset.text,55),await Kt(p?0:90)}u()&&e.querySelector(".term-cta")?.classList.add("is-live")}const bn="/assets/wallpaper-0-3KumBnY9.jpg",wn="/assets/wallpaper-1-Bb5A5ZDv.jpg",_n="/assets/wallpaper-2-B30p_e9F.jpg",vn="/assets/wallpaper-3-DGTyZPLh.jpg",kn="/assets/wallpaper-5-m3TaAVb1.jpg",xn="/assets/wallpaper-6-BDCSQrqI.jpg",Mn="/assets/wallpaper-7-BSEVDRux.jpg",An="/assets/wallpaper-8-DoavqWU2.jpg",$n="/assets/wallpaper-9-C5Y8C-kC.jpg",Pn="/assets/profile_2-al3RK89v.png",Sn="/assets/profile_4-5l50RmmT.png",ja="/assets/profile_3--Zo3oDKR.png",Cn="/assets/quran-ZsW3NI8F.png",In="/assets/juarasilat-light-CTPumEwe.svg",Tn="/assets/juarasilat-dark-BGWRy189.svg",Ln="/assets/fino-light-EILpilHN.png",En="/assets/fino-dark-SA7IE_xO.png",K={name:"Ahnaf Faiz",role:"Software Developer · AI Builder",roles:["Software Developer","Vibe Coder","AI Enthusiast"],photo:Pn,location:"Indonesia · UTC+7",status:"Open to work",contactEmail:"ahnafsite@gmail.com"},Dn={host:"ahnaf",machine:"profile",birthDate:"2000-03-26",address:"Sragen, Central Java · Indonesia",interests:["Business","AI","Software"],asciiPhoto:ja,asciiCrop:{x:.24,y:0,width:.52,height:.4},asciiRamp:" .:-=+*#%@",asciiColumns:64,bootLines:["initialising kernel modules ......... ok","mounting /dev/identity ............. ok","decrypting portrait stream ......... ok","loading personality profile ........ ok"],collaboration:{label:"open collaboration",command:"./open-collaboration.sh"}},ea={src:ja,alt:"Ahnaf Faiz in a tailored suit, ready to collaborate"},kt={heroTitle:"Software for the real world.",heroLead:"I build products where business clarity, engineering discipline, and AI leverage meet — from the first useful idea to the app people can rely on.",manifestoTitle:"Not a fantasy app. A useful one.",manifesto:"My favourite work starts with a real operation: a team that needs to move faster, a business that needs better tools, or a repetitive task that should disappear. I stay close to that reality while turning the requirements into software that works.",marqueeWords:["AHNAF","FAIZ","VIBE CODING","ARTIFICIAL INTELLIGENCE","DEVELOPER","BUSINESS FIRST","SHIP USEFUL"],collaborationTitle:"Bring me the messy idea.",collaborationBody:"Tell me what is slow, unclear, or still living in a spreadsheet. We can shape it into a product with a job to do."},Fn=[{title:"Business owner",label:"I build from the inside",icon:"storefront",body:"I understand that software has to earn its place in a business. Every app should support a real workflow, a real customer, or a real decision — not just look impressive in a demo."},{title:"Software engineer",label:"I make requirements executable",icon:"engineering",body:"An engineering background helps me translate business requirements into systems that are clear, maintainable, and ready to grow across web, Flutter, and native iOS."},{title:"AI enthusiast",label:"I multiply the work",icon:"neurology",body:"I use powerful AI across the work — for exploration, automation, and delivery — to move faster, stay focused, and make more room for the decisions that matter."}],Rt={kicker:"Skills",portrait:Sn,portraitAlt:"Ahnaf Faiz, arms folded, in a black suit",title:"Business sense, engineering discipline, AI leverage.",lede:"Four ways of working that decide what gets built — and the stack I use to get it live. Hover any tool to see what it actually does for the work."},aa=[{title:"Business background",label:"Where the work starts",icon:"storefront",shape:"clover",body:"I read the operation before the codebase — margin, workflow, and who actually clicks the button. Software should earn its cost, not decorate the roadmap.",marks:["Requirement discovery","Process mapping","Cost vs. impact"]},{title:"Problem-solving thinking",label:"How I get unstuck",icon:"lightbulb",shape:"cookie12",body:"Cut the mess into pieces small enough to be wrong about. Find the real constraint first, then make the cheapest change that moves it — no heroic rewrite for a two-line cause.",marks:["Root cause first","Smallest viable fix","Trade-offs stated"]},{title:"System planner & designer",label:"Before the first commit",icon:"architecture",shape:"flower",body:"Data model, design system, interface and logic planned as one piece. Names, states and edge cases settled on paper, so the build is assembly instead of improvisation.",marks:["Database","Design system","UI/UX","Business logic"]},{title:"AI as leverage",label:"How I move fast",icon:"neurology",shape:"sunny",body:"AI is a crew, not a toy: scoped prompts, MCP tooling, custom skills. It drafts, I direct — and every line still gets reviewed, so speed never costs correctness.",marks:["Scoped prompts","MCP tooling","Custom skills","Human review"]}],zt=[{group:"AI",icon:"auto_awesome",blurb:"The crew that drafts, researches and automates alongside me.",items:[{name:"Claude",logo:"claude",note:"Daily driver for building — long-context reasoning, code and custom skills."},{name:"ChatGPT",logo:"chatgpt",note:"Fast second opinion for research, drafting and quick specs."},{name:"Gemini",logo:"gemini",note:"Long documents and image understanding when the input outgrows plain text."},{name:"MCP",logo:"mcp",note:"Model Context Protocol — wires the model straight into real tools and data."},{name:"OCR",logo:"ocr",note:"Pulls structured data out of scans, invoices and photographed documents."},{name:"Prompt engineering",logo:"prompt",note:"Turns a vague request into a spec the model can repeat reliably."}]},{group:"Languages",icon:"code",blurb:"What the logic is actually written in, front to back.",items:[{name:"Python",logo:"python",note:"Automation, data work and the glue around AI services."},{name:"JavaScript",logo:"javascript",note:"The language every browser layer and Node service runs on."},{name:"PHP",logo:"php",note:"Backend workhorse behind Laravel services and long-lived systems."},{name:"Dart",logo:"dart",note:"Powers Flutter — one codebase for Android and iOS."},{name:"Swift",logo:"swift",note:"Native iOS when the platform deserves a closer fit."}]},{group:"Frontend",icon:"web",blurb:"The surface people touch — structured, themed and responsive.",items:[{name:"HTML",logo:"html",note:"Semantic structure first — accessible markup before any framework."},{name:"Tailwind",logo:"tailwind",note:"Utility-first CSS — consistent spacing and colour without stylesheet drift."},{name:"Material 3",logo:"material3",note:"Google’s system: colour tokens, shape scale and expressive motion."},{name:"Human Interface",logo:"apple",note:"Apple’s guidelines — native feel, gestures and restraint on iOS."},{name:"Flutter",logo:"flutter",note:"Cross-platform apps with one UI codebase down to the widget."},{name:"Vue JS",logo:"vue",note:"Reactive interfaces with a template syntax a whole team can read."},{name:"React JS",logo:"react",note:"Component architecture for larger, state-heavy product UIs."},{name:"Vite",logo:"vite",note:"Instant dev server and lean production builds."}]},{group:"Backend",icon:"dns",blurb:"Where the rules live and the contracts are kept.",items:[{name:"Laravel",logo:"laravel",note:"Full PHP framework — auth, queues and migrations out of the box."},{name:"Node JS",logo:"node",note:"JavaScript on the server for realtime work and service glue."},{name:"REST API",logo:"restapi",note:"Versioned contracts that keep clients and services decoupled."},{name:"Next JS",logo:"nextjs",note:"React with routing, SSR and API routes in one deployable."}]},{group:"Infrastructure",icon:"cloud",blurb:"Getting it live, and keeping it alive after launch.",items:[{name:"VPS deployment",logo:"server",note:"Provision, ship and maintain the box the product runs on."},{name:"Nginx",logo:"nginx",note:"Reverse proxy, TLS and static serving in front of the app."},{name:"Docker",logo:"docker",note:"Same environment on my machine and in production."},{name:"GitHub Actions",logo:"actions",note:"Tests and deploys that run themselves on every push."}]},{group:"Database & storage",icon:"database",blurb:"The part that has to still be correct in three years.",items:[{name:"MySQL",logo:"mysql",note:"Relational default — schemas, indexes and queries that stay fast."},{name:"MariaDB",logo:"mariadb",note:"Drop-in MySQL alternative for self-hosted deployments."},{name:"PostgreSQL",logo:"postgres",note:"Where the data model gets serious — JSONB, constraints, real types."},{name:"Firebase",logo:"firebase",note:"Realtime sync, auth and push for apps that ship fast."},{name:"AWS",logo:"aws",note:"Compute, storage and managed services when scale demands it."},{name:"Cloudflare R2",logo:"cloudflare",note:"Object storage with no egress fees for media-heavy apps."},{name:"Redis",logo:"redis",note:"Cache, queues and sessions — the pressure valve in front of the database."}]},{group:"Design",icon:"brush",blurb:"Deciding how it looks and behaves before it is built.",items:[{name:"Figma",logo:"figma",note:"Design system, components and handoff the build can actually follow."},{name:"Claude Design",logo:"claude",note:"AI-assisted layouts — idea to reviewable screens in minutes."}]},{group:"Workbench",icon:"handyman",blurb:"Where the hours are spent and the history is kept.",items:[{name:"Zed Editor",logo:"zed",note:"Fast, collaborative editor with AI in the loop."},{name:"GitHub",logo:"github",note:"Version control, reviews and CI as the spine of the project."}]}];zt.map(e=>({group:e.group,items:e.items.map(t=>t.name)}));const na=[{period:"2019 — 2021",role:"Intern Fullstack Software Developer",org:"UPT Teknologi Informasi dan Komunikasi UNS",body:"Built experience across full-stack development in the technology and information services unit at UNS.",tags:["Full-stack","UNS"]},{period:"Mar — Apr 2022",role:"Assistant Mentor · Junior Web Programmer",org:"PT Tiga Serangkai Pustaka Mandiri",body:"Supported certification and internship programmes while contributing to web programming work.",tags:["Web programming","Mentoring"]},{period:"2022 — Present",role:"Founder & Developer",org:"Juara Silat · PT JSI Teknologi Utama",body:"Created and developed a digital platform for pencak silat, including competition workflows and scoring experiences.",tags:["Product","Laravel","Digital scoring"]},{period:"2023 — 2024",role:"Freelance Backend Developer",org:"PT Tebar Digital Kreasi",body:"Built and supported backend services for digital products, with an emphasis on clear data and reliable delivery.",tags:["Laravel","PHP","PostgreSQL"]},{period:"2024 — 2025",role:"Mentor",org:"LPK An-Nur Education Center",body:"Guided learners through practical software development and helped them build confidence by shipping real work.",tags:["Mentoring","Web development"]},{period:"2025 — Present",role:"Head of the Data and Information Technical Implementation Unit",org:"STAI Bina Muwahhidin Boyolali",site:"staibinamuwahhidin.ac.id",href:"https://staibinamuwahhidin.ac.id",body:"Lead the campus data and information unit — academic systems, reporting, and the infrastructure the institution runs on.",tags:["Leadership","Academic systems","Data"]}],Xt={label:"Next chapter",title:"Ready for new experience",body:"The timeline has room at the bottom. If you are building something that needs business clarity, engineering discipline, and AI leverage in one person, that next entry could be yours.",action:"Start a conversation"},Rn=[{period:"2006 — 2012",school:"SD N Saren 2",detail:"Primary education"},{period:"2012 — 2015",school:"SMP N 1 Gemolong",detail:"Junior secondary education"},{period:"2015 — 2018",school:"SMA N 1 Gemolong",detail:"Senior secondary education"},{period:"2018 — 2022",school:"Sebelas Maret University",detail:"Computer Science Education"}],Jt={kicker:"Selected work",title:"Systems people run their day on.",lede:"Campus registrars, championship juries, cashiers on a Saturday rush, small business owners typing into WhatsApp. Every build below went into real hands and stayed there.",ticker:["Point of sale","Digital scoring","WhatsApp bookkeeping","Academic journal","Campus registry","Service desk","Scholarship intake"]},ra=[{name:"Ventedaily POS",kind:"Point of sale",year:"2025",role:"Fullstack developer",status:"In production",shape:"clover",icon:"point_of_sale",accent:"primary",body:"A point of sale built for the way a fashion store actually sells: one product, a matrix of sizes and colours, and stock that has to stay honest across outlets. The cashier screen is keyboard-first for a queue, the back office is where margin, restock and shift cash get settled.",highlights:["Size and colour variant matrix with per-outlet stock","Cashier shift, cash drawer reconciliation and thermal receipts","Daily sales, best-seller and dead-stock reporting"],metrics:[{value:"Multi",label:"outlet stock"},{value:"Offline",label:"tolerant cashier"}],tags:["Laravel","Livewire","Filament","MySQL","Tailwind CSS"],link:null},{name:"Juara Silat",kind:"Championship platform",year:"2022 — now",role:"Founder and developer",status:"Live",shape:"burst",icon:"sports_martial_arts",accent:"tertiary",body:"The championship stack for pencak silat, from registration to the scoreboard the crowd watches. Contingents enter athletes online, the draw builds its own brackets, and jury tablets feed a scoring engine that settles a bout the moment the last judge presses. Carried an international championship without a paper scoresheet.",highlights:["Digital jury scoring with live tabulation and instant verdicts","Automatic draw, brackets and match scheduling per arena","Public live scoreboard, medal tally and contingent standings"],metrics:[{value:"Intl.",label:"championship run"},{value:"Realtime",label:"jury sync"}],tags:["Laravel","Livewire","Alpine.js","WebSocket","MySQL"],link:{label:"juarasilat.com",href:"https://juarasilat.com"}},{name:"Fino App",kind:"Fintech",year:"2024",role:"Backend and integration",status:"Live",shape:"cookie12",icon:"chat",accent:"secondary",body:'Bookkeeping with no app to open. Type "beli kopi 25rb" into WhatsApp and the parser turns it into a categorised entry, then answers back with the running balance. Built for owners who will never keep a spreadsheet but always answer a chat.',highlights:["Natural-language message parsed into a categorised transaction","WhatsApp Cloud API webhooks with idempotent message handling","Daily, weekly and monthly recaps pushed back into the thread"],metrics:[{value:"0",label:"apps to install"},{value:"Chat",label:"first ledger"}],tags:["Laravel","WhatsApp API","Queue workers","PostgreSQL"],link:{label:"finoapp.id",href:"https://finoapp.id"}},{name:"Journal STAI Bina Muwahhidin",kind:"Academic publishing",year:"2024",role:"Fullstack developer",status:"Live",shape:"arch",icon:"menu_book",accent:"primary",body:"The open journal system for the campus: authors submit, editors assign reviewers, and a blind review runs its rounds until an issue is ready to publish. Every article ships with citation metadata and a permanent URL, so the work is findable long after the issue closes.",highlights:["Submission, blind peer review and editorial decision workflow","Issue and volume publishing with citation-ready metadata","Indexable article pages with PDF delivery and download counts"],metrics:[{value:"Peer",label:"review rounds"},{value:"Open",label:"access issues"}],tags:["Laravel","Bootstrap","MySQL","SEO metadata"],link:{label:"ejournal.staibinamuwahhidin.ac.id",href:"https://ejournal.staibinamuwahhidin.ac.id"}},{name:"Siakad STAI Bina Muwahhidin",kind:"Campus system",year:"2023",role:"Fullstack developer",status:"In production",shape:"flower",icon:"school",accent:"tertiary",body:"The academic information system the campus runs a semester on. Students file a KRS and read their KHS, lecturers grade their own classes, and the registrar closes the term knowing the numbers reported to PDDikti already match what the database says.",highlights:["KRS, KHS and transcript flow across student, lecturer and registrar roles","Class, schedule and lecturer allocation per semester","Reporting shaped to PDDikti Feeder so a sync does not need repair"],metrics:[{value:"3",label:"role portals"},{value:"PDDikti",label:"ready reporting"}],tags:["Laravel","Livewire","MySQL","Bootstrap"],link:{label:"siakad.staibinamuwahhidin.ac.id",href:"https://siakad.staibinamuwahhidin.ac.id"}},{name:"Service Management — Dharma Trikarya",kind:"Service platform",year:"2023",role:"Backend developer",status:"Delivered",shape:"gem",icon:"engineering",accent:"secondary",body:"The backend behind customer and service handling at PT Dharma Trikarya, built during the Tebar Digital engagement. A request comes in, gets an owner and a status, and stays traceable from first contact to the closing note — no ticket living only in someone’s inbox.",highlights:["Customer records tied to their full service history","Work order lifecycle with assignment and status tracking","Operational reporting for load and turnaround time"],metrics:[{value:"One",label:"trail per request"},{value:"Ops",label:"ready reporting"}],tags:["Laravel","jQuery","Ajax","MySQL"],link:null},{name:"SIBEA — Sistem Informasi Beasiswa UNS",kind:"Campus system",year:"2021",role:"Fullstack developer",status:"Delivered",shape:"pentagon",icon:"workspace_premium",accent:"primary",body:"Scholarship management for Sebelas Maret University, moved off paper and into one online flow. Students apply and upload once, verifiers work a queue instead of a stack of folders, and the awarding decision lands with the record that justified it still attached.",highlights:["Online intake with document upload and eligibility checks","Verification queue across faculty and university reviewers","Awarding, recipient records and per-scheme recap reporting"],metrics:[{value:"Campus",label:"wide intake"},{value:"Paperless",label:"verification"}],tags:["Laravel","Bootstrap","jQuery","Ajax"],link:null},{name:"Your app here",kind:"Open slot",year:"Next",role:"Let us build it",status:"Open for work",shape:"sunny",icon:"add",accent:"invite",invite:!0,body:"A stubborn internal process, a product that needs a first version, or a system that has outgrown its spreadsheet. Bring the messy version — scoping it is part of the job.",highlights:["Discovery and scoping before a line is written","Shipped in slices, reviewable from the first week"],metrics:[],tags:["Laravel","Livewire","Filament","Flutter","AI integration"],link:null}],Qt={kicker:"What I run",title:"Two products with customers, not slide decks.",lede:"Both started as a problem somebody kept paying people to do by hand — scoring a championship on paper, or keeping a household ledger nobody ever opens. They ship, they bill, and they answer to real users every week.",ticker:["BUILT","SHIPPED","RUNNING","IN PRODUCTION"]},Me=[{id:"juarasilat",name:"Juara Silat",kind:"Championship platform",tagline:"Digital scoring for pencak silat.",since:"2022",accent:"primary",shape:"burst",icon:"sports_martial_arts",logo:{light:In,dark:Tn,alt:"Juara Silat"},body:"The championship stack Indonesian pencak silat actually runs on. A committee publishes an event, contingents register their athletes online, and categories, documents, payment, schedule and brackets settle in one workflow instead of a folder of spreadsheets.",body2:"On match day the arena tablets feed a scoring engine that reads out a verdict the moment the last judge presses — faster, transparent, and with a recap the committee can hand over before the mat is swept. No paper scoresheet, no recount.",highlights:["Championship management: publication, contingent registration, categories, documents, payment","Digital scoring for arena operators, with live tabulation and instant verdicts","Automatic draw, brackets and per-arena scheduling"],metrics:[{value:"60+",label:"institutions trusting it"},{value:"3 yrs",label:"running since 2022"},{value:"Intl.",label:"local to international events"}],tags:["Laravel","Livewire","Alpine.js","WebSocket","MySQL"],link:{label:"juarasilat.com",href:"https://juarasilat.com"}},{id:"fino",name:"Fino App",kind:"Personal finance",tagline:"Free money tracking, inside WhatsApp.",since:"2024",accent:"tertiary",shape:"clover",icon:"account_balance_wallet",logo:{light:Ln,dark:En,alt:"Fino — Financial Note"},body:"Fino turns the chat a family is already having into a clean set of books. Send a sentence, a photo of a receipt, or a PDF, and Fino reads the amount, merchant, date and line items back out into the right wallet and category.",body2:"Budgets signal before the limit rather than after it, a shared ledger keeps the household working from the same numbers, and the dashboard reads daily patterns back in plain language. Nobody has to install a new app to start — the habit stays where it already lives.",highlights:["Record from WhatsApp in text, photo or PDF — no new app to download","Receipts parsed automatically: amount, merchant, date and items","Shared family ledger, budget alerts, and a dashboard of wallets and categories"],metrics:[{value:"Free",label:"to start, no card"},{value:"Rp25k",label:"personal, per month"},{value:"Rp35k",label:"family, per month"}],tags:["WhatsApp API","OCR","Laravel","AI parsing","PostgreSQL"],link:{label:"finoapp.id",href:"https://finoapp.id"}}],Bn=[{label:"Email",value:"ahnafsite@gmail.com",icon:"mail",logo:"email",href:"mailto:ahnafsite@gmail.com"},{label:"Threads",value:"www.threads.com/@ahnaf.faize",icon:"alternate_email",logo:"threads",href:"https://www.threads.com/@ahnaf.faize"},{label:"Instagram",value:"www.instagram.com/ahnaf.faize/",icon:"photo_camera",logo:"instagram",href:"https://www.instagram.com/ahnaf.faize/"},{label:"GitHub",value:"github.com/ahnaffaiz",icon:"code",logo:"github",href:"https://github.com/ahnaffaiz"},{label:"WhatsApp",value:"62 8587 7159 577",icon:"chat",logo:"whatsapp",href:"https://wa.me/6285877159577"}],At={src:"/audio/al-kahf.mp3",cover:Cn,title:"Surah Al-Kahf",artist:"Mishary Rashid Alafasy",album:"The Cave · 110 verses"},qn=[{name:"Claude Code",logo:"claude"},{name:"Codex",logo:"chatgpt"},{name:"Python",logo:"python"},{name:"Vue JS",logo:"vue"},{name:"React JS",logo:"react"},{name:"Node JS",logo:"node"},{name:"Laravel",logo:"laravel"},{name:"Flutter",logo:"flutter"},{name:"Swift",logo:"swift"}],Ae={meters:[{label:"Business Owner",value:78,icon:"storefront"},{label:"Software Developer",value:94,icon:"code"},{label:"AI Enthusiast",value:88,icon:"neurology"}],facts:[{value:"2",label:"Running businesses",icon:"storefront"},{value:"100+",label:"Successful projects",icon:"task_alt"},{value:"2",label:"Languages",detail:"Indonesian · English",icon:"translate"}]},sa={title:"How I work",steps:[{name:"Business analytics",detail:"Understand the business before a line of code exists.",icon:"insights"},{name:"System planning",detail:"Scope, milestones, and what not to build.",icon:"route"},{name:"Feature solution",detail:"Turn each requirement into something buildable.",icon:"extension"},{name:"System designing",detail:"Data model, architecture, and the interface around it.",icon:"architecture"},{name:"Start coding",detail:"Build it, then keep it healthy.",icon:"code"},{name:"Deploy",detail:"Ship it, watch it, and fix what the users actually hit.",icon:"rocket_launch"}]},oa={temperature:28,code:0,place:"Indonesia"},Q=[{id:"spidey",name:"Spidey",tag:"Friendly Neighbour",src:bn,seed:"#5b9bd5",dark:!1},{id:"village",name:"Village",tag:"Pixel Realm",src:wn,seed:"#4a7fbf",dark:!1},{id:"samurai",name:"Samurai",tag:"Bushidō",src:_n,seed:"#b93a2f",dark:!1},{id:"fuji",name:"Fuji",tag:"Autumn Lake",src:vn,seed:"#c2456b",dark:!0},{id:"dawn",name:"Dawn",tag:"Twilight Ridge",src:kn,seed:"#8b7fd0",dark:!1},{id:"alpine",name:"Alpine",tag:"Mirror Lake",src:xn,seed:"#2f8fd0",dark:!1},{id:"naruto",name:"Naruto",tag:"Shinobi",src:Mn,seed:"#e8912e",dark:!1},{id:"revuelto",name:"Revuelto",tag:"Hypercar",src:An,seed:"#a4d000",dark:!0},{id:"summit",name:"Summit",tag:"Highland Vista",src:$n,seed:"#3f7d8c",dark:!0}],Be=e=>e.map(t=>`<span class="pill">${b(t)}</span>`).join("");function zn(){const e=kt.marqueeWords.map(t=>`<span>${b(t)}</span>`).join("<i>·</i>");return W`
    <article class="about-app about-surface">
      <div class="about-wordstream about-wordstream--back" aria-hidden="true">
        <div class="about-wordstream__track">${e}<b>${e}</b></div>
      </div>
      <div class="about-wordstream about-wordstream--front" aria-hidden="true">
        <div class="about-wordstream__track">${e}<b>${e}</b></div>
      </div>

      <section class="about-max-hero">
        <div class="about-max-hero__copy">
          <p class="about-kicker">${E("waving_hand")} About me</p>
          <p class="about-hero__status">${b(K.status)} <span>·</span> ${b(K.location)}</p>
          <h1 class="about-max-hero__title">${b(kt.heroTitle)}</h1>
          <p class="about-max-hero__lede">${b(kt.heroLead)}</p>
          <a class="btn about-m3-button" href="mailto:${b(K.contactEmail)}">
            ${E("mail")} Open collaboration
          </a>
        </div>

        <div class="about-gallery">
          <figure class="about-gallery__photo about-gallery__photo--single">
            <img src="${b(K.photo)}" alt="Ahnaf Faiz in a tailored suit, looking toward the camera" loading="eager" />
          </figure>
          <span class="about-gallery__caption">${b(K.role)}<br />Web · mobile · AI</span>
        </div>
      </section>

      <section class="about-manifesto">
        <div>
          <p class="about-section-label">${E("flare")} The point of view</p>
          <h2>${b(kt.manifestoTitle)}</h2>
        </div>
        <p>${b(kt.manifesto)}</p>
      </section>

      <section class="about-section about-principles">
        <div class="about-section__heading">
          <p class="about-section-label">How I think</p>
          <h2>Three ways I make the work stronger.</h2>
        </div>
        <div class="about-principles__grid">
          ${Fn.map((t,a)=>`
                <article class="about-principle about-principle--${a+1}" style="--about-delay:${a*90}ms">
                  <span class="about-principle__number">0${a+1}</span>
                  <span class="about-principle__icon">${E(t.icon)}</span>
                  <p class="about-principle__label">${b(t.label)}</p>
                  <h3>${b(t.title)}</h3>
                  <p class="about-principle__body">${b(t.body)}</p>
                </article>`).join("")}
        </div>
      </section>

      <section class="about-section about-education-strip">
        <div class="about-section__heading">
          <p class="about-section-label">A little context</p>
          <h2>Rooted in computer science.</h2>
        </div>
        <div class="about-education-strip__list">
          ${Rn.map((t,a)=>`
                <article class="about-education-chip" style="--about-delay:${a*70}ms">
                  <span>${b(t.period)}</span>
                  <h3>${b(t.school)}</h3>
                  <p>${b(t.detail)}</p>
                </article>`).join("")}
        </div>
      </section>

      <section class="about-collaboration">
        <span class="about-collaboration__glow" aria-hidden="true"></span>
        <img
          class="about-collaboration__photo"
          src="${b(ea.src)}"
          alt="${b(ea.alt)}"
          loading="lazy"
        />
        <div class="about-collaboration__copy">
          <p class="about-section-label">${E("bolt")} Open for collaboration</p>
          <h2>${b(kt.collaborationTitle)}</h2>
          <p>${b(kt.collaborationBody)}</p>
        </div>
        <a class="btn about-m3-button about-m3-button--inverse" href="mailto:${b(K.contactEmail)}">
          ${E("arrow_outward")} Let’s talk
        </a>
      </section>
    </article>
  `}const On=400,jn=52,Nn=46;function Hn(){const e=zt.reduce((d,l)=>d+l.items.length,0),t=[{value:String(aa.length),label:"ways of thinking"},{value:String(zt.length),label:"stacks"},{value:String(e),label:"tools in hand"}],a=[{group:"All",icon:"apps"},...zt].map((d,l)=>`
        <button class="skills-chip" type="button" data-filter="${b(d.group)}"
          aria-pressed="${l===0}" style="--skill-delay:${l*40}ms">
          ${E(d.icon)}<span>${b(d.group)}</span>
        </button>`).join(""),n=aa.map((d,l)=>`
        <article class="skills-pillar" data-shape="${b(d.shape)}"
          style="--skill-delay:${l*90}ms">
          <span class="skills-pillar__index">0${l+1}</span>
          <span class="skills-pillar__icon">${E(d.icon)}</span>
          <p class="skills-pillar__label">${b(d.label)}</p>
          <h3>${b(d.title)}</h3>
          <p class="skills-pillar__body">${b(d.body)}</p>
          <div class="skills-pillar__marks">
            ${d.marks.map(u=>`<span class="pill">${b(u)}</span>`).join("")}
          </div>
        </article>`).join(""),r=zt.map((d,l)=>`
        <section class="skills-group" data-group="${b(d.group)}"
          style="--skill-delay:${l*70}ms">
          <header class="skills-group__head">
            <span class="skills-group__icon">${E(d.icon)}</span>
            <div>
              <h3>${b(d.group)}</h3>
              <p>${b(d.blurb)}</p>
            </div>
            <span class="skills-group__count">${d.items.length}</span>
          </header>
          <div class="skills-group__grid">
            ${d.items.map((u,p)=>`
                  <button class="skills-tool" type="button"
                    style="--skill-delay:${l*70+p*45}ms">
                    <span class="skills-tool__mark">${Fe(u.logo)}</span>
                    <span class="skills-tool__name">${b(u.name)}</span>
                    <span class="skills-tool__note" role="tooltip">
                      <b>${b(u.name)}</b>${b(u.note)}
                    </span>
                  </button>`).join("")}
          </div>
        </section>`).join(""),o=W`
    <article class="skills-app skills-surface" data-state="loading" data-filter="All">
      <div class="skills-loader" role="progressbar" aria-label="Loading skills">
        <span class="skills-loader__track"></span>
        <span class="skills-loader__wave"></span>
      </div>

      <header class="skills-hero">
        <div class="skills-hero__copy">
          <p class="skills-kicker">${E("bolt")} ${b(Rt.kicker)}</p>
          <h1 class="skills-hero__title">${b(Rt.title)}</h1>
          <p class="skills-hero__lede">${b(Rt.lede)}</p>
          <div class="skills-hero__figures">
            ${t.map((d,l)=>`
                  <span class="skills-figure" style="--skill-delay:${140+l*70}ms">
                    <b>${b(d.value)}</b>${b(d.label)}
                  </span>`).join("")}
          </div>
        </div>

        <figure class="skills-hero__portrait">
          <span class="skills-hero__well" aria-hidden="true"></span>
          <img src="${b(Rt.portrait)}" alt="${b(Rt.portraitAlt)}" loading="eager" />
        </figure>
      </header>

      <section class="skills-section skills-core">
        <div class="skills-section__heading">
          <p class="skills-section-label">${E("psychology")} Foundation</p>
          <h2>What decides the build, before any tool is opened.</h2>
        </div>
        <div class="skills-core__grid">${n}</div>
      </section>

      <section class="skills-section skills-stack">
        <div class="skills-section__heading">
          <p class="skills-section-label">${E("construction")} Execution</p>
          <h2>The stack that gets it shipped.</h2>
        </div>
        <div class="skills-chips" role="group" aria-label="Filter by stack">${a}</div>
        <div class="skills-stack__list">${r}</div>
      </section>
    </article>
  `,s=o.querySelector(".skills-hero__well");s.style.clipPath=rt("cookie12",On),o.querySelectorAll(".skills-pillar").forEach(d=>{const l=d.querySelector(".skills-pillar__icon");l.style.clipPath=rt(d.dataset.shape,48)});const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=()=>o.setAttribute("data-state","settled");return i?c():setTimeout(()=>{o.setAttribute("data-state","ready"),setTimeout(c,1700)},620),o.querySelector(".skills-chips").addEventListener("click",d=>{const l=d.target.closest(".skills-chip");if(!l)return;const u=l.dataset.filter;o.setAttribute("data-filter",u),o.querySelectorAll(".skills-chip").forEach(p=>{p.setAttribute("aria-pressed",String(p===l))}),o.querySelectorAll(".skills-group").forEach(p=>{const y=u==="All"||p.dataset.group===u;p.toggleAttribute("data-dimmed",!y)})}),o}const Wn=22,qe=24,Vn=52,Gn=6;function Zn(e){const t=qe/2,a=Vn/2,n=[`M ${t} 0`];for(let r=0,o=1;r<e;o=-o){const s=Math.min(r+a,e),i=s-r,c=t+o*Gn;n.push(`C ${c} ${(r+i*.36).toFixed(2)} ${c} ${(s-i*.36).toFixed(2)} ${t} ${s.toFixed(2)}`),r=s}return n.join(" ")}function ia(e){e.querySelectorAll(".xp-node").forEach(t=>{const a=t.querySelector(".xp-wave");if(!a)return;const n=Math.max(1,Math.round(a.getBoundingClientRect().height));a.setAttribute("viewBox",`0 0 ${qe} ${n}`),a.querySelector("path").setAttribute("d",Zn(n))})}const la=()=>`
  <svg class="xp-wave" width="${qe}" aria-hidden="true">
    <path d="" pathLength="1" />
  </svg>`;function Un(){const e=na.map((o,s)=>`
        <li class="xp-node" style="--xp-index:${s}">
          <span class="xp-rail" aria-hidden="true">
            ${la()}
            <span class="xp-dot"></span>
          </span>
          <article class="xp-card">
            <p class="xp-card__period">${E("calendar_month")} ${b(o.period)}</p>
            <h3 class="xp-card__role">${b(o.role)}</h3>
            <p class="xp-card__org">
              ${b(o.org)}
              ${o.href?`<a class="xp-card__site" href="${b(o.href)}" target="_blank" rel="noreferrer">
                      ${b(o.site??o.href)}${E("arrow_outward")}
                    </a>`:""}
            </p>
            <p class="xp-card__body">${b(o.body)}</p>
            <div class="xp-card__tags">${Be(o.tags)}</div>
          </article>
        </li>`).join(""),t=`
    <li class="xp-node xp-node--open" style="--xp-index:${na.length}">
      <span class="xp-rail" aria-hidden="true">
        ${la()}
        <span class="xp-dot"></span>
      </span>
      <article class="xp-card xp-card--open">
        <p class="xp-card__period">${E("hourglass_top")} ${b(Xt.label)}</p>
        <h3 class="xp-card__role">${b(Xt.title)}</h3>
        <p class="xp-card__body">${b(Xt.body)}</p>
        <div class="xp-card__tags">
          <a class="btn xp-card__cta" href="mailto:${b(K.contactEmail)}">
            ${E("mail")} ${b(Xt.action)}
          </a>
        </div>
      </article>
    </li>`,a=W`
    <section class="xp-app" data-state="idle">
      <ol class="xp-line">${e}${t}</ol>
    </section>
  `,n=rt("cookie8",Wn);return a.querySelectorAll(".xp-dot").forEach(o=>{o.style.clipPath=n}),requestAnimationFrame(()=>ia(a)),new ResizeObserver(()=>ia(a)).observe(a),window.matchMedia("(prefers-reduced-motion: reduce)").matches?a.setAttribute("data-state","settled"):setTimeout(()=>{a.setAttribute("data-state","ready"),setTimeout(()=>a.setAttribute("data-state","settled"),2400)},240),a}function Yn(){const t=["All",...new Set(ra.map(i=>i.kind))].map((i,c)=>`
        <button class="projects-chip" type="button" data-filter="${b(i)}"
          aria-pressed="${c===0}" style="--pj-delay:${c*40}ms">
          <span>${b(i)}</span>
        </button>`).join(""),a=Jt.ticker.map(i=>`<span>${b(i)}</span>`).join("<i>✦</i>"),n=ra.map((i,c)=>{const d=[...i.tags,i.name,i.year].map(p=>`<span>${b(p)}</span>`).join("<i>·</i>"),l=i.metrics.length?`<div class="projects-card__metrics">
            ${i.metrics.map(p=>`
                  <span class="projects-metric">
                    <b>${b(p.value)}</b>${b(p.label)}
                  </span>`).join("")}
          </div>`:"",u=i.link?`<a class="projects-card__link" href="${b(i.link.href)}" target="_blank" rel="noreferrer noopener">
            ${E("north_east")}<span>${b(i.link.label)}</span>
          </a>`:`<span class="projects-card__link projects-card__link--muted">
            ${E("lock")}<span>Internal system</span>
          </span>`;return`
        <article class="projects-card" data-kind="${b(i.kind)}"
          data-accent="${b(i.accent)}" data-shape="${b(i.shape)}"
          ${i.invite?"data-invite":""}
          style="--pj-delay:${c*90}ms" tabindex="0">
          <span class="projects-card__runline" aria-hidden="true"></span>

          <header class="projects-card__head">
            <span class="projects-card__badge">${E(i.icon)}</span>
            <div class="projects-card__title">
              <p class="projects-card__kind">${b(i.kind)}</p>
              <h3>${b(i.name)}</h3>
            </div>
            <span class="projects-card__index">${String(c+1).padStart(2,"0")}</span>
          </header>

          <p class="projects-card__meta">
            <span>${b(i.year)}</span><i>·</i><span>${b(i.role)}</span>
            <em class="projects-card__status">${b(i.status)}</em>
          </p>

          <p class="projects-card__body">${b(i.body)}</p>

          <ul class="projects-card__points">
            ${i.highlights.map(p=>`<li>${E("check_small")}<span>${b(p)}</span></li>`).join("")}
          </ul>

          ${l}

          <footer class="projects-card__foot">
            <div class="row row--wrap">${Be(i.tags)}</div>
            ${u}
          </footer>

          <div class="projects-card__runner" aria-hidden="true">
            <div class="projects-card__runner-track">${d}<b>${d}</b></div>
          </div>
        </article>`}).join(""),r=W`
    <article class="projects-app projects-surface" data-state="loading" data-filter="All">
      <div class="projects-loader" role="progressbar" aria-label="Loading projects">
        <span class="projects-loader__track"></span>
        <span class="projects-loader__wave"></span>
      </div>

      <div class="projects-wordstream" aria-hidden="true">
        <div class="projects-wordstream__track">${a}<b>${a}</b></div>
      </div>

      <header class="projects-hero">
        <p class="projects-kicker">${E("grid_view")} ${b(Jt.kicker)}</p>
        <h1 class="projects-hero__title">${b(Jt.title)}</h1>
        <p class="projects-hero__lede">${b(Jt.lede)}</p>
      </header>

      <div class="projects-chips" role="group" aria-label="Filter by kind">${t}</div>

      <div class="projects-grid">${n}</div>
    </article>
  `;r.querySelectorAll(".projects-card").forEach(i=>{const c=i.querySelector(".projects-card__badge");c.style.clipPath=rt(i.dataset.shape,jn)});const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=()=>r.setAttribute("data-state","settled");return o?s():setTimeout(()=>{r.setAttribute("data-state","ready"),setTimeout(s,1600)},560),r.querySelector(".projects-chips").addEventListener("click",i=>{const c=i.target.closest(".projects-chip");if(!c)return;const d=c.dataset.filter;r.setAttribute("data-filter",d),r.querySelectorAll(".projects-chip").forEach(l=>{l.setAttribute("aria-pressed",String(l===c))}),r.querySelectorAll(".projects-card").forEach(l=>{const u=d==="All"||l.dataset.kind===d;l.toggleAttribute("data-dimmed",!u)})}),r}function Kn(){const e=Qt.ticker.map(s=>`<span>${b(s)}</span>`).join("<i>✦</i>"),t=[{value:String(Me.length),label:"businesses running"},{value:Me[0].since,label:"first one shipped"},{value:"Live",label:"both, with paying users"}],a=Me.map((s,i)=>{const c=[...s.tags,s.name,s.kind].map(d=>`<span>${b(d)}</span>`).join("<i>·</i>");return`
        <article class="biz-card" data-accent="${b(s.accent)}"
          data-shape="${b(s.shape)}" data-biz="${b(s.id)}"
          style="--biz-delay:${i*140}ms" tabindex="0">
          <span class="biz-card__runline" aria-hidden="true"></span>
          <span class="biz-card__bloom" aria-hidden="true"></span>
          <span class="biz-card__ordinal" aria-hidden="true">${String(i+1).padStart(2,"0")}</span>

          <header class="biz-card__head">
            <figure class="biz-card__logo">
              <img class="biz-card__mark biz-card__mark--light"
                src="${b(s.logo.light)}" alt="${b(s.logo.alt)} logo" loading="lazy" />
              <img class="biz-card__mark biz-card__mark--dark"
                src="${b(s.logo.dark)}" alt="" aria-hidden="true" loading="lazy" />
            </figure>

            <div class="biz-card__ident">
              <p class="biz-card__kind">
                <span class="biz-card__seal">${E(s.icon)}</span>
                <span>${b(s.kind)}</span><i>·</i><span>since ${b(s.since)}</span>
              </p>
              <h2 class="biz-card__name">${b(s.name)}</h2>
              <p class="biz-card__tagline">${b(s.tagline)}</p>
            </div>
          </header>

          <div class="biz-card__copy">
            <p>${b(s.body)}</p>
            <p>${b(s.body2)}</p>
          </div>

          <ul class="biz-card__points">
            ${s.highlights.map((d,l)=>`
                  <li style="--biz-row:${l}">
                    ${E("check_small")}<span>${b(d)}</span>
                  </li>`).join("")}
          </ul>

          <div class="biz-card__metrics">
            ${s.metrics.map((d,l)=>`
                  <span class="biz-metric" style="--biz-row:${l}">
                    <b>${b(d.value)}</b>${b(d.label)}
                  </span>`).join("")}
          </div>

          <footer class="biz-card__foot">
            <div class="row row--wrap">${Be(s.tags)}</div>
            <a class="biz-learn" href="${b(s.link.href)}"
              target="_blank" rel="noreferrer noopener">
              <span class="biz-learn__fill" aria-hidden="true"></span>
              <span class="biz-learn__label">Learn more</span>
              <span class="biz-learn__host">${b(s.link.label)}</span>
              <span class="biz-learn__icon">${E("arrow_outward")}</span>
            </a>
          </footer>

          <div class="biz-card__runner" aria-hidden="true">
            <div class="biz-card__runner-track">${c}<b>${c}</b></div>
          </div>
        </article>`}).join(""),n=W`
    <article class="biz-app biz-surface" data-state="loading">
      <div class="biz-loader" role="progressbar" aria-label="Loading businesses">
        <span class="biz-loader__track"></span>
        <span class="biz-loader__wave"></span>
      </div>

      <div class="biz-wordstream" aria-hidden="true">
        <div class="biz-wordstream__track">${e}<b>${e}</b></div>
      </div>

      <header class="biz-hero">
        <p class="biz-kicker">${E("storefront")} ${b(Qt.kicker)}</p>
        <h1 class="biz-hero__title">${b(Qt.title)}</h1>
        <p class="biz-hero__lede">${b(Qt.lede)}</p>
        <div class="biz-hero__figures">
          ${t.map((s,i)=>`
                <span class="biz-figure" style="--biz-delay:${140+i*70}ms">
                  <b>${b(s.value)}</b>${b(s.label)}
                </span>`).join("")}
        </div>
      </header>

      <div class="biz-deck">${a}</div>
    </article>
  `;n.querySelectorAll(".biz-card").forEach(s=>{const i=s.querySelector(".biz-card__seal");i.style.clipPath=rt(s.dataset.shape,Nn)});const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=()=>n.setAttribute("data-state","settled");return r?o():setTimeout(()=>{n.setAttribute("data-state","ready"),setTimeout(o,1600)},560),n}const ca=64,da=[["cookie8","sunny"],["circle12","cookie12"],["cookie4","circle"],["sunny","cookie8"],["cookie12","circle12"]];function Xn(){const e=Bn.map((n,r)=>{const o=n.href.startsWith("mailto:")?"":' target="_blank" rel="noreferrer noopener"',[s,i]=da[r%da.length];return`
        <a class="contact-card" href="${b(n.href)}"${o}
          data-ripple style="--contact-delay:${r*75}ms"
          data-shape="${s}" data-shape-hover="${i}"
          aria-label="${b(n.label)} ${b(n.value)}">
          <span class="contact-card__glyph">
            <span class="contact-card__well" aria-hidden="true"></span>
            <span class="contact-card__mark">${Fe(n.logo)}</span>
          </span>
          <span class="contact-card__copy">
            <span class="contact-card__label">${b(n.label)}</span>
            <span class="contact-card__value">${b(n.value)}</span>
          </span>
          <span class="contact-card__arrow" aria-hidden="true">${E("arrow_outward")}</span>
        </a>`}).join(""),t=W`
    <article class="contact-app contact-surface" data-state="loading">
      <div class="contact-shape-group" aria-hidden="true">
        <span class="contact-shape contact-shape--circle"></span>
        <span class="contact-shape contact-shape--pill"></span>
        <span class="contact-shape contact-shape--diamond"></span>
      </div>
      <div class="contact-layout">
        <header class="contact-intro">
          <span class="contact-icon--large">${E("contact_page")}</span>
          <div>
            <p class="contact-kicker">Contact</p>
            <h1>Let's connect</h1>
          </div>
        </header>
        <nav class="contact-list" aria-label="Contact links">${e}</nav>
      </div>
    </article>
  `;return t.querySelectorAll(".contact-card").forEach(n=>{const r=n.querySelector(".contact-card__well");r.style.setProperty("--contact-shape",rt(n.dataset.shape,ca)),r.style.setProperty("--contact-shape-hover",rt(n.dataset.shapeHover,ca))}),window.matchMedia("(prefers-reduced-motion: reduce)").matches?t.setAttribute("data-state","settled"):setTimeout(()=>{t.setAttribute("data-state","ready"),setTimeout(()=>t.setAttribute("data-state","settled"),1200)},220),t}function Jn(e){const t=new Date(e),a=new Date;let n=a.getFullYear()-t.getFullYear();const r=a.getMonth()-t.getMonth();return(r<0||r===0&&a.getDate()<t.getDate())&&(n-=1),n}const Qn=e=>new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});function tr(){const{host:e,machine:t,birthDate:a,address:n,interests:r,asciiPhoto:o,asciiRamp:s,asciiColumns:i,asciiCrop:c,bootLines:d,collaboration:l}=Dn,u=Jn(a),p=[{key:"name",text:K.name},{key:"age",text:`${u} years · born ${Qn(a)}`},{key:"address",text:n}],y=d.map(g=>`
        <p class="term-boot__line" data-text="${b(g)}">
          <span class="term-boot__caret" aria-hidden="true">&gt;</span>
          <span class="term-boot__text"></span>
        </p>`).join(""),x=p.map(g=>`
        <div class="term-field" data-text="${b(g.text)}">
          <span class="term-field__key">${b(g.key)}</span>
          <span class="term-field__value"></span>
        </div>`).join(""),v=r.map((g,h)=>`<li style="--tag:${h}">${b(g)}</li>`).join(""),k=[K.name,`${u} years old`,n,`Interests: ${r.join(", ")}`].join(". "),w=W`
    <article class="term-app" role="group" aria-label="${b(k)}">
      <div class="term-boot" aria-hidden="true">
        <canvas class="term-rain"></canvas>
        <div class="term-boot__log">${y}</div>
      </div>

      <div class="term-shell" aria-hidden="true">
        <p class="term-prompt">
          <span class="term-prompt__user">${b(e)}@${b(t)}</span>
          <span class="term-prompt__path">~</span>
          <span class="term-prompt__cmd">./whoami --full</span>
        </p>

        <div class="term-columns">
          <pre class="term-ascii"></pre>

          <div class="term-readout">
            ${x}
            <div class="term-field term-field--list" data-text="${b(r.length+" loaded")}">
              <span class="term-field__key">interest</span>
              <span class="term-field__value"></span>
            </div>
            <ul class="term-interests">${v}</ul>
          </div>
        </div>

        <a class="term-cta" href="mailto:${b(K.contactEmail)}">
          <span class="term-cta__sigil" aria-hidden="true">$</span>
          <span class="term-cta__cmd">${b(l.command)}</span>
          <span class="term-cta__label">${b(l.label)}</span>
          <span class="term-cta__caret" aria-hidden="true"></span>
        </a>
      </div>
    </article>
  `;return requestAnimationFrame(()=>{yn(w,{photo:o,ramp:s,columns:i,crop:c})}),w}const ze=[{id:"about",title:"About",icon:"person",render:zn,width:560,height:520},{id:"skills",title:"Skills",icon:"bolt",render:Hn,width:880,height:640},{id:"projects",title:"Projects",icon:"grid_view",render:Yn,width:980,height:700},{id:"business",title:"Business",icon:"storefront",render:Kn,width:880,height:640},{id:"experience",title:"Experience",icon:"work",render:Un,width:700,height:580},{id:"contact",title:"Contact",icon:"mail",render:Xn,width:600,height:520},{id:"terminal",title:"Terminal",icon:"terminal",render:tr,width:900,height:600}];function et(e){return e<0?-1:e===0?0:1}function Ot(e,t,a){return(1-a)*e+a*t}function er(e,t,a){return a<e?e:a>t?t:a}function ce(e,t,a){return a<e?e:a>t?t:a}function ua(e){return e=e%360,e<0&&(e=e+360),e}function Ht(e){return e=e%360,e<0&&(e=e+360),e}function ar(e,t){return 180-Math.abs(Math.abs(e-t)-180)}function Se(e,t){const a=e[0]*t[0][0]+e[1]*t[0][1]+e[2]*t[0][2],n=e[0]*t[1][0]+e[1]*t[1][1]+e[2]*t[1][2],r=e[0]*t[2][0]+e[1]*t[2][1]+e[2]*t[2][2];return[a,n,r]}const Na=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],nr=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],Oe=[95.047,100,108.883];function je(e,t,a){return(255<<24|(e&255)<<16|(t&255)<<8|a&255)>>>0}function ha(e){const t=$t(e[0]),a=$t(e[1]),n=$t(e[2]);return je(t,a,n)}function rr(e){return e>>24&255}function me(e){return e>>16&255}function fe(e){return e>>8&255}function ge(e){return e&255}function Ha(e,t,a){const n=nr,r=n[0][0]*e+n[0][1]*t+n[0][2]*a,o=n[1][0]*e+n[1][1]*t+n[1][2]*a,s=n[2][0]*e+n[2][1]*t+n[2][2]*a,i=$t(r),c=$t(o),d=$t(s);return je(i,c,d)}function sr(e){const t=ht(me(e)),a=ht(fe(e)),n=ht(ge(e));return Se([t,a,n],Na)}function or(e,t,a){const n=Oe,r=(e+16)/116,o=t/500+r,s=r-a/200,i=se(o),c=se(r),d=se(s),l=i*n[0],u=c*n[1],p=d*n[2];return Ha(l,u,p)}function ir(e){const t=ht(me(e)),a=ht(fe(e)),n=ht(ge(e)),r=Na,o=r[0][0]*t+r[0][1]*a+r[0][2]*n,s=r[1][0]*t+r[1][1]*a+r[1][2]*n,i=r[2][0]*t+r[2][1]*a+r[2][2]*n,c=Oe,d=o/c[0],l=s/c[1],u=i/c[2],p=jt(d),y=jt(l),x=jt(u),v=116*y-16,k=500*(p-y),w=200*(y-x);return[v,k,w]}function lr(e){const t=ft(e),a=$t(t);return je(a,a,a)}function pa(e){const t=sr(e)[1];return 116*jt(t/100)-16}function ft(e){return 100*se((e+16)/116)}function Ce(e){return jt(e/100)*116-16}function ht(e){const t=e/255;return t<=.040449936?t/12.92*100:Math.pow((t+.055)/1.055,2.4)*100}function $t(e){const t=e/100;let a=0;return t<=.0031308?a=t*12.92:a=1.055*Math.pow(t,1/2.4)-.055,er(0,255,Math.round(a*255))}function cr(){return Oe}function jt(e){const t=.008856451679035631,a=24389/27;return e>t?Math.pow(e,1/3):(a*e+16)/116}function se(e){const t=.008856451679035631,a=24389/27,n=e*e*e;return n>t?n:(116*e-16)/a}class ct{static make(t=cr(),a=200/Math.PI*ft(50)/100,n=50,r=2,o=!1){const s=t,i=s[0]*.401288+s[1]*.650173+s[2]*-.051461,c=s[0]*-.250268+s[1]*1.204414+s[2]*.045854,d=s[0]*-.002079+s[1]*.048952+s[2]*.953127,l=.8+r/10,u=l>=.9?Ot(.59,.69,(l-.9)*10):Ot(.525,.59,(l-.8)*10);let p=o?1:l*(1-1/3.6*Math.exp((-a-42)/92));p=p>1?1:p<0?0:p;const y=l,x=[p*(100/i)+1-p,p*(100/c)+1-p,p*(100/d)+1-p],v=1/(5*a+1),k=v*v*v*v,w=1-k,g=k*a+.1*w*w*Math.cbrt(5*a),h=ft(n)/t[1],f=1.48+Math.sqrt(h),_=.725/Math.pow(h,.2),A=_,M=[Math.pow(g*x[0]*i/100,.42),Math.pow(g*x[1]*c/100,.42),Math.pow(g*x[2]*d/100,.42)],$=[400*M[0]/(M[0]+27.13),400*M[1]/(M[1]+27.13),400*M[2]/(M[2]+27.13)],I=(2*$[0]+$[1]+.05*$[2])*_;return new ct(h,I,_,A,u,y,x,g,Math.pow(g,.25),f)}constructor(t,a,n,r,o,s,i,c,d,l){this.n=t,this.aw=a,this.nbb=n,this.ncb=r,this.c=o,this.nc=s,this.rgbD=i,this.fl=c,this.fLRoot=d,this.z=l}}ct.DEFAULT=ct.make();class nt{constructor(t,a,n,r,o,s,i,c,d){this.hue=t,this.chroma=a,this.j=n,this.q=r,this.m=o,this.s=s,this.jstar=i,this.astar=c,this.bstar=d}distance(t){const a=this.jstar-t.jstar,n=this.astar-t.astar,r=this.bstar-t.bstar,o=Math.sqrt(a*a+n*n+r*r);return 1.41*Math.pow(o,.63)}static fromInt(t){return nt.fromIntInViewingConditions(t,ct.DEFAULT)}static fromIntInViewingConditions(t,a){const n=(t&16711680)>>16,r=(t&65280)>>8,o=t&255,s=ht(n),i=ht(r),c=ht(o),d=.41233895*s+.35762064*i+.18051042*c,l=.2126*s+.7152*i+.0722*c,u=.01932141*s+.11916382*i+.95034478*c,p=.401288*d+.650173*l-.051461*u,y=-.250268*d+1.204414*l+.045854*u,x=-.002079*d+.048952*l+.953127*u,v=a.rgbD[0]*p,k=a.rgbD[1]*y,w=a.rgbD[2]*x,g=Math.pow(a.fl*Math.abs(v)/100,.42),h=Math.pow(a.fl*Math.abs(k)/100,.42),f=Math.pow(a.fl*Math.abs(w)/100,.42),_=et(v)*400*g/(g+27.13),A=et(k)*400*h/(h+27.13),M=et(w)*400*f/(f+27.13),$=(11*_+-12*A+M)/11,I=(_+A-2*M)/9,P=(20*_+20*A+21*M)/20,q=(40*_+20*A+M)/20,L=Math.atan2(I,$)*180/Math.PI,C=L<0?L+360:L>=360?L-360:L,z=C*Math.PI/180,D=q*a.nbb,R=100*Math.pow(D/a.aw,a.c*a.z),V=4/a.c*Math.sqrt(R/100)*(a.aw+4)*a.fLRoot,H=C<20.14?C+360:C,Y=.25*(Math.cos(H*Math.PI/180+2)+3.8),st=5e4/13*Y*a.nc*a.ncb*Math.sqrt($*$+I*I)/(P+.305),dt=Math.pow(st,.9)*Math.pow(1.64-Math.pow(.29,a.n),.73),Ut=dt*Math.sqrt(R/100),_t=Ut*a.fLRoot,St=50*Math.sqrt(dt*a.c/(a.aw+4)),Ct=(1+100*.007)*R/(1+.007*R),Dt=1/.0228*Math.log(1+.0228*_t),Yt=Dt*Math.cos(z),vt=Dt*Math.sin(z);return new nt(C,Ut,R,V,_t,St,Ct,Yt,vt)}static fromJch(t,a,n){return nt.fromJchInViewingConditions(t,a,n,ct.DEFAULT)}static fromJchInViewingConditions(t,a,n,r){const o=4/r.c*Math.sqrt(t/100)*(r.aw+4)*r.fLRoot,s=a*r.fLRoot,i=a/Math.sqrt(t/100),c=50*Math.sqrt(i*r.c/(r.aw+4)),d=n*Math.PI/180,l=(1+100*.007)*t/(1+.007*t),u=1/.0228*Math.log(1+.0228*s),p=u*Math.cos(d),y=u*Math.sin(d);return new nt(n,a,t,o,s,c,l,p,y)}static fromUcs(t,a,n){return nt.fromUcsInViewingConditions(t,a,n,ct.DEFAULT)}static fromUcsInViewingConditions(t,a,n,r){const o=a,s=n,i=Math.sqrt(o*o+s*s),d=(Math.exp(i*.0228)-1)/.0228/r.fLRoot;let l=Math.atan2(s,o)*(180/Math.PI);l<0&&(l+=360);const u=t/(1-(t-100)*.007);return nt.fromJchInViewingConditions(u,d,l,r)}toInt(){return this.viewed(ct.DEFAULT)}viewed(t){const a=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(a/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),r=this.hue*Math.PI/180,o=.25*(Math.cos(r+2)+3.8),s=t.aw*Math.pow(this.j/100,1/t.c/t.z),i=o*(5e4/13)*t.nc*t.ncb,c=s/t.nbb,d=Math.sin(r),l=Math.cos(r),u=23*(c+.305)*n/(23*i+11*n*l+108*n*d),p=u*l,y=u*d,x=(460*c+451*p+288*y)/1403,v=(460*c-891*p-261*y)/1403,k=(460*c-220*p-6300*y)/1403,w=Math.max(0,27.13*Math.abs(x)/(400-Math.abs(x))),g=et(x)*(100/t.fl)*Math.pow(w,1/.42),h=Math.max(0,27.13*Math.abs(v)/(400-Math.abs(v))),f=et(v)*(100/t.fl)*Math.pow(h,1/.42),_=Math.max(0,27.13*Math.abs(k)/(400-Math.abs(k))),A=et(k)*(100/t.fl)*Math.pow(_,1/.42),M=g/t.rgbD[0],$=f/t.rgbD[1],I=A/t.rgbD[2],P=1.86206786*M-1.01125463*$+.14918677*I,q=.38752654*M+.62144744*$-.00897398*I,j=-.0158415*M-.03412294*$+1.04996444*I;return Ha(P,q,j)}static fromXyzInViewingConditions(t,a,n,r){const o=.401288*t+.650173*a-.051461*n,s=-.250268*t+1.204414*a+.045854*n,i=-.002079*t+.048952*a+.953127*n,c=r.rgbD[0]*o,d=r.rgbD[1]*s,l=r.rgbD[2]*i,u=Math.pow(r.fl*Math.abs(c)/100,.42),p=Math.pow(r.fl*Math.abs(d)/100,.42),y=Math.pow(r.fl*Math.abs(l)/100,.42),x=et(c)*400*u/(u+27.13),v=et(d)*400*p/(p+27.13),k=et(l)*400*y/(y+27.13),w=(11*x+-12*v+k)/11,g=(x+v-2*k)/9,h=(20*x+20*v+21*k)/20,f=(40*x+20*v+k)/20,A=Math.atan2(g,w)*180/Math.PI,M=A<0?A+360:A>=360?A-360:A,$=M*Math.PI/180,I=f*r.nbb,P=100*Math.pow(I/r.aw,r.c*r.z),q=4/r.c*Math.sqrt(P/100)*(r.aw+4)*r.fLRoot,j=M<20.14?M+360:M,L=1/4*(Math.cos(j*Math.PI/180+2)+3.8),z=5e4/13*L*r.nc*r.ncb*Math.sqrt(w*w+g*g)/(h+.305),D=Math.pow(z,.9)*Math.pow(1.64-Math.pow(.29,r.n),.73),R=D*Math.sqrt(P/100),V=R*r.fLRoot,H=50*Math.sqrt(D*r.c/(r.aw+4)),Y=(1+100*.007)*P/(1+.007*P),mt=Math.log(1+.0228*V)/.0228,st=mt*Math.cos($),dt=mt*Math.sin($);return new nt(M,R,P,q,V,H,Y,st,dt)}xyzInViewingConditions(t){const a=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(a/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),r=this.hue*Math.PI/180,o=.25*(Math.cos(r+2)+3.8),s=t.aw*Math.pow(this.j/100,1/t.c/t.z),i=o*(5e4/13)*t.nc*t.ncb,c=s/t.nbb,d=Math.sin(r),l=Math.cos(r),u=23*(c+.305)*n/(23*i+11*n*l+108*n*d),p=u*l,y=u*d,x=(460*c+451*p+288*y)/1403,v=(460*c-891*p-261*y)/1403,k=(460*c-220*p-6300*y)/1403,w=Math.max(0,27.13*Math.abs(x)/(400-Math.abs(x))),g=et(x)*(100/t.fl)*Math.pow(w,1/.42),h=Math.max(0,27.13*Math.abs(v)/(400-Math.abs(v))),f=et(v)*(100/t.fl)*Math.pow(h,1/.42),_=Math.max(0,27.13*Math.abs(k)/(400-Math.abs(k))),A=et(k)*(100/t.fl)*Math.pow(_,1/.42),M=g/t.rgbD[0],$=f/t.rgbD[1],I=A/t.rgbD[2],P=1.86206786*M-1.01125463*$+.14918677*I,q=.38752654*M+.62144744*$-.00897398*I,j=-.0158415*M-.03412294*$+1.04996444*I;return[P,q,j]}}class T{static sanitizeRadians(t){return(t+Math.PI*8)%(Math.PI*2)}static trueDelinearized(t){const a=t/100;let n=0;return a<=.0031308?n=a*12.92:n=1.055*Math.pow(a,1/2.4)-.055,n*255}static chromaticAdaptation(t){const a=Math.pow(Math.abs(t),.42);return et(t)*400*a/(a+27.13)}static hueOf(t){const a=Se(t,T.SCALED_DISCOUNT_FROM_LINRGB),n=T.chromaticAdaptation(a[0]),r=T.chromaticAdaptation(a[1]),o=T.chromaticAdaptation(a[2]),s=(11*n+-12*r+o)/11,i=(n+r-2*o)/9;return Math.atan2(i,s)}static areInCyclicOrder(t,a,n){const r=T.sanitizeRadians(a-t),o=T.sanitizeRadians(n-t);return r<o}static intercept(t,a,n){return(a-t)/(n-t)}static lerpPoint(t,a,n){return[t[0]+(n[0]-t[0])*a,t[1]+(n[1]-t[1])*a,t[2]+(n[2]-t[2])*a]}static setCoordinate(t,a,n,r){const o=T.intercept(t[r],a,n[r]);return T.lerpPoint(t,o,n)}static isBounded(t){return 0<=t&&t<=100}static nthVertex(t,a){const n=T.Y_FROM_LINRGB[0],r=T.Y_FROM_LINRGB[1],o=T.Y_FROM_LINRGB[2],s=a%4<=1?0:100,i=a%2===0?0:100;if(a<4){const c=s,d=i,l=(t-c*r-d*o)/n;return T.isBounded(l)?[l,c,d]:[-1,-1,-1]}else if(a<8){const c=s,d=i,l=(t-d*n-c*o)/r;return T.isBounded(l)?[d,l,c]:[-1,-1,-1]}else{const c=s,d=i,l=(t-c*n-d*r)/o;return T.isBounded(l)?[c,d,l]:[-1,-1,-1]}}static bisectToSegment(t,a){let n=[-1,-1,-1],r=n,o=0,s=0,i=!1,c=!0;for(let d=0;d<12;d++){const l=T.nthVertex(t,d);if(l[0]<0)continue;const u=T.hueOf(l);if(!i){n=l,r=l,o=u,s=u,i=!0;continue}(c||T.areInCyclicOrder(o,u,s))&&(c=!1,T.areInCyclicOrder(o,a,u)?(r=l,s=u):(n=l,o=u))}return[n,r]}static midpoint(t,a){return[(t[0]+a[0])/2,(t[1]+a[1])/2,(t[2]+a[2])/2]}static criticalPlaneBelow(t){return Math.floor(t-.5)}static criticalPlaneAbove(t){return Math.ceil(t-.5)}static bisectToLimit(t,a){const n=T.bisectToSegment(t,a);let r=n[0],o=T.hueOf(r),s=n[1];for(let i=0;i<3;i++)if(r[i]!==s[i]){let c=-1,d=255;r[i]<s[i]?(c=T.criticalPlaneBelow(T.trueDelinearized(r[i])),d=T.criticalPlaneAbove(T.trueDelinearized(s[i]))):(c=T.criticalPlaneAbove(T.trueDelinearized(r[i])),d=T.criticalPlaneBelow(T.trueDelinearized(s[i])));for(let l=0;l<8&&!(Math.abs(d-c)<=1);l++){const u=Math.floor((c+d)/2),p=T.CRITICAL_PLANES[u],y=T.setCoordinate(r,p,s,i),x=T.hueOf(y);T.areInCyclicOrder(o,a,x)?(s=y,d=u):(r=y,o=x,c=u)}}return T.midpoint(r,s)}static inverseChromaticAdaptation(t){const a=Math.abs(t),n=Math.max(0,27.13*a/(400-a));return et(t)*Math.pow(n,1/.42)}static findResultByJ(t,a,n){let r=Math.sqrt(n)*11;const o=ct.DEFAULT,s=1/Math.pow(1.64-Math.pow(.29,o.n),.73),c=.25*(Math.cos(t+2)+3.8)*(5e4/13)*o.nc*o.ncb,d=Math.sin(t),l=Math.cos(t);for(let u=0;u<5;u++){const p=r/100,y=a===0||r===0?0:a/Math.sqrt(p),x=Math.pow(y*s,1/.9),k=o.aw*Math.pow(p,1/o.c/o.z)/o.nbb,w=23*(k+.305)*x/(23*c+11*x*l+108*x*d),g=w*l,h=w*d,f=(460*k+451*g+288*h)/1403,_=(460*k-891*g-261*h)/1403,A=(460*k-220*g-6300*h)/1403,M=T.inverseChromaticAdaptation(f),$=T.inverseChromaticAdaptation(_),I=T.inverseChromaticAdaptation(A),P=Se([M,$,I],T.LINRGB_FROM_SCALED_DISCOUNT);if(P[0]<0||P[1]<0||P[2]<0)return 0;const q=T.Y_FROM_LINRGB[0],j=T.Y_FROM_LINRGB[1],L=T.Y_FROM_LINRGB[2],C=q*P[0]+j*P[1]+L*P[2];if(C<=0)return 0;if(u===4||Math.abs(C-n)<.002)return P[0]>100.01||P[1]>100.01||P[2]>100.01?0:ha(P);r=r-(C-n)*r/(2*C)}return 0}static solveToInt(t,a,n){if(a<1e-4||n<1e-4||n>99.9999)return lr(n);t=Ht(t);const r=t/180*Math.PI,o=ft(n),s=T.findResultByJ(r,a,o);if(s!==0)return s;const i=T.bisectToLimit(o,r);return ha(i)}static solveToCam(t,a,n){return nt.fromInt(T.solveToInt(t,a,n))}}T.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]];T.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];T.Y_FROM_LINRGB=[.2126,.7152,.0722];T.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];class X{static from(t,a,n){return new X(T.solveToInt(t,a,n))}static fromInt(t){return new X(t)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(t){this.setInternalState(T.solveToInt(t,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(t){this.setInternalState(T.solveToInt(this.internalHue,t,this.internalTone))}get tone(){return this.internalTone}set tone(t){this.setInternalState(T.solveToInt(this.internalHue,this.internalChroma,t))}constructor(t){this.argb=t;const a=nt.fromInt(t);this.internalHue=a.hue,this.internalChroma=a.chroma,this.internalTone=pa(t),this.argb=t}setInternalState(t){const a=nt.fromInt(t);this.internalHue=a.hue,this.internalChroma=a.chroma,this.internalTone=pa(t),this.argb=t}inViewingConditions(t){const n=nt.fromInt(this.toInt()).xyzInViewingConditions(t),r=nt.fromXyzInViewingConditions(n[0],n[1],n[2],ct.make());return X.from(r.hue,r.chroma,Ce(n[1]))}}class U{static ratioOfTones(t,a){return t=ce(0,100,t),a=ce(0,100,a),U.ratioOfYs(ft(t),ft(a))}static ratioOfYs(t,a){const n=t>a?t:a,r=n===a?t:a;return(n+5)/(r+5)}static lighter(t,a){if(t<0||t>100)return-1;const n=ft(t),r=a*(n+5)-5,o=U.ratioOfYs(r,n),s=Math.abs(o-a);if(o<a&&s>.04)return-1;const i=Ce(r)+.4;return i<0||i>100?-1:i}static darker(t,a){if(t<0||t>100)return-1;const n=ft(t),r=(n+5)/a-5,o=U.ratioOfYs(n,r),s=Math.abs(o-a);if(o<a&&s>.04)return-1;const i=Ce(r)-.4;return i<0||i>100?-1:i}static lighterUnsafe(t,a){const n=U.lighter(t,a);return n<0?100:n}static darkerUnsafe(t,a){const n=U.darker(t,a);return n<0?0:n}}class Ne{static isDisliked(t){const a=Math.round(t.hue)>=90&&Math.round(t.hue)<=111,n=Math.round(t.chroma)>16,r=Math.round(t.tone)<65;return a&&n&&r}static fixIfDisliked(t){return Ne.isDisliked(t)?X.from(t.hue,t.chroma,70):t}}class S{static fromPalette(t){return new S(t.name??"",t.palette,t.tone,t.isBackground??!1,t.background,t.secondBackground,t.contrastCurve,t.toneDeltaPair)}constructor(t,a,n,r,o,s,i,c){if(this.name=t,this.palette=a,this.tone=n,this.isBackground=r,this.background=o,this.secondBackground=s,this.contrastCurve=i,this.toneDeltaPair=c,this.hctCache=new Map,!o&&s)throw new Error(`Color ${t} has secondBackgrounddefined, but background is not defined.`);if(!o&&i)throw new Error(`Color ${t} has contrastCurvedefined, but background is not defined.`);if(o&&!i)throw new Error(`Color ${t} has backgrounddefined, but contrastCurve is not defined.`)}getArgb(t){return this.getHct(t).toInt()}getHct(t){const a=this.hctCache.get(t);if(a!=null)return a;const n=this.getTone(t),r=this.palette(t).getHct(n);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(t,r),r}getTone(t){const a=t.contrastLevel<0;if(this.toneDeltaPair){const n=this.toneDeltaPair(t),r=n.roleA,o=n.roleB,s=n.delta,i=n.polarity,c=n.stayTogether,l=this.background(t).getTone(t),u=i==="nearer"||i==="lighter"&&!t.isDark||i==="darker"&&t.isDark,p=u?r:o,y=u?o:r,x=this.name===p.name,v=t.isDark?1:-1,k=p.contrastCurve.get(t.contrastLevel),w=y.contrastCurve.get(t.contrastLevel),g=p.tone(t);let h=U.ratioOfTones(l,g)>=k?g:S.foregroundTone(l,k);const f=y.tone(t);let _=U.ratioOfTones(l,f)>=w?f:S.foregroundTone(l,w);return a&&(h=S.foregroundTone(l,k),_=S.foregroundTone(l,w)),(_-h)*v>=s||(_=ce(0,100,h+s*v),(_-h)*v>=s||(h=ce(0,100,_-s*v))),50<=h&&h<60?v>0?(h=60,_=Math.max(_,h+s*v)):(h=49,_=Math.min(_,h+s*v)):50<=_&&_<60&&(c?v>0?(h=60,_=Math.max(_,h+s*v)):(h=49,_=Math.min(_,h+s*v)):v>0?_=60:_=49),x?h:_}else{let n=this.tone(t);if(this.background==null)return n;const r=this.background(t).getTone(t),o=this.contrastCurve.get(t.contrastLevel);if(U.ratioOfTones(r,n)>=o||(n=S.foregroundTone(r,o)),a&&(n=S.foregroundTone(r,o)),this.isBackground&&50<=n&&n<60&&(U.ratioOfTones(49,r)>=o?n=49:n=60),this.secondBackground){const[s,i]=[this.background,this.secondBackground],[c,d]=[s(t).getTone(t),i(t).getTone(t)],[l,u]=[Math.max(c,d),Math.min(c,d)];if(U.ratioOfTones(l,n)>=o&&U.ratioOfTones(u,n)>=o)return n;const p=U.lighter(l,o),y=U.darker(u,o),x=[];return p!==-1&&x.push(p),y!==-1&&x.push(y),S.tonePrefersLightForeground(c)||S.tonePrefersLightForeground(d)?p<0?100:p:x.length===1?x[0]:y<0?0:y}return n}}static foregroundTone(t,a){const n=U.lighterUnsafe(t,a),r=U.darkerUnsafe(t,a),o=U.ratioOfTones(n,t),s=U.ratioOfTones(r,t);if(S.tonePrefersLightForeground(t)){const c=Math.abs(o-s)<.1&&o<a&&s<a;return o>=a||o>=s||c?n:r}else return s>=a||s>=o?r:n}static tonePrefersLightForeground(t){return Math.round(t)<60}static toneAllowsLightForeground(t){return Math.round(t)<=49}static enableLightForeground(t){return S.tonePrefersLightForeground(t)&&!S.toneAllowsLightForeground(t)?49:t}}class Z{static fromInt(t){const a=X.fromInt(t);return Z.fromHct(a)}static fromHct(t){return new Z(t.hue,t.chroma,t)}static fromHueAndChroma(t,a){const n=new dr(t,a).create();return new Z(t,a,n)}constructor(t,a,n){this.hue=t,this.chroma=a,this.keyColor=n,this.cache=new Map}tone(t){let a=this.cache.get(t);return a===void 0&&(a=X.from(this.hue,this.chroma,t).toInt(),this.cache.set(t,a)),a}getHct(t){return X.fromInt(this.tone(t))}}class dr{constructor(t,a){this.hue=t,this.requestedChroma=a,this.chromaCache=new Map,this.maxChromaValue=200}create(){let r=0,o=100;for(;r<o;){const s=Math.floor((r+o)/2),i=this.maxChroma(s)<this.maxChroma(s+1);if(this.maxChroma(s)>=this.requestedChroma-.01)if(Math.abs(r-50)<Math.abs(o-50))o=s;else{if(r===s)return X.from(this.hue,this.requestedChroma,r);r=s}else i?r=s+1:o=s}return X.from(this.hue,this.requestedChroma,r)}maxChroma(t){if(this.chromaCache.has(t))return this.chromaCache.get(t);const a=X.from(this.hue,this.maxChromaValue,t).chroma;return this.chromaCache.set(t,a),a}}class F{constructor(t,a,n,r){this.low=t,this.normal=a,this.medium=n,this.high=r}get(t){return t<=-1?this.low:t<0?Ot(this.low,this.normal,(t- -1)/1):t<.5?Ot(this.normal,this.medium,(t-0)/.5):t<1?Ot(this.medium,this.high,(t-.5)/.5):this.high}}class at{constructor(t,a,n,r,o){this.roleA=t,this.roleB=a,this.delta=n,this.polarity=r,this.stayTogether=o}}var bt;(function(e){e[e.MONOCHROME=0]="MONOCHROME",e[e.NEUTRAL=1]="NEUTRAL",e[e.TONAL_SPOT=2]="TONAL_SPOT",e[e.VIBRANT=3]="VIBRANT",e[e.EXPRESSIVE=4]="EXPRESSIVE",e[e.FIDELITY=5]="FIDELITY",e[e.CONTENT=6]="CONTENT",e[e.RAINBOW=7]="RAINBOW",e[e.FRUIT_SALAD=8]="FRUIT_SALAD"})(bt||(bt={}));function Et(e){return e.variant===bt.FIDELITY||e.variant===bt.CONTENT}function G(e){return e.variant===bt.MONOCHROME}function ur(e,t,a,n){let r=a,o=X.from(e,t,a);if(o.chroma<t){let s=o.chroma;for(;o.chroma<t;){r+=n?-1:1;const i=X.from(e,t,r);if(s>i.chroma||Math.abs(i.chroma-t)<.4)break;const c=Math.abs(i.chroma-t),d=Math.abs(o.chroma-t);c<d&&(o=i),s=Math.max(s,i.chroma)}}return r}class m{static highestSurface(t){return t.isDark?m.surfaceBright:m.surfaceDim}}m.contentAccentToneDelta=15;m.primaryPaletteKeyColor=S.fromPalette({name:"primary_palette_key_color",palette:e=>e.primaryPalette,tone:e=>e.primaryPalette.keyColor.tone});m.secondaryPaletteKeyColor=S.fromPalette({name:"secondary_palette_key_color",palette:e=>e.secondaryPalette,tone:e=>e.secondaryPalette.keyColor.tone});m.tertiaryPaletteKeyColor=S.fromPalette({name:"tertiary_palette_key_color",palette:e=>e.tertiaryPalette,tone:e=>e.tertiaryPalette.keyColor.tone});m.neutralPaletteKeyColor=S.fromPalette({name:"neutral_palette_key_color",palette:e=>e.neutralPalette,tone:e=>e.neutralPalette.keyColor.tone});m.neutralVariantPaletteKeyColor=S.fromPalette({name:"neutral_variant_palette_key_color",palette:e=>e.neutralVariantPalette,tone:e=>e.neutralVariantPalette.keyColor.tone});m.background=S.fromPalette({name:"background",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0});m.onBackground=S.fromPalette({name:"on_background",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>m.background,contrastCurve:new F(3,3,4.5,7)});m.surface=S.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0});m.surfaceDim=S.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:new F(87,87,80,75).get(e.contrastLevel),isBackground:!0});m.surfaceBright=S.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?new F(24,24,29,34).get(e.contrastLevel):98,isBackground:!0});m.surfaceContainerLowest=S.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new F(4,4,2,0).get(e.contrastLevel):100,isBackground:!0});m.surfaceContainerLow=S.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.isDark?new F(10,10,11,12).get(e.contrastLevel):new F(96,96,96,95).get(e.contrastLevel),isBackground:!0});m.surfaceContainer=S.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.isDark?new F(12,12,16,20).get(e.contrastLevel):new F(94,94,92,90).get(e.contrastLevel),isBackground:!0});m.surfaceContainerHigh=S.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.isDark?new F(17,17,21,25).get(e.contrastLevel):new F(92,92,88,85).get(e.contrastLevel),isBackground:!0});m.surfaceContainerHighest=S.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new F(22,22,26,30).get(e.contrastLevel):new F(90,90,84,80).get(e.contrastLevel),isBackground:!0});m.onSurface=S.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>m.highestSurface(e),contrastCurve:new F(4.5,7,11,21)});m.surfaceVariant=S.fromPalette({name:"surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:90,isBackground:!0});m.onSurfaceVariant=S.fromPalette({name:"on_surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?80:30,background:e=>m.highestSurface(e),contrastCurve:new F(3,4.5,7,11)});m.inverseSurface=S.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:20});m.inverseOnSurface=S.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?20:95,background:e=>m.inverseSurface,contrastCurve:new F(4.5,7,11,21)});m.outline=S.fromPalette({name:"outline",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?60:50,background:e=>m.highestSurface(e),contrastCurve:new F(1.5,3,4.5,7)});m.outlineVariant=S.fromPalette({name:"outline_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:80,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5)});m.shadow=S.fromPalette({name:"shadow",palette:e=>e.neutralPalette,tone:e=>0});m.scrim=S.fromPalette({name:"scrim",palette:e=>e.neutralPalette,tone:e=>0});m.surfaceTint=S.fromPalette({name:"surface_tint",palette:e=>e.primaryPalette,tone:e=>e.isDark?80:40,isBackground:!0});m.primary=S.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>G(e)?e.isDark?100:0:e.isDark?80:40,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(3,4.5,7,7),toneDeltaPair:e=>new at(m.primaryContainer,m.primary,10,"nearer",!1)});m.onPrimary=S.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,tone:e=>G(e)?e.isDark?10:90:e.isDark?20:100,background:e=>m.primary,contrastCurve:new F(4.5,7,11,21)});m.primaryContainer=S.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>Et(e)?e.sourceColorHct.tone:G(e)?e.isDark?85:25:e.isDark?30:90,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.primaryContainer,m.primary,10,"nearer",!1)});m.onPrimaryContainer=S.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,tone:e=>Et(e)?S.foregroundTone(m.primaryContainer.tone(e),4.5):G(e)?e.isDark?0:100:e.isDark?90:30,background:e=>m.primaryContainer,contrastCurve:new F(3,4.5,7,11)});m.inversePrimary=S.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>e.isDark?40:80,background:e=>m.inverseSurface,contrastCurve:new F(3,4.5,7,7)});m.secondary=S.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(3,4.5,7,7),toneDeltaPair:e=>new at(m.secondaryContainer,m.secondary,10,"nearer",!1)});m.onSecondary=S.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,tone:e=>G(e)?e.isDark?10:100:e.isDark?20:100,background:e=>m.secondary,contrastCurve:new F(4.5,7,11,21)});m.secondaryContainer=S.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone:e=>{const t=e.isDark?30:90;return G(e)?e.isDark?30:85:Et(e)?ur(e.secondaryPalette.hue,e.secondaryPalette.chroma,t,!e.isDark):t},isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.secondaryContainer,m.secondary,10,"nearer",!1)});m.onSecondaryContainer=S.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,tone:e=>G(e)?e.isDark?90:10:Et(e)?S.foregroundTone(m.secondaryContainer.tone(e),4.5):e.isDark?90:30,background:e=>m.secondaryContainer,contrastCurve:new F(3,4.5,7,11)});m.tertiary=S.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>G(e)?e.isDark?90:25:e.isDark?80:40,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(3,4.5,7,7),toneDeltaPair:e=>new at(m.tertiaryContainer,m.tertiary,10,"nearer",!1)});m.onTertiary=S.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,tone:e=>G(e)?e.isDark?10:90:e.isDark?20:100,background:e=>m.tertiary,contrastCurve:new F(4.5,7,11,21)});m.tertiaryContainer=S.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>{if(G(e))return e.isDark?60:49;if(!Et(e))return e.isDark?30:90;const t=e.tertiaryPalette.getHct(e.sourceColorHct.tone);return Ne.fixIfDisliked(t).tone},isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.tertiaryContainer,m.tertiary,10,"nearer",!1)});m.onTertiaryContainer=S.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>G(e)?e.isDark?0:100:Et(e)?S.foregroundTone(m.tertiaryContainer.tone(e),4.5):e.isDark?90:30,background:e=>m.tertiaryContainer,contrastCurve:new F(3,4.5,7,11)});m.error=S.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(3,4.5,7,7),toneDeltaPair:e=>new at(m.errorContainer,m.error,10,"nearer",!1)});m.onError=S.fromPalette({name:"on_error",palette:e=>e.errorPalette,tone:e=>e.isDark?20:100,background:e=>m.error,contrastCurve:new F(4.5,7,11,21)});m.errorContainer=S.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?30:90,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.errorContainer,m.error,10,"nearer",!1)});m.onErrorContainer=S.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,tone:e=>G(e)?e.isDark?90:10:e.isDark?90:30,background:e=>m.errorContainer,contrastCurve:new F(3,4.5,7,11)});m.primaryFixed=S.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>G(e)?40:90,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.primaryFixed,m.primaryFixedDim,10,"lighter",!0)});m.primaryFixedDim=S.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>G(e)?30:80,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.primaryFixed,m.primaryFixedDim,10,"lighter",!0)});m.onPrimaryFixed=S.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,tone:e=>G(e)?100:10,background:e=>m.primaryFixedDim,secondBackground:e=>m.primaryFixed,contrastCurve:new F(4.5,7,11,21)});m.onPrimaryFixedVariant=S.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,tone:e=>G(e)?90:30,background:e=>m.primaryFixedDim,secondBackground:e=>m.primaryFixed,contrastCurve:new F(3,4.5,7,11)});m.secondaryFixed=S.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>G(e)?80:90,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.secondaryFixed,m.secondaryFixedDim,10,"lighter",!0)});m.secondaryFixedDim=S.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>G(e)?70:80,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.secondaryFixed,m.secondaryFixedDim,10,"lighter",!0)});m.onSecondaryFixed=S.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>10,background:e=>m.secondaryFixedDim,secondBackground:e=>m.secondaryFixed,contrastCurve:new F(4.5,7,11,21)});m.onSecondaryFixedVariant=S.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,tone:e=>G(e)?25:30,background:e=>m.secondaryFixedDim,secondBackground:e=>m.secondaryFixed,contrastCurve:new F(3,4.5,7,11)});m.tertiaryFixed=S.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>G(e)?40:90,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.tertiaryFixed,m.tertiaryFixedDim,10,"lighter",!0)});m.tertiaryFixedDim=S.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>G(e)?30:80,isBackground:!0,background:e=>m.highestSurface(e),contrastCurve:new F(1,1,3,4.5),toneDeltaPair:e=>new at(m.tertiaryFixed,m.tertiaryFixedDim,10,"lighter",!0)});m.onTertiaryFixed=S.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>G(e)?100:10,background:e=>m.tertiaryFixedDim,secondBackground:e=>m.tertiaryFixed,contrastCurve:new F(4.5,7,11,21)});m.onTertiaryFixedVariant=S.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,tone:e=>G(e)?90:30,background:e=>m.tertiaryFixedDim,secondBackground:e=>m.tertiaryFixed,contrastCurve:new F(3,4.5,7,11)});class Pt{constructor(t){this.sourceColorArgb=t.sourceColorArgb,this.variant=t.variant,this.contrastLevel=t.contrastLevel,this.isDark=t.isDark,this.sourceColorHct=X.fromInt(t.sourceColorArgb),this.primaryPalette=t.primaryPalette,this.secondaryPalette=t.secondaryPalette,this.tertiaryPalette=t.tertiaryPalette,this.neutralPalette=t.neutralPalette,this.neutralVariantPalette=t.neutralVariantPalette,this.errorPalette=Z.fromHueAndChroma(25,84)}static getRotatedHue(t,a,n){const r=t.hue;if(a.length!==n.length)throw new Error(`mismatch between hue length ${a.length} & rotations ${n.length}`);if(n.length===1)return Ht(t.hue+n[0]);const o=a.length;for(let s=0;s<=o-2;s++){const i=a[s],c=a[s+1];if(i<r&&r<c)return Ht(r+n[s])}return r}getArgb(t){return t.getArgb(this)}getHct(t){return t.getHct(this)}get primaryPaletteKeyColor(){return this.getArgb(m.primaryPaletteKeyColor)}get secondaryPaletteKeyColor(){return this.getArgb(m.secondaryPaletteKeyColor)}get tertiaryPaletteKeyColor(){return this.getArgb(m.tertiaryPaletteKeyColor)}get neutralPaletteKeyColor(){return this.getArgb(m.neutralPaletteKeyColor)}get neutralVariantPaletteKeyColor(){return this.getArgb(m.neutralVariantPaletteKeyColor)}get background(){return this.getArgb(m.background)}get onBackground(){return this.getArgb(m.onBackground)}get surface(){return this.getArgb(m.surface)}get surfaceDim(){return this.getArgb(m.surfaceDim)}get surfaceBright(){return this.getArgb(m.surfaceBright)}get surfaceContainerLowest(){return this.getArgb(m.surfaceContainerLowest)}get surfaceContainerLow(){return this.getArgb(m.surfaceContainerLow)}get surfaceContainer(){return this.getArgb(m.surfaceContainer)}get surfaceContainerHigh(){return this.getArgb(m.surfaceContainerHigh)}get surfaceContainerHighest(){return this.getArgb(m.surfaceContainerHighest)}get onSurface(){return this.getArgb(m.onSurface)}get surfaceVariant(){return this.getArgb(m.surfaceVariant)}get onSurfaceVariant(){return this.getArgb(m.onSurfaceVariant)}get inverseSurface(){return this.getArgb(m.inverseSurface)}get inverseOnSurface(){return this.getArgb(m.inverseOnSurface)}get outline(){return this.getArgb(m.outline)}get outlineVariant(){return this.getArgb(m.outlineVariant)}get shadow(){return this.getArgb(m.shadow)}get scrim(){return this.getArgb(m.scrim)}get surfaceTint(){return this.getArgb(m.surfaceTint)}get primary(){return this.getArgb(m.primary)}get onPrimary(){return this.getArgb(m.onPrimary)}get primaryContainer(){return this.getArgb(m.primaryContainer)}get onPrimaryContainer(){return this.getArgb(m.onPrimaryContainer)}get inversePrimary(){return this.getArgb(m.inversePrimary)}get secondary(){return this.getArgb(m.secondary)}get onSecondary(){return this.getArgb(m.onSecondary)}get secondaryContainer(){return this.getArgb(m.secondaryContainer)}get onSecondaryContainer(){return this.getArgb(m.onSecondaryContainer)}get tertiary(){return this.getArgb(m.tertiary)}get onTertiary(){return this.getArgb(m.onTertiary)}get tertiaryContainer(){return this.getArgb(m.tertiaryContainer)}get onTertiaryContainer(){return this.getArgb(m.onTertiaryContainer)}get error(){return this.getArgb(m.error)}get onError(){return this.getArgb(m.onError)}get errorContainer(){return this.getArgb(m.errorContainer)}get onErrorContainer(){return this.getArgb(m.onErrorContainer)}get primaryFixed(){return this.getArgb(m.primaryFixed)}get primaryFixedDim(){return this.getArgb(m.primaryFixedDim)}get onPrimaryFixed(){return this.getArgb(m.onPrimaryFixed)}get onPrimaryFixedVariant(){return this.getArgb(m.onPrimaryFixedVariant)}get secondaryFixed(){return this.getArgb(m.secondaryFixed)}get secondaryFixedDim(){return this.getArgb(m.secondaryFixedDim)}get onSecondaryFixed(){return this.getArgb(m.onSecondaryFixed)}get onSecondaryFixedVariant(){return this.getArgb(m.onSecondaryFixedVariant)}get tertiaryFixed(){return this.getArgb(m.tertiaryFixed)}get tertiaryFixedDim(){return this.getArgb(m.tertiaryFixedDim)}get onTertiaryFixed(){return this.getArgb(m.onTertiaryFixed)}get onTertiaryFixedVariant(){return this.getArgb(m.onTertiaryFixedVariant)}}class hr{fromInt(t){return ir(t)}toInt(t){return or(t[0],t[1],t[2])}distance(t,a){const n=t[0]-a[0],r=t[1]-a[1],o=t[2]-a[2];return n*n+r*r+o*o}}const pr=10,mr=3;class fr{static quantize(t,a,n){const r=new Map,o=new Array,s=new Array,i=new hr;let c=0;for(let g=0;g<t.length;g++){const h=t[g],f=r.get(h);f===void 0?(c++,o.push(i.fromInt(h)),s.push(h),r.set(h,1)):r.set(h,f+1)}const d=new Array;for(let g=0;g<c;g++){const h=s[g],f=r.get(h);f!==void 0&&(d[g]=f)}let l=Math.min(n,c);a.length>0&&(l=Math.min(l,a.length));const u=new Array;for(let g=0;g<a.length;g++)u.push(i.fromInt(a[g]));const p=l-u.length;if(a.length===0&&p>0)for(let g=0;g<p;g++){const h=Math.random()*100,f=Math.random()*201+-100,_=Math.random()*201+-100;u.push(new Array(h,f,_))}const y=new Array;for(let g=0;g<c;g++)y.push(Math.floor(Math.random()*l));const x=new Array;for(let g=0;g<l;g++){x.push(new Array);for(let h=0;h<l;h++)x[g].push(0)}const v=new Array;for(let g=0;g<l;g++){v.push(new Array);for(let h=0;h<l;h++)v[g].push(new gr)}const k=new Array;for(let g=0;g<l;g++)k.push(0);for(let g=0;g<pr;g++){for(let M=0;M<l;M++){for(let $=M+1;$<l;$++){const I=i.distance(u[M],u[$]);v[$][M].distance=I,v[$][M].index=M,v[M][$].distance=I,v[M][$].index=$}v[M].sort();for(let $=0;$<l;$++)x[M][$]=v[M][$].index}let h=0;for(let M=0;M<c;M++){const $=o[M],I=y[M],P=u[I],q=i.distance($,P);let j=q,L=-1;for(let C=0;C<l;C++){if(v[I][C].distance>=4*q)continue;const z=i.distance($,u[C]);z<j&&(j=z,L=C)}L!==-1&&Math.abs(Math.sqrt(j)-Math.sqrt(q))>mr&&(h++,y[M]=L)}if(h===0&&g!==0)break;const f=new Array(l).fill(0),_=new Array(l).fill(0),A=new Array(l).fill(0);for(let M=0;M<l;M++)k[M]=0;for(let M=0;M<c;M++){const $=y[M],I=o[M],P=d[M];k[$]+=P,f[$]+=I[0]*P,_[$]+=I[1]*P,A[$]+=I[2]*P}for(let M=0;M<l;M++){const $=k[M];if($===0){u[M]=[0,0,0];continue}const I=f[M]/$,P=_[M]/$,q=A[M]/$;u[M]=[I,P,q]}}const w=new Map;for(let g=0;g<l;g++){const h=k[g];if(h===0)continue;const f=i.toInt(u[g]);w.has(f)||w.set(f,h)}return w}}class gr{constructor(){this.distance=-1,this.index=-1}}class yr{static quantize(t){const a=new Map;for(let n=0;n<t.length;n++){const r=t[n];rr(r)<255||a.set(r,(a.get(r)??0)+1)}return a}}const te=5,ot=33,Bt=35937,J={RED:"red",GREEN:"green",BLUE:"blue"};class br{constructor(t=[],a=[],n=[],r=[],o=[],s=[]){this.weights=t,this.momentsR=a,this.momentsG=n,this.momentsB=r,this.moments=o,this.cubes=s}quantize(t,a){this.constructHistogram(t),this.computeMoments();const n=this.createBoxes(a);return this.createResult(n.resultCount)}constructHistogram(t){this.weights=Array.from({length:Bt}).fill(0),this.momentsR=Array.from({length:Bt}).fill(0),this.momentsG=Array.from({length:Bt}).fill(0),this.momentsB=Array.from({length:Bt}).fill(0),this.moments=Array.from({length:Bt}).fill(0);const a=yr.quantize(t);for(const[n,r]of a.entries()){const o=me(n),s=fe(n),i=ge(n),c=8-te,d=(o>>c)+1,l=(s>>c)+1,u=(i>>c)+1,p=this.getIndex(d,l,u);this.weights[p]=(this.weights[p]??0)+r,this.momentsR[p]+=r*o,this.momentsG[p]+=r*s,this.momentsB[p]+=r*i,this.moments[p]+=r*(o*o+s*s+i*i)}}computeMoments(){for(let t=1;t<ot;t++){const a=Array.from({length:ot}).fill(0),n=Array.from({length:ot}).fill(0),r=Array.from({length:ot}).fill(0),o=Array.from({length:ot}).fill(0),s=Array.from({length:ot}).fill(0);for(let i=1;i<ot;i++){let c=0,d=0,l=0,u=0,p=0;for(let y=1;y<ot;y++){const x=this.getIndex(t,i,y);c+=this.weights[x],d+=this.momentsR[x],l+=this.momentsG[x],u+=this.momentsB[x],p+=this.moments[x],a[y]+=c,n[y]+=d,r[y]+=l,o[y]+=u,s[y]+=p;const v=this.getIndex(t-1,i,y);this.weights[x]=this.weights[v]+a[y],this.momentsR[x]=this.momentsR[v]+n[y],this.momentsG[x]=this.momentsG[v]+r[y],this.momentsB[x]=this.momentsB[v]+o[y],this.moments[x]=this.moments[v]+s[y]}}}}createBoxes(t){this.cubes=Array.from({length:t}).fill(0).map(()=>new wr);const a=Array.from({length:t}).fill(0);this.cubes[0].r0=0,this.cubes[0].g0=0,this.cubes[0].b0=0,this.cubes[0].r1=ot-1,this.cubes[0].g1=ot-1,this.cubes[0].b1=ot-1;let n=t,r=0;for(let o=1;o<t;o++){this.cut(this.cubes[r],this.cubes[o])?(a[r]=this.cubes[r].vol>1?this.variance(this.cubes[r]):0,a[o]=this.cubes[o].vol>1?this.variance(this.cubes[o]):0):(a[r]=0,o--),r=0;let s=a[0];for(let i=1;i<=o;i++)a[i]>s&&(s=a[i],r=i);if(s<=0){n=o+1;break}}return new _r(t,n)}createResult(t){const a=[];for(let n=0;n<t;++n){const r=this.cubes[n],o=this.volume(r,this.weights);if(o>0){const s=Math.round(this.volume(r,this.momentsR)/o),i=Math.round(this.volume(r,this.momentsG)/o),c=Math.round(this.volume(r,this.momentsB)/o),d=255<<24|(s&255)<<16|(i&255)<<8|c&255;a.push(d)}}return a}variance(t){const a=this.volume(t,this.momentsR),n=this.volume(t,this.momentsG),r=this.volume(t,this.momentsB),o=this.moments[this.getIndex(t.r1,t.g1,t.b1)]-this.moments[this.getIndex(t.r1,t.g1,t.b0)]-this.moments[this.getIndex(t.r1,t.g0,t.b1)]+this.moments[this.getIndex(t.r1,t.g0,t.b0)]-this.moments[this.getIndex(t.r0,t.g1,t.b1)]+this.moments[this.getIndex(t.r0,t.g1,t.b0)]+this.moments[this.getIndex(t.r0,t.g0,t.b1)]-this.moments[this.getIndex(t.r0,t.g0,t.b0)],s=a*a+n*n+r*r,i=this.volume(t,this.weights);return o-s/i}cut(t,a){const n=this.volume(t,this.momentsR),r=this.volume(t,this.momentsG),o=this.volume(t,this.momentsB),s=this.volume(t,this.weights),i=this.maximize(t,J.RED,t.r0+1,t.r1,n,r,o,s),c=this.maximize(t,J.GREEN,t.g0+1,t.g1,n,r,o,s),d=this.maximize(t,J.BLUE,t.b0+1,t.b1,n,r,o,s);let l;const u=i.maximum,p=c.maximum,y=d.maximum;if(u>=p&&u>=y){if(i.cutLocation<0)return!1;l=J.RED}else p>=u&&p>=y?l=J.GREEN:l=J.BLUE;switch(a.r1=t.r1,a.g1=t.g1,a.b1=t.b1,l){case J.RED:t.r1=i.cutLocation,a.r0=t.r1,a.g0=t.g0,a.b0=t.b0;break;case J.GREEN:t.g1=c.cutLocation,a.r0=t.r0,a.g0=t.g1,a.b0=t.b0;break;case J.BLUE:t.b1=d.cutLocation,a.r0=t.r0,a.g0=t.g0,a.b0=t.b1;break;default:throw new Error("unexpected direction "+l)}return t.vol=(t.r1-t.r0)*(t.g1-t.g0)*(t.b1-t.b0),a.vol=(a.r1-a.r0)*(a.g1-a.g0)*(a.b1-a.b0),!0}maximize(t,a,n,r,o,s,i,c){const d=this.bottom(t,a,this.momentsR),l=this.bottom(t,a,this.momentsG),u=this.bottom(t,a,this.momentsB),p=this.bottom(t,a,this.weights);let y=0,x=-1,v=0,k=0,w=0,g=0;for(let h=n;h<r;h++){if(v=d+this.top(t,a,h,this.momentsR),k=l+this.top(t,a,h,this.momentsG),w=u+this.top(t,a,h,this.momentsB),g=p+this.top(t,a,h,this.weights),g===0)continue;let f=(v*v+k*k+w*w)*1,_=g*1,A=f/_;v=o-v,k=s-k,w=i-w,g=c-g,g!==0&&(f=(v*v+k*k+w*w)*1,_=g*1,A+=f/_,A>y&&(y=A,x=h))}return new vr(x,y)}volume(t,a){return a[this.getIndex(t.r1,t.g1,t.b1)]-a[this.getIndex(t.r1,t.g1,t.b0)]-a[this.getIndex(t.r1,t.g0,t.b1)]+a[this.getIndex(t.r1,t.g0,t.b0)]-a[this.getIndex(t.r0,t.g1,t.b1)]+a[this.getIndex(t.r0,t.g1,t.b0)]+a[this.getIndex(t.r0,t.g0,t.b1)]-a[this.getIndex(t.r0,t.g0,t.b0)]}bottom(t,a,n){switch(a){case J.RED:return-n[this.getIndex(t.r0,t.g1,t.b1)]+n[this.getIndex(t.r0,t.g1,t.b0)]+n[this.getIndex(t.r0,t.g0,t.b1)]-n[this.getIndex(t.r0,t.g0,t.b0)];case J.GREEN:return-n[this.getIndex(t.r1,t.g0,t.b1)]+n[this.getIndex(t.r1,t.g0,t.b0)]+n[this.getIndex(t.r0,t.g0,t.b1)]-n[this.getIndex(t.r0,t.g0,t.b0)];case J.BLUE:return-n[this.getIndex(t.r1,t.g1,t.b0)]+n[this.getIndex(t.r1,t.g0,t.b0)]+n[this.getIndex(t.r0,t.g1,t.b0)]-n[this.getIndex(t.r0,t.g0,t.b0)];default:throw new Error("unexpected direction $direction")}}top(t,a,n,r){switch(a){case J.RED:return r[this.getIndex(n,t.g1,t.b1)]-r[this.getIndex(n,t.g1,t.b0)]-r[this.getIndex(n,t.g0,t.b1)]+r[this.getIndex(n,t.g0,t.b0)];case J.GREEN:return r[this.getIndex(t.r1,n,t.b1)]-r[this.getIndex(t.r1,n,t.b0)]-r[this.getIndex(t.r0,n,t.b1)]+r[this.getIndex(t.r0,n,t.b0)];case J.BLUE:return r[this.getIndex(t.r1,t.g1,n)]-r[this.getIndex(t.r1,t.g0,n)]-r[this.getIndex(t.r0,t.g1,n)]+r[this.getIndex(t.r0,t.g0,n)];default:throw new Error("unexpected direction $direction")}}getIndex(t,a,n){return(t<<te*2)+(t<<te+1)+t+(a<<te)+a+n}}class wr{constructor(t=0,a=0,n=0,r=0,o=0,s=0,i=0){this.r0=t,this.r1=a,this.g0=n,this.g1=r,this.b0=o,this.b1=s,this.vol=i}}class _r{constructor(t,a){this.requestedCount=t,this.resultCount=a}}class vr{constructor(t,a){this.cutLocation=t,this.maximum=a}}class kr{static quantize(t,a){const r=new br().quantize(t,a);return fr.quantize(t,r,a)}}class gt extends Pt{constructor(t,a,n){super({sourceColorArgb:t.toInt(),variant:bt.EXPRESSIVE,contrastLevel:n,isDark:a,primaryPalette:Z.fromHueAndChroma(Ht(t.hue+240),40),secondaryPalette:Z.fromHueAndChroma(Pt.getRotatedHue(t,gt.hues,gt.secondaryRotations),24),tertiaryPalette:Z.fromHueAndChroma(Pt.getRotatedHue(t,gt.hues,gt.tertiaryRotations),32),neutralPalette:Z.fromHueAndChroma(t.hue+15,8),neutralVariantPalette:Z.fromHueAndChroma(t.hue+15,12)})}}gt.hues=[0,21,51,121,151,191,271,321,360];gt.secondaryRotations=[45,95,45,20,45,90,45,45,45];gt.tertiaryRotations=[120,120,20,45,20,15,20,120,120];class xr extends Pt{constructor(t,a,n){super({sourceColorArgb:t.toInt(),variant:bt.TONAL_SPOT,contrastLevel:n,isDark:a,primaryPalette:Z.fromHueAndChroma(t.hue,36),secondaryPalette:Z.fromHueAndChroma(t.hue,16),tertiaryPalette:Z.fromHueAndChroma(Ht(t.hue+60),24),neutralPalette:Z.fromHueAndChroma(t.hue,6),neutralVariantPalette:Z.fromHueAndChroma(t.hue,8)})}}class yt extends Pt{constructor(t,a,n){super({sourceColorArgb:t.toInt(),variant:bt.VIBRANT,contrastLevel:n,isDark:a,primaryPalette:Z.fromHueAndChroma(t.hue,200),secondaryPalette:Z.fromHueAndChroma(Pt.getRotatedHue(t,yt.hues,yt.secondaryRotations),24),tertiaryPalette:Z.fromHueAndChroma(Pt.getRotatedHue(t,yt.hues,yt.tertiaryRotations),32),neutralPalette:Z.fromHueAndChroma(t.hue,10),neutralVariantPalette:Z.fromHueAndChroma(t.hue,12)})}}yt.hues=[0,41,61,101,131,181,251,301,360];yt.secondaryRotations=[18,15,10,12,15,18,15,12,12];yt.tertiaryRotations=[35,30,20,25,30,35,30,25,25];const Mr={desired:4,fallbackColorARGB:4282549748,filter:!0};function Ar(e,t){return e.score>t.score?-1:e.score<t.score?1:0}class tt{constructor(){}static score(t,a){const{desired:n,fallbackColorARGB:r,filter:o}={...Mr,...a},s=[],i=new Array(360).fill(0);let c=0;for(const[y,x]of t.entries()){const v=X.fromInt(y);s.push(v);const k=Math.floor(v.hue);i[k]+=x,c+=x}const d=new Array(360).fill(0);for(let y=0;y<360;y++){const x=i[y]/c;for(let v=y-14;v<y+16;v++){const k=ua(v);d[k]+=x}}const l=new Array;for(const y of s){const x=ua(Math.round(y.hue)),v=d[x];if(o&&(y.chroma<tt.CUTOFF_CHROMA||v<=tt.CUTOFF_EXCITED_PROPORTION))continue;const k=v*100*tt.WEIGHT_PROPORTION,w=y.chroma<tt.TARGET_CHROMA?tt.WEIGHT_CHROMA_BELOW:tt.WEIGHT_CHROMA_ABOVE,g=(y.chroma-tt.TARGET_CHROMA)*w,h=k+g;l.push({hct:y,score:h})}l.sort(Ar);const u=[];for(let y=90;y>=15;y--){u.length=0;for(const{hct:x}of l)if(u.find(k=>ar(x.hue,k.hue)<y)||u.push(x),u.length>=n)break;if(u.length>=n)break}const p=[];u.length===0&&p.push(r);for(const y of u)p.push(y.toInt());return p}}tt.TARGET_CHROMA=48;tt.WEIGHT_PROPORTION=.7;tt.WEIGHT_CHROMA_ABOVE=.3;tt.WEIGHT_CHROMA_BELOW=.1;tt.CUTOFF_CHROMA=5;tt.CUTOFF_EXCITED_PROPORTION=.01;function Wa(e){const t=me(e),a=fe(e),n=ge(e),r=[t.toString(16),a.toString(16),n.toString(16)];for(const[o,s]of r.entries())s.length===1&&(r[o]="0"+s);return"#"+r.join("")}function $r(e){e=e.replace("#","");const t=e.length===3,a=e.length===6,n=e.length===8;if(!t&&!a&&!n)throw new Error("unexpected hex "+e);let r=0,o=0,s=0;return t?(r=ut(e.slice(0,1).repeat(2)),o=ut(e.slice(1,2).repeat(2)),s=ut(e.slice(2,3).repeat(2))):a?(r=ut(e.slice(0,2)),o=ut(e.slice(2,4)),s=ut(e.slice(4,6))):n&&(r=ut(e.slice(2,4)),o=ut(e.slice(4,6)),s=ut(e.slice(6,8))),(255<<24|(r&255)<<16|(o&255)<<8|s&255)>>>0}function ut(e){return parseInt(e,16)}const Va="shell:theme",Pr=96,Sr=Object.getOwnPropertyNames(m).filter(e=>!["length","name","prototype"].includes(e)).filter(e=>typeof m[e]?.getArgb=="function").filter(e=>!e.endsWith("PaletteKeyColor")),Cr=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function Ie(e,t){return getComputedStyle(document.documentElement).getPropertyValue(e).trim()||t}const Ga=(e,t)=>parseFloat(Ie(e,""))||t,N={seed:"#5b9bd5",dark:!1,wallpaper:"hero",seeds:{}},Tt=new Map,Ir=e=>"requestIdleCallback"in window?requestIdleCallback(e,{timeout:1200}):setTimeout(e,200);function Tr(){try{return JSON.parse(localStorage.getItem(Va)??"null")}catch{return null}}function Vt(){try{localStorage.setItem(Va,JSON.stringify(N))}catch{}}function ye(){const e=document.documentElement,t=new xr(X.fromInt($r(N.seed)),N.dark,0);for(const a of Sr)e.style.setProperty(`--md-sys-color-${Cr(a)}`,Wa(m[a].getArgb(t)));e.dataset.theme=N.dark?"dark":"light",e.style.colorScheme=N.dark?"dark":"light"}const Mt=[{opacity:1},{opacity:1}],ma={forward:e=>e,reverse:(e,t)=>t-1-e,centre:(e,t)=>Math.abs(e-(t-1)/2),edges:(e,t)=>(t-1)/2-Math.abs(e-(t-1)/2),alternate:(e,t)=>e%2?Math.ceil(t/2)+(e-1)/2:e/2},Lr={in:[{opacity:0},{opacity:1}],out:Mt},ee=[{name:"push-left",easing:"--cae-ease-emphasized",in:[{transform:"translateX(100%)"},{transform:"translateX(0%)"}],out:[{transform:"translateX(0%)",opacity:1},{transform:"translateX(-100%)",opacity:1}]},{name:"push-up",easing:"--cae-ease-emphasized",in:[{transform:"translateY(100%)"},{transform:"translateY(0%)"}],out:[{transform:"translateY(0%)",opacity:1},{transform:"translateY(-100%)",opacity:1}]},{name:"uncover-right",over:"out",in:Mt,out:[{transform:"translateX(0%)",opacity:1},{transform:"translateX(100%)",opacity:1}]},{name:"uncover-down",over:"out",in:Mt,out:[{transform:"translateY(0%)",opacity:1},{transform:"translateY(100%)",opacity:1}]},{name:"zoom-in",in:[{transform:"scale(0.72)",opacity:0},{transform:"scale(1)",opacity:1}],out:Mt},{name:"zoom-through",over:"out",in:Mt,out:[{transform:"scale(1)",opacity:1},{transform:"scale(1.7)",opacity:0}]},{name:"swirl",in:[{transform:"rotate(-14deg) scale(1.7)",opacity:0},{transform:"rotate(0deg) scale(1)",opacity:1}],out:Mt},{name:"flip",easing:"--cae-ease-emphasized-decel",in:[{transform:"rotateY(80deg) scale(1.1)",opacity:0},{transform:"rotateY(0deg) scale(1)",opacity:1}],out:Mt},{name:"blinds-right",slats:{axis:"x",count:16,order:"forward",origin:"left center"}},{name:"blinds-left",slats:{axis:"x",count:16,order:"reverse",origin:"right center"}},{name:"blinds-open",slats:{axis:"x",count:14,order:"centre",origin:"center"}},{name:"blinds-close",slats:{axis:"x",count:14,order:"edges",origin:"center"}},{name:"blinds-weave",slats:{axis:"x",count:18,order:"alternate",origin:"center"}},{name:"shutter-up",slats:{axis:"y",count:9,order:"reverse",origin:"center bottom"}},{name:"shutter-down",slats:{axis:"y",count:9,order:"forward",origin:"center top"}},{name:"sheets-up",slats:{axis:"y",count:3,order:"reverse",origin:"center bottom",spread:.62}}];let $e=-1;function Er(){if(ee.length<2)return ee[0];let e=$e;for(;e===$e;)e=Math.floor(Math.random()*ee.length);return $e=e,ee[e]}let de=[],ae=0;function Dr(e){de=e.filter(Boolean).map((t,a)=>({host:t,blurred:a===0,layers:[document.createElement("div"),document.createElement("div")],run:0,box:null}));for(const t of de)for(const a of t.layers)a.className="wallpaper__layer",t.host.append(a)}function fa(e){if(e.box){for(const t of e.box.children)for(const a of t.getAnimations())a.cancel();e.box.remove(),e.box=null}}function Fr(e,t,a,n,r){const{axis:o,count:s,order:i,origin:c,spread:d=.45}=a.slats,l=e.host.getBoundingClientRect(),u=ma[i]??ma.forward,p=Array.from({length:s},(_,A)=>u(A,s)),y=Math.max(...p),x=n*d,v=n-x,k=y?x/y:0,w=document.createElement("div");w.className="wallpaper__slats";const g=100/s;for(let _=0;_<s;_+=1){const A=document.createElement("div");A.className="wallpaper__slat",A.style.backgroundImage=`url("${t}")`,A.style.backgroundSize=`${l.width}px ${l.height}px`,A.style.transformOrigin=c,o==="x"?(A.style.left=`${_*g}%`,A.style.width=`${g}%`,A.style.backgroundPosition=`${-_*l.width/s}px 0`):(A.style.top=`${_*g}%`,A.style.height=`${g}%`,A.style.backgroundPosition=`0 ${-_*l.height/s}px`),w.append(A)}e.host.append(w),e.box=w;const h=o==="x"?[{transform:"scaleX(0)"},{transform:"scaleX(1.02)"}]:[{transform:"scaleY(0)"},{transform:"scaleY(1.02)"}],f=[...w.children].map((_,A)=>_.animate(h,{duration:v,delay:p[A]*k,easing:r,fill:"both"}));return Promise.all(f.map(_=>_.finished.catch(()=>{})))}function Za(e,{animate:t=!0}={}){if(!de.length)return;ae=1-ae;const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=t&&!a?Ga("--cae-duration-wallpaper",1e3):0,r=n?Er():null;for(const o of de){const s=o.layers[ae],i=o.layers[1-ae],c=++o.run;s.style.backgroundImage=`url("${e}")`,fa(o);for(const p of o.layers)for(const y of p.getAnimations())y.cancel();if(!r){s.dataset.front="true",i.dataset.front="false",s.style.zIndex="",i.style.zIndex="";continue}if(r.slats&&!o.blurred){i.dataset.front="true",s.dataset.front="false",s.style.zIndex="1",i.style.zIndex="0";const p=Ie("--cae-ease-emphasized-decel","ease");Fr(o,e,r,n,p).then(()=>{o.run===c&&(s.dataset.front="true",i.dataset.front="false",fa(o))});continue}const d=r.slats?Lr:r,l=Ie(d.easing??"--cae-ease-default-spatial","ease");s.dataset.front="true",i.dataset.front="false";const u=d.over==="out";s.style.zIndex=u?"0":"1",i.style.zIndex=u?"1":"0";for(const p of o.layers)p.style.willChange="transform, opacity";i.animate(d.out,{duration:n,easing:l}),s.animate(d.in,{duration:n,easing:l}).finished.catch(()=>{}).then(()=>{for(const p of o.layers)p.style.willChange=""})}}let ga;function Rr(){const e=document.documentElement,a=window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:Ga("--cae-duration-mode-shift",420);a&&(e.dataset.modeShift="true",clearTimeout(ga),ga=setTimeout(()=>delete e.dataset.modeShift,a+120))}async function Br(e){if(Tt.has(e.id))return Tt.get(e.id);let t=e.seed;try{const a=new Image;a.crossOrigin="anonymous",a.src=e.src,await a.decode();const n=Math.min(1,Pr/Math.max(a.naturalWidth,a.naturalHeight)),r=Math.max(1,Math.round(a.naturalWidth*n)),o=Math.max(1,Math.round(a.naturalHeight*n)),s=document.createElement("canvas");s.width=r,s.height=o;const i=s.getContext("2d",{willReadFrequently:!0});i.drawImage(a,0,0,r,o);const{data:c}=i.getImageData(0,0,r,o),d=[];for(let u=0;u<c.length;u+=4)c[u+3]<255||d.push(255<<24|c[u]<<16|c[u+1]<<8|c[u+2]);const l=tt.score(kr.quantize(d,32));l.length&&(t=Wa(l[0]))}catch{}return Tt.set(e.id,t),N.seeds[e.id]=t,Vt(),t}function Ua(e){Tt.has(e.id)||Ir(async()=>{const t=await Br(e);N.wallpaper!==e.id||N.seed===t||(N.seed=t,ye(),Vt())})}async function Te(e,{keepMode:t=!1}={}){N.wallpaper=e.id,t||(N.dark=e.dark),N.seed=Tt.get(e.id)??N.seeds[e.id]??e.seed,Za(e.src),ye(),Vt(),Ua(e)}function qr(){return Rr(),N.dark=!N.dark,ye(),Vt(),N.dark}function zr(e,t){const a=Tr(),n=e.find(o=>o.id===a?.wallpaper)??e[0];N.wallpaper=n.id,N.seeds=a?.seeds??{},N.dark=a?.dark??n.dark;const r=N.seeds[n.id]??(a?.wallpaper===n.id?a?.seed:null);r&&Tt.set(n.id,r),N.seed=r??n.seed,Dr(Array.isArray(t)?t:[t]),ye(),Za(n.src,{animate:!1}),Vt(),Ua(n)}function Or(e=document){e.addEventListener("pointerdown",t=>{const a=t.target.closest("[data-ripple]");if(!a||t.button!==0)return;const n=a.getBoundingClientRect(),r=Math.hypot(n.width,n.height)*1.3,o=document.createElement("span");o.className="ripple",Object.assign(o.style,{width:`${r}px`,height:`${r}px`,left:`${t.clientX-n.left-r/2}px`,top:`${t.clientY-n.top-r/2}px`}),getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.style.overflow="hidden",a.append(o),o.addEventListener("animationend",()=>o.remove(),{once:!0})})}const jr=()=>window.matchMedia("(max-width: 767px)").matches,Nr=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;function it(e,t){return getComputedStyle(document.documentElement).getPropertyValue(e).trim()||t}const xt=(e,t)=>Nr()?0:parseFloat(it(e,""))||t;function Hr(e){return e<=2?1:e<=6?2:Math.ceil(e/3)}function Wr(e){const t=Hr(e),a=Math.floor(e/t),n=e%t;return Array.from({length:t},(r,o)=>a+(o<n?1:0))}class Vr{#i;#t=new Map;#l=1;#g=0;#n;#c;#e=null;#a=null;#f=new Set;constructor(t,{onChange:a,iconFor:n}={}){this.#i=t,this.#n=a??(()=>{}),this.#c=n??(()=>null),document.addEventListener("keydown",r=>{if(r.key!=="Escape")return;const o=this.#d();o&&this.close(o.id)}),window.addEventListener("resize",()=>this.#s({animate:!1}))}isOpen(t){return this.#t.has(t)}get openIds(){return[...this.#t.keys()]}get minimizedIds(){return[...this.#t.values()].filter(t=>t.minimized).map(t=>t.id)}get visibleIds(){return this.#r().map(t=>t.id)}#r(){return[...this.#t.values()].filter(t=>!t.minimized).sort((t,a)=>t.seq-a.seq)}#d(){let t=null;for(const a of this.#r())(!t||Number(a.el.style.zIndex)>Number(t.el.style.zIndex))&&(t=a);return t}#u(t){const a=this.#i.getBoundingClientRect(),n=parseFloat(it("--cae-tile-gap",""))||10,r=a.width-n*2,o=a.height-n*2,s=jr()?Array.from({length:t},()=>1):Wr(t),i=(o-n*(s.length-1))/s.length,c=[];return s.forEach((d,l)=>{const u=(r-n*(d-1))/d;for(let p=0;p<d;p+=1)c.push({x:n+p*(u+n),y:n+l*(i+n),width:u,height:i})}),c}#h(t,a,{animate:n=!0}={}){n||(t.dataset.settling="true"),t.style.width=`${Math.round(a.width)}px`,t.style.height=`${Math.round(a.height)}px`,t.style.transform=`translate(${Math.round(a.x)}px, ${Math.round(a.y)}px)`,n||(t.offsetWidth,delete t.dataset.settling)}#s({animate:t=!0,skip:a=null}={}){const n=this.#r(),r=this.#u(n.length);n.forEach((o,s)=>{o!==a&&this.#h(o.el,r[s],{animate:t})})}#p(t){const a=setTimeout(()=>{this.#f.delete(a),this.#s()},t);this.#f.add(a)}toggle(t){const a=this.#t.get(t.id);return a?a.minimized?this.restore(t.id):this.#a===t.id?this.minimize(t.id):this.focus(t.id):this.open(t)}open(t){const a=this.#t.get(t.id);if(a)return a.minimized?this.restore(t.id):this.focus(t.id);this.#e&&this.#o();const n=document.createElement("section");n.className="window",n.dataset.app=t.id,n.setAttribute("role","dialog"),n.setAttribute("aria-label",t.title),n.style.zIndex=String(++this.#l),n.innerHTML=`
      <header class="window__bar">
        <div class="window__dots">
          <button class="wdot wdot--close" data-act="close" aria-label="Close ${t.title}">
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
          </button>
          <button class="wdot wdot--min" data-act="minimize" aria-label="Minimize ${t.title}">
            <span class="material-symbols-rounded" aria-hidden="true">remove</span>
          </button>
          <button class="wdot wdot--max" data-act="maximize" aria-label="Maximize ${t.title}">
            <span class="material-symbols-rounded" aria-hidden="true">crop_square</span>
          </button>
        </div>
        <h2 class="window__title">${t.title}</h2>
        <span class="window__spacer" aria-hidden="true"></span>
      </header>
      <div class="window__body"></div>
    `,n.querySelector(".window__body").append(t.render());const r={id:t.id,el:n,app:t,seq:this.#g++,minimized:!1,anims:[]};this.#t.set(t.id,r);const o=this.#r(),s=this.#u(o.length);return this.#h(n,s[o.indexOf(r)],{animate:!1}),this.#i.append(n),this.#s({skip:r}),this.#y(r),this.#b(r),this.focus(t.id),r}#y(t){const a=xt("--cae-duration-default-spatial",500);a&&(t.anims=[t.el.animate([{transform:"scale(0.82)"},{transform:"scale(1)"}],{duration:a,easing:it("--cae-ease-default-spatial","ease"),composite:"add"}),t.el.animate([{opacity:0},{opacity:1}],{duration:xt("--cae-duration-fast-effects",150)||1,easing:it("--cae-ease-standard-decel","ease")})])}#b(t){const{el:a}=t;a.addEventListener("pointerdown",()=>this.focus(t.id),{capture:!0}),a.querySelector(".window__dots").addEventListener("click",n=>{const r=n.target.closest("[data-act]")?.dataset.act;r==="close"&&this.close(t.id),r==="minimize"&&this.minimize(t.id),r==="maximize"&&this.toggleMaximize(t.id)}),a.querySelector(".window__bar").addEventListener("dblclick",n=>{n.target.closest(".wdot")||this.toggleMaximize(t.id)})}focus(t){const a=this.#t.get(t);if(!a||a.minimized)return null;a.el.style.zIndex=String(++this.#l),this.#a=t;for(const n of this.#t.values())n.el.dataset.focused=String(n===a);return this.#n(),a}toggleMaximize(t){const a=this.#t.get(t);if(!a)return;if(this.#e===t)return this.#w();const n=this.#r().filter(r=>r!==a);a.stash=n.map(r=>r.id),this.#e=t,a.el.dataset.maximized="true";for(const r of n)this.minimize(r.id,{relayout:!1});this.#p(xt("--cae-duration-fast-spatial",350)*.7),this.#n()}#w(){const a=this.#t.get(this.#e)?.stash??[];this.#o();for(const n of a)this.restore(n,{focus:!1});this.#s(),this.#n()}#o(){const t=this.#t.get(this.#e);t&&(delete t.el.dataset.maximized,t.stash=null),this.#e=null}#m(t){for(const a of t.anims??[])a.cancel();t.anims=[]}#_(t){const a=xt("--cae-duration-fast-spatial",350),n=t.el.getBoundingClientRect(),r=this.#c(t.id)?.getBoundingClientRect();if(!a||!n.width)return a;const o=r?r.left+r.width/2:n.left+n.width/2,s=r?r.top+r.height/2:n.bottom,i=o-(n.left+n.width/2),c=s-(n.top+n.height/2);return t.anims=[t.el.animate([{transform:"translate(0px, 0px) scale(1, 1)"},{transform:`translate(${i*.55}px, ${c*.6}px) scale(0.5, 0.32)`,offset:.55},{transform:`translate(${i}px, ${c}px) scale(0.06, 0.04)`}],{duration:a,easing:it("--cae-ease-emphasized-accel","ease"),composite:"add",fill:"forwards"}),t.el.animate([{opacity:1},{opacity:0}],{duration:a,easing:it("--cae-ease-standard-accel","ease"),fill:"forwards"})],a}#v(t){const a=xt("--cae-duration-fast-effects",150)*1.6;return a&&(t.anims=[t.el.animate([{transform:"scale(1)"},{transform:"scale(0.86)"}],{duration:a,easing:it("--cae-ease-emphasized-accel","ease"),composite:"add",fill:"forwards"}),t.el.animate([{opacity:1},{opacity:0}],{duration:a,easing:it("--cae-ease-standard-accel","ease"),fill:"forwards"})],a)}minimize(t,{relayout:a=!0}={}){const n=this.#t.get(t);if(!n||n.minimized)return;this.#e===t&&this.#o(),n.minimized=!0,n.el.dataset.minimizing="true";const r=this.#_(n);setTimeout(()=>{n.minimized&&(this.#m(n),n.el.remove(),delete n.el.dataset.minimizing,n.el.style.opacity="")},r+20),a&&this.#p(r*.7),this.#a===t&&(this.#a=this.#d()?.id??null),this.#n(),this.#a&&this.focus(this.#a)}restore(t,{focus:a=!0}={}){const n=this.#t.get(t);if(!n||!n.minimized)return n?this.focus(t):null;this.#e&&this.#e!==t&&this.#o(),n.minimized=!1,this.#m(n),delete n.el.dataset.minimizing,n.el.style.opacity="",n.el.style.zIndex=String(++this.#l);const r=this.#r(),o=this.#u(r.length);this.#h(n.el,o[r.indexOf(n)],{animate:!1}),this.#i.append(n.el),this.#s({skip:n});const s=xt("--cae-duration-default-spatial",500),i=this.#c(t)?.getBoundingClientRect();if(s){const c=n.el.getBoundingClientRect(),d=i?i.left+i.width/2-(c.left+c.width/2):0,l=i?i.top+i.height/2-(c.top+c.height/2):0;n.anims=[n.el.animate([{transform:`translate(${d}px, ${l}px) scale(0.06, 0.04)`},{transform:"translate(0px, 0px) scale(1, 1)"}],{duration:s,easing:it("--cae-ease-default-spatial","ease"),composite:"add"}),n.el.animate([{opacity:0},{opacity:1}],{duration:xt("--cae-duration-fast-effects",150)||1,easing:it("--cae-ease-standard-decel","ease")})]}return a&&this.focus(t),this.#n(),n}close(t){const a=this.#t.get(t);if(!a)return;this.#e===t&&this.#o(),this.#t.delete(t);const n=!a.minimized;a.el.dataset.closing="true";const r=n?this.#v(a):0;setTimeout(()=>{this.#m(a),a.el.remove()},r+40),n&&this.#p(r*.8),this.#a===t&&(this.#a=null),this.#n();const s=this.#d();s&&this.focus(s.id)}closeAll(){for(const t of this.openIds)this.close(t)}}const Gr=`
  <svg viewBox="0 0 24 24" role="img" aria-label="Arch">
    <path d="M12 1.6 2.35 21.45c.35-.2 2.63-1.27 4.72-1.95L12 8.7l4.93 10.8c2.09.68 4.37 1.75 4.72 1.95Z" />
  </svg>
`,Zr=[{act:"notify",icon:"notifications",label:"Notifications"},{act:"gallery",icon:"photo_library",label:"Gallery"},{act:"theme",icon:"dark_mode",label:"Theme"},{act:"fullscreen",icon:"fullscreen",label:"Fullscreen"}];function Ur({apps:e,wm:t,onLauncher:a,onGallery:n,onTheme:r,onNotify:o,onFullscreen:s}){const i=W`
    <nav class="bar" aria-label="Dock">
      <div class="bar__group">
        <button class="bar__logo" data-tip="Launcher · Ctrl K" aria-label="Open launcher">
          ${Gr}
        </button>
      </div>

      <span class="bar__divider" aria-hidden="true"></span>

      <div class="bar__group bar__group--apps">
        ${e.map(k=>`
              <button class="bar__item" data-app="${b(k.id)}" data-tip="${b(k.title)}"
                aria-label="Open ${b(k.title)}">
                <span class="bar__shape" aria-hidden="true"></span>
                <span class="bar__shape bar__shape--leaf" aria-hidden="true"></span>
                ${E(k.icon)}
              </button>`).join("")}
      </div>

      <div class="bar__group bar__group--brand">
        <span class="bar__brand">Ahnaffaiz</span>
      </div>

      <div class="bar__group bar__group--tray">
        ${Zr.map(k=>`
              <button class="bar__item" data-act="${b(k.act)}" data-tip="${b(k.label)}"
                aria-label="${b(k.label)}">
                <span class="bar__shape" aria-hidden="true"></span>
                <span class="bar__shape bar__shape--leaf" aria-hidden="true"></span>
                ${E(k.icon)}
              </button>`).join("")}
        <span class="bar__divider" aria-hidden="true"></span>
        <span class="bar__clock" data-clock><span data-hh>--</span><span data-mm>--</span></span>
      </div>

      <div class="bar__flyout" role="tooltip"><span></span></div>
    </nav>
  `,c=i.querySelector(".bar__flyout"),d=c.querySelector("span");function l(){const k=parseFloat(getComputedStyle(i).getPropertyValue("--cae-shape-item"))||i.querySelector(".bar__item")?.getBoundingClientRect().width||36;i.style.setProperty("--cae-shape-clover",`path("${za(k)}")`)}l(),window.addEventListener("resize",l);let u=null;function p(k){if(k===u)return;if(u=k,!k){c.dataset.open="false";return}const w=i.getBoundingClientRect(),g=k.getBoundingClientRect();d.textContent=k.dataset.tip,c.style.top=`${g.top-w.top+g.height/2}px`,c.dataset.open="true"}i.addEventListener("pointermove",k=>p(k.target.closest("[data-tip]"))),i.addEventListener("pointerleave",()=>p(null));function y(k){const w=k.querySelectorAll(".bar__shape");if(!w.length)return;const g=getComputedStyle(document.documentElement),f=window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:parseFloat(g.getPropertyValue("--cae-duration-slow-spatial"))||650,_=g.getPropertyValue("--cae-ease-default-spatial").trim()||"ease";for(const A of w){for(const M of A.getAnimations())M.cancel();A.animate([{transform:"rotate(0deg) scale(1)"},{transform:"rotate(180deg) scale(0.86)",offset:.5},{transform:"rotate(360deg) scale(1)"}],{duration:f,easing:_})}}i.addEventListener("click",k=>{const w=k.target.closest(".bar__logo");if(w)return a(w);const g=k.target.closest(".bar__item");if(!g)return;const h=g.dataset.app;if(h){const _=`${t.isOpen(h)}:${t.minimizedIds.includes(h)}`;t.toggle(e.find(A=>A.id===h)),_!==`${t.isOpen(h)}:${t.minimizedIds.includes(h)}`&&y(g);return}const f=g.dataset.act;y(g),f==="gallery"&&n(g),f==="theme"&&r(g),f==="notify"&&o(g),f==="fullscreen"&&s(g)});function x(){const k=new Set(t.openIds),w=new Set(t.minimizedIds);for(const g of i.querySelectorAll("[data-app]")){const h=g.dataset.app,f=k.has(h);g.dataset.running=String(f),g.dataset.minimized=String(w.has(h)),g.dataset.open=String(f&&!w.has(h))}}function v(){const k=i.querySelector("[data-hh]"),w=i.querySelector("[data-mm]"),g=()=>{const h=new Date;k.textContent=String(h.getHours()).padStart(2,"0"),w.textContent=String(h.getMinutes()).padStart(2,"0")};g(),setInterval(g,1e4)}return v(),{el:i,sync:x}}const Yr="modulepreload",Kr=function(e){return"/"+e},ya={},ba=function(t,a,n){let r=Promise.resolve();if(a&&a.length>0){let d=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};var s=d;document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");r=d(a.map(l=>{if(l=Kr(l),l in ya)return;ya[l]=!0;const u=l.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const y=document.createElement("link");if(y.rel=u?"stylesheet":Yr,u||(y.as="script"),y.crossOrigin="",y.href=l,c&&y.setAttribute("nonce",c),document.head.appendChild(y),u)return new Promise((x,v)=>{y.addEventListener("load",x),y.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return r.then(i=>{for(const c of i||[])c.status==="rejected"&&o(c.reason);return t().catch(o)})},Xr=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],wa={0:["Clear","sun"],1:["Mainly clear","sun"],2:["Partly cloudy","cloud"],3:["Overcast","cloud"],45:["Fog","cloud"],48:["Fog","cloud"],51:["Drizzle","rain"],61:["Rain","rain"],63:["Rain","rain"],65:["Heavy rain","rain"],71:["Snow","rain"],80:["Showers","rain"],95:["Thunderstorm","rain"]},Jr=e=>wa[e]??wa[0];function Qr(e,t){const a=(new Date(e,t,1).getDay()+6)%7,n=new Date(e,t+1,0).getDate(),r=[];for(let o=0;o<a;o+=1)r.push(null);for(let o=1;o<=n;o+=1)r.push(o);for(;r.length%7;)r.push(null);return r}function ts({player:e}){const t=new Date;let a=new Date(t.getFullYear(),t.getMonth(),1);const n=W`
    <div class="dash">
      <div class="dash__main card-group">
        <section class="dash-card dash-card--me" data-card>
          <span class="dash-card__label">Who</span>
          <p class="dash-name">${b(K.name)}</p>
          <ul class="role-list">
            ${K.roles.map(f=>`<li class="role-list__item">${E("bolt")}${b(f)}</li>`).join("")}
          </ul>
        </section>

        <section class="dash-card dash-card--status" data-card>
          <span class="dash-card__label">Status</span>
          <p class="dash-name">${b(K.status)}</p>
          <p class="dash-muted">${b(K.location)}</p>
          <span class="status-dot" aria-hidden="true"></span>
        </section>

        <section class="dash-card dash-card--clock" data-card>
          <span class="dash-card__label">Clock</span>
          <p class="clock__time">
            <span class="clock__unit" data-clock-hours>--</span>
            <span class="clock__unit" data-clock-minutes>--</span>
          </p>
          <p class="dash-muted clock__date" data-clock-date>—</p>
        </section>

        <section class="dash-card dash-card--calendar" data-card>
          <header class="cal__nav">
            <button class="icon-btn" data-cal="-1" aria-label="Previous month">
              ${E("chevron_left")}
            </button>
            <span class="cal__month" data-cal-title>—</span>
            <button class="icon-btn" data-cal="1" aria-label="Next month">
              ${E("chevron_right")}
            </button>
          </header>
          <div class="cal__grid cal__grid--head">
            ${Xr.map(f=>`<span class="cal__weekday">${f}</span>`).join("")}
          </div>
          <div class="cal__grid" data-cal-grid></div>
        </section>

        <section class="dash-card dash-card--weather" data-card>
          <span class="dash-card__label">Weather</span>
          <div class="sky" data-sky="sun" aria-hidden="true">
            <span class="sky__sun"></span>
            <span class="sky__cloud sky__cloud--a"></span>
            <span class="sky__cloud sky__cloud--b"></span>
            <span class="sky__rain"></span>
          </div>
          <p class="weather__temp"><span data-weather-temp>--</span><i>°C</i></p>
          <p class="dash-muted" data-weather-label>Loading…</p>
          <p class="dash-muted weather__place" data-weather-place>${b(oa.place)}</p>
        </section>

        <section class="dash-card dash-card--tools" data-card>
          <span class="dash-card__label">Tool kits</span>
          <ul class="tool-list">
            ${qn.map((f,_)=>`
                  <li class="tool" style="--i:${_}">
                    <span class="tool__logo">${Fe(f.logo)}</span>
                    <span class="tool__name">${b(f.name)}</span>
                  </li>`).join("")}
          </ul>
        </section>
      </div>

      <section class="dash-card dash-card--player" data-card>
        <span class="dash-card__label">Player</span>
        <div class="cat" data-cat></div>
        <p class="dash-strong">${b(At.title)}</p>
        <p class="dash-muted">${b(At.album)}</p>
        <button class="pill-btn" data-mini-play>
          ${E("play_arrow")}<span data-mini-label>Play</span>
        </button>
      </section>
    </div>
  `,r=n.querySelector("[data-clock-hours]"),o=n.querySelector("[data-clock-minutes]"),s=n.querySelector("[data-clock-date]"),i=f=>String(f).padStart(2,"0");function c(){const f=new Date;r.textContent=i(f.getHours()),o.textContent=i(f.getMinutes());const _=f.toLocaleDateString("en-GB",{weekday:"long"}),A=f.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});s.textContent=`${_}, ${A}`}c(),setInterval(c,1e4);const d=n.querySelector("[data-cal-grid]"),l=n.querySelector("[data-cal-title]");function u(){l.textContent=a.toLocaleDateString([],{month:"long",year:"numeric"});const f=Qr(a.getFullYear(),a.getMonth()),_=a.getFullYear()===t.getFullYear()&&a.getMonth()===t.getMonth();d.innerHTML=f.map((A,M)=>{if(!A)return'<span class="cal__day cal__day--empty"></span>';const $=_&&A===t.getDate();return`<span class="cal__day${$?" cal__day--today":""}" style="--i:${M}">${$?'<span class="cal__today-shape" aria-hidden="true"></span>':""}<span class="cal__num">${A}</span></span>`}).join(""),p()}function p(){const f=d.querySelector(".cal__today-shape");if(!f)return;const _=f.offsetWidth||24;f.style.clipPath=rt("cookie4",_)}n.querySelector(".cal__nav").addEventListener("click",f=>{const _=Number(f.target.closest("[data-cal]")?.dataset.cal);_&&(a=new Date(a.getFullYear(),a.getMonth()+_,1),u(),d.animate([{opacity:0,transform:`translateX(${_*16}px)`},{opacity:1,transform:"translateX(0)"}],{duration:340,easing:"cubic-bezier(0.05, 0.7, 0.1, 1)"}))}),u();const y=n.querySelector("[data-sky]");async function x(){const f=({temperature:_,code:A,place:M})=>{const[$,I]=Jr(A);n.querySelector("[data-weather-temp]").textContent=Math.round(_),n.querySelector("[data-weather-label]").textContent=$,y.dataset.sky=I,M&&(n.querySelector("[data-weather-place]").textContent=M)};f(oa);try{const _=await fetch("https://api.open-meteo.com/v1/forecast?latitude=-6.21&longitude=106.85&current=temperature_2m,weather_code");if(!_.ok)return;const{current:A}=await _.json();f({temperature:A.temperature_2m,code:A.weather_code,place:"Jakarta"})}catch{}}x();const v=n.querySelector("[data-cat]");let k=null;async function w(){if(k)return;const[{default:f},{default:_}]=await Promise.all([ba(()=>import("./lottie-B5z9iVy-.js").then(A=>A.l),[]),ba(()=>import("./cute_cat-DxTTWG5j.js"),[])]);k=f.loadAnimation({container:v,renderer:"svg",loop:!0,autoplay:!0,animationData:_})}const g=n.querySelector("[data-mini-play]"),h=n.querySelector("[data-mini-label]");return g.addEventListener("click",()=>{g.animate([{transform:"scale(1)"},{transform:"scale(0.84)"},{transform:"scale(1)"}],{duration:380,easing:"cubic-bezier(0.42, 1.67, 0.21, 0.9)"}),e.toggle()}),e.onChange(f=>{h.textContent=f?"Pause":"Play",g.querySelector(".material-symbols-rounded").textContent=f?"pause":"play_arrow",v.dataset.playing=String(f)}),{el:n,enter(){w(),c(),p()}}}const _a=e=>getComputedStyle(document.documentElement).getPropertyValue(`--md-sys-color-${e}`).trim()||"#888";function es(e,t,a,n,r,o){const s=Math.min(o,n/2,Math.max(r,1)/2);e.beginPath(),e.moveTo(t,a+r),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.lineTo(t+n-s,a),e.quadraticCurveTo(t+n,a,t+n,a+s),e.lineTo(t+n,a+r),e.closePath(),e.fill()}function Ya({canvas:e,analyser:t,variant:a="bar",bars:n=48,colour:r="primary"}){const o=typeof t=="function"?t:()=>t,s=e.getContext("2d");let i=null,c=!1,d=0;const l=new Float32Array(n),u=new Float32Array(n);let p=null;function y(){const L=Math.min(window.devicePixelRatio||1,2),C=e.getBoundingClientRect();e.width=Math.max(1,Math.round(C.width*L)),e.height=Math.max(1,Math.round(C.height*L)),s.setTransform(L,0,0,L,0,0)}function x(){const L=o();L&&((!p||p.length!==L.frequencyBinCount)&&(p=new Uint8Array(L.frequencyBinCount)),L.getByteFrequencyData(p));for(let C=0;C<n;C+=1){let z=0;if(p){const R=Math.floor((C/n)**1.6*p.length*.7),V=Math.max(R+1,Math.floor(((C+1)/n)**1.6*p.length*.7));let H=0;for(let Y=R;Y<V;Y+=1)H+=p[Y];z=H/(V-R)/255}const D=z>l[C]?.35:.09;l[C]+=(z-l[C])*D,u[C]=Math.max(l[C],u[C]-.006)}}const v=()=>{let L=0;for(let C=0;C<n;C+=1)L+=l[C];return L/n};function k(L,C){const z=_a(r),D=Math.max(1,L/n*.4),R=Math.max(1.5,L/n-D),V=(n-1)/2;for(let H=0;H<n;H+=1){const Y=Math.min(n-1,Math.round(Math.abs(H-V)/V*(n-1))),mt=Math.min(1,l[Y]*1.5),st=Math.max(2,mt*C),dt=H*(R+D);s.fillStyle=z,s.globalAlpha=.34+mt*.56,es(s,dt,C-st,R,st,R/2)}s.globalAlpha=1}const w=8,g=200,h=6,f=12,_=.055,A=Math.PI*2,M=new Float32Array(h);function $(L){const C=n/h;for(let z=0;z<h;z+=1){let D=0;const R=Math.floor(z*C),V=Math.max(R+1,Math.floor((z+1)*C));for(let H=R;H<V;H+=1)D+=l[H];M[z]=D/(V-R)*L*(1-z*.11)/h}}function I(L,C){const z=_a(r),D=L/2,R=C/2,V=Math.min(L,C)/2,H=V*.83,Y=V*.07,mt=v();d+=.005+mt*.012,$(H*.15),s.strokeStyle=z,s.lineJoin="round",s.lineWidth=1.25;for(let st=0;st<w;st+=1){const dt=st/(w-1)*2-1,Ut=d*(1+st*.11)+st*.8;s.beginPath();for(let _t=0;_t<=g;_t+=1){const St=_t/g*A-Math.PI/2;let Ct=H+dt*Y;Ct*=1-_+_*Math.cos(f*St);for(let vt=0;vt<h;vt+=1)Ct+=M[vt]*Math.sin((vt+2)*St+Ut*(1+vt*.09));const Dt=D+Math.cos(St)*Ct,Yt=R+Math.sin(St)*Ct;_t===0?s.moveTo(Dt,Yt):s.lineTo(Dt,Yt)}s.closePath(),s.globalAlpha=.12+(1-Math.abs(dt))*.34,s.stroke()}s.globalAlpha=1}const P={ring:I,bar:k};function q(){const{width:L,height:C}=e.getBoundingClientRect();s.clearRect(0,0,L,C),x(),(P[a]??k)(L,C);const z=l.every(D=>D<.004);if(!c&&z){i=null,s.clearRect(0,0,L,C);return}i=requestAnimationFrame(q)}const j=new ResizeObserver(y);return j.observe(e),y(),{start(){c=!0,i||(i=requestAnimationFrame(q))},stop(){c=!1},energy:v,destroy(){c=!1,i&&cancelAnimationFrame(i),j.disconnect()}}}const as="http://www.w3.org/2000/svg",ns={height:22,stroke:4,amplitude:3.4,wavelength:24,speed:9,gap:7,stopRadius:2.5,step:2,interactive:!0},ne=(e,t)=>{const a=document.createElementNS(as,e);for(const[n,r]of Object.entries(t))a.setAttribute(n,r);return a};function rs({host:e,onSeek:t,...a}){const{height:n,stroke:r,amplitude:o,wavelength:s,speed:i,gap:c,stopRadius:d,step:l,interactive:u}={...ns,...a},p=ne("svg",{class:"wave__svg",height:n,"aria-hidden":"true"}),y=ne("path",{class:"wave__active",fill:"none","stroke-width":r,"stroke-linecap":"round"}),x=ne("line",{class:"wave__rest","stroke-width":r,"stroke-linecap":"round"}),v=ne("circle",{class:"wave__stop",r:d});p.append(x,y,v),e.append(p);let k=0,w=0,g=!1,h=0,f=0,_=null,A=0;const M=n/2,$=D=>Math.min(1,Math.max(0,D)),I=D=>M+Math.sin((D+f)/s*Math.PI*2)*o*h;function P(D){const R=[];let V=-1;for(let Y=0;Y<=D;Y+=l)R.push(`${R.length?"L":"M"} ${Y.toFixed(1)} ${I(Y).toFixed(2)}`),V=Y;R.length||R.push(`M 0 ${I(0).toFixed(2)}`);const H=Math.max(D,.01);return H>V&&R.push(`L ${H.toFixed(2)} ${I(H).toFixed(2)}`),R.join(" ")}function q(){if(!k)return;const D=r/2,R=k-D*2-d*2-2,V=$(w)*R,H=Math.min(V+c,R);y.setAttribute("transform",`translate(${D}, 0)`),y.setAttribute("d",P(V)),x.setAttribute("x1",D+H),x.setAttribute("x2",D+R),x.setAttribute("y1",M),x.setAttribute("y2",M),x.setAttribute("opacity",R-H<1?0:1),v.setAttribute("cx",k-D-d),v.setAttribute("cy",M)}function j(D){const R=A?Math.min((D-A)/1e3,.1):0;if(A=D,f-=i*R,h+=((g?1:0)-h)*Math.min(1,R*6),q(),!g&&h<.01){h=0,q(),_=null,A=0;return}_=requestAnimationFrame(j)}function L(){_||(_=requestAnimationFrame(j))}function C(){k=e.getBoundingClientRect().width,p.setAttribute("width",k),p.setAttribute("viewBox",`0 0 ${k} ${n}`),q()}new ResizeObserver(C).observe(e),C();const z=D=>{const R=e.getBoundingClientRect();return $((D.clientX-R.left)/R.width)};return u&&(e.addEventListener("pointerdown",D=>{e.setPointerCapture(D.pointerId),t?.(z(D))}),e.addEventListener("pointermove",D=>{e.hasPointerCapture(D.pointerId)&&t?.(z(D))}),e.addEventListener("keydown",D=>{const R={ArrowLeft:-.02,ArrowRight:.02,Home:-1,End:1}[D.key];R!==void 0&&(D.preventDefault(),t?.($(Math.abs(R)===1?(R+1)/2:w+R)))})),{host:e,measure:C,set(D){w=$(D),_||q()},setPlaying(D){g=D,L()}}}const re=30,va=24;function ss({player:e,onDesktopMeter:t}){const a=W`
    <div class="media">
      <div class="media__stage">
        <canvas class="media__ring" data-ring aria-hidden="true"></canvas>
        <div class="disc" data-disc>
          <img class="disc__art" src="${b(At.cover)}" alt="" />
          <span class="disc__sheen" aria-hidden="true"></span>
          <span class="disc__hole" aria-hidden="true"></span>
        </div>
      </div>

      <div class="media__side">
        <span class="dash-card__label">Now playing</span>
        <p class="media__title">${b(At.title)}</p>
        <p class="dash-muted">${b(At.artist)}</p>
        <p class="dash-muted media__album">${b(At.album)}</p>

        <div class="wave" data-wave-host>
          <div
            class="wave__bar"
            data-wave-bar
            role="slider"
            tabindex="0"
            aria-label="Seek"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="0"
          ></div>
          <div class="wave__times">
            <span data-elapsed>0:00</span>
            <span data-total>--:--</span>
          </div>
        </div>

        <div class="media__transport" data-transport>
          <button class="fab-btn" data-act="prev" aria-label="Back ${re} seconds">
            ${E("fast_rewind")}
          </button>
          <button class="fab-btn fab-btn--primary" data-act="toggle" aria-label="Play">
            ${E("play_arrow")}
          </button>
          <button class="fab-btn" data-act="next" aria-label="Forward ${re} seconds">
            ${E("fast_forward")}
          </button>
          <button class="fab-btn" data-act="reset" aria-label="Back to the start">
            ${E("replay")}
          </button>
        </div>

        <button class="eq-btn" data-eq type="button" role="switch" aria-checked="false">
          <span class="eq-btn__track" aria-hidden="true">
            <span class="eq-btn__mark">
              <span class="eq-btn__shape" data-eq-shape></span>
              <span class="eq-btn__bars"><i></i><i></i><i></i></span>
            </span>
          </span>
          <span class="eq-btn__label">Equalizer on desktop</span>
        </button>
      </div>
    </div>
  `,n=Ya({canvas:a.querySelector("[data-ring]"),analyser:()=>e.analyser,variant:"ring",bars:72}),r=a.querySelector("[data-disc]");function o(){const h=r.offsetWidth;h&&(r.style.clipPath=rt("cookie12",h))}new ResizeObserver(o).observe(r);const s=rs({host:a.querySelector("[data-wave-bar]"),onSeek:h=>{const{duration:f}=e.position();f&&e.seek(h*f)}}),i=a.querySelector("[data-elapsed]"),c=a.querySelector("[data-total]"),d=h=>{if(!Number.isFinite(h))return"--:--";const f=Math.max(0,Math.floor(h));return`${Math.floor(f/60)}:${String(f%60).padStart(2,"0")}`};e.onTime(({time:h,duration:f})=>{const _=f?h/f:0;s.set(_),i.textContent=d(h),c.textContent=d(f||NaN),s.host.setAttribute("aria-valuenow",String(Math.round(_*100)))});const l=a.querySelector("[data-transport]"),u=[...l.querySelectorAll("[data-act]")],p=l.querySelector('[data-act="toggle"]');function y(h){const f=u.indexOf(h);for(const[_,A]of u.entries()){const M=Math.abs(_-f),$=10/(1+M*.6);A.animate([{translate:"0px"},{translate:`${$}px`},{translate:`${-$*.7}px`},{translate:"0px"}],{duration:520,delay:M*60,easing:"cubic-bezier(0.38, 1.21, 0.22, 1)"})}}l.addEventListener("click",h=>{const f=h.target.closest("[data-act]");if(!f)return;y(f);const _=f.dataset.act;_==="toggle"&&e.toggle(),_==="prev"&&e.nudge(-re),_==="next"&&e.nudge(re),_==="reset"&&e.reset()});const x=a.querySelector("[data-eq]"),v=a.querySelector("[data-eq-shape]"),k=rt("circle",va),w=rt("cookie4",va);v.style.clipPath=k;let g=!1;return x.addEventListener("click",()=>{g=!g,x.setAttribute("aria-checked",String(g)),v.style.clipPath=g?w:k,t(g)}),e.onChange(h=>{r.dataset.playing=String(h),s.setPlaying(h),p.querySelector(".material-symbols-rounded").textContent=h?"pause":"play_arrow",p.setAttribute("aria-label",h?"Pause":"Play"),h?n.start():n.stop()}),{el:a,enter(){e.prime(),s.measure(),o(),e.playing&&n.start()}}}const ue=132,Le=5,ka=(ue-Le*2)/2,xa=Math.PI*2,Pe=-Math.PI/2,Ma=18,os=3.6,Aa=.16,is=.022,Ka=1200,$a=["clover","cookie12","flower"],Xa=e=>1-(1-e)**3;function Pa(e,t,a,n,r,o,s){if(r-n<.001)return"";const i=[];for(let d=n;d<r;d+=is){const l=a+Math.sin(d*Ma+s)*o;i.push(`${i.length?"L":"M"} ${(e+Math.cos(d)*l).toFixed(2)} ${(t+Math.sin(d)*l).toFixed(2)}`)}const c=a+Math.sin(r*Ma+s)*o;return i.push(`L ${(e+Math.cos(r)*c).toFixed(2)} ${(t+Math.sin(r)*c).toFixed(2)}`),i.join(" ")}const ls=e=>`
  <svg class="meter__svg" viewBox="0 0 ${ue} ${ue}" aria-hidden="true">
    <defs>
      <linearGradient id="meter-${e}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--md-sys-color-primary)" />
        <stop offset="100%" stop-color="var(--md-sys-color-tertiary)" />
      </linearGradient>
    </defs>
    <path class="meter__track" fill="none" stroke-width="${Le}" stroke-linecap="round" />
    <path class="meter__value" fill="none" stroke="url(#meter-${e})" stroke-width="${Le}"
      stroke-linecap="round" />
  </svg>
`;function cs({root:e,value:t}){const a=e.querySelector(".meter__value"),n=e.querySelector(".meter__track"),r=ue/2;let o=0,s=0,i=0,c=0,d=0,l=null,u=0,p=0;function y(){const k=Pe+o*xa;a.setAttribute("d",Pa(r,r,ka,Pe,k,os*i,d));const w=k+Aa,g=Pe+xa-Aa;n.setAttribute("d",w<g?Pa(r,r,ka,w,g,0,0):"")}function x(k){const w=u?Math.min((k-u)/1e3,.1):0;if(u=k,p){const g=Math.min(1,(k-p)/Ka);o=s*Xa(g),g>=1&&(p=0,c=0)}if(d+=w*2.4,i+=(c-i)*Math.min(1,w*4),y(),p||i>.005||Math.abs(o-s)>.001){l=requestAnimationFrame(x);return}i=0,y(),l=null,u=0}const v=()=>{l||(l=requestAnimationFrame(x))};return y(),{play(k){if(s=t/100,k){o=s,i=0,y();return}o=0,c=1,p=0,requestAnimationFrame(w=>{p=w,v()})},setHover(k){c=k||p?1:0,v()}}}function ds(e,t,a,n){if(n){e.textContent=String(t);return}const r=document.timeline.currentTime+a,o=s=>{const i=Math.min(1,Math.max(0,(s-r)/Ka));e.textContent=String(Math.round(t*Xa(i))),i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function us(){const e=W`
    <div class="perf">
      <div class="perf__meters">
        ${Ae.meters.map((s,i)=>`
              <figure class="meter" style="--i:${i}" tabindex="0">
                <div class="meter__dial">
                  ${ls(i)}
                  <span class="meter__readout">
                    <b data-count="${s.value}">0</b><i>%</i>
                  </span>
                </div>
                <figcaption class="meter__label">
                  ${E(s.icon)}<span>${b(s.label)}</span>
                </figcaption>
              </figure>`).join("")}
      </div>

      <ul class="fact-list">
        ${Ae.facts.map((s,i)=>{const[,c="",d=""]=/^(\d*)(.*)$/.exec(String(s.value))??[];return`
              <li class="fact" style="--i:${i}" tabindex="0">
                <span class="fact__mark" data-mark="${b($a[i%$a.length])}">
                  ${E(s.icon)}
                </span>
                <b class="fact__value">
                  <span data-count="${b(c)}">${c?"0":""}</span>${b(d)}
                </b>
                <span class="fact__label">${b(s.label)}</span>
                ${s.detail?`<span class="fact__detail">${b(s.detail)}</span>`:""}
              </li>`}).join("")}
      </ul>
    </div>
  `,t=[...e.querySelectorAll(".meter")].map((s,i)=>{const c=cs({root:s,value:Ae.meters[i].value});for(const[d,l]of[[!0,["pointerenter","focus"]],[!1,["pointerleave","blur"]]])for(const u of l)s.addEventListener(u,()=>c.setHover(d));return c}),a=[...e.querySelectorAll(".fact__mark")];function n(){for(const s of a){const i=s.offsetWidth||44;s.style.clipPath=rt(s.dataset.mark,i)}}n();const r=[...e.querySelectorAll("[data-count]")];function o(){const s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;n(),t.forEach((i,c)=>{setTimeout(()=>i.play(s),c*110)}),r.forEach((i,c)=>{i.dataset.count!==""&&ds(i,Number(i.dataset.count),c*90,s)})}return{el:e,enter:o}}const Sa=["clover","cookie12","gem","sunny","cookie4","softBurst"],hs=[{layer:"over"},{layer:"under"},{layer:"under",turn:!0},{layer:"over"},{layer:"under"}],ps="http://www.w3.org/2000/svg",Ja=Math.PI*2,It=6,Ca=460,ms=250,Ia=(e,t)=>{const a=document.createElementNS(ps,e);for(const[n,r]of Object.entries(t))a.setAttribute(n,r);return a},Qa=e=>e.map(([t,a],n)=>`${n?"L":"M"} ${t.toFixed(1)} ${a.toFixed(1)}`).join(" "),He=(e,t,a)=>Math.min(a,Math.max(t,e)),tn=e=>He(e/24,1.2,4),en=e=>He(e/12,3,6),an=e=>Math.sin(e*Math.PI)**.6;function fs(e,t,a){const n=t-e,r=tn(n),o=en(n),s=[];for(let i=0;i<=1;i+=Math.min(.04,1.5/n))s.push([e+n*i,a+Math.sin(i*Ja*r)*o*an(i)]);return Qa(s)}const Ta=(e,t,a,n,r)=>{const o=1-r;return o*o*o*e+3*o*o*r*t+3*o*r*r*a+r*r*r*n};function gs(e,t,a,n){const[r,o]=e,[s,i]=t,c=He(n*1.4,16,40),d=[r,a+c],l=[s,a-c],u=w=>[Ta(r,d[0],l[0],s,w),Ta(o,d[1],l[1],i,w)];let p=0,y=u(0);for(let w=.02;w<=1;w+=.02){const g=u(w);p+=Math.hypot(g[0]-y[0],g[1]-y[1]),y=g}const x=tn(p),v=en(p),k=[];for(let w=0;w<=1;w+=.008){const[g,h]=u(w),[f,_]=u(Math.min(1,w+.004)),A=f-g,M=_-h,$=Math.hypot(A,M)||1,I=Math.sin(w*Ja*x)*v*an(w);k.push([g+-M/$*I,h+A/$*I])}return Qa(k)}function La(e,t,a){const r=d=>[e+Math.cos(a+Math.PI+d)*It,t+Math.sin(a+Math.PI+d)*It],[o,s]=r(-1.25),[i,c]=r(2.5/2);return`M ${o.toFixed(1)} ${s.toFixed(1)} L ${e.toFixed(1)} ${t.toFixed(1)} L ${i.toFixed(1)} ${c.toFixed(1)}`}function ys(){const e=W`
    <div class="flow">
      <p class="flow__title">${b(sa.title)}</p>
      <div class="flow__stage">
        <svg class="flow__links flow__links--under" data-layer="under" aria-hidden="true"></svg>
        <ol class="flow__steps">
          ${sa.steps.map((u,p)=>`
                <li class="step" style="--i:${p}" tabindex="0">
                  <span class="step__index">${p+1}</span>
                  <span class="step__mark" data-mark="${b(Sa[p%Sa.length])}">
                    <span class="step__icon">${E(u.icon)}</span>
                  </span>
                  <span class="step__body">
                    <b class="step__name">${b(u.name)}</b>
                    <span class="step__detail">${b(u.detail)}</span>
                  </span>
                </li>`).join("")}
        </ol>
        <svg class="flow__links flow__links--over" data-layer="over" aria-hidden="true"></svg>
      </div>
    </div>
  `,t=e.querySelector(".flow__stage"),a=[...e.querySelectorAll(".step")],n=[...e.querySelectorAll(".step__mark")],r={under:e.querySelector('[data-layer="under"]'),over:e.querySelector('[data-layer="over"]')};function o(){for(const u of n){const p=u.offsetWidth||52;u.style.clipPath=rt(u.dataset.mark,p)}}function s(u,p){let y=0,x=0;for(let v=u;v&&v!==p;v=v.offsetParent)y+=v.offsetLeft,x+=v.offsetTop;return{left:y,top:x,width:u.offsetWidth,height:u.offsetHeight}}function i(){const u=t.offsetWidth;if(!u)return[];const p=t.offsetHeight;for(const v of Object.values(r))v.setAttribute("viewBox",`0 0 ${u} ${p}`),v.replaceChildren();const y=a.map(v=>{const k=s(v,t),w=s(v.querySelector(".step__mark"),t);return{left:k.left,right:k.left+k.width,top:k.top,bottom:k.top+k.height,cx:k.left+k.width/2,markY:w.top+w.height/2}}),x=[];return hs.forEach((v,k)=>{const w=y[k],g=y[k+1];if(!w||!g)return;const h=r[v.layer];let f="",_=null;if(v.turn){const $=(w.bottom+g.top)/2,I=[g.cx,g.top-It-2];f=gs([w.cx,w.bottom+2],I,$,g.top-w.bottom),_=La(I[0],I[1]+It-1,Math.PI/2)}else{const $=w.markY,I=w.right+5,P=g.left-5-It;if(P<=I)return;f=fs(I,P,$),_=La(P+It,$,0)}const A=Ia("path",{class:"flow__link",d:f,fill:"none"});h.append(A);const M=_?h.appendChild(Ia("path",{class:"flow__head",d:_,fill:"none"})):null;x.push({path:A,headPath:M})}),x}let c=[];function d(){o(),c=i()}new ResizeObserver(d).observe(t);function l(){c.forEach(({path:u,headPath:p},y)=>{const x=u.getTotalLength(),v=y*ms;u.classList.add("flow__link--drawing"),u.style.strokeDasharray=`${x}`,u.style.strokeDashoffset=`${x}`,p&&(p.style.opacity="0"),u.animate([{strokeDashoffset:x},{strokeDashoffset:0}],{duration:Ca,delay:v,easing:"cubic-bezier(0.05, 0.7, 0.1, 1)",fill:"both"}).finished.then(()=>{u.classList.remove("flow__link--drawing"),u.style.strokeDasharray="",u.style.strokeDashoffset="",p&&(p.style.opacity="")}).catch(()=>{}),p&&p.animate([{opacity:0},{opacity:1}],{duration:180,delay:v+Ca-60,fill:"both"})})}return{el:e,enter(){d(),!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(a.forEach((u,p)=>{u.animate([{opacity:0,transform:"translateY(14px) scale(0.96)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:460,delay:p*90,easing:"cubic-bezier(0.42, 1.67, 0.21, 0.9)",fill:"backwards"})}),l())}}}const qt=[{id:"dashboard",label:"Dashboard",icon:"dashboard"},{id:"media",label:"Media",icon:"graphic_eq"},{id:"stats",label:"Stats",icon:"monitoring"},{id:"workspace",label:"Workspace",icon:"route"}];function bs({player:e,onDesktopMeter:t}){const a={dashboard:ts({player:e}),media:ss({player:e,onDesktopMeter:t}),stats:us(),workspace:ys()},n=W`
    <section class="drawer" aria-label="Dashboard">
      <div class="drawer__tabs" role="tablist">
        ${qt.map((d,l)=>`
            <button class="drawer__tab" role="tab" data-tab="${b(d.id)}"
              aria-selected="${l===0}">${E(d.icon)}<span>${b(d.label)}</span></button>`).join("")}
      </div>
      <div class="drawer__viewport">
        <div class="drawer__track"></div>
      </div>
    </section>
  `;n.dataset.tab=qt[0].id;const r=n.querySelector(".drawer__track");for(const d of qt){const l=W`<div class="drawer__panel" data-panel="${b(d.id)}"></div>`;l.append(a[d.id].el),r.append(l)}const o=[...n.querySelectorAll(".drawer__tab")];let s=qt[0].id;function i(d){const l=qt.findIndex(u=>u.id===d);if(!(l<0)){s=d,n.dataset.tab=d,r.style.transform=`translateX(-${l*100}%)`;for(const u of o)u.setAttribute("aria-selected",String(u.dataset.tab===d));a[d].enter?.()}}const c=n.querySelector(".drawer__viewport");return c.addEventListener("scroll",()=>{c.scrollLeft!==0&&(c.scrollLeft=0)}),n.querySelector(".drawer__tabs").addEventListener("click",d=>{const l=d.target.closest("[data-tab]");l&&i(l.dataset.tab)}),{el:n,select:i,enter(){a[s].enter?.()}}}const Ea=(e,t)=>{const a=t.toLowerCase();let n=0;for(const r of e.toLowerCase()){if(n=a.indexOf(r,n),n===-1)return!1;n+=1}return!0},Da=(e,t)=>{const a=e.toLowerCase();return t?a.startsWith(t)?0:a.includes(t)?1:2:2};function ws({apps:e,wm:t,commands:a}){const n=W`
    <div class="launcher" role="dialog" aria-label="Launcher">
      <div class="launcher__panel">
        <div class="launcher__list" role="listbox"></div>
        <div class="launcher__search">
          ${E("search")}
          <input type="text" placeholder="Search apps and commands" aria-label="Search" />
          <button class="launcher__clear" data-clear aria-label="Clear search">
            ${E("close")}
          </button>
        </div>
      </div>
    </div>
  `,r=n.querySelector(".launcher__list"),o=n.querySelector(".launcher__search"),s=n.querySelector("input");let i=0,c=[];const d=w=>w.replace(/^>+\s*/,"").trim(),l=w=>{const g=e.filter(f=>!w||Ea(w,`${f.title} ${f.id}`)).map(f=>({name:f.title,desc:`Open the ${f.title.toLowerCase()} window`,icon:f.icon,score:Da(f.title,w),run:()=>t.open(f)})),h=a.filter(f=>!w||Ea(w,f.name)).map(f=>({...f,score:Da(f.name,w)+.5}));return[...g,...h].sort((f,_)=>f.score-_.score)};function u(w=!1){const g=d(s.value).toLowerCase();o.dataset.filled=String(s.value.length>0),n.dataset.animate=String(w),c=l(g),i=0,r.innerHTML=c.length?c.map((h,f)=>`
              <button class="launcher__item" role="option" data-index="${f}"
                style="--i:${f}"
                data-active="${f===0}" aria-selected="${f===0}">
                <span class="launcher__glyph">${E(h.icon)}</span>
                <span class="launcher__text">
                  <span class="launcher__name">${b(h.name)}</span>
                  <span class="launcher__desc">${b(h.desc)}</span>
                </span>
              </button>`).join(""):'<p class="muted" style="padding:18px">No results.</p>'}function p(w){if(c.length){i=(i+w+c.length)%c.length;for(const g of r.querySelectorAll(".launcher__item")){const h=Number(g.dataset.index)===i;g.dataset.active=String(h),g.setAttribute("aria-selected",String(h)),h&&g.scrollIntoView({block:"nearest"})}}}function y(w=i){const g=c[w];g&&(v(),g.run())}function x(w=""){n.dataset.open="true",s.value=w,u(!0),s.focus({preventScroll:!0})}function v(){n.dataset.open="false",s.blur()}const k=()=>n.dataset.open==="true";return s.addEventListener("input",()=>u()),n.querySelector("[data-clear]").addEventListener("click",()=>{s.value="",u(),s.focus({preventScroll:!0})}),r.addEventListener("click",w=>{const g=w.target.closest(".launcher__item");g&&y(Number(g.dataset.index))}),s.addEventListener("keydown",w=>{w.key==="ArrowDown"?(w.preventDefault(),p(1)):w.key==="ArrowUp"?(w.preventDefault(),p(-1)):w.key==="Enter"?(w.preventDefault(),y()):w.key==="Escape"&&v()}),document.addEventListener("keydown",w=>{(w.metaKey||w.ctrlKey)&&w.key.toLowerCase()==="k"&&(w.preventDefault(),k()?v():x())}),document.addEventListener("pointerdown",w=>{k()&&!n.contains(w.target)&&!w.target.closest(".bar__logo")&&v()}),u(),{el:n,open:x,close:v,isOpen:k}}function _s(e){return Math.round(Math.min(560,Math.max(300,e*.52)))}function vs(){const e=W`
    <div class="wpm" role="dialog" aria-modal="true" aria-label="Choose a wallpaper" data-open="false">
      <div class="wpm__scrim" data-close></div>
      <div class="wpm__stage">
        <header class="wpm__head">
          <p class="wpm__eyebrow">Wallpaper</p>
          <h2 class="wpm__title">Choose your scene</h2>
        </header>

        <button class="wpm__nav wpm__nav--prev" data-nav="-1" aria-label="Previous wallpaper">
          <span class="material-symbols-rounded">chevron_left</span>
        </button>
        <div class="wpm__viewport">
          <div class="wpm__track"></div>
          <span class="wpm__marker" aria-hidden="true"></span>
        </div>
        <button class="wpm__nav wpm__nav--next" data-nav="1" aria-label="Next wallpaper">
          <span class="material-symbols-rounded">chevron_right</span>
        </button>

        <div class="wpm__foot">
          <div class="wpm__indicator" aria-hidden="true"></div>
          <div class="wpm__meta">
            <span class="wpm__count"></span>
            <span class="wpm__hint">
              <kbd>←</kbd><kbd>→</kbd> navigate · <kbd>Enter</kbd> select · <kbd>Esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </div>
  `,t=e.querySelector(".wpm__track"),a=e.querySelector(".wpm__viewport"),n=e.querySelector(".wpm__indicator"),r=e.querySelector(".wpm__count");let o=0,s=null,i=[],c=[];function d(){t.innerHTML=Q.map((h,f)=>`
          <button class="wpm__tile" type="button" data-index="${f}" style="--i:${f}"
            aria-label="${b(h.name)} — ${b(h.tag??"")}">
            <span class="wpm__thumb">
              <img class="wpm__img" src="${b(h.src)}" alt="" loading="lazy" draggable="false" />
              <span class="wpm__shade"></span>
            </span>
            <span class="wpm__label">
              <span class="wpm__num">${String(f+1).padStart(2,"0")}</span>
              <span class="wpm__name">${b(h.name)}</span>
              <span class="wpm__tag">${b(h.tag??"")}</span>
            </span>
            <span class="wpm__ring" aria-hidden="true"></span>
          </button>`).join(""),n.innerHTML=Q.map((h,f)=>`<span class="wpm__dot" data-index="${f}"></span>`).join(""),i=[...t.querySelectorAll(".wpm__tile")],c=[...n.querySelectorAll(".wpm__dot")]}function l(){const h=a.clientWidth||window.innerWidth||document.documentElement.clientWidth||1280,f=_s(h),_=Math.round(f*.015);e.style.setProperty("--wpm-tile-w",`${f}px`),e.style.setProperty("--wpm-tile-gap",`${_}px`),e.style.setProperty("--wpm-skew",`${Math.round(f*.12)}px`);const A=h/2-(o*(f+_)+f/2);t.style.transform=`translate3d(${A}px, 0, 0)`}function u(){i.forEach((f,_)=>{const A=_===o;f.dataset.active=String(A),f.style.setProperty("--d",String(Math.min(3,Math.abs(_-o)))),f.setAttribute("aria-current",A?"true":"false"),A?f.setAttribute("tabindex","0"):f.setAttribute("tabindex","-1")}),c.forEach((f,_)=>f.dataset.active=String(_===o)),n.style.setProperty("--active",String(o));const h=Q[o];r.textContent=`${String(o+1).padStart(2,"0")} / ${String(Q.length).padStart(2,"0")}`,e.setAttribute("aria-label",`Wallpaper — ${h.name}`)}function p(h,{apply:f=!0}={}){const _=Q.length;o=(h%_+_)%_,l(),u(),f&&Q[o].id!==N.wallpaper&&Te(Q[o])}function y(){e.dataset.open!=="true"&&(s=N.wallpaper,o=Math.max(0,Q.findIndex(h=>h.id===N.wallpaper)),d(),e.dataset.open="true",l(),u(),requestAnimationFrame(()=>i[o]?.focus({preventScroll:!0})))}function x(){e.dataset.open="false"}function v(){if(N.wallpaper!==s){const h=Q.find(f=>f.id===s);h&&Te(h)}x()}const k=()=>e.dataset.open==="true";t.addEventListener("click",h=>{const f=h.target.closest(".wpm__tile");if(!f)return;const _=Number(f.dataset.index);_===o?x():p(_)}),n.addEventListener("click",h=>{const f=h.target.closest(".wpm__dot");f&&p(Number(f.dataset.index))});for(const h of e.querySelectorAll(".wpm__nav"))h.addEventListener("click",()=>p(o+Number(h.dataset.nav)));e.querySelector(".wpm__scrim").addEventListener("click",v);let w=0;a.addEventListener("wheel",h=>{const f=Math.abs(h.deltaX)>Math.abs(h.deltaY)?h.deltaX:h.deltaY;if(Math.abs(f)<8)return;h.preventDefault();const _=performance.now();_<w||(w=_+260,p(o+(f>0?1:-1)))},{passive:!1});let g=null;return a.addEventListener("pointerdown",h=>{h.target.closest(".wpm__nav")||(g=h.clientX)}),a.addEventListener("pointerup",h=>{if(g===null)return;const f=h.clientX-g;g=null,Math.abs(f)>44&&p(o+(f<0?1:-1))}),e.addEventListener("keydown",h=>{switch(h.key){case"ArrowRight":case"ArrowDown":h.preventDefault(),p(o+1);break;case"ArrowLeft":case"ArrowUp":h.preventDefault(),p(o-1);break;case"Home":h.preventDefault(),p(0);break;case"End":h.preventDefault(),p(Q.length-1);break;case"Enter":case" ":h.preventDefault(),x();break;case"Escape":h.preventDefault(),v();break;case"Tab":{const f=e.querySelectorAll(".wpm__tile, .wpm__nav");if(!f.length)break;const _=f[0],A=f[f.length-1];h.shiftKey&&document.activeElement===_?(h.preventDefault(),A.focus()):!h.shiftKey&&document.activeElement===A&&(h.preventDefault(),_.focus());break}}}),window.addEventListener("resize",()=>{k()&&l()}),{el:e,open:y,close:x,isOpen:k}}function ks(){const e=W`<div class="notifs" role="region" aria-label="Notifications"></div>`;function t({title:a,body:n,actions:r=[],timeout:o=6e3}){const s=W`
      <article class="notif">
        <span class="notif__glyph">${E("info")}</span>
        <div class="notif__content">
          <p class="notif__title">${b(a)}</p>
          <p class="notif__body">${b(n)}</p>
          <div class="notif__actions">
            ${r.map((d,l)=>`<button class="btn btn--tonal" data-action="${l}">${b(d.label)}</button>`).join("")}
          </div>
        </div>
        <button class="notif__dismiss" data-dismiss aria-label="Dismiss">${E("close")}</button>
      </article>
    `,i=()=>{if(s.dataset.dismissing)return;s.dataset.dismissing="true";const d=getComputedStyle(document.documentElement),u=window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:parseFloat(d.getPropertyValue("--cae-duration-fast-effects"))||150,p=d.getPropertyValue("--cae-ease-standard-accel").trim()||"ease",y=()=>s.remove();s.animate([{transform:s.style.transform||"translateX(0)",opacity:1},{transform:"translateX(120%)",opacity:0}],{duration:u,easing:p,fill:"forwards"}).finished.catch(()=>{}).then(y),setTimeout(y,u+80)};s.querySelector("[data-dismiss]").addEventListener("click",i),s.addEventListener("click",d=>{const l=d.target.closest("[data-action]")?.dataset.action;l!==void 0&&(r[Number(l)].run?.(),i())});let c=null;return s.addEventListener("pointerdown",d=>{d.target.closest("button")||(c=d.clientX,s.setPointerCapture(d.pointerId))}),s.addEventListener("pointermove",d=>{if(c===null)return;const l=Math.max(0,d.clientX-c);s.style.transform=`translateX(${l}px)`,s.style.opacity=String(Math.max(0,1-l/260))}),s.addEventListener("pointerup",d=>{if(c===null)return;const l=d.clientX-c;c=null,s.style.transform="",s.style.opacity="",l>120&&i()}),e.append(s),o&&setTimeout(i,o),s}return{el:e,push:t}}function xs(){const e=W`
    <div class="osd" aria-label="Display controls">
      <div class="osd__slider" data-kind="brightness" role="slider" tabindex="0"
        aria-label="Wallpaper brightness" aria-valuemin="20" aria-valuemax="120" aria-valuenow="100"
        style="--value:80">
        <span class="osd__fill"></span>
        <span class="osd__glyph">${E("brightness_6")}</span>
      </div>
      <div class="osd__slider" data-kind="bezel" role="slider" tabindex="0"
        aria-label="Bezel blur" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60"
        style="--value:60">
        <span class="osd__fill"></span>
        <span class="osd__glyph">${E("blur_on")}</span>
      </div>
    </div>
  `,t={brightness:80,bezel:60};function a(){const r=.6+t.brightness/100*.6;for(const o of document.querySelectorAll(".wallpaper"))o.style.filter=`brightness(${r})`;document.documentElement.style.setProperty("--cae-bezel-blur",`${Math.round(20+t.bezel/100*84)}px`)}function n(r,o){const s=r.dataset.kind;t[s]=Math.min(100,Math.max(0,o)),r.style.setProperty("--value",String(t[s])),r.setAttribute("aria-valuenow",String(Math.round(t[s]))),a()}for(const r of e.querySelectorAll(".osd__slider")){const o=i=>{const c=r.getBoundingClientRect();return(c.bottom-i.clientY)/c.height*100};let s=!1;r.addEventListener("pointerdown",i=>{s=!0,r.setPointerCapture(i.pointerId),n(r,o(i))}),r.addEventListener("pointermove",i=>{s&&n(r,o(i))}),r.addEventListener("pointerup",()=>{s=!1}),r.addEventListener("keydown",i=>{const c=i.key==="ArrowUp"?5:i.key==="ArrowDown"?-5:0;c&&(i.preventDefault(),n(r,t[r.dataset.kind]+c))})}return a(),{el:e}}const Fa=[0,3,5,7,10,12,15,19],Ra=174.61;function Ms({src:e}={}){let t=null,a=null,n=null,r=null,o=null,s=null,i=!1,c=null;const d=new Set,l=new Set,u=()=>d.forEach(P=>P(i)),p=240;function y(){return r?{time:r.currentTime,duration:r.duration||0}:t?{time:t.currentTime%p,duration:p}:{time:0,duration:p}}const x=()=>{const P=y();l.forEach(q=>q(P))};function v(){c&&cancelAnimationFrame(c),c=null}function k(){v();const P=()=>{x(),c=i?requestAnimationFrame(P):null};c=requestAnimationFrame(P)}function w(){return r||!e||(r=new Audio(e),r.loop=!0,r.preload="metadata",r.crossOrigin="anonymous",r.addEventListener("loadedmetadata",x)),r}function g(){if(t)return;if(t=new(window.AudioContext||window.webkitAudioContext),a=t.createAnalyser(),a.fftSize=256,a.smoothingTimeConstant=.8,n=t.createGain(),n.gain.value=0,n.connect(a),a.connect(t.destination),e){t.createMediaElementSource(w()).connect(n);return}const P=t.createGain();P.gain.value=.09;const q=t.createBiquadFilter();q.type="lowpass",q.frequency.value=520,q.Q.value=.6,P.connect(q).connect(n);for(const C of[-6,6]){const z=t.createOscillator();z.type="sawtooth",z.frequency.value=Ra/2,z.detune.value=C,z.connect(P),z.start()}const j=t.createOscillator(),L=t.createGain();j.frequency.value=.05,L.gain.value=180,j.connect(L).connect(q.frequency),j.start()}function h(){if(!t||e)return;const P=Fa[Math.floor(Math.random()*Fa.length)],q=Ra*2**(P/12),j=t.currentTime,L=t.createOscillator();L.type="triangle",L.frequency.value=q;const C=t.createGain();C.gain.setValueAtTime(1e-4,j),C.gain.exponentialRampToValueAtTime(.16,j+.9),C.gain.exponentialRampToValueAtTime(1e-4,j+5.5);const z=t.createStereoPanner();z.pan.value=Math.random()*1.4-.7,L.connect(C).connect(z).connect(n),L.start(j),L.stop(j+6)}function f(){clearTimeout(o),!(!i||e)&&(h(),o=setTimeout(f,1800+Math.random()*2600))}async function _(){clearTimeout(s),s=null,g(),await t.resume(),i=!0;const P=t.currentTime;n.gain.cancelScheduledValues(P),n.gain.setValueAtTime(Math.max(n.gain.value,1e-4),P),n.gain.linearRampToValueAtTime(.9,P+1.2),r&&await r.play().catch(()=>{}),f(),u(),k()}function A(){if(!t)return;i=!1,clearTimeout(o);const P=t.currentTime;n.gain.cancelScheduledValues(P),n.gain.setValueAtTime(n.gain.value,P),n.gain.linearRampToValueAtTime(1e-4,P+.4),r&&(s=setTimeout(()=>r.pause(),400)),u(),x(),v()}function M(){A(),r&&(r.currentTime=0),x()}function $(P){if(!r)return;const q=r.duration||0;r.currentTime=Math.min(Math.max(P,0),q?q-.25:0),x()}return{play:_,pause:A,reset:M,seek:$,nudge:P=>$((r?.currentTime??0)+P),toggle:()=>i?A():_(),position:y,prime(){w(),x()},get playing(){return i},get analyser(){return a},onChange(P){return d.add(P),()=>d.delete(P)},onTime(P){return l.add(P),P(y()),()=>l.delete(P)}}}const We=document.querySelector("#shell"),As=We.querySelector(".wallpaper"),$s=e=>"requestIdleCallback"in window?requestIdleCallback(e,{timeout:1500}):setTimeout(e,120),Ps=W`<div class="frame" aria-hidden="true"></div>`,Gt=W`
  <main class="screen" id="desktop">
    <div class="wallpaper" aria-hidden="true"></div>
    <div class="windows" id="windows"></div>
  </main>
`,Ve=W`<div class="stage"></div>`,wt=W`
  <button class="notch-zone" id="notch" aria-label="Show dashboard" aria-expanded="false"></button>
`;We.append(Ps,Gt,Ve,wt);zr(Q,[As,Gt.querySelector(".wallpaper")]);Or();const Ss=Gt.querySelector("#windows"),be=new Vr(Ss,{onChange:()=>ln(),iconFor:e=>Ds(e)}),Ge=ks();document.body.append(Ge.el);const Cs=xs();Gt.append(Cs.el);const oe=Ms({src:At.src});let Ee=!1,ie=()=>{};function Is(){const e=W`
    <div class="desk-meter" aria-hidden="true">
      <canvas class="desk-meter__canvas"></canvas>
    </div>
  `;Gt.append(e);const t=Ya({canvas:e.querySelector(".desk-meter__canvas"),analyser:()=>oe.analyser,variant:"bar",bars:120,colour:"surface-container"});ie=()=>{const a=Ee&&oe.playing;e.dataset.on=String(Ee),a?t.start():t.stop()},oe.onChange(ie),ie()}let lt=null,Wt,Ze=!1,De=!1;function nn(){clearTimeout(Wt),Wt=setTimeout(()=>{Ze||De||pt(!1)},160)}function rn(){return lt||(lt=bs({player:oe,onDesktopMeter:e=>{Ee=e,ie()}}),Ve.append(lt.el),lt.el.addEventListener("pointerenter",()=>{De=!0,clearTimeout(Wt),pt(!0)}),lt.el.addEventListener("pointerleave",()=>{De=!1,nn()}),lt.el.offsetHeight,lt)}function pt(e){clearTimeout(Wt);const t=rn();t.el.dataset.open=String(e),wt.setAttribute("aria-expanded",String(e)),e&&t.enter()}const Ue=()=>lt?.el.dataset.open==="true";wt.addEventListener("pointerenter",()=>{Ze=!0,clearTimeout(Wt),pt(!0)});wt.addEventListener("pointerleave",()=>{Ze=!1,nn()});const Ts=window.matchMedia("(hover: hover)");wt.addEventListener("click",()=>{Ts.matches||pt(!Ue())});wt.addEventListener("focus",()=>pt(!0));document.addEventListener("focusin",e=>{if(!Ue())return;e.target===wt||lt?.el.contains(e.target)||pt(!1)});document.addEventListener("pointerdown",e=>{Ue()&&!e.target.closest(".stage")&&e.target!==wt&&pt(!1)});const Ls=[{name:"wallpaper",desc:"Change the wallpaper — the palette is quantized out of the image",icon:"photo_library",run:()=>we.open()},{name:"theme",desc:"Toggle light and dark",icon:"dark_mode",run:()=>sn()},{name:"close all",desc:"Close every open window",icon:"close_fullscreen",run:()=>be.closeAll()},{name:"dashboard",desc:"Open the dashboard",icon:"dashboard",run:()=>{pt(!0),setTimeout(()=>pt(!1),4e3)}},{name:"notify",desc:"Send a test notification",icon:"notifications",run:()=>on()},{name:"reload",desc:"Restart the shell",icon:"restart_alt",run:()=>location.reload()}],le=ws({apps:ze,wm:be,commands:Ls});Ve.append(le.el);const we=vs();document.body.append(we.el);function sn(){const e=qr(),t=Zt?.el.querySelector('[data-act="theme"] .material-symbols-rounded');t&&(t.textContent=e?"light_mode":"dark_mode")}async function Es(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{}}document.addEventListener("fullscreenchange",()=>{const e=Zt?.el.querySelector('[data-act="fullscreen"] .material-symbols-rounded');e&&(e.textContent=document.fullscreenElement?"fullscreen_exit":"fullscreen")});const Ds=e=>Zt?.el.querySelector(`[data-app="${e}"]`)??null;function on(){Ge.push({title:"Shell",body:`${K.name} · ${K.role}. Press Ctrl+K to search; windows tile themselves.`,actions:[{label:"Open About",run:()=>be.open(ze[0])}]})}const Zt=Ur({apps:ze,wm:be,onLauncher:()=>le.isOpen()?le.close():le.open(),onGallery:()=>we.open(),onTheme:sn,onNotify:on,onFullscreen:Es});We.append(Zt.el);function ln(){Zt.sync()}ln();document.addEventListener("keydown",e=>{if(e.target.matches("input, textarea")||we.isOpen()||e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;const a=(Q.findIndex(n=>n.id===N.wallpaper)+(e.key==="ArrowRight"?1:-1)+Q.length)%Q.length;Te(Q[a])});document.addEventListener("submit",e=>{const t=e.target.closest("[data-contact-form]");t&&(e.preventDefault(),t.reportValidity()&&(t.reset(),Ge.push({title:"Message sent",body:"Thanks — I will reply within a day."})))});$s(()=>{Is(),rn()});
