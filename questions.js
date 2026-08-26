window.FE_ROUND = 6;
window.FE_QUESTIONS = [
{id:1,section:"A",category:"セキュリティ",importance:"S",question:"Webアプリケーションで、利用者が入力した文字列をHTMLへ出力するときに特殊文字を適切にエスケープする対策が、特に有効な攻撃はどれか。",options:["CSRF","XSS","パスワードリスト攻撃","DoS攻撃"]},
{id:2,section:"A",category:"セキュリティ",importance:"S",question:"公開鍵暗号方式で、AさんがBさんだけに読める機密データを送る。Aさんが暗号化に用いる鍵はどれか。",options:["Aさんの公開鍵","Aさんの秘密鍵","Bさんの公開鍵","Bさんの秘密鍵"]},
{id:3,section:"A",category:"ネットワーク",importance:"S",question:"IPv4でプレフィックス長が /29 のサブネットに含まれるIPアドレス総数はいくつか。",options:["6","8","16","29"]},
{id:4,section:"A",category:"ネットワーク",importance:"S",question:"IPv4の /26 のネットワークで、ネットワークアドレスとブロードキャストアドレスを除いた利用可能なホストアドレス数はいくつか。",options:["30","62","64","126"]},
{id:5,section:"A",category:"データベース",importance:"S",question:"トランザクションのACID特性のうち、正常に完了したトランザクションの結果が、その後障害が発生しても失われない性質はどれか。",options:["Atomicity","Consistency","Isolation","Durability"]},
{id:6,section:"A",category:"データベース",importance:"A",question:"SQLで、社員表を部署ごとに集計し、社員数が5人以上の部署だけを表示したい。集計結果に対する条件「社員数が5人以上」を指定する句はどれか。",options:["WHERE","HAVING","ORDER BY","DISTINCT"]},
{id:7,section:"A",category:"プロジェクトマネジメント",importance:"S",question:"EVMで EV=120、PV=100、AC=150 のとき、CPI（コスト効率指数）はいくつか。",options:["0.8","1.2","1.25","1.5"]},
{id:8,section:"A",category:"プロジェクトマネジメント",importance:"S",question:"EVMで EV=120、PV=100 のプロジェクトの進捗状況として適切なものはどれか。",options:["予定より進んでいる","予定より遅れている","予定どおりである","コスト超過かどうかだけが分かる"]},
{id:9,section:"A",category:"ソフトウェア開発",importance:"A",question:"スクラムで、1回のスプリントで実施すると選択したプロダクトバックログ項目と、それを実現するための計画をまとめたものはどれか。",options:["プロダクトバックログ","スプリントバックログ","インクリメント","ユーザーストーリー"]},
{id:10,section:"A",category:"システム構成",importance:"A",question:"RAID5の特徴として最も適切なものはどれか。",options:["全ディスクへ同一データを書き込む","データとパリティを複数ディスクに分散して記録する","冗長性を持たず高速化だけを目的とする","必ず2台だけで構成する"]},
{id:11,section:"A",category:"ストラテジ",importance:"A",question:"PPMにおいて、市場成長率は低いが相対的市場占有率が高く、安定した資金を生み出す事業はどれか。",options:["花形（Star）","問題児（Question Mark）","金のなる木（Cash Cow）","負け犬（Dog）"]},
{id:12,section:"A",category:"ネットワーク",importance:"A",question:"LAN内の端末にIPアドレス、サブネットマスク、デフォルトゲートウェイなどを自動的に設定するために用いるプロトコルはどれか。",options:["DNS","ARP","DHCP","ICMP"]},
{id:13,section:"B",category:"スタック・キュー",importance:"S",question:"空のキューに ENQUEUE(A), ENQUEUE(B), ENQUEUE(C), DEQUEUE(), ENQUEUE(D), ENQUEUE(E), DEQUEUE() を実行した。この後、DEQUEUE()を2回行ったとき、2回目に取り出される値はどれか。",options:["B","C","D","E"]},
{id:14,section:"B",category:"配列・ループ",importance:"S",question:"次の処理を実行したとき、countの値はいくつか。添字は1から始まる。",code:"A ← [3, 8, 5, 12, 7, 10]\ncount ← 0\nfor i ← 1 to 5\n    if A[i] < A[i + 1] then\n        count ← count + 1\n    endif\nendfor",options:["2","3","4","5"]},
{id:15,section:"B",category:"再帰",importance:"S",question:"次の関数fを実行したとき、f(6)の戻り値はいくつか。",code:"function f(n)\n    if n <= 1 then\n        return 1\n    else\n        return f(n - 1) + 2 * f(n - 2)\n    endif\nendfunction",options:["21","31","43","63"]},
{id:16,section:"B",category:"疑似言語",importance:"S",question:"次の処理を実行したとき、xの値はいくつか。",code:"x ← 1\nfor i ← 1 to 4\n    if i MOD 2 = 0 then\n        x ← x * 2\n    else\n        x ← x + i\n    endif\nendfor",options:["10","12","14","16"]},
{id:17,section:"B",category:"二重ループ",importance:"S",question:"次の処理を実行したとき、sumの値はいくつか。",code:"sum ← 0\nfor i ← 1 to 4\n    for j ← i to 4\n        sum ← sum + 1\n    endfor\nendfor",options:["6","8","10","16"]},
{id:18,section:"B",category:"探索",importance:"S",question:"昇順配列 [2, 5, 9, 14, 20, 27, 35, 44, 56, 68, 81] から二分探索で68を探す。中央要素の選択で要素数が偶数になった場合は小さい添字側を選ぶとき、比較値の順序はどれか。",options:["27 → 56 → 68","27 → 68","35 → 56 → 68","27 → 44 → 68"]},
{id:19,section:"B",category:"配列",importance:"S",question:"次の処理を実行した後の配列Aはどれか。添字は1から始まる。",code:"A ← [2, 4, 6, 8, 10]\nfor i ← 2 to 5\n    A[i] ← A[i] + A[i - 1]\nendfor",options:["[2,6,10,14,18]","[2,6,12,20,30]","[2,6,12,20,28]","[2,4,10,18,28]"]},
{id:20,section:"B",category:"関数・疑似言語",importance:"S",question:"次の関数gを用いて main の処理を実行したとき、resultの値はいくつか。",code:"function g(a, b)\n    if a > b then\n        return a - b\n    else\n        return a + b\n    endif\nendfunction\n\nx ← g(3, 5)\ny ← g(8, 2)\nresult ← g(x, y)",options:["2","8","14","16"]}
];
