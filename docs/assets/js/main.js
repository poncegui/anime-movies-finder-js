"use strict";const input=document.querySelector(".js_inputUser"),btnSearch=document.querySelector(".js_btnSearch"),imageError="https://via.placeholder.com/100x75?text=Ups!+we+are+not+perfect",messageError=document.querySelector(".js_messageError"),listContainer=document.querySelector(".js_results"),listFavDom=document.querySelector(".js_favorites");let tvSerieslist=[],fav=[];function handleSearch(e){e.preventDefault();const t=input.value;listContainer.innerHTML="",fetch("https://api.jikan.moe/v3/search/anime?q="+t).then(e=>e.json()).then(e=>{tvSerieslist=e.results,null==tvSerieslist?(renderError(),input.value=""):renderAnimeTvShows()})}function renderError(){messageError.innerHTML="Sorry! not found. Let's try another movie"}function renderAnimeTvShows(){listContainer.innerHTML="",tvSerieslist.forEach(e=>{const t=e.image_url.replace(imageError);listContainer.innerHTML+=`<li class="js_results js-eachCard" data-id="${e.mal_id}"> <img class="movie_img" src= ${t}" alt="anime show"  <h3 class="movie_title">${e.title}</h3> </li>`}),listenEachCard()}const btnReset=document.querySelector(".js_btnReset");btnReset.addEventListener("click",e=>{e.preventDefault,listContainer.innerHTML="",input.value="",messageError.innerHTML=""});const listenEachCard=()=>{const e=document.querySelectorAll(".js-eachCard");for(const t of e)t.addEventListener("click",handleAddCardFav)},handleAddCardFav=e=>{const t=parseInt(e.currentTarget.dataset.id),a=e.target.parentElement;a.classList.toggle("js_colors"),a.classList.remove("js_results");const r=tvSerieslist.find(e=>e.mal_id===t);void 0===fav.find(e=>e.mal_id===t)&&(fav.push(r),renderFav(),setLocalStorageFav())},renderFav=()=>{listFavDom.innerHTML="",Object.values(fav).forEach(e=>{const t=document.createElement("li");t.classList.add("js_favorites__title");const a=document.createElement("img"),r=document.createElement("btn");r.classList.add("js_favorites__childs"),t.textContent=e.title,a.src=e.image_url,a.alt=e.title,r.textContent="x",r.dataset.id=e.mal_id,listFavDom.appendChild(t),listFavDom.appendChild(a),listFavDom.appendChild(r)});document.querySelector(".js_resetFav").addEventListener("click",e=>{e.preventDefault,listFavDom.innerHTML="",fav.splice(0,fav.length),setLocalStorageFav()}),listenRemoveFav()},listenRemoveFav=()=>{if(fav.length>0){const e=document.querySelectorAll(".js_favorites__childs");for(const t of e)t.addEventListener("click",handleRemoveFavCard)}},handleRemoveFavCard=e=>{const t=parseInt(e.currentTarget.dataset.id),a=fav.findIndex(e=>e.mal_id===t);fav.splice(a,1),renderFav(fav),setLocalStorageFav()},setLocalStorageFav=()=>{const e=JSON.stringify(fav);localStorage.setItem("fav",e)},getLocalstorageFav=()=>{const e=localStorage.getItem("fav");null!==e&&(fav=JSON.parse(e)),renderFav()};getLocalstorageFav(),btnSearch.addEventListener("click",handleSearch);