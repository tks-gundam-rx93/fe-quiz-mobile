window.FE_ROUND = 7;
window.FE_QUESTIONS = [
{id:1,section:"A",category:"ネットワーク",importance:"S",question:"1個のグローバルIPv4アドレスを、ポート番号を利用して複数のプライベートIPv4アドレスに対応付ける技術はどれか。",options:["ARP","NAPT","DHCP","DNS"]},
{id:2,section:"A",category:"セキュリティ",importance:"S",question:"DNSサーバのキャッシュへ偽の対応情報を登録させ、利用者を不正なサイトへ誘導する攻撃はどれか。",options:["DNSキャッシュポイズニング","SQLインジェクション","CSRF","パスワードリスト攻撃"]},
{id:3,section:"A",category:"ネットワーク",importance:"S",question:"IPv4の /27 ネットワークで、ネットワークアドレスとブロードキャストアドレスを除いた利用可能なホストアドレス数はいくつか。",options:["16","30","32","62"]},
{id:4,section:"A",category:"データベース",importance:"A",question:"データベースの列にインデックスを設定したときの一般的な説明として、最も適切なものはどれか。",options:["検索が高速になる一方、更新時の負荷や記憶領域が増える","検索も更新も必ず高速になる","データの重複が自動的になくなる","排他制御が不要になる"]},
{id:5,section:"A",category:"データベース",importance:"S",question:"トランザクションのACID特性のうち、処理の前後でデータベースの整合性制約が保たれる性質はどれか。",options:["Atomicity","Consistency","Isolation","Durability"]},
{id:6,section:"A",category:"プロジェクトマネジメント",importance:"S",question:"EVMで EV=90、PV=120 のとき、SPI（スケジュール効率指数）はいくつか。",options:["0.75","1.25","30","-30"]},
{id:7,section:"A",category:"ソフトウェア開発",importance:"A",question:"スクラムにおいて、開発者が毎日短時間集まり、スプリントゴール達成に向けた進捗と今後の作業を確認・調整するイベントはどれか。",options:["スプリントレビュー","デイリースクラム","スプリントレトロスペクティブ","プロダクトバックログリファインメント"]},
{id:8,section:"A",category:"システム構成",importance:"A",question:"RAID1の特徴として最も適切なものはどれか。",options:["データを複数ディスクへ分散するだけで冗長性はない","同じデータを複数ディスクへ書き込む","データとパリティを3台以上へ分散する","複数ディスクを1台として扱わない"]},
{id:9,section:"A",category:"クラウド",importance:"A",question:"利用者が仮想マシン、ストレージ、ネットワークなどのITインフラをサービスとして利用するクラウドの提供形態はどれか。",options:["SaaS","PaaS","IaaS","DaaS"]},
{id:10,section:"A",category:"ストラテジ",importance:"A",question:"SWOT分析において、法改正による新市場の拡大や競合企業の撤退など、自社にとって有利な外部環境はどれに分類されるか。",options:["Strength","Weakness","Opportunity","Threat"]},
{id:11,section:"A",category:"法務",importance:"A",question:"プログラムのソースコードを創作した時点で、原則として自動的に発生する権利はどれか。",options:["特許権","著作権","商標権","意匠権"]},
{id:12,section:"A",category:"システム構成",importance:"S",question:"MTBFが900時間、MTTRが100時間のシステムの稼働率はいくつか。",options:["0.1","0.9","1.0","9.0"]},
{id:13,section:"B",category:"スタック",importance:"S",question:"空のスタックに PUSH(A), PUSH(B), POP(), PUSH(C), PUSH(D), POP() を順に実行した。最後のPOP()で取り出される値はどれか。",options:["A","B","C","D"]},
{id:14,section:"B",category:"配列・ループ",importance:"S",question:"次の処理を実行したとき、countの値はいくつか。添字は1から始まる。",code:"A ← [4, 7, 2, 9, 6, 11]\ncount ← 0\nfor i ← 1 to 6\n    if A[i] MOD 2 = 0 then\n        count ← count + 1\n    endif\nendfor",options:["2","3","4","5"]},
{id:15,section:"B",category:"二重ループ",importance:"S",question:"次の処理を実行したとき、sumの値はいくつか。",code:"sum ← 0\nfor i ← 1 to 3\n    for j ← 1 to i\n        sum ← sum + i\n    endfor\nendfor",options:["6","10","14","18"]},
{id:16,section:"B",category:"探索",importance:"S",question:"昇順配列 [3, 8, 12, 17, 23, 31, 42] から二分探索で17を探す。最初に比較される値はどれか。",options:["8","12","17","23"]},
{id:17,section:"B",category:"再帰",importance:"S",question:"次の関数fを実行したとき、f(5)の戻り値はいくつか。",code:"function f(n)\n    if n = 0 then\n        return 0\n    else\n        return n + f(n - 1)\n    endif\nendfunction",options:["10","15","20","25"]},
{id:18,section:"B",category:"配列",importance:"S",question:"次の処理を実行した後の配列Aはどれか。添字は1から始まる。",code:"A ← [1, 2, 3, 4, 5]\nfor i ← 1 to 2\n    temp ← A[i]\n    A[i] ← A[6 - i]\n    A[6 - i] ← temp\nendfor",options:["[5,4,3,2,1]","[5,2,3,4,1]","[1,4,3,2,5]","[4,5,3,1,2]"]},
{id:19,section:"B",category:"疑似言語",importance:"S",question:"次の処理を実行したとき、xの値はいくつか。",code:"x ← 0\nfor i ← 1 to 5\n    if i MOD 2 = 1 then\n        x ← x + i\n    else\n        x ← x - i\n    endif\nendfor",options:["1","3","5","9"]},
{id:20,section:"B",category:"関数・疑似言語",importance:"S",question:"次の関数gを用いてmainの処理を実行したとき、resultの値はいくつか。",code:"function g(a, b)\n    if a < b then\n        return b - a\n    else\n        return a + b\n    endif\nendfunction\n\nx ← g(4, 9)\nresult ← g(x, 3)",options:["2","5","8","12"]}
];
