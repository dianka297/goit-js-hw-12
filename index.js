import{a as v,S as b,i as m}from"./assets/vendor-Qob_5Ba8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const w="https://pixabay.com/api/";let h=15;const g=async(s,e)=>(await v.get(`${w}`,{params:{key:"43952062-1ac9439355a7535a7f5f048fb",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:h}})).data,p=s=>s.map(e=>`<li class="gallery-card">
    <a class="gallery-link" href="${e.largeImageURL}">
      <img
        class="gallery-photo"
        src="${e.webformatURL}"
        data-source="${e.largeImageURL}"
        alt="${e.tags}"
      />
    </a>
    <div class="under-img-info">
      <ul class="list-info">
        <li class="item-info">
          <h3 class="title-info">Likes</h3>
          <p class="text-info">${e.likes}</p>
        </li>
        <li class="item-info">
          <h3 class="title-info">Views</h3>
          <p class="text-info">${e.views}</p>
        </li>
        <li class="item-info">
          <h3 class="title-info">Comments</h3>
          <p class="text-info">${e.comments}</p>
        </li>
        <li class="item-info">
          <h3 class="title-info">Downloads</h3>
          <p class="text-info">${e.downloads}</p>
        </li>
      </ul>
    </div>
  </li>`).join(""),a=document.querySelector(".gallery-list"),S=document.querySelector(".form"),l=document.querySelector(".loader"),o=document.querySelector(".load-more-btn");let n=1,c="",u=0,y=new b(".gallery-list a",{captionsData:"alt",captionDelay:250});async function H(s){if(s.preventDefault(),n=1,c=s.target.elements.query.value.trim(),c===""){a.innerHTML="",s.target.reset();return}a.innerHTML="",l.classList.remove("is-hidden");try{const e=await g(c);if(e.total===0){s.target.reset(),m.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3,pauseOnHover:!0,color:"red"}),l.classList.add("is-hidden"),o.classList.add("is-hidden");return}a.innerHTML=p(e.hits),y.refresh(),u=Math.ceil(e.totalHits/h),console.log(u),n+=1}catch(e){console.log(e)}a.innerHTML!==""&&o.classList.remove("is-hidden"),s.target.reset(),l.classList.add("is-hidden")}const M=()=>{const i=document.querySelector(".gallery-card").getBoundingClientRect().height*2;console.log(i),window.scrollBy({top:i,left:0,behavior:"smooth"})};async function L(s){s.preventDefault(),o.classList.add("is-hidden"),l.classList.remove("is-hidden");try{const e=await g(c,n);a.insertAdjacentHTML("beforeend",p(e.hits)),y.refresh(),n+=1,o.classList.remove("is-hidden"),l.classList.add("is-hidden"),M(),n>u&&(o.classList.add("is-hidden"),o.removeEventListener("click",L),m.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3,pauseOnHover:!0,color:"red"}))}catch(e){console.log(e)}}S.addEventListener("submit",H);o.addEventListener("click",L);
//# sourceMappingURL=index.js.map
