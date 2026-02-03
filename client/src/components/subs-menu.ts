import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { formStyles } from "../styles/formStyles";

type TAB = 'uploads' | 'settings' | 'layout';

@customElement('subs-menu')
export class SubsMenu extends LitElement {
    @property() tab!: TAB;

    handleFileUpload(e: Event, type: string) {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];
        if (file) {
            const event = new CustomEvent(`${type}-uploaded`, {
                bubbles: true, composed: true,
                detail: { file }
            });
            this.dispatchEvent(event);
        }
    }

    handleDesyncInput(e: InputEvent) {
        const target = e.target as HTMLInputElement;
        const value = parseFloat(target.value || '0');

        const event = new CustomEvent('desync-set',
            {
                bubbles: true, composed: true,
                detail: { desync: value }
            });
        this.dispatchEvent(event);
    }

    handleDesyncFocus(e: FocusEvent) {
        const target = e.target as HTMLInputElement;
        target.select();
    }

    render() {
        switch (this.tab) {
            case 'uploads': return this.makeUploadsTab();
            case 'settings': return this.makeSettingsTab();
            case 'layout': return this.makeLayoutTab();
            default: throw new Error(`Invalid subs settings tab: ${this.tab}`);
        }
    }

    private makeUploadsTab() {
        return html`
        <div class="uploads-tab">
            <div>
                <input
                    @change=${(e: Event) => this.handleFileUpload(e, 'video')}
                    type="file" id="video-input" />
                <label for="video-input">
                    <nx-icon fileName="video-upload"></nx-icon>
                    Video
                </label>
            </div>
            <div>
                <input
                    @change=${(e: Event) => this.handleFileUpload(e, 'subs')}
                    type="file" id="subs-input" />
                <label for="subs-input">
                    <nx-icon fileName="comment"></nx-icon>
                    Subs
                </label>
            </div>
        </div>
        `;
    }

    private makeSettingsTab() {
        return html`
        <form>
            <div class="form-field">
                <label for="desync-input">
                    <nx-icon fileName="timeline-clock"></nx-icon>
                    Desync
                </label>
                <input
                    @input=${this.handleDesyncInput}
                    @focus=${this.handleDesyncFocus}
                    type="number" id="desync-input" class="desync-input" placeholder="0" />
            </div>
        </form>
        `;
    }
    private makeLayoutTab() {
        return html`<p>Soon...</p>`;
    }

    static styles = [
        formStyles,
        css`
    :host {
        display: flex;
        align-items: center;
        min-height: 3rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--primary-color);
    }
    .uploads-tab {
        display: flex;
        gap: 1rem;
        align-items: center;

        label {
            display: flex;
            align-items: center;
            gap: .3rem;
            padding: .3rem .6rem;
            transition: all .15s ease-in;
        }
        label:hover {
            background-color: var(--primary-color);
            cursor: pointer;
        }
    }
    input[type=file] {
        width: 1px; height: 1px;
        position: absolute; top: -100; right: -100;
    }
    nx-icon {
        width: 2rem; height: 2rem;
        background-size: 2rem;
    }
    .form-field {
        flex-direction: row;
        align-items: center;
        gap: 1rem;

        label {
            display: flex;
            align-items: center;
            gap: .3rem;
        }
    }
    `];
}
