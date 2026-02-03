import{a as m,i as y,b as c,n as w}from"./icon-4fV2LZ1R.js";import{r as g}from"./page-controls-C1tCuqVS.js";class o{constructor(){this.jp="",this.reading="",this.meanings=[]}static fromJSON(t){const r=new o;return r.id=t.id,r.jp=t.jp,r.reading=t.reading,r.meanings=t.meanings,r}static toJSON(t){const r={id:t.id,jp:t.jp,reading:t.reading,meanings:t.meanings};return JSON.stringify(r)}}class a{constructor(){this.glyph="",this.kunReadings=[],this.onReadings=[],this.meanings=[]}static fromJSON(t){const r=new a;return r.id=t.id,r.glyph=t.glyph,r.kunReadings=t.kun_readings,r.onReadings=t.on_readings,r.meanings=t.meanings,r}static toJSON(t){const r={id:t.id,glyph:t.glyph,kun_readings:t.kunReadings,on_readings:t.onReadings,meanings:t.meanings};return JSON.stringify(r)}}const f="http://localhost:8000/api",l={"Content-Type":"application/json"},j={url:f+"/kanji",async all(){return(await(await fetch(this.url)).json()).map(a.fromJSON)},async create(e){try{const t=await fetch(this.url,{method:"POST",headers:l,body:a.toJSON(e)}),r=await t.json();return t.ok?{state:"success",kanji:a.fromJSON(r)}:{state:"errorUser",detail:r.detail}}catch(t){return console.error(t),{state:"errorDev",msg:"Can't create Kanji"}}},async update(e){try{const t=await fetch(this.url+"/"+e.id,{method:"PUT",headers:l,body:a.toJSON(e)}),r=await t.json();return t.ok?{state:"success",kanji:a.fromJSON(r)}:{state:"errorUser",detail:r.detail}}catch(t){return console.error(`API error: ${t}`),{state:"errorDev",msg:`Can't update Kanji with id: ${e.id}`}}},async remove(e){try{const t=await fetch(this.url+"/"+e,{method:"DELETE"}),r=await t.json();return t.ok?{state:"success",kanji:a.fromJSON(r)}:{state:"errorUser",detail:r.detail}}catch(t){return console.error(`API error: ${t}`),{state:"errorDev",msg:`Can't delete kanji with id: ${e}`}}}},$={url:f+"/words",async all(){return(await(await fetch(this.url)).json()).map(o.fromJSON)},async create(e){try{const t=await fetch(this.url,{method:"POST",body:o.toJSON(e),headers:l}),r=await t.json();return t.ok?{state:"success",word:o.fromJSON(r)}:{state:"errorUser",detail:r.detail}}catch(t){return console.error(`API Error: ${t}`),{state:"errorDev",msg:"Can't create new word"}}},async update(e){try{const t=await fetch(this.url+"/"+e.id,{method:"PUT",body:o.toJSON(e),headers:l}),r=await t.json();return t.ok?{state:"success",word:o.fromJSON(r)}:{state:"errorUser",detail:r.detail}}catch(t){return console.error(`API Error: ${t}`),{state:"errorDev",msg:`Can't update word with id: ${e.id}`}}},async remove(e){try{const t=await fetch(this.url+"/"+e,{method:"DELETE"}),r=await t.json();return t.ok?{state:"success",word:o.fromJSON(r)}:{state:"errorUser",detail:r.detail}}catch(t){return console.error(`API Error: ${t}`),{state:"errorDev",msg:`Can't delete word with id: ${e}`}}}},b=m`
button {
    color: var(--font-color);
    background-color: var(--primary-color);
    font: inherit;
    border: none;
    padding: .7rem 2rem;
    transition: all .15s ease-in;
}
button:hover {
    cursor: pointer;
    background-color: var(--tertiary-color);
}
button:disabled {
    background-color: var(--bg-color);
    transition: none;
}
`;function N(e,t){const r=e.length<t?e.length:t,n=e.slice();for(let s=0;s<r;s++){const i=v(s,n.length);k(n,s,i)}return n.slice(0,r)}function k(e,t,r){const n=e[t];e[t]=e[r],e[r]=n}function v(e,t){const r=t-e;return Math.floor(Math.random()*r)+e}var S=Object.defineProperty,h=(e,t,r,n)=>{for(var s=void 0,i=e.length-1,p;i>=0;i--)(p=e[i])&&(s=p(t,r,s)||s);return s&&S(t,r,s),s};const u=class u extends y{constructor(){super(...arguments),this.index=0,this.showDetails=!1}nextCard(){if(this.index>=this.items.length-1){const t=new CustomEvent("ex-anki-complete",{bubbles:!0,composed:!0});this.dispatchEvent(t);return}this.index++,this.showDetails=!1}render(){const t=this.makeCard(this.items[this.index]),r=this.makeControls();return c`
        <div class="card">${t}</div>
        ${r}
        `}makeControls(){return c`
        <div class="card-controls">
        ${this.showDetails?c`
                <button @click=${this.nextCard}>Easy</button>
                <button @click=${this.nextCard}>Alright</button>
                <button @click=${this.nextCard}>Hard</button>
                `:c`<button @click=${()=>this.showDetails=!0}>Show</button>`}
        </div>
        `}makeDetail(t,r,n="..."){return c`
        <p class="card-details">
            <span>${t}</span>
            <span>${this.showDetails?r:n}</span>
        </p>
        `}};u.styles=[b,m`
        .card {
            display: grid;
            grid-template-rows: 30rem 5rem 5rem 5rem;
            margin-bottom: 1rem;
            border: 2px solid var(--bg-color);
            border-bottom: 3px solid var(--primary-color);
        }
        .card-controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .card-details {
            display: flex;
            align-items: center;
            padding: 1rem;
            gap: 2rem;
            span:first-of-type {
                width: 8rem;
                display: inline-block;
                padding: .5rem 1rem;
                background-color: var(--primary-color);
            }
        }
        `];let d=u;h([w()],d.prototype,"items");h([g()],d.prototype,"index");h([g()],d.prototype,"showDetails");export{d as A,a as K,o as W,b as c,j as k,N as t,$ as w};
