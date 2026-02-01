import { customElement } from "lit/decorators.js";
import { AnkiBase } from "./anki-base";
import { css, html, type TemplateResult } from "lit";
import Word from "../models/Word";

@customElement('anki-words')
export class AnkiWords extends AnkiBase<Word> {
    override makeCard(word: Word): TemplateResult {
        return html`
        <p class="card-word">${word.jp}</p>
        ${this.makeDetail('Reading', word.reading)}
        ${this.makeDetail('Meanings', word.meanings.join(', '))}
        `;
    }

    static styles = [
        ...super.styles,
        css`
        .card-word {
            padding: 5rem; margin: 0;
            justify-self: center;
            font-size: 10rem;
            line-height: 20rem;
        }
        `
    ]
}
