import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

type buttonData = {
    icon: string,
    handler: Function
}

@customElement('kanji-controls')
export class KanjiControls extends LitElement {
    private buttonsData: buttonData[] = [
        { icon: 'list1', handler: this.gotoKanjiList },
        { icon: 'add1', handler: this.gotoNewKanji },
    ];

    private gotoKanjiList() {
        this.dispatchEvent(new CustomEvent('goto-kanji-list', { bubbles: true, composed: true }));
    }

    private gotoNewKanji() {
        this.dispatchEvent(new CustomEvent('goto-new-kanji', { bubbles: true, composed: true }));
    }

    render() {
        const buttons = this.buttonsData.map(bd => {
            return html`<nx-icon @click=${bd.handler} fileName=${bd.icon}></nx-icon>`;
        })
        return html`
        <div class="page-controls">
        ${buttons}
        </div>
        `;
    }
    static styles = css`
    .page-controls {
        position: absolute;
        right: 2rem;
        top: 2rem;
        display: flex;
        gap: .5rem;
    }
    nx-icon {
        width: 2rem; height: 2.4rem;
        background-size: 2rem;
        padding-bottom: .4rem;
    }
    nx-icon:hover {
        border-bottom: 2px solid var(--primary-color);
        cursor: pointer;
    }
    `;
}
