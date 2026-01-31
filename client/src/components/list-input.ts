import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { formStyles } from "../styles/formStyles";

@customElement('list-input')
export class ListInput extends LitElement {
    @property() initialValue: string[] = [];
    @property() label: string = '';

    @state() value: string = '';

    firstUpdated() {
        this.value = this.initialValue.join(', ');
    }

    private handleInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
    }

    public collectValues(): string[] {
        if (this.value === '') return [];
        return this.value.split(',').map(v => v.trim());
    }

    render() {
        return html`
        <div class="form-field">
            <input
                class="kun-input"
                type="text"
                name="kun-input"
                placeholder=' '
                @input=${this.handleInput}
                .value=${this.value} />
            <span>${this.label}</span>
        </div>`;
    }

    static styles = [
        formStyles,
        css`
        .form-field {
            position: relative;
        }
        input + span {
            position: absolute;
            top: 0;
            left: 0;
            color: var(--font-color);
            opacity: 0.6;
        }
        input + span {
            top: 2.1rem;
            left: .5rem;
            padding: 0 .5rem;
            background-color: var(--component-color);
            pointer-events: none;
            transition: all .1s ease-in;
        }
        input:focus + span,
        input:not(:placeholder-shown) + span {
            top: .4rem;
            opacity: 1;
        }`
    ];

}
