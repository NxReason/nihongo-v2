import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

type EXERCISES = 'anki' | 'test';

@customElement('kanji-exercises')
export class KanjiExercises extends LitElement {
    private STATE: 'ex-picker' | EXERCISES = 'ex-picker';
    render() {
        let content;
        switch (this.STATE) {
            case 'ex-picker': {
                content = this.makeExerciseList();
            } break;
            case 'anki': {
                content = html`<ex-anki></ex-anki>`;
            } break;
            case 'test': {
                content = html`<div>test</div>`;
            } break;
            default: throw new Error(`Unknown exercise state: ${this.STATE}`);
        }

        return html`
        ${content}
        <kanji-controls></kanji-controls>
        `;
    }

    makeExerciseList() {
        return html`
        <ul>
            <li>Anki</li>
            <li>Test</li>
        </ul>`;
    }
}
