import { css, html, LitElement, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement('video-player')
export class VideoPlayer extends LitElement {
    @property() url!: string;
    @state() loaded: boolean = false;
    private player!: HTMLVideoElement;

    firstUpdated() {
        this.player = this.shadowRoot?.querySelector<HTMLVideoElement>('video')!;
        this.player.volume = 0.3;
        this.player.addEventListener('loadedmetadata', () => this.loaded = true);
        this.player.addEventListener('timeupdate', this.sendTimeUpdate.bind(this));
    }

    protected updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('url') && this.url !== '') {
            this.player.src = this.url;
            // this.player.load();
        }
    }

    sendTimeUpdate() {
        const options = {
            detail: { ts: this.player.currentTime },
            bubbles: true, composed: true,
        }
        const event = new CustomEvent('video-time-updated', options);
        this.dispatchEvent(event);
    }

    getCurrentTime(): number {
        if (!this.loaded) return 0;
        return this.player.currentTime;
    }

    setCurrentTime(ts: number) {
        if (!this.loaded) return;
        this.player.currentTime = ts;
    }

    render() {
        return html`
        <video controls>
            Your browser does not support the video tag
        </video>
        `;
    }

    static styles = css`
    video {
        max-width: 100%;
        width: 100%;
        height: auto;
    }
    `;
}
