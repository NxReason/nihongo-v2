import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type Sub from "../models/Sub";

@customElement('subs-list')
export class SubsList extends LitElement {
    @property() subs: Sub[] = [];

    handleSubClick(sub: Sub) {
        const options = {
            bubbles: true, composed: true,
            detail: { sub }
        };
        const event = new CustomEvent('sub-clicked', options);
        this.dispatchEvent(event);
    }

    public setCurrentSub(sub: Sub) {
        const prevCurrent = this.shadowRoot?.querySelector('.current');
        prevCurrent?.classList.remove('current');

        const subEl = this.shadowRoot?.querySelector(`[data-id="${sub.id}"]`);
        subEl?.classList.add('current');
        subEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    render() {
        const subs = this.subs.map(s => this.makeSubGroup(s));
        return html`
          <ul class="subs-list">${subs}</ul>
        `;
    }

    makeSubGroup(sub: Sub) {
        const subsP = sub.text.map(t => html`<p>${t}</p>`);
        return html`
        <li @click=${() => this.handleSubClick(sub)} data-id=${sub.id}>
            <span>${sub.startFormat()}</span>
            <div class="subs-text">${subsP}</div>
        </li>
        `;
    }

    static styles = css`
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
    `;
}
