import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type Kanji from "../models/Kanji";
import { formStyles } from "../styles/formStyles";

@customElement('kanji-form')
export class KanjiForm extends LitElement {
    @property() kanji: Kanji | null = null;

    private handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        console.log(this);
    }

    static styles = [
        formStyles,
    ];

    render() {
        return html`
        <form @submit=${this.handleSubmit}>
            <div class="form-column">
                <label>Glyph</label>
                <input type="text" value=${this.kanji?.glyph ?? ''} placeholder="月" />
            </div>

            <div class="form-column">
                <label>Kun</label>
                <input type="text" value=${this.kanji?.glyph ?? ''} placeholder="月" />
            </div>

            <div class="form-column">
                <label>On</label>
                <input type="text" value=${this.kanji?.glyph ?? ''} placeholder="月" />
            </div>

            <div class="form-column">
                <label>Meanings</label>
                <input type="text" value=${this.kanji?.glyph ?? ''} placeholder="月" />
            </div>
        </form>
        `;
    }
}
