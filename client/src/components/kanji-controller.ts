import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import Kanji, { type KanjiSelectedEventDetail, type KanjiDetail } from "../models/Kanji";
import { kanji as kanjiAPI } from '../api.ts';

type WindowState = 'list' | 'form' | 'exercises';
type LoadingState = 'loading' | 'success' | 'error';

@customElement('kanji-controller')
export class KanjiController extends LitElement {
    @state() WINDOW: WindowState = 'exercises';
    @state() LOAD_STATE: LoadingState = 'loading';
    @state() kanjiSelected: Kanji | null = null;
    @state() kanjiList: Kanji[] = [];

    constructor() {
        super();
        // @ts-ignore: ts doesn't pick up generic event type
        this.addEventListener('kanji-selected', (e: CustomEvent<KanjiSelectedEventDetail>) => {
            this.kanjiSelected = e.detail.kanji;
            this.WINDOW = 'form';
        });

        // @ts-ignore
        this.addEventListener('kanji-created', (e: CustomEvent<KanjiDetail>) => {
            this.addKanji(e.detail.kanji);
        });

        // @ts-ignore
        this.addEventListener('kanji-updated', (e: CustomEvent<KanjiDetail>) => {
            const updId = e.detail.kanji.id;
            const idx = this.kanjiList.findIndex(k => k.id === updId);
            if (idx < 0) { console.error(`Can't update kanji with id: ${updId}`); return }
            this.kanjiList[idx] = e.detail.kanji;
        })

        // @ts-ignore
        this.addEventListener('kanji-removed', (e: CustomEvent<KanjiSelectedEventDetail>) => {
            this.deleteKanji(e.detail.kanji);
        });

        this.addEventListener('goto-new-kanji', () => {
            this.kanjiSelected = null;
            this.WINDOW = 'form';
        });

        this.addEventListener('goto-exercises', () => {
            this.WINDOW = 'exercises';
        });

        this.addEventListener('goto-kanji-list', () => {
            this.WINDOW = 'list';
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.loadData();
    }

    async loadData() {
        try {
            const res = await kanjiAPI.all();
            this.kanjiList = res;
            this.LOAD_STATE = 'success';
        }
        catch (err) {
            console.error(err);
            this.LOAD_STATE = 'error';
        }
    }

    async addKanji(kanji: Kanji) {
        this.kanjiList.push(kanji);
    }

    async deleteKanji(kanji: Kanji) {
        const result = await kanjiAPI.remove(kanji.id!);
        switch (result.state) {
            case 'success': {
                this.kanjiList = this.kanjiList.filter(k => k.id !== result.kanji.id);
            } break;
            default: console.log('some error');
        }
    }

    render() {
        switch (this.LOAD_STATE) {
            case 'loading': return html`<h2>Loading...</h2>`;
            case 'error': return html`<h2>Error loading kanji</h2>`;
            case 'success': return this.renderContent();
            default: throw new Error('Unhandled kanji loading error');
        }
    }

    renderContent() {
        switch (this.WINDOW) {
            case 'list': return html`<kanji-list .kanjiList=${this.kanjiList}></kanji-list>`;
            case 'form': return html`<kanji-form .kanji=${this.kanjiSelected}></kanji-form>`;
            case 'exercises': return html`<kanji-exercises></kanji-exercises>`;
            default: throw new Error('Unhandled kanji controller state');
        }
    }
}
