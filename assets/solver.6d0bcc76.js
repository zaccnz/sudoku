import{r as s,s as h,a as f,j as e,b as g,L as m,d as R,F as S,C as b,e as v,N as w,f as x,R as k}from"./index.0fb1ed2c.js";const L="0123456789",j=()=>{const[o,t]=s.exports.useReducer(h,f()),c=s.exports.useRef(null),[n,p]=s.exports.useState(void 0);return s.exports.useEffect(()=>{const r=new URLSearchParams(window.location.search).get("board");if(!r)return;if(r.length!==81){alert("invalid board in URL");return}const u=[];for(let a=0;a<9;a++){const l=[];for(let i=0;i<9;i++){const d=r[a*9+i];if(!L.includes(d)){alert("invalid board in URL");return}l.push(d==="0"?void 0:parseInt(d))}u.push(l),window.history.pushState(null,"","/sudoku/solver/")}t({type:"createNew",numbers:u})},[]),e(g,{children:e(m,{page:"solver",children:({setError:r})=>R(S,{children:[e(b,{sudoku:o,page:"solver",dispatch:t,selected:n,setError:r}),e(v,{sudoku:o,dispatch:t,selected:n,setSelected:p,numbersRef:c}),e(w,{remaining:o.remaining,dispatch:t,selected:n,numbersRef:c})]})})})};x.createRoot(document.getElementById("root")).render(e(k.StrictMode,{children:e(j,{})}));
