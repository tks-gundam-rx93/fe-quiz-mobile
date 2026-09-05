(() => {
  const questions = window.FE_QUESTIONS || [];
  const terms = window.FE_TERMS || [];
  const priorityTerms = window.FE_PRIORITY_TERMS || [];
  const comparisons = window.FE_COMPARISONS || [];
  const QUIZ_ROUND = window.FE_ROUND || 4;
  const QUIZ_KEY = `fe-quiz-mobile-round-${QUIZ_ROUND}`;
  const DRILL_KEY = "fe-term-drill-v1";
  const SESSION_SIZE = 20;
  const EXAM_MINUTES={A:90,B:100};
  const el = id => document.getElementById(id);

  const views = ["homeView","quizView","drillView","drillResultView","cramView","cramResultView","resultView","overviewView","statsView"];
  const tabMap={homeView:"tabHome",quizView:"tabQuiz",drillView:"tabDrill",statsView:"tabStats"};
  function showView(id){
    views.forEach(v => el(v).hidden = v !== id);
    Object.values(tabMap).forEach(t=>el(t).classList.remove("active"));
    if(tabMap[id])el(tabMap[id]).classList.add("active");
    window.scrollTo({top:0,behavior:"auto"});
  }
  function setTitle(text){ el("appTitle").textContent = text; }
  function escapeHtml(value){ return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function toast(message){ const t=document.createElement("div"); t.className="toast"; t.textContent=message; document.body.appendChild(t); setTimeout(()=>t.remove(),1800); }
  function shuffledIndexes(n){ const a=Array.from({length:n},(_,i)=>i); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

  function buildExamQuestion(q){
    const p=q.prompt;
    if(q.cat==="ネットワーク") return `ネットワークに関する次の記述に該当するものはどれか。\n「${p}」`;
    if(q.cat==="セキュリティ") return `情報セキュリティに関する次の記述に該当する用語又は仕組みはどれか。\n「${p}」`;
    if(q.cat==="OS") return `OS及び仮想記憶に関する次の記述に該当するものはどれか。\n「${p}」`;
    if(q.cat==="ハードウェア") return `コンピュータのハードウェアに関する次の記述に該当するものはどれか。\n「${p}」`;
    if(q.cat==="DB") return `データベースに関する次の記述に該当するものはどれか。\n「${p}」`;
    if(q.cat==="PM") return `プロジェクトマネジメントに関する次の記述に該当するものはどれか。\n「${p}」`;
    if(q.cat==="ストラテジ") return `企業活動や経営戦略に関する次の記述に該当する分析手法又は用語はどれか。\n「${p}」`;
    if(q.cat==="システム構成") return `システム構成に関する次の記述に該当するものはどれか。\n「${p}」`;
    if(q.cat==="開発") return `システム開発に関する次の記述に該当するものはどれか。\n「${p}」`;
    return `次の記述に該当する用語として、最も適切なものはどれか。\n「${p}」`;
  }

  const quizState=loadQuizState();
  let current=Math.min(quizState.current||0,Math.max(questions.length-1,0));
  let activeSection=questions[current]?.section||"A",examTimerId=null;
  function blankQuizState(){ return {answers:{},review:{},current:0,deadlines:{}}; }
  function loadQuizState(){ try{return Object.assign(blankQuizState(),JSON.parse(localStorage.getItem(QUIZ_KEY)||"{}"));}catch(_){return blankQuizState();} }
  function saveQuizState(){ quizState.current=current; localStorage.setItem(QUIZ_KEY,JSON.stringify(quizState)); }
  function sectionIndexes(section){return questions.map((q,i)=>q.section===section?i:-1).filter(i=>i>=0);}
  function updateExamTimer(){
    quizState.deadlines=quizState.deadlines||{};
    if(!quizState.deadlines[activeSection]){quizState.deadlines[activeSection]=Date.now()+EXAM_MINUTES[activeSection]*60000;saveQuizState();}
    const remain=Math.max(0,quizState.deadlines[activeSection]-Date.now());const minutes=Math.floor(remain/60000);const seconds=Math.floor((remain%60000)/1000);
    el("examTimer").textContent=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;el("examTimer").classList.toggle("expired",remain===0);
  }
  function startExamTimer(){clearInterval(examTimerId);updateExamTimer();examTimerId=setInterval(updateExamTimer,1000);}
  function switchSection(section){activeSection=section;const indexes=sectionIndexes(section);if(!indexes.includes(current))current=indexes[0];renderQuiz();}
  function openExam(){showView("quizView");setTitle(`最終模試　第${QUIZ_ROUND}回`);renderQuiz();}
  function renderQuiz(){
    if(!questions.length)return;
    const q=questions[current];
    activeSection=q.section;const indexes=sectionIndexes(activeSection);const localIndex=indexes.indexOf(current);const answered=indexes.filter(i=>quizState.answers[questions[i].id]!==undefined).length;
    el("counter").textContent=`科目${activeSection}　問題 ${localIndex+1} / ${indexes.length}`;
    el("answeredCount").textContent=`回答済み ${answered} / ${indexes.length}`;
    el("progressBar").style.width=`${((localIndex+1)/indexes.length)*100}%`;
    el("sectionABtn").classList.toggle("active",activeSection==="A");el("sectionBBtn").classList.toggle("active",activeSection==="B");startExamTimer();
    el("sectionBadge").textContent=`科目${q.section}`; el("categoryBadge").textContent=q.category; el("importanceBadge").textContent=`重要度 ${q.importance}`;
    el("questionText").textContent=`問${q.displayNo||q.id}　${q.question}`;
    const code=el("codeBlock"); if(q.code){code.hidden=false;code.textContent=q.code;}else{code.hidden=true;code.textContent="";}
    const options=el("options"); options.innerHTML="";
    q.options.forEach((text,idx)=>{ const btn=document.createElement("button"); btn.type="button"; btn.className="option-btn"+(quizState.answers[q.id]===idx?" selected":""); btn.innerHTML=`<span class="choice-letter">${String.fromCharCode(65+idx)}</span><span>${escapeHtml(text)}</span>`; btn.addEventListener("click",()=>{quizState.answers[q.id]=idx;saveQuizState();renderQuiz();}); options.appendChild(btn); });
    el("reviewFlag").checked=!!quizState.review[q.id];el("prevBtn").disabled=localIndex===0;el("nextBtn").textContent=localIndex===indexes.length-1?(activeSection==="A"?"科目Bへ →":"先頭へ ↺"):"次へ →";saveQuizState();
  }
  function goQuiz(delta){const indexes=sectionIndexes(activeSection);const localIndex=indexes.indexOf(current);if(delta>0&&localIndex===indexes.length-1){if(activeSection==="A")switchSection("B");else{current=indexes[0];renderQuiz();}}else{current=indexes[Math.max(0,Math.min(indexes.length-1,localIndex+delta))];renderQuiz();}window.scrollTo({top:0,behavior:"smooth"});}
  function showOverview(){ showView("overviewView");setTitle(`予測問題　第${QUIZ_ROUND}回`);const grid=el("overviewGrid");grid.innerHTML=""; questions.forEach((q,idx)=>{const btn=document.createElement("button");btn.type="button";const classes=["overview-item"];if(quizState.answers[q.id]!==undefined)classes.push("answered");if(quizState.review[q.id])classes.push("review");if(idx===current)classes.push("current");btn.className=classes.join(" ");btn.textContent=q.id;btn.addEventListener("click",()=>{current=idx;showView("quizView");renderQuiz();});grid.appendChild(btn);}); }
  function showSubmit(){const lines=[`FE最終模試 第${QUIZ_ROUND}回 回答`];["A","B"].forEach(section=>{lines.push("",`科目${section}`);questions.filter(q=>q.section===section).forEach(q=>{const a=quizState.answers[q.id];lines.push(`問${q.displayNo||q.id}. ${a===undefined?"未回答":String.fromCharCode(65+a)}`);});const reviewIds=questions.filter(q=>q.section===section&&quizState.review[q.id]).map(q=>`問${q.displayNo||q.id}`);if(reviewIds.length)lines.push(`見直し指定: ${reviewIds.join(", ")}`);});el("resultText").value=lines.join("\n");showView("resultView");setTitle(`最終模試　第${QUIZ_ROUND}回`);window.scrollTo({top:0,behavior:"smooth"});}
  async function copyResult(){const text=el("resultText").value;try{await navigator.clipboard.writeText(text);toast("回答をコピーしました");}catch(_){el("resultText").focus();el("resultText").select();document.execCommand("copy");toast("回答をコピーしました");}}

  const drillState=loadDrillState();
  let drillSession=[],drillIndex=0,drillCorrect=0,drillWrong=[],drillAnswered=false,timerId=null,timerValue=3;
  function blankDrillState(){return {items:{},attempts:0,correct:0};}
  function loadDrillState(){try{return Object.assign(blankDrillState(),JSON.parse(localStorage.getItem(DRILL_KEY)||"{}"));}catch(_){return blankDrillState();}}
  function saveDrillState(){localStorage.setItem(DRILL_KEY,JSON.stringify(drillState));}
  function itemStat(id){if(!drillState.items[id])drillState.items[id]={level:0,due:0,attempts:0,correct:0,last:0};return drillState.items[id];}
  function dueCount(){const now=Date.now();return terms.filter(t=>!drillState.items[t.id]||(drillState.items[t.id].due||0)<=now).length;}
  function renderHomeStats(){
    const attempts=drillState.attempts||0;
    const accuracy=attempts?`${Math.round((drillState.correct/attempts)*100)}%`:"-";
    const due=dueCount();
    el("drillAttempts").textContent=attempts;el("drillAccuracy").textContent=accuracy;el("drillDue").textContent=due;
    el("statsAttempts").textContent=attempts;el("statsAccuracy").textContent=accuracy;el("statsDue").textContent=due;
  }
  let comparisonCategory="すべて";
  function renderComparisons(){
    const filters=el("comparisonFilters");
    const list=el("comparisonList");
    if(!filters||!list)return;
    const categories=["すべて",...new Set(comparisons.map(x=>x.category))];
    filters.innerHTML="";
    categories.forEach(category=>{
      const btn=document.createElement("button");
      btn.type="button";
      btn.className="filter-chip"+(category===comparisonCategory?" active":"");
      btn.textContent=category;
      btn.addEventListener("click",()=>{comparisonCategory=category;renderComparisons();});
      filters.appendChild(btn);
    });
    const visible=comparisons
      .filter(x=>comparisonCategory==="すべて"||x.category===comparisonCategory)
      .sort((a,b)=>Number(!!b.priority)-Number(!!a.priority));
    el("comparisonCount").textContent=`${visible.length}件`;
    list.innerHTML="";
    visible.forEach(item=>{
      const card=document.createElement("details");
      card.className="comparison-card"+(item.priority?" priority":"");
      const rows=item.terms.map(term=>`<div class="comparison-term"><strong>${escapeHtml(term.name)}</strong><p>${escapeHtml(term.meaning)}</p><span>${escapeHtml(term.key)}</span></div>`).join("");
      card.innerHTML=`<summary><span><small>${escapeHtml(item.category)}</small>${item.priority?'<em>重点</em>':''}<strong>${escapeHtml(item.title)}</strong></span><i>＋</i></summary><div class="comparison-body">${rows}<div class="memory-tip"><b>覚え方</b><p>${escapeHtml(item.mnemonic)}</p></div><button class="comparison-drill primary" type="button">この用語を3秒特訓</button></div>`;
      card.querySelector("summary").addEventListener("click",()=>requestAnimationFrame(()=>{const icon=card.querySelector("summary i");icon.textContent=card.open?"−":"＋";}));
      card.querySelector(".comparison-drill").addEventListener("click",e=>{e.preventDefault();const source=item.termIds.map(id=>terms.find(t=>t.id===id)).filter(Boolean);if(source.length)startDrill(source);else toast("特訓問題を準備中です");});
      list.appendChild(card);
    });
  }
  let cramSession=[],cramIndex=0,cramUncertain=[],cramReviewMode=false;
  function startCram(source){
    const defaults=comparisons.filter(x=>x.priority).slice(0,8);
    cramSession=(source&&source.length?source:defaults).slice();
    cramIndex=0;cramUncertain=[];cramReviewMode=!!(source&&source.length);
    showView("cramView");setTitle("本番直前チェック");renderCram();
  }
  function renderCram(){
    if(!cramSession.length){finishCram();return;}
    const item=cramSession[cramIndex];
    el("cramCounter").textContent=`${cramIndex+1} / ${cramSession.length}`;
    el("cramStatus").textContent=cramReviewMode?"不安項目の再確認":"重点8テーマ";
    el("cramProgressBar").style.width=`${((cramIndex+1)/cramSession.length)*100}%`;
    el("cramCategory").textContent=item.category;el("cramTitle").textContent=item.title;
    el("cramAnswer").hidden=true;el("cramAnswer").innerHTML="";el("cramJudge").hidden=true;el("revealCramBtn").hidden=false;
  }
  function revealCram(){
    const item=cramSession[cramIndex];
    const rows=item.terms.map(term=>`<div class="comparison-term"><strong>${escapeHtml(term.name)}</strong><p>${escapeHtml(term.meaning)}</p><span>${escapeHtml(term.key)}</span></div>`).join("");
    el("cramAnswer").innerHTML=`${rows}<div class="memory-tip"><b>覚え方</b><p>${escapeHtml(item.mnemonic)}</p></div>`;
    el("cramAnswer").hidden=false;el("cramJudge").hidden=false;el("revealCramBtn").hidden=true;
  }
  function judgeCram(known){
    const item=cramSession[cramIndex];if(!known&&!cramUncertain.includes(item))cramUncertain.push(item);
    if(cramIndex>=cramSession.length-1){finishCram();return;}cramIndex++;renderCram();
  }
  function finishCram(){
    showView("cramResultView");setTitle("本番直前チェック");const uncertain=cramUncertain.length;
    el("cramResultSummary").innerHTML=uncertain?`<div class="score-big">${cramSession.length-uncertain} / ${cramSession.length}</div><p>確認できました。不安な項目は <strong>${uncertain}件</strong> です。</p>`:`<div class="score-big">確認完了</div><p>全項目を覚えたと判定しました。新しい学習は増やさず、落ち着いて本番へ。</p>`;
    el("retryCramBtn").hidden=uncertain===0;
  }
  function prepareTerm(t,index){
    const reverse=index%2===1;
    if(!reverse){
      const order=shuffledIndexes(t.options.length);
      return {...t,direction:"normal",displayPrompt:t.prompt,displayOptions:order.map(i=>t.options[i]),displayAnswer:order.indexOf(t.answer)};
    }
    const correct=t.options[t.answer];
    const related={
      "ネットワーク":["ネットワーク","セキュリティ","システム","クラウド"],
      "セキュリティ":["セキュリティ","ネットワーク","OS","法務"],
      "DB":["DB","システム","開発"],
      "OS":["OS","ハードウェア","システム"],
      "ハードウェア":["ハードウェア","OS","システム"],
      "システム":["システム","クラウド","ネットワーク","ハードウェア"],
      "クラウド":["クラウド","システム","ネットワーク"],
      "PM":["PM","開発","ストラテジ"],
      "開発":["開発","PM","システム"],
      "ストラテジ":["ストラテジ","PM","法務"],
      "法務":["法務","ストラテジ","セキュリティ"],
      "AI":["AI","システム","クラウド"]
    };
    const cats=related[t.cat]||[t.cat];
    const candidates=[];
    cats.forEach(cat=>shuffledIndexes(terms.length).map(i=>terms[i]).filter(x=>x.id!==t.id&&x.cat===cat).forEach(x=>{if(!candidates.some(y=>y.id===x.id))candidates.push(x);}));
    const distractors=candidates.slice(0,3).map(x=>x.prompt);
    const prompts=[t.prompt,...distractors];
    const order=shuffledIndexes(prompts.length);
    return {...t,direction:"reverse",displayPrompt:correct,displayOptions:order.map(i=>prompts[i]),displayAnswer:order.indexOf(0)};
  }
  function buildSession(source){ let selected; if(source&&source.length){selected=source.slice();} else{ const now=Date.now();const scored=terms.map(t=>{const s=drillState.items[t.id]||{level:0,due:0,attempts:0,correct:0,last:0};const isDue=(s.due||0)<=now;const priority=priorityTerms.includes(t.id)&&s.attempts<3?20000:0;const accuracy=s.attempts?s.correct/s.attempts:0;return {t,score:priority+(isDue?10000:0)+(1-accuracy)*1000+(3-(s.level||0))*100-(s.last||0)/1e12};}); scored.sort((a,b)=>b.score-a.score);selected=scored.slice(0,Math.min(SESSION_SIZE,scored.length)).map(x=>x.t); } return selected.map(prepareTerm); }
  function startDrill(source){drillSession=buildSession(source);drillIndex=0;drillCorrect=0;drillWrong=[];drillAnswered=false;showView("drillView");setTitle("科目A　双方向3秒特訓");renderDrill();}
  function startTimer(){clearInterval(timerId);timerValue=3;el("drillTimer").textContent="3";el("drillTimer").classList.remove("expired");timerId=setInterval(()=>{if(drillAnswered){clearInterval(timerId);return;}timerValue--;if(timerValue>0)el("drillTimer").textContent=String(timerValue);else{el("drillTimer").textContent="!";el("drillTimer").classList.add("expired");clearInterval(timerId);}},1000);}
  function renderDrill(){ if(!drillSession.length){finishDrill();return;}const q=drillSession[drillIndex];drillAnswered=false; el("drillCounter").textContent=`問題 ${drillIndex+1} / ${drillSession.length}`;el("drillScore").textContent=`正解 ${drillCorrect}`;el("drillProgressBar").style.width=`${((drillIndex+1)/drillSession.length)*100}%`;el("drillCategory").textContent=q.cat;el("drillDirection").textContent=q.direction==="reverse"?"逆転：用語から説明を3秒で連想":"通常：説明から用語を3秒で連想";el("drillPrompt").textContent=q.displayPrompt;el("drillFeedback").hidden=true;el("drillNextBtn").hidden=true; const box=el("drillOptions");box.innerHTML="";q.displayOptions.forEach((text,idx)=>{const btn=document.createElement("button");btn.type="button";btn.className="option-btn";btn.innerHTML=`<span class="choice-letter">${String.fromCharCode(65+idx)}</span><span>${escapeHtml(text)}</span>`;btn.addEventListener("click",()=>answerDrill(idx));box.appendChild(btn);});startTimer(); }
  function answerDrill(idx){ if(drillAnswered)return;drillAnswered=true;clearInterval(timerId);const q=drillSession[drillIndex];const correct=idx===q.displayAnswer;const stat=itemStat(q.id);stat.attempts++;stat.last=Date.now();drillState.attempts++; if(correct){drillCorrect++;stat.correct++;drillState.correct++;stat.level=Math.min(3,(stat.level||0)+1);const days=[0,1,3,7][stat.level];stat.due=Date.now()+days*86400000;} else{stat.level=0;stat.due=Date.now();const raw=terms.find(t=>t.id===q.id);if(raw)drillWrong.push(raw);} saveDrillState();[...el("drillOptions").children].forEach((btn,i)=>{btn.disabled=true;if(i===q.displayAnswer)btn.classList.add("correct-choice");if(i===idx&&!correct)btn.classList.add("wrong-choice");}); el("feedbackTitle").textContent=correct?"○ 正解":"× 正解は「"+q.displayOptions[q.displayAnswer]+"」";el("feedbackExplain").textContent=q.explain;el("feedbackContrast").textContent=q.contrast;el("feedbackExamQuestion").textContent=buildExamQuestion(q);el("drillFeedback").hidden=false;el("drillNextBtn").hidden=false;el("drillScore").textContent=`正解 ${drillCorrect}`; }
  function nextDrill(){if(!drillAnswered)return;if(drillIndex>=drillSession.length-1){finishDrill();return;}drillIndex++;renderDrill();}
  function finishDrill(){clearInterval(timerId);showView("drillResultView");setTitle("科目A　双方向3秒特訓");const total=drillSession.length;const pct=total?Math.round(drillCorrect/total*100):0;el("drillResultSummary").innerHTML=`<div class="score-big">${drillCorrect} / ${total}</div><p>正答率 <strong>${pct}%</strong></p><p>間違い ${drillWrong.length}問。正解した用語は1日→3日→7日後へ復習間隔を伸ばします。</p>`;el("retryWrongBtn").hidden=drillWrong.length===0;renderHomeStats();}
  function goHome(){clearInterval(timerId);clearInterval(examTimerId);showView("homeView");setTitle("学習メニュー");renderHomeStats();}

  el("homeBtn").addEventListener("click",goHome);el("startQuizBtn").addEventListener("click",openExam);el("startDrillBtn").addEventListener("click",()=>startDrill());el("startCramBtn").addEventListener("click",()=>startCram());el("sectionABtn").addEventListener("click",()=>switchSection("A"));el("sectionBBtn").addEventListener("click",()=>switchSection("B")); el("prevBtn").addEventListener("click",()=>goQuiz(-1));el("nextBtn").addEventListener("click",()=>goQuiz(1)); el("overviewBtn")?.addEventListener("click",showOverview);el("closeOverviewBtn").addEventListener("click",()=>{showView("quizView");renderQuiz();}); el("submitBtn").addEventListener("click",showSubmit);el("copyBtn").addEventListener("click",copyResult);el("backBtn").addEventListener("click",()=>{showView("quizView");renderQuiz();}); el("reviewFlag").addEventListener("change",e=>{const q=questions[current];quizState.review[q.id]=e.target.checked;saveQuizState();}); el("drillNextBtn").addEventListener("click",nextDrill);el("endDrillBtn").addEventListener("click",finishDrill);el("retryWrongBtn").addEventListener("click",()=>startDrill(drillWrong));el("drillHomeBtn").addEventListener("click",goHome);
  el("revealCramBtn").addEventListener("click",revealCram);el("cramKnownBtn").addEventListener("click",()=>judgeCram(true));el("cramUnsureBtn").addEventListener("click",()=>judgeCram(false));el("endCramBtn").addEventListener("click",finishCram);el("retryCramBtn").addEventListener("click",()=>startCram(cramUncertain));el("cramHomeBtn").addEventListener("click",goHome);
  el("tabHome").addEventListener("click",goHome);
  el("tabQuiz").addEventListener("click",openExam);
  el("tabDrill").addEventListener("click",()=>startDrill());
  el("tabStats").addEventListener("click",()=>{renderHomeStats();renderComparisons();showView("statsView");setTitle("学習状況");});

  renderHomeStats();goHome();
})();
