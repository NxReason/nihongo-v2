import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { kanji } from '../api.ts';

@customElement('kanji-list')
export class KanjiList extends LitElement {
    @state() kanjiList = [];

    connectedCallback(): void {
        super.connectedCallback();
        kanji.all().then(console.log);
    }

    static styles = css`
    h1 { padding: 0; margin: 0; font-size: 3rem; line-height: 3rem; }
    `;
    render() {
        return html`
        <h1>Kanji List</h1>
        `;
    }
}
