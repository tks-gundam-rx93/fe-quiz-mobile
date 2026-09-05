window.FE_PRIORITY_TERMS = [27, 49, 50, 64, 65, 68, 69, 73, 75];
window.FE_TERMS = [
{id:1,cat:"ネットワーク",prompt:"IPアドレス → MACアドレス",options:["ARP","DNS","DHCP","NTP"],answer:0,explain:"ARPは、同一ネットワーク上でIPアドレスからMACアドレスを求める。",contrast:"DNSはドメイン名→IP、DHCPはIP設定の自動割当。"},
{id:2,cat:"ネットワーク",prompt:"ドメイン名 → IPアドレス",options:["ARP","DNS","SMTP","SNMP"],answer:1,explain:"DNSはドメイン名をIPアドレスへ名前解決する。",contrast:"ARPはIP→MAC。"},
{id:3,cat:"ネットワーク",prompt:"IPアドレスなどを自動割当",options:["DHCP","DNS","ARP","FTP"],answer:0,explain:"DHCPは端末へIPアドレス、デフォルトゲートウェイ、DNSなどを自動設定する。",contrast:"DNSは名前解決。"},
{id:4,cat:"ネットワーク",prompt:"Web通信を暗号化（HTTPS）",options:["TLS","ICMP","FTP","ARP"],answer:0,explain:"HTTPSではTLSを用いて通信を暗号化し、サーバ認証などを行う。",contrast:"ICMPはエラー通知や疎通確認。"},
{id:5,cat:"ネットワーク",prompt:"メール送信",options:["SMTP","POP3","IMAP","DNS"],answer:0,explain:"SMTPは電子メールの送信・転送に用いる。",contrast:"POP3/IMAPはメール受信。"},
{id:6,cat:"ネットワーク",prompt:"ネットワーク疎通確認でpingが利用",options:["ICMP","TCP","SMTP","DHCP"],answer:0,explain:"pingはICMP Echo Request/Replyを利用する。",contrast:"TCPは信頼性のあるトランスポート層通信。"},
{id:7,cat:"ネットワーク",prompt:"コネクション型・再送制御・順序制御",options:["TCP","UDP","IP","ARP"],answer:0,explain:"TCPはコネクション型で、再送や順序制御により信頼性を確保する。",contrast:"UDPはコネクションレスで軽量。"},
{id:8,cat:"ネットワーク",prompt:"コネクションレス・低オーバーヘッド",options:["UDP","TCP","TLS","HTTP"],answer:0,explain:"UDPは接続確立や再送制御を基本的に行わない。",contrast:"TCPは接続型で再送制御を行う。"},
{id:9,cat:"セキュリティ",prompt:"HTMLに不正スクリプトを埋め込む",options:["XSS","CSRF","SQLインジェクション","DoS"],answer:0,explain:"XSSはWebページへ不正スクリプトを混入させ、利用者のブラウザ上で実行させる。",contrast:"CSRFはログイン済み利用者に意図しない操作をさせる。"},
{id:10,cat:"セキュリティ",prompt:"SQL文に不正な入力を混ぜる",options:["SQLインジェクション","XSS","CSRF","ブルートフォース"],answer:0,explain:"SQLインジェクションは入力値を通じてSQL文の意味を改変する攻撃。",contrast:"XSSはHTML/JavaScript側への攻撃。"},
{id:11,cat:"セキュリティ",prompt:"ログイン済み利用者に意図しない操作を実行させる",options:["CSRF","XSS","DoS","SQLインジェクション"],answer:0,explain:"CSRFは認証済みセッションを悪用し、本人の意図しないリクエストを送らせる。",contrast:"XSSはブラウザ上で不正スクリプトを実行させる。"},
{id:12,cat:"セキュリティ",prompt:"パスワードを総当たり",options:["ブルートフォース攻撃","パスワードリスト攻撃","XSS","CSRF"],answer:0,explain:"ブルートフォース攻撃は候補を網羅的に試す総当たり攻撃。",contrast:"パスワードリスト攻撃は漏えい済みID/PWを使う。"},
{id:13,cat:"セキュリティ",prompt:"漏えいしたID/PWを別サービスでも試す",options:["パスワードリスト攻撃","ブルートフォース攻撃","辞書攻撃","DoS"],answer:0,explain:"パスワードリスト攻撃は他所から漏えいした認証情報の使い回しを狙う。",contrast:"ブルートフォースは総当たり。"},
{id:14,cat:"セキュリティ",prompt:"同じパスワードでも異なるハッシュ値にする",options:["ソルト","公開鍵","セッションID","デジタル署名"],answer:0,explain:"ソルトはパスワードにランダム値を加えてからハッシュ化する。",contrast:"デジタル署名は改ざん検知と署名者確認。"},
{id:15,cat:"セキュリティ",prompt:"改ざんの有無＋署名者の確認",options:["デジタル署名","共通鍵暗号","ハッシュだけ","バックアップ"],answer:0,explain:"デジタル署名はメッセージの完全性と署名者の真正性を確認する。",contrast:"暗号化の主目的は機密性。"},
{id:16,cat:"セキュリティ",prompt:"送信者と受信者が同じ鍵を使う",options:["共通鍵暗号方式","公開鍵暗号方式","ハッシュ関数","デジタル署名"],answer:0,explain:"共通鍵暗号方式は暗号化と復号に同じ秘密鍵を使う。",contrast:"公開鍵暗号方式は異なる鍵のペアを使う。"},
{id:17,cat:"セキュリティ",prompt:"公開鍵と秘密鍵のペアを利用",options:["公開鍵暗号方式","共通鍵暗号方式","CRC","RAID"],answer:0,explain:"公開鍵暗号方式は公開鍵と秘密鍵の組を用いる。",contrast:"共通鍵暗号方式は同一鍵を共有する。"},
{id:18,cat:"OS",prompt:"必要になったページだけ主記憶へ読み込む",options:["デマンドページング","スプーリング","パイプライン","ラウンドロビン"],answer:0,explain:"デマンドページングは参照された時点で必要なページを読み込む。",contrast:"パイプラインはCPU命令処理の高速化。"},
{id:19,cat:"OS",prompt:"必要なページが主記憶にない",options:["ページフォールト","デッドロック","スラッシング","フラグメンテーション"],answer:0,explain:"ページフォールトは参照ページが主記憶に存在しないときに発生する。",contrast:"スラッシングはページ入替えが頻発する状態。"},
{id:20,cat:"OS",prompt:"ページ入替えが頻発して処理性能低下",options:["スラッシング","デッドロック","スプーリング","パイプライン"],answer:0,explain:"スラッシングはページフォールトが多発し、入替え処理ばかりになる状態。",contrast:"デッドロックは資源待ちで相互に停止する状態。"},
{id:21,cat:"OS",prompt:"複数プロセスが互いの資源解放を待ち続ける",options:["デッドロック","スラッシング","ページフォールト","スプーリング"],answer:0,explain:"デッドロックは複数処理が互いに資源を待ち、進行不能になる状態。",contrast:"スラッシングは仮想記憶のページ交換問題。"},
{id:22,cat:"ハードウェア",prompt:"CPUと主記憶の速度差を緩和",options:["キャッシュメモリ","仮想記憶","SSD","レジスタ退避"],answer:0,explain:"キャッシュメモリは頻繁に使うデータを高速な記憶領域へ保持する。",contrast:"仮想記憶は主記憶容量を論理的に拡張する。"},
{id:23,cat:"ハードウェア",prompt:"命令処理を段階化し重ねて実行",options:["パイプライン処理","スプーリング","ページング","DMA"],answer:0,explain:"パイプライン処理は命令処理工程を段階化し、複数命令を並行的に進める。",contrast:"スプーリングは低速I/Oとの速度差を吸収する。"},
{id:24,cat:"DB",prompt:"表の各行を一意に識別",options:["主キー","外部キー","インデックス","ビュー"],answer:0,explain:"主キーは表の行を一意に識別する。",contrast:"外部キーは他表のキーとの参照関係を表す。"},
{id:25,cat:"DB",prompt:"他の表の主キーを参照",options:["外部キー","主キー","候補キー","ビュー"],answer:0,explain:"外部キーは他表の主キーなどを参照し、表間の関係を表す。",contrast:"主キーは自表の行を一意に識別。"},
{id:26,cat:"DB",prompt:"データ重複や更新時不整合を減らす",options:["正規化","索引化","暗号化","排他制御"],answer:0,explain:"正規化はデータの冗長性や更新時異常を抑えるため表を適切に分割する。",contrast:"索引は検索高速化が主目的。"},
{id:27,cat:"DB",prompt:"GROUP BY後の集計結果に条件指定",options:["HAVING","WHERE","ORDER BY","FROM"],answer:0,explain:"HAVINGはグループ化・集計後の結果に条件を指定する。",contrast:"WHEREは集計前の行を絞り込む。"},
{id:28,cat:"DB",prompt:"トランザクション：全部成功か全部取消し",options:["Atomicity","Consistency","Isolation","Durability"],answer:0,explain:"Atomicity（原子性）は処理を全て実行するか、全く実行しないことを保証する。",contrast:"Durabilityは確定結果が失われない性質。"},
{id:29,cat:"PM",prompt:"作業を階層的に細分化",options:["WBS","PERT","DFD","ER図"],answer:0,explain:"WBSはプロジェクト作業を管理可能な単位まで階層的に分解する。",contrast:"PERTは作業順序・日程分析。"},
{id:30,cat:"PM",prompt:"遅れるとプロジェクト全体も遅れる経路",options:["クリティカルパス","マイルストーン","スプリント","ベースライン"],answer:0,explain:"クリティカルパスは余裕時間がなく、遅延が全体工期へ直結する経路。",contrast:"マイルストーンは節目となる時点。"},
{id:31,cat:"PM",prompt:"残作業量を時間経過で表示",options:["バーンダウンチャート","ガントチャート","パレート図","管理図"],answer:0,explain:"バーンダウンチャートは残作業量の減少を時系列で示す。",contrast:"ガントチャートは作業期間や進捗を横棒で示す。"},
{id:32,cat:"PM",prompt:"スクラムの短い開発期間",options:["スプリント","フェーズ","クリティカルパス","マイルストーン"],answer:0,explain:"スクラムでは一定期間の反復単位をスプリントと呼ぶ。",contrast:"マイルストーンは節目。"},
{id:33,cat:"PM",prompt:"EVM：EV − PV",options:["SV","CV","SPI","CPI"],answer:0,explain:"SV（Schedule Variance）= EV − PV。",contrast:"CV（Cost Variance）= EV − AC。"},
{id:34,cat:"PM",prompt:"EVM：EV − AC",options:["CV","SV","SPI","PV"],answer:0,explain:"CV（Cost Variance）= EV − AC。",contrast:"SV = EV − PV。"},
{id:35,cat:"ストラテジ",prompt:"強み・弱み・機会・脅威",options:["SWOT分析","PPM","ABC分析","5フォース"],answer:0,explain:"SWOT分析は内部環境の強み・弱みと外部環境の機会・脅威を整理する。",contrast:"PPMは市場成長率と相対的市場占有率。"},
{id:36,cat:"ストラテジ",prompt:"市場成長率 × 相対的市場占有率",options:["PPM","SWOT分析","ABC分析","バリューチェーン"],answer:0,explain:"PPMは市場成長率と相対的市場占有率で事業を分類する。",contrast:"SWOTは強み・弱み・機会・脅威。"},
{id:37,cat:"ストラテジ",prompt:"重要度に応じてA・B・Cに分類",options:["ABC分析","PPM","SWOT分析","PERT"],answer:0,explain:"ABC分析は重要度や金額などに応じて対象をA・B・Cに分類する。",contrast:"PPMは事業ポートフォリオ分析。"},
{id:38,cat:"システム",prompt:"MTBF ÷ (MTBF + MTTR)",options:["稼働率","故障率","スループット","応答時間"],answer:0,explain:"稼働率は一般に MTBF / (MTBF + MTTR) で求める。",contrast:"MTBFは平均故障間隔、MTTRは平均修復時間。"},
{id:39,cat:"システム",prompt:"直列システムの稼働率",options:["各装置の稼働率を掛ける","故障率を掛けて1から引く","平均を取る","足し合わせる"],answer:0,explain:"全装置が稼働する必要がある直列構成では、独立なら各稼働率を乗算する。",contrast:"並列構成では全系故障確率から求める。"},
{id:40,cat:"システム",prompt:"並列システムの稼働率",options:["1 − 全装置が故障する確率","各稼働率を単純に足す","最小の稼働率だけ使う","各稼働率を掛けるだけ"],answer:0,explain:"1台でも動けばよい並列構成は、1から全装置が故障する確率を引く。",contrast:"直列は各稼働率を乗算。"},
{id:41,cat:"開発",prompt:"利用者視点の機能要求を短文で表現",options:["ユーザーストーリー","WBS","ER図","決定表"],answer:0,explain:"ユーザーストーリーは利用者の立場から欲しい機能や価値を簡潔に記述する。",contrast:"WBSは作業分解。"},
{id:42,cat:"開発",prompt:"外部仕様を変えず内部構造を改善",options:["リファクタリング","リバースエンジニアリング","リエンジニアリング","プロトタイピング"],answer:0,explain:"リファクタリングは外部動作を変えずコード内部を改善する。",contrast:"リバースエンジニアリングは既存成果物から仕様等を解析する。"},
{id:43,cat:"開発",prompt:"小さな機能単位を短期間で反復開発",options:["アジャイル開発","ウォーターフォール","V字モデル","ビッグバン開発"],answer:0,explain:"アジャイル開発は短い反復で開発・評価・改善を繰り返す。",contrast:"ウォーターフォールは工程を順次進める。"},
{id:44,cat:"法務",prompt:"創作した時点で原則自動的に発生",options:["著作権","特許権","商標権","意匠権"],answer:0,explain:"著作権は著作物を創作した時点で原則として発生する。",contrast:"特許権などは原則として出願・登録が必要。"},
{id:45,cat:"法務",prompt:"発明を保護",options:["特許権","著作権","商標権","意匠権"],answer:0,explain:"特許権は技術的な発明を保護する。",contrast:"商標権は商品・サービスの標識を保護。"},
{id:46,cat:"法務",prompt:"商品名やロゴなどの標識を保護",options:["商標権","特許権","著作権","営業秘密"],answer:0,explain:"商標権は商品・サービスを識別する名称やマークなどを保護する。",contrast:"特許権は発明。"},
{id:47,cat:"AI",prompt:"教師データに正解ラベルがある",options:["教師あり学習","教師なし学習","強化学習","クラスタリングだけ"],answer:0,explain:"教師あり学習は入力データと正解ラベルの組を用いて学習する。",contrast:"教師なし学習は正解ラベルなし。"},
{id:48,cat:"AI",prompt:"正解ラベルなしでデータの構造を見つける",options:["教師なし学習","教師あり学習","強化学習","回帰だけ"],answer:0,explain:"教師なし学習はラベルなしデータからクラスタや特徴構造を見つける。",contrast:"教師あり学習は正解ラベルあり。"},
{id:49,cat:"クラウド",prompt:"OSやミドルウェアを意識せずアプリ実行基盤を利用",options:["PaaS","IaaS","SaaS","DaaS"],answer:0,explain:"PaaSはアプリケーション実行・開発基盤をサービスとして提供する。",contrast:"IaaSは仮想サーバ等、SaaSは完成済みアプリ。"},
{id:50,cat:"クラウド",prompt:"完成したアプリケーションをサービスとして利用",options:["SaaS","PaaS","IaaS","RAID"],answer:0,explain:"SaaSは利用者が完成したソフトウェア機能をネット経由で利用する。",contrast:"PaaSはアプリ実行基盤、IaaSはインフラ。"},
{id:51,cat:"ネットワーク",prompt:"IPv4 /27 のIPアドレス総数",options:["32","30","16","64"],answer:0,explain:"/27はホスト部が5ビットなので、IPアドレス総数は2^5=32個。",contrast:"利用可能ホスト数ならネットワークアドレスとブロードキャストアドレスを除いて30個。"},
{id:52,cat:"ネットワーク",prompt:"IPv4 /28 の利用可能ホスト数",options:["14","16","12","30"],answer:0,explain:"/28はホスト部4ビットで総数16個。ネットワークとブロードキャストを除き14個利用できる。",contrast:"総アドレス数を聞かれた場合は16個。"},
{id:53,cat:"セキュリティ",prompt:"受信者だけに読ませる公開鍵暗号：暗号化に使う鍵",options:["受信者の公開鍵","受信者の秘密鍵","送信者の公開鍵","送信者の秘密鍵"],answer:0,explain:"機密性を目的とする公開鍵暗号では、送信者は受信者の公開鍵で暗号化し、受信者が自分の秘密鍵で復号する。",contrast:"デジタル署名では署名者の秘密鍵を使う点と区別する。"},
{id:54,cat:"PM",prompt:"EVM：SPI の計算式",options:["EV ÷ PV","EV ÷ AC","EV − PV","EV − AC"],answer:0,explain:"SPI（Schedule Performance Index）= EV / PV。1未満なら計画より遅れている。",contrast:"CPI=EV/AC、SV=EV−PV、CV=EV−AC。"},
{id:55,cat:"開発",prompt:"スクラム：機能・改善項目を優先順位付きで管理",options:["プロダクトバックログ","スプリントレビュー","インクリメント","バーンダウンチャート"],answer:0,explain:"プロダクトバックログは、プロダクトに必要な機能・改善などを優先順位付きで管理する一覧。",contrast:"スプリントは開発期間、インクリメントは完成した成果の増分。"},
{id:56,cat:"DB",prompt:"ACID：同時実行でも互いに不適切な影響を与えない",options:["Isolation","Atomicity","Consistency","Durability"],answer:0,explain:"Isolation（独立性・分離性）は、複数トランザクションを同時実行しても互いの処理が不適切に干渉しない性質。",contrast:"Atomicityは全て成功か全て取消し、Durabilityは確定結果の永続性。"},
{id:57,cat:"ストラテジ",prompt:"PPM：高成長率 × 高市場占有率",options:["花形（Star）","金のなる木","問題児","負け犬"],answer:0,explain:"PPMで市場成長率・相対的市場占有率ともに高い事業は花形（Star）。",contrast:"高占有率・低成長率は金のなる木、低占有率・高成長率は問題児。"},
{id:58,cat:"ハードウェア",prompt:"RAID1：同じデータを複数ディスクへ保存",options:["ミラーリング","ストライピング","パリティ分散","データ圧縮"],answer:0,explain:"RAID1は同じデータを複数ディスクへ書き込むミラーリングで冗長性を確保する。",contrast:"RAID0はストライピングで、単独では冗長性を持たない。"},
{id:59,cat:"ネットワーク",prompt:"1個のグローバルIPv4アドレスをポート番号で複数端末に対応付け",options:["NAPT","ARP","DHCP","DNS"],answer:0,explain:"NAPTはIPアドレスとポート番号を変換し、複数端末で一つのグローバルIPv4アドレスを共有する。",contrast:"NATは基本的にIPアドレスを変換し、NAPTはポート番号も利用する。"},
{id:60,cat:"セキュリティ",prompt:"DNSキャッシュへ偽情報を登録し不正サイトへ誘導",options:["DNSキャッシュポイズニング","CSRF","XSS","SQLインジェクション"],answer:0,explain:"DNSキャッシュポイズニングは偽の名前解決情報をキャッシュへ混入させる攻撃。",contrast:"XSSはブラウザ上で不正スクリプトを実行させる。"},
{id:61,cat:"DB",prompt:"ACID：処理前後で整合性制約を維持",options:["Consistency","Atomicity","Isolation","Durability"],answer:0,explain:"Consistency（一貫性）はトランザクション前後で整合性が保たれる性質。",contrast:"Isolationは同時実行時の相互干渉を防ぐ性質。"},
{id:62,cat:"PM",prompt:"EVM：EV ÷ PV",options:["SPI","CPI","SV","CV"],answer:0,explain:"SPIはEVをPVで割ったスケジュール効率指数。",contrast:"CPIはEV÷AC。"},
{id:63,cat:"開発",prompt:"スクラム：毎日短時間で進捗と今後の作業を調整",options:["デイリースクラム","スプリントレビュー","レトロスペクティブ","スプリントプランニング"],answer:0,explain:"デイリースクラムは開発者がスプリントゴールに向けた進捗を毎日確認・調整するイベント。",contrast:"レビューは成果物、レトロスペクティブは進め方を検査する。"},
{id:64,cat:"クラウド",prompt:"仮想マシン・ストレージ・ネットワークをサービスとして利用",options:["IaaS","PaaS","SaaS","DaaS"],answer:0,explain:"IaaSは仮想サーバなどのITインフラをサービスとして提供する。",contrast:"PaaSはアプリ実行基盤、SaaSは完成済みアプリ。"},
{id:65,cat:"ストラテジ",prompt:"SWOT：自社に有利な外部環境",options:["Opportunity","Strength","Weakness","Threat"],answer:0,explain:"Opportunity（機会）は自社に有利な外部環境。",contrast:"StrengthとWeaknessは内部環境、Threatは不利な外部環境。"},
{id:66,cat:"システム",prompt:"MTBF=900、MTTR=100の稼働率",options:["0.9","0.1","1.0","9.0"],answer:0,explain:"稼働率=900÷(900+100)=0.9。",contrast:"分母はMTBFとMTTRの合計。"},
{id:67,cat:"ネットワーク",prompt:"プライベートIPとグローバルIPを原則1対1で変換",options:["NAT","NAPT","ARP","DHCP"],answer:0,explain:"NATはプライベートIPアドレスとグローバルIPアドレスを変換する。",contrast:"NAPTはIPアドレスに加えてポート番号も変換し、1個のグローバルIPを複数端末で共有する。"},
{id:68,cat:"セキュリティ",prompt:"デジタル署名の検証に使用する鍵",options:["署名者の公開鍵","署名者の秘密鍵","受信者の公開鍵","受信者の秘密鍵"],answer:0,explain:"署名者の秘密鍵で作成されたデジタル署名は、署名者の公開鍵で検証する。",contrast:"機密性を目的とした暗号化では受信者の公開鍵を使う。"},
{id:69,cat:"DB",prompt:"GROUP BYによる集計前の行を絞り込む句",options:["WHERE","HAVING","ORDER BY","DISTINCT"],answer:0,explain:"WHEREはグループ化や集計を行う前の行を条件で絞り込む。",contrast:"HAVINGは集計後のグループに条件を指定する。"},
{id:70,cat:"PM",prompt:"EVM：EV ÷ AC",options:["CPI","SPI","CV","SV"],answer:0,explain:"CPIはEVをACで割ったコスト効率指数。",contrast:"SPIはEV÷PV。"},
{id:71,cat:"開発",prompt:"スクラム：仕事の進め方を振り返って改善",options:["スプリントレトロスペクティブ","スプリントレビュー","デイリースクラム","スプリントプランニング"],answer:0,explain:"スプリントレトロスペクティブでは、チームが仕事の進め方を検査して改善策を決める。",contrast:"スプリントレビューでは成果物と今後の方向性を確認する。"},
{id:72,cat:"ハードウェア",prompt:"RAID0：複数ディスクへデータを分散し高速化",options:["ストライピング","ミラーリング","パリティ分散","二重化"],answer:0,explain:"RAID0はデータを複数ディスクへ分散するストライピングで高速化するが、冗長性はない。",contrast:"RAID1はミラーリングで冗長性を確保する。"},
{id:73,cat:"ストラテジ",prompt:"SWOT：自社に不利な外部環境",options:["Threat","Opportunity","Weakness","Strength"],answer:0,explain:"Threat（脅威）は競合参入など、自社に不利な外部環境。",contrast:"Weaknessは自社内部の弱み。"},
{id:74,cat:"DB",prompt:"検索を高速化するが更新負荷と記憶領域が増える",options:["インデックス","正規化","ビュー","排他制御"],answer:0,explain:"インデックスは検索を高速化する一方、更新時の保守負荷と記憶領域が必要になる。",contrast:"正規化は重複や更新時異常を減らすための表設計。"},
{id:75,cat:"セキュリティ",prompt:"デジタル署名の作成に使用する鍵",options:["署名者の秘密鍵","署名者の公開鍵","受信者の公開鍵","受信者の秘密鍵"],answer:0,explain:"デジタル署名は署名者本人だけが保有する秘密鍵で作成する。",contrast:"署名の検証には署名者の公開鍵を使う。"},
{id:76,cat:"開発",prompt:"スクラム：完成したインクリメントを関係者と確認",options:["スプリントレビュー","スプリントレトロスペクティブ","デイリースクラム","スプリントプランニング"],answer:0,explain:"スプリントレビューでは完成したインクリメントをステークホルダーと確認し、今後を検討する。",contrast:"レトロスペクティブはチームの仕事の進め方を振り返る。"},
{id:77,cat:"システム",prompt:"稼働率0.9と0.8の装置を直列接続した稼働率",options:["0.72","0.98","0.85","1.7"],answer:0,explain:"直列システムは全装置が動く必要があるため、0.9×0.8=0.72。",contrast:"並列システムは1から全装置の故障確率を引く。"},
{id:78,cat:"ストラテジ",prompt:"PPM：高成長率 × 低市場占有率",options:["問題児（Question Mark）","花形（Star）","金のなる木","負け犬"],answer:0,explain:"高成長率・低市場占有率の事業は問題児。追加投資によって花形を目指す。",contrast:"高成長率・高市場占有率は花形。"},
{id:79,cat:"OS",prompt:"フルバックアップ後の全変更データを毎回保存",options:["差分バックアップ","増分バックアップ","フルバックアップ","ミラーリング"],answer:0,explain:"差分バックアップは、直前のフルバックアップ以降に変更された全データを保存する。",contrast:"増分バックアップは直前のバックアップ以降の変更分だけを保存する。"},
{id:80,cat:"セキュリティ",prompt:"指紋・顔・静脈を使う認証要素",options:["生体情報","知識情報","所持情報","位置情報"],answer:0,explain:"指紋や顔など本人の身体的特徴は生体情報による認証。",contrast:"パスワードは知識情報、ICカードは所持情報。"},
{id:81,cat:"セキュリティ",prompt:"ハッシュ値の比較で改ざんの有無を確認",options:["完全性","機密性","可用性","否認防止"],answer:0,explain:"ハッシュ値の比較により、データが途中で変更されていないかを確認できる。",contrast:"暗号化の主目的は機密性。"},
{id:82,cat:"PM",prompt:"EVM：EV − AC",options:["CV","SV","CPI","SPI"],answer:0,explain:"CVはEVからACを引いたコスト差異。負の値ならコスト超過。",contrast:"SVはEV−PV。"},
{id:83,cat:"OS",prompt:"前回のバックアップ以降の変更分だけを保存",options:["増分バックアップ","差分バックアップ","フルバックアップ","ミラーリング"],answer:0,explain:"増分バックアップは直前に実施したバックアップ以降の変更分だけを保存する。",contrast:"差分バックアップは直前のフルバックアップ以降の全変更分を保存する。"},
{id:84,cat:"ストラテジ",prompt:"PPM：低成長率 × 高市場占有率",options:["金のなる木（Cash Cow）","花形（Star）","問題児","負け犬"],answer:0,explain:"低成長率・高市場占有率の事業は金のなる木で、安定した資金を生み出す。",contrast:"高成長率・高市場占有率は花形。"}
];

window.FE_COMPARISONS = [
  {category:"セキュリティ",title:"公開鍵暗号とデジタル署名",priority:true,termIds:[53,68,75],terms:[
    {name:"暗号化",meaning:"受信者の公開鍵で暗号化し、受信者の秘密鍵で復号する。",key:"目的：機密性（他人に読ませない）"},
    {name:"署名の作成",meaning:"署名者の秘密鍵を使用する。",key:"本人だけが持つ鍵で作る"},
    {name:"署名の検証",meaning:"署名者の公開鍵を使用する。",key:"誰でも入手できる鍵で確かめる"}
  ],mnemonic:"暗号化は『受信者』、署名は『署名者』を見る。署名は秘密で作り、公開で確認。"},
  {category:"OS",title:"増分バックアップと差分バックアップ",priority:true,termIds:[79,83],terms:[
    {name:"増分バックアップ",meaning:"直前に行ったバックアップ以降の変更分だけを保存する。",key:"毎回の量は少ない／復元に複数世代が必要"},
    {name:"差分バックアップ",meaning:"直前のフルバックアップ以降の全変更分を保存する。",key:"日ごとに量が増える／復元はフル＋最新差分"}
  ],mnemonic:"増分は『前回から少しずつ増す』、差分は『フルとの差を全部』。"},
  {category:"PM",title:"EVMのSV・CV・SPI・CPI",priority:true,termIds:[33,34,54,62,70,82],terms:[
    {name:"SV / SPI",meaning:"スケジュール差異 EV−PV／効率指数 EV÷PV。",key:"S＝Schedule、比較相手は計画PV"},
    {name:"CV / CPI",meaning:"コスト差異 EV−AC／効率指数 EV÷AC。",key:"C＝Cost、比較相手は実コストAC"},
    {name:"差異と指数",meaning:"差異は引き算、指数は割り算。負または1未満なら不調。",key:"V＝Variance、I＝Index"}
  ],mnemonic:"Sは予定PV、Cは実費AC。Vなら引く、Iなら割る。"},
  {category:"ストラテジ",title:"PPMの4分類",priority:true,termIds:[57,78,84],terms:[
    {name:"花形",meaning:"高成長・高占有。投資も必要だが将来性が高い。",key:"右上：成長も占有も高い"},
    {name:"金のなる木",meaning:"低成長・高占有。安定した資金を生む。",key:"高占有なので稼げる"},
    {name:"問題児／負け犬",meaning:"問題児は高成長・低占有、負け犬は低成長・低占有。",key:"問題児は投資判断、負け犬は撤退検討"}
  ],mnemonic:"占有率が高ければ『花形か金のなる木』。成長率が低い方が金のなる木。"},
  {category:"法務",title:"特許権・著作権・商標権・意匠権",priority:true,termIds:[44,45,46],terms:[
    {name:"特許権",meaning:"技術的な発明を保護する。出願・審査・登録が必要。",key:"技術・発明"},
    {name:"著作権",meaning:"文章・音楽・プログラムなどの表現を保護し、創作時に発生する。",key:"表現・自動発生"},
    {name:"商標権／意匠権",meaning:"商標権は名称やロゴ、意匠権は物品などのデザインを保護する。",key:"目印＝商標、見た目＝意匠"}
  ],mnemonic:"特許は技術、著作は作品、商標はマーク、意匠はデザイン。"},
  {category:"システム",title:"MTBF・MTTR・稼働率",priority:true,termIds:[38,66,77],terms:[
    {name:"MTBF",meaning:"故障から次の故障までの平均時間。大きいほど壊れにくい。",key:"Between Failures＝故障と故障の間"},
    {name:"MTTR",meaning:"故障してから復旧するまでの平均時間。小さいほど復旧が速い。",key:"To Repair＝修理まで"},
    {name:"稼働率",meaning:"MTBF ÷（MTBF＋MTTR）で求める。",key:"動く時間 ÷ 全時間"}
  ],mnemonic:"BはBetweenで故障の間、RはRepairで修理。稼働率の分子は動いているMTBF。"},
  {category:"ネットワーク",title:"サブネットの総数と利用可能数",priority:true,termIds:[51,52],terms:[
    {name:"総アドレス数",meaning:"2のホスト部ビット数乗。/26なら2の6乗＝64個。",key:"32−プレフィックス長＝ホスト部"},
    {name:"利用可能ホスト数",meaning:"総アドレス数からネットワークとブロードキャストの2個を引く。",key:"/26なら64−2＝62台"}
  ],mnemonic:"まず総数を2の乗数で出す。『利用可能』とあれば最後に−2。"},
  {category:"セキュリティ",title:"機密性・完全性・可用性",priority:true,termIds:[8,81],terms:[
    {name:"機密性",meaning:"許可された人だけが情報へアクセスできる。",key:"暗号化・アクセス制御"},
    {name:"完全性",meaning:"情報が正確で、改ざんされていない。",key:"ハッシュ値・デジタル署名"},
    {name:"可用性",meaning:"必要なときに情報やサービスを利用できる。",key:"冗長化・バックアップ"}
  ],mnemonic:"秘密を守る＝機密、内容を守る＝完全、使える状態を守る＝可用。"},
  {category:"DB",title:"WHERE句とHAVING句",priority:false,termIds:[69],terms:[
    {name:"WHERE",meaning:"GROUP BYで集計する前の行を絞り込む。",key:"元データの行に条件"},
    {name:"HAVING",meaning:"GROUP BYで集計した後のグループを絞り込む。",key:"COUNTやSUMなどの集計結果に条件"}
  ],mnemonic:"WHEREは材料を選び、HAVINGは集計結果を選ぶ。"},
  {category:"クラウド",title:"IaaS・PaaS・SaaS",priority:false,termIds:[49,50,64],terms:[
    {name:"IaaS",meaning:"仮想サーバ・ストレージ・ネットワークなどのインフラを利用する。",key:"利用者がOS以上を管理"},
    {name:"PaaS",meaning:"OSやミドルウェアを含むアプリ実行・開発基盤を利用する。",key:"利用者はアプリ開発に集中"},
    {name:"SaaS",meaning:"完成済みのアプリケーションをそのまま利用する。",key:"メールや業務アプリを利用"}
  ],mnemonic:"IはInfrastructure、PはPlatform、SはSoftware。下から順に提供範囲が広がる。"},
  {category:"ストラテジ",title:"SWOTの内部・外部要因",priority:false,termIds:[35,65,73],terms:[
    {name:"Strength / Weakness",meaning:"自社で制御しやすい内部環境の強み・弱み。",key:"S・W＝内部"},
    {name:"Opportunity / Threat",meaning:"市場や競合など外部環境の機会・脅威。",key:"O・T＝外部"}
  ],mnemonic:"会社の中を見るSW、外を見るOT。良い方がS・O、悪い方がW・T。"},
  {category:"DB",title:"主キーと外部キー",priority:false,termIds:[25,26],terms:[
    {name:"主キー",meaning:"表の各行を一意に識別する列。重複とNULLは不可。",key:"自分の表の行を特定"},
    {name:"外部キー",meaning:"別の表の主キーなどを参照し、表同士を関連付ける列。",key:"別表を参照して整合性を保つ"}
  ],mnemonic:"主キーは自分の身分証、外部キーは相手表への住所。"}
];
