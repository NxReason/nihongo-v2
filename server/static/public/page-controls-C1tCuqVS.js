import{n as s,a as u,i as d,b as p,t as v}from"./icon-4fV2LZ1R.js";function w(r){return s({...r,state:!0,attribute:!1})}var $=Object.defineProperty,P=Object.getOwnPropertyDescriptor,y=(r,t,a,o)=>{for(var e=o>1?void 0:o?P(t,a):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(e=(o?i(t,a,e):i(e))||e);return o&&e&&$(t,a,e),e};let m=class extends d{constructor(){super(...arguments),this.current=""}render(){return p`
        <nav>
            <ul>
                <li>
                    <a href="/words" class="${this._isActive("words")}">
                        <nx-icon fileName="dict1"></nx-icon>
                        <span>Words</span>
                    </a>
                </li>

                <li>
                    <a href="/kanji" class="${this._isActive("kanji")}">
                        <nx-icon fileName="kanji1"></nx-icon>
                        <span>Kanji</span>
                    </a>
                </li>

                <li>
                    <a href="/video" class="${this._isActive("video")}">
                        <nx-icon fileName="video4"></nx-icon>
                        <span>Video</span>
                    </a>
                </li>
            </ul>
        </nav>
        `}_isActive(r){return r==this.current?"active":""}};m.styles=u`
    :host {
        width: 100%;
    }
    ul {
        margin: 0;
        padding: 1rem;
        display: flex;
        gap: 1rem;
        list-style: none;
    }
    li {
        display: inline-block;
        padding: 0;
        border: 2px solid var(--primary-color);
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .3rem;
        width: 6rem;
        height: 2rem;
        padding: .2rem 1rem;
        text-decoration: none;
        color: var(--font-color);
        transition: background-color .15s ease-in-out;
    }
    a:hover {
        background-color: var(--primary-color);
    }
    a.active {
        background-color: var(--secondary-color);
    }
    `;y([s()],m.prototype,"current",2);m=y([v("page-nav")],m);const x=u`
.form-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
    margin: 0;
}
input[type=text],
input[type=number] {
    padding: 1rem;

    font: inherit;
    color: var(--font-color);
    background-color: transparent;
    outline: none;

    border: 1px solid var(--secondary-color);
    border-bottom-width: 3px;
}
input[type=text]:focus,
input[type=number]:focus {
    border-color: var(--tertiary-color);
}
input[type=text]::placeholder,
input[type=number]::placeholder {
    color: var(--font-color);
    opacity: .6;
}
input[type=number] {
    -webkit-appearance: textfield;
    appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;var O=Object.defineProperty,j=Object.getOwnPropertyDescriptor,g=(r,t,a,o)=>{for(var e=o>1?void 0:o?j(t,a):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(e=(o?i(t,a,e):i(e))||e);return o&&e&&O(t,a,e),e};let c=class extends d{constructor(){super(...arguments),this.value="",this.name=""}handleInput(r){const t=r.target;this.value=t.value}render(){return p`
        <input @input=${this.handleInput} type="text" .value=${this.value} placeholder=" "></input>
        <span>${this.name}</span>
        `}};c.styles=[x,u`
        input {
            width: 100%;
        }
        input + span {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        input + span {
            top: 1.1rem;
            left: .5rem;
            padding: 0 .5rem;
            background-color: var(--component-color);
            pointer-events: none;
            transition: all .1s ease-in;
        }
        input:focus + span,
        input:not(:placeholder-shown) + span {
            top: -0.6rem;
            opacity: 1;
        }`];g([s()],c.prototype,"value",2);g([s()],c.prototype,"name",2);c=g([v("text-input")],c);var D=Object.defineProperty,C=Object.getOwnPropertyDescriptor,f=(r,t,a,o)=>{for(var e=o>1?void 0:o?C(t,a):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(e=(o?i(t,a,e):i(e))||e);return o&&e&&D(t,a,e),e};let l=class extends d{constructor(){super(...arguments),this.initialValue=[],this.label="",this.value=""}firstUpdated(){this.value=this.initialValue.join(", ")}handleInput(r){const t=r.target;this.value=t.value}collectValues(){return this.value===""?[]:this.value.split(",").map(r=>r.trim())}render(){return p`
        <div class="form-field">
            <input
                type="text"
                placeholder=' '
                @input=${this.handleInput}
                .value=${this.value} />
            <span>${this.label}</span>
        </div>`}};l.styles=[x,u`
        .form-field {
            position: relative;
        }
        input + span {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        input + span {
            top: 2.1rem;
            left: .5rem;
            padding: 0 .5rem;
            background-color: var(--component-color);
            pointer-events: none;
            transition: all .1s ease-in;
        }
        input:focus + span,
        input:not(:placeholder-shown) + span {
            top: .4rem;
            opacity: 1;
        }`];f([s()],l.prototype,"initialValue",2);f([s()],l.prototype,"label",2);f([w()],l.prototype,"value",2);l=f([v("list-input")],l);var N=Object.defineProperty,I=Object.getOwnPropertyDescriptor,_=(r,t,a,o)=>{for(var e=o>1?void 0:o?I(t,a):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(e=(o?i(t,a,e):i(e))||e);return o&&e&&N(t,a,e),e};let h=class extends d{render(){return p`
        ${this.text}
        `}};h.styles=u`
    :host {
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        width: 10rem;
        min-height: 4rem;

        background-color: var(--primary-color);
        color: var(--font-color);
    }
    `;_([s()],h.prototype,"text",2);h=_([v("popup-msg")],h);var V=Object.getOwnPropertyDescriptor,A=(r,t,a,o)=>{for(var e=o>1?void 0:o?V(t,a):t,n=r.length-1,i;n>=0;n--)(i=r[n])&&(e=i(e)||e);return e};let b=class extends d{constructor(){super(...arguments),this.buttonsData=[{icon:"list1",handler:this.gotoList},{icon:"add1",handler:this.gotoNewForm}]}gotoList(){this.dispatchEvent(new CustomEvent("goto-list",{bubbles:!0,composed:!0}))}gotoNewForm(){this.dispatchEvent(new CustomEvent("goto-new-form",{bubbles:!0,composed:!0}))}render(){const r=this.buttonsData.map(t=>p`<nx-icon @click=${t.handler} fileName=${t.icon}></nx-icon>`);return p`
        <div class="page-controls">
        ${r}
        </div>
        `}};b.styles=u`
    .page-controls {
        position: absolute;
        right: 2rem;
        top: 2rem;
        display: flex;
        gap: .5rem;
    }
    nx-icon {
        width: 2rem; height: 2.4rem;
        background-size: 2rem;
        padding-bottom: .4rem;
    }
    nx-icon:hover {
        border-bottom: 2px solid var(--primary-color);
        cursor: pointer;
    }
    `;b=A([v("page-controls")],b);export{x as f,w as r};
