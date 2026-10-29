(() => {
"use strict";
const bank=window.CERT_QUIZ_BANK||{};
const key=new URLSearchParams(location.search).get("cert")||"itil5";
const cert=bank[key]||bank.itil5;
const prefix="certquiz-"+cert.id+"-v1";
const el=id=>document.getElementById(id);
const choiceLetters=["ア","イ","ウ","エ"];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const read=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(prefix+k)||"null")??fallback}catch(_){return fallback}};
const save=(k,val)=>localStorage.setItem(prefix+k,JSON.stringify(val));
let session=read("-session",null),last=read("-last",null),runNumber=read("-runs",0),timer=null;
const available=()=>cert.items.filter(q=>el("certCategory").value==="all"||q.category===el("certCategory").value);
function show(id){
 ["certSetupView","certExamView","certResultView"].forEach(view=>el(view).hidden=view!==id);
 window.scrollTo({top:0,behavior:"instant"});
}
function timeFor(n){
 const full=cert.official.questions;
 return Math.max(1,Math.ceil(cert.official.minutes*n/full));
}
function setup(){
 el("certTitle").textContent=cert.title;
 document.title=cert.title+" | FE合格作戦";
 el("certSubtitle").textContent=cert.subtitle;
 const mode=cert.id==="ap_b"?"記述式・自己照合":"4択・自動採点";
 el("certOfficial").textContent="実際の試験：目安"+cert.official.questions+"問／"+cert.official.minutes+"分　｜　この問題集："+cert.items.length+"問　｜　"+mode+"　｜　受験料 "+cert.fee;
 el("certTag").textContent="独自予測問題・第1回";
 el("certNotice").textContent=cert.id==="ap_b"
    ?"応用情報の科目Bは本試験で11問中5問を選択して解答する記述式です。このアプリでは模範解答を確認する練習であり、得点の自動判定は行いません。"
    :cert.id.startsWith("linuc")
      ?"本試験にはキーボード入力問題が含まれる場合があります。現在の学習画面は4択中心です。Version 11.0の項目は2026年ベータ段階で、正式公開時に変更される可能性があります。"
      :cert.id==="itil5"
        ?"Version 5の公式試験は40問・60分・合格基準65%です。この画面の問題は独自作成で、公式問題数とは異なります。"
        :"応用情報は科目Aが80問・150分の4択、科目Bが記述式です。この画面は科目Aの短縮演習です。";
 const categories=[...new Set(cert.items.map(q=>q.category))];
 const cat=el("certCategory");cat.innerHTML="";
 for(const [value,label] of [["all","全分野"],...categories.map(s=>[s,s])]){
  const opt=document.createElement("option");opt.value=value;opt.textContent=label;cat.appendChild(opt);
 }
 const counts=el("certCount");
 const renderCounts=()=>{
  const prior=parseInt(counts.value,10),total=available().length;
  const values=[1,3,5,10,15,20,total].filter((v,i,a)=>v<=total&&a.indexOf(v)===i).sort((a,b)=>a-b);
  counts.innerHTML="";
  for(const n of values){const opt=document.createElement("option");opt.value=String(n);opt.textContent=n+"問";counts.appendChild(opt)}
  counts.value=String(values.includes(prior)?prior:total);
  el("certPreview").textContent="対象："+total+"問／選択："+counts.value+"問、演習時間の目安："+timeFor(Number(counts.value))+"分";
 };
 cat.addEventListener("change",renderCounts);
 counts.addEventListener("change",renderCounts);
 renderCounts();
 el("certStartBtn").textContent=session&&!session.submitted?"前回の続きから再開":"この条件で出題開始";
 el("certReviewBtn").disabled=!last;
 show("certSetupView");
}
function persist(){save("-session",session)}
function rotateChoices(q,offset){
 if(q.mode==="written")return {...q};
 const shift=(Number(q.id.match(/(\d+)$/)?.[1])||0)+offset;
 const n=q.options.length,s=shift%n;
 return {...q,options:q.options.map((_,i)=>q.options[(i+s)%n]),correct:(q.correct-s+n)%n};
}
function newSession(raw){
 runNumber++;
 save("-runs",runNumber);
 const picked=raw.map(q=>rotateChoices(q,runNumber));
 session={questions:picked,answers:{},index:0,startedAt:Date.now(),deadline:Date.now()+timeFor(picked.length)*60000,submitted:false};
 persist();launch();
}
function start(){
 if(session&&!session.submitted){launch();return}
 const pool=available(),count=Number(el("certCount").value);
 // 別の回で同じ問題だけが先頭に来ないよう巡回する
 const offset=runNumber%pool.length;
 const rotated=[...pool.slice(offset),...pool.slice(0,offset)];
 const chosen=[];
 for(let i=0;i<count;i++)chosen.push(rotated[Math.floor((i+.5)*rotated.length/count)]);
 newSession(chosen);
}
function launch(){
 if(!session||!session.questions?.length){setup();return}
 show("certExamView");
 render();
 clearInterval(timer);
 timer=setInterval(tick,1000);
 tick();
}
function tick(){
 if(!session||session.submitted)return;
 const left=Math.max(0,session.deadline-Date.now());
 const m=Math.floor(left/60000),sec=Math.floor((left%60000)/1000);
 el("certTimer").textContent=String(m).padStart(2,"0")+":"+String(sec).padStart(2,"0");
 if(left===0){clearInterval(timer);el("certTimer").textContent="時間終了（提出可能）";}
}
function render(){
 const q=session.questions[session.index],index=session.index,answers=session.answers;
 el("certProgress").textContent="問題 "+(index+1)+" / "+session.questions.length+"（回答済み"+Object.keys(answers).filter(id=>answers[id]!==""&&answers[id]!==null).length+"問）";
 el("certProgressBar").style.width=(((index+1)/session.questions.length)*100)+"%";
 el("certBadge").textContent=cert.title;
 el("certTopic").textContent=q.category;
 el("certQuestionText").textContent=q.question;
 el("certAnswers").hidden=q.mode==="written";
 el("certWritten").hidden=q.mode!=="written";
 if(q.mode==="written"){
   el("certWrittenAnswer").value=String(answers[q.id]||"");
 }else{
   const container=el("certAnswers");container.innerHTML="";
   q.options.forEach((txt,i)=>{
     const b=document.createElement("button");b.type="button";
     b.className="option-btn"+(answers[q.id]===i?" selected":"");
     const label=document.createElement("span");label.className="choice-letter";label.textContent=choiceLetters[i];
     const body=document.createElement("span");body.textContent=txt;
     b.append(label,body);
     b.setAttribute("aria-pressed",String(answers[q.id]===i));
     b.addEventListener("click",()=>{session.answers[q.id]=i;persist();render();});
     container.appendChild(b);
   });
 }
 el("certPrevBtn").disabled=index===0;
 el("certNextBtn").textContent=index===session.questions.length-1?"最初の問題へ":"次の問題";
}
function storeWritten(){
 if(session?.questions[session.index]?.mode==="written"){
   const q=session.questions[session.index];
   session.answers[q.id]=el("certWrittenAnswer").value;
   persist();
 }
}
function move(by){
 storeWritten();
 const n=session.questions.length;
 session.index=by===1&&session.index===n-1?0:Math.min(n-1,Math.max(0,session.index+by));
 persist();render();window.scrollTo({top:0,behavior:"instant"});
}
function reviewCard(q,a,expand){
 const heading="問"+(session?.questions?.findIndex(x=>x.id===q.id)+1||"?")+"　"+esc(q.category);
 const answer=q.mode==="written"?esc(a||"未回答"):a===undefined?"未回答":choiceLetters[a]+"："+esc(q.options[a]);
 const reference=q.mode==="written"?esc(q.reference):choiceLetters[q.correct]+"："+esc(q.options[q.correct]);
 const explain=q.mode==="written"?esc(q.point):esc(q.explain);
 return '<details class="cert-answer-card" '+(expand?"open":"")+'><summary>'+heading+'<small>'+esc(q.question)+'</small></summary><div class="cert-answer-body"><p>あなたの回答：'+answer+'</p><p class="cert-answer">模範解答：'+reference+'</p><p>解説・確認ポイント：'+explain+'</p></div></details>';
}
function result(fromSaved=false){
 clearInterval(timer);
 const saved=fromSaved?last:null;
 if(!fromSaved){
  storeWritten();
  const wrong=session.questions.filter(q=>q.mode==="written"||session.answers[q.id]!==q.correct);
  const correct=session.questions.length-wrong.length;
  const attempted=session.questions.filter(q=>session.answers[q.id]!==undefined&&session.answers[q.id]!=="").length;
  last={mode:cert.id==="ap_b"?"written":"choice",questions:session.questions,
    answers:session.answers,wrongIds:wrong.map(q=>q.id),correct,attempted,
    submittedAt:new Date().toISOString()};
  save("-last",last);
  session.submitted=true;persist();
 }
 const r=fromSaved?saved:last;if(!r){setup();return}
 const written=r.mode==="written",wrong=r.questions.filter(q=>r.wrongIds.includes(q.id));
 el("certResultTitle").textContent=fromSaved?"直前の誤答・解答":"学習結果";
 const total=r.questions.length;
 const summary=written
  ?'<p class="cert-summary-score">記述回答 '+r.attempted+' / '+total+'問</p><p>模範解答との自己照合を行ってください。点数は自動算出しません。</p>'
  :'<p class="cert-summary-score">'+r.correct+' / '+total+'問正解（'+Math.round(r.correct/total*100)+'%）</p><p>未正解 '+wrong.length+'問。これは練習問題の正答率であり、実試験の合否・採点尺度とは異なります。</p>';
 el("certResultSummary").innerHTML=summary;
 if(!written&&wrong.length){
  const m=new Map();
  for(const q of wrong)m.set(q.category,(m.get(q.category)||0)+1);
  const sorted=[...m].sort((a,b)=>b[1]-a[1]);
  const note=document.createElement("p");note.className="cert-weak-area";note.textContent="重点復習："+sorted.map(x=>x[0]+" "+x[1]+"問").join("／");
  el("certWrongList").innerHTML="";el("certWrongList").appendChild(note);
 }else el("certWrongList").innerHTML="";
 const heading=document.createElement("h3");heading.textContent=written?"記述問題と模範解答":"誤答・未回答の解説";el("certWrongList").appendChild(heading);
 const shown=written?r.questions:wrong;
 if(!shown.length){const p=document.createElement("p");p.textContent="全問正解です。";el("certWrongList").appendChild(p);}
 else for(const q of shown){const wrapper=document.createElement("div");wrapper.innerHTML=reviewCard(q,r.answers[q.id],written);el("certWrongList").appendChild(wrapper.firstElementChild);}
 el("certRetryWrongBtn").hidden=written||wrong.length===0;
 show("certResultView");
}
el("certStartBtn").addEventListener("click",start);
el("certReviewBtn").addEventListener("click",()=>result(true));
el("certPrevBtn").addEventListener("click",()=>move(-1));
el("certNextBtn").addEventListener("click",()=>move(1));
el("certSubmitBtn").addEventListener("click",()=>result());
el("certAbortBtn").addEventListener("click",()=>{storeWritten();clearInterval(timer);setup();});
el("certResultHomeBtn").addEventListener("click",setup);
el("certRetryWrongBtn").addEventListener("click",()=>{const set=new Set(last?.wrongIds||[]);const incorrect=(last?.questions||[]).filter(q=>set.has(q.id));if(incorrect.length)newSession(incorrect);});
setup();
})();
