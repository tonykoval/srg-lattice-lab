/* Exact square-lattice teaching example; no graph is inferred from this model. */
(function(){
'use strict';
const get=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const candidates={half:{x:.5,y:0,norm:.25,allowed:false,title:'In the dual, but not even integral.',text:'Its dot products with (2, 0) and (0, 2) are 1 and 0. But its squared length is ¼, not an integer. Adding it would destroy integrality.'},unit:{x:1,y:0,norm:1,allowed:false,title:'Integral, but not even.',text:'Its squared length is 1. Adding this vector gives an integral lattice containing an odd squared length, so it is not an even enlargement.'},diagonal:{x:1,y:1,norm:2,allowed:true,title:'Yes: this gives an even overlattice.',text:'Its squared length is 2, and it pairs integrally with L. Its class is nonzero with q = 0 modulo 2. Adding it and its translates gives the lattice in view 3.'}};
const views={lattice:{title:'Only whole multiples of the basis steps.',text:'Every point has two even coordinates. The shaded square is one repeating cell, with area 4.',formula:'L = {(2a, 2b) : a, b ∈ ℤ}',area:4,det:16},dual:{title:'The dual fits half-steps between the old points.',text:'A point (x, y) belongs to L# when 2x and 2y are integers. The shaded square still shows one original L-cell: it contains 16 dual representatives when its top and right edges are excluded.',formula:'L# = {(a/2, b/2) : a, b ∈ ℤ}',area:4,det:16},overlattice:{title:'Add the diagonal point, but keep evenness.',text:'M contains the original points and the odd–odd integer points. Its diamond-shaped basis cell has area 2. It is denser than L and still even.',formula:'M = {(x, y) ∈ ℤ² : x + y is even}',area:2,det:4}};
let view='lattice',candidate=null;
const point=(x,y)=>[250+43*x,190-43*y];
function el(tag,attrs,text){const e=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;}
function draw(){
 const svg=get('beginner-svg');svg.replaceChildren();svg.append(el('title',{},view==='lattice'?'Even integer grid, basis (2,0), (0,2)':view==='dual'?'The half-integer dual grid of 2Z squared':'Even overlattice with integer coordinates of equal parity'));
 for(let i=-4;i<=4;i++){const [x]=point(i,0),[,y]=point(0,i);svg.append(el('line',{x1:x,y1:18,x2:x,y2:362,stroke:'#d9dfd1'}),el('line',{x1:78,y1:y,x2:422,y2:y,stroke:'#d9dfd1'}));}
 const corners=view==='overlattice'?[[0,0],[1,1],[2,0],[1,-1]]:[[0,0],[2,0],[2,2],[0,2]];
 svg.append(el('polygon',{points:corners.map(p=>point(...p).join(',')).join(' '),fill:'#216653','fill-opacity':.1,stroke:'#216653','stroke-width':1.5}));
 if(view==='dual')for(let i=-8;i<=8;i++)for(let j=-8;j<=8;j++){if(i%4===0&&j%4===0)continue;const [cx,cy]=point(i/2,j/2);svg.append(el('circle',{cx,cy,r:2.2,fill:'#b95d38'}));}
 if(view==='overlattice')for(let i=-3;i<=3;i+=2)for(let j=-3;j<=3;j+=2){const [cx,cy]=point(i,j);svg.append(el('circle',{cx,cy,r:4,fill:'#213c34'}));}
 for(let i=-4;i<=4;i+=2)for(let j=-4;j<=4;j+=2){const [cx,cy]=point(i,j);svg.append(el('circle',{cx,cy,r:4.5,fill:'#216653'}));}
 const basis=view==='overlattice'?[[1,1],[1,-1]]:[[2,0],[0,2]];
 basis.forEach((p,i)=>{const [x,y]=point(...p);svg.append(el('line',{x1:250,y1:190,x2:x,y2:y,stroke:'#216653','stroke-width':3}),el('text',{x:x+12,y:y-10,fill:'#216653','font-size':13,'font-family':'Georgia,serif'},(view==='overlattice'?'c':'b')+(i+1)));});
 svg.append(el('text',{x:238,y:209,fill:'#213c34','font-size':12},'0'));
 if(candidate){const c=candidates[candidate],[x,y]=point(c.x,c.y);svg.append(el('circle',{cx:x,cy:y,r:9,fill:'#fffef9',stroke:c.allowed?'#216653':'#b95d38','stroke-width':2.5}),el('text',{x:x+13,y:y+21,fill:'#213c34','font-size':13,'font-weight':600},'('+c.x+', '+c.y+')'));}
 const v=views[view];get('beginner-view-copy').innerHTML='<h4>'+v.title+'</h4><p>'+v.text+'</p><div class="formula">'+v.formula+'</div>';
 get('beginner-stats').innerHTML='<span>'+(view==='dual'?'Original L rank':'Rank')+' <strong>2</strong></span><span>'+(view==='dual'?'L-cell area':'Cell area')+' <strong>'+v.area+'</strong></span><span>'+(view==='dual'?'det L':'Determinant')+' <strong>'+v.det+'</strong></span>';
 document.querySelectorAll('[data-beginner-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.beginnerView===view));document.querySelectorAll('[data-beginner-point]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.beginnerPoint===candidate));
 if(candidate){const c=candidates[candidate];get('beginner-candidate').innerHTML='<div class="verdict '+(c.allowed?'':'fail')+'"><h4>'+c.title+'</h4><p>'+c.text+'</p><p class="candidate-norm">Squared length = '+c.norm+' · q = '+c.norm%2+' modulo 2</p></div>';}
}
 document.querySelectorAll('[data-beginner-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.beginnerView;draw();}));document.querySelectorAll('[data-beginner-point]').forEach(b=>b.addEventListener('click',()=>{candidate=b.dataset.beginnerPoint;draw();}));draw();
})();
