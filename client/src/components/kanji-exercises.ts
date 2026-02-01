import { css, html, LitElement } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import type Kanji from "../models/Kanji";
import { takeRandom } from '../utils.ts';

type EXERCISES = 'anki' | 'test';
type STATE = 'ex-picker' | EXERCISES;

@customElement('kanji-exercises')
export class KanjiExercises extends LitElement {
    @property() kanjiList: Kanji[] = [];
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
                const kanjiEx = this.takeRandomKanji(10);
                content = html`<anki-kanji .items=${kanjiEx}></anki-kanji>`;
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

    private takeRandomKanji(count: number) {
        return takeRandom(this.kanjiList, count);
    }
}
