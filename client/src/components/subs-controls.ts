import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";


type STATE = 'uploads' | 'settings' | 'layout';

@customElement('subs-controls')
export class SubsControls extends LitElement {
    @state() active: STATE = 'uploads';

    private handleClick(state: STATE) {
        if (this.active === state) return;

        this.active = state;
        const event = new CustomEvent(`subs-${state}-picked`, { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <nx-icon
                @click=${() => this.handleClick('uploads')}
                class=${this.setActive('uploads')} fileName="upload"></nx-icon>
            <nx-icon
                @click=${() => this.handleClick('settings')}
                class=${this.setActive('settings')} fileName="cog-outline"></nx-icon>
            <nx-icon
                @click=${() => this.handleClick('layout')}
                class=${this.setActive('layout')} fileName="view-grid-outline"></nx-icon>
        `;
    }

    private setActive(check: STATE): string {
        return this.active === check ? 'active' : '';
    }

    static styles = css`
    :host {
        display: flex;
        height: 2rem;
    }
    nx-icon {
        width: 2.7rem; height: 1.7rem;
        background-size: 1.7rem;
        padding: .2rem;
        background-color: var(--bg-color);
    }
    nx-icon:hover {
        cursor: pointer;
    }
    nx-icon.active {
        background-color: var(--primary-color);
    }
    `;
}
