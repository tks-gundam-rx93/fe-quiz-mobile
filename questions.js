window.FE_ROUND = 10;
window.FE_QUESTIONS = [
{id:1,section:"A",category:"セキュリティ",importance:"S",question:"Aさんが作成したデジタル署名を受信者が検証するとき、通常使用する鍵はどれか。",options:["Aさんの公開鍵","Aさんの秘密鍵","受信者の公開鍵","受信者の秘密鍵"]},
{id:2,section:"A",category:"データベース",importance:"S",question:"SQLでGROUP BYによる集計を行う前に、在籍中の社員だけを対象として行を絞り込む句はどれか。",options:["GROUP BY","HAVING","WHERE","ORDER BY"]},
{id:3,section:"A",category:"ストラテジ",importance:"S",question:"SWOT分析において、自社設備の老朽化や技術者不足など、自社にとって不利な内部環境はどれに分類されるか。",options:["Strength","Weakness","Opportunity","Threat"]},
{id:4,section:"A",category:"クラウド",importance:"S",question:"利用者がOSやミドルウェアを管理せず、アプリケーションの開発・実行基盤を利用するクラウドの提供形態はどれか。",options:["SaaS","IaaS","PaaS","DaaS"]},
{id:5,section:"A",category:"ネットワーク",importance:"A",question:"IPv4でプレフィックス長が /26 のサブネットに含まれるIPアドレス総数はいくつか。",options:["30","32","62","64"]},
{id:6,section:"A",category:"データベース",importance:"A",question:"関係データベースで、別の表の主キーを参照して表同士の関係を表すキーはどれか。",options:["候補キー","外部キー","複合キー","代替キー"]},
{id:7,section:"A",category:"システム構成",importance:"S",question:"MTBFが720時間、MTTRが80時間のシステムの稼働率はいくつか。",options:["0.9","0.8","0.1","9.0"]},
{id:8,section:"A",category:"プロジェクトマネジメント",importance:"S",question:"EVMで EV=100、AC=120 のとき、CV（コスト差異）はいくつか。",options:["20","0.83","-20","1.2"]},
{id:9,section:"A",category:"セキュリティ",importance:"A",question:"受信したファイルのハッシュ値を送信前のハッシュ値と比較することで、主に確認できる情報セキュリティの特性はどれか。",options:["機密性","可用性","真正性","完全性"]},
{id:10,section:"A",category:"ストラテジ",importance:"A",question:"PPMにおいて、市場成長率は低いが相対的市場占有率が高く、安定した資金を生み出す事業はどれか。",options:["花形（Star）","金のなる木（Cash Cow）","問題児（Question Mark）","負け犬（Dog）"]},
{id:11,section:"A",category:"法務",importance:"A",question:"自然法則を利用した技術的な発明を保護する権利はどれか。",options:["特許権","著作権","商標権","意匠権"]},
{id:12,section:"A",category:"システム運用",importance:"A",question:"前回実施したバックアップ以降に変更されたデータだけを保存する方式はどれか。",options:["フルバックアップ","差分バックアップ","増分バックアップ","ミラーリング"]},
{id:13,section:"B",category:"キュー・スタック",importance:"S",question:"次の処理を実行したとき、resultの値はいくつか。キューは先入れ先出し、スタックは後入れ先出しとする。",code:"ENQUEUE(3)\nENQUEUE(5)\nPUSH(4)\na ← DEQUEUE()\nPUSH(a)\nb ← POP()\nc ← DEQUEUE()\nresult ← b * c",options:["8","12","15","20"]},
{id:14,section:"B",category:"二重ループ",importance:"S",question:"次の処理を実行したとき、countの値はいくつか。",code:"count ← 0\nfor i ← 1 to 4\n    for j ← 1 to 4\n        if i < j then\n            count ← count + 1\n        endif\n    endfor\nendfor",options:["4","6","8","10"]},
{id:15,section:"B",category:"整列",importance:"S",question:"配列Aに挿入ソートを適用し、i=2とi=3の挿入処理まで終了した。配列Aはどれか。添字は1から始まる。",code:"A ← [6, 2, 5, 3]",options:["[2,6,5,3]","[2,3,5,6]","[5,2,6,3]","[2,5,6,3]"]},
{id:16,section:"B",category:"探索",importance:"S",question:"昇順配列 [3, 7, 12, 18, 24, 29, 35, 41, 50] から二分探索で41を探す。比較される値の順序はどれか。",options:["24 → 29 → 41","24 → 35 → 41","24 → 41","24 → 35 → 50 → 41"]},
{id:17,section:"B",category:"再帰",importance:"S",question:"次の関数fを実行したとき、f(4)の戻り値はいくつか。",code:"function f(n)\n    if n = 0 then\n        return 1\n    else\n        return n * f(n - 1)\n    endif\nendfunction",options:["24","16","12","8"]},
{id:18,section:"B",category:"配列",importance:"S",question:"次の処理を実行した後の配列Aはどれか。添字は1から始まる。",code:"A ← [2, 4, 6, 8, 10, 12]\nfor i ← 1 to 3\n    temp ← A[i]\n    A[i] ← A[7 - i]\n    A[7 - i] ← temp\nendfor",options:["[12,4,6,8,10,2]","[10,12,8,6,2,4]","[12,10,6,8,4,2]","[12,10,8,6,4,2]"]},
{id:19,section:"B",category:"条件分岐・ループ",importance:"S",question:"次の処理を実行したとき、xの値はいくつか。",code:"x ← 1\nfor i ← 1 to 5\n    if i MOD 3 = 0 then\n        x ← x * 3\n    else\n        x ← x + i\n    endif\nendfor",options:["18","21","24","27"]},
{id:20,section:"B",category:"関数・疑似言語",importance:"S",question:"次の関数gを実行したとき、g(473)の戻り値はいくつか。DIVは整数除算、MODは剰余を表す。",code:"function g(n)\n    result ← 0\n    while n > 0\n        result ← result + (n MOD 10)\n        n ← n DIV 10\n    endwhile\n    return result\nendfunction",options:["10","12","14","16"]}
];
