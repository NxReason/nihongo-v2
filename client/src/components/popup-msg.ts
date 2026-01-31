import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('popup-msg')
export class PopupMsg extends LitElement {
    @property() text!: string;

    render() {
        return html`
        ${this.text}
        `;
    }

    static styles = css`
    :host {
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        width: 10rem;
        min-height: 4rem;

        background-color: var(--primary-color);
        color: var(--font-color);
    }
    `;
}
