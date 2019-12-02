(function(t){function e(e){for(var r,i,o=e[0],l=e[1],c=e[2],d=0,m=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&m.push(s[i][0]),s[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,o=1;o<a.length;o++){var l=a[o];0!==s[l]&&(r=!1)}r&&(n.splice(e--,1),t=i(i.s=a[0]))}return t}var r={},s={app:0},n=[];function i(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=r,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var r=a("19b3"),s=a.n(r);s.a},1:function(t,e){},"19b3":function(t,e,a){},2:function(t,e){},3:function(t,e){},4:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[a("v-row",[a("v-col",{attrs:{align:"start",justify:"start"}},[a("div",{staticClass:"d-flex align-center"},[a("v-img",{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",contain:"",src:"https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",transition:"scale-transition",width:"40"}}),a("h2",[t._v("Aufgabenmanager")])],1)]),a("v-col",{attrs:{align:"center",justify:"center"}},[a("div",{staticStyle:{"margin-top":"12px"},attrs:{id:"nav"}},[a("router-link",{staticClass:"router-link",attrs:{to:"/"}},[t._v("Home")]),t.isAuth?a("span",[t._v(" | ")]):t._e(),t.isAuth?a("router-link",{staticClass:"router-link",attrs:{to:"/tasks"}},[t._v("Tasks")]):t._e(),t.isAuth&&"admin"===t.role?a("span",[t._v(" | ")]):t._e(),t.isAuth&&"admin"===t.role?a("router-link",{staticClass:"router-link",attrs:{to:"/users"}},[t._v("Users")]):t._e(),t.isAuth&&"admin"===t.role?a("span",[t._v(" | ")]):t._e(),t.isAuth&&"admin"===t.role?a("router-link",{staticClass:"router-link",attrs:{to:"/system"}},[t._v("System")]):t._e()],1)]),a("v-col",{attrs:{align:"right",justify:"right"}},[a("div",{staticStyle:{"margin-top":"12px"},attrs:{id:"nav"}},[t.isAuth?t._e():a("router-link",{staticClass:"router-link",attrs:{to:"/register"}},[t._v("Register")]),t.isAuth?t._e():a("span",[t._v(" | ")]),t.isAuth?t._e():a("router-link",{staticClass:"router-link",attrs:{to:"/login"}},[t._v("Login")]),t.isAuth?a("router-link",{staticClass:"router-link",attrs:{to:"/profile"}},[t._v(t._s(t.fullname))]):t._e(),t.isAuth?a("span",[t._v(" | ")]):t._e(),t.isAuth?a("router-link",{staticClass:"router-link",attrs:{to:"/login"}},[a("span",{on:{click:t.logout}},[t._v("Logout")])]):t._e()],1)])],1)],1),a("v-content",[a("v-container",[a("v-row",{staticStyle:{"margin-top":"20px"},attrs:{align:"center",justify:"center"}},[a("router-view",{attrs:{isAuth:t.isAuth,username:t.username,fullname:t.fullname,role:t.role}})],1)],1)],1)],1)},n=[],i={name:"App",components:{},data:function(){return{isAuth:"",username:"",fullname:"",role:""}},mounted:function(){this.init()},updated:function(){this.init()},methods:{init:function(){this.isAuth=this.$store.getters.isLoggedIn,this.isAuth&&(this.username=this.$store.getters.getUser.username,this.role=this.$store.getters.getUser.role,this.fullname=this.$store.getters.getUser.fullname)},logout:function(){this.isAuth=!1,this.$store.dispatch("logout")}}},o=i,l=(a("034f"),a("2877")),c=a("6544"),u=a.n(c),d=a("7496"),m=a("40dc"),p=a("62ad"),v=a("a523"),f=a("a75b"),h=a("adda"),g=a("0fd9"),_=Object(l["a"])(o,s,n,!1,null,null,null),x=_.exports;u()(_,{VApp:d["a"],VAppBar:m["a"],VCol:p["a"],VContainer:v["a"],VContent:f["a"],VImg:h["a"],VRow:g["a"]});var b=a("f309");r["a"].use(b["a"]);var k=new b["a"]({}),w=(a("45fc"),a("8c4f")),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",[a("h2",[t._v("Willkommen bei Aufgabenmanager")]),t.isAuth?a("p",[t._v("Du hast dich erfolgreich als "),a("router-link",{attrs:{to:"/profile"}},[t._v(t._s(t.username))]),t._v(" eingeloggt. ")],1):a("p",[t._v("Um deine Aufgaben zu sehen, musst du dich "),a("router-link",{attrs:{to:"/login"}},[t._v("einloggen")]),t._v(". Falls du noch kein Benutzerkonto hast, musst du dich "),a("router-link",{attrs:{to:"/register"}},[t._v("registrieren")]),t._v(". ")],1)])},V=[],I={props:["isAuth","username"]},S=I,C=a("0e8f"),P=Object(l["a"])(S,y,V,!1,null,null,null),A=P.exports;u()(P,{VFlex:C["a"]});var T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("Register")])],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"Username",name:"login","prepend-icon":"mdi-account",type:"text"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),a("v-text-field",{attrs:{label:"Vorname",name:"firstname","prepend-icon":"mdi-account",type:"text"},model:{value:t.firstname,callback:function(e){t.firstname=e},expression:"firstname"}}),a("v-text-field",{attrs:{label:"Nachname",name:"lastname","prepend-icon":"mdi-account",type:"text"},model:{value:t.lastname,callback:function(e){t.lastname=e},expression:"lastname"}}),a("v-text-field",{attrs:{id:"password",label:"Password",name:"password","prepend-icon":"mdi-lock",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),a("v-text-field",{attrs:{id:"password_repeat",label:"Password (repeat)",name:"password-repeat","prepend-icon":"mdi-lock",type:"password"},model:{value:t.password_repeat,callback:function(e){t.password_repeat=e},expression:"password_repeat"}}),t.msg?a("p",{staticStyle:{color:"red","text-align":"center"}},[t._v(t._s(t.msg))]):t._e()],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:t.signUp}},[t._v("Register")])],1)],1)],1)},O=[],R=(a("96cf"),a("89ba")),$=a("bc3a"),j=a.n($),D={data:function(){return{username:"",firstname:"",lastname:"",password:"",password_repeat:"",msg:""}},methods:{signUp:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){var e,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e={username:this.username,firstname:this.firstname,lastname:this.lastname,password:this.password,password_repeat:this.password_repeat},t.next=4,j.a.post("/api/user",e).then((function(t){return t.data}));case 4:a=t.sent,this.msg=a.msg,this.$router.push("/login"),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),this.msg=t.t0.response.data.msg;case 12:case"end":return t.stop()}}),t,this,[[0,9]])})));function e(){return t.apply(this,arguments)}return e}()}},U=D,E=a("8336"),L=a("b0af"),B=a("99d9"),z=a("4bd4"),F=a("2fa4"),M=a("8654"),N=a("71d9"),q=a("2a7f"),H=Object(l["a"])(U,T,O,!1,null,null,null),W=H.exports;u()(H,{VBtn:E["a"],VCard:L["a"],VCardActions:B["a"],VCardText:B["b"],VCol:p["a"],VForm:z["a"],VSpacer:F["a"],VTextField:M["a"],VToolbar:N["a"],VToolbarTitle:q["a"]});var K=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[t.isAuth?a("p",[t._v("You are already logged in! See your "),a("a",{attrs:{href:"profile"}},[t._v("profile")]),t._v(".")]):t._e(),t.isAuth?t._e():a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("Login")])],1),a("v-card-text",[a("v-form",[a("v-select",{attrs:{"prepend-icon":"mdi-database",items:t.loginMethods,label:"Login Methode"},on:{change:t.changeMethod},model:{value:t.loginMethod,callback:function(e){t.loginMethod=e},expression:"loginMethod"}}),a("v-text-field",{directives:[{name:"show",rawName:"v-show",value:t.showLdapServer,expression:"showLdapServer"}],attrs:{id:"ldapServer",label:"LDAP Server",name:"ldapServer","prepend-icon":"mdi-server",type:"text"},model:{value:t.ldapServer,callback:function(e){t.ldapServer=e},expression:"ldapServer"}}),a("v-text-field",{attrs:{label:"Username",name:"login","prepend-icon":"mdi-account",type:"text"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),a("v-text-field",{attrs:{id:"password",label:"Password",name:"password","prepend-icon":"mdi-lock",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t.msg?a("p",{staticStyle:{color:"red","text-align":"center"}},[t._v(t._s(t.msg))]):t._e()],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:t.login}},[t._v("Login")])],1)],1)],1)},Y=[],J={name:"Login",props:["isAuth"],data:function(){return{loginMethods:["Eigene Datenbank","LDAP Server"],loginMethod:"Eigene Datenbank",showLdapServer:!1,ldapServer:"",username:"",password:"",msg:""}},methods:{login:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){var e,a,r,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e="login",a={username:this.username,password:this.password},"LDAP Server"===this.loginMethod&&(a.ldapServer=this.ldapServer,e="ldaplogin"),t.prev=3,t.next=6,j.a.post("/api/user/"+e,a).then((function(t){return t.data}));case 6:r=t.sent,this.msg=r.msg,s=r.token,n=r.user,this.$store.dispatch("login",{token:s,user:n}),this.$router.push("/"),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](3),this.msg="Username or password is incorrect";case 17:case"end":return t.stop()}}),t,this,[[3,14]])})));function e(){return t.apply(this,arguments)}return e}(),changeMethod:function(t){this.showLdapServer="Eigene Datenbank"!==t}}},G=J,Q=a("b974"),X=Object(l["a"])(G,K,Y,!1,null,null,null),Z=X.exports;u()(X,{VBtn:E["a"],VCard:L["a"],VCardActions:B["a"],VCardText:B["b"],VCol:p["a"],VForm:z["a"],VSelect:Q["a"],VSpacer:F["a"],VTextField:M["a"],VToolbar:N["a"],VToolbarTitle:q["a"]});var tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.records,"items-per-page":10},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Aufgabenliste")]),a("div",{staticClass:"flex-grow-1"}),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},r),[t._v("Neue Aufgabe")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{"prepend-icon":"mdi-calendar-text",label:"Bezeichung"},model:{value:t.editedItem.text,callback:function(e){t.$set(t.editedItem,"text",e)},expression:"editedItem.text"}}),a("v-select",{attrs:{"prepend-icon":"mdi-account",items:t.owners,"item-text":"fullname",label:"Besitzer"},model:{value:t.editedItem.userfull,callback:function(e){t.$set(t.editedItem,"userfull",e)},expression:"editedItem.userfull"}}),a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.datePicked,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(e){t.datePicked=e},"update:return-value":function(e){t.datePicked=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-text-field",t._g({attrs:{label:"Startdatum","prepend-icon":"mdi-calendar-today",readonly:""},model:{value:t.editedItem.startdate,callback:function(e){t.$set(t.editedItem,"startdate",e)},expression:"editedItem.startdate"}},r))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",scrollable:""},model:{value:t.editedItem.startdate,callback:function(e){t.$set(t.editedItem,"startdate",e)},expression:"editedItem.startdate"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v("Cancel")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.datePicked)}}},[t._v("OK")])],1)],1),a("v-menu",{ref:"menu2",attrs:{"close-on-content-click":!1,"return-value":t.datePicked,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(e){t.datePicked=e},"update:return-value":function(e){t.datePicked=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-text-field",t._g({attrs:{label:"Fälligkeitsdatum","prepend-icon":"mdi-calendar",readonly:""},model:{value:t.editedItem.duedate,callback:function(e){t.$set(t.editedItem,"duedate",e)},expression:"editedItem.duedate"}},r))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[a("v-date-picker",{attrs:{"no-title":"",scrollable:""},model:{value:t.editedItem.duedate,callback:function(e){t.$set(t.editedItem,"duedate",e)},expression:"editedItem.duedate"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu2=!1}}},[t._v("Cancel")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu2.save(t.datePicked)}}},[t._v("OK")])],1)],1),a("v-select",{attrs:{"prepend-icon":"mdi-priority-high",items:t.priorities,"item-text":"priority",label:"Priorität"},model:{value:t.editedItem.priority,callback:function(e){t.$set(t.editedItem,"priority",e)},expression:"editedItem.priority"}}),a("v-select",{attrs:{"prepend-icon":"mdi-check",items:t.states,"item-text":"status",label:"Status"},model:{value:t.editedItem.status,callback:function(e){t.$set(t.editedItem,"status",e)},expression:"editedItem.status"}})],1)],1)],1)],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("Save")])],1)],1)],1)],1)]},proxy:!0},{key:"item",fn:function(e){return[a("tr",[a("td",{staticClass:"text-start"},["erledigt"!==e.item.status?a("v-icon",{attrs:{small:""},on:{click:function(a){return t.toggleItem(e.item)}}},[t._v("mdi-checkbox-blank-outline")]):a("v-icon",{attrs:{small:""},on:{click:function(a){return t.toggleItem(e.item)}}},[t._v("mdi-checkbox-marked-outline")])],1),a("td",{staticClass:"text-start",style:t.style(e.item)},[t._v(t._s(e.item.text))]),a("td",{staticClass:"text-start",style:t.style(e.item)},[t._v(t._s(t.formatDate(e.item.startdate)))]),a("td",{staticClass:"text-start",style:t.style(e.item)},[t._v(t._s(t.formatDate(e.item.duedate)))]),a("td",{staticClass:"text-start",style:t.style(e.item)},[t._v(t._s(e.item.priority))]),a("td",{staticClass:"text-start",style:t.style(e.item)},[t._v(t._s(e.item.userfull))]),a("td",{staticClass:"text-start",style:t.style(e.item)},[t._v(t._s(e.item.status))]),a("td",{staticClass:"text-start"},[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(a){return t.editItem(e.item)}}},[t._v("mdi-pencil")]),a("v-icon",{attrs:{small:""},on:{click:function(a){return t.deleteItem(e.item)}}},[t._v("mdi-delete")])],1)])]}},{key:"no-data",fn:function(){return[a("p",[t._v("You don't have any tasks or there is no connection to database!")])]},proxy:!0}])})],1)},et=[],at=(a("7db0"),a("c975"),a("a434"),a("0d03"),{props:["isAuth","username","fullname","role"],name:"Tasks",data:function(){return{headers:[{text:"Erledigt",value:"status"},{text:"Task",value:"text"},{text:"Start",value:"startdate"},{text:"Fälligkeit",value:"duedate"},{text:"Priorität",value:"priority"},{text:"Besitzer",value:"userfull"},{text:"Status",value:"status"},{text:"Actions",value:"action",sortable:!1}],records:[],menu:"",menu2:"",datePicked:"",dialog:!1,editedIndex:-1,editedId:-1,editedItem:{},defaultItem:{},priorities:[],states:[],owners:[],currentUser:""}},computed:{formTitle:function(){return-1===this.editedIndex?"Neue Aufgabe":"Aufgabe editieren"}},watch:{dialog:function(t){t||this.close()}},created:function(){this.init()},methods:{init:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.defaultItem={userfull:this.fullname,startdate:this.formatDate(new Date),duedate:this.formatDate(new Date),priority:"normal",status:"nicht begonnen"},this.editedItem=Object.assign({},this.defaultItem),t.next=3,j.a.get("/api/task/priority").then((function(t){return t.data}));case 3:return this.priorities=t.sent,t.next=6,j.a.get("/api/task/state").then((function(t){return t.data}));case 6:return this.states=t.sent,t.next=9,j.a.get("/api/user").then((function(t){return t.data}));case 9:if(this.owners=t.sent,this.currentUser=this.owners.find((function(t){return t.username===e.username})),void 0===this.currentUser){t.next=15;break}return t.next=14,j.a.get("/api/task/getByUser/".concat(this.currentUser.id)).then((function(t){return t.data}));case 14:this.records=t.sent;case 15:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),toggleItem:function(t){var e=this.records.indexOf(t),a=this.records[e].status;a="erledigt"===a?"in Bearbeitung":"erledigt",t.id?(j.a.put("/api/task/".concat(t.id),{status:a}),this.records[e].status=a):alert("ID missing, cannot toggle")},editItem:function(t){t.startdate=this.formatDate(t.startdate),t.duedate=this.formatDate(t.duedate),this.editedIndex=this.records.indexOf(t),this.editedId=t.id,this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){var e=this.records.indexOf(t);confirm("Are you sure you want to delete this item?")&&(this.records.splice(e,1),j.a.delete("/api/task/".concat(t.id)))},save:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.editedItem.kuser=this.owners.find((function(t){return t.fullname===a.editedItem.userfull})).id,!(this.editedIndex>-1)){t.next=10;break}return delete this.editedItem.userfirst,delete this.editedItem.userlast,t.next=6,j.a.put("/api/task/".concat(this.editedId),this.editedItem).then((function(t){return t.data}));case 6:e=t.sent,e.code?alert(e.sqlMessage):this.currentUser.fullname===this.editedItem.userfull||"admin"===this.role?Object.assign(this.records[this.editedIndex],this.editedItem):(this.records.splice(this.editedIndex,1),alert("Aufgabe wurde "+this.editedItem.userfull+" zugewiesen.")),t.next=14;break;case 10:return t.next=12,j.a.post("/api/task",this.editedItem).then((function(t){return t.data[0]}));case 12:this.editedItem.id=t.sent,this.currentUser.fullname===this.editedItem.userfull||"admin"===this.role?this.records.push(this.editedItem):alert("Aufgabe wurde "+this.editedItem.userfull+" zugewiesen.");case 14:this.close();case 15:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),close:function(){var t=this;this.dialog=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},style:function(t){return"erledigt"===t.status?"text-decoration:line-through":""},formatDate:function(t){if(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()}return null}}}),rt=at,st=a("8fea"),nt=a("2e4b"),it=a("169a"),ot=a("132d"),lt=a("e449"),ct=Object(l["a"])(rt,tt,et,!1,null,null,null),ut=ct.exports;u()(ct,{VBtn:E["a"],VCard:L["a"],VCardActions:B["a"],VCardText:B["b"],VCardTitle:B["c"],VCol:p["a"],VContainer:v["a"],VDataTable:st["a"],VDatePicker:nt["a"],VDialog:it["a"],VFlex:C["a"],VIcon:ot["a"],VMenu:lt["a"],VRow:g["a"],VSelect:Q["a"],VSpacer:F["a"],VTextField:M["a"],VToolbar:N["a"],VToolbarTitle:q["a"]});var dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",[a("h2",[t._v("Benutzerprofil")]),a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Bezeichnung")]),a("th",{staticClass:"text-left"},[t._v("Wert")]),a("th",{staticClass:"text-left"},[t._v("Aktion")])])]),a("tbody",[a("tr",[a("td",[t._v("Benutzername:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.username))])]),a("tr",[a("td",[t._v("Name:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.name))])]),a("tr",[a("td",[t._v("Rolle:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.role))])]),a("tr",[a("td",[t._v("Benutzer ID:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.id))])]),a("tr",[a("td",[t._v("Passwort Hash:")]),a("td",[t._v(t._s(t.password))]),a("td",[a("router-link",{attrs:{to:"/passwd"}},[t._v("Passwort ändern")])],1)]),a("tr",[a("td",[t._v("Registriert:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.formatDate(t.registered)))])]),a("tr",[a("td",[t._v("Letztes Login:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.formatDate(t.lastlogin)))])]),a("tr",[a("td",[t._v("Token Header:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.tokenHeader))])]),a("tr",[a("td",[t._v("Token Payload:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.tokenPayload))])]),a("tr",[a("td",[t._v("Token Signature:")]),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.tokenSignature))])]),a("tr",[a("td",[t._v("Token:")]),a("td",{attrs:{colspan:"2"}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.token,expression:"token"}],staticStyle:{resize:"none"},attrs:{readonly:"",disabled:"",rows:"2",cols:"100"},domProps:{value:t.token},on:{input:function(e){e.target.composing||(t.token=e.target.value)}}})])]),a("tr",[a("td",[t._v("Signature Verificaion:")]),a("td",{style:t.style(),attrs:{colspan:"2"}},[t._v(t._s(t.signature))])])])]},proxy:!0}])}),a("v-row",{staticStyle:{"margin-top":"10px"},attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4",align:"center"}},[t.isAuth?a("v-card",{staticClass:"elevation-12"},[a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"Secret",type:"text"},model:{value:t.secret,callback:function(e){t.secret=e},expression:"secret"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:t.verify}},[t._v("Verify")])],1)],1):t._e()],1)],1)],1)},mt=[],pt=a("bc83"),vt=pt["a"],ft=a("1f4f"),ht=Object(l["a"])(vt,dt,mt,!1,null,null,null),gt=ht.exports;u()(ht,{VBtn:E["a"],VCard:L["a"],VCardActions:B["a"],VCardText:B["b"],VCol:p["a"],VFlex:C["a"],VForm:z["a"],VRow:g["a"],VSimpleTable:ft["a"],VSpacer:F["a"],VTextField:M["a"]});var _t=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",[a("h2",[t._v("Benutzerverwaltung")]),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.records,"items-per-page":10},scopedSlots:t._u([{key:"item",fn:function(e){return[a("tr",[a("td",{staticClass:"text-start"},[t._v(t._s(e.item.username))]),a("td",{staticClass:"text-start"},[t._v(t._s(e.item.role))]),a("td",{staticClass:"text-start"},[t._v(t._s(e.item.fullname))]),a("td",{staticClass:"text-start"},[t._v(t._s(t.formatDate(e.item.registered)))]),a("td",{staticClass:"text-start"},[t._v(t._s(t.formatDate(e.item.lastlogin)))]),a("td",{staticClass:"text-start"},[a("v-icon",{attrs:{small:""},on:{click:function(a){return t.deleteItem(e.item)}}},[t._v("mdi-delete")])],1)])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:t.init}},[t._v("Reload")])]},proxy:!0}])})],1)},xt=[],bt={props:["username"],name:"Users",data:function(){return{headers:[{text:"Benutzername",value:"username"},{text:"Rolle",value:"role"},{text:"Name",value:"fullname"},{text:"Registriert",value:"registered"},{text:"Letztes Login",value:"lastlogin"},{text:"Actions",value:"action",sortable:!1}],records:[]}},created:function(){this.init()},methods:{init:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,j.a.get("/api/user");case 2:this.records=t.sent,this.records=this.records.data;case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),deleteItem:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(e){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.username!=this.username){t.next=2;break}return t.abrupt("return",alert("This is your active account. Won't delete it!"));case 2:if(a=this.records.indexOf(e),!confirm("Are you sure you want to delete this item?")){t.next=8;break}return t.next=6,j.a.delete("/api/user/".concat(e.id)).then((function(t){return t.data}));case 6:r=t.sent,1==r?this.records.splice(a,1):alert(r.sqlMessage);case 8:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),formatDate:function(t){if(t){var e=new Date(t);return e.toLocaleString()}return null}}},kt=bt,wt=Object(l["a"])(kt,_t,xt,!1,null,null,null),yt=wt.exports;u()(wt,{VBtn:E["a"],VDataTable:st["a"],VFlex:C["a"],VIcon:ot["a"]});var Vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[t.isAuth?a("div",[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("Passwort ändern")])],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"Aktuelles Passwort",name:"password","prepend-icon":"mdi-lock",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),a("v-text-field",{attrs:{id:"newPassword",label:"Neues Password",name:"newPassword","prepend-icon":"mdi-lock",type:"password"},model:{value:t.newPassword,callback:function(e){t.newPassword=e},expression:"newPassword"}}),a("v-text-field",{attrs:{id:"newPasswordRepeat",label:"Neues Passwort",name:"newPasswordRepeat","prepend-icon":"mdi-lock",type:"password"},model:{value:t.newPasswordRepeat,callback:function(e){t.newPasswordRepeat=e},expression:"newPasswordRepeat"}}),t.msg?a("p",{staticStyle:{color:"red","text-align":"center"}},[t._v(t._s(t.msg))]):t._e()],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:t.passwd}},[t._v("ändern")])],1)],1)],1):t._e()])},It=[],St={name:"Password",props:["isAuth"],data:function(){return{id:"",username:"",password:"",newPassword:"",newPasswordRepeat:"",msg:""}},mounted:function(){this.$store.getters.isLoggedIn&&(this.id=this.$store.getters.getUser.id,this.username=this.$store.getters.getUser.username)},methods:{passwd:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){var e,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e={username:this.username,password:this.password,newPassword:this.newPassword,newPasswordRepeat:this.newPasswordRepeat},t.next=4,j.a.put("/api/user/".concat(this.id),e).then((function(t){return t.data}));case 4:a=t.sent,this.msg=a.msg,this.$store.dispatch("logout"),this.$router.push("/login"),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),this.msg="Cannot change password!";case 13:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(){return t.apply(this,arguments)}return e}()}},Ct=St,Pt=Object(l["a"])(Ct,Vt,It,!1,null,null,null),At=Pt.exports;u()(Pt,{VBtn:E["a"],VCard:L["a"],VCardActions:B["a"],VCardText:B["b"],VCol:p["a"],VForm:z["a"],VSpacer:F["a"],VTextField:M["a"],VToolbar:N["a"],VToolbarTitle:q["a"]});var Tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",[a("h2",[t._v("System")]),a("h3",[t._v("Webserver")]),a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Bezeichnung")]),a("th",{staticClass:"text-left"},[t._v("Wert")])])]),a("tbody",[a("tr",[a("td",[t._v("Hostname / Uptime:")]),a("td",[t._v(t._s(t.hostname)+" / "+t._s((t.uptime/3600).toFixed(2))+" Stunden")])]),a("tr",[a("td",[t._v("Anzahl CPUs x Typ:")]),a("td",[t._v(t._s(t.numberOfCpus)+" x "+t._s(t.cpu))])]),a("tr",[a("td",[t._v("OS Typ / Plattform / RAM")]),a("td",[t._v(t._s(t.osType)+" / "+t._s(t.platform)+" / "+t._s(t.totalmem/1e9+" GB"))])]),t._l(Object.keys(t.networkInterfaces),(function(e,r){return a("tr",{key:r},[a("td",[t._v(t._s(e)+":")]),a("td",[t._v(t._s(t.networkInterfaces[e][1]))])])})),a("tr",[a("td",[t._v("Server Umgebungsvariable PORT:")]),a("td",[t._v(t._s(t.serverEnvPort))])])],2)]},proxy:!0}])}),a("h3",[t._v("Datenbank-Server")]),a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Bezeichnung")]),a("th",{staticClass:"text-left"},[t._v("Wert")])])]),a("tbody",[a("tr",[a("td",[t._v("Datenbank Engine:")]),a("td",[t._v(t._s(t.dbEngine))])]),a("tr",[a("td",[t._v("Datenbank:")]),a("td",[t._v(t._s(t.database))])]),a("tr",[a("td",[t._v("Datenbank-URL:")]),a("td",[t._v(t._s(t.databaseURL))])])])]},proxy:!0}])})],1)},Ot=[],Rt=(a("ac1f"),a("1276"),{props:["isAuth","username"],data:function(){return{system:"",dbEngine:"",database:"",databaseURL:"",serverEnvPort:"",hostname:"",cpu:"",numberOfCpus:"",totalmem:"",osType:"",platform:"",uptime:"",networkInterfaces:""}},created:function(){this.init()},methods:{init:function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,j.a.get("/api/system").then((function(t){return t.data}));case 2:this.system=t.sent,this.dbEngine=this.system.knexconf.client,this.database=this.system.knexconf.connection.split("@")[1].split("/")[1],this.databaseURL=this.system.knexconf.connection,this.serverEnvPort=this.system.serverEnv.PORT,this.hostname=this.system.hostname,this.cpu=this.system.cpus[0].model,this.numberOfCpus=this.system.cpus.length,this.totalmem=this.system.totalmem,this.osType=this.system.osType,this.platform=this.system.platform,this.uptime=this.system.uptime,this.networkInterfaces=this.system.networkInterfaces;case 15:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}}),$t=Rt,jt=Object(l["a"])($t,Tt,Ot,!1,null,null,null),Dt=jt.exports;u()(jt,{VFlex:C["a"],VSimpleTable:ft["a"]});var Ut=a("2f62"),Et=a("0e44");r["a"].use(Ut["a"]);var Lt=function(){return{token:"",user:{}}},Bt=new Ut["a"].Store({strict:!0,plugins:[Object(Et["a"])()],state:Lt(),getters:{isLoggedIn:function(t){return t.token},getUser:function(t){return t.user}},mutations:{SET_TOKEN:function(t,e){t.token=e},SET_USER:function(t,e){t.user=e},RESET:function(t){Object.assign(t,Lt())}},actions:{login:function(t,e){var a=t.commit,r=e.token,s=e.user;a("SET_TOKEN",r),a("SET_USER",s),j.a.defaults.headers.common["Authorization"]="Bearer ".concat(r)},logout:function(t){var e=t.commit;e("RESET",""),j.a.defaults.headers.common["Authorization"]=""}}});r["a"].use(w["a"]);var zt=new w["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:A},{path:"/register",name:"register",component:W},{path:"/login",name:"login",component:Z},{path:"/tasks",name:"tasks",component:ut,meta:{requiresAuth:!0}},{path:"/users",name:"users",component:yt,meta:{requiresAuth:!0}},{path:"/profile",name:"profile",component:gt,meta:{requiresAuth:!0}},{path:"/passwd",name:"passwd",component:At,meta:{requiresAuth:!0}},{path:"/system",name:"system",component:Dt,meta:{requiresAuth:!0}}]});zt.beforeEach((function(t,e,a){t.matched.some((function(t){return t.meta.requiresAuth}))?Bt.getters.isLoggedIn?a():a({path:"/login",query:{redirect:t.fullPath}}):a()}));var Ft=zt;r["a"].config.productionTip=!1,j.a.defaults.headers.common["Authorization"]="Bearer ".concat(Bt.state.token),new r["a"]({vuetify:k,router:Ft,store:Bt,render:function(t){return t(x)}}).$mount("#app")},bc83:function(t,e,a){"use strict";(function(t){a("0d03"),a("b0c0"),a("d3b7"),a("ac1f"),a("25f0"),a("5319"),a("1276");e["a"]={props:["isAuth","username"],data:function(){return{id:"",name:"",role:"",password:"",registered:"",lastlogin:"",token:"",tokenParts:"",tokenHeader:"",tokenPayload:"",tokenSignature:"",signature:"",secret:""}},created:function(){this.token=this.$store.getters.isLoggedIn,this.token&&(this.id=this.$store.getters.getUser.id,this.name=this.$store.getters.getUser.fullname,this.role=this.$store.getters.getUser.role,this.password=this.$store.getters.getUser.password,this.registered=this.$store.getters.getUser.registered,this.lastlogin=this.$store.getters.getUser.lastlogin,this.tokenParts=this.token.split("."),this.tokenHeader=new t(this.tokenParts[0],"base64").toString(),this.tokenPayload=new t(this.tokenParts[1],"base64").toString(),this.tokenSignature=this.tokenParts[2])},methods:{formatDate:function(t){if(t){var e=new Date(t);return e.toLocaleString()}return null},calculateSignature:function(){var t=a("1c46");this.secret?this.signature=t.createHmac("sha256",this.secret).update(this.tokenParts[0]+"."+this.tokenParts[1]).digest("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""):this.signature=""},verify:function(){return this.calculateSignature(),this.tokenSignature===this.signature},style:function(){return this.verify()?"color:green":"color:red"}}}}).call(this,a("b639").Buffer)}});
//# sourceMappingURL=app.8e040bf0.js.map