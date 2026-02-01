import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import Word from '../models/Word.ts';

@customElement('words-list')
export class WordsList extends LitElement {
    @property() wordsList: Word[] = [];

    render() {
        return html`
        <ul>
        ${this.wordsList.map(k => {
            return html`
            <word-card
                .word=${k}
            </word-card> `;
        })}
        </ul>
        <page-controls></page-controls>`;
    }

    static styles = css`
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: auto;
        gap: 1rem;
        padding: 0;
        margin: 0;
    }`;
}
