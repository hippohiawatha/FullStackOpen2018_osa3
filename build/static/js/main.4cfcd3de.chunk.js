(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(42)},40:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(10),u=n.n(s),o=n(2),l=n.n(o),i=n(11),c=n(12),m=n(14),d=n(13),p=n(15),f=function(e){var t=e.state.persons,n=e.state.search;return 0!==t.length?r.a.createElement("table",null,r.a.createElement("tbody",null,t.filter(function(e){return e.name.toLowerCase().includes(n.toLowerCase())}).map(function(t){return r.a.createElement("tr",{key:t.id},r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:e.remover(t.id,t.name)},"poista")))}))):r.a.createElement("p",null,"luettelossa ei ole tietoja")},h="/api/persons",v={getAll:function(){return l.a.get(h)},create:function(e){return l.a.post(h,e)},update:function(e,t){return l.a.put("".concat(h,"/").concat(e),t).then(function(e){return e.data})},remove:function(e){return l.a.delete("".concat(h,"/").concat(e))}},E=(n(40),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).addPerson=function(e){e.preventDefault();var t={name:n.state.newName,number:n.state.newNum},a=t.name,r=n.state.persons;if(r.map(function(e){return e.name}).includes(t.name)){var s=n.state.persons.findIndex(function(e){return e.name===t.name}),u=n.state.persons[s].id;window.confirm(n.state.persons[s].name+" on jo luettelossa, korvataanko vanha numero uudella?")&&v.update(u,t).then(function(e){console.log(e.id);var t=n.state.persons.filter(function(e){return e.id!==u});n.setState({persons:t.concat(e),newName:"",newNum:"",message:"Henkil\xf6n "+n.state.persons[s].name+" numero vaihdettiin"}),setTimeout(function(){return n.setState({message:null})},5e3)})}else v.create(t).then(function(e){n.setState({persons:r.concat(e.data),newName:"",newNum:"",message:"Lis\xe4ttiin "+a}),setTimeout(function(){return n.setState({message:null})},5e3)})},n.inputName=function(e){n.setState({newName:e.target.value})},n.inputNum=function(e){n.setState({newNum:e.target.value})},n.search=function(e){n.setState({search:e.target.value})},n.remover=function(e,t){return function(){window.confirm("poistetaanko "+t)&&v.remove(e).then(function(a){n.setState({persons:n.state.persons.filter(function(t){return t.id!==e}),message:"Poistettiin "+t}),setTimeout(function(){return n.setState({message:null})},5e3)})}},n.state={persons:[],newName:"",newNum:"",search:"",message:null},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("did mount"),v.getAll().then(function(t){e.setState({persons:t.data})}).catch(function(e){alert("ei dataa")})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(g,{message:this.state.message}),r.a.createElement("div",null,"search: ",r.a.createElement("input",{value:this.state.search,onChange:this.search})),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement("form",{onSubmit:this.addPerson},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:this.state.newName,onChange:this.inputName})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:this.state.newNum,onChange:this.inputNum})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))),r.a.createElement("h2",null,"Numerot"),r.a.createElement("div",null,r.a.createElement(f,{state:this.state,remover:this.remover})))}}]),t}(r.a.Component)),g=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)};u.a.render(r.a.createElement(E,null),document.getElementById("root"));var w=l.a.get("http://localhost:3001/api/persons");console.log(w)}},[[16,2,1]]]);
//# sourceMappingURL=main.4cfcd3de.chunk.js.map