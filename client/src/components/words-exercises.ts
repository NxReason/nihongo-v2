import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Word from "../models/Word";
import { takeRandom } from "../utils";

type EXERCISE = 'anki' | 'test';
type STATE = 'ex-picker' | EXERCISE;

@customElement('words-exercises')
export class WordsExercises extends LitElement {
    @property() wordsList: Word[] = [];
    @state() STATE: STATE = 'ex-picker';

    constructor() {
        super();

        this.addEventListener('ex-anki-complete', () => {
            this.STATE = 'ex-picker';
        });
    }

    render() {
        let content;
        switch (this.STATE) {
            case 'ex-picker': {
                content = this.makeExerciseList();
            } break;
            case 'anki': {
                const wordsEx = this.takeRandomWords(10);
                content = html`<anki-words .items=${wordsEx}></anki-words>`;
            } break;
            case 'test': {
                content = html`<div>test</div>`;
            } break;
            default: throw new Error(`Unknown exercise state: ${this.STATE}`);
        }

        return html`
        ${content}
        <page-controls></page-controls>
        `;
    }

    makeExerciseList() {
        return html`
        <ul class="exercise-list">
            <li @click=${() => this.STATE = 'anki'}>Anki</li>
            <li @click=${() => this.STATE = 'test'}>Test</li>
        </ul>`;
    }

    static styles = css`
    .exercise-list {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: 15rem;
        gap: 1rem;
        margin: 0; padding: 0;

        li {
            border: 2px solid var(--bg-color);
            border-bottom: 3px solid var(--primary-color);
            text-align: center;
            padding-top: 4rem;
            font-size: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: all .15s ease-in;
        }
        li:hover {
            cursor: pointer;
            border-bottom: 3px solid var(--tertiary-color);
            border-radius: 0 3rem 0 0;
        }
    }
    `;

    private takeRandomWords(count: number) {
        return takeRandom(this.wordsList, count);
    }
}
