(()=>{"use strict";var e={684:(e,t,a)=>{var r=a(665),n=a(657),l=a(980),o=a(487);const u={NODE_ENV:"production",PUBLIC_URL:"/amoo-app",APP_MANIFEST:{name:"amoo-app",slug:"amoo-app",version:"1.0.0",sdkVersion:"50.0.0",platforms:["ios","android","web"],web:{}},EXPO_DEBUG:!1,PLATFORM:"web",WDS_SOCKET_PATH:"/_expo/ws"}.REACT_APP_API_URL||"http://localhost:3001/api",m=o.default.create({baseURL:u,headers:{"Content-Type":"application/json"}});m.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e}));const c=(0,r.createContext)(void 0),s=()=>{const e=(0,r.useContext)(c);if(void 0===e)throw new Error("useAuth must be used within an AuthProvider");return e},i=()=>{const[e,t]=(0,r.useState)(""),[a,n]=(0,r.useState)(""),[o,u]=(0,r.useState)(""),{login:m}=s(),c=(0,l.useNavigate)();return r.createElement("div",{className:"auth-container"},r.createElement("div",{className:"auth-box"},r.createElement("h2",null,"\u0412\u0445\u043e\u0434"),o&&r.createElement("div",{className:"error-message"},o),r.createElement("form",{onSubmit:async t=>{t.preventDefault();try{await m(e,a),c("/map")}catch(r){u("\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c")}}},r.createElement("div",{className:"form-group"},r.createElement("input",{type:"email",placeholder:"Email",value:e,onChange:e=>t(e.target.value),required:!0})),r.createElement("div",{className:"form-group"},r.createElement("input",{type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",value:a,onChange:e=>n(e.target.value),required:!0})),r.createElement("button",{type:"submit",className:"auth-button"},"\u0412\u043e\u0439\u0442\u0438"))))},p=()=>{const[e,t]=(0,r.useState)(""),[a,n]=(0,r.useState)(""),[o,u]=(0,r.useState)(""),[m,c]=(0,r.useState)(""),[i,p]=(0,r.useState)(""),{register:d}=s(),v=(0,l.useNavigate)();return r.createElement("div",{className:"auth-container"},r.createElement("div",{className:"auth-box"},r.createElement("h2",null,"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"),i&&r.createElement("div",{className:"error-message"},i),r.createElement("form",{onSubmit:async t=>{t.preventDefault();try{await d(e,a,o,parseInt(m)),v("/map")}catch(r){p("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.")}}},r.createElement("div",{className:"form-group"},r.createElement("input",{type:"text",placeholder:"\u0418\u043c\u044f",value:o,onChange:e=>u(e.target.value),required:!0})),r.createElement("div",{className:"form-group"},r.createElement("input",{type:"email",placeholder:"Email",value:e,onChange:e=>t(e.target.value),required:!0})),r.createElement("div",{className:"form-group"},r.createElement("input",{type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",value:a,onChange:e=>n(e.target.value),required:!0})),r.createElement("div",{className:"form-group"},r.createElement("input",{type:"number",placeholder:"\u0412\u043e\u0437\u0440\u0430\u0441\u0442",value:m,onChange:e=>c(e.target.value),required:!0,min:"18",max:"100"})),r.createElement("button",{type:"submit",className:"auth-button"},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"))))},d=()=>r.createElement("div",{className:"map-container"},r.createElement("h1",null,"\u041a\u0430\u0440\u0442\u0430"),r.createElement("div",{className:"map-placeholder"},r.createElement("p",null,"\u0417\u0434\u0435\u0441\u044c \u0431\u0443\u0434\u0435\u0442 \u043a\u0430\u0440\u0442\u0430"))),v=()=>r.createElement(l.HashRouter,null,r.createElement("div",{className:"app"},r.createElement(l.Routes,null,r.createElement(l.Route,{path:"/login",element:r.createElement(i,null)}),r.createElement(l.Route,{path:"/register",element:r.createElement(p,null)}),r.createElement(l.Route,{path:"/map",element:r.createElement(d,null)}),r.createElement(l.Route,{path:"/",element:r.createElement(l.Navigate,{to:"/login",replace:!0})}),r.createElement(l.Route,{path:"*",element:r.createElement(l.Navigate,{to:"/login",replace:!0})})))),E=document.getElementById("root");(0,n.createRoot)(E).render(r.createElement(r.StrictMode,null,r.createElement(v,null)))}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,a),l.exports}a.m=e,(()=>{var e=[];a.O=(t,r,n,l)=>{if(!r){var o=1/0;for(s=0;s<e.length;s++){for(var[r,n,l]=e[s],u=!0,m=0;m<r.length;m++)(!1&l||o>=l)&&Object.keys(a.O).every((e=>a.O[e](r[m])))?r.splice(m--,1):(u=!1,l<o&&(o=l));if(u){e.splice(s--,1);var c=n();void 0!==c&&(t=c)}}return t}l=l||0;for(var s=e.length;s>0&&e[s-1][2]>l;s--)e[s]=e[s-1];e[s]=[r,n,l]}})(),a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={792:0};a.O.j=t=>0===e[t];var t=(t,r)=>{var n,l,[o,u,m]=r,c=0;if(o.some((t=>0!==e[t]))){for(n in u)a.o(u,n)&&(a.m[n]=u[n]);if(m)var s=m(a)}for(t&&t(r);c<o.length;c++)l=o[c],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(s)},r=self.webpackChunkweb=self.webpackChunkweb||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var r=a.O(void 0,[766],(()=>a(684)));r=a.O(r)})();
//# sourceMappingURL=main.072a9079.js.map