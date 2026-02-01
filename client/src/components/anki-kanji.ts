import { css, html, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import Kanji from '../models/Kanji.ts'
import { AnkiBase } from "./anki-base.ts";

@customElement('anki-kanji')
export class AnkiKanji extends AnkiBase<Kanji> {

    override makeCard(kanji: Kanji): TemplateResult {
        return html`
        <p class="card-glyph">${kanji.glyph}</p>
        ${this.makeDetail('Kun', kanji.kunReadings.join(', '))}
        ${this.makeDetail('On', kanji.onReadings.join(', '))}
        ${this.makeDetail('Meanings', kanji.meanings.join(', '))}
        `;
    }

    static styles = [
        ...super.styles,
        css`
        .card-glyph {
            padding: 5rem; margin: 0;
            justify-self: center;
            font-size: 20rem;
            line-height: 20rem;
        }`,
    ]
}
