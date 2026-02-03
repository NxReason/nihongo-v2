import{t as d,i as g,b as o,a as m,n as y}from"./icon-4fV2LZ1R.js";import{r as l,f as x}from"./page-controls-C1tCuqVS.js";import{k,c as _,K as O,t as E,A as D}from"./anki-base-Dirfiutj.js";var T=Object.defineProperty,P=Object.getOwnPropertyDescriptor,j=(e,t,s,r)=>{for(var i=r>1?void 0:r?P(t,s):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(i=(r?a(t,s,i):a(i))||i);return r&&i&&T(t,s,i),i};let p=class extends g{constructor(){super(),this.WINDOW="exercises",this.LOAD_STATE="loading",this.kanjiSelected=null,this.kanjiList=[],this.addEventListener("kanji-selected",e=>{this.kanjiSelected=e.detail.kanji,this.WINDOW="form"}),this.addEventListener("kanji-created",e=>{this.addKanji(e.detail.kanji)}),this.addEventListener("kanji-updated",e=>{const t=e.detail.kanji.id,s=this.kanjiList.findIndex(r=>r.id===t);if(s<0){console.error(`Can't update kanji with id: ${t}`);return}this.kanjiList[s]=e.detail.kanji}),this.addEventListener("kanji-removed",e=>{this.deleteKanji(e.detail.kanji)}),this.addEventListener("goto-new-form",()=>{this.kanjiSelected=null,this.WINDOW="form"}),this.addEventListener("goto-list",()=>{this.WINDOW="list"})}connectedCallback(){super.connectedCallback(),this.loadData()}async loadData(){try{const e=await k.all();this.kanjiList=e,this.LOAD_STATE="success"}catch(e){console.error(e),this.LOAD_STATE="error"}}async addKanji(e){this.kanjiList.push(e)}async deleteKanji(e){const t=await k.remove(e.id);t.state==="success"?this.kanjiList=this.kanjiList.filter(s=>s.id!==t.kanji.id):console.log("some error")}render(){switch(this.LOAD_STATE){case"loading":return o`<h2>Loading...</h2>`;case"error":return o`<h2>Error loading kanji</h2>`;case"success":return this.renderContent();default:throw new Error("Unhandled kanji loading error")}}renderContent(){switch(this.WINDOW){case"list":return o`<kanji-list .kanjiList=${this.kanjiList}></kanji-list>`;case"form":return o`<kanji-form .kanji=${this.kanjiSelected}></kanji-form>`;case"exercises":return o`<kanji-exercises .kanjiList=${this.kanjiList}></kanji-exercises>`;default:throw new Error("Unhandled kanji controller state")}}};j([l()],p.prototype,"WINDOW",2);j([l()],p.prototype,"LOAD_STATE",2);j([l()],p.prototype,"kanjiSelected",2);j([l()],p.prototype,"kanjiList",2);p=j([d("kanji-controller")],p);var A=Object.defineProperty,C=Object.getOwnPropertyDescriptor,L=(e,t,s,r)=>{for(var i=r>1?void 0:r?C(t,s):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(i=(r?a(t,s,i):a(i))||i);return r&&i&&A(t,s,i),i};let f=class extends g{constructor(){super(...arguments),this.kanjiList=[]}render(){return o`
        <ul>
        ${this.kanjiList.map(e=>o`
            <kanji-card
                .kanji=${e}
            </kanji-card> `)}
        </ul>
        <page-controls></page-controls>`}};f.styles=m`
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 1rem;
        padding: 0;
        margin: 0;
    }`;L([y()],f.prototype,"kanjiList",2);f=L([d("kanji-list")],f);var S=Object.defineProperty,K=Object.getOwnPropertyDescriptor,$=(e,t,s,r)=>{for(var i=r>1?void 0:r?K(t,s):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(i=(r?a(t,s,i):a(i))||i);return r&&i&&S(t,s,i),i};let v=class extends g{constructor(){super(),this.addEventListener("click",this.handleHostClick)}handleHostClick(){const e={detail:{kanji:this.kanji},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("kanji-selected",e))}handleDelete(e){e.stopPropagation();const t={detail:{kanji:this.kanji},bubble:!0,composed:!0},s=new CustomEvent("kanji-removed",t);this.dispatchEvent(s)}render(){return o`
        <h2>${this.kanji.glyph}</h2>
        ${this.makeReadingsList("Kun",this.kanji.kunReadings)}
        ${this.makeReadingsList("On",this.kanji.onReadings)}
        ${this.makeMeaningsList()}
        <nx-icon fileName="delete1" @click=${this.handleDelete}></nx-icon>
        `}makeReadingsList(e,t){return o`
        <div class="${e.toLowerCase()} readings">
            <span>${e.toUpperCase()}</span>
            <p>${t.join(", ")}</p>
        </div>
        `}makeMeaningsList(){return o`
        <p class="meanings">
            ${this.kanji.meanings.join(", ")}
        </p>
        `}};v.styles=m`
    :host {
        display: grid;
        grid-template-rows: 2rem 2rem 1fr;
        grid-template-columns: 30% 1fr;
        grid-template-areas:
            'glyph kun'
            'glyph on'
            'meanings meanings';
        gap: .5rem;
        padding: .5rem;
        position: relative;
        border: 1px solid var(--primary-color);
        border-radius: 0 0 2rem;
        transition: box-shadow .1s ease-in;
    }
    :host(:hover) {
        cursor: pointer;
        box-shadow: 2px 2px 2px var(--tertiary-color);
    }
    .kun { grid-area: kun; }
    .on { grid-area: on; }
    .meanings { grid-area: meanings; }
    h2 {
        grid-area: glyph;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4rem;
        line-height: 4rem;
        margin: 0; padding: 0;
    }
    .readings {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    .readings span {
        display: inline-block;
        padding: .2rem .4rem;
        border-radius: .5rem;
        background-color: var(--secondary-color);
    }
    .meanings {
        padding-left: 1rem;
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
    `;$([y()],v.prototype,"kanji",2);v=$([d("kanji-card")],v);var R=Object.defineProperty,I=Object.getOwnPropertyDescriptor,b=(e,t,s,r)=>{for(var i=r>1?void 0:r?I(t,s):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(i=(r?a(t,s,i):a(i))||i);return r&&i&&R(t,s,i),i};let c=class extends g{constructor(){super(...arguments),this.kanji=null,this.glyph="",this.isLoading=!1}firstUpdated(){this.glyph=this.kanji?.glyph??""}async handleSubmit(e){if(e.preventDefault(),this.isLoading)return;this.isLoading=!0;const[t,s,r]=this.shadowRoot?.querySelectorAll("list-input"),i=new O;i.id=this.kanji?.id,i.glyph=this.glyph,i.kunReadings=t.collectValues(),i.onReadings=s.collectValues(),i.meanings=r.collectValues(),this.kanji?.id?await this.updateKanji(i):await this.saveKanji(i),this.isLoading=!1}async saveKanji(e){const t=await k.create(e);switch(t.state){case"success":{const s={detail:{kanji:t.kanji},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("kanji-created",s)),this.clearInputs()}break;case"errorDev":{console.log(t.msg);break}case"errorUser":{console.log(t.detail);break}}}async updateKanji(e){const t=await k.update(e);switch(t.state){case"success":{const s={detail:{kanji:t.kanji},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("kanji-updated",s))}break;case"errorDev":{console.log(t.msg);break}case"errorUser":{console.log(t.detail);break}}}clearInputs(){this.glyph="";const[e,t,s]=this.shadowRoot?.querySelectorAll("list-input");e.value="",t.value="",s.value=""}handleGlyphInput(e){const t=e.target;this.glyph=t.value}render(){let e=this.kanji?"Update":"Create";return this.isLoading&&(e="Loading..."),o`
        <form @submit=${this.handleSubmit}>
            <div class="form-field glyph-wrapper ${this.glyph===""?"":"filled"}">
                <input
                    class="glyph-input"
                    type="text"
                    @input=${this.handleGlyphInput}
                    .value=${this.glyph} />
            </div>
            <list-input label="Kun" .initialValue=${this.kanji?.kunReadings??[]}></list-input>
            <list-input label="On" .initialValue=${this.kanji?.onReadings??[]}></list-input>
            <list-input label="Meanings" .initialValue=${this.kanji?.meanings??[]}></list-input>
            <div class="form-controls">
                <button ?disabled=${this.isLoading}>${e}</button>
            </div>
        </form>
        <page-controls></page-controls>
        `}};c.styles=[x,_,m`
        input.glyph-input {
            width: 6rem; height: 5rem;
            font-size: 4rem; line-height: 4rem;
            text-align: center;
            padding: .5rem;
            padding-bottom: 1rem;
        }
        .form-field {
            position: relative;
        }
        .glyph-wrapper::before,
        .glyph-wrapper::after,
        .form-field label {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        .glyph-wrapper::before {
            content: 'Glyph';
            left: 2rem;
            top: 1.4rem;
            transition: all .1s ease-in;
        }
        .glyph-wrapper::after {
            content: '月';
            font-size: 4rem;
            top: 1.6rem;
            left: 1.5rem;
        }
        .glyph-wrapper:focus-within::after {
            content: '';
        }
        .glyph-wrapper:focus-within::before,
        .filled.glyph-wrapper::before {
            top: .3rem;
            display: inline-block;
            padding: 0 .5rem;
            background-color: var(--component-color);
            left: .3rem;
            opacity: 1;
        }
        .filled::after { content: '' }
        .form-controls {
            margin-top: .4rem;
        }
        button {
            width: 10rem;
        }`];b([y()],c.prototype,"kanji",2);b([l()],c.prototype,"glyph",2);b([l()],c.prototype,"isLoading",2);c=b([d("kanji-form")],c);var W=Object.defineProperty,U=Object.getOwnPropertyDescriptor,w=(e,t,s,r)=>{for(var i=r>1?void 0:r?U(t,s):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(i=(r?a(t,s,i):a(i))||i);return r&&i&&W(t,s,i),i};let u=class extends g{constructor(){super(),this.kanjiList=[],this.STATE="ex-picker",this.addEventListener("ex-anki-complete",()=>{this.STATE="ex-picker"})}render(){let e;switch(this.STATE){case"ex-picker":e=this.makeExerciseList();break;case"anki":{const t=this.takeRandomKanji(10);e=o`<anki-kanji .items=${t}></anki-kanji>`}break;case"test":e=o`<div>test</div>`;break;default:throw new Error(`Unknown exercise state: ${this.STATE}`)}return o`
        ${e}
        <page-controls></page-controls>
        `}makeExerciseList(){return o`
        <ul class="exercise-list">
            <li @click=${()=>this.STATE="anki"}>Anki</li>
            <li @click=${()=>this.STATE="test"}>Test</li>
        </ul>`}takeRandomKanji(e){return E(this.kanjiList,e)}};u.styles=m`
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
    `;w([y()],u.prototype,"kanjiList",2);w([l()],u.prototype,"STATE",2);u=w([d("kanji-exercises")],u);var z=Object.getOwnPropertyDescriptor,N=Object.getPrototypeOf,V=Reflect.get,G=(e,t,s,r)=>{for(var i=r>1?void 0:r?z(t,s):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(i=a(i)||i);return i},M=(e,t,s)=>V(N(e),s,t);let h=class extends D{makeCard(e){return o`
        <p class="card-glyph">${e.glyph}</p>
        ${this.makeDetail("Kun",e.kunReadings.join(", "))}
        ${this.makeDetail("On",e.onReadings.join(", "))}
        ${this.makeDetail("Meanings",e.meanings.join(", "))}
        `}};h.styles=[...M(h,h,"styles"),m`
        .card-glyph {
            padding: 5rem; margin: 0;
            justify-self: center;
            font-size: 20rem;
            line-height: 20rem;
        }`];h=G([d("anki-kanji")],h);
