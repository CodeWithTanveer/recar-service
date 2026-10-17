/* Re Car Service — script.js */
/* ===== OWNER SETTINGS — edit here ===== */
const CONFIG={
 phone:"+31629444225",phoneDisplay:"+31 6 29444225",
 hours:"Open 24 hours (current Google listing — owner can update)",hoursShort:"Open 24 hours",
 maps:"https://www.google.com/maps/search/?api=1&query=Re+Car+Service+Groenekanseweg+66A+3732+AG+De+Bilt+Netherlands",
 reviewsUrl:"",   // paste the verified Google Business Profile reviews URL
 formEndpoint:"", // e.g. Formspree URL. Empty = forms show an honest "not configured" error
 images:{about:""},
 // Hero slides: free-to-use Unsplash photos (Unsplash License). Replace with your own workshop photos any time.
 slides:[
  {img:"https://images.unsplash.com/photo-1771340012319-0b4fca008b54",alt:"Mechanic working on a car engine in a workshop",pos:"center"},
  {img:"https://images.unsplash.com/photo-1643700973089-baa86a1ab9ee",alt:"Mechanic changing oil in a car",pos:"center"},
  {img:"",alt:"",pos:"center"} // add a third photo URL here (optional)
 ]
};
const SERVICES=[
 ["General Car Repairs","Assistance with common vehicle repair needs.","wrench"],
 ["Vehicle Maintenance","Routine maintenance to help keep your vehicle in good condition.","gear"],
 ["Brake Inspection & Repair","Brake checks and repair services when required.","brake"],
 ["Steering & Suspension","Inspection and repair of steering and suspension issues.","steer"],
 ["Oil & Filter Changes","Routine engine oil and filter maintenance.","oil"],
 ["Vehicle Diagnostics","Help identifying vehicle issues and determining appropriate repairs.","diag"]];
const WHY=["Local automotive service in De Bilt.","Customer feedback highlighting fast problem resolution.","Positive customer feedback about professional service and transparent pricing.","Assistance with vehicle maintenance and repair needs.","Convenient contact and directions."];
const ICONS={wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',brake:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',steer:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M3 12h7M14 12h7M12 14v7"/>',oil:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',diag:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M7 11h2l1.500-3 2 6 1.500-3h1"/>',check:'<path d="M5 12l5 5 9-10"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>'};
const svg=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];

/* links & config */
$$("[data-tel]").forEach(a=>a.href="tel:"+CONFIG.phone);
$$("[data-tel-text]").forEach(e=>e.textContent=CONFIG.phoneDisplay);
$$("[data-dir]").forEach(a=>a.href=CONFIG.maps);
$$("[data-hours]").forEach(e=>e.textContent=CONFIG.hours);
$$("[data-hours-short]").forEach(e=>e.textContent=CONFIG.hoursShort);
$("#revLink").href=CONFIG.reviewsUrl||CONFIG.maps;
if(CONFIG.images.about){const p=$("#aboutPhoto");p.style.backgroundImage=`url("${CONFIG.images.about}")`;p.innerHTML=""}

/* render lists */
$("#svcGrid").innerHTML=SERVICES.map((s,i)=>`<article class="card rv" style="--d:${(i%3)*.1}s"><span class="n" aria-hidden="true">0${i+1}</span><div class="ico">${svg(s[2])}</div><h3></h3><p></p><a class="btn btn-dark" href="#contact" data-svc="">Contact Us</a></article>`).join("");
$$("#svcGrid article").forEach((el,i)=>{$("h3",el).textContent=SERVICES[i][0];$("p",el).textContent=SERVICES[i][1];$("a",el).dataset.svc=SERVICES[i][0]});
$("#whyGrid").innerHTML=WHY.map((w,i)=>`<div class="rv" style="--d:${i*.08}s">${svg("check")}<span></span></div>`).join("");
$$("#whyGrid span").forEach((s,i)=>s.textContent=WHY[i]);
$("#footSvc").innerHTML=SERVICES.map(()=>`<li><a href="#services"></a></li>`).join("");
$$("#footSvc a").forEach((a,i)=>a.textContent=SERVICES[i][0]);

/* forms */
const opts=["",...SERVICES.map(s=>s[0]),"Other / Not sure"];
const BOOK=[["name","Full Name","text",1],["phone","Phone Number","tel",1],["email","Email Address","email",1],["vehicle","Vehicle Make and Model","text",1],["service","Service Required","select",1],["date","Preferred Date","date",1],["time","Preferred Time","time",0],["notes","Additional Notes","textarea",0]];
const CONT=[["name","Name","text",1],["phone","Phone","tel",1],["email","Email","email",1],["vehicle","Vehicle Make/Model","text",0],["service","Service Required","select",0],["date","Preferred Date","date",0],["message","Message","textarea",1]];
function build(form,fields,id){
 form.innerHTML=`<div class="fg">`+fields.map(([n,l,t,req])=>{
  const fid=id+"_"+n,r=req?" required aria-required=\"true\"":"",star=req?' <i aria-hidden="true">*</i>':"";
  const ac=t==="email"?' autocomplete="email"':t==="tel"?' autocomplete="tel" inputmode="tel"':n==="name"?' autocomplete="name"':"";
  const ctl=t==="select"?`<select id="${fid}" name="${n}"${r}>${opts.map(o=>`<option value="${o}">${o||"Select a service"}</option>`).join("")}</select>`
   :t==="textarea"?`<textarea id="${fid}" name="${n}" maxlength="1500"${r}></textarea>`
   :`<input id="${fid}" name="${n}" type="${t}" maxlength="120"${ac}${r}>`;
  return `<div class="${t==="textarea"?"full":""}"><label for="${fid}">${l}${star}</label>${ctl}<div class="err" id="${fid}_e" aria-live="polite"></div></div>`}).join("")+
 `<div class="hp" aria-hidden="true"><label>Leave empty<input name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
 <div class="full"><button class="btn btn-red" type="submit" style="width:100%">${id==="b"?"Send Appointment Request":"Send Message"}</button><div class="status" role="status" aria-live="polite"></div></div></div>`;
 const d=$("input[type=date]",form);if(d)d.min=new Date().toISOString().slice(0,10);
 form.addEventListener("submit",e=>submit(e,form,id));
}
build($("#bookForm"),BOOK,"b");build($("#contactForm"),CONT,"c");
const RE={email:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,phone:/^\+?[0-9][0-9\s().-]{6,17}[0-9]$/};
function check(form){
 let ok=true,first=null;
 $$("input,select,textarea",form).forEach(el=>{
  if(el.name==="_gotcha")return;
  const v=el.value.trim(),er=$("#"+el.id+"_e");let m="";
  if(el.required&&!v)m="This field is required.";
  else if(v&&el.type==="email"&&!RE.email.test(v))m="Enter a valid email address.";
  else if(v&&el.type==="tel"&&!RE.phone.test(v))m="Enter a valid phone number, e.g. +31 6 12345678.";
  else if(v&&el.type==="date"&&v<el.min)m="Choose today or a future date.";
  er.textContent=m;el.setAttribute("aria-invalid",!!m);
  if(m){ok=false;first=first||el}
 });
 if(first)first.focus();return ok;
}
async function submit(e,form,id){
 e.preventDefault();const st=$(".status",form),btn=$("button[type=submit]",form);
 st.className="status";st.textContent="";
 if(!check(form))return;
 if($("[name=_gotcha]",form).value)return; // spam bot
 if(!CONFIG.formEndpoint){st.className="status bad";st.textContent="This form isn’t connected yet, so nothing was sent. Please call "+CONFIG.phoneDisplay+" instead.";return}
 const data=Object.fromEntries(new FormData(form));delete data._gotcha;data.type=form.dataset.kind+(id==="b"?" (pending confirmation)":"");
 btn.disabled=true;const old=btn.textContent;btn.textContent="Sending…";
 try{
  const r=await fetch(CONFIG.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)});
  if(!r.ok)throw new Error(r.status);
  form.reset();st.className="status ok";
  st.textContent=id==="b"?"Thank you. Your appointment request was sent and is pending confirmation by Re Car Service. We will contact you.":"Thank you. Your message was sent and we will get back to you.";
 }catch(err){st.className="status bad";st.textContent="Sorry, we couldn’t send that. Please try again or call "+CONFIG.phoneDisplay+"."}
 finally{btn.disabled=false;btn.textContent=old}
}

/* tabs */
function tab(k){
 const b=k==="book";$("#bookForm").hidden=!b;$("#contactForm").hidden=b;
 $("#tb").setAttribute("aria-selected",b);$("#tc").setAttribute("aria-selected",!b);
 $("#tabNote").textContent=b?"Appointment requests are pending confirmation by Re Car Service. A time is not booked until we confirm it.":"Send us a question or message and we will reply.";
}
$("#tb").onclick=()=>tab("book");$("#tc").onclick=()=>tab("contact");
$$("[data-tab]").forEach(a=>a.addEventListener("click",()=>tab(a.dataset.tab)));
$$("[data-svc]").forEach(a=>a.addEventListener("click",()=>{tab("contact");$("#c_service").value=a.dataset.svc}));

/* mobile menu */
const burger=$("#burger"),menu=$("#menu");
const setMenu=o=>{menu.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Close menu":"Open menu");burger.innerHTML=svg(o?"close":"menu")};
setMenu(false);burger.onclick=()=>setMenu(!menu.classList.contains("open"));
$$("#menu a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
$("#privBtn").onclick=()=>$("#priv").showModal();$("#privClose").onclick=()=>$("#priv").close();

/* scroll: header, progress bar, active link */
const hdr=$("#hdr"),prog=$("#prog");
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 hdr.classList.toggle("solid",y>40);prog.style.transform=`scaleX(${h>0?y/h:0})`}
addEventListener("scroll",onScroll,{passive:true});onScroll();
const links=$$("nav a.l"),secs=links.map(a=>$(a.getAttribute("href")));
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach((a,i)=>a.classList.toggle("on",secs[i]===e.target))}),{rootMargin:"-45% 0px -50% 0px"});
secs.forEach(s=>s&&spy.observe(s));

/* reveal on scroll */
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
if(rm||!("IntersectionObserver"in window)){$$(".rv").forEach(e=>e.classList.add("in"))}
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});$$(".rv").forEach(e=>io.observe(e))}

/* rating count-up */
const cu=$("[data-count]");
if(cu&&!rm&&"IntersectionObserver"in window){const t=+cu.dataset.count;const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();const s=performance.now();
 (function f(n){const p=Math.min((n-s)/1200,1);cu.textContent=(t*(1-Math.pow(1-p,3))).toFixed(1);if(p<1)requestAnimationFrame(f)})(s)});o.observe(cu)}

/* hero carousel */
const hero=$("#hero"),slides=$$(".slide"),dotsEl=$("#dots"),DUR=6500;
let cur=0,timer,playing=!rm;
CONFIG.slides.forEach((s,i)=>{
 if(!s.img||!slides[i])return;
 const im=new Image();im.alt=s.alt;im.decoding="async";im.loading=i?"lazy":"eager";if(!i)im.fetchPriority="high";
 im.style.objectPosition=s.pos||"center";im.sizes="100vw";
 im.srcset=[800,1280,1920].map(w=>`${s.img}?auto=format&fit=crop&q=70&w=${w} ${w}w`).join(", ");
 im.src=`${s.img}?auto=format&fit=crop&q=70&w=1280`;
 im.onerror=()=>{im.remove();slides[i].classList.remove("hasimg")};
 slides[i].classList.add("hasimg");slides[i].prepend(im);
});
slides.forEach((s,i)=>{const b=document.createElement("button");b.className="dot";b.setAttribute("aria-label","Go to slide "+(i+1));b.innerHTML="<i></i>";b.onclick=()=>{go(i);restart()};dotsEl.append(b)});
function go(n){
 cur=(n+slides.length)%slides.length;
 slides.forEach((s,i)=>{s.classList.toggle("active",i===cur);s.setAttribute("aria-hidden",i!==cur)});
 $$(".dot").forEach((d,i)=>{d.classList.toggle("done",i<cur);d.removeAttribute("aria-current");const f=d.firstChild;f.style.animation="none";d.classList.remove("active");
  if(i===cur){d.setAttribute("aria-current","true");void f.offsetWidth;f.style.animation="";d.classList.add("active")}});
}
function restart(){clearTimeout(timer);if(playing)timer=setTimeout(()=>{go(cur+1);restart()},DUR)}
function setPlay(p){playing=p;hero.classList.toggle("paused",!p);$("#slides").setAttribute("aria-live",p?"off":"polite");
 const b=$("#pp");b.setAttribute("aria-label",p?"Pause slideshow":"Play slideshow");
 b.innerHTML=`<svg class="ic" viewBox="0 0 24 24">${p?'<path d="M9 5v14M15 5v14"/>':'<path d="M7 4l13 8-13 8z"/>'}</svg>`;
 if(p){go(cur)}restart()}
$("#prev").onclick=()=>{go(cur-1);restart()};$("#next").onclick=()=>{go(cur+1);restart()};
$("#pp").onclick=()=>setPlay(!playing);
hero.addEventListener("mouseenter",()=>{hero.classList.add("hov");clearTimeout(timer)});
hero.addEventListener("mouseleave",()=>{hero.classList.remove("hov");if(playing){go(cur);restart()}});
hero.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){go(cur-1);restart()}if(e.key==="ArrowRight"){go(cur+1);restart()}});
let tx=null;hero.addEventListener("touchstart",e=>{tx=e.touches[0].clientX},{passive:true});
hero.addEventListener("touchend",e=>{if(tx===null)return;const d=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(d)>50){go(cur+(d<0?1:-1));restart()}});
document.addEventListener("visibilitychange",()=>{if(document.hidden)clearTimeout(timer);else if(playing){go(cur);restart()}});
setPlay(playing);
