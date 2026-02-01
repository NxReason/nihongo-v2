import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('words-list')
export class WordsList extends LitElement {
    render() {
        return html`Words List`;
    }
}
