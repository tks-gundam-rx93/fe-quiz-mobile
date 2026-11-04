/* IPA 2026第13回: Node.js標準ライブラリのみで動く静的・画面遷移回帰テスト
 * node tests/ipa-quiz.test.cjs
 */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const base=path.resolve(__dirname,"..");
const read=f=>fs.readFileSync(path.join(base,f),"utf8");
const w={scrollTo(){},addEventListener(){}};
for(const f of ["ipa26_a.js","ipa26_b.js"])vm.runInNewContext(read(f),{window:w});
assert.equal(w.IPA26_A.length,60);
assert.equal(w.IPA26_B.length,20);
assert.equal(w.IPA26_B.filter(x=>x.category.startsWith("セキュリティ")).length,4);
assert.deepEqual([...new Set(w.IPA26_B.map(x=>x.options.length))].sort((a,b)=>a-b),[4,6,10]);
const all=[...w.IPA26_A,...w.IPA26_B];
assert.equal(new Set(all.map(q=>q.id)).size,80);
for(const q of all){
 assert.ok(q.question&&q.category&&q.explain,q.id+" fields");
 assert.ok(q.options.length>=4&&q.options.length<=10,q.id+" choices");
 assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length,q.id+" key");
 assert.equal(new Set(q.options).size,q.options.length,q.id+" duplicate choice");
 if(q.section==="B")assert.ok(q.code,q.id+" code");
}
assert.equal(w.IPA26_B[0].options[w.IPA26_B[0].correct],"1からlen-1まで増加");
assert.equal(w.IPA26_B[2].options[w.IPA26_B[2].correct],"newer + 2×older");
assert.equal(w.IPA26_B[3].options[w.IPA26_B[3].correct],"pointer[p] = 0");
assert.equal(w.IPA26_B[8].options[w.IPA26_B[8].correct],"2");
assert.equal(w.IPA26_B[16].options[w.IPA26_B[16].correct],"(一)と(三)");
class Node{
 constructor(tag="div"){Object.assign(this,{tag,children:[],events:{},value:"",hidden:false,disabled:false,textContent:"",className:"",style:{},title:"",open:false,attributes:{}})}
 appendChild(n){this.children.push(n);if(["ipaCategory","ipaCount"].includes(this.tag)&&this.children.length===1)this.value=n.value;return n}
 replaceChildren(...x){this.children=x;this.value=x[0]?.value??""}
 addEventListener(name,cb){this.events[name]=cb}
 setAttribute(k,v){this.attributes[k]=v}
}
const dom=new Map();
const el=id=>{if(!dom.has(id))dom.set(id,new Node(id));return dom.get(id)};
const document={getElementById:el,createElement:tag=>new Node(tag)};
const data=new Map();
const localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};
const context={window:w,document,localStorage,Date,setInterval:()=>42,clearInterval(){}};
el("ipaSection").value="A";
vm.runInNewContext(read("ipa_latest.js"),context);
const click=id=>{assert.equal(typeof el(id).events.click,"function",id);el(id).events.click()};
const state=()=>JSON.parse(localStorage.getItem("fe-ipa-2026-pub-v1"));
assert.equal(el("ipaCount").children.at(-1).value,"60");
el("ipaCount").value="60";
click("ipaStartBtn");
assert.equal(state().session.questions.length,60);
assert.equal(new Set(state().session.questions.map(x=>x.id)).size,60);
assert.equal(el("ipaCode").hidden,true);
const first=state().session.questions[0];
const firstAnswer=w.IPA26_A.find(q=>q.id===first.id).correct;
const firstButton=el("ipaOptions").children.find(b=>b.events.click&&b.children?.some(x=>x.textContent===w.IPA26_A.find(q=>q.id===first.id).options[firstAnswer]));
assert.ok(firstButton,"correct visible option");
firstButton.events.click();
assert.equal(state().session.answers[first.id],firstAnswer);
click("ipaFinishBtn");
assert.equal(state().last.A.correct,1);
assert.equal(state().last.A.wrongIds.length,59);
assert.equal(el("ipaExplanations").children.length,60);
click("ipaResultMenuBtn");
el("ipaSection").value="B";
el("ipaSection").events.change();
el("ipaCount").value="20";
click("ipaStartBtn");
assert.equal(state().session.questions.length,20);
assert.equal(el("ipaCode").hidden,false);
let foundTen=false;
for(let i=0;i<20;i++){
 const item=state().session.questions[i];
 if(item.id==="ipa26-b-17"){
  foundTen=true;
  assert.equal(item.order.length,10);
  break;
 }
 click("ipaNextBtn");
}
assert.equal(foundTen,true);
click("ipaLeaveBtn");
assert.equal(el("ipaResumeBtn").hidden,false);
click("ipaResumeBtn");
assert.equal(el("ipaCode").hidden,false);
click("ipaFinishBtn");
assert.equal(state().last.B.wrongIds.length,20);
assert.equal(el("ipaRetryBtn").hidden,false);
click("ipaRetryBtn");
assert.equal(state().session.questions.length,20);
click("ipaLeaveBtn");
el("ipaWeakOnly").checked=true;
el("ipaWeakOnly").events.change();
assert.equal(el("ipaStartBtn").disabled,false);
console.log("PASS: IPA FE A60/B20, answer integrity, A/B exam, 10 choices, review, pause/resume and weakness retry");
