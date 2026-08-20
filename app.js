(() => {
  const questions = window.FE_QUESTIONS || [];
  const QUIZ_ROUND = 4;
  // 回ごとに保存領域を分離する。新しい回は必ず全問未選択で開始する。
  const STORAGE_KEY = `fe-quiz-mobile-round-${QUIZ_ROUND}`;
  const state = loadState();
  let current = Math.min(state.current || 0, Math.max(questions.length - 1, 0));

  const el = id => document.getElementById(id);
  const quizView = el("quizView");
  const resultView = el("resultView");
  const overviewView = el("overviewView");

  function blankState() { return {answers:{}, review:{}, current:0}; }
  function loadState() {
    try { return Object.assign(blankState(), JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")); }
    catch (_) { return blankState(); }
  }
  function saveState() {
    state.current = current;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function render() {
    if (!questions.length) return;
    const q = questions[current];
    const answered = Object.keys(state.answers).filter(k => state.answers[k] !== undefined).length;
    el("counter").textContent = `問題 ${current+1} / ${questions.length}`;
    el("answeredCount").textContent = `回答済み ${answered} / ${questions.length}`;
    el("progressBar").style.width = `${((current+1)/questions.length)*100}%`;
    el("sectionBadge").textContent = `科目${q.section}`;
    el("categoryBadge").textContent = q.category;
    el("importanceBadge").textContent = `重要度 ${q.importance}`;
    el("questionText").textContent = `問${q.id}　${q.question}`;

    const code = el("codeBlock");
    if (q.code) { code.hidden = false; code.textContent = q.code; }
    else { code.hidden = true; code.textContent = ""; }

    const options = el("options");
    options.innerHTML = "";
    q.options.forEach((text, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn" + (state.answers[q.id] === idx ? " selected" : "");
      btn.innerHTML = `<span class="choice-letter">${String.fromCharCode(65+idx)}</span><span>${escapeHtml(text)}</span>`;
      btn.addEventListener("click", () => { state.answers[q.id] = idx; saveState(); render(); });
      options.appendChild(btn);
    });

    el("reviewFlag").checked = !!state.review[q.id];
    el("prevBtn").disabled = current === 0;
    el("nextBtn").textContent = current === questions.length - 1 ? "先頭へ ↺" : "次へ →";
    saveState();
  }
  function go(delta) {
    if (delta > 0 && current === questions.length - 1) current = 0;
    else current = Math.max(0, Math.min(questions.length - 1, current + delta));
    render(); window.scrollTo({top:0, behavior:"smooth"});
  }
  function showOverview() {
    quizView.hidden = true; resultView.hidden = true; overviewView.hidden = false;
    const grid = el("overviewGrid"); grid.innerHTML = "";
    questions.forEach((q, idx) => {
      const btn = document.createElement("button"); btn.type = "button";
      const classes = ["overview-item"];
      if (state.answers[q.id] !== undefined) classes.push("answered");
      if (state.review[q.id]) classes.push("review");
      if (idx === current) classes.push("current");
      btn.className = classes.join(" "); btn.textContent = q.id;
      btn.addEventListener("click", () => { current = idx; overviewView.hidden = true; quizView.hidden = false; render(); });
      grid.appendChild(btn);
    });
  }
  function showSubmit() {
    const lines = [`FE予測問題 第${QUIZ_ROUND}回 回答`];
    questions.forEach(q => {
      const a = state.answers[q.id];
      lines.push(`問${q.id}. ${a === undefined ? "未回答" : String.fromCharCode(65+a)}`);
    });
    const reviewIds = questions.filter(q => state.review[q.id]).map(q => `問${q.id}`);
    if (reviewIds.length) lines.push("", `見直し指定: ${reviewIds.join(", ")}`);
    el("resultText").value = lines.join("\n");
    quizView.hidden = true; overviewView.hidden = true; resultView.hidden = false;
    window.scrollTo({top:0, behavior:"smooth"});
  }
  async function copyResult() {
    const text = el("resultText").value;
    try { await navigator.clipboard.writeText(text); toast("回答をコピーしました"); }
    catch (_) { el("resultText").focus(); el("resultText").select(); document.execCommand("copy"); toast("回答をコピーしました"); }
  }
  function toast(message) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = message;
    document.body.appendChild(t); setTimeout(() => t.remove(), 1800);
  }

  el("prevBtn").addEventListener("click", () => go(-1));
  el("nextBtn").addEventListener("click", () => go(1));
  el("overviewBtn").addEventListener("click", showOverview);
  el("closeOverviewBtn").addEventListener("click", () => { overviewView.hidden = true; quizView.hidden = false; render(); });
  el("submitBtn").addEventListener("click", showSubmit);
  el("copyBtn").addEventListener("click", copyResult);
  el("backBtn").addEventListener("click", () => { resultView.hidden = true; quizView.hidden = false; render(); });
  el("reviewFlag").addEventListener("change", e => { const q = questions[current]; state.review[q.id] = e.target.checked; saveState(); });

  render();
})();
