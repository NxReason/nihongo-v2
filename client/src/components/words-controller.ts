import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import type Word from "../models/Word";
import { type WordDetail } from "../models/Word";
import { wordsAPI } from "../api";

type WindowState = 'list' | 'form' | 'exercises';
type LoadingState = 'loading' | 'success' | 'error';

@customElement('words-controller')
export class WordsController extends LitElement {
    @state() WINDOW: WindowState = 'exercises';
    @state() LOAD: LoadingState = 'loading';
    @state() wordsList: Word[] = [];
    @state() wordSelected: Word | null = null;

    constructor() {
        super();

        // @ts-ignore: ts doesn't pick up generic event type
        this.addEventListener('word-selected', (e: CustomEvent<WordDetail>) => {
            this.wordSelected = e.detail.word;
            this.WINDOW = 'form';
        });

        // @ts-ignore
        this.addEventListener('word-created', (e: CustomEvent<WordDetail>) => {
            this.wordsList.push(e.detail.word);
        });

        // @ts-ignore
        this.addEventListener('word-updated', (e: CustomEvent<WordDetail>) => {
            const updId = e.detail.word.id;
            const idx = this.wordsList.findIndex(w => w.id === updId);
            if (idx < 0) { console.error(`Can't update word with id: ${updId}`); return }
            this.wordsList[idx] = e.detail.word;
        })

        // @ts-ignore
        this.addEventListener('word-removed', (e: CustomEvent<WordDetail>) => {
            this.deleteWord(e.detail.word);
        });

        this.addEventListener('goto-new-form', () => {
            this.wordSelected = null;
            this.WINDOW = 'form';
        });

        this.addEventListener('goto-list', () => {
            this.WINDOW = 'list';
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.loadData();
    }

    async loadData() {
        try {
            const res = await wordsAPI.all();
            this.wordsList = res;
            this.LOAD = 'success';
        }
        catch (err) {
            console.error(err);
            this.LOAD = 'error';
        }
    }

    async deleteWord(word: Word) {
        const result = await wordsAPI.remove(word.id!);
        switch (result.state) {
            case 'success': {
                this.wordsList = this.wordsList.filter(w => w.id !== result.word.id);
            } break;
            default: console.log('some error');
        }
    }

    render() {
        switch (this.LOAD) {
            case 'loading': return html`<h2>Loading...</h2>`;
            case 'error': return html`<h2>Error loading words</h2>`;
            case 'success': return this.renderContent();
            default: throw new Error('Unhandled words loading error');
        }
    }
    renderContent() {
        switch (this.WINDOW) {
            case 'list': return html`<words-list .wordsList=${this.wordsList}></words-list>`;
            case 'exercises': return html`<words-exercises .wordsList=${this.wordsList}></words-exercises>`;
            case 'form': return html`<words-form .word=${this.wordSelected}></words-form>`;
            default: throw new Error(`Unhandled words controller state ${this.WINDOW}`);
        }
    }
}
