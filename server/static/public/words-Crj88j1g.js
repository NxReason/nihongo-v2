import{t as p,i as w,b as n,a as m,n as y}from"./icon-4fV2LZ1R.js";import{r as d,f as O}from"./page-controls-C1tCuqVS.js";import{w as f,c as D,W as E,t as W,A as j}from"./anki-base-Dirfiutj.js";var P=Object.defineProperty,C=Object.getOwnPropertyDescriptor,g=(e,r,s,o)=>{for(var t=o>1?void 0:o?C(r,s):r,i=e.length-1,a;i>=0;i--)(a=e[i])&&(t=(o?a(r,s,t):a(t))||t);return o&&t&&P(r,s,t),t};let c=class extends w{constructor(){super(),this.WINDOW="exercises",this.LOAD="loading",this.wordsList=[],this.wordSelected=null,this.addEventListener("word-selected",e=>{this.wordSelected=e.detail.word,this.WINDOW="form"}),this.addEventListener("word-created",e=>{this.wordsList.push(e.detail.word)}),this.addEventListener("word-updated",e=>{const r=e.detail.word.id,s=this.wordsList.findIndex(o=>o.id===r);if(s<0){console.error(`Can't update word with id: ${r}`);return}this.wordsList[s]=e.detail.word}),this.addEventListener("word-removed",e=>{this.deleteWord(e.detail.word)}),this.addEventListener("goto-new-form",()=>{this.wordSelected=null,this.WINDOW="form"}),this.addEventListener("goto-list",()=>{this.WINDOW="list"})}connectedCallback(){super.connectedCallback(),this.loadData()}async loadData(){try{const e=await f.all();this.wordsList=e,this.LOAD="success"}catch(e){console.error(e),this.LOAD="error"}}async deleteWord(e){const r=await f.remove(e.id);r.state==="success"?this.wordsList=this.wordsList.filter(s=>s.id!==r.word.id):console.log("some error")}render(){switch(this.LOAD){case"loading":return n`<h2>Loading...</h2>`;case"error":return n`<h2>Error loading words</h2>`;case"success":return this.renderContent();default:throw new Error("Unhandled words loading error")}}renderContent(){switch(this.WINDOW){case"list":return n`<words-list .wordsList=${this.wordsList}></words-list>`;case"exercises":return n`<words-exercises .wordsList=${this.wordsList}></words-exercises>`;case"form":return n`<words-form .word=${this.wordSelected}></words-form>`;default:throw new Error(`Unhandled words controller state ${this.WINDOW}`)}}};g([d()],c.prototype,"WINDOW",2);g([d()],c.prototype,"LOAD",2);g([d()],c.prototype,"wordsList",2);g([d()],c.prototype,"wordSelected",2);c=g([p("words-controller")],c);var k=Object.defineProperty,A=Object.getOwnPropertyDescriptor,$=(e,r,s,o)=>{for(var t=o>1?void 0:o?A(r,s):r,i=e.length-1,a;i>=0;i--)(a=e[i])&&(t=(o?a(r,s,t):a(t))||t);return o&&t&&k(r,s,t),t};let b=class extends w{constructor(){super(...arguments),this.wordsList=[]}render(){return n`
        <ul>
        ${this.wordsList.map(e=>n`
            <word-card
                .word=${e}
            </word-card> `)}
        </ul>
        <page-controls></page-controls>`}};b.styles=m`
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: auto;
        gap: 1rem;
        padding: 0;
        margin: 0;
    }`;$([y()],b.prototype,"wordsList",2);b=$([p("words-list")],b);var S=Object.defineProperty,T=Object.getOwnPropertyDescriptor,_=(e,r,s,o)=>{for(var t=o>1?void 0:o?T(r,s):r,i=e.length-1,a;i>=0;i--)(a=e[i])&&(t=(o?a(r,s,t):a(t))||t);return o&&t&&S(r,s,t),t};let x=class extends w{constructor(){super(),this.addEventListener("click",this.handleHostClick)}handleHostClick(){const e={detail:{word:this.word},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("word-selected",e))}handleDelete(e){e.stopPropagation();const r={detail:{word:this.word},bubble:!0,composed:!0},s=new CustomEvent("word-removed",r);this.dispatchEvent(s)}render(){return n`
        <h2>${this.word.jp} / ${this.word.reading}</h2>
        ${this.makeMeaningsList()}
        <nx-icon fileName="delete1" @click=${this.handleDelete}></nx-icon>
        `}makeMeaningsList(){return n`
        <p class="meanings">
            ${this.word.meanings.join(", ")}
        </p>
        `}};x.styles=m`
    :host {
        display: grid;
        grid-template-rows: minmax(2rem, auto) auto;
        grid-template-areas:
            'jp'
            'meanings';
        gap: .2rem;
        padding: 1rem;
        position: relative;
        border: 1px solid var(--primary-color);
        border-radius: 0 0 2rem;
        transition: box-shadow .1s ease-in;
    }
    :host(:hover) {
        cursor: pointer;
        box-shadow: 2px 2px 2px var(--tertiary-color);
    }
    h2 {
        grid-area: jp;
        font-size: 2rem;
        line-height: 2rem;
        margin: 0; padding: 0;
    }
    .meanings {
        grid-area: meanings;
        margin: 0;
        margin-top: .5rem;
    }
    nx-icon {
        width: 2rem;
        height: 2rem;
        padding: .2rem;
        background-color: var(--primary-color);
        background-size: 1.6rem;
        position: absolute;
        right: -0.4rem;
        top: -0.4rem;
        opacity: 0;
        transition: all .15s ease-in;
    }
    nx-icon:hover {
        background-color: var(--tertiary-color);
    }
    :host(:hover) nx-icon {
        opacity: 1;
    }
    `;_([y()],x.prototype,"word",2);x=_([p("word-card")],x);var I=Object.defineProperty,R=Object.getOwnPropertyDescriptor,v=(e,r,s,o)=>{for(var t=o>1?void 0:o?R(r,s):r,i=e.length-1,a;i>=0;i--)(a=e[i])&&(t=(o?a(r,s,t):a(t))||t);return o&&t&&I(r,s,t),t};let l=class extends w{constructor(){super(...arguments),this.word=null,this.isLoading=!1,this.jp="",this.reading=""}connectedCallback(){super.connectedCallback(),this.jp=this.word?.jp??"",this.reading=this.word?.reading??""}async handleSubmit(e){if(e.preventDefault(),this.isLoading)return;this.isLoading=!0;const[r,s]=this.shadowRoot?.querySelectorAll("text-input"),o=this.shadowRoot?.querySelector("list-input"),t=new E;t.id=this.word?.id,t.jp=r.value,t.reading=s.value,t.meanings=o.collectValues(),this.word?.id?await this.updateWord(t):await this.saveWord(t),this.isLoading=!1}async saveWord(e){const r=await f.create(e);switch(r.state){case"success":{const s={detail:{word:r.word},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("word-created",s)),this.clearInputs()}break;case"errorDev":{console.log(r.msg);break}case"errorUser":{console.log(r.detail);break}}}async updateWord(e){const r=await f.update(e);switch(r.state){case"success":{const s={detail:{word:r.word},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("word-updated",s))}break;case"errorDev":{console.log(r.msg);break}case"errorUser":{console.log(r.detail);break}}}clearInputs(){const[e,r,s]=this.shadowRoot?.querySelectorAll("list-input, text-input");e.value="",r.value="",s.value=""}render(){let e=this.word?"Update":"Create";return this.isLoading&&(e="Loading..."),n`
        <form @submit=${this.handleSubmit}>
            <div class="form-field col-2">
                <div>
                    <text-input name="JP" .value=${this.jp}></text-input>
                </div>
                <div>
                    <text-input name="Reading" .value=${this.reading}></text-input>
                </div>
            </div>
            <list-input label="Meanings" .initialValue=${this.word?.meanings??[]}></list-input>
            <div class="form-controls">
                <button ?disabled=${this.isLoading}>${e}</button>
            </div>
        </form>
        <page-controls></page-controls>
        `}};l.styles=[O,D,m`
        .form-field {
            position: relative;
        }
        .form-field label {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        .form-field.col-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .form-field > div {
            position: relative;
        }
        .form-field text-input {
            display: flex;
        }
        .form-controls {
            margin-top: .4rem;
        }
        button {
            width: 10rem;
        }`];v([y()],l.prototype,"word",2);v([d()],l.prototype,"isLoading",2);v([d()],l.prototype,"jp",2);v([d()],l.prototype,"reading",2);l=v([p("words-form")],l);var N=Object.defineProperty,U=Object.getOwnPropertyDescriptor,L=(e,r,s,o)=>{for(var t=o>1?void 0:o?U(r,s):r,i=e.length-1,a;i>=0;i--)(a=e[i])&&(t=(o?a(r,s,t):a(t))||t);return o&&t&&N(r,s,t),t};let u=class extends w{constructor(){super(),this.wordsList=[],this.STATE="ex-picker",this.addEventListener("ex-anki-complete",()=>{this.STATE="ex-picker"})}render(){let e;switch(this.STATE){case"ex-picker":e=this.makeExerciseList();break;case"anki":{const r=this.takeRandomWords(10);e=n`<anki-words .items=${r}></anki-words>`}break;case"test":e=n`<div>test</div>`;break;default:throw new Error(`Unknown exercise state: ${this.STATE}`)}return n`
        ${e}
        <page-controls></page-controls>
        `}makeExerciseList(){return n`
        <ul class="exercise-list">
            <li @click=${()=>this.STATE="anki"}>Anki</li>
            <li @click=${()=>this.STATE="test"}>Test</li>
        </ul>`}takeRandomWords(e){return W(this.wordsList,e)}};u.styles=m`
    .exercise-list {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: 15rem;
        gap: 1rem;
        margin: 0; padding: 0;

        li {
            border: 2px solid var(--bg-color);
            border-bottom: 3px solid var(--primary-color);
            text-align: center;
            padding-top: 4rem;
            font-size: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: all .15s ease-in;
        }
        li:hover {
            cursor: pointer;
            border-bottom: 3px solid var(--tertiary-color);
            border-radius: 0 3rem 0 0;
        }
    }
    `;L([y()],u.prototype,"wordsList",2);L([d()],u.prototype,"STATE",2);u=L([p("words-exercises")],u);var z=Object.getOwnPropertyDescriptor,M=Object.getPrototypeOf,q=Reflect.get,B=(e,r,s,o)=>{for(var t=o>1?void 0:o?z(r,s):r,i=e.length-1,a;i>=0;i--)(a=e[i])&&(t=a(t)||t);return t},F=(e,r,s)=>q(M(e),s,r);let h=class extends j{makeCard(e){return n`
        <p class="card-word">${e.jp}</p>
        ${this.makeDetail("Reading",e.reading)}
        ${this.makeDetail("Meanings",e.meanings.join(", "))}
        `}};h.styles=[...F(h,h,"styles"),m`
        .card-word {
            padding: 5rem; margin: 0;
            justify-self: center;
            font-size: 10rem;
            line-height: 20rem;
        }
        `];h=B([p("anki-words")],h);
