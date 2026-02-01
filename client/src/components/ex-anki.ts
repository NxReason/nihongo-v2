import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Kanji from '../models/Kanji.ts'
import { controlsStyles } from "../styles/controlsStyles.ts";

@customElement('ex-anki')
export class ExAnki extends LitElement {
    @property() kanjiList!: Kanji[]
    @state() index: number = 0;
    @state() showDetails: boolean = false;

    private nextCard() {
        if (this.index >= this.kanjiList.length - 1) {
            const event = new CustomEvent('ex-anki-complete', { bubbles: true, composed: true });
            this.dispatchEvent(event);
            return;
        }
        this.index++;
        this.showDetails = false;
    }

    render() {
        const card = this.makeCard(this.kanjiList[this.index]);
        const controls = this.makeControls();
        return html`
        ${card}
        ${controls}
        `;
    }

    private makeCard(kanji: Kanji) {
        return html`
        <div class="card">
            <p class="card-glyph">${kanji.glyph}</p>
            <p class="card-details">
                <span>Kun</span>
                <span>${this.showDetails ? kanji.kunReadings.join(', ') : '...'}</span>
            </p>
            <p class="card-details">
                <span>On</span>
                <span>${this.showDetails ? kanji.onReadings.join(', ') : '...'}</span>
            </p>
            <p class="card-details">
                <span>Meanings</span>
                <span>${this.showDetails ? kanji.meanings.join(', ') : '...'}</span>
            </p>
        </div>
        `;
    }

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
        .card-glyph {
            padding: 5rem; margin: 0;
            justify-self: center;
            font-size: 20rem;
            line-height: 20rem;
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
        .card-controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        `
    ]
}
