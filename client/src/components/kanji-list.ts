import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type Kanji from "../models/Kanji.ts";

@customElement('kanji-list')
export class KanjiList extends LitElement {
    @property() kanjiList: Kanji[] = [];

    render() {
        return html`
        <ul>
        ${this.kanjiList.map(k => {
            return html`
            <kanji-card
                .kanji=${k}
            </kanji-card> `;
        })}
        </ul>
        <page-controls></page-controls>`;
    }

    static styles = css`
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 1rem;
        padding: 0;
        margin: 0;
    }`;
}
