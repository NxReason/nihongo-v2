import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { formStyles } from "../styles/formStyles";

@customElement('text-input')
export class TextInput extends LitElement {
    @property() value: string = '';
    @property() name: string = '';

    private handleInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
    }

    render() {
        return html`
        <input @input=${this.handleInput} type="text" .value=${this.value} placeholder=" "></input>
        <span>${this.name}</span>
        `;
    }

    static styles = [
        formStyles,
        css`
        input {
            width: 100%;
        }
        input + span {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        input + span {
            top: 1.1rem;
            left: .5rem;
            padding: 0 .5rem;
            background-color: var(--component-color);
            pointer-events: none;
            transition: all .1s ease-in;
        }
        input:focus + span,
        input:not(:placeholder-shown) + span {
            top: -0.6rem;
            opacity: 1;
        }`
    ]
}
