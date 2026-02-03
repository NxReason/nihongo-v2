import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Sub, { subsFromSRT } from '../models/Sub';
import type { SubsList } from './subs-list';

type TAB = 'uploads' | 'settings' | 'layout';

@customElement('video-subs')
export class VideoSubs extends LitElement {
  @property() tab: TAB = 'uploads';

  @state() desync: number = 0;
  @state() subs: Sub[] = [];

  private subsList!: SubsList;

  constructor() {
    super();

    this.addEventListener('subs-uploads-picked', () => {
      this.tab = 'uploads';
    });
    this.addEventListener('subs-settings-picked', () => {
      this.tab = 'settings';
    });
    this.addEventListener('subs-layout-picked', () => {
      this.tab = 'layout';
    });

    // @ts-ignore
    this.addEventListener('subs-uploaded', (e: CustomEvent) => {
      const { file } = e.detail;
      this.parseSubs(file);
    });
    // @ts-ignore
    this.addEventListener('desync-set', (e: CustomEvent) => {
      const { desync } = e.detail;
      this.desync = desync * 1000;
    });
  }

  firstUpdated() {
    this.subsList = this.shadowRoot?.querySelector<SubsList>('subs-list')!;
  }

  public setCurrentTime(ts: number) {
    const currentSub = this.bSearchSub(ts + this.desync);
    if (!currentSub) return;

    this.subsList.setCurrentSub(currentSub);
  }

  private async parseSubs(file: File) {
    const data = await file.text();
    this.subs = subsFromSRT(data);
  }

  render() {
    return html`
      <subs-controls></subs-controls>
      <subs-menu .tab=${this.tab}></subs-menu>
      <subs-list .subs=${this.subs}></subs-list>
    `;
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-rows: 2.4rem 6rem 70vh;
    }
  `;

  private bSearchSub(ts: number): Sub | null {
    let start = 0;
    let end = this.subs.length;
    while (start < end) {
      let check = Math.floor((end + start) / 2);
      switch (this.checkSubInterval(ts, this.subs[check])) {
        case 1:
          {
            start = check + 1;
          }
          continue;
        case -1:
          {
            end = check;
          }
          break;
        case 0:
          return this.subs[check];
      }
    }
    return null;
  }
  private checkSubInterval(ts: number, sub: Sub): -1 | 0 | 1 {
    if (ts < sub.start) return -1;
    if (ts > sub.end) return 1;
    return 0;
  }
}
