import{a as c,i as u,b as a,t as d,n as y}from"./icon-4fV2LZ1R.js";import{r as h,f as U}from"./page-controls-C1tCuqVS.js";var j=Object.defineProperty,R=Object.getOwnPropertyDescriptor,P=(t,e,r,i)=>{for(var s=i>1?void 0:i?R(e,r):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(i?n(e,r,s):n(s))||s);return i&&s&&j(e,r,s),s};let b=class extends u{constructor(){super(),this.videoURL="",this.addEventListener("video-uploaded",t=>{const{file:e}=t.detail;this.videoURL=URL.createObjectURL(e)}),this.addEventListener("video-time-updated",t=>{const e=t.detail.ts*1e3;this.subs.setCurrentTime(e)}),this.addEventListener("sub-clicked",t=>{const{sub:e}=t.detail;this.player.setCurrentTime(e.start/1e3)})}firstUpdated(){this.player=this.shadowRoot?.querySelector("video-player"),this.subs=this.shadowRoot?.querySelector("video-subs")}render(){return a`
            <video-player .url=${this.videoURL}></video-player>
            <video-subs></video-subs>
        `}};b.styles=c`
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "player subs";
      gap: 1rem;
    }

    video-player {
      grid-area: player;
    }

    video-subs {
      grid-area: subs;
      min-height: 600px;
    }
    `;P([h()],b.prototype,"videoURL",2);b=P([d("video-controller")],b);var k=Object.defineProperty,I=Object.getOwnPropertyDescriptor,$=(t,e,r,i)=>{for(var s=i>1?void 0:i?I(e,r):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(i?n(e,r,s):n(s))||s);return i&&s&&k(e,r,s),s};let p=class extends u{constructor(){super(...arguments),this.loaded=!1}firstUpdated(){this.player=this.shadowRoot?.querySelector("video"),this.player.volume=.3,this.player.addEventListener("loadedmetadata",()=>this.loaded=!0),this.player.addEventListener("timeupdate",this.sendTimeUpdate.bind(this))}updated(t){t.has("url")&&this.url!==""&&(this.player.src=this.url)}sendTimeUpdate(){const t={detail:{ts:this.player.currentTime},bubbles:!0,composed:!0},e=new CustomEvent("video-time-updated",t);this.dispatchEvent(e)}getCurrentTime(){return this.loaded?this.player.currentTime:0}setCurrentTime(t){this.loaded&&(this.player.currentTime=t)}render(){return a`
        <video controls>
            Your browser does not support the video tag
        </video>
        `}};p.styles=c`
    video {
        max-width: 100%;
        width: 100%;
        height: auto;
    }
    `;$([y()],p.prototype,"url",2);$([h()],p.prototype,"loaded",2);p=$([d("video-player")],p);const E=1e3,w=E*60,_=w*60;class S{constructor(e,r,i,s){this.id=e,this.start=r,this.end=i,this.text=s}static fromArray(e){const r=parseInt(e[0]),i=N(e[1]);return new S(r,i[0],i[1],e.slice(2))}startFormat(){let e=this.start;const r=Math.floor(e/_),i=r>0?`${x(r)}:`:"";e-=r*_;const s=Math.floor(e/w);e-=s*w;const o=Math.floor(e/E);return`${i}${x(s)}:${x(o)}`}}function F(t){const e=[],r=t.split(`
`);for(let i=C(r,0);i;i=C(r,i[1])){const[s,o]=i;e.push(S.fromArray(r.slice(s,o)))}return e}function C(t,e=0){let r=e;for(let s=r;s<t.length;s++)if(t[s].trim()!==""){r=s;break}let i=r;for(let s=i;s<t.length&&t[s].trim()!=="";s++)i=s;if(r!==i)return i++,[r,i]}function N(t){const[e,r]=t.split(" --> ");return[O(e),O(r)]}function O(t){const[e,r]=t.split(","),[i,s,o]=e.split(":");return parseInt(i)*60*60*1e3+parseInt(s)*60*1e3+parseInt(o)*1e3+parseInt(r)}function x(t){return t<10?`0${t}`:String(t)}var q=Object.defineProperty,A=Object.getOwnPropertyDescriptor,g=(t,e,r,i)=>{for(var s=i>1?void 0:i?A(e,r):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(i?n(e,r,s):n(s))||s);return i&&s&&q(e,r,s),s};let l=class extends u{constructor(){super(),this.tab="uploads",this.desync=0,this.subs=[],this.addEventListener("subs-uploads-picked",()=>{this.tab="uploads"}),this.addEventListener("subs-settings-picked",()=>{this.tab="settings"}),this.addEventListener("subs-layout-picked",()=>{this.tab="layout"}),this.addEventListener("subs-uploaded",t=>{const{file:e}=t.detail;this.parseSubs(e)}),this.addEventListener("desync-set",t=>{const{desync:e}=t.detail;this.desync=e})}firstUpdated(){this.subsList=this.shadowRoot?.querySelector("subs-list")}setCurrentTime(t){const e=this.bSearchSub(t);e&&this.subsList.setCurrentSub(e)}async parseSubs(t){const e=await t.text();this.subs=F(e)}render(){return a`
        <subs-controls></subs-controls>
        <subs-menu .tab=${this.tab}></subs-menu>
        <subs-list .subs=${this.subs}></subs-list>
        `}bSearchSub(t){let e=0,r=this.subs.length;for(;e<r;){let i=Math.floor((r+e)/2);switch(this.checkSubInterval(t,this.subs[i])){case 1:e=i+1;continue;case-1:r=i;break;case 0:return this.subs[i]}}return null}checkSubInterval(t,e){return t<e.start?-1:t>e.end?1:0}};l.styles=c`
    :host {
        display: grid;
        grid-template-rows: 2.4rem 6rem minmax(10rem, calc(100vw - 40rem));
    }
    `;g([y()],l.prototype,"tab",2);g([h()],l.prototype,"desync",2);g([h()],l.prototype,"subs",2);l=g([d("video-subs")],l);var M=Object.defineProperty,V=Object.getOwnPropertyDescriptor,L=(t,e,r,i)=>{for(var s=i>1?void 0:i?V(e,r):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(i?n(e,r,s):n(s))||s);return i&&s&&M(e,r,s),s};let m=class extends u{constructor(){super(...arguments),this.active="uploads"}handleClick(t){if(this.active===t)return;this.active=t;const e=new CustomEvent(`subs-${t}-picked`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return a`
            <nx-icon
                @click=${()=>this.handleClick("uploads")}
                class=${this.setActive("uploads")} fileName="upload"></nx-icon>
            <nx-icon
                @click=${()=>this.handleClick("settings")}
                class=${this.setActive("settings")} fileName="cog-outline"></nx-icon>
            <nx-icon
                @click=${()=>this.handleClick("layout")}
                class=${this.setActive("layout")} fileName="view-grid-outline"></nx-icon>
        `}setActive(t){return this.active===t?"active":""}};m.styles=c`
    :host {
        display: flex;
        height: 2rem;
    }
    nx-icon {
        width: 2.7rem; height: 1.7rem;
        background-size: 1.7rem;
        padding: .2rem;
        background-color: var(--bg-color);
    }
    nx-icon:hover {
        cursor: pointer;
    }
    nx-icon.active {
        background-color: var(--primary-color);
    }
    `;L([h()],m.prototype,"active",2);m=L([d("subs-controls")],m);var G=Object.defineProperty,z=Object.getOwnPropertyDescriptor,T=(t,e,r,i)=>{for(var s=i>1?void 0:i?z(e,r):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(i?n(e,r,s):n(s))||s);return i&&s&&G(e,r,s),s};let v=class extends u{handleFileUpload(t,e){const r=t.target,i=r.files&&r.files[0];if(i){const s=new CustomEvent(`${e}-uploaded`,{bubbles:!0,composed:!0,detail:{file:i}});this.dispatchEvent(s)}}handleDesyncInput(t){const e=t.target,r=parseFloat(e.value||"0"),i=new CustomEvent("desync-set",{bubbles:!0,composed:!0,detail:{desync:r}});this.dispatchEvent(i)}handleDesyncFocus(t){t.target.select()}render(){switch(this.tab){case"uploads":return this.makeUploadsTab();case"settings":return this.makeSettingsTab();case"layout":return this.makeLayoutTab();default:throw new Error(`Invalid subs settings tab: ${this.tab}`)}}makeUploadsTab(){return a`
        <div class="uploads-tab">
            <div>
                <input
                    @change=${t=>this.handleFileUpload(t,"video")}
                    type="file" id="video-input" />
                <label for="video-input">
                    <nx-icon fileName="video-upload"></nx-icon>
                    Video
                </label>
            </div>
            <div>
                <input
                    @change=${t=>this.handleFileUpload(t,"subs")}
                    type="file" id="subs-input" />
                <label for="subs-input">
                    <nx-icon fileName="comment"></nx-icon>
                    Subs
                </label>
            </div>
        </div>
        `}makeSettingsTab(){return a`
        <form>
            <div class="form-field">
                <label for="desync-input">
                    <nx-icon fileName="timeline-clock"></nx-icon>
                    Desync
                </label>
                <input
                    @input=${this.handleDesyncInput}
                    @focus=${this.handleDesyncFocus}
                    type="number" id="desync-input" class="desync-input" placeholder="0" />
            </div>
        </form>
        `}makeLayoutTab(){return a`<p>Soon...</p>`}};v.styles=[U,c`
    :host {
        display: flex;
        align-items: center;
        min-height: 3rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--primary-color);
    }
    .uploads-tab {
        display: flex;
        gap: 1rem;
        align-items: center;

        label {
            display: flex;
            align-items: center;
            gap: .3rem;
            padding: .3rem .6rem;
            transition: all .15s ease-in;
        }
        label:hover {
            background-color: var(--primary-color);
            cursor: pointer;
        }
    }
    input[type=file] {
        width: 1px; height: 1px;
        position: absolute; top: -100; right: -100;
    }
    nx-icon {
        width: 2rem; height: 2rem;
        background-size: 2rem;
    }
    .form-field {
        flex-direction: row;
        align-items: center;
        gap: 1rem;

        label {
            display: flex;
            align-items: center;
            gap: .3rem;
        }
    }
    `];T([y()],v.prototype,"tab",2);v=T([d("subs-menu")],v);var H=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,D=(t,e,r,i)=>{for(var s=i>1?void 0:i?Y(e,r):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(i?n(e,r,s):n(s))||s);return i&&s&&H(e,r,s),s};let f=class extends u{constructor(){super(...arguments),this.subs=[]}handleSubClick(t){const e={bubbles:!0,composed:!0,detail:{sub:t}},r=new CustomEvent("sub-clicked",e);this.dispatchEvent(r)}setCurrentSub(t){this.shadowRoot?.querySelector(".current")?.classList.remove("current");const r=this.shadowRoot?.querySelector(`[data-id="${t.id}"]`);r?.classList.add("current"),r?.scrollIntoView({block:"center",behavior:"smooth"})}render(){const t=this.subs.map(e=>this.makeSubGroup(e));return a`
          <ul class="subs-list">${t}</ul>
        `}makeSubGroup(t){const e=t.text.map(r=>a`<p>${r}</p>`);return a`
        <li @click=${()=>this.handleSubClick(t)} data-id=${t.id}>
            <span>${t.startFormat()}</span>
            <div class="subs-text">${e}</div>
        </li>
        `}};f.styles=c`
    :host {
        display: flex;
        flex-direction: column;
        margin-top: 0.5rem;
        overflow: hidden;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color) transparent;
        li {
            display: flex;
            align-items: stretch;
            flex-grow: 1;
            gap: 1rem;
            height: minmax(3rem, auto);
            transition: background-color .15s ease-in;
            span {
                display: flex;
                justify-content: end;
                align-items: center;
                width: 4rem;
                padding: 1rem;
                border-bottom: 1px solid var(--secondary-color);
                background-color: var(--primary-color);
                transition: background-color .15s ease-in;
            }
        }
        li:hover {
            cursor: pointer;
        }
        li:hover span {
            background-color: var(--tertiary-color);
        }
        li.current {
            background-color: var(--bg-color);
            span {
                background-color: var(--secondary-color);
            }
        }
    }
    .subs-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .4rem;
        padding: .5rem;

        p { margin: 0; }
    }
    `;D([y()],f.prototype,"subs",2);f=D([d("subs-list")],f);
