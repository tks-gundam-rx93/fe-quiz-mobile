(() => {
  const questions = window.FE_QUESTIONS || [];
  const terms = window.FE_TERMS || [];
  const QUIZ_ROUND = 4;
  const QUIZ_KEY = `fe-quiz-mobile-round-${QUIZ_ROUND}`;
  const DRILL_KEY = "fe-term-drill-v1";
  const SESSION_SIZE = 20;
  const el = id => document.getElementById(id);

  const views = ["homeView","quizView","drillView","drillResultView","resultView","overviewView"];
  function showView(id){ views.forEach(v => el(v).hidden = v !== id); }
  function setTitle(text){ el("appTitle").textContent = text; }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function toast(message) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = message;
    document.body.appendChild(t); setTimeout(() => t.remove(), 1800);
  }

  // -------------------- 通常予測問題 --------------------
  const quizState = loadQuizState();
  let current = Math.min(quizState.current || 0, Math.max(questions.length - 1, 0));
  function blankQuizState(){ return {answers:{}, review:{}, current:0}; }
  function loadQuizState(){
    try { return Object.assign(blankQuizState(), JSON.parse(localStorage.getItem(QUIZ_KEY) || "{}")); }
    catch(_) { return blankQuizState(); }
  }
  function saveQuizState(){ quizState.current = current; localStorage.setItem(QUIZ_KEY, JSON.stringify(quizState)); }
  function renderQuiz(){
    if(!questions.length) return;
    const q = questions[current];
    const answered = Object.keys(quizState.answers).filter(k => quizState.answers[k] !== undefined).length;
    el("counter").textContent = `問題 ${current+1} / ${questions.length}`;
    el("answeredCount").textContent = `回答済み ${answered} / ${questions.length}`;
    el("progressBar").style.width = `${((current+1)/questions.length)*100}%`;
    el("sectionBadge").textContent = `科目${q.section}`;
    el("categoryBadge").textContent = q.category;
    el("importanceBadge").textContent = `重要度 ${q.importance}`;
    el("questionText").textContent = `問${q.id}　${q.question}`;
    const code = el("codeBlock");
    if(q.code){ code.hidden=false; code.textContent=q.code; } else { code.hidden=true; code.textContent=""; }
    const options = el("options"); options.innerHTML="";
    q.options.forEach((text,idx)=>{
      const btn=document.createElement("button"); btn.type="button";
      btn.className="option-btn"+(quizState.answers[q.id]===idx?" selected":"");
      btn.innerHTML=`<span class="choice-letter">${String.fromCharCode(65+idx)}</span><span>${escapeHtml(text)}</span>`;
      btn.addEventListener("click",()=>{ quizState.answers[q.id]=idx; saveQuizState(); renderQuiz(); });
      options.appendChild(btn);
    });
    el("reviewFlag").checked=!!quizState.review[q.id];
    el("prevBtn").disabled=current===0;
    el("nextBtn").textContent=current===questions.length-1?"先頭へ ↺":"次へ →";
    saveQuizState();
  }
  function goQuiz(delta){
    if(delta>0 && current===questions.length-1) current=0;
    else current=Math.max(0,Math.min(questions.length-1,current+delta));
    renderQuiz(); window.scrollTo({top:0,behavior:"smooth"});
  }
  function showOverview(){
    showView("overviewView"); setTitle(`予測問題　第${QUIZ_ROUND}回`);
    const grid=el("overviewGrid"); grid.innerHTML="";
    questions.forEach((q,idx)=>{
      const btn=document.createElement("button"); btn.type="button";
      const classes=["overview-item"];
      if(quizState.answers[q.id]!==undefined) classes.push("answered");
      if(quizState.review[q.id]) classes.push("review");
      if(idx===current) classes.push("current");
      btn.className=classes.join(" "); btn.textContent=q.id;
      btn.addEventListener("click",()=>{ current=idx; showView("quizView"); renderQuiz(); });
      grid.appendChild(btn);
    });
  }
  function showSubmit(){
    const lines=[`FE予測問題 第${QUIZ_ROUND}回 回答`];
    questions.forEach(q=>{
      const a=quizState.answers[q.id];
      lines.push(`問${q.id}. ${a===undefined?"未回答":String.fromCharCode(65+a)}`);
    });
    const reviewIds=questions.filter(q=>quizState.review[q.id]).map(q=>`問${q.id}`);
    if(reviewIds.length) lines.push("",`見直し指定: ${reviewIds.join(", ")}`);
    el("resultText").value=lines.join("\n");
    showView("resultView"); setTitle(`予測問題　第${QUIZ_ROUND}回`); window.scrollTo({top:0,behavior:"smooth"});
  }
  async function copyResult(){
    const text=el("resultText").value;
    try{ await navigator.clipboard.writeText(text); toast("回答をコピーしました"); }
    catch(_){ el("resultText").focus(); el("resultText").select(); document.execCommand("copy"); toast("回答をコピーしました"); }
  }

  // -------------------- 科目A 3秒特訓 --------------------
  const drillState = loadDrillState();
  let drillSession=[];
  let drillIndex=0;
  let drillCorrect=0;
  let drillWrong=[];
  let drillAnswered=false;
  let timerId=null;
  let timerValue=3;

  function blankDrillState(){ return {items:{}, attempts:0, correct:0}; }
  function loadDrillState(){
    try { return Object.assign(blankDrillState(), JSON.parse(localStorage.getItem(DRILL_KEY) || "{}")); }
    catch(_) { return blankDrillState(); }
  }
  function saveDrillState(){ localStorage.setItem(DRILL_KEY, JSON.stringify(drillState)); }
  function itemStat(id){
    if(!drillState.items[id]) drillState.items[id]={level:0,due:0,attempts:0,correct:0,last:0};
    return drillState.items[id];
  }
  function dueCount(){
    const now=Date.now();
    return terms.filter(t=>!drillState.items[t.id] || (drillState.items[t.id].due||0)<=now).length;
  }
  function renderHomeStats(){
    el("drillAttempts").textContent=drillState.attempts||0;
    el("drillAccuracy").textContent=drillState.attempts?`${Math.round((drillState.correct/drillState.attempts)*100)}%`:"-";
    el("drillDue").textContent=dueCount();
  }
  function buildSession(source){
    if(source && source.length) return source.slice();
    const now=Date.now();
    const scored=terms.map(t=>{
      const s=drillState.items[t.id]||{level:0,due:0,attempts:0,correct:0,last:0};
      const isDue=(s.due||0)<=now;
      const accuracy=s.attempts?s.correct/s.attempts:0;
      return {t,score:(isDue?10000:0)+(1-accuracy)*1000+(3-(s.level||0))*100-(s.last||0)/1e12};
    });
    scored.sort((a,b)=>b.score-a.score);
    return scored.slice(0,Math.min(SESSION_SIZE,scored.length)).map(x=>x.t);
  }
  function startDrill(source){
    drillSession=buildSession(source); drillIndex=0; drillCorrect=0; drillWrong=[]; drillAnswered=false;
    showView("drillView"); setTitle("科目A　3秒特訓"); renderDrill();
  }
  function startTimer(){
    clearInterval(timerId); timerValue=3; el("drillTimer").textContent="3"; el("drillTimer").classList.remove("expired");
    timerId=setInterval(()=>{
      if(drillAnswered){ clearInterval(timerId); return; }
      timerValue--;
      if(timerValue>0) el("drillTimer").textContent=String(timerValue);
      else { el("drillTimer").textContent="!"; el("drillTimer").classList.add("expired"); clearInterval(timerId); }
    },1000);
  }
  function renderDrill(){
    if(!drillSession.length){ finishDrill(); return; }
    const q=drillSession[drillIndex]; drillAnswered=false;
    el("drillCounter").textContent=`問題 ${drillIndex+1} / ${drillSession.length}`;
    el("drillScore").textContent=`正解 ${drillCorrect}`;
    el("drillProgressBar").style.width=`${((drillIndex+1)/drillSession.length)*100}%`;
    el("drillCategory").textContent=q.cat;
    el("drillPrompt").textContent=q.prompt;
    el("drillFeedback").hidden=true; el("drillNextBtn").hidden=true;
    const box=el("drillOptions"); box.innerHTML="";
    q.options.forEach((text,idx)=>{
      const btn=document.createElement("button"); btn.type="button"; btn.className="option-btn";
      btn.innerHTML=`<span class="choice-letter">${String.fromCharCode(65+idx)}</span><span>${escapeHtml(text)}</span>`;
      btn.addEventListener("click",()=>answerDrill(idx)); box.appendChild(btn);
    });
    startTimer();
  }
  function answerDrill(idx){
    if(drillAnswered) return; drillAnswered=true; clearInterval(timerId);
    const q=drillSession[drillIndex]; const correct=idx===q.answer;
    const stat=itemStat(q.id); stat.attempts++; stat.last=Date.now(); drillState.attempts++;
    if(correct){
      drillCorrect++; stat.correct++; drillState.correct++; stat.level=Math.min(3,(stat.level||0)+1);
      const days=[0,1,3,7][stat.level]; stat.due=Date.now()+days*86400000;
    }else{
      stat.level=0; stat.due=Date.now(); drillWrong.push(q);
    }
    saveDrillState();
    [...el("drillOptions").children].forEach((btn,i)=>{
      btn.disabled=true;
      if(i===q.answer) btn.classList.add("correct-choice");
      if(i===idx && !correct) btn.classList.add("wrong-choice");
    });
    el("feedbackTitle").textContent=correct?"○ 正解":"× 正解は「"+q.options[q.answer]+"」";
    el("feedbackExplain").textContent=q.explain;
    el("feedbackContrast").textContent=q.contrast;
    el("drillFeedback").hidden=false; el("drillNextBtn").hidden=false;
    el("drillScore").textContent=`正解 ${drillCorrect}`;
  }
  function nextDrill(){
    if(!drillAnswered) return;
    if(drillIndex>=drillSession.length-1){ finishDrill(); return; }
    drillIndex++; renderDrill();
  }
  function finishDrill(){
    clearInterval(timerId);
    showView("drillResultView"); setTitle("科目A　3秒特訓");
    const total=drillSession.length; const pct=total?Math.round(drillCorrect/total*100):0;
    el("drillResultSummary").innerHTML=`<div class="score-big">${drillCorrect} / ${total}</div><p>正答率 <strong>${pct}%</strong></p><p>間違い ${drillWrong.length}問。正解した用語は1日→3日→7日後へ復習間隔を伸ばします。</p>`;
    el("retryWrongBtn").hidden=drillWrong.length===0;
    renderHomeStats();
  }
  function goHome(){ clearInterval(timerId); showView("homeView"); setTitle("学習メニュー"); renderHomeStats(); }

  // -------------------- イベント --------------------
  el("homeBtn").addEventListener("click",goHome);
  el("startQuizBtn").addEventListener("click",()=>{ showView("quizView"); setTitle(`予測問題　第${QUIZ_ROUND}回`); renderQuiz(); });
  el("startDrillBtn").addEventListener("click",()=>startDrill());
  el("prevBtn").addEventListener("click",()=>goQuiz(-1));
  el("nextBtn").addEventListener("click",()=>goQuiz(1));
  el("overviewBtn")?.addEventListener("click",showOverview);
  // indexの右上はホームボタンに変更したため、問題一覧は提出ボタン長押しではなく下記ダブルクリックでも呼び出せるようにしない。
  el("closeOverviewBtn").addEventListener("click",()=>{ showView("quizView"); renderQuiz(); });
  el("submitBtn").addEventListener("click",showSubmit);
  el("copyBtn").addEventListener("click",copyResult);
  el("backBtn").addEventListener("click",()=>{ showView("quizView"); renderQuiz(); });
  el("reviewFlag").addEventListener("change",e=>{ const q=questions[current]; quizState.review[q.id]=e.target.checked; saveQuizState(); });
  el("drillNextBtn").addEventListener("click",nextDrill);
  el("endDrillBtn").addEventListener("click",finishDrill);
  el("retryWrongBtn").addEventListener("click",()=>startDrill(drillWrong));
  el("drillHomeBtn").addEventListener("click",goHome);

  renderHomeStats();
  goHome();
})();
