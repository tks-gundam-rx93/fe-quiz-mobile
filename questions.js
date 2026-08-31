window.FE_ROUND = 9;
window.FE_QUESTIONS = [
{id:1,section:"A",category:"セキュリティ",importance:"S",question:"Aさんが文書にデジタル署名を付与するとき、署名の作成に使用する鍵はどれか。",options:["受信者の公開鍵","受信者の秘密鍵","Aさんの公開鍵","Aさんの秘密鍵"]},
{id:2,section:"A",category:"データベース",importance:"S",question:"SQLで社員表を部署ごとに集計し、平均給与が30万円以上の部署だけを表示する。集計結果に条件を指定する句はどれか。",options:["WHERE","HAVING","ORDER BY","DISTINCT"]},
{id:3,section:"A",category:"プロジェクトマネジメント",importance:"S",question:"EVMで EV=120、AC=100 のとき、CPI（コスト効率指数）はいくつか。",options:["0.8","1.0","1.2","20"]},
{id:4,section:"A",category:"ソフトウェア開発",importance:"S",question:"スクラムにおいて、ステークホルダーと完成したインクリメントを確認し、今後のプロダクトバックログを検討するイベントはどれか。",options:["スプリントレビュー","デイリースクラム","スプリントレトロスペクティブ","スプリントプランニング"]},
{id:5,section:"A",category:"ストラテジ",importance:"S",question:"SWOT分析において、法改正で新しい市場が生まれることはどれに分類されるか。",options:["Strength","Opportunity","Weakness","Threat"]},
{id:6,section:"A",category:"ネットワーク",importance:"A",question:"コネクションを確立せず、再送制御や到着順序の保証を基本的に行わないトランスポート層のプロトコルはどれか。",options:["HTTP","TCP","UDP","IP"]},
{id:7,section:"A",category:"データベース",importance:"A",question:"データベースの正規化を行う主な目的として、最も適切なものはどれか。",options:["データの重複と更新時異常を減らす","検索処理を必ず高速化する","全ての表を一つに統合する","バックアップを不要にする"]},
{id:8,section:"A",category:"セキュリティ",importance:"A",question:"指紋、顔、静脈などを利用する認証要素はどれに分類されるか。",options:["知識情報","所持情報","位置情報","生体情報"]},
{id:9,section:"A",category:"システム構成",importance:"S",question:"稼働率0.9と0.8の装置を直列に接続し、両方が稼働したときだけシステムが稼働する。故障が独立しているとき、システムの稼働率はいくつか。",options:["0.98","0.72","0.85","1.7"]},
{id:10,section:"A",category:"クラウド",importance:"A",question:"利用者が完成したアプリケーションをインターネット経由で利用するクラウドの提供形態はどれか。",options:["IaaS","PaaS","SaaS","DaaS"]},
{id:11,section:"A",category:"ストラテジ",importance:"A",question:"PPMにおいて、市場成長率は高いが相対的市場占有率が低い事業はどれか。",options:["問題児（Question Mark）","花形（Star）","金のなる木（Cash Cow）","負け犬（Dog）"]},
{id:12,section:"A",category:"システム運用",importance:"A",question:"フルバックアップ実施後に変更された全てのデータを、毎回バックアップする方式はどれか。",options:["フルバックアップ","増分バックアップ","ミラーリング","差分バックアップ"]},
{id:13,section:"B",category:"キュー・スタック",importance:"S",question:"次の処理を実行したとき、resultの値はいくつか。キューは先入れ先出し、スタックは後入れ先出しとする。",code:"ENQUEUE(2)\nENQUEUE(4)\nPUSH(3)\nx ← DEQUEUE()\nPUSH(x)\ny ← POP()\nresult ← y + DEQUEUE()",options:["5","7","6","8"]},
{id:14,section:"B",category:"二重ループ",importance:"S",question:"次の処理を実行したとき、sumの値はいくつか。",code:"sum ← 0\nfor i ← 1 to 3\n    for j ← 1 to i\n        sum ← sum + j\n    endfor\nendfor",options:["10","9","12","14"]},
{id:15,section:"B",category:"整列",importance:"S",question:"配列Aに対して選択ソートの1回目の処理を行い、未整列部分の最小値を先頭要素と交換した。処理後の配列はどれか。",code:"A ← [7, 3, 5, 2]",options:["[3,7,5,2]","[2,3,5,7]","[2,7,5,3]","[3,2,5,7]"]},
{id:16,section:"B",category:"探索",importance:"S",question:"昇順配列 [4, 9, 13, 18, 25, 31, 40, 52] から二分探索で31を探す。要素数が偶数のときは小さい添字側を中央とすると、比較値の順序はどれか。",options:["25 → 31","18 → 25 → 31","18 → 40 → 31","18 → 31"]},
{id:17,section:"B",category:"再帰",importance:"S",question:"次の関数fを実行したとき、f(4)の戻り値はいくつか。",code:"function f(n)\n    if n = 0 then\n        return 0\n    else\n        return 2 * f(n - 1) + 1\n    endif\nendfunction",options:["7","12","15","16"]},
{id:18,section:"B",category:"配列",importance:"S",question:"次の処理を実行した後の配列Aはどれか。添字は1から始まる。",code:"A ← [1, 3, 2, 4]\nfor i ← 2 to 4\n    A[i] ← A[i] + A[i - 1]\nendfor",options:["[1,4,6,10]","[1,4,5,6]","[1,3,5,9]","[1,4,6,8]"]},
{id:19,section:"B",category:"条件分岐・ループ",importance:"S",question:"次の処理を実行したとき、xの値はいくつか。",code:"x ← 0\nfor i ← 1 to 5\n    if i <= 3 then\n        x ← x + i\n    else\n        x ← x * 2\n    endif\nendfor",options:["18","24","12","30"]},
{id:20,section:"B",category:"関数・疑似言語",importance:"S",question:"次の関数gを実行したとき、g(48,18)の戻り値はいくつか。MODは剰余を表す。",code:"function g(a, b)\n    while b != 0\n        temp ← a MOD b\n        a ← b\n        b ← temp\n    endwhile\n    return a\nendfunction",options:["3","4","8","6"]}
];
