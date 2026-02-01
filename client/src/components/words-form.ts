import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Word, { type WordDetail } from '../models/Word.ts';
import { ListInput } from "./list-input";
import { wordsAPI } from "../api";
import { formStyles } from "../styles/formStyles.ts";
import { controlsStyles } from "../styles/controlsStyles.ts";
import type { TextInput } from "./text-input.ts";

@customElement('words-form')
export class WordsForm extends LitElement {
    @property() word: Word | null = null;
    @state() private isLoading: boolean = false;
    @state() private jp: string = '';
    @state() private reading: string = '';

    connectedCallback(): void {
        super.connectedCallback();
        this.jp = this.word?.jp ?? '';
        this.reading = this.word?.reading ?? '';
    }

    private async handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (this.isLoading) return;
        this.isLoading = true;

        const [jp, reading] = this.shadowRoot?.querySelectorAll<TextInput>('text-input')!;
        const meanings = this.shadowRoot?.querySelector<ListInput>('list-input')!;
        const wordForm: Word = new Word();
        wordForm.id = this.word?.id;
        wordForm.jp = jp.value;
        wordForm.reading = reading.value;
        wordForm.meanings = meanings.collectValues();

        if (this.word?.id) await this.updateWord(wordForm);
        else await this.saveWord(wordForm);

        this.isLoading = false;
    }

    private async saveWord(wordForm: Word) {
        const result = await wordsAPI.create(wordForm);
        switch (result.state) {
            case 'success': {
                const options = {
                    detail: { word: result.word },
                    bubbles: true, composed: true,
                }
                this.dispatchEvent(new CustomEvent<WordDetail>('word-created', options));
                this.clearInputs();
            } break;
            case 'errorDev': { console.log(result.msg); break; }
            case 'errorUser': { console.log(result.detail); break; }
        }
    }
    private async updateWord(wordForm: Word) {
        const result = await wordsAPI.update(wordForm);
        switch (result.state) {
            case 'success': {
                const options = {
                    detail: { word: result.word },
                    bubbles: true, composed: true,
                };
                this.dispatchEvent(new CustomEvent<WordDetail>('word-updated', options));
            } break;
            case 'errorDev': { console.log(result.msg); break; }
            case 'errorUser': { console.log(result.detail); break; }
        }
    }

    private clearInputs() {
        const [jp, reading, meanings] = this.shadowRoot?.querySelectorAll<ListInput>('list-input, text-input')!;
        jp.value = '';
        reading.value = '';
        meanings.value = '';
    }

    render() {
        let submitBtnText = this.word ? 'Update' : 'Create';
        if (this.isLoading) {
            submitBtnText = 'Loading...';
        }

        return html`
        <form @submit=${this.handleSubmit}>
            <div class="form-field col-2">
                <div>
                    <text-input name="JP" .value=${this.jp}></text-input>
                </div>
                <div>
                    <text-input name="Reading" .value=${this.reading}></text-input>
                </div>
            </div>
            <list-input label="Meanings" .initialValue=${this.word?.meanings ?? []}></list-input>
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
        .form-field {
            position: relative;
        }
        .form-field label {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        .form-field.col-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .form-field > div {
            position: relative;
        }
        .form-field text-input {
            display: flex;
        }
        .form-controls {
            margin-top: .4rem;
        }
        button {
            width: 10rem;
        }`,
    ];
}
