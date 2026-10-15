const assert = require('node:assert/strict');
const M = require('./math.js');
const data = require('./data.js');
let checks=0;
function check(value,message){assert.ok(value,message);checks++;}
for(const type of ['petersen','rook']){
 const {A,params:[v,k,l,mu]}=M.graph(type);
 for(let i=0;i<v;i++){
  check(A[i].reduce((a,b)=>a+b,0)===k,`${type} degree`);
  for(let j=0;j<v;j++){
   check(A[i][j]===A[j][i],`${type} symmetry`);
   if(i!==j)check(A[i].reduce((a,x,t)=>a+x*A[t][j],0)===(A[i][j]?l:mu),`${type} common-neighbour count`);
  }
 }
 for(const eig of ['r','s']){
  const {G,e,rank,norm}=M.gram([v,k,l,mu],A,eig);
  check(norm%2===0,'even Gram diagonal');check(v*norm===e*rank,'trace gives rank');
  for(let i=0;i<v;i++){
   check(G[i].reduce((a,b)=>a+b,0)===0,'centred Gram row sum');
   for(let j=0;j<v;j++)check(G[i].reduce((a,x,t)=>a+x*G[t][j],0)===e*G[i][j],'G² = eG');
  }
 }
}
check(data.rows.length===70,'70 project rows');check(data.rows.filter(r=>r.shared).length===35,'35 shared rows');
for(const row of data.rows){
 const [v,k,l,mu]=row.params;const result=M.assess(row.params);
 check(result.status!=='invalid','valid table parameters');
 check((result.sp.d%2===1)===row.shared,'table gap split');
 check(result.status===(row.shared?'excluded':'outside'),'correct table criterion result');
 const comp=[v,v-k-1,v-2*k+mu-2,v-2*k+l];
 check(M.assess(comp).status===(row.shared?'excluded':'outside'),'complement invariance');
}
for(const p of [[10,3,0,1],[9,4,1,2],[16,6,2,2],[16,5,0,2],[25,12,5,6],[28,12,6,4],[36,14,7,4]])check(M.assess(p).status!=='excluded','known SRG positive control');
for(const p of [[NaN,3,0,1],[99,14,1,3],[10.5,3,0,1],[2,1,0,1],[10001,3,0,1],[10,9,8,9]])check(M.assess(p).status==='invalid','invalid input rejected');
check(M.assess([5,2,0,1]).status==='outside','irrational eigenvalues inapplicable');
check(M.assess([99,14,1,2]).status==='outside','Conway not excluded by mod4');
check(M.assess([289,54,1,12]).status==='excluded','Bondarenko–Radchenko control');
const pg=M.assess([750,210,55,60]).tests.find(t=>t.theta===-15);check(pg.m===308&&pg.P===3&&pg.residue===3&&pg.fail,'published pg(14,14,4) calculation');
const example=M.assess([169,42,5,12]);check(example.sp.r===3&&example.sp.s===-10&&example.tests[0].m===126,'169 spectrum');
for(const [key,phase] of Object.entries({a2:2,a1:1,p5:0,p5n:4,d4:4,e8:0})){
 const g=M.gauss(M.modules[key].q);check(g.phase===phase,`${key} phase`);check(Math.abs(g.re*g.re+g.im*g.im-1)<1e-12,`${key} normalized magnitude`);
}
console.log(`PASS: ${checks} assertions. Graphs, Gram identities, all 70 table pairs and complements, known-graph controls, domain guards, Gauss sums.`);
