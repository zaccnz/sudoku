import{r as n,j as t,a as e,c as s,R as a}from"./jsx-runtime.2a7b9dc6.js";function d(){const[c,o]=n.exports.useState(0);return t("div",{className:"App",children:[e("h1",{children:"Sudoku Solver"}),t("div",{className:"card",children:[t("button",{onClick:()=>o(r=>r+1),children:["count is ",c]}),t("p",{children:["Edit ",e("code",{children:"src/App.tsx"})," and save to test HMR"]})]}),e("p",{className:"read-the-docs",children:"Click on the Vite and React logos to learn more"})]})}s.createRoot(document.getElementById("root")).render(e(a.StrictMode,{children:e(d,{})}));