import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import Kanji, { type KanjiSelectedEventDetail } from "../models/Kanji";

type WindowState = 'list' | 'form' | 'exercises';

@customElement('kanji-controller')
export class KanjiController extends LitElement {
    @state() WINDOW: WindowState = 'list';
    @state() kanjiSelected: Kanji | null = null;

    constructor() {
        super();
        // @ts-ignore: ts doesn't pick up generic event type
        this.addEventListener('kanji-selected', (e: CustomEvent<KanjiSelectedEventDetail>) => {
            this.kanjiSelected = e.detail.kanji;
            this.WINDOW = 'form';
        });

        this.addEventListener('new-kanji', () => {
            this.kanjiSelected = null;
            this.WINDOW = 'form';
        });
    }

    render() {
        switch (this.WINDOW) {
            case 'list': return html`<kanji-list></kanji-list>`;
            case 'form': return html`<kanji-form .kanji=${this.kanjiSelected}></kanji-form>`;
            case 'exercises': return html`<kanji-exercises></kanji-exercises>`;
            default: throw new Error('Unhandled kanji controller state');
        }
    }
}
