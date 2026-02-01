import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import type Word from "../models/Word";
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

    render() {
        switch (this.LOAD) {
            case 'loading': return html`<h2>Loading...</h2>`;
            case 'error': return html`<h2>Error loading words</h2>`;
            case 'success': return this.renderContent();
            default: throw new Error('Unhandled kanji loading error');
        }
    }
    renderContent() {
        console.log('rendering', this.WINDOW);
        switch (this.WINDOW) {
            case 'list': return html`<words-list .wordsList=${this.wordsList}></words-list>`;
            case 'exercises': return html`<words-exercises .wordsList=${this.wordsList}></words-exercises>`;
            case 'form': return html`<words-form .word=${this.wordSelected}></words-form>`;
            default: throw new Error(`Unhandled words controller state ${this.WINDOW}`);
        }
    }
}
