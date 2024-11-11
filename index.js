import{a as w,S as L,i as r}from"./assets/vendor-C4-ZuMk8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const P="46861440-5100b639d37c0efc8464b7fe2",m=document.querySelector(".loader"),S="https://pixabay.com/api/",C=15;async function y(o,e=1){m.style.display="block";const{data:i}=await w(`${S}`,{params:{key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:C}}).finally(()=>{m.style.display="none"});return i}const O=new L(".gallery a",{captionData:"alt"});function h(o){const e=o.map(({webformatURL:i,largeImageURL:c,tags:t,likes:s,views:n,comments:p,downloads:b})=>`
      <li class='gallery-item' >
        <a href='${c}' class="gallery-image">
          <img src='${i}' alt='${t} '>
        </a>
        <ul class="info-list">
          <li class="info-list-item">
            <h2 class="info-heading">Likes</h2>
            <p class="info-text">${s}</p>
          </li>
          <li class="info-list-item">
            <h2 class="info-heading">Views</h2>
            <p class="info-text">${n}</p>
          </li>
          <li class="info-list-item">
            <h2 class="info-heading">Comments</h2>
            <p class="info-text">${p}</p>
          </li>
          <li class="info-list-item">
            <h2 class="info-heading">Downloads</h2>
            <p class="info-text">${b}</p>
          </li>
        </ul>
      </li>
      `).join("");f.insertAdjacentHTML("beforeend",e),O.refresh()}let l=1;const u=15;let d="";const g=document.querySelector(".search-form"),f=document.querySelector(".gallery"),a=document.querySelector(".js-load-more");g.addEventListener("submit",$);a.addEventListener("click",v);async function $(o){if(o.preventDefault(),f.innerHTML="",d=o.currentTarget.elements.tag.value,d.trim()===""){r.warning({title:"Missing tags",message:"Please enter a search tag!",closeOnClick:!0});return}l=1,a.classList.replace("load-more-hidden","load-more"),loader.style.display="block";try{const e=await y(d,l,u);console.log(e),e.hits.length===0?r.error({title:"No pictures found",message:"Sorry, there are no images matching your search query. Please try again.",timeout:2500,closeOnClick:!0}):(h(e.hits),e.totalHits>u*l?a.style.display="block":(a.style.display="none",r.show({class:"toast",position:"topRight",messageColor:"white",message:"We're sorry, but you've reached the end of search results."})))}catch(e){console.log(e),r.error({title:"Error",message:"Failed to fetch images. Please try again later.",timeout:2500,closeOnClick:!0})}finally{loader.style.display="none"}g.reset()}async function v(){loader.style.display="block",l+=1;try{const o=await y(d,l,u);h(o.hits),console.log(f.lastElementChild);const e=f.lastElementChild.getBoundingClientRect();window.scrollBy({top:e.top+e.height*1.5,behavior:"smooth"}),o.totalHits>u*l?a.style.display="block":(a.style.display="none",r.show({class:"toast",position:"topRight",messageColor:"white",message:"We're sorry, but you've reached the end of search results."}))}catch(o){console.log(o),r.error({title:"Error",message:"Failed to fetch images. Please try again later.",timeout:2500,closeOnClick:!0})}finally{loader.style.display="none"}}
//# sourceMappingURL=index.js.map
