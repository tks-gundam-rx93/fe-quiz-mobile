window.FE_ROUND = 5;
window.FE_QUESTIONS = [
{id:1,section:"A",category:"セキュリティ",importance:"S",question:"利用者がWebサービスにログイン済みであることを悪用し、攻撃者が用意したページなどから本人の意図しない送金や設定変更を実行させる攻撃はどれか。",options:["CSRF","XSS","SQLインジェクション","DoS攻撃"]},
{id:2,section:"A",category:"セキュリティ",importance:"S",question:"他のサービスから漏えいした利用者IDとパスワードの組合せを用いて、別のサービスへの不正ログインを試みる攻撃はどれか。",options:["ブルートフォース攻撃","辞書攻撃","パスワードリスト攻撃","中間者攻撃"]},
{id:3,section:"A",category:"ネットワーク",importance:"S",question:"IPv4でプレフィックス長が /27 のサブネットに含まれるIPアドレス総数はいくつか。",options:["16","32","30","64"]},
{id:4,section:"A",category:"ネットワーク",importance:"S",question:"IPv4で 192.168.1.0/28 のネットワークを端末に割り当てる場合、ネットワークアドレスとブロードキャストアドレスを除いた利用可能なホストアドレス数はいくつか。",options:["8","16","12","14"]},
{id:5,section:"A",category:"セキュリティ",importance:"S",question:"デジタル署名の利用目的として最も適切なものはどれか。",options:["通信内容を第三者に読めなくすることだけ","改ざんの検知と署名者の確認","通信速度を向上させる","パスワードを復元可能にする"]},
{id:6,section:"A",category:"セキュリティ",importance:"A",question:"公開鍵暗号方式を用いて、送信者が受信者だけに読めるようデータを暗号化して送信する。このとき暗号化に使用する鍵はどれか。",options:["送信者の秘密鍵","受信者の公開鍵","受信者の秘密鍵","送信者の公開鍵"]},
{id:7,section:"A",category:"プロジェクトマネジメント",importance:"S",question:"EVMで EV=80、PV=100 のとき、SPI（スケジュール効率指数）はいくつか。",options:["0.2","1.25","0.8","1.8"]},
{id:8,section:"A",category:"ストラテジ",importance:"S",question:"PPMにおいて、市場成長率が高く、相対的市場占有率も高い事業は一般に何と呼ばれるか。",options:["花形（Star）","金のなる木（Cash Cow）","問題児（Question Mark）","負け犬（Dog）"]},
{id:9,section:"A",category:"ソフトウェア開発",importance:"A",question:"スクラムにおいて、プロダクトに必要な機能や改善項目を優先順位付きで管理する一覧はどれか。",options:["スプリントレビュー","インクリメント","プロダクトバックログ","バーンダウンチャート"]},
{id:10,section:"A",category:"ハードウェア",importance:"A",question:"RAID1の特徴として最も適切なものはどれか。",options:["複数ディスクにデータを分散するだけで冗長性を持たない","同じデータを複数ディスクへ書き込むミラーリングを行う","パリティ専用ディスクが必ず1台必要である","データ圧縮によって容量を増やす"]},
{id:11,section:"A",category:"データベース",importance:"A",question:"トランザクションのACID特性のうち、複数のトランザクションを同時実行しても、互いの処理が不適切に影響しないようにする性質はどれか。",options:["Atomicity","Consistency","Durability","Isolation"]},
{id:12,section:"A",category:"ネットワーク",importance:"A",question:"DNSの主な役割として最も適切なものはどれか。",options:["IPアドレスからMACアドレスを求める","ドメイン名とIPアドレスを対応付ける","端末へIPアドレスを自動割当する","暗号化通信の鍵交換だけを行う"]},
{id:13,section:"B",category:"スタック・キュー",importance:"S",question:"空のスタックに PUSH(A), PUSH(B), PUSH(C), POP(), PUSH(D) を実行した後、POP()を2回行う。2回目のPOP()で取り出される値はどれか。",options:["A","B","C","D"]},
{id:14,section:"B",category:"探索",importance:"S",question:"昇順配列 [3, 7, 12, 18, 24, 31, 39, 46, 55] に二分探索で39を探す。最初の比較値を中央要素とすると、比較値の順序として適切なものはどれか。",options:["24 → 39","24 → 46 → 39","31 → 39","24 → 31 → 39"]},
{id:15,section:"B",category:"配列・ループ",importance:"S",question:"次の処理を実行したとき、sumの値はいくつか。添字は1から始まる。",code:"A ← [2, 5, 8, 3, 6]\nsum ← 0\nfor i ← 1 to 5\n    if A[i] MOD 2 = 0 then\n        sum ← sum + A[i]\n    endif\nendfor",options:["10","12","16","19"]},
{id:16,section:"B",category:"再帰",importance:"S",question:"次の関数fを実行したとき、f(5)の戻り値はいくつか。",code:"function f(n)\n    if n <= 1 then\n        return 1\n    else\n        return n * f(n - 2)\n    endif\nendfunction",options:["5","10","15","30"]},
{id:17,section:"B",category:"木構造",importance:"S",question:"二分探索木に 12, 5, 18, 2, 9, 15, 20, 7 の順に値を挿入した。このとき値7の親ノードはどれか。",options:["5","9","12","15"]},
{id:18,section:"B",category:"論理演算",importance:"S",question:"A=false、B=true のとき、NOT(A OR NOT B) の値はどれか。",options:["true","false","0","条件不足で判定不能"]},
{id:19,section:"B",category:"ソート",importance:"S",question:"配列 [4, 1, 3, 2] に対して、左から隣接要素を比較し、左が大きければ交換する操作を末尾まで1回行う。処理直後の配列はどれか。",options:["[1,3,2,4]","[1,4,3,2]","[4,1,2,3]","[1,2,3,4]"]},
{id:20,section:"B",category:"疑似言語",importance:"S",question:"次の処理を実行したとき、xの値はいくつか。",code:"x ← 0\nfor i ← 1 to 4\n    x ← x + i\n    if x MOD 2 = 0 then\n        x ← x + 2\n    endif\nendfor",options:["10","12","14","16"]}
];
