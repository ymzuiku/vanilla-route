import c from"querystring-number";var g=navigator.userAgent.toLocaleLowerCase(),_=/(?:iphone)/.test(g),A=/micromessenger/.test(g),u={},m=[];["popstate","pushState","replaceState","backState"].forEach(t=>{window.addEventListener(t,()=>{n.state=c.parse(location.search),(t==="popstate"||t==="backState")&&delete u[S],m.forEach(e=>e()),t==="popstate"&&s.pop()})});function b(t){let e=document.createElement("span");return e.style.display="none",e.setAttribute("vanilla-route",t),e.setAttribute("vanilla-route-empty",t),e}function E(t){return typeof t=="function"?t():c.decode(window.location.pathname)===t}var v=0,S="",s=[],f={},n=({url:t,render:e,preload:l,keep:k})=>{if(typeof e!="function")throw"AoifeRoute.render need a Function";!l&&typeof t=="string"&&(f[t]=e),v+=1;let i=""+v,y=()=>{if(l){let o=typeof l=="number"?l:50;setTimeout(()=>{e()},o)}let r=u[t];if(typeof t=="string"&&r){let o=document.querySelector(`[vanilla-route="${r}"]`);return o.__display||(o.__display=window.getComputedStyle?window.getComputedStyle(o).display:"block"),E(t)?o.style.display=o.__display:o.style.display="none",o}if(!E(t))return b(i);let a=k&&typeof t=="string",p=e();if(p.then){let o=b(i);return Promise.resolve(p).then(d=>{if(d.default){let h=document.querySelector(`[vanilla-route="${i}"]`);if(!h)return;let w=d.default();w.setAttribute("vanilla-route",i),a&&(u[t]=i),h.replaceWith(w)}}),o}return p.setAttribute("vanilla-route",i),a&&(u[t]=i),p};return m.push(()=>{let r=document.querySelector(`[vanilla-route="${i}"]`);if(!r)return;let a=y();a.getAttribute("vanilla-route-empty")&&r.getAttribute("vanilla-route-empty")||a!==r&&r.replaceWith(a)}),y()};n.onlyReplace=A&&_;n.preload=t=>{let e=f[t];typeof e=="function"&&(e(),f[t]=!0)};n.state={};n.queryString=c;n.push=(t,e)=>{if(n.onlyReplace){n.replace(t,e);return}s.push({state:e,url:t}),e&&(t+="?"+c.stringify(e)),window.scrollTo&&window.scrollTo({top:0}),setTimeout(()=>{history.pushState(e,"",t),window.dispatchEvent(new Event("pushState"))})};n.replace=(t,e)=>{s.push({state:e,url:t}),e&&(t+="?"+c.stringify(e)),window.scrollTo&&window.scrollTo({top:0}),setTimeout(()=>{history.replaceState(e,"",t),window.dispatchEvent(new Event("replaceState"))})};var R=()=>{if(S=location.pathname,s.length===0){history.replaceState({},"","/"),window.dispatchEvent(new Event("backState"));return}if(n.onlyReplace){if(s.pop(),s.length===0)history.replaceState({},"","/");else{let{state:t,url:e}=s[s.length-1];history.replaceState(t,"",e)}window.dispatchEvent(new Event("backState"));return}history.back()},T=(t=1,e)=>{if(t<=0){e&&setTimeout(()=>{e()});return}t-=1,R(),setTimeout(()=>{T(t,e)})};n.back=(t=1)=>new Promise(e=>{T(t,e)});n.rootURL="/";export{n as Route};
