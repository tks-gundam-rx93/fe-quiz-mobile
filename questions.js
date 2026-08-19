window.FE_QUESTIONS = [
  {id:1,section:"A",category:"セキュリティ",importance:"S",question:"SQLインジェクション攻撃への対策として、最も適切なものはどれか。",options:["入力値をURLエンコードするだけにする","プレースホルダを用いたSQL文を使用する","Webサーバのログを定期的に削除する","データベースのバックアップ頻度を下げる"]},
  {id:2,section:"A",category:"ネットワーク",importance:"S",question:"TCPの特徴として適切なものはどれか。",options:["コネクションレス型の通信である","再送制御や順序制御によって信頼性を高める","IPアドレスを使用しない","通信内容を必ず暗号化する"]},
  {id:3,section:"A",category:"データベース",importance:"S",question:"関係データベースで、表の各行を一意に識別するために設定するキーはどれか。",options:["外部キー","候補キーではない属性","主キー","ビュー"]},
  {id:4,section:"A",category:"OS",importance:"A",question:"命令の実行過程を複数段階に分け、複数命令を重ね合わせて処理する方式はどれか。",options:["スプーリング","デマンドページング","ラウンドロビン","パイプライン処理"]},
  {id:5,section:"A",category:"プロジェクトマネジメント",importance:"A",question:"時間の経過に対する残作業量の推移を表すグラフはどれか。",options:["ガントチャート","パレート図","バーンダウンチャート","特性要因図"]},
  {id:6,section:"B",category:"探索",importance:"S",question:"昇順配列 [2, 5, 9, 14, 18, 23, 31] に二分探索で23を探す。最初に比較する要素はどれか。",options:["9","14","18","23"]},
  {id:7,section:"B",category:"ビット演算",importance:"S",question:"8ビット値Xの上位4ビットを0にして、下位4ビットだけを残したい。適切な演算はどれか。",options:["X AND 00001111","X OR 00001111","X XOR 11110000","X AND 11110000"]},
  {id:8,section:"B",category:"スタック",importance:"S",question:"空のスタックに PUSH(A), PUSH(B), POP(), PUSH(C), PUSH(D), POP() を順に実行した。最後にスタックの先頭にある値はどれか。",options:["A","B","C","D"]},
  {id:9,section:"B",category:"配列",importance:"S",question:"次の処理を実行した後の配列Aはどれか。",code:"A = [4, 7, 2, 9]\nt ← A[1]\nA[1] ← A[4]\nA[4] ← t",options:["[4, 7, 2, 9]","[9, 7, 2, 4]","[4, 9, 2, 7]","[7, 4, 9, 2]"]},
  {id:10,section:"B",category:"再帰",importance:"S",question:"次の関数fを実行したとき、f(4)の戻り値はいくつか。",code:"function f(n)\n    if n = 0 then\n        return 1\n    else\n        return n * f(n - 1)\n    endif\nendfunction",options:["4","8","16","24"]}
];
