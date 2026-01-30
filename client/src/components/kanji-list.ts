import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { kanji as kanjiAPI } from '../api.ts';
import type Kanji from "../models/Kanji.ts";

@customElement('kanji-list')
export class KanjiList extends LitElement {
    @state() kanjiList: Kanji[] = [];
    @state() LOAD_STATE: 'loading' | 'success' | 'error' = 'loading';

    async connectedCallback() {
        super.connectedCallback();
        this.loadData();
    }

    async loadData() {
        try {
            const res = await kanjiAPI.all();
            this.kanjiList = res;
            this.LOAD_STATE = 'success';
        }
        catch (err) {
            console.error(err);
            this.LOAD_STATE = 'error';
        }
    }

    private handleNewKanji() {
        this.dispatchEvent(new CustomEvent('new-kanji', { bubbles: true, composed: true }));
    }

    static styles = css`
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 1rem;
        padding: 0;
        margin: 0;
    }
    button {
        position: absolute;
        right: 2.5rem;
        top: 2.5rem;
        background-color: var(--primary-color);
        color: var(--font-color);
        border: none;
        font: inherit;
        padding: .3rem .8rem;
        border-radius: .3rem;
        transition: background-color .15s ease-in;
    }
    button:hover {
        background-color: var(--tertiary-color);
        cursor: pointer;
    }
    `;

    render() {
        let content;
        switch (this.LOAD_STATE) {
            case 'loading':
                content = html`<h2>Loading...</h2>`;
                break;
            case 'success':
                content = this.makeKanjiList();
                break;
            case 'error':
                content = html`<h2>Something went wrong`;
                break;
        }
        return content;
    }

    makeKanjiList() {
        return html`
        <button @click=${this.handleNewKanji}>Add</button>
        <ul>
        ${this.kanjiList.map(k => {
            return html`
            <kanji-card
                .kanji=${k}
            </kanji-card> `;
        })}
        </ul>`;
    }
}
