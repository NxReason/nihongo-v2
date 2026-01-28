import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('page-nav')
export class PageNav extends LitElement {
    @property() current: string = '';

    static styles = css`
    :host {
        width: 100%;
    }
    ul {
        margin: 0;
        padding: 1rem;
        display: flex;
        gap: 1rem;
        list-style: none;
    }
    li {
        display: inline-block;
        padding: 0;
        border: 2px solid var(--primary-color);
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .3rem;
        width: 6rem;
        height: 2rem;
        padding: .2rem 1rem;
        text-decoration: none;
        color: var(--font-color);
        transition: background-color .15s ease-in-out;
    }
    a:hover {
        background-color: var(--primary-color);
    }
    a.active {
        background-color: var(--secondary-color);
    }
    `;

    render() {
        return html`
        <nav>
            <ul>
                <li>
                    <a href="/words" class="${this._isActive('words')}">
                        <nx-icon fileName="dict1"></nx-icon>
                        <span>Words</span>
                    </a>
                </li>

                <li>
                    <a href="/kanji" class="${this._isActive('kanji')}">
                        <nx-icon fileName="kanji1"></nx-icon>
                        <span>Kanji</span>
                    </a>
                </li>

                <li>
                    <a href="/video" class="${this._isActive('video')}">
                        <nx-icon fileName="video4"></nx-icon>
                        <span>Video</span>
                    </a>
                </li>
            </ul>
        </nav>
        `;
    }

    private _isActive(path: string) {
        return path == this.current ? 'active' : '';
    }
}
