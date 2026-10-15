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

// Verify the mathematical examples taught in the beginner chapter.
const dualClasses=[];
for(let a=0;a<4;a++)for(let b=0;b<4;b++)dualClasses.push([a/2,b/2]);
check(dualClasses.length===16,'2Z² has 16 dual cosets');
const isotropic=dualClasses.filter(([x,y])=>(x*x+y*y)%2===0);
check(JSON.stringify(isotropic)===JSON.stringify([[0,0],[1,1]]),'exactly one nonzero isotropic class');
for(const [x,y] of dualClasses)for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)check(((x+2*a)**2+(y+2*b)**2-x*x-y*y)%2===0,'q is invariant modulo 2 under translating by L');
for(const [x,y] of [[.5,0],[1,0],[1,1]])check(Number.isInteger(2*x)&&Number.isInteger(2*y),'all candidates are in dual');
check(16/(2*2)===4,'index two enlargement divides determinant by four');
const mRepresentatives=[[0,0],[.5,.5],[.5,-.5],[1,0]];
check(mRepresentatives.slice(1).every(([x,y])=>(x*x+y*y)%2!==0),'M discriminant form is anisotropic');
for(let i=0;i<4;i++)for(let j=0;j<i;j++){const x=mRepresentatives[i][0]-mRepresentatives[j][0],y=mRepresentatives[i][1]-mRepresentatives[j][1];check(!(Number.isInteger(x)&&Number.isInteger(y)&&(x+y)%2===0),'four inequivalent M dual cosets');}
const spec169=M.spectrum(169,42,5,12);
check(spec169.s===-10&&spec169.g===42,'beginner example rank 42');
const b169=-13,c169=3,rho169=3,e169=b169*(spec169.s-rho169);
check(e169===169&&b169*(42-rho169)+c169*169===0&&c169-b169*rho169===42,'169 centred representation');
const i169=-b169*rho169;
check(i169*i169+b169*b169*(42-12)===e169*i169,'169 Gram polynomial I coefficient');
check(2*i169*b169+b169*b169*(5-12)===e169*b169,'169 Gram polynomial A coefficient');
check(b169*b169*12+2*i169*c169+2*b169*c169*42+c169*c169*169===e169*c169,'169 Gram polynomial J coefficient');
check(13%4===1&&(((-1)**21)%4+4)%4===3,'169 determinant contradiction');

console.log(`PASS: ${checks} assertions. Graphs, Gram identities, all 70 table pairs and complements, known-graph controls, domain guards, Gauss sums.`);
