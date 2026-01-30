import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('kanji-exercises')
export class KanjiExercises extends LitElement {
    render() {
        return html`
        <h2>Kanji Exercises</h2>
        `;
    }
}
