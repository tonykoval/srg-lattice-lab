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

// Theorem A (Obata) checker. Expected values: the 37-row table of Obata's README (Zenodo 22682072),
// columns set, applied to (null = the set itself), θ, |c_θ|, 𝒮, n_θ/2.
const OBATA=[
 [[154,51,8,21],[154,102,71,60],-3,3*5*7*17,1,66],[[169,42,5,12],null,3,3*13**2,0,63],[[169,70,27,30],null,5,5*13**2,0,49],
 [[209,52,15,12],null,-5,3*13*19,1,66],[[235,52,9,12],null,5,13*47,1,70],[[289,54,1,12],null,3,3*17**2,0,117],
 [[289,90,23,30],null,5,5*17**2,0,99],[[289,126,53,56],null,7,7*17**2,0,81],[[375,154,53,70],null,-21,5**4*7,0,33],
 [[375,170,85,70],null,-5,5**4*7,0,153],[[391,140,39,56],null,-21,5**2*7*23,1,34],[[430,39,8,3],[430,390,353,360],3,3**2*13*43,1,150],
 [[441,190,89,76],null,19,3**2*5**2*19,2,49],[[494,85,12,15],[494,408,337,336],9,3*7*17*19,1,104],[[507,44,1,4],null,5,3*13**2,1,154],
 [[616,205,90,57],[616,410,261,296],3,11*37*41,1,280],[[625,130,15,30],null,5,5**5,0,247],[[625,182,45,56],null,7,5**4*7,0,221],
 [[625,234,83,90],null,9,3**2*5**4,0,195],[[625,286,129,132],null,11,5**4*11,0,169],[[630,68,1,8],null,5,3**2*7*17,3,220],
 [[690,318,121,168],null,3,3**2*5*7*53,1,322],[[721,220,69,66],null,-11,3*5**2*7*11,1,206],[[750,210,55,60],null,-15,3**2*5**4,1,154],
 [[750,214,63,60],null,-11,3**2*5**4,1,214],[[780,369,158,189],[780,410,229,200],35,3*5**3*41,1,52],[[841,150,11,30],null,5,5*29**2,0,345],
 [[841,210,41,56],null,7,7*29**2,0,315],[[841,270,79,90],null,9,3**2*29**2,0,285],[[841,330,125,132],null,11,11*29**2,0,255],
 [[841,390,179,182],null,13,13*29**2,0,225],[[871,348,137,140],null,13,5*29*67,1,234],[[875,184,33,40],null,9,5**4*7,1,276],
 [[931,180,29,36],null,9,3**2*5**2*19,1,294],[[1026,451,212,187],[1026,574,309,336],7,3**4*7*41,3,418],
 [[1148,481,210,195],[1148,666,379,396],-27,3**2*7*11*37,1,164],[[1248,203,22,35],[1248,1044,875,864],-9,3**4*13*29,1,448]];
check(OBATA.length===37,'Obata table has 37 rows');
const key=p=>p.join(',');
for(const [set,applied,theta,c,S,half] of OBATA){
 const R=M.theoremA(set);check(R.status==='excluded',`Theorem A excludes ${key(set)}`);
 const o=R.orientations.find(x=>key(x.params)===key(applied||set));check(!!o,`orientation ${key(applied||set)} tested`);
 const t=o.tests.find(x=>x.theta===theta);check(t&&t.applicable&&t.fail,`Theorem A fires on ${key(set)} at θ = ${theta}`);
 check(Math.abs(t.c)===c&&t.S===S&&t.nHalf===half,`Obata's c_θ, 𝒮, n/2 reproduced for ${key(set)}`);
 check(t.rankEven&&t.S%2!==half%2&&t.detResidue!==t.required,`mod-4 verdict for ${key(set)}`);
 if(applied)check(M.theoremA(applied).status==='excluded','complement orientation also excluded');
}
const obataKeys=new Set(OBATA.map(r=>key(r[0])));
for(const row of data.rows){
 const R=M.theoremA(row.params);
 check(R.status===(row.shared?'excluded':'outside'),`Theorem A on table row ${key(row.params)}`);
 check(row.shared===obataKeys.has(key(row.params)),'35 odd-gap rows are exactly Obata\'s open rows');
 if(!row.shared)check(R.d%2===0&&R.orientations.every(o=>o.tests.every(t=>!t.cOdd)),'even gap makes both c even');
}
check(data.rows.filter(r=>r.shared).every(r=>M.theoremA(r.params).fired.length>0),'every shared row has a firing eigenvalue');
// Worked example (630,68,1,8), line by line.
const w=M.theoremA([630,68,1,8]),w5=w.orientations[0].tests.find(t=>t.theta===5),w12=w.orientations[0].tests.find(t=>t.theta===-12);
check(w.sp.r===5&&w.sp.s===-12&&w.sp.f===440&&w.sp.g===189,'630 spectrum');
check(w5.c===-1071&&w12.c===1360&&w5.cOther===1360,'630 c-values');
check(JSON.stringify(w5.primes.map(x=>[x.p,x.e,x.role,x.vpv]))===JSON.stringify([[3,2,'fixed',2],[7,1,'fixed',1],[17,1,'harmless',0]]),'630 prime roles');
check(w5.S===3&&w5.detResidue===3&&w5.required===1&&w5.fail,'630 contradiction 3 ≠ 1');
check(w5.djemHyp&&w5.P===63&&w5.djemResidue===3&&w5.djemFail,'630 Djematene P = 63');
// Djematene's weaker hypothesis fires on an even-c eigenvalue of 209 without adding a row.
const t209=M.theoremA([209,52,15,12]).orientations[0].tests.find(t=>t.theta===8);
check(!t209.cOdd&&!t209.applicable&&t209.djemHyp&&t209.P===11&&t209.n===76&&t209.djemFail,'209 θ = 8: Djematene fires, Theorem A inapplicable');
// The 12 rows graded C2 in the project table: every firing eigenvalue needs ingredient 3 (a fixed prime ≡ 3 mod 4).
const TWELVE=[[209,52,15,12],[441,190,89,76],[494,85,12,15],[630,68,1,8],[721,220,69,66],[750,210,55,60],[750,214,63,60],[780,369,158,189],[931,180,29,36],[1026,451,212,187],[1148,481,210,195],[1248,203,22,35]];
for(const p of TWELVE){const R=M.theoremA(p);check(R.status==='excluded'&&obataKeys.has(key(p)),`twelve: ${key(p)} excluded`);for(const o of R.orientations)for(const t of o.tests)if(t.fail)check(t.primes.some(x=>x.role==='fixed'),`twelve: ${key(p)} firing needs the square relation`);}
const pgA=M.theoremA([750,210,55,60]).orientations[0].tests.find(t=>t.theta===-15);check(pgA.n===308&&pgA.S===1&&pgA.fail,'pg(14,14,4) side panel');
// Existing graphs: must never be excluded. Named graphs plus whole families, each in both orientations.
const named={petersen:[10,3,0,1],T7:[21,10,5,4],L2_5:[25,8,3,2],paley9:[9,4,1,2],paley25:[25,12,5,6],paley49:[49,24,11,12],paley81:[81,40,19,20],clebsch:[16,5,0,2],shrikhande:[16,6,2,2],schlafli:[27,10,1,5],chang:[28,12,6,4],hoffmanSingleton:[50,7,0,1],gewirtz:[56,10,0,2],m22:[77,16,0,4],brouwerHaemers:[81,20,1,6],higmanSims:[100,22,0,6],blvs243:[243,22,1,2],mcLaughlin:[275,112,30,56]};
for(const [name,p] of Object.entries(named)){const st=M.theoremA(p).status;check(st==='passes'||st==='outside',`existing graph ${name} not excluded`);}
for(const p of [[21,10,5,4],[25,8,3,2],[25,12,5,6]])check(M.theoremA(p).status==='passes','positive control with hypotheses met passes');
const family=[];
for(let n=4;n<=140;n++)family.push([n*(n-1)/2,2*(n-2),n-2,4]);                // triangular T(n)
for(let n=3;n<=99;n++)family.push([n*n,2*(n-1),n-2,2]);                        // rook L2(n)
for(const q of [9,25,49,81,121,169,289,361,529,625,729,841,961,1369,1681,1849,2209,2401,2809,3481,3721,4489,5041,5329,6241,6561,6889,7921,9409])family.push([q,(q-1)/2,(q-5)/4,(q-1)/4]); // Paley(q), q a square
for(const n of [3,4,5,7,8,9,11,13,16,17,19,23,25,27,29,31,32,37,41,43,47,49,53,59,61,64,67,71,73,79,81,83,89,97])for(let m=2;m<=n-1;m++)family.push([n*n,m*(n-1),(m-1)*(m-2)+n-2,m*(m-1)]); // Latin square graphs from affine planes
for(let m=2;m<=40;m++)for(let a=2;a<=40;a++)if(m*a<=10000)family.push([m*a,m*a-a,m*a-2*a,m*a-a]); // complete multipartite K_{m×a}
let familyChecks=0;
for(const p of family){if(p[1]>=p[0]-1)continue;const st=M.theoremA(p).status;check(st!=='excluded'&&st!=='invalid',`existing family graph ${key(p)} not excluded`);const [v,k,l,mu]=p;if(v-2*k+l>0){const st2=M.theoremA([v,v-k-1,v-2*k+mu-2,v-2*k+l]).status;check(st2!=='excluded','existing complement not excluded');}familyChecks++;}
check(familyChecks>1000,'family sweep is substantial');
check(M.theoremA([99,14,1,2]).status==='outside'&&M.theoremA([96,35,10,14]).status==='outside'&&M.theoremA([13,6,2,3]).status==='outside','outside-scope presets');
for(const p of [[NaN,3,0,1],[99,14,1,3],[10001,3,0,1]])check(M.theoremA(p).status==='invalid','Theorem A rejects invalid input');

console.log(`PASS: ${checks} assertions. Graphs, Gram identities, all 70 table pairs and complements, known-graph controls, domain guards, Gauss sums, Theorem A (Obata table, worked example, Djematene comparison, 12-row explainer, existing-graph families).`);
