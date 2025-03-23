"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[653],{653:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var l=a(665),s=a(696);const n=new class{async getStreams(){return(await s.default.get("/streams")).data}async getStream(e){return(await s.default.get(`/streams/${e}`)).data}async startStream(e){return(await s.default.post("/streams",e)).data}async endStream(e){await s.default.post(`/streams/${e}/end`)}async updateStreamSettings(e,t){return(await s.default.patch(`/streams/${e}`,t)).data}async getStreamKey(e){return(await s.default.get(`/streams/${e}/key`)).data.streamKey}};var r=a(195);const c=()=>{const[e,t]=(0,l.useState)([]),[a,s]=(0,l.useState)(null),[c,m]=(0,l.useState)(!0),[i,u]=(0,l.useState)(""),[d,o]=(0,l.useState)(!1),[E,h]=(0,l.useState)({title:"",description:"",isPublic:!0,allowChat:!0}),{user:p}=(0,r.useAuth)();(0,l.useEffect)((()=>{g()}),[]);const g=async()=>{try{m(!0);const e=await n.getStreams();t(e)}catch(e){u("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u0441\u0442\u0440\u0438\u043c\u043e\u0432")}finally{m(!1)}};return c?l.createElement("div",{className:"loading"},"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."):i?l.createElement("div",{className:"error"},i):l.createElement("div",{className:"streams-screen"},a?l.createElement("div",{className:"current-stream"},l.createElement("div",{className:"stream-header"},l.createElement("h2",null,a.title),a.userId===p?.id&&l.createElement("button",{onClick:async()=>{if(a)try{await n.endStream(a.id),s(null),g()}catch(e){u("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u0438 \u0441\u0442\u0440\u0438\u043c\u0430")}},className:"end-stream-button"},"\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c \u0441\u0442\u0440\u0438\u043c")),l.createElement("div",{className:"stream-player"},l.createElement("div",{className:"stream-placeholder"},"\u0421\u0442\u0440\u0438\u043c ",a.title)),l.createElement("div",{className:"stream-info"},l.createElement("p",null,a.description),l.createElement("div",{className:"stream-stats"},l.createElement("span",null,"\ud83d\udc65 ",a.viewerCount),l.createElement("span",null,"\ud83d\udd52 ",new Date(a.startedAt).toLocaleTimeString())))):l.createElement(l.Fragment,null,l.createElement("div",{className:"streams-header"},l.createElement("h2",null,"\u0421\u0442\u0440\u0438\u043c\u044b"),!d&&l.createElement("button",{onClick:()=>o(!0),className:"start-stream-button"},"\u041d\u0430\u0447\u0430\u0442\u044c \u0441\u0442\u0440\u0438\u043c")),d?l.createElement("div",{className:"stream-settings"},l.createElement("h3",null,"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0442\u0440\u0438\u043c\u0430"),l.createElement("div",{className:"form-group"},l.createElement("label",null,"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"),l.createElement("input",{type:"text",value:E.title,onChange:e=>h({...E,title:e.target.value})})),l.createElement("div",{className:"form-group"},l.createElement("label",null,"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"),l.createElement("textarea",{value:E.description,onChange:e=>h({...E,description:e.target.value})})),l.createElement("div",{className:"form-group"},l.createElement("label",null,l.createElement("input",{type:"checkbox",checked:E.isPublic,onChange:e=>h({...E,isPublic:e.target.checked})}),"\u041f\u0443\u0431\u043b\u0438\u0447\u043d\u044b\u0439 \u0441\u0442\u0440\u0438\u043c")),l.createElement("div",{className:"form-group"},l.createElement("label",null,l.createElement("input",{type:"checkbox",checked:E.allowChat,onChange:e=>h({...E,allowChat:e.target.checked})}),"\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c \u0447\u0430\u0442")),l.createElement("div",{className:"stream-actions"},l.createElement("button",{onClick:async()=>{try{o(!0);const e=await n.startStream(E);s(e),g()}catch(e){u("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u043f\u0443\u0441\u043a\u0435 \u0441\u0442\u0440\u0438\u043c\u0430")}finally{o(!1)}},className:"start-button"},"\u041d\u0430\u0447\u0430\u0442\u044c"),l.createElement("button",{onClick:()=>o(!1),className:"cancel-button"},"\u041e\u0442\u043c\u0435\u043d\u0430"))):l.createElement("div",{className:"streams-grid"},e.map((e=>l.createElement("div",{key:e.id,className:"stream-card"},l.createElement("img",{src:e.thumbnailUrl,alt:e.title,className:"stream-thumbnail"}),l.createElement("div",{className:"stream-card-info"},l.createElement("h3",null,e.title),l.createElement("p",null,e.description),l.createElement("div",{className:"stream-card-stats"},l.createElement("span",null,"\ud83d\udc65 ",e.viewerCount),l.createElement("span",null,"\ud83d\udd52 ",new Date(e.startedAt).toLocaleTimeString())),l.createElement("button",{onClick:()=>(async e=>{try{const t=await n.getStream(e);s(t)}catch(t){u("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u0441\u0442\u0440\u0438\u043c\u0430")}})(e.id),className:"watch-stream-button"},"\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c"))))))))}}}]);
//# sourceMappingURL=653.4457dde7.chunk.js.map