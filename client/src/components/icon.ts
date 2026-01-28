import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('nx-icon')
export class NxIcon extends LitElement {
    @property() fileName: string = '';
    @property() fileExt: string = 'svg';

    static styles = css`
    :host {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 1rem;
    }
    `;

    connectedCallback(): void {
        super.connectedCallback();
        this.style.backgroundImage = `url('/${this.fileName}.${this.fileExt}')`
    }

    render() {
        return html``;
    }
}
