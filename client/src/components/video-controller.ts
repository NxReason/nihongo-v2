import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { VideoPlayer } from './video-player';
import type { VideoSubs } from './video-subs';

@customElement('video-controller')
export class VideoController extends LitElement {
  @state() videoURL: string = '';
  @state() desync: number = 0.0;

  private player!: VideoPlayer;
  private subs!: VideoSubs;

  constructor() {
    super();

    // @ts-ignore
    this.addEventListener('video-uploaded', (e: CustomEvent) => {
      const { file } = e.detail;
      this.videoURL = URL.createObjectURL(file);
    });

    // @ts-ignore
    this.addEventListener('video-time-updated', (e: CustomEvent) => {
      const currentTime = e.detail.ts * 1000;
      this.subs.setCurrentTime(currentTime);
    });

    // @ts-ignore
    this.addEventListener('sub-clicked', (e: CustomEvent) => {
      const { sub } = e.detail;
      this.player.setCurrentTime(sub.start / 1000 - this.desync);
    });
    // @ts-ignore
    this.addEventListener('desync-set', (e: CustomEvent) => {
      const { desync } = e.detail;
      this.desync = desync;
    });
  }

  protected firstUpdated(): void {
    this.player = this.shadowRoot?.querySelector<VideoPlayer>('video-player')!;
    this.subs = this.shadowRoot?.querySelector<VideoSubs>('video-subs')!;
  }

  render() {
    return html`
      <video-player .url=${this.videoURL}></video-player>
      <video-subs></video-subs>
    `;
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 'player subs';
      gap: 1rem;
    }

    video-player {
      grid-area: player;
    }

    video-subs {
      grid-area: subs;
      min-height: 600px;
    }
  `;
}
