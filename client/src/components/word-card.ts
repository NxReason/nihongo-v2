import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import Word, { type WordDetail } from '../models/Word.ts';

@customElement('word-card')
export class WordCard extends LitElement {
    @property() word!: Word;

    constructor() {
        super();
        this.addEventListener('click', this.handleHostClick);
    }

    private handleHostClick() {
        const options = {
            detail: { word: this.word },
            bubbles: true,
            composed: true,
        }
        this.dispatchEvent(new CustomEvent<WordDetail>('word-selected', options));
    }

    private handleDelete(e: Event) {
        e.stopPropagation();
        const options = {
            detail: { word: this.word },
            bubble: true,
            composed: true,
        }
        const event = new CustomEvent<WordDetail>('word-removed', options);
        this.dispatchEvent(event);
    }

    render() {
        return html`
        <h2>${this.word.jp} / ${this.word.reading}</h2>
        ${this.makeMeaningsList()}
        <nx-icon fileName="delete1" @click=${this.handleDelete}></nx-icon>
        `;
    }

    static styles = css`
    :host {
        display: grid;
        grid-template-rows: minmax(2rem, auto) auto;
        grid-template-areas:
            'jp'
            'meanings';
        gap: .2rem;
        padding: 1rem;
        position: relative;
        border: 1px solid var(--primary-color);
        border-radius: 0 0 2rem;
        transition: box-shadow .1s ease-in;
    }
    :host(:hover) {
        cursor: pointer;
        box-shadow: 2px 2px 2px var(--tertiary-color);
    }
    h2 {
        grid-area: jp;
        font-size: 2rem;
        line-height: 2rem;
        margin: 0; padding: 0;
    }
    .meanings {
        grid-area: meanings;
        margin: 0;
        margin-top: .5rem;
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

    private makeMeaningsList() {
        return html`
        <p class="meanings">
            ${this.word.meanings.join(', ')}
        </p>
        `
    }
}
