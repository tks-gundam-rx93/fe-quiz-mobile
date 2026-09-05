window.FE_ROUND = 11;

(() => {
  const selectedTermIds = [1,2,3,4,6,7,8,51,52,59,9,10,11,12,13,14,15,16,17,53,68,75,81,18,19,20,21,79,83,22,23,58,72,24,25,26,27,56,69,38,66,29,30,33,34,54,63,71,35,36,37,44,45,46,47,48,49,50,64,84];
  const label={ネットワーク:"ネットワーク",セキュリティ:"情報セキュリティ",OS:"OS・システム運用",ハードウェア:"ハードウェア",DB:"データベース",システム:"システム構成",PM:"プロジェクトマネジメント",開発:"システム開発",ストラテジ:"経営戦略",法務:"法務",AI:"AI",クラウド:"クラウド"};
  const terms=window.FE_TERMS||[];
  const aQuestions=selectedTermIds.map((termId,index)=>{
    const t=terms.find(x=>x.id===termId);const shift=(index*3+1)%4;
    return {id:index+1,displayNo:index+1,section:"A",category:label[t.cat]||t.cat,importance:index<20?"S":"A",question:`${t.prompt}。これに該当するものとして、最も適切なものはどれか。`,options:t.options.map((_,i)=>t.options[(i+shift)%4]),correct:(4-shift)%4};
  });
  const bQuestions = [
    {displayNo:1,category:"配列・ループ",question:"次の処理を実行したとき、resultの値はどれか。",code:"A ← [3, 1, 4, 1, 5]\nresult ← 0\nfor i ← 1 to 5\n    if A[i] MOD 2 = 1 then\n        result ← result + A[i]\n    endif\nendfor",options:["8","9","10","14"],correct:2},
    {displayNo:2,category:"配列",question:"次の処理を実行した後の配列Aはどれか。添字は1から始まる。",code:"A ← [2, 4, 6, 8, 10]\ntemp ← A[1]\nfor i ← 1 to 4\n    A[i] ← A[i + 1]\nendfor\nA[5] ← temp",options:["[10,2,4,6,8]","[4,6,8,10,2]","[2,6,8,10,4]","[4,6,8,2,10]"],correct:1},
    {displayNo:3,category:"二分探索",question:"昇順配列から二分探索で32を探す。比較する値の順序はどれか。中央の要素番号は切り捨てで求める。",code:"A ← [4, 9, 13, 18, 24, 27, 32, 38, 45]",options:["24 → 27 → 32","24 → 38 → 32","24 → 32","24 → 38 → 27 → 32"],correct:2},
    {displayNo:4,category:"キュー・スタック",question:"キューはFIFO、スタックはLIFOとする。resultの値はどれか。",code:"ENQUEUE(2)\nENQUEUE(7)\nPUSH(5)\nx ← DEQUEUE()\nPUSH(x)\ny ← POP()\nz ← DEQUEUE()\nresult ← y + z",options:["7","9","12","14"],correct:1},
    {displayNo:5,category:"再帰",question:"次の関数f(5)の戻り値はどれか。",code:"function f(n)\n    if n ≤ 1 then\n        return 1\n    endif\n    return n + f(n - 2)\nendfunction",options:["6","8","9","12"],correct:2},
    {displayNo:6,category:"整列",question:"配列Aに挿入ソートを適用し、先頭から4要素までの挿入を終えたときの配列はどれか。",code:"A ← [7, 3, 5, 2, 6]",options:["[2,3,5,7,6]","[3,5,7,2,6]","[2,3,5,6,7]","[3,7,2,5,6]"],correct:0},
    {displayNo:7,category:"文字列",question:"次の関数countRun(\"AABBBCC\")の戻り値はどれか。",code:"function countRun(s)\n    count ← 1\n    for i ← 2 to length(s)\n        if s[i] ≠ s[i - 1] then\n            count ← count + 1\n        endif\n    endfor\n    return count\nendfunction",options:["2","3","4","7"],correct:1},
    {displayNo:8,category:"ユークリッド互除法",question:"次の関数gcd(48,18)の戻り値はどれか。",code:"function gcd(a, b)\n    while b ≠ 0\n        r ← a MOD b\n        a ← b\n        b ← r\n    endwhile\n    return a\nendfunction",options:["2","3","6","12"],correct:2},
    {displayNo:9,category:"リスト",question:"単方向リストで、節点pの直後に新しい節点qを挿入する処理として正しいものはどれか。",options:["q.next ← p.next の後に p.next ← q","p.next ← q の後に q.next ← p.next","q.next ← p の後に p.next ← q","p ← q の後に q.next ← p.next"],correct:0},
    {displayNo:10,category:"二次元配列",question:"次の処理を実行したとき、sumの値はどれか。",code:"A ← [[1,2,3],[4,5,6],[7,8,9]]\nsum ← 0\nfor i ← 1 to 3\n    sum ← sum + A[i,i]\nendfor",options:["12","15","18","24"],correct:1},
    {displayNo:11,category:"整列",question:"昇順のバブルソート1回目（左から隣接要素を比較）の終了後、配列Aはどれか。",code:"A ← [5, 2, 4, 1]",options:["[2,4,1,5]","[2,5,1,4]","[1,2,4,5]","[2,4,5,1]"],correct:0},
    {displayNo:12,category:"ビット演算",question:"次の関数ones(13)の戻り値はどれか。13の2進表現は1101である。",code:"function ones(n)\n    count ← 0\n    while n > 0\n        count ← count + (n MOD 2)\n        n ← n DIV 2\n    endwhile\n    return count\nendfunction",options:["2","3","4","6"],correct:1},
    {displayNo:13,category:"ハッシュ",question:"表サイズ7、ハッシュ関数h(k)=k MOD 7、衝突時は次の空き位置を探す。10、17、24を順に格納したとき、24の格納位置はどれか。位置は0から始まる。",options:["3","4","5","6"],correct:2},
    {displayNo:14,category:"木構造",question:"2分探索木に8, 3, 10, 1, 6の順で挿入した。行きがけ順（先行順）で走査した結果はどれか。",options:["1,3,6,8,10","8,3,1,6,10","1,6,3,10,8","8,10,3,6,1"],correct:1},
    {displayNo:15,category:"基数変換",question:"次の処理後、スタックから順に取り出して並べた結果はどれか。",code:"n ← 13\nwhile n > 0\n    PUSH(n MOD 2)\n    n ← n DIV 2\nendwhile",options:["1011","1101","1110","1001"],correct:1},
    {displayNo:16,category:"探索",question:"次の処理でtarget=4のとき、countの値はどれか。",code:"A ← [4, 2, 4, 3, 4, 1]\ncount ← 0\nfor each x in A\n    if x = target then\n        count ← count + 1\n    endif\nendfor",options:["2","3","4","6"],correct:1},
    {displayNo:17,category:"情報セキュリティ",question:"利用者ごとに必要最小限の権限だけを付与する考え方として、最も適切なものはどれか。",options:["職務分掌","最小権限の原則","多要素認証","否認防止"],correct:1},
    {displayNo:18,category:"情報セキュリティ",question:"WebアプリケーションへのSQLインジェクション対策として、最も適切なものはどれか。",options:["出力時にHTMLをエスケープする","パスワードを定期変更する","プレースホルダを用いたパラメータ化クエリを使う","CookieにSecure属性だけを付ける"],correct:2},
    {displayNo:19,category:"情報セキュリティ",question:"バックアップをランサムウェア被害から守る対策として、最も適切なものはどれか。",options:["常時同じ共有フォルダへ接続する","オフライン又は変更不能な世代を保持する","バックアップを一つだけ上書きする","利用者全員に削除権限を与える"],correct:1},
    {displayNo:20,category:"情報セキュリティ",question:"開発者と本番環境へのリリース承認者を別人にする主な目的はどれか。",options:["処理速度の向上","可用性の向上","不正や誤操作の抑止・発見","暗号鍵の長期化"],correct:2}
  ].map((q,index)=>({id:61+index,section:"B",importance:"S",...q}));
  window.FE_QUESTIONS=[...aQuestions,...bQuestions];
})();
