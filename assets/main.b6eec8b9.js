import{r as M,c as gt,g as mt,s as wt,a as Ot,S as xt,j as E,b as Pt,L as St,d as jt,F as Mt,C as It,e as Ct,N as Et,f as Dt,R as Rt}from"./index.063ecd82.js";var st={exports:{}};(function(I,_){(function(R,O){I.exports=O(M.exports)})(typeof self<"u"?self:gt,function(R){return function(O){var x={};function v(f){if(x[f])return x[f].exports;var t=x[f]={i:f,l:!1,exports:{}};return O[f].call(t.exports,t,t.exports,v),t.l=!0,t.exports}return v.m=O,v.c=x,v.d=function(f,t,e){v.o(f,t)||Object.defineProperty(f,t,{enumerable:!0,get:e})},v.r=function(f){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(f,"__esModule",{value:!0})},v.t=function(f,t){if(1&t&&(f=v(f)),8&t||4&t&&typeof f=="object"&&f&&f.__esModule)return f;var e=Object.create(null);if(v.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:f}),2&t&&typeof f!="string")for(var c in f)v.d(e,c,function(a){return f[a]}.bind(null,c));return e},v.n=function(f){var t=f&&f.__esModule?function(){return f.default}:function(){return f};return v.d(t,"a",t),t},v.o=function(f,t){return Object.prototype.hasOwnProperty.call(f,t)},v.p="",v(v.s=2)}([function(O,x){O.exports=R},function(O,x,v){var f={linear:function(t,e,c,a){return(c-e)*t/a+e},easeInQuad:function(t,e,c,a){return(c-e)*(t/=a)*t+e},easeOutQuad:function(t,e,c,a){return-(c-e)*(t/=a)*(t-2)+e},easeInOutQuad:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t+e:-s/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,c,a){return(c-e)*(t/=a)*t*t+e},easeOutCubic:function(t,e,c,a){return(c-e)*((t=t/a-1)*t*t+1)+e},easeInOutCubic:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t*t+e:s/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,c,a){return(c-e)*(t/=a)*t*t*t+e},easeOutQuart:function(t,e,c,a){return-(c-e)*((t=t/a-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t*t*t+e:-s/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,c,a){return(c-e)*(t/=a)*t*t*t*t+e},easeOutQuint:function(t,e,c,a){return(c-e)*((t=t/a-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t*t*t*t+e:s/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,c,a){var s=c-e;return-s*Math.cos(t/a*(Math.PI/2))+s+e},easeOutSine:function(t,e,c,a){return(c-e)*Math.sin(t/a*(Math.PI/2))+e},easeInOutSine:function(t,e,c,a){return-(c-e)/2*(Math.cos(Math.PI*t/a)-1)+e},easeInExpo:function(t,e,c,a){return t==0?e:(c-e)*Math.pow(2,10*(t/a-1))+e},easeOutExpo:function(t,e,c,a){var s=c-e;return t==a?e+s:s*(1-Math.pow(2,-10*t/a))+e},easeInOutExpo:function(t,e,c,a){var s=c-e;return t===0?e:t===a?e+s:(t/=a/2)<1?s/2*Math.pow(2,10*(t-1))+e:s/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,c,a){return-(c-e)*(Math.sqrt(1-(t/=a)*t)-1)+e},easeOutCirc:function(t,e,c,a){return(c-e)*Math.sqrt(1-(t=t/a-1)*t)+e},easeInOutCirc:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?-s/2*(Math.sqrt(1-t*t)-1)+e:s/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,c,a){var s,p,m,h=c-e;return m=1.70158,t===0?e:(t/=a)==1?e+h:((p=0)||(p=.3*a),(s=h)<Math.abs(h)?(s=h,m=p/4):m=p/(2*Math.PI)*Math.asin(h/s),-s*Math.pow(2,10*(t-=1))*Math.sin((t*a-m)*(2*Math.PI)/p)+e)},easeOutElastic:function(t,e,c,a){var s,p,m,h=c-e;return m=1.70158,t===0?e:(t/=a)==1?e+h:((p=0)||(p=.3*a),(s=h)<Math.abs(h)?(s=h,m=p/4):m=p/(2*Math.PI)*Math.asin(h/s),s*Math.pow(2,-10*t)*Math.sin((t*a-m)*(2*Math.PI)/p)+h+e)},easeInOutElastic:function(t,e,c,a){var s,p,m,h=c-e;return m=1.70158,t===0?e:(t/=a/2)==2?e+h:((p=0)||(p=a*.44999999999999996),(s=h)<Math.abs(h)?(s=h,m=p/4):m=p/(2*Math.PI)*Math.asin(h/s),t<1?s*Math.pow(2,10*(t-=1))*Math.sin((t*a-m)*(2*Math.PI)/p)*-.5+e:s*Math.pow(2,-10*(t-=1))*Math.sin((t*a-m)*(2*Math.PI)/p)*.5+h+e)},easeInBack:function(t,e,c,a,s){return s===void 0&&(s=1.70158),(c-e)*(t/=a)*t*((s+1)*t-s)+e},easeOutBack:function(t,e,c,a,s){return s===void 0&&(s=1.70158),(c-e)*((t=t/a-1)*t*((s+1)*t+s)+1)+e},easeInOutBack:function(t,e,c,a,s){var p=c-e;return s===void 0&&(s=1.70158),(t/=a/2)<1?p/2*(t*t*((1+(s*=1.525))*t-s))+e:p/2*((t-=2)*t*((1+(s*=1.525))*t+s)+2)+e},easeInBounce:function(t,e,c,a){var s=c-e;return s-f.easeOutBounce(a-t,0,s,a)+e},easeOutBounce:function(t,e,c,a){var s=c-e;return(t/=a)<.36363636363636365?s*(7.5625*t*t)+e:t<.7272727272727273?s*(7.5625*(t-=.5454545454545454)*t+.75)+e:t<.9090909090909091?s*(7.5625*(t-=.8181818181818182)*t+.9375)+e:s*(7.5625*(t-=.9545454545454546)*t+.984375)+e},easeInOutBounce:function(t,e,c,a){var s=c-e;return t<a/2?.5*f.easeInBounce(2*t,0,s,a)+e:.5*f.easeOutBounce(2*t-a,0,s,a)+.5*s+e}};O.exports=f},function(O,x,v){O.exports=v(3)},function(O,x,v){v.r(x),v.d(x,"ReactConfetti",function(){return nt});var f,t,e=v(0),c=v.n(e),a=v(1),s=v.n(a);function p(n,i){return n+Math.random()*(i-n)}function m(n,i){for(var o=0;o<i.length;o++){var r=i[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function h(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}(function(n){n[n.Circle=0]="Circle",n[n.Square=1]="Square",n[n.Strip=2]="Strip"})(f||(f={})),function(n){n[n.Positive=1]="Positive",n[n.Negative=-1]="Negative"}(t||(t={}));var D=function(){function n(r,d,u,l){(function(H,L){if(!(H instanceof L))throw new TypeError("Cannot call a class as a function")})(this,n),h(this,"context",void 0),h(this,"radius",void 0),h(this,"x",void 0),h(this,"y",void 0),h(this,"w",void 0),h(this,"h",void 0),h(this,"vx",void 0),h(this,"vy",void 0),h(this,"shape",void 0),h(this,"angle",void 0),h(this,"angularSpin",void 0),h(this,"color",void 0),h(this,"rotateY",void 0),h(this,"rotationDirection",void 0),h(this,"getOptions",void 0),this.getOptions=d;var y,g,b=this.getOptions(),C=b.colors,P=b.initialVelocityX,S=b.initialVelocityY;this.context=r,this.x=u,this.y=l,this.w=p(5,20),this.h=p(5,20),this.radius=p(5,10),this.vx=typeof P=="number"?p(-P,P):p(P.min,P.max),this.vy=typeof S=="number"?p(-S,0):p(S.min,S.max),this.shape=(y=0,g=2,Math.floor(y+Math.random()*(g-y+1))),this.angle=p(0,360)*Math.PI/180,this.angularSpin=p(-.2,.2),this.color=C[Math.floor(Math.random()*C.length)],this.rotateY=p(0,1),this.rotationDirection=p(0,1)?t.Positive:t.Negative}var i,o;return i=n,(o=[{key:"update",value:function(){var r=this.getOptions(),d=r.gravity,u=r.wind,l=r.friction,y=r.opacity,g=r.drawShape;this.x+=this.vx,this.y+=this.vy,this.vy+=d,this.vx+=u,this.vx*=l,this.vy*=l,this.rotateY>=1&&this.rotationDirection===t.Positive?this.rotationDirection=t.Negative:this.rotateY<=-1&&this.rotationDirection===t.Negative&&(this.rotationDirection=t.Positive);var b=.1*this.rotationDirection;if(this.rotateY+=b,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=y,this.context.lineCap="round",this.context.lineWidth=2,g&&typeof g=="function")g.call(this,this.context);else switch(this.shape){case f.Circle:this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break;case f.Square:this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break;case f.Strip:this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h)}this.context.closePath(),this.context.restore()}}])&&m(i.prototype,o),n}();function w(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}var N=function n(i,o){var r=this;(function(u,l){if(!(u instanceof l))throw new TypeError("Cannot call a class as a function")})(this,n),w(this,"canvas",void 0),w(this,"context",void 0),w(this,"getOptions",void 0),w(this,"x",0),w(this,"y",0),w(this,"w",0),w(this,"h",0),w(this,"lastNumberOfPieces",0),w(this,"tweenInitTime",Date.now()),w(this,"particles",[]),w(this,"particlesGenerated",0),w(this,"removeParticleAt",function(u){r.particles.splice(u,1)}),w(this,"getParticle",function(){var u=p(r.x,r.w+r.x),l=p(r.y,r.h+r.y);return new D(r.context,r.getOptions,u,l)}),w(this,"animate",function(){var u=r.canvas,l=r.context,y=r.particlesGenerated,g=r.lastNumberOfPieces,b=r.getOptions(),C=b.run,P=b.recycle,S=b.numberOfPieces,H=b.debug,L=b.tweenFunction,V=b.tweenDuration;if(!C)return!1;var U=r.particles.length,A=P?U:y,X=Date.now();if(A<S){g!==S&&(r.tweenInitTime=X,r.lastNumberOfPieces=S);for(var rt=r.tweenInitTime,bt=L(X-rt>V?V:Math.max(0,X-rt),A,S,V),it=Math.round(bt-A),ot=0;ot<it;ot++)r.particles.push(r.getParticle());r.particlesGenerated+=it}return H&&(l.font="12px sans-serif",l.fillStyle="#333",l.textAlign="right",l.fillText("Particles: ".concat(U),u.width-10,u.height-20)),r.particles.forEach(function(F,at){F.update(),(F.y>u.height||F.y<-100||F.x>u.width+100||F.x<-100)&&(P&&A<=S?r.particles[at]=r.getParticle():r.removeParticleAt(at))}),U>0||A<S}),this.canvas=i;var d=this.canvas.getContext("2d");if(!d)throw new Error("Could not get canvas context");this.context=d,this.getOptions=o};function $(n,i){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);i&&(r=r.filter(function(d){return Object.getOwnPropertyDescriptor(n,d).enumerable})),o.push.apply(o,r)}return o}function B(n){for(var i=1;i<arguments.length;i++){var o=arguments[i]!=null?arguments[i]:{};i%2?$(Object(o),!0).forEach(function(r){j(n,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):$(Object(o)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(o,r))})}return n}function ct(n,i){for(var o=0;o<i.length;o++){var r=i[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function j(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}var T={width:typeof window<"u"?window.innerWidth:300,height:typeof window<"u"?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:s.a.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0},ut=function(){function n(r,d){var u=this;(function(y,g){if(!(y instanceof g))throw new TypeError("Cannot call a class as a function")})(this,n),j(this,"canvas",void 0),j(this,"context",void 0),j(this,"_options",void 0),j(this,"generator",void 0),j(this,"rafId",void 0),j(this,"setOptionsWithDefaults",function(y){var g={confettiSource:{x:0,y:0,w:u.canvas.width,h:0}};u._options=B(B(B({},g),T),y),Object.assign(u,y.confettiSource)}),j(this,"update",function(){var y=u.options,g=y.run,b=y.onConfettiComplete,C=u.canvas,P=u.context;g&&(P.fillStyle="white",P.clearRect(0,0,C.width,C.height)),u.generator.animate()?u.rafId=requestAnimationFrame(u.update):(b&&typeof b=="function"&&u.generator.particlesGenerated>0&&b.call(u,u),u._options.run=!1)}),j(this,"reset",function(){u.generator&&u.generator.particlesGenerated>0&&(u.generator.particlesGenerated=0,u.generator.particles=[],u.generator.lastNumberOfPieces=0)}),j(this,"stop",function(){u.options={run:!1},u.rafId&&(cancelAnimationFrame(u.rafId),u.rafId=void 0)}),this.canvas=r;var l=this.canvas.getContext("2d");if(!l)throw new Error("Could not get canvas context");this.context=l,this.generator=new N(this.canvas,function(){return u.options}),this.options=d,this.update()}var i,o;return i=n,(o=[{key:"options",get:function(){return this._options},set:function(r){var d=this._options&&this._options.run,u=this._options&&this._options.recycle;this.setOptionsWithDefaults(r),this.generator&&(Object.assign(this.generator,this.options.confettiSource),typeof r.recycle=="boolean"&&r.recycle&&u===!1&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),typeof r.run=="boolean"&&r.run&&d===!1&&this.update()}}])&&ct(i.prototype,o),n}();function ft(n){return function(i){if(Array.isArray(i))return q(i)}(n)||function(i){if(typeof Symbol<"u"&&Symbol.iterator in Object(i))return Array.from(i)}(n)||tt(n)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function J(n){return(J=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(i){return typeof i}:function(i){return i&&typeof Symbol=="function"&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i})(n)}function Q(){return(Q=Object.assign||function(n){for(var i=1;i<arguments.length;i++){var o=arguments[i];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n[r]=o[r])}return n}).apply(this,arguments)}function K(n,i){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);i&&(r=r.filter(function(d){return Object.getOwnPropertyDescriptor(n,d).enumerable})),o.push.apply(o,r)}return o}function Z(n){for(var i=1;i<arguments.length;i++){var o=arguments[i]!=null?arguments[i]:{};i%2?K(Object(o),!0).forEach(function(r){k(n,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):K(Object(o)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(o,r))})}return n}function ht(n,i){return function(o){if(Array.isArray(o))return o}(n)||function(o,r){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(o)))){var d=[],u=!0,l=!1,y=void 0;try{for(var g,b=o[Symbol.iterator]();!(u=(g=b.next()).done)&&(d.push(g.value),!r||d.length!==r);u=!0);}catch(C){l=!0,y=C}finally{try{u||b.return==null||b.return()}finally{if(l)throw y}}return d}}(n,i)||tt(n,i)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function tt(n,i){if(n){if(typeof n=="string")return q(n,i);var o=Object.prototype.toString.call(n).slice(8,-1);return o==="Object"&&n.constructor&&(o=n.constructor.name),o==="Map"||o==="Set"?Array.from(n):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?q(n,i):void 0}}function q(n,i){(i==null||i>n.length)&&(i=n.length);for(var o=0,r=new Array(i);o<i;o++)r[o]=n[o];return r}function lt(n,i){if(!(n instanceof i))throw new TypeError("Cannot call a class as a function")}function pt(n,i){for(var o=0;o<i.length;o++){var r=i[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function et(n,i){return(et=Object.setPrototypeOf||function(o,r){return o.__proto__=r,o})(n,i)}function dt(n){var i=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}();return function(){var o,r=W(n);if(i){var d=W(this).constructor;o=Reflect.construct(r,arguments,d)}else o=r.apply(this,arguments);return vt(this,o)}}function vt(n,i){return!i||J(i)!=="object"&&typeof i!="function"?G(n):i}function G(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function W(n){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(i){return i.__proto__||Object.getPrototypeOf(i)})(n)}function k(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}var yt=c.a.createRef(),Y=function(n){(function(u,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function");u.prototype=Object.create(l&&l.prototype,{constructor:{value:u,writable:!0,configurable:!0}}),l&&et(u,l)})(d,n);var i,o,r=dt(d);function d(u){var l;lt(this,d);for(var y=arguments.length,g=new Array(y>1?y-1:0),b=1;b<y;b++)g[b-1]=arguments[b];return k(G(l=r.call.apply(r,[this,u].concat(g))),"canvas",c.a.createRef()),k(G(l),"confetti",void 0),l.canvas=u.canvasRef||yt,l}return i=d,(o=[{key:"componentDidMount",value:function(){if(this.canvas.current){var u=z(this.props)[0];this.confetti=new ut(this.canvas.current,u)}}},{key:"componentDidUpdate",value:function(){var u=z(this.props)[0];this.confetti&&(this.confetti.options=u)}},{key:"componentWillUnmount",value:function(){this.confetti&&this.confetti.stop(),this.confetti=void 0}},{key:"render",value:function(){var u=ht(z(this.props),2),l=u[0],y=u[1],g=Z({zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0},y.style);return c.a.createElement("canvas",Q({width:l.width,height:l.height,ref:this.canvas},y,{style:g}))}}])&&pt(i.prototype,o),d}(e.Component);function z(n){var i={},o={},r=[].concat(ft(Object.keys(T)),["confettiSource","drawShape","onConfettiComplete"]),d=["canvasRef"];for(var u in n){var l=n[u];r.includes(u)?i[u]=l:d.includes(u)?d[u]=l:o[u]=l}return[i,o,{}]}k(Y,"defaultProps",Z({},T)),k(Y,"displayName","ReactConfetti");var nt=c.a.forwardRef(function(n,i){return c.a.createElement(Y,Q({canvasRef:i},n))});x.default=nt}]).default})})(st);const _t=mt(st.exports),kt=()=>{const[I,_]=M.exports.useReducer(wt,Ot()),[R,O]=M.exports.useState(void 0),[x,v]=M.exports.useState([window.innerWidth,window.innerHeight]),f=M.exports.useRef(null),[t,e]=M.exports.useState(!1),[c,a]=M.exports.useState(!1),s=M.exports.useContext(xt),p=I.grid.map(D=>D.filter(w=>w.number!==void 0)).flat().length===0,m=I.grid.map(D=>D.map(w=>{var N;return(N=w.number)!=null?N:"0"}).join("")).join(""),h=()=>{v([window.innerWidth,window.innerHeight])};return M.exports.useEffect(()=>(window.addEventListener("resize",h),()=>{window.removeEventListener("resize",h)}),[]),M.exports.useEffect(()=>{I.complete&&(_({type:"solidify"}),O(void 0),s.confetti&&a(!0))},[I.complete]),E(Pt,{children:E(St,{page:"index",boardString:p?void 0:m,children:({setError:D})=>jt(Mt,{children:[E(It,{sudoku:I,page:"index",dispatch:_,selected:R,note:t,setNote:e,setError:D}),E(Ct,{sudoku:I,dispatch:_,selected:R,setSelected:O,setHoldingShift:e,numbersRef:f}),E(Et,{remaining:I.remaining,dispatch:_,selected:R,note:t,numbersRef:f}),c&&E(_t,{recycle:!1,style:{overflow:"none",width:"100%",height:"100%"},width:x[0],height:x[1],numberOfPieces:1e3,onConfettiComplete:()=>{a(!1)}})]})})})};Dt.createRoot(document.getElementById("root")).render(E(Rt.StrictMode,{children:E(kt,{})}));
