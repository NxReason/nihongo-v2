import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type Kanji from "../models/Kanji";
import { ListInput } from "./list-input";
import { formStyles } from "../styles/formStyles";

@customElement('kanji-form')
export class KanjiForm extends LitElement {
    @property() kanji: Kanji | null = null;
    @state() glyph: string = '';

    firstUpdated() {
        this.glyph = this.kanji?.glyph ?? '';
    }

    private handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const [kun, on, meanings] = this.shadowRoot?.querySelectorAll<ListInput>('list-input')!;
        const kanjiForm = {
            glyph: this.glyph,
            kunReadings: kun.collectValues(),
            onReadings: on.collectValues(),
            meanings: meanings.collectValues(),
        }
        console.log(kanjiForm);
    }

    private handleGlyphInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        this.glyph = input.value;
    }

    render() {
        return html`
        <form @submit=${this.handleSubmit}>
            <div class="form-field glyph-wrapper ${this.glyph === '' ? '' : 'filled'}">
                <input
                    class="glyph-input"
                    type="text"
                    @input=${this.handleGlyphInput}
                    .value=${this.glyph} />
            </div>
            <list-input label="Kun" .initialValue=${this.kanji?.kunReadings ?? []}></list-input>
            <list-input label="On" .initialValue=${this.kanji?.onReadings ?? []}></list-input>
            <list-input label="Meanings" .initialValue=${this.kanji?.meanings ?? []}></list-input>
            <button>Submit</button>
        </form>
        `;
    }

    static styles = [
        formStyles,
        css`
        input.glyph-input {
            width: 6rem; height: 5rem;
            font-size: 4rem; line-height: 4rem;
            text-align: center;
            padding: .5rem;
            padding-bottom: 1rem;
        }
        .form-field {
            position: relative;
        }
        .glyph-wrapper::before,
        .glyph-wrapper::after,
        .form-field label {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        .glyph-wrapper::before {
            content: 'Glyph';
            left: 2rem;
            top: 1.4rem;
            transition: all .1s ease-in;
        }
        .glyph-wrapper::after {
            content: '月';
            font-size: 4rem;
            top: 1.6rem;
            left: 1.5rem;
        }
        .glyph-wrapper:focus-within::after {
            content: '';
        }
        .glyph-wrapper:focus-within::before,
        .filled.glyph-wrapper::before {
            top: .3rem;
            display: inline-block;
            padding: 0 .5rem;
            background-color: var(--component-color);
            left: .3rem;
            opacity: 1;
        }
        .filled::after { content: '' }`,
    ];

}
