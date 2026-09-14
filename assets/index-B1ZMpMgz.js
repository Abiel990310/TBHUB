(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const c=[{repo:"CppTB",title:"C++",subject:"A full C++ course, from first program to algorithms.",audience:"Anyone learning C++ properly, and competitive programmers.",deployed:!0},{repo:"JavaTB",title:"Java",subject:"Java and the JVM — objects, generics, streams, concurrency.",audience:"Anyone learning Java beyond syntax.",deployed:!0},{repo:"CsaTB",title:"AP Computer Science A",subject:"The exam, not the language: the tested subset, and nothing the paper does not ask for.",audience:"Students sitting AP CSA.",deployed:!0,ap:!0,note:"All four units covered. Data Collections is the deepest; units 1 and 2 want more."},{repo:"CalTB",title:"AP Calculus AB/BC",subject:"One book for both courses, where every worked result is checked by a program.",audience:"Students sitting AP Calculus AB or BC.",deployed:!0,ap:!0,note:"All ten units covered. Answers are graded on what they mean, not how they are spelled."},{repo:"PhysTB",title:"AP Physics C",subject:"Mechanics and E&M, with every result checked against a simulation.",audience:"Students sitting either Physics C exam.",deployed:!0,ap:!0,note:"All thirteen units covered, with simulations you can drag to watch a formula hold or fail."}];async function p(e){try{const r=await fetch(`https://abiel990310.github.io/${e}/data/book.json`,{cache:"no-cache"});if(!r.ok)return null;const a=await r.json();return Array.isArray(a.nav)?{chapters:a.nav.length,problems:Array.isArray(a.problems)?a.problems.length:0}:null}catch{return null}}const l="tb-theme";function d(e){document.documentElement.dataset.theme=e;try{localStorage.setItem(l,e)}catch{}}function h(){try{const e=localStorage.getItem(l);if(e==="light"||e==="dark")return e}catch{}return matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function m(e){const r=`https://abiel990310.github.io/${e.repo}/`;return`
    <article class="card" data-repo="${e.repo}">
      <div class="card__head">
        <h2 class="card__title">${e.title}</h2>
        ${e.ap?'<span class="tag">AP</span>':""}
      </div>
      <p class="card__subject">${e.subject}</p>
      <p class="card__audience">${e.audience}</p>
      <p class="card__stats" data-stats>Reading its numbers…</p>
      ${e.note?`<p class="card__note">${e.note}</p>`:""}
      <div class="card__links">
        ${e.deployed?`<a class="btn" href="${r}">Open</a>`:'<span class="btn btn--off" aria-disabled="true">Not deployed yet</span>'}
        <a class="link" href="https://github.com/Abiel990310/${e.repo}">Source</a>
      </div>
    </article>`}function i(e,r,a){if(!a){e.textContent=r.deployed?"Numbers unavailable — could not read its data.":"No site yet, so nothing to count.",e.classList.add("card__stats--none");return}const o=`${a.chapters} chapter${a.chapters===1?"":"s"}`,t=`${a.problems} problem${a.problems===1?"":"s"}`;e.innerHTML=`<strong>${o}</strong> · <strong>${t}</strong>`,e.classList.remove("card__stats--none")}const u=document.getElementById("app");u.innerHTML=`
  <header class="top">
    <div class="top__bar">
      <span class="wordmark">Textbooks</span>
      <button id="theme" class="theme" aria-label="Switch between light and dark">◐</button>
    </div>
    <h1 class="lede">Books where every claim is checked by a program that runs.</h1>
    <p class="sub">
      Every code sample is compiled by a real compiler, every practice problem is
      graded by running it, and every mathematical result is verified
      symbolically. If something cannot be demonstrated, it does not get written.
    </p>
  </header>

  <main class="grid">${c.map(m).join("")}</main>

  <footer class="foot">
    <p>
      The AP books are <strong>not official College Board products</strong>. AP® is a
      trademark of the College Board, which does not endorse and is not involved
      with them. Every practice question is original.
    </p>
    <p>The counts above are read from each book's own published data, not maintained here.</p>
  </footer>`;d(h());document.getElementById("theme").addEventListener("click",()=>{d(document.documentElement.dataset.theme==="dark"?"light":"dark")});for(const e of c){const r=u.querySelector(`[data-repo="${e.repo}"] [data-stats]`);if(r){if(!e.deployed){i(r,e,null);continue}p(e.repo).then(a=>i(r,e,a))}}
