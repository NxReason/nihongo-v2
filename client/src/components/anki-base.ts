import { css, html, LitElement, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { controlsStyles } from "../styles/controlsStyles.ts";

export abstract class AnkiBase<T> extends LitElement {
    @property() items!: T[]
    @state() index: number = 0;
    @state() showDetails: boolean = false;

    private nextCard() {
        if (this.index >= this.items.length - 1) {
            const event = new CustomEvent('ex-anki-complete', { bubbles: true, composed: true });
            this.dispatchEvent(event);
            return;
        }
        this.index++;
        this.showDetails = false;
    }

    render() {
        const card = this.makeCard(this.items[this.index]);
        const controls = this.makeControls();
        return html`
        <div class="card">${card}</div>
        ${controls}
        `;
    }

    abstract makeCard(item: T): TemplateResult

    private makeControls() {
        return html`
        <div class="card-controls">
        ${this.showDetails ?
                html`
                <button @click=${this.nextCard}>Easy</button>
                <button @click=${this.nextCard}>Alright</button>
                <button @click=${this.nextCard}>Hard</button>
                ` :
                html`<button @click=${() => this.showDetails = true}>Show</button>`}
        </div>
        `;
    }

    protected makeDetail(tag: string, text: string, placeholder: string = '...') {
        return html`
        <p class="card-details">
            <span>${tag}</span>
            <span>${this.showDetails ? text : placeholder}</span>
        </p>
        `;
    }

    static styles = [
        controlsStyles,
        css`
        .card {
            display: grid;
            grid-template-rows: 30rem 5rem 5rem 5rem;
            margin-bottom: 1rem;
            border: 2px solid var(--bg-color);
            border-bottom: 3px solid var(--primary-color);
        }
        .card-controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .card-details {
            display: flex;
            align-items: center;
            padding: 1rem;
            gap: 2rem;
            span:first-of-type {
                width: 8rem;
                display: inline-block;
                padding: .5rem 1rem;
                background-color: var(--primary-color);
            }
        }
        `
    ]
}
