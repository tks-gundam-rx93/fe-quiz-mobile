(() => {
  // Original practice questions aligned with the Python Tutorial topics; not official past papers.
  const questions = [
    {category:'数値と演算',question:'次の実行結果はどれか。',code:'print(17 // 5)',options:['2','3','3.4','4'],correct:1,explanation:'// は切り捨て除算。17 // 5 は 3。'},
    {category:'数値と演算',question:'次の実行結果はどれか。',code:'print(2 ** 3 ** 2)',options:['64','256','512','729'],correct:2,explanation:'累乗 ** は右から結合するため、2 ** (3 ** 2) = 512。'},
    {category:'文字列',question:'次の実行結果はどれか。',code:'s = "python"\nprint(s[-2:])',options:['py','on','ho','エラー'],correct:1,explanation:'負の添字 -2 は末尾から2文字目。そこから末尾までなので on。'},
    {category:'リスト',question:'次の実行結果はどれか。',code:'a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)',options:['[1, 2, 3]','[1, 2, 3, 4]','[4]','エラー'],correct:1,explanation:'b = a は同じリストを参照する。append の変更は a からも見える。'},
    {category:'リスト',question:'次の実行結果はどれか。',code:'a = [10, 20, 30, 40]\nprint(a[1:3])',options:['[10, 20]','[20, 30]','[20, 30, 40]','[10, 20, 30]'],correct:1,explanation:'スライスの終端 3 は含まない。添字1と2の要素を得る。'},
    {category:'制御構造',question:'次の実行結果はどれか。',code:'print(list(range(2, 8, 2)))',options:['[2, 4, 6]','[2, 4, 6, 8]','[2, 3, 4, 5, 6, 7]','[4, 6, 8]'],correct:0,explanation:'range の第3引数は増分、終端8は含まれない。'},
    {category:'制御構造',question:'for 文の else 節が実行されるのはどれか。',code:'for n in [1, 2, 3]:\n    if n == 2:\n        break\nelse:\n    print("done")',options:['毎回実行される','break で終了したとき','break せず反復が終了したとき','ループに入らなかった場合だけ'],correct:2,explanation:'else は break で中断されずにループが終了したときに実行する。'},
    {category:'関数',question:'次の実行結果はどれか。',code:'def f(x, y=3):\n    return x * y\nprint(f(4))',options:['3','4','7','12'],correct:3,explanation:'省略した y にはデフォルト値3が使われ、4 * 3 = 12。'},
    {category:'関数',question:'次の実行結果はどれか。',code:'def f(a, *args):\n    return len(args)\nprint(f(1, 2, 3, 4))',options:['1','2','3','4'],correct:2,explanation:'最初の1は a に入り、残り3個が args のタプルに入る。'},
    {category:'データ構造',question:'次の実行結果はどれか。',code:'d = {"a": 1, "b": 2}\nprint(d.get("c", 0))',options:['None','0','KeyError','"c"'],correct:1,explanation:'存在しないキーを get で取得すると、第2引数のデフォルト値0を返す。'},
    {category:'データ構造',question:'次の実行結果はどれか。',code:'print(len(set([1, 1, 2, 3, 3])))',options:['2','3','4','5'],correct:1,explanation:'集合 set は重複を除く。要素は1、2、3の3個。'},
    {category:'内包表記',question:'次の実行結果はどれか。',code:'print([x * x for x in range(5) if x % 2 == 0])',options:['[0, 2, 4]','[0, 4, 16]','[1, 9]','[0, 1, 4, 9, 16]'],correct:1,explanation:'0、2、4を選んで、それぞれ2乗する。'},
    {category:'例外',question:'次の実行結果はどれか。',code:'try:\n    int("x")\nexcept ValueError:\n    print("value")\nfinally:\n    print("end")',options:['value だけ','end だけ','value と end の順','例外がそのまま表示される'],correct:2,explanation:'変換で ValueError を捕捉し、その後 finally 節も必ず実行する。'},
    {category:'モジュール',question:'math モジュールの sqrt 関数を使う正しい記述はどれか。',options:['from math import sqrt; sqrt(9)','import sqrt from math; sqrt(9)','import math.sqrt; sqrt(9)','using math.sqrt; sqrt(9)'],correct:0,explanation:'from math import sqrt で関数を直接取り込める。'},
    {category:'クラス',question:'次の実行結果はどれか。',code:'class Box:\n    def __init__(self, value):\n        self.value = value\nbox = Box(5)\nprint(box.value)',options:['None','5','value','エラー'],correct:1,explanation:'__init__ でインスタンス属性 value に5を代入している。'},
    {category:'入出力',question:'ファイルの処理後、例外の有無にかかわらず自動で閉じる書き方はどれか。',options:['with open("a.txt") as f:','open("a.txt") only f:','file("a.txt") as f:','import open("a.txt")'],correct:0,explanation:'with 文のコンテキスト管理により、ブロック終了時にファイルを閉じる。'},
    {category:'標準ライブラリ',question:'次の実行結果はどれか。',code:'import json\nprint(json.loads("[1, 2]")[0])',options:['"["','0','1','2'],correct:2,explanation:'json.loads でJSON配列をPythonのリストに変換し、先頭を取得する。'},
    {category:'スコープ',question:'次の実行結果はどれか。',code:'x = 10\ndef f():\n    x = 20\n    return x\nprint(f(), x)',options:['10 10','20 20','20 10','エラー'],correct:2,explanation:'関数内の x はローカル変数。外側の x は10のまま。'},
    {category:'文字列',question:'次の実行結果はどれか。',code:'print("-".join(["a", "b", "c"]))',options:['abc','a-b-c','-abc-','[a, b, c]'],correct:1,explanation:'join は指定文字列を要素の間に挟んで連結する。'},
    {category:'例外',question:'存在しないキーを辞書から d["z"] で取得した際に発生する例外はどれか。',options:['IndexError','TypeError','KeyError','ValueError'],correct:2,explanation:'辞書にないキーへの添字アクセスは KeyError。'}
  ];
  const key = 'fe-python3-basic-original-v1';
  const $ = id => document.getElementById(id);
  let state;
  try { state = JSON.parse(localStorage.getItem(key)) || {}; } catch { state = {}; }
  if (!Array.isArray(state.answers) || state.answers.length !== questions.length) state = {current:0, answers:Array(questions.length).fill(null)};
  state.current = Math.max(0, Math.min(questions.length - 1, Number(state.current) || 0));
  const save = () => localStorage.setItem(key, JSON.stringify(state));
  const qualificationViews=['qualMenu','qualQuiz','qualStats','qualWeakness','pyResult'];
  const qualificationTabs=['qualMenuTab','qualStatsTab','qualWeaknessTab'];
  function showQualificationView(id,title,activeTab){
    document.body.classList.remove('qualification-submitted');
    qualificationViews.forEach(viewId=>$(viewId).hidden=viewId!==id);
    qualificationTabs.forEach(tabId=>$(tabId).classList.toggle('active',tabId===activeTab));
    $('qualTitle').textContent=title;window.scrollTo({top:0,behavior:'auto'});
  }
  function render() {
    const q = questions[state.current], n = state.current;
    $('pyCounter').textContent = `問題 ${n + 1} / ${questions.length}`;
    $('pyAnswered').textContent = `回答済み ${state.answers.filter(a => Number.isInteger(a)).length}問`;
    const answered=state.answers.filter(a=>Number.isInteger(a)).length;
    $('qualAnswered').textContent=`${answered} / ${questions.length}`;
    $('qualProgress').textContent=`${Math.round(answered/questions.length*100)}%`;
    $('pyProgress').style.width = `${(n + 1) / questions.length * 100}%`;
    $('pyCategory').textContent = q.category;
    $('pyQuestion').textContent = `問${n + 1}　${q.question}`;
    $('pyCode').hidden = !q.code;
    $('pyCode').textContent = q.code || '';
    $('pyOptions').replaceChildren();
    q.options.forEach((option, i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'option-btn python-choice';
      button.setAttribute('role','radio'); button.setAttribute('aria-checked', String(state.answers[n] === i));
      button.textContent = `${'ABCD'[i]}. ${option}`;
      button.addEventListener('click', () => { state.answers[n] = i; save(); render(); });
      $('pyOptions').append(button);
    });
    $('pyPrev').disabled = n === 0;
    $('pyNext').disabled = n === questions.length - 1;
    $('pyFeedback').hidden = true;
  }
  $('pyPrev').addEventListener('click', () => { state.current--; save(); render(); });
  $('pyNext').addEventListener('click', () => { state.current++; save(); render(); });
  $('pyFinish').addEventListener('click', () => {
    const missing = state.answers.filter(a => !Number.isInteger(a)).length;
    if (missing && !confirm(`未回答が${missing}問あります。回答を提出しますか？`)) return;
    const lines=['Python 3 基礎試験 予測問題 回答','',...state.answers.map((answer,i)=>`問${i+1}. ${Number.isInteger(answer)?'ABCD'[answer]:'未回答'}`),'','上記の回答を採点し、間違えた問題の解説と弱点分野、次に重点学習すべき内容を教えてください。'];
    $('pyResultText').value=lines.join('\n');
    $('pyResult').hidden=false;document.body.classList.add('qualification-submitted');window.scrollTo({top:0,behavior:'smooth'});
  });
  $('pyCopy').addEventListener('click', async () => {try{await navigator.clipboard.writeText($('pyResultText').value);$('pyCopy').textContent='コピーしました';setTimeout(()=>$('pyCopy').textContent='回答をコピー',1600);}catch(_){$('pyResultText').select();document.execCommand('copy');}});
  $('pyBack').addEventListener('click',()=>{document.body.classList.remove('qualification-submitted');$('pyResult').hidden=true;window.scrollTo({top:0,behavior:'smooth'});});
  $('startPython').addEventListener('click',()=>showQualificationView('qualQuiz','Python 3 基礎試験','qualMenuTab'));
  $('qualMenuTab').addEventListener('click',()=>showQualificationView('qualMenu','Python 3 問題選択','qualMenuTab'));
  $('qualStatsTab').addEventListener('click',()=>{render();showQualificationView('qualStats','Python 3 学習状況','qualStatsTab');});
  $('qualWeaknessTab').addEventListener('click',()=>showQualificationView('qualWeakness','Python 3 弱点克服','qualWeaknessTab'));
  $('weaknessPractice').addEventListener('click',()=>showQualificationView('qualQuiz','Python 3 基礎試験','qualMenuTab'));
  $('pyReset').addEventListener('click', () => {
    if (!confirm('回答と採点結果を消して最初から解き直しますか？')) return;
    state = {current:0, answers:Array(questions.length).fill(null)}; document.body.classList.remove('qualification-submitted');$('pyResult').hidden=true;save(); render();
  });
  render();showQualificationView('qualMenu','Python 3 問題選択','qualMenuTab');
})();
