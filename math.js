/* Pure, dependency-free mathematical kernels shared by the page and tests. */
(function (root) {
  'use strict';
  function factors(n) { const out=[]; for(let p=2;p*p<=n;p++){if(n%p===0){let e=0;while(n%p===0){n/=p;e++;}out.push([p,e]);}}if(n>1)out.push([n,1]);return out; }
  function valuation(n,p){if(n===0)return Infinity;let e=0;while(n%p===0){n/=p;e++;}return e;}
  function spectrum(v,k,l,mu){const delta=(l-mu)**2+4*(k-mu),q=Math.sqrt(delta);if(!Number.isInteger(q))return null;const r=(l-mu+q)/2,s=(l-mu-q)/2;if(!Number.isInteger(r)||!Number.isInteger(s)||r===s)return null;const f=(-k-s*(v-1))/(r-s),g=v-1-f;return {r,s,f,g,d:r-s};}
  function assess(params){const [v,k,l,mu]=params;const invalid=reason=>({status:'invalid',reason});if(params.length!==4||params.some(x=>!Number.isSafeInteger(x)))return invalid('Use four whole numbers.');if(v<3||v>10000||k<1||k>=v-1||l<0||l>=k||mu<1||mu>k)return invalid('Use 3 ≤ v ≤ 10,000, 0 < k < v − 1, 0 ≤ λ < k, and 0 < μ ≤ k.');if(k*(k-l-1)!==(v-k-1)*mu)return invalid('The necessary counting identity k(k − λ − 1) = (v − k − 1)μ fails.');const sp=spectrum(v,k,l,mu);if(!sp)return {status:'outside',reason:'This implementation requires two distinct integral restricted eigenvalues.'};if(!Number.isInteger(sp.f)||!Number.isInteger(sp.g)||sp.f<=0||sp.g<=0||sp.r>=k)return invalid('The restricted eigenvalues must be below k, with positive integral multiplicities.');const gapPrimes=factors(sp.d);const tests=['r','s'].map(key=>{const theta=sp[key],other=sp[key==='r'?'s':'r'],m=sp[key==='r'?'f':'g'];const odd=sp.d%2===1,valuationOK=valuation(k-other,2)>=valuation(v,2),primeOK=gapPrimes.every(([p])=>p%4===1);const P=factors(v).filter(([p,e])=>sp.d%p!==0&&valuation(k-other,p)<e).reduce((a,[p,e])=>a*p**e,1);const rankEven=m%2===0;const residue=rankEven?(((-1)**(m/2)*P)%4+4)%4:null;const applicable=odd&&valuationOK;const fail=applicable&&(!rankEven||(primeOK&&residue!==1));return {key,theta,other,m,odd,valuationOK,primeOK,P,rankEven,residue,applicable,fail,valuations:[valuation(k-other,2),valuation(v,2)]};});const failed=tests.some(t=>t.fail),decidable=tests.some(t=>t.applicable&&t.primeOK);return {status:failed?'excluded':decidable?'passes':'outside',sp,gapPrimes,tests,reason:failed?'A necessary eigenlattice condition fails.':decidable?'No contradiction from this criterion. This does not establish existence.':'The determinant corollary gives no verdict for these parameters.'};}
  function graph(type){let A,positions,params;if(type==='petersen'){params=[10,3,0,1];A=Array.from({length:10},()=>Array(10).fill(0));const edge=(a,b)=>A[a][b]=A[b][a]=1;for(let i=0;i<5;i++){edge(i,(i+1)%5);edge(i,i+5);edge(i+5,(i+2)%5+5);}positions=Array.from({length:10},(_,i)=>{const t=-Math.PI/2+(i%5)*Math.PI*2/5,rad=i<5?135:65;return [200+rad*Math.cos(t),170+rad*Math.sin(t)];});}else{params=[9,4,1,2];A=Array.from({length:9},(_,i)=>Array.from({length:9},(_,j)=>+(i!==j&&(Math.floor(i/3)===Math.floor(j/3)||i%3===j%3))));positions=Array.from({length:9},(_,i)=>[80+(i%3)*120,55+Math.floor(i/3)*115]);}return {A,positions,params};}
  const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
  function gram(params,A,key){const [v,k,l,mu]=params,sp=spectrum(v,k,l,mu),theta=sp[key],rho=sp[key==='r'?'s':'r'];let b=(theta>rho?1:-1)*v/gcd(v,k-rho),c=-b*(k-rho)/v;if((c-b*rho)%2!==0){b*=2;c*=2;}return {b,c,rho,theta,e:b*(theta-rho),rank:sp[key==='r'?'f':'g'],norm:c-b*rho,G:A.map((row,i)=>row.map((a,j)=>b*(a-(i===j?rho:0))+c))};}
  const modules={a2:{q:[0,2/3,2/3],rank:2,label:'ℤ/3, q(x) = 2x²/3'},a1:{q:[0,.5],rank:1,label:'ℤ/2, q(1) = 1/2'},p5:{q:[0,2/5,8/5,8/5,2/5],rank:8,label:'ℤ/5, q(x) = 2x²/5'},p5n:{q:[0,4/5,6/5,6/5,4/5],rank:4,label:'ℤ/5, q(x) = 4x²/5'},d4:{q:[0,1,1,1],rank:4,label:'(ℤ/2)², q = 1 on nonzero classes'},e8:{q:[0],rank:8,label:'Trivial group, q = 0'}};
  function gauss(q){const re=q.reduce((s,x)=>s+Math.cos(Math.PI*x),0)/Math.sqrt(q.length),im=q.reduce((s,x)=>s+Math.sin(Math.PI*x),0)/Math.sqrt(q.length);return {re,im,phase:(Math.round(Math.atan2(im,re)*4/Math.PI)+8)%8};}
  /* Theorem A (Obata's eigenlattice obstruction, in the form of the joint-paper roadmap: Obata's hypotheses minus
     "θ odd"). Our reimplementation, exact integer arithmetic. For each orientation (graph, complement) and each
     restricted eigenvalue θ with multiplicity n: c = (θ − k)(θ − θ′). If c is odd and no prime p ≡ 3 (mod 4) divides
     both c and c′, then det Λθ is odd and ≡ (−1)^S (mod 4), S = Σ νp(v) over primes p ≡ 3 (mod 4) dividing c; an
     even lattice of odd determinant needs n even and det ≡ (−1)^(n/2). Djematene's weaker determinant-odd hypothesis
     and his exact prime-to-gap factor P are reported alongside for comparison; they do not change the verdict. */
  function theoremA(params){
    const base=assess(params);
    if(base.status==='invalid')return {status:'invalid',reason:base.reason,orientations:[],fired:[]};
    if(!base.sp)return {status:'outside',reason:'No obstruction from Theorem A: it needs integral restricted eigenvalues, and these parameters have irrational ones (a conference graph), so there is no eigenlattice to test.',orientations:[],fired:[]};
    const [v,k,l,mu]=params,{r,s,f,g}=base.sp,d=r-s,dPrimes=factors(d);
    const orientations=[{label:'graph',params:[v,k,l,mu],k,r,s,f,g}];
    const kc=v-k-1,rc=-1-s,sc=-1-r;let note='';
    if(rc<kc)orientations.push({label:'complement',params:[v,kc,v-2*k+mu-2,v-2*k+l],k:kc,r:rc,s:sc,f:g,g:f});
    else note='The complement is disconnected (a union of cliques), so only the graph itself is tested.';
    for(const o of orientations){
      o.tests=[[o.r,o.s,o.f],[o.s,o.r,o.g]].map(([theta,other,n])=>{
        const c=(theta-o.k)*(theta-other),cOther=(other-o.k)*(other-theta);
        const primes=factors(Math.abs(c)).map(([p,e])=>{const inOther=cOther%p===0,vpv=valuation(v,p);return {p,e,inOther,vpv,role:p===2?'two':p%4===1?'harmless':inOther?'unfixed':'fixed'};});
        const cOdd=c%2!==0,blocked=primes.filter(x=>x.role==='unfixed').map(x=>x.p),applicable=cOdd&&blocked.length===0;
        const S=primes.filter(x=>x.role==='fixed').reduce((a,x)=>a+x.vpv,0);
        const rankEven=n%2===0,nHalf=rankEven?n/2:null,detResidue=S%2?3:1,required=rankEven?(nHalf%2?3:1):null;
        const fail=applicable&&(!rankEven||detResidue!==required);
        const djemHyp=d%2===1&&valuation(o.k-other,2)>=valuation(v,2)&&dPrimes.every(([q])=>q%4===1);
        const P=factors(v).filter(([q,e])=>d%q!==0&&valuation(o.k-other,q)<e).reduce((a,[q,e])=>a*q**e,1);
        const djemResidue=rankEven?(((nHalf%2?-1:1)*P)%4+4)%4:null,djemFail=djemHyp&&(!rankEven||djemResidue!==1);
        return {theta,other,n,c,cOther,cOdd,thetaOdd:theta%2!==0,primes,blocked,applicable,S,rankEven,nHalf,detResidue,required,fail,djemHyp,P,djemResidue,djemFail};
      });
    }
    const fired=[];orientations.forEach(o=>o.tests.forEach(t=>{if(t.fail)fired.push({orientation:o.label,params:o.params,theta:t.theta});}));
    const anyApplicable=orientations.some(o=>o.tests.some(t=>t.applicable));
    const status=fired.length?'excluded':anyApplicable?'passes':'outside';
    const reason=status==='excluded'?'Theorem A fires: the eigenlattice would be an even lattice of odd determinant whose determinant has two different remainders modulo 4. No graph with these parameters exists.'
      :status==='passes'?'No obstruction. The hypotheses hold for at least one eigenvalue, and the congruence is satisfied there. This does not establish existence.'
      :d%2===0?`No obstruction from Theorem A. The gap r − s = ${d} is even and divides both c_r and c_s, so both are even and the determinant need not be odd. The stronger even-gap condition (chapter 04) is needed.`
      :'No obstruction from Theorem A. Its hypotheses fail for every eigenvalue of the graph and of its complement.';
    return {status,reason,sp:base.sp,d,dPrimes,orientations,fired,note};
  }
  const api={factors,valuation,spectrum,assess,theoremA,graph,gram,modules,gauss};root.SRG=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
