import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Kanji from "../models/Kanji";
import { ListInput } from "./list-input";
import { formStyles } from "../styles/formStyles";
import { kanji as kanjiAPI } from "../api";
import { controlsStyles } from "../styles/controlsStyles";
import { type KanjiDetail } from "../models/Kanji";

@customElement('kanji-form')
export class KanjiForm extends LitElement {
    @property() kanji: Kanji | null = null;
    @state() glyph: string = '';
    @state() private isLoading: boolean = false;

    firstUpdated() {
        this.glyph = this.kanji?.glyph ?? '';
    }

    private async handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (this.isLoading) return;
        this.isLoading = true;

        const [kun, on, meanings] = this.shadowRoot?.querySelectorAll<ListInput>('list-input')!;
        const kanjiForm: Kanji = new Kanji();
        kanjiForm.id = this.kanji?.id;
        kanjiForm.glyph = this.glyph;
        kanjiForm.kunReadings = kun.collectValues();
        kanjiForm.onReadings = on.collectValues();
        kanjiForm.meanings = meanings.collectValues();

        if (this.kanji?.id) await this.updateKanji(kanjiForm);
        else await this.saveKanji(kanjiForm);

        this.isLoading = false;
    }

    private async saveKanji(kanjiForm: Kanji) {
        const result = await kanjiAPI.create(kanjiForm);
        switch (result.state) {
            case 'success': {
                const options = {
                    detail: { kanji: result.kanji },
                    bubbles: true, composed: true,
                }
                this.dispatchEvent(new CustomEvent<KanjiDetail>('kanji-created', options));
                this.clearInputs();
            } break;
            case 'errorDev': { console.log(result.msg); break; }
            case 'errorUser': { console.log(result.detail); break; }
        }
    }
    private async updateKanji(kanjiForm: Kanji) {
        const result = await kanjiAPI.update(kanjiForm);
        switch (result.state) {
            case 'success': {
                const options = {
                    detail: { kanji: result.kanji },
                    bubbles: true, composed: true,
                };
                this.dispatchEvent(new CustomEvent<KanjiDetail>('kanji-updated', options));
            } break;
            case 'errorDev': { console.log(result.msg); break; }
            case 'errorUser': { console.log(result.detail); break; }
        }
    }
    private clearInputs() {
        this.glyph = '';
        const [kun, on, meanings] = this.shadowRoot?.querySelectorAll<ListInput>('list-input')!;
        kun.value = '';
        on.value = '';
        meanings.value = '';
    }

    private handleGlyphInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        this.glyph = input.value;
    }

    render() {
        let submitBtnText = this.kanji ? 'Update' : 'Create';
        if (this.isLoading) {
            submitBtnText = 'Loading...';
        }

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
            <div class="form-controls">
                <button ?disabled=${this.isLoading}>${submitBtnText}</button>
            </div>
        </form>
        <page-controls></page-controls>
        `;
    }

    static styles = [
        formStyles,
        controlsStyles,
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
        .filled::after { content: '' }
        .form-controls {
            margin-top: .4rem;
        }
        button {
            width: 10rem;
        }`,
    ];

}
