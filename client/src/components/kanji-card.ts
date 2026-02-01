import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import Kanji, { type KanjiSelectedEventDetail } from "../models/Kanji";

@customElement('kanji-card')
export class KanjiCard extends LitElement {
    @property() kanji!: Kanji;

    constructor() {
        super();
        this.addEventListener('click', this.handleHostClick);
    }

    private handleHostClick() {
        const options = {
            detail: { kanji: this.kanji },
            bubbles: true,
            composed: true,
        }
        this.dispatchEvent(new CustomEvent<KanjiSelectedEventDetail>('kanji-selected', options));
    }

    private handleDelete(e: Event) {
        e.stopPropagation();
        const options = {
            detail: { kanji: this.kanji },
            bubble: true,
            composed: true,
        }
        const event = new CustomEvent<KanjiSelectedEventDetail>('kanji-removed', options);
        this.dispatchEvent(event);
    }

    render() {
        return html`
        <h2>${this.kanji.glyph}</h2>
        ${this.makeReadingsList('Kun', this.kanji.kunReadings)}
        ${this.makeReadingsList('On', this.kanji.onReadings)}
        ${this.makeMeaningsList()}
        <nx-icon fileName="delete1" @click=${this.handleDelete}></nx-icon>
        `;
    }

    static styles = css`
    :host {
        display: grid;
        grid-template-rows: 2rem 2rem 1fr;
        grid-template-columns: 30% 1fr;
        grid-template-areas:
            'glyph kun'
            'glyph on'
            'meanings meanings';
        gap: .5rem;
        padding: .5rem;
        position: relative;
        border: 1px solid var(--primary-color);
        border-radius: 0 0 2rem;
        transition: box-shadow .1s ease-in;
    }
    :host(:hover) {
        cursor: pointer;
        box-shadow: 2px 2px 2px var(--tertiary-color);
    }
    .kun { grid-area: kun; }
    .on { grid-area: on; }
    .meanings { grid-area: meanings; }
    h2 {
        grid-area: glyph;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4rem;
        line-height: 4rem;
        margin: 0; padding: 0;
    }
    .readings {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    .readings span {
        display: inline-block;
        padding: .2rem .4rem;
        border-radius: .5rem;
        background-color: var(--secondary-color);
    }
    .meanings {
        padding-left: 1rem;
    }
    nx-icon {
        width: 2rem;
        height: 2rem;
        padding: .2rem;
        background-color: var(--primary-color);
        background-size: 1.6rem;
        position: absolute;
        right: -0.4rem;
        top: -0.4rem;
        opacity: 0;
        transition: all .15s ease-in;
    }
    nx-icon:hover {
        background-color: var(--tertiary-color);
    }
    :host(:hover) nx-icon {
        opacity: 1;
    }
    `

    private makeReadingsList(listName: string, readings: string[]) {
        return html`
        <div class="${listName.toLowerCase()} readings">
            <span>${listName.toUpperCase()}</span>
            <p>${readings.join(', ')}</p>
        </div>
        `;
    }

    private makeMeaningsList() {
        return html`
        <p class="meanings">
            ${this.kanji.meanings.join(', ')}
        </p>
        `
    }
}
