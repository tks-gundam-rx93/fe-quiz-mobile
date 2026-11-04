(()=> {
"use strict";
const BANK={A:window.IPA26_A||[],B:window.IPA26_B||[]};
if(BANK.A.length!==60||BANK.B.length!==20)throw Error("IPA問題集データが不完全です。ページを再読み込みしてください。");
const STORAGE="fe-ipa-2026-pub-v1";
const letters=["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ"];
const el=id=>document.getElementById(id);
const getState=()=>{try{return JSON.parse(localStorage.getItem(STORAGE)||"{}")}catch(_){return {}}};
const state=getState();
state.last=state.last||{};
state.runs=Number.isInteger(state.runs)?state.runs:0;
let session=state.session&&Array.isArray(state.session.questions)?state.session:null;
let clock=null;
const bankOf=s=>BANK[s]||BANK.A;
const category=q=>q.category.split("・")[0];
const find=id=>[...BANK.A,...BANK.B].find(q=>q.id===id);
const save=()=>{state.session=session;try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch(_){el("ipaPreview").textContent="ブラウザの保存容量を確認してください。"}};
const format=ms=>{const x=Math.max(0,Math.ceil(ms/1000));return String(Math.floor(x/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0")};
const append=(host,tag,textValue,className)=>{const node=document.createElement(tag);if(textValue!==undefined)node.textContent=String(textValue);if(className)node.className=className;host.appendChild(node);return node};
const show=id=>{["ipaMenu","ipaQuiz","ipaResult"].forEach(v=>el(v).hidden=v!==id);if(typeof window.scrollTo==="function")window.scrollTo(0,0);};
const stopClock=()=>{if(clock!==null){clearInterval(clock);clock=null}};
const eligible=()=>{
 const s=el("ipaSection").value,cat=el("ipaCategory").value;
 const prior=state.last[s],missed=new Set(prior?.wrongIds||[]);
 return bankOf(s).filter(q=>(cat==="all"||category(q)===cat)&&(!el("ipaWeakOnly").checked||missed.has(q.id)));
};
function choicesForCount(){
 const possible=eligible(),old=Number(el("ipaCount").value),counts=[1,3,5,10,20,40,60,possible.length]
  .filter((n,i,a)=>n<=possible.length&&a.indexOf(n)===i).sort((a,b)=>a-b);
 const sel=el("ipaCount");sel.replaceChildren();
 counts.forEach(n=>{const opt=document.createElement("option");opt.value=String(n);opt.textContent=n+"問";sel.appendChild(opt)});
 sel.value=String(counts.includes(old)?old:(counts.includes(10)?10:counts[counts.length-1]||""));
 el("ipaStartBtn").disabled=possible.length===0;
 const s=el("ipaSection").value,total=bankOf(s).length;
 const duration=s==="A"?90:100;
 el("ipaPreview").textContent=possible.length?
  "対象"+possible.length+"問から"+sel.value+"問を出題（演習時間"+Math.ceil(duration*Number(sel.value)/total)+"分）。本番形式は"+total+"問・"+duration+"分。":
  "この条件に該当する誤答がありません。分野や絞り込みを変更してください。";
}
function refreshSetup(){
 const select=el("ipaCategory"),s=el("ipaSection").value,was=select.value;
 const cats=["all",...new Set(bankOf(s).map(category))];
 select.replaceChildren();
 cats.forEach(c=>{const opt=document.createElement("option");opt.value=c;opt.textContent=c==="all"?"全分野":c;select.appendChild(opt)});
 select.value=cats.includes(was)?was:"all";
 choicesForCount();
 const last=state.last[s];
 el("ipaLastBtn").hidden=!last;
 el("ipaResumeBtn").hidden=!(session&&!session.done);
 const lastMessage=last?"直近の結果："+last.correct+"/"+last.total+"問正解、未正解"+last.wrongIds.length+"問。":"まだ学習結果がありません。";
 el("ipaDashboard").textContent=lastMessage;
}
function setup(){stopClock();show("ipaMenu");refreshSetup()}
function quizFromQuestions(qs,section){
 if(!qs.length)return;
 stopClock();state.runs++;
 const shuffled=qs.map((q,i)=>{
  const offset=(state.runs+i)%q.options.length;
  return {id:q.id,order:q.options.map((_,n)=>(n+offset)%q.options.length)};
 });
 const limit=section==="A"?90:100;
 const duration=Math.ceil(limit*qs.length/bankOf(section).length);
 session={section,questions:shuffled,answers:{},index:0,deadline:Date.now()+duration*60*1000,done:false};
 save();run();
}
function begin(){
 const pool=eligible(),n=Math.min(pool.length,Number(el("ipaCount").value)||10);
 if(!n)return;
 const start=state.runs%pool.length;
 const rotated=[...pool.slice(start),...pool.slice(0,start)];
 const selected=Array.from({length:n},(_,i)=>rotated[Math.floor((i+.5)*pool.length/n)]);
 quizFromQuestions(selected,el("ipaSection").value);
}
function resume(){if(session&&!session.done){run()}else setup()}
function timeTick(){
 if(!session||session.done){stopClock();return}
 const left=session.deadline-Date.now();
 el("ipaClock").textContent=left<=0?"00:00":format(left);
 el("ipaClock").title=left<=0?"目安時間を超えています。解答は続けられます。":"目安の残り時間";
}
function run(){
 if(!session||!session.questions.length){setup();return}
 show("ipaQuiz");render();
 stopClock();timeTick();clock=setInterval(timeTick,1000);
}
function currentData(){
 const v=session.questions[session.index],q=find(v.id);
 if(!q)throw Error("問題データが見つかりません");
 return {q,order:v.order};
}
function render(){
 const {q,order}=currentData(),n=session.questions.length,a=session.answers;
 el("ipaProgress").textContent="科目"+session.section+"　"+(session.index+1)+" / "+n+"問（回答"+Object.keys(a).length+"問）";
 el("ipaProgressBar").style.width=(100*(session.index+1)/n)+"%";
 el("ipaBadge").textContent="科目"+session.section;
 el("ipaTopic").textContent=q.category;
 el("ipaPattern").textContent=q.pattern;
 el("ipaPrompt").textContent=q.question;
 el("ipaCode").textContent=q.code||"";
 el("ipaCode").hidden=!q.code;
 const target=el("ipaOptions");target.replaceChildren();
 order.forEach((original,i)=>{
  const b=document.createElement("button");b.type="button";
  b.className="option-btn"+(a[q.id]===original?" selected":"");
  b.setAttribute("aria-pressed",String(a[q.id]===original));
  append(b,"span",letters[i],"choice-letter");
  append(b,"span",q.options[original]);
  b.addEventListener("click",()=>{
   session.answers[q.id]=original;
   save();render();
  });
  target.appendChild(b);
 });
 el("ipaPrevBtn").disabled=session.index===0;
 el("ipaNextBtn").textContent=session.index===n-1?"最初の問題へ":"次の問題へ";
 el("ipaAnswerState").textContent=a[q.id]===undefined?"未回答（あとから戻れます）":"回答済み";
}
function move(n){
 if(!session||session.done)return;
 const len=session.questions.length;
 session.index=n>0&&session.index===len-1?0:Math.min(len-1,Math.max(0,session.index+n));
 save();render();if(typeof window.scrollTo==="function")window.scrollTo(0,0);
}
function grade(){
 if(!session)return;
 stopClock();
 const results=session.questions.map(v=>{
  const q=find(v.id),answer=session.answers[v.id];
  return {q,order:v.order,answer,correct:answer===q.correct};
 });
 const wrong=results.filter(x=>!x.correct),ok=results.length-wrong.length;
 const snapshot={
  section:session.section,
  questions:session.questions,
  answers:{...session.answers},
  correct:ok,total:results.length,wrongIds:wrong.map(x=>x.q.id),
  submittedAt:new Date().toISOString()
 };
 state.last[session.section]=snapshot;
 session.done=true;save();
 result(snapshot);
}
function result(snapshot){
 if(!snapshot){setup();return}
 stopClock();show("ipaResult");
 const records=snapshot.questions.map(v=>{
  const q=find(v.id);return {q,order:v.order,answer:snapshot.answers[v.id],correct:snapshot.answers[v.id]===q.correct};
 });
 const root=el("ipaResultSummary");root.replaceChildren();
 append(root,"h3","科目"+snapshot.section+"・第13回（IPA公開問題対策）");
 append(root,"p",snapshot.correct+" / "+snapshot.total+"問正解（"+Math.round(100*snapshot.correct/snapshot.total)+"%）","ipa-summary-score");
 append(root,"p","未正解 "+snapshot.wrongIds.length+"問（未回答を含む）。この割合は独自練習問題の正答率であり、CBTの評価点とは異なります。","ipa-muted");
 const missed=records.filter(x=>!x.correct),cat=new Map();
 missed.forEach(x=>cat.set(category(x.q),(cat.get(category(x.q))||0)+1));
 const weak=el("ipaWeakness");weak.replaceChildren();
 if(!missed.length)append(weak,"p","全問正解です。","ipa-muted");
 else [...cat].sort((a,b)=>b[1]-a[1]).forEach(([name,count])=>append(weak,"div",name+"："+count+"問","ipa-weak-item"));
 const list=el("ipaExplanations");list.replaceChildren();
 records.forEach((x,i)=>{
  const d=append(list,"details");
  if(!x.correct)d.open=true;
  const summary=append(d,"summary","問"+(i+1)+" "+(x.correct?"正解":"要復習")+"｜"+x.q.category);
  append(summary,"span",x.q.question);
  const body=append(d,"div",undefined,"ipa-detail");
  append(body,"p","あなたの回答："+(x.answer===undefined?"未回答":letters[x.order.indexOf(x.answer)]+"．"+x.q.options[x.answer]));
  append(body,"p","正解："+letters[x.order.indexOf(x.q.correct)]+"．"+x.q.options[x.q.correct]);
  if(x.q.code)append(body,"pre",x.q.code);
  append(body,"p","解説："+x.q.explain);
 });
 el("ipaRetryBtn").hidden=missed.length===0;
}
function retry(){
 const s=el("ipaSection").value,last=state.last[s];
 if(!last||!last.wrongIds.length)return;
 quizFromQuestions(last.wrongIds.map(find).filter(Boolean),s);
}
el("ipaSection").addEventListener("change",()=>{el("ipaCategory").value="all";refreshSetup()});
el("ipaCategory").addEventListener("change",choicesForCount);
el("ipaWeakOnly").addEventListener("change",choicesForCount);
el("ipaCount").addEventListener("change",choicesForCount);
el("ipaStartBtn").addEventListener("click",begin);
el("ipaResumeBtn").addEventListener("click",resume);
el("ipaLastBtn").addEventListener("click",()=>result(state.last[el("ipaSection").value]));
el("ipaPrevBtn").addEventListener("click",()=>move(-1));
el("ipaNextBtn").addEventListener("click",()=>move(1));
el("ipaFinishBtn").addEventListener("click",grade);
el("ipaLeaveBtn").addEventListener("click",setup);
el("ipaRetryBtn").addEventListener("click",retry);
el("ipaResultMenuBtn").addEventListener("click",setup);
window.addEventListener("pagehide",()=>save());
setup();
})();