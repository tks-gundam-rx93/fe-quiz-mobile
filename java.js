(() => {
  // Original four-choice practice questions; the official exam may also use multiple answers.
  const questions = [
    {category:'Javaの基本',question:'Javaのソースファイルをコンパイルして生成されるファイルの拡張子はどれか。',options:['.java','.class','.jar','.exe'],correct:1,explanation:'javac によりバイトコードを含む .class ファイルを生成する。'},
    {category:'Javaの基本',question:'プログラムのエントリーポイントとして正しい main メソッドの宣言はどれか。',options:['public static void main(String[] args)','public void main(String[] args)','static int main(String[] args)','public static String main(String[] args)'],correct:0,explanation:'エントリーポイントは public static void main(String[] args)。'},
    {category:'Javaの基本',question:'java.lang パッケージのクラスの利用について正しいものはどれか。',options:['必ず import が必要','暗黙に import される','同一パッケージからのみ利用可能','モジュール宣言が必須'],correct:1,explanation:'java.lang は暗黙に取り込まれるため String などを import なしで使用できる。'},
    {category:'型と変数',question:'次の実行結果はどれか。',code:'int a = 7;\nint b = 2;\nSystem.out.println(a / b);',options:['3','3.5','4','コンパイルエラー'],correct:0,explanation:'int 同士の除算は整数除算で、小数部を切り捨てる。'},
    {category:'型と変数',question:'次のうち、コンパイル可能な代入はどれか。',options:['byte b = 128;','int n = 3.5;','long n = 10L;','boolean b = 1;'],correct:2,explanation:'10L は long 型のリテラル。byte の範囲は -128～127。'},
    {category:'型と変数',question:'フィールド int count を初期化せずに宣言したときの初期値はどれか。',options:['null','0','1','初期値は定義されない'],correct:1,explanation:'インスタンスの int フィールドは 0 に初期化される。ローカル変数とは異なる。'},
    {category:'演算子',question:'次の実行結果はどれか。',code:'int x = 2;\nSystem.out.println(x++ + ++x);',options:['4','5','6','コンパイルエラー'],correct:2,explanation:'x++ は値2を返してから3に、++x は4にしてから4を返すため合計6。'},
    {category:'演算子',question:'次の実行結果はどれか。',code:'int n = 5;\nSystem.out.println(n > 3 && n < 5);',options:['true','false','5','コンパイルエラー'],correct:1,explanation:'5 > 3 は真だが 5 < 5 は偽。&& の結果は false。'},
    {category:'条件分岐',question:'次の実行結果はどれか。',code:'int n = 2;\nif (n > 2) {\n    System.out.print("A");\n} else {\n    System.out.print("B");\n}',options:['A','B','AB','何も表示されない'],correct:1,explanation:'n > 2 は偽なので else ブロックを実行する。'},
    {category:'条件分岐',question:'switch 文で case の末尾に break を書かない場合の動作はどれか。',options:['必ずコンパイルエラー','次の case の処理にも進む','switch の先頭へ戻る','例外が発生する'],correct:1,explanation:'break なしでは後続の case に処理が流れる（フォールスルー）。'},
    {category:'繰り返し',question:'次の実行結果はどれか。',code:'int total = 0;\nfor (int i = 1; i < 4; i++) {\n    total += i;\n}\nSystem.out.println(total);',options:['3','4','6','10'],correct:2,explanation:'i は1、2、3を取り、合計6。'},
    {category:'繰り返し',question:'次の実行結果はどれか。',code:'int n = 0;\ndo {\n    n++;\n} while (n < 0);\nSystem.out.println(n);',options:['0','1','2','無限ループ'],correct:1,explanation:'do-while は条件判定の前に本体を少なくとも1回実行する。'},
    {category:'配列',question:'次の実行結果はどれか。',code:'int[] a = {4, 5, 6};\nSystem.out.println(a.length);',options:['2','3','4','コンパイルエラー'],correct:1,explanation:'配列の length フィールドは要素数3を返す。'},
    {category:'配列',question:'次のコードの結果として正しいものはどれか。',code:'int[] a = new int[2];\nSystem.out.println(a[2]);',options:['0を表示','2を表示','コンパイルエラー','実行時に例外'],correct:3,explanation:'有効な添字は0と1。添字2は実行時に ArrayIndexOutOfBoundsException。'},
    {category:'文字列',question:'次の実行結果はどれか。',code:'String s = "Java";\nSystem.out.println(s.length());',options:['3','4','5','コンパイルエラー'],correct:1,explanation:'String の length() メソッドは文字数4を返す。配列の length とは異なる。'},
    {category:'文字列',question:'文字列の内容が同じか比較する方法として最も適切なものはどれか。',options:['a == b','a.equals(b)','a = b','a.compare(b)'],correct:1,explanation:'equals は文字列の内容を比較する。== は参照先の同一性を比較する。'},
    {category:'クラス',question:'コンストラクタの宣言として正しいものはどれか。クラス名は Book とする。',options:['void Book() {}','Book() {}','int Book() {}','new Book() {}'],correct:1,explanation:'コンストラクタ名はクラス名と同じで戻り値型を指定しない。'},
    {category:'クラス',question:'static フィールドについて正しい説明はどれか。',options:['インスタンスごとに別の値を持つ','クラスに属しインスタンス間で共有される','宣言時に必ず final となる','コンストラクタ内から参照できない'],correct:1,explanation:'static メンバーはクラスに属し、各インスタンスから共有される。'},
    {category:'継承',question:'クラス B がクラス A を継承する宣言はどれか。',options:['class B implements A {}','class B extends A {}','class B inherits A {}','class B super A {}'],correct:1,explanation:'クラスの継承には extends を使用する。'},
    {category:'継承',question:'サブクラスからスーパークラスのコンストラクタを明示的に呼び出す記述はどれか。',options:['this();','super();','extends();','parent();'],correct:1,explanation:'super() は親クラスのコンストラクタを呼び出し、コンストラクタの先頭で使用する。'}
  ];
  const key = 'fe-java-bronze-original-v1';
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
    const lines=['Java SE Bronze 予測問題 回答','',...state.answers.map((answer,i)=>`問${i+1}. ${Number.isInteger(answer)?'ABCD'[answer]:'未回答'}`),'','上記の回答を採点し、間違えた問題の解説と弱点分野、次に重点学習すべき内容を教えてください。'];
    $('pyResultText').value=lines.join('\n');
    $('pyResult').hidden=false;document.body.classList.add('qualification-submitted');window.scrollTo({top:0,behavior:'smooth'});
  });
  $('pyCopy').addEventListener('click', async () => {try{await navigator.clipboard.writeText($('pyResultText').value);$('pyCopy').textContent='コピーしました';setTimeout(()=>$('pyCopy').textContent='回答をコピー',1600);}catch(_){$('pyResultText').select();document.execCommand('copy');}});
  $('pyBack').addEventListener('click',()=>{document.body.classList.remove('qualification-submitted');$('pyResult').hidden=true;window.scrollTo({top:0,behavior:'smooth'});});
  $('startBronze').addEventListener('click',()=>showQualificationView('qualQuiz','Java Bronze','qualMenuTab'));
  $('qualMenuTab').addEventListener('click',()=>showQualificationView('qualMenu','Java 問題選択','qualMenuTab'));
  $('qualStatsTab').addEventListener('click',()=>{render();showQualificationView('qualStats','Java 学習状況','qualStatsTab');});
  $('qualWeaknessTab').addEventListener('click',()=>showQualificationView('qualWeakness','Java 弱点克服','qualWeaknessTab'));
  $('weaknessPractice').addEventListener('click',()=>showQualificationView('qualQuiz','Java Bronze','qualMenuTab'));
  $('pyReset').addEventListener('click', () => {
    if (!confirm('回答と採点結果を消して最初から解き直しますか？')) return;
    state = {current:0, answers:Array(questions.length).fill(null)}; document.body.classList.remove('qualification-submitted');$('pyResult').hidden=true;save(); render();
  });
  render();showQualificationView('qualMenu','Java 問題選択','qualMenuTab');
})();
