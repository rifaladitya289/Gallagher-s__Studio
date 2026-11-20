/* Gallagher's Studio — isolated Home behavior */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

// Original topographic texture foundation (kept for shared design variables).
function topo(stroke){
  const W=1200,H=900;let d="";
  for(let i=0;i<26;i++){let p="";const y0=-60+i*38;
    for(let x=0;x<=W;x+=30){const y=y0+Math.sin(x/170+i*.55)*34+Math.sin(x/70+i*1.3)*10+Math.cos(x/320-i*.2)*40;p+=(x?"L":"M")+x+" "+y.toFixed(1)}
    d+=`<path d="${p}"/>`}
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}' fill='none' stroke='${stroke}' stroke-width='1.2'>${d}</svg>`)}")`;
}
document.documentElement.style.setProperty("--topo-d",topo("#16264d"));
document.documentElement.style.setProperty("--topo-l",topo("#d3d9e6"));

// Detect the original hero fallback media.
[["https://raw.githubusercontent.com/rifaladitya289/Portfolio/main/assets/bg/poster.jpg","has-hero"]].forEach(([src,cls])=>{
  const im=new Image();im.onload=()=>document.body.classList.add(cls);im.src=src;
});

// Original dual-video soft crossfade loop.
(function(){
  const first=$("#heroVid");if(!first)return;
  const stage=first.closest(".stage");
  const FADE_MS=650,TRIGGER_SEC=.78;
  let active=first,standby=null,fading=false,raf=0;
  first.muted=true;
  const ok=()=>document.body.classList.add("has-vid");
  first.addEventListener("loadeddata",ok);if(first.readyState>=2)ok();
  if(matchMedia("(prefers-reduced-motion:reduce)").matches){first.removeAttribute("autoplay");first.pause();return;}
  standby=first.cloneNode(true);standby.removeAttribute("id");standby.removeAttribute("autoplay");standby.autoplay=false;standby.muted=true;standby.preload="auto";standby.classList.add("is-hidden");standby.pause();stage.insertBefore(standby,first.nextSibling);standby.load();
  function playActive(){if(document.hidden)return;const p=active.play();if(p&&p.catch)p.catch(()=>{});}
  function finishFade(){const previous=active;active=standby;standby=previous;previous.pause();try{previous.currentTime=0}catch(e){}previous.classList.add("is-hidden");active.classList.remove("is-hidden");fading=false;}
  function startFade(){if(fading||standby.readyState<2)return;fading=true;try{standby.currentTime=0}catch(e){}const p=standby.play();const reveal=()=>{standby.classList.remove("is-hidden");active.classList.add("is-hidden");window.setTimeout(finishFade,FADE_MS);};if(p&&typeof p.then==="function")p.then(reveal).catch(()=>{fading=false});else reveal();}
  function checkLoop(){if(!document.hidden&&!fading&&!active.paused&&Number.isFinite(active.duration)){const remaining=active.duration-active.currentTime;if(remaining>0&&remaining<=TRIGGER_SEC&&standby.readyState>=2)startFade();}raf=requestAnimationFrame(checkLoop);}
  playActive();if(!raf)raf=requestAnimationFrame(checkLoop);
  ["touchstart","click","scroll"].forEach(e=>addEventListener(e,()=>{if(active.paused)playActive()},{once:true,passive:true}));
  document.addEventListener("visibilitychange",()=>{if(document.hidden){active.pause();standby.pause()}else playActive();});
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)playActive();else{active.pause();standby.pause();}})).observe(stage);
})();

// Original hero parallax behavior.
const layers=document.querySelectorAll(".layer, .vid");
function parallax(){const z=parseFloat(document.documentElement.style.zoom)||1,y=scrollY/z;layers.forEach(l=>l.style.transform=`translateY(${y*l.dataset.s}px)`);}
addEventListener("scroll",parallax,{passive:true});parallax();

// Original rotating Home quote.
(function(){
  const target=document.getElementById("heroQuote");if(!target)return;
  const quotes=["Every great creation begins with a single idea.","Dream it. Build it. Make it real.","Small steps can lead to extraordinary places.","Keep creating, even when progress feels quiet.","Your ideas deserve the chance to exist.","Great things take time, patience, and practice.","Turn curiosity into something meaningful.","Progress begins when you decide to begin.","Create with purpose. Grow with passion.","Let your imagination lead the way.","Every expert was once a beginner.","Be proud of how far your ideas have brought you.","Make today a small step toward something bigger.","Learn something. Build something. Repeat.","Consistency gives creativity a direction.","Your next idea could change everything.","Stay curious. Stay creative. Stay moving.","Build the future one line at a time.","Don't wait for perfect. Start with possible.","Every challenge carries a lesson worth learning.","Make room for ideas that inspire you.","Keep going; meaningful work takes time.","Creativity grows when curiosity stays alive.","Think boldly. Start simply. Improve continuously.","Let every project teach you something new.","Your pace is still progress.","Make your passion visible through your work.","One focused step is better than endless waiting.","Explore more. Imagine more. Create more.","Turn what you learn into what you build.","Be the reason your idea becomes reality.","Small details can make a big difference.","Build skills today that your future self will thank you for.","Every attempt brings you closer to understanding.","Give your best to the process, not just the result.","Let curiosity open doors you haven't seen yet.","Stay patient with the process and ambitious with the vision.","Make mistakes part of your learning journey.","Your creativity has room to grow.","Start where you are. Use what you have. Keep learning.","Great ideas become real through consistent action.","Keep your vision clear and your mind open.","Create something that reflects what you believe in.","Be willing to learn what you don't know yet.","Your journey is built one decision at a time.","Think beyond limits, then take the first step.","Make every experiment an opportunity to improve.","Don't just imagine possibilities. Explore them.","Let your work speak through thoughtful details.","Stay focused on becoming better than yesterday.","Every line of code can bring an idea closer.","Technology is a tool; imagination gives it direction.","Keep building, keep learning, keep discovering.","Your future is shaped by what you practice today.","Be brave enough to try a different approach.","Turn questions into discoveries.","Let passion begin the journey and discipline continue it.","Create with intention, refine with patience.","Even the smallest breakthrough matters.","Make your curiosity your greatest advantage.","Keep exploring beyond what you already know.","Every new skill adds another possibility.","Good things grow from consistent effort.","Your ideas are worth developing.","Take the first step; clarity often follows action.","Make learning a lifelong adventure.","Build something useful. Make it meaningful.","Don't fear the blank page; see its possibilities.","Let each project become proof of your growth.","Stay open to feedback and committed to progress.","One day, today's practice will become your strength.","Make creativity a habit, not a rare moment.","Focus on the craft and let progress follow.","Every new perspective can spark a new idea.","Keep your standards high and your steps steady.","Create beyond expectations, one detail at a time.","Your journey doesn't need to look like anyone else's.","Find inspiration, then make it your own.","Turn imagination into action.","Keep showing up for the things you want to build.","Learn deeply. Create freely. Improve often.","Every project starts with the courage to begin.","Let challenges sharpen your skills.","Make progress your priority, not perfection.","Think clearly. Design thoughtfully. Build confidently.","Give your ideas time to become something great.","Keep the vision alive through daily effort.","Small improvements create lasting impact.","Be curious about what you can become.","Create today what you once only imagined.","Stay determined, even when the path is unfamiliar.","Let your work be a reflection of your growth.","Every finished project begins with an unfinished idea.","Choose progress, then choose it again tomorrow.","Your creativity is a journey, not a destination.","Keep learning until the impossible feels approachable.","Build with curiosity and finish with purpose.","Make something meaningful from what inspires you.","There's always another idea waiting to be explored.","Imagine boldly. Create patiently. Keep moving forward."];
  let index=0;const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;target.textContent=quotes[index];
  window.setInterval(()=>{index=(index+1)%quotes.length;if(reduced){target.textContent=quotes[index];return;}target.classList.add("is-changing");window.setTimeout(()=>{target.textContent=quotes[index];target.classList.remove("is-changing");},360);},180000);
})();

// Home-only masked typography entrance.
(function(){
  const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets=["#home .hero-copy h1","#home .hero-description","#home .hero-quote"].flatMap(s=>[...document.querySelectorAll(s)]);
  targets.forEach(el=>el.classList.add("text-mask-reveal"));
  if(reduce||!("IntersectionObserver"in window)){targets.forEach(el=>el.classList.add("text-mask-visible"));return;}
  targets.forEach(el=>el.classList.add("text-mask-visible"));
})();
