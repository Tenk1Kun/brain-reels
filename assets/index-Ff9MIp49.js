(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`characters`,name:`Characters`},{id:`dots`,name:`Dots`},{id:`bamboo`,name:`Bamboo`},{id:`plum`,name:`Plum`},{id:`chrysanthemum`,name:`Chrysanthemum`}],t=[{id:`system`,name:`Auto`},{id:`light`,name:`Light`},{id:`dark`,name:`Dark`}],n={mode:`system`,theme:`characters`},r=`brain-reels-appearance`;function i(r){let i;try{i=JSON.parse(r??`null`)}catch{return n}if(typeof i!=`object`||!i)return n;let{mode:a,theme:o}=i;return{mode:t.find(e=>e.id===a)?.id??n.mode,theme:e.find(e=>e.id===o)?.id??n.theme}}function a(e,t){return e===`system`?t?`dark`:`light`:e}function o(){try{return i(localStorage.getItem(r))}catch{return n}}function s(e){try{localStorage.setItem(r,JSON.stringify(e))}catch{}}var c=n,l=null;function u(){document.documentElement.dataset.mode=a(c.mode,l?.matches??!0),document.documentElement.dataset.theme=c.theme}function d(){c=o(),l=window.matchMedia(`(prefers-color-scheme: dark)`),l.addEventListener(`change`,u),u()}function f(n){n.innerHTML=`
    <details class="appearance">
      <summary>Appearance</summary>
      <fieldset class="appearance-group">
        <legend>Mode</legend>
        <div class="segmented" id="mode-options"></div>
      </fieldset>
      <fieldset class="appearance-group">
        <legend>Colour</legend>
        <div class="swatches" id="theme-options"></div>
      </fieldset>
    </details>
  `;let r=n.querySelector(`#mode-options`),i=n.querySelector(`#theme-options`),a=[];function o(e){c=e,s(c),u(),a.forEach(e=>e())}function l(e,t,n,r){let i=document.createElement(`button`);return i.type=`button`,i.className=`option`,i.textContent=t,i.addEventListener(`click`,r),a.push(()=>i.setAttribute(`aria-pressed`,String(n()))),e.append(i),i}for(let e of t)l(r,e.name,()=>c.mode===e.id,()=>o({...c,mode:e.id}));for(let t of e){let e=l(i,t.name,()=>c.theme===t.id,()=>o({...c,theme:t.id}));e.classList.add(`swatch`),e.dataset.theme=t.id}a.forEach(e=>e())}var p=.5;function m(e){let t=e*p,n=Math.max(1,Math.round(t/15)),r=Math.floor(n/3),i=n-r*2,a=Math.floor(i/2);return{written:r,multipleChoice:i-a,trueFalse:a}}function h(e){return e.written+e.multipleChoice+e.trueFalse}function g(e,t){return t===null||e.correct===e.total||e.correct*t.total>=t.correct*e.total}function _(e,t=Math.random){let n=[...e];for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function v(e,t){return Array(t).fill(e)}function y(e,t,n=Math.random){let r=_([...v(`written`,t.written),...v(`choice`,t.multipleChoice),...v(`trueFalse`,t.trueFalse)],n),i=[];for(;e.length>0&&i.length<r.length;)i.push(..._(e,n));return r.map((t,r)=>{let a=i[r];switch(t){case`written`:return{kind:t,prompt:a.definition,answer:a.term};case`choice`:return b(a,e,n);case`trueFalse`:return x(a,e,n)}})}function b(e,t,n){let r=_([...new Set(t.map(e=>e.term))].filter(t=>t!==e.term),n).slice(0,3);return{kind:`choice`,prompt:e.definition,choices:_([e.term,...r],n),answer:e.term}}function x(e,t,n){let r=t.filter(t=>t.term!==e.term&&t.definition!==e.definition).map(e=>e.definition);if(r.length===0||n()<.5)return{kind:`trueFalse`,term:e.term,definition:e.definition,isTrue:!0};let i=r[Math.floor(n()*r.length)];return{kind:`trueFalse`,term:e.term,definition:i,isTrue:!1}}function ee(e,t){let n=e=>e.trim().toLowerCase().replace(/\s+/g,` `);return n(e)===n(t)}function S(e,t){switch(t.status){case`playable`:return null;case`unplayable`:return`${e.label}: this video can't be played here (it may be private, removed, or blocked from other sites)`;case`unknown`:return`${e.label}: couldn't check this video's length; check your connection and try again`}}function C(e){let t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`}var w=`https://www.youtube.com/iframe_api`,T=8e3,E=200,D=null;function te(){return D??=new Promise((e,t)=>{let n=document.createElement(`script`),r=()=>{D=null,n.remove(),t(Error(`Could not load the YouTube player`))},i=window.setTimeout(r,T);window.onYouTubeIframeAPIReady=()=>{window.clearTimeout(i),e(window.YT)},n.src=w,n.onerror=r,document.head.append(n)}),D}async function O(e,t){let n=document.createElement(`div`);n.className=`hidden-player`;let r=document.createElement(`div`);n.append(r),document.body.append(n);let i,a,o;try{return await new Promise(n=>{a=window.setTimeout(()=>n({status:`unknown`}),T),o=new e.Player(r,{videoId:t,host:`https://www.youtube-nocookie.com`,events:{onReady:()=>{i=window.setInterval(()=>{let e=o.getDuration();e>0&&n({status:`playable`,seconds:e})},E)},onError:()=>n({status:`unplayable`})}})})}finally{window.clearInterval(i),window.clearTimeout(a),o?.destroy(),n.remove()}}async function ne(e){let t;try{let n=await te();t=await Promise.all(e.map(e=>O(n,e.id)))}catch{t=e.map(()=>({status:`unknown`}))}let n=[],r=[];return e.forEach((e,i)=>{let a=t[i],o=S(e,a);o===null?a.status===`playable`&&n.push({id:e.id,seconds:a.seconds}):r.push(o)}),{reels:n,problems:r}}var k=`https://www.youtube-nocookie.com`,re=50,A=700,j=2e3;function ie(e,t,n){let r=0,i=null,a=!1;e.innerHTML=`
    <main class="feed">
      <div class="reel">
        <iframe id="reel-player" title="Reel" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <div class="swipe-zone" id="swipe-zone">
        <span id="reel-info" class="reel-info"></span>
        <button id="next-button" type="button">⬆ Next reel</button>
      </div>
      <section id="gate" class="gate" hidden><div id="gate-card" class="gate-card"></div></section>
    </main>
  `;let o=e.querySelector(`#reel-player`),s=e.querySelector(`#reel-info`),c=e.querySelector(`#swipe-zone`),l=e.querySelector(`#next-button`),u=e.querySelector(`#gate`),d=e.querySelector(`#gate-card`);function f(){return m(n[r].seconds)}function p(){let e=n[r];o.src=`${k}/embed/${e.id}?autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1`;let t=h(f());s.textContent=`Reel ${r+1} of ${n.length} · ${C(e.seconds)} · ${t} ${t===1?`question`:`questions`} to move on`}function _(){let e=JSON.stringify({event:`command`,func:`pauseVideo`,args:[]});o.contentWindow?.postMessage(e,k)}function v(){a||(a=!0,u.hidden=!1,_(),b(y(t,f())))}function b(e){let t=0,n=0;function r(){let n=e[t];d.innerHTML=`
        <div class="gate-progress" aria-hidden="true"><div class="gate-progress-bar"></div></div>
        <p class="gate-label">Brain check · ${t+1} of ${e.length}</p>
        <h2></h2>
        <p class="gate-prompt"></p>
        <div class="answer-area"></div>
      `,d.querySelector(`.gate-progress-bar`).style.setProperty(`--progress`,`${t/e.length*100}%`);let r=d.querySelector(`h2`),o=d.querySelector(`.gate-prompt`),s=d.querySelector(`.answer-area`);switch(n.kind){case`written`:r.textContent=`Type the term that means:`,o.textContent=n.prompt,a(s,n.answer);break;case`choice`:r.textContent=`Which term means:`,o.textContent=n.prompt,i(s,n.choices,n.answer);break;case`trueFalse`:r.textContent=`True or false?`,o.textContent=`“${n.term}” means: ${n.definition}`,i(s,[`True`,`False`],n.isTrue?`True`:`False`)}}function i(e,t,n){for(let r of t){let t=document.createElement(`button`);t.type=`button`,t.className=`choice`,t.textContent=r,t.addEventListener(`click`,()=>{e.querySelectorAll(`.choice`).forEach(e=>{e.disabled=!0,e.textContent===n&&e.classList.add(`correct`)}),r!==n&&t.classList.add(`wrong`),o(r===n,A)}),e.append(t)}}function a(e,t){e.innerHTML=`
        <form class="written-form">
          <label class="visually-hidden" for="written-answer">Your answer</label>
          <input id="written-answer" type="text" placeholder="Type your answer"
            autocomplete="off" autocapitalize="none" spellcheck="false" />
          <button type="submit" disabled>Check</button>
          <p class="written-feedback" role="status"></p>
        </form>
      `;let n=e.querySelector(`.written-form`),r=e.querySelector(`#written-answer`),i=e.querySelector(`button`),a=e.querySelector(`.written-feedback`);r.addEventListener(`input`,()=>{i.disabled=r.value.trim()===``}),n.addEventListener(`submit`,e=>{if(e.preventDefault(),r.value.trim()===``)return;let n=ee(r.value,t);r.disabled=!0,i.disabled=!0,r.classList.add(n?`correct`:`wrong`),a.textContent=n?`Correct!`:`The answer was: ${t}`,o(n,n?A:j)}),r.focus()}function o(i,a){i&&n++,setTimeout(()=>{t++,t<e.length?r():x({correct:n,total:e.length})},a)}r()}function x(e){let o=g(e,i),s=i===null?``:`<p>Last time: ${M(i)}</p>`,c=r===n.length-1,l=c?`Finish`:`Unlock next reel`;d.innerHTML=`
      <p class="gate-label">${o?`Brain back on!`:`Not yet`}</p>
      <h2 class="gate-score">${M(e)}</h2>
      ${s}
      ${o?``:`<p>Match or beat last time to move on.</p>`}
      <button id="gate-continue" type="button">${o?l:`Try again`}</button>
    `,d.querySelector(`#gate-continue`).addEventListener(`click`,()=>{if(!o){b(y(t,f()));return}if(i=e,c){S();return}a=!1,u.hidden=!0,r++,p()})}function S(){e.innerHTML=`
      <main class="setup">
        <section class="card done">
          <h1>You're done!</h1>
          <p class="summary">You watched all ${n.length} reels and passed every brain check.</p>
          <button id="restart-button" type="button">Start over</button>
        </section>
      </main>
    `,e.querySelector(`#restart-button`).addEventListener(`click`,()=>location.reload())}let w=null;c.addEventListener(`touchstart`,e=>{w=e.touches[0].clientY}),c.addEventListener(`touchend`,e=>{w!==null&&w-e.changedTouches[0].clientY>re&&v(),w=null}),c.addEventListener(`wheel`,e=>{e.deltaY>0&&v()}),l.addEventListener(`click`,v),document.addEventListener(`keydown`,t=>{t.key===`ArrowDown`&&e.contains(o)&&v()}),p()}function M(e){return`${e.correct} / ${e.total} (${Math.round(e.correct/e.total*100)}%)`}var N=` - `;function P(e){let t={items:[],errors:[]};return e.split(`
`).forEach((e,n)=>{let r=n+1;if(e.trim()===``)return;let i=e.indexOf(N);if(i===-1){t.errors.push(`Line ${r}: put "${N}" between the term and its definition`);return}let a=e.slice(0,i).trim(),o=e.slice(i+3).trim();a===``?t.errors.push(`Line ${r}: the term is empty`):o===``?t.errors.push(`Line ${r}: the definition is empty`):t.items.push({term:a,definition:o})}),t}var F=class extends Error{},ae=`https://www.googleapis.com/youtube/v3/search`,I=`https://www.googleapis.com/youtube/v3/videos`,L=12,R=4,z=100;function B(e){return[...new Set(e.map(e=>e.term.trim().toLowerCase()))].filter(e=>e!==``).slice(0,R).join(` `).slice(0,z)}function V(e){let t=/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(e);if(t===null)return null;let[n,r,i,a]=t.slice(1).map(e=>Number(e??0));return((n*24+r)*60+i)*60+a}async function H(e,t,n){let r;try{r=await n(`${e}?${new URLSearchParams(t)}`)}catch{throw new F(`Couldn't reach YouTube. Check your connection and try again.`)}if(!r.ok){let e=await r.json().catch(()=>({}));throw new F(U(r.status,e.error?.errors?.[0]?.reason))}return await r.json()}function U(e,t){switch(t){case`quotaExceeded`:case`dailyLimitExceeded`:return`Today's free YouTube searches are used up. Paste links instead, or search again tomorrow.`;case`keyInvalid`:case`badRequest`:return`YouTube didn't accept this app's search key. Check the key in .env.local (see the README).`;case`accessNotConfigured`:case`forbidden`:return`The search key isn't allowed to use the YouTube Data API. Turn that API on for the key (see the README).`;default:return`YouTube search failed (error ${e}). Try again, or paste links instead.`}}function W(e){if(typeof document>`u`)return e;let t=document.createElement(`textarea`);return t.innerHTML=e,t.value}async function G(e,t,n,r=fetch){let i=((await H(ae,{part:`snippet`,type:`video`,videoEmbeddable:`true`,safeSearch:`moderate`,videoDuration:t,maxResults:String(L),q:e,key:n},r)).items??[]).flatMap(e=>{let t=e.id?.videoId,n=e.snippet?.thumbnails?.medium?.url;return t===void 0||n===void 0||!n.startsWith(`https://`)?[]:[{id:t,title:W(e.snippet?.title??`Untitled video`),channel:W(e.snippet?.channelTitle??``),thumbnailUrl:n}]});if(i.length===0)return[];let a=await H(I,{part:`contentDetails`,id:i.map(e=>e.id).join(`,`),key:n},r),o=new Map;for(let e of a.items??[]){let t=V(e.contentDetails?.duration??``);e.id!==void 0&&t!==null&&o.set(e.id,t)}return i.flatMap(e=>{let t=o.get(e.id)??0;return t>0?[{...e,seconds:t}]:[]})}function K(e,t){let n=t.apiKey?.trim()??``;if(n===``)return e.innerHTML=`
      <p class="hint">Video search isn't set up on this copy of the app yet (the README says how).
      You can still paste links below.</p>
    `,{pickedVideos:()=>[]};e.innerHTML=`
    <form class="browser-search">
      <label class="visually-hidden" for="video-query">Search YouTube</label>
      <input id="video-query" type="search" placeholder="Search YouTube" autocomplete="off" />
      <button type="submit">Search</button>
    </form>
    <div class="browser-options">
      <button id="suggest-button" class="secondary" type="button">Suggest from my notes</button>
      <label class="check-option"><input id="short-only" type="checkbox" checked /> Under 4 minutes only</label>
    </div>
    <p id="browser-status" class="browser-status" role="status"></p>
    <ul id="browser-results" class="results"></ul>
  `;let r=e.querySelector(`.browser-search`),i=e.querySelector(`#video-query`),a=e.querySelector(`#suggest-button`),o=e.querySelector(`#short-only`),s=e.querySelector(`#browser-status`),c=e.querySelector(`#browser-results`),l=new Map,u=new Map,d=[],f=0;function p(e,t=!1){s.textContent=e,s.classList.toggle(`errors`,t)}function g(){let e=d.filter(e=>!l.has(e.id));c.replaceChildren(...[...l.values(),...e].map(_))}function _(e){let n=l.has(e.id),r=h(m(e.seconds)),i=document.createElement(`li`),a=document.createElement(`button`);return a.type=`button`,a.className=`result`,a.setAttribute(`aria-pressed`,String(n)),a.innerHTML=`
      <img alt="" loading="lazy" width="120" height="68" />
      <span class="result-text">
        <span class="result-title"></span>
        <span class="result-meta"></span>
      </span>
      <span class="result-mark">${n?`✓ Picked`:`Add`}</span>
    `,a.querySelector(`img`).src=e.thumbnailUrl,a.querySelector(`.result-title`).textContent=e.title,a.querySelector(`.result-meta`).textContent=`${e.channel} · ${C(e.seconds)} · ${r} ${r===1?`question`:`questions`}`,a.addEventListener(`click`,()=>{n?l.delete(e.id):l.set(e.id,e),g(),t.onPickedChange()}),i.append(a),i}async function v(e){let t=o.checked?`short`:`any`,r=`${t}|${e.toLowerCase()}`,i=++f;p(`Searching YouTube…`);try{let a=u.get(r)??await G(e,t,n);if(u.set(r,a),i!==f)return;d=a,p(a.length===0?`No videos found. Try different words.`:`Tap a video to add it. Longer videos cost more questions.`)}catch(e){if(i!==f)return;d=[],p(e instanceof F?e.message:`Something went wrong while searching. Try again.`,!0)}g()}return r.addEventListener(`submit`,e=>{e.preventDefault();let t=i.value.trim();if(t===``){p(`Type what you want to watch, or press “Suggest from my notes”.`);return}v(t)}),a.addEventListener(`click`,()=>{let e=B(t.getCards());if(e===``){p(`Add some notes above first, so there is something to suggest from.`);return}i.value=e,v(e)}),o.addEventListener(`change`,()=>{let e=i.value.trim();e!==``&&v(e)}),p(`Search for videos, or let your notes suggest some.`),{pickedVideos:()=>[...l.values()].map(e=>({id:e.id,label:`“${e.title}”`}))}}var q=/^[A-Za-z0-9_-]{11}$/;function J(e){let t;try{t=new URL(e)}catch{return null}let n=t.hostname.replace(/^(www\.|m\.)/,``),r=null;if(n===`youtu.be`)r=t.pathname.slice(1);else if(n===`youtube.com`){let[,e,n]=t.pathname.split(`/`);r=e===`shorts`?n??null:t.searchParams.get(`v`)}return r!==null&&q.test(r)?r:null}function Y(e){let t={items:[],errors:[]};return e.split(`
`).forEach((e,n)=>{let r=e.trim();if(r===``)return;let i=J(r);i===null?t.errors.push(`Line ${n+1}: not a YouTube link`):t.items.push({id:i,label:`Line ${n+1}`})}),t}function oe(e,t){e.innerHTML=`
    <main class="setup">
      <header>
        <h1 class="logo" aria-label="Brain Reels">${X(`BRAIN`,0)}${X(`REELS`,5)}</h1>
        <p class="tagline">Earn your next reel by switching your brain back on.</p>
      </header>

      <div id="appearance-picker"></div>

      <section class="card">
        <label class="field-label" for="notes-input">Your notes</label>
        <p class="hint">One per line: <code>term - definition</code></p>
        <textarea id="notes-input" rows="6"
          placeholder="variable - a named box that holds a value&#10;loop - code that repeats"></textarea>
        <ul id="notes-errors" class="errors"></ul>
      </section>

      <section class="card">
        <h2 class="field-label">Videos</h2>
        <p class="hint">Pick what to watch. Longer videos cost more questions.</p>
        <div id="video-browser" class="browser"></div>

        <label class="field-label" for="videos-input">Or paste YouTube links</label>
        <p class="hint">One link per line.</p>
        <textarea id="videos-input" rows="3"
          placeholder="https://youtube.com/shorts/..."></textarea>
        <ul id="videos-errors" class="errors"></ul>
      </section>

      <p id="summary" class="summary"></p>
      <button id="start-button" type="button" disabled>Start</button>
    </main>
  `;let n=e.querySelector(`#notes-input`),r=e.querySelector(`#videos-input`),i=e.querySelector(`#notes-errors`),a=e.querySelector(`#videos-errors`),o=e.querySelector(`#video-browser`),s=e.querySelector(`#summary`),c=e.querySelector(`#start-button`);f(e.querySelector(`#appearance-picker`));let l=K(o,{apiKey:`AIzaSyAZhQuVMMUwvuW3GnxqJEK0RbEhmn5TgDI`,getCards:()=>P(n.value).items,onPickedChange:d});function u(){let e=new Map;for(let t of[...l.pickedVideos(),...Y(r.value).items])e.has(t.id)||e.set(t.id,t);return[...e.values()]}function d(){let e=P(n.value),t=Y(r.value),o=u();Z(i,e.errors),Z(a,t.errors);let l=e.items.length>0&&o.length>0&&e.errors.length===0&&t.errors.length===0;c.disabled=!l,s.textContent=l?`${Q(e.items.length,`card`)}, ${Q(o.length,`video`)} ready`:`Add at least one note and one video to start.`}function p(e){n.disabled=e,r.disabled=e,o.inert=e}n.addEventListener(`input`,d),r.addEventListener(`input`,d),c.addEventListener(`click`,async()=>{let e=P(n.value).items,r=u();c.disabled=!0,p(!0),s.textContent=`Checking ${Q(r.length,`video`)}…`;let{reels:i,problems:o}=await ne(r);if(p(!1),o.length===0){t(e,i);return}Z(a,o),c.disabled=!1,s.textContent=`Remove the videos listed above, then press Start again.`}),d()}function X(e,t){return`<span class="logo-row" aria-hidden="true">${[...e].map((e,n)=>`<span class="logo-tile" style="--order: ${t+n}">${e}</span>`).join(``)}</span>`}function Z(e,t){e.replaceChildren(...t.map(e=>{let t=document.createElement(`li`);return t.textContent=e,t}))}function Q(e,t){return`${e} ${t}${e===1?``:`s`}`}var $=document.querySelector(`#app`);if(!$)throw Error(`Missing #app element in index.html`);d(),oe($,(e,t)=>ie($,e,t));