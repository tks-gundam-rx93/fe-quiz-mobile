(() => {
 "use strict";
 const bank = window.FE12_B || [], cases = window.FE_B_READING_CASES || [];
 if(bank.length !== 20 || cases.length !== 20) throw Error("科目B読解特訓の問題データを読み込めません");
 const byId = new Map(bank.map(q=>[q.id,q]));
 const byCase = new Map(cases.map(c=>[60+c.n,c]));
 const storageKey = "fe-b-reading-v1";
 const letters = ["ア","イ","ウ","エ"];
 const phases = ["question","role","trace","choice"];
 const phaseName = {question:"① 設問先読み",role:"② 関数・処理の役割",trace:"③ トレース",choice:"④ 最終解答"};
 const el = id => document.getElementById(id);
 const get = (id) => byId.get(id);
 const meta = (id) => byCase.get(id);
 const read = () => { try {return JSON.parse(localStorage.getItem(storageKey)) || {};}catch(_){return {};}};
 const state = read();
 let history = Array.isArray(state.history) ? state.history : [];
 let session = state.session && Array.isArray(state.session.ids) && state.session.ids.every(id=>byId.has(id)) ? state.session : null;
 let activeSince = null;
 let clockHandle = null;
 const now = () => performance.now();
 const save = () => { try {localStorage.setItem(storageKey, JSON.stringify({history:history.slice(-500),session}));}catch(_){el("readingMenuHint").textContent="保存容量を確認してください。進捗を記録できません。";} };
 const text = (id,value) => {el(id).textContent=String(value);};
 const sec = ms => Math.round((ms||0)/1000);
 const format = ms => {let s = Math.max(0,Math.floor((ms||0)/1000));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");};
 const current = () => session ? session.entries[session.cursor] : null;
 const qNow = () => get(session.ids[session.cursor]);
 const cNow = () => meta(session.ids[session.cursor]);
 const roleCorrect = c => (4-(c.n%4))%4;
 const isWeak = a => !a || !a.correct || !a.roleOk || a.understandMs>90000 || a.solveMs>180000;
 const weakReason = a => {
  const flags=[];
  if(a.skipped) flags.push("保留");
  else if(!a.correct) flags.push("解答ミス");
  if(!a.roleOk) flags.push("役割判定ミス");
  if(a.understandMs>90000) flags.push("理解90秒超");
  if(a.solveMs>180000) flags.push("解答180秒超");
  return flags;
 };
 const latest = () => {const map=new Map();history.forEach(h=>map.set(h.id,h));return map;};
 function display(target){
  ["readingMenu","readingDrill","readingFeedback","readingResult"].forEach(id=>el(id).hidden = id!==target);
  if(typeof window.scrollTo==="function") window.scrollTo(0,0);
 }
 function stopTimer(){
  if(activeSince!==null && session){
   const ent=current(), delta=Math.max(0,now()-activeSince);
   if(phases.slice(0,2).includes(session.phase))ent.understandMs+=delta;
   else if(phases.slice(2).includes(session.phase))ent.solveMs+=delta;
  }
  activeSince=null;
  if(clockHandle!==null){clearInterval(clockHandle);clockHandle=null;}
  save();
 }
 function startTimer(){
  if(!session || !phases.includes(session.phase) || document.hidden)return;
  activeSince=now();
  if(clockHandle===null)clockHandle=setInterval(updateClock,500);
  updateClock();
 }
 function updateClock(){
  if(!session)return;
  const ent=current(),delta=activeSince===null?0:Math.max(0,now()-activeSince);
  const understanding=ent.understandMs+(["question","role"].includes(session.phase)?delta:0);
  const solving=ent.solveMs+(["trace","choice"].includes(session.phase)?delta:0);
  text("readingUnderstandTime",format(understanding));
  text("readingSolveTime",format(solving));
 }
 function availableIds(){
  const cat=el("readingCategory").value;
  const weak=el("readingWeakOnly").checked,prev=latest();
  let ids=bank.filter(q=>(cat==="all"||q.category===cat)&&(!weak|| (prev.has(q.id)&&isWeak(prev.get(q.id))))).map(q=>q.id);
  if(weak){
   ids.sort((a,b)=>{
    const p=id=>{let h=prev.get(id);return (!h.correct?5:0)+(!h.roleOk?3:0)+Math.min(4,Math.floor(h.understandMs/90000))+Math.min(3,Math.floor(h.solveMs/180000));};
    return p(b)-p(a);
   });
  }
  return ids;
 }
 function countOptions(){
  const ids=availableIds(),select=el("readingCount"),old=Number(select.value);
  const sizes=[1,3,5,10,15,20,ids.length].filter((n,i,a)=>n<=ids.length && a.indexOf(n)===i).sort((a,b)=>a-b);
  select.replaceChildren();
  sizes.forEach(n=>{const opt=document.createElement("option");opt.value=String(n);opt.textContent=n+"問";select.appendChild(opt);});
  select.value=String(sizes.includes(old)?old:(sizes.includes(5)?5:sizes[sizes.length-1]||""));
  el("readingStartBtn").disabled=ids.length===0;
  const weak=el("readingWeakOnly").checked;
  text("readingMenuHint",ids.length ? "対象："+ids.length+"問。選択した"+select.value+"問を出題します。"+(weak?" 直近の弱点を優先します。":"") :
   "この条件で再出題できる弱点がありません。全問題に切り替えるか別の分野を選んでください。");
 }
 function dashboard(){
  const map=latest(),values=[...map.values()], attempts=history.length;
  if(!attempts){text("readingDashboard","まだ学習履歴がありません。まずは5問で読解の時間を計測しましょう。");return;}
  const n=values.length,correct=values.filter(v=>v.correct).length;
  const slow=values.filter(v=>v.understandMs>90000).length;
  const weak=values.filter(isWeak).length;
  const sum=values.reduce((s,v)=>s+v.understandMs,0);
  text("readingDashboard","累計"+attempts+"回／直近"+n+"問中 "+correct+"問正解／読解90秒超 "+slow+"問／弱点 "+weak+"問／平均理解 "+format(sum/n));
 }
 function menu(){
  stopTimer();
  display("readingMenu");
  const canResume=!!session&&!session.done;
  el("readingResumeBtn").hidden=!canResume;
  el("readingResetBtn").hidden=!canResume;
  countOptions();dashboard();
 }
 function makeEntry(id){
  return {id,understandMs:0,solveMs:0,roleIndex:null,answerIndex:null,trace:[],completed:false,skipped:false};
 }
 function newSession(ids){
  stopTimer();
  if(!ids.length)return;
  session={ids:ids.slice(),entries:ids.map(makeEntry),cursor:0,phase:"question",done:false,createdAt:Date.now()};
  save();drill();
 }
 function choose(){
  const ids=availableIds(),n=Math.min(Number(el("readingCount").value)||5,ids.length);
  newSession(ids.slice(0,n));
 }
 function resume(){
  if(!session||session.done){menu();return;}
  if(session.phase==="feedback"){feedback();return;}
  drill();
 }
 function reset(){
  stopTimer();session=null;save();menu();
 }
 function roleOptions(c,ent){
  const host=el("readingRoleOptions");host.replaceChildren();
  const shift=c.n%4;
  for(let i=0;i<4;i++){
   const button=document.createElement("button");
   button.type="button";
   button.className="option-btn"+(ent.roleIndex===i?" selected":"");
   button.setAttribute("aria-pressed",String(ent.roleIndex===i));
   button.textContent=letters[i]+"．"+c.roles[(i+shift)%4];
   button.addEventListener("click",()=>{ent.roleIndex=i;save();drill();});
   host.appendChild(button);
  }
 }
 function answerOptions(q,ent){
  const host=el("readingAnswerOptions");host.replaceChildren();
  q.options.forEach((option,i)=>{
   const button=document.createElement("button");button.type="button";
   button.className="option-btn"+(ent.answerIndex===i?" selected":"");
   button.setAttribute("aria-pressed",String(ent.answerIndex===i));
   button.textContent=letters[i]+"．"+option;
   button.addEventListener("click",()=>{ent.answerIndex=i;save();drill();});
   host.appendChild(button);
  });
 }
 function ensureTrace(ent,c){
  if(!Array.isArray(ent.trace))ent.trace=[];
  while(ent.trace.length<Math.min(3,c.trace.length))ent.trace.push(c.cols.map(()=>""));
 }
 function traceEditor(c,ent){
  ensureTrace(ent,c);
  const root=el("readingTraceEditor");root.replaceChildren();
  for(let ri=0;ri<ent.trace.length;ri++){
   const wrap=document.createElement("div");wrap.className="reading-trace-row";
   const rowName=document.createElement("span");rowName.className="reading-trace-row-num";rowName.textContent=String(ri+1);wrap.appendChild(rowName);
   const cells=document.createElement("div");cells.className="reading-trace-fields";
   c.cols.forEach((col,ci)=>{
    const label=document.createElement("label");label.className="reading-trace-field";label.textContent=col;
    const input=document.createElement("input");input.className="reading-trace-input";input.type="text";input.autocomplete="off";
    input.value=String(ent.trace[ri][ci]||"");input.setAttribute("aria-label","行"+(ri+1)+" "+col);
    input.addEventListener("input",()=>{ent.trace[ri][ci]=input.value;save();});
    label.appendChild(input);cells.appendChild(label);
   });
   wrap.appendChild(cells);root.appendChild(wrap);
  }
  el("readingAddRowBtn").disabled=ent.trace.length>=12;
 }
 function drill(){
  display("readingDrill");
  const ent=current(),q=qNow(),c=cNow(),phase=session.phase;
  text("readingProgress","第"+(session.cursor+1)+"問 / "+session.ids.length);
  el("readingProgressBar").style.width=((session.cursor+1)/session.ids.length*100)+"%";
  text("readingStep",phaseName[phase]);
  text("readingTopic",q.category);
  text("readingStageTag",phaseName[phase]);
  text("readingQuestion",q.question);
  text("readingCode",q.code);
  el("readingCodeBox").hidden=phase==="question";
  el("readingRoleBox").hidden=phase!=="role";
  el("readingTraceBox").hidden=!["trace","choice"].includes(phase);
  el("readingAnswerBox").hidden=phase!=="choice";
  el("readingSkipBtn").hidden=false;
  if(phase==="question"){
   text("readingInstruction","最初は設問だけを読み、「何を求める問題か」を30秒以内に把握してください。まだコードや選択肢は見せません。");
   text("readingNextBtn","コードを表示して役割を判定");
  }else if(phase==="role"){
   text("readingInstruction","コード全体の役割を一言で説明できるか確認してください。正解は解答後に表示します。");
   text("readingRoleTitle",q.category.startsWith("情報セキュリティ")?"本文から分かる対策の要点は？":"この関数・処理の役割は？");
   roleOptions(c,ent);
   text("readingNextBtn","役割を確定してトレースへ");
  }else if(phase==="trace"){
   text("readingInstruction",q.category.startsWith("情報セキュリティ")?"本文の根拠・対策を整理してください。必要なら行を追加できます。":"変化する値だけを表に記録してください。必要なら行を追加できます。");
   text("readingTraceTitle",q.category.startsWith("情報セキュリティ")?"根拠整理表":"変数・戻り値のトレース表");
   traceEditor(c,ent);
   text("readingNextBtn","4択の最終解答へ");
  }else{
   text("readingInstruction","作成した表とコードを照合し、最も適切な選択肢を選んでください。");
   traceEditor(c,ent);answerOptions(q,ent);
   text("readingNextBtn","採点して解説を見る");
  }
  updateClock();
  if(activeSince===null)startTimer();
 }
 function next(){
  if(!session||session.done)return;
  const phase=session.phase,ent=current();
  if(phase==="role"&&ent.roleIndex===null){
   text("readingInstruction","関数・処理の役割を1つ選択してから進んでください。");return;
  }
  if(phase==="choice"){
   if(ent.answerIndex===null){text("readingInstruction","最終解答を1つ選択してください。保留する場合は下のボタンを使用してください。");return;}
   finishQuestion(false);return;
  }
  stopTimer();
  session.phase=phases[phases.indexOf(phase)+1];
  save();drill();
 }
 function record(ent,q,c){
  const row={id:q.id,category:q.category,correct:ent.answerIndex===q.correct,
   roleOk:ent.roleIndex===roleCorrect(c),understandMs:Math.round(ent.understandMs),
   solveMs:Math.round(ent.solveMs),skipped:ent.skipped,at:Date.now()};
  history.push(row);
  if(history.length>500)history=history.slice(-500);
  return row;
 }
 function finishQuestion(skipped){
  if(!session || current().completed)return;
  stopTimer();
  const ent=current(),q=qNow(),c=cNow();
  ent.skipped=!!skipped;ent.completed=true;ent.result=record(ent,q,c);
  session.phase=skipped?"skipped":"feedback";save();
  if(skipped)advance();else feedback();
 }
 function feedback(){
  stopTimer();
  display("readingFeedback");
  const ent=current(),q=qNow(),c=cNow(),roleIndex=roleCorrect(c);
  const ok=ent.answerIndex===q.correct, roleOk=ent.roleIndex===roleIndex;
  text("readingFeedbackTitle",ok?"正解です":"解答を確認しましょう");
  const sum=el("readingFeedbackSummary");sum.replaceChildren();
  const grid=document.createElement("div");grid.className="reading-summary-grid";
  for(const [title,value] of [
    ["理解にかかった時間",format(ent.understandMs)],["解答にかかった時間",format(ent.solveMs)],
    ["役割の判定",roleOk?"正解":"要復習"],["最終解答",ok?"正解":"不正解"]]){
   const card=document.createElement("div");card.className="reading-summary-tile";
   const small=document.createElement("small");small.textContent=title;
   const strong=document.createElement("strong");strong.textContent=value;card.append(small,strong);grid.appendChild(card);
  }
  sum.appendChild(grid);
  text("readingRoleFeedback",c.roles[0]+(roleOk?"（役割を正しく把握できました）":"（選んだ役割と比較してください）"));
  const root=el("readingTraceReference");root.replaceChildren();
  c.trace.forEach((values)=>{
   const row=document.createElement("div");row.className="reading-reference-row";
   values.forEach((v,ci)=>{
    const box=document.createElement("div");box.className="reading-reference-item";
    const small=document.createElement("small");small.textContent=c.cols[ci];
    const value=document.createElement("span");value.textContent=v;box.append(small,value);row.appendChild(box);
   });root.appendChild(row);
  });
  text("readingExplain","正解："+letters[q.correct]+"．"+q.options[q.correct]+"\n"+q.explain);
  text("readingHint","読み方のコツ："+c.hint);
  text("readingContinueBtn",session.cursor===session.ids.length-1?"結果と弱点分析を見る":"次の問題へ");
 }
 function skip(){finishQuestion(true);}
 function advance(){
  stopTimer();
  if(session.cursor+1>=session.ids.length){session.done=true;session.phase="done";save();result();return;}
  session.cursor++;session.phase="question";save();drill();
 }
 function result(){
  stopTimer();
  display("readingResult");
  const all=session.entries.filter(e=>e.completed&&e.result),weak=all.filter(e=>isWeak(e.result));
  const good=all.filter(e=>e.result.correct).length;
  const average=(key)=>all.length?all.reduce((n,e)=>n+e.result[key],0)/all.length:0;
  const summary=el("readingResultSummary");summary.replaceChildren();
  const h=document.createElement("h3");h.textContent="今回の結果";summary.appendChild(h);
  for(const [label,value] of [
    ["正解数",good+" / "+all.length+"問"],["平均理解時間",format(average("understandMs"))],
    ["平均解答時間",format(average("solveMs"))],["弱点のある問題",weak.length+"問"]]){
   const row=document.createElement("div");row.className="stats-row";
   const x=document.createElement("span");x.textContent=label;
   const y=document.createElement("strong");y.textContent=value;
   row.append(x,y);summary.appendChild(row);
  }
  const list=el("readingWeaknessList");list.replaceChildren();
  const head=document.createElement("h3");head.textContent="分野別の弱点分析";list.appendChild(head);
  if(!weak.length){const p=document.createElement("p");p.textContent="今回の演習では誤答・役割判定ミス・時間超過の対象はありません。";list.appendChild(p);}
  else{
   const groups=new Map();
   weak.forEach(e=>{const cat=get(e.id).category;groups.set(cat,(groups.get(cat)||0)+1);});
   [...groups].sort((a,b)=>b[1]-a[1]).forEach(([cat,n])=>{
    const line=document.createElement("p");line.className="reading-result-weak";
    const strong=document.createElement("strong");strong.textContent=cat+"："+n+"問";
    line.appendChild(strong);list.appendChild(line);
   });
   weak.forEach(e=>{
    const row=document.createElement("div");row.className="reading-result-weak";
    const a=document.createElement("strong");a.textContent="問"+(e.id-60)+" "+get(e.id).category;
    const b=document.createElement("small");
    b.textContent=weakReason(e.result).join("・")+"／理解 "+format(e.result.understandMs)+"／解答 "+format(e.result.solveMs);
    row.append(a,b);list.appendChild(row);
   });
  }
  el("readingRetryBtn").hidden=weak.length===0;
 }
 function retry(){
  if(!session)return;
  const ids=session.entries.filter(e=>e.result&&isWeak(e.result)).map(e=>e.id);
  newSession(ids);
 }
 el("readingCategory").appendChild((()=>{
   const opt=document.createElement("option");opt.value="all";opt.textContent="全分野";return opt;
 })());
 [...new Set(bank.map(q=>q.category))].forEach(cat=>{
  const opt=document.createElement("option");opt.value=cat;opt.textContent=cat;el("readingCategory").appendChild(opt);
 });
 el("readingCategory").value="all";
 el("readingCategory").addEventListener("change",countOptions);
 el("readingWeakOnly").addEventListener("change",countOptions);
 el("readingStartBtn").addEventListener("click",choose);
 el("readingResumeBtn").addEventListener("click",resume);
 el("readingResetBtn").addEventListener("click",reset);
 el("readingNextBtn").addEventListener("click",next);
 el("readingSkipBtn").addEventListener("click",skip);
 el("readingBackBtn").addEventListener("click",menu);
 el("readingAddRowBtn").addEventListener("click",()=>{
  const ent=current(),c=cNow();
  if(ent.trace.length>=12)return;
  ent.trace.push(c.cols.map(()=>""));save();traceEditor(c,ent);
 });
 el("readingContinueBtn").addEventListener("click",advance);
 el("readingFeedbackHomeBtn").addEventListener("click",menu);
 el("readingResultHomeBtn").addEventListener("click",menu);
 el("readingRetryBtn").addEventListener("click",retry);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stopTimer();else if(session&&!session.done&&phases.includes(session.phase)&&!el("readingDrill").hidden)startTimer();});
 window.addEventListener("pagehide",()=>stopTimer());
 window.addEventListener("pageshow",()=>{if(session&&phases.includes(session.phase)&&!el("readingDrill").hidden)startTimer();});
 menu();
})();