window.FE_ROUND = 8;
window.FE_QUESTIONS = [
{id:1,section:"A",category:"ネットワーク",importance:"S",question:"プライベートIPv4アドレスとグローバルIPv4アドレスを、原則として1対1で変換する技術はどれか。",options:["ARP","NAT","NAPT","DHCP"]},
{id:2,section:"A",category:"セキュリティ",importance:"S",question:"Aさんが作成したデジタル署名を受信者が検証するとき、通常使用する鍵はどれか。",options:["受信者の公開鍵","受信者の秘密鍵","Aさんの公開鍵","Aさんの秘密鍵"]},
{id:3,section:"A",category:"ネットワーク",importance:"S",question:"IPv4の /28 ネットワークで、ネットワークアドレスとブロードキャストアドレスを除いた利用可能なホストアドレス数はいくつか。",options:["14","16","28","30"]},
{id:4,section:"A",category:"データベース",importance:"S",question:"SQLでGROUP BYによる集計を行う前に、対象となる行を条件で絞り込む句はどれか。",options:["HAVING","WHERE","ORDER BY","DISTINCT"]},
{id:5,section:"A",category:"データベース",importance:"S",question:"トランザクションのACID特性のうち、複数のトランザクションを同時実行しても互いに不適切な影響を与えない性質はどれか。",options:["Atomicity","Consistency","Isolation","Durability"]},
{id:6,section:"A",category:"プロジェクトマネジメント",importance:"S",question:"EVMで EV=100、AC=80 のとき、CPI（コスト効率指数）はいくつか。",options:["0.8","1.0","1.2","1.25"]},
{id:7,section:"A",category:"ソフトウェア開発",importance:"A",question:"スクラムにおいて、スプリント終了時にチームの仕事の進め方を振り返り、改善策を検討するイベントはどれか。",options:["デイリースクラム","スプリントレビュー","スプリントレトロスペクティブ","スプリントプランニング"]},
{id:8,section:"A",category:"システム構成",importance:"A",question:"RAID0の特徴として最も適切なものはどれか。",options:["データを複数ディスクへ分散して高速化するが、冗長性はない","同じデータを複数ディスクへ書き込む","パリティを複数ディスクへ分散する","1台故障しても必ず復旧できる"]},
{id:9,section:"A",category:"クラウド",importance:"A",question:"利用者がOSやミドルウェアの管理を意識せず、アプリケーションの開発・実行基盤をサービスとして利用する形態はどれか。",options:["SaaS","PaaS","IaaS","DaaS"]},
{id:10,section:"A",category:"ストラテジ",importance:"A",question:"SWOT分析において、競合企業の参入や原材料価格の上昇など、自社にとって不利な外部環境はどれに分類されるか。",options:["Strength","Weakness","Opportunity","Threat"]},
{id:11,section:"A",category:"法務",importance:"A",question:"商品名、サービス名、ロゴなど、商品やサービスを識別する標識を保護する権利はどれか。",options:["著作権","特許権","商標権","意匠権"]},
{id:12,section:"A",category:"システム構成",importance:"S",question:"稼働率0.9の装置を2台並列に接続し、どちらか1台が動作すればシステムが稼働する。各装置の故障が独立しているとき、システムの稼働率はいくつか。",options:["0.81","0.99","1.8","0.9"]},
{id:13,section:"B",category:"キュー",importance:"S",question:"空のキューに ENQUEUE(A), ENQUEUE(B), DEQUEUE(), ENQUEUE(C), ENQUEUE(D), DEQUEUE(), DEQUEUE() を順に実行した。最後のDEQUEUE()で取り出される値はどれか。",options:["A","B","C","D"]},
{id:14,section:"B",category:"スタック",importance:"S",question:"空のスタックに PUSH(2), PUSH(5), POP(), PUSH(7), PUSH(9), POP(), POP() を順に実行した。最後のPOP()で取り出される値はどれか。",options:["2","7","9","5"]},
{id:15,section:"B",category:"ループ",importance:"S",question:"次の処理を実行したとき、xの値はいくつか。",code:"x ← 0\nfor i ← 1 to 4\n    x ← x + 2 * i\nendfor",options:["8","12","16","20"]},
{id:16,section:"B",category:"探索",importance:"S",question:"昇順配列 [2, 6, 11, 15, 19, 24, 30] から二分探索で6を探す。比較される値の順序はどれか。",options:["15 → 6","11 → 6","15 → 11 → 6","15 → 2 → 6"]},
{id:17,section:"B",category:"再帰",importance:"S",question:"次の関数fを実行したとき、f(5)の戻り値はいくつか。",code:"function f(n)\n    if n <= 1 then\n        return 1\n    else\n        return f(n - 1) + f(n - 2)\n    endif\nendfunction",options:["5","6","8","13"]},
{id:18,section:"B",category:"配列",importance:"S",question:"次の処理を実行した後の配列Aはどれか。添字は1から始まる。",code:"A ← [5, 1, 4, 2, 3]\nfor i ← 1 to 4\n    if A[i] > A[i + 1] then\n        temp ← A[i]\n        A[i] ← A[i + 1]\n        A[i + 1] ← temp\n    endif\nendfor",options:["[1,2,3,4,5]","[1,4,2,3,5]","[1,5,4,2,3]","[5,1,2,3,4]"]},
{id:19,section:"B",category:"二重ループ",importance:"S",question:"次の処理を実行したとき、countの値はいくつか。",code:"count ← 0\nfor i ← 1 to 3\n    for j ← 1 to 3\n        if (i + j) MOD 2 = 0 then\n            count ← count + 1\n        endif\n    endfor\nendfor",options:["3","4","6","5"]},
{id:20,section:"B",category:"関数・疑似言語",importance:"S",question:"次の関数hを用いてmainの処理を実行したとき、resultの値はいくつか。",code:"function h(a, b)\n    return a * 2 + b\nendfunction\n\nx ← h(2, 3)\nresult ← h(x, 1)",options:["15","14","12","8"]}
];
