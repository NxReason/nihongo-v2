import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import Kanji from '../models/Kanji.ts'

@customElement('ex-anki')
export class ExAnki extends LitElement {
    @property() kanjiList: Kanji[] = []
    private index: number = 0;

    render() {
        const currentCard = this.makeCard(this.kanjiList[this.index]);
        return html`
        ${currentCard}
        <div class="card-controls">
            <button>Show</button>
        </div>
        `;
    }

    makeCard(kanji: Kanji) {
        return html`
        <div>
            <p>${kanji.glyph}</p>
            <p>${kanji.kunReadings.join(', ')}</p>
            <p>${kanji.glyph}</p>
            <p>${kanji.glyph}</p>
        </div>
        `;
    }
}
