// 第11回の問題データを復習用に保持してから、第12回へ切替える。
window.FE11_QUESTIONS = window.FE_QUESTIONS || [];
window.FE_ROUND = 12;
window.FE_QUESTIONS = [...(window.FE12_A || []), ...(window.FE12_B || [])];
if(window.FE_QUESTIONS.length !== 80) throw new Error("第12回の問題数が正しくありません");
