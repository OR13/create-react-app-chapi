(this["webpackJsonpcreate-react-app-chapi"]=this["webpackJsonpcreate-react-app-chapi"]||[]).push([[0],{13:function(e,t,n){"use strict";(function(e){var a=n(0),r=n.n(a),i=n(1),s=n(15),c=n(4),o=n.n(c),l=n(14),u=n(16),p=(n(25),{"@context":["https://www.w3.org/2018/credentials/v1","https://www.w3.org/2018/credentials/examples/v1"],type:"VerifiablePresentation",verifiableCredential:[{"@context":["https://www.w3.org/2018/credentials/v1","https://www.w3.org/2018/credentials/examples/v1"],id:"http://example.edu/credentials/1872",type:["VerifiableCredential","AlumniCredential"],issuer:"https://example.edu/issuers/565049",issuanceDate:"2010-01-01T19:73:24Z",credentialSubject:{id:"did:example:ebfeb1f712ebc6f1c276e12ec21",alumniOf:{id:"did:example:c276e12ec21ebfeb1f712ebc6f1",name:{value:"Example University",lang:"en"}}},proof:{type:"RsaSignature2018",created:"2017-06-18T21:19:10Z",proofPurpose:"assertionMethod",verificationMethod:"https://example.edu/issuers/keys/1",jws:"eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"}}]}),d={web:{VerifiablePresentation:{query:[{type:"QueryByExample",credentialQuery:{reason:"Please present an AlumniCredential for JaneDoe.",example:{"@context":["https://www.w3.org/2018/credentials/v1","https://www.w3.org/2018/credentials/examples/v1"],type:["VerifiablePresentation"],credentialSubject:{id:"did:example:ebfeb1f712ebc6f1c276e12ec21"}}}}]}}};t.a=function(){var t=o.a.useState({}),n=Object(s.a)(t,2),a=n[0],c=n[1];return o.a.useEffect((function(){Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.a();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.error("Error in loadOnce:",e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))()})),o.a.createElement("div",{className:"App"},o.a.createElement("h3",null,"CHAPI CREATE REACT APP"),o.a.createElement("div",null,o.a.createElement("button",{onClick:Object(i.a)(r.a.mark((function t(){var n,a,i,s,c;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=window.origin,a="".concat(n,"/worker.html"),t.next=4,u.a({url:a});case 4:return i=t.sent,t.next=7,i.credentialManager.hints.set("test",{name:"TestUser",enabledTypes:["VerifiablePresentation","VerifiableCredential","AlumniCredential"]});case 7:return console.log("Wallet registered."),s=new e.WebCredential(p.type,p),t.next=11,navigator.credentials.store(s);case 11:c=t.sent,console.log("Result of receiving via store() request:",c);case 13:case"end":return t.stop()}}),t)})))},"Receive Credential From Website")),o.a.createElement("div",null,o.a.createElement("button",{onClick:Object(i.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.credentials.get(d);case 2:t=e.sent,console.log(t),c({vp:t.data});case 5:case"end":return e.stop()}}),e)})))},"Share Credential With Website")),o.a.createElement("div",null,o.a.createElement("pre",null,JSON.stringify(a,null,2))))}}).call(this,n(23))},17:function(e,t,n){e.exports=n(26)},22:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(4),r=n.n(a),i=n(12),s=n.n(i),c=(n(22),n(13));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(c.a,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.1a2b46f6.chunk.js.map