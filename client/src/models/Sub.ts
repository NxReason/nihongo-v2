const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
export default class Sub {
    constructor(
        readonly id: number,
        readonly start: number,
        readonly end: number,
        readonly text: string[]
    ) { }

    static fromArray(arr: string[]): Sub {
        const id = parseInt(arr[0]);
        const ts = parseInterval(arr[1]);
        return new Sub(id, ts[0], ts[1], arr.slice(2));
    }

    startFormat(): string {
        let rest = this.start;
        const h = Math.floor(rest / HOUR);
        const hFmt = h > 0 ? `${padZero(h)}:` : '';
        rest -= h * HOUR;
        const m = Math.floor(rest / MINUTE);
        rest -= m * MINUTE;
        const s = Math.floor(rest / SECOND);
        return `${hFmt}${padZero(m)}:${padZero(s)}`;
    }
}

export function subsFromSRT(data: string): Sub[] {
    const result: Sub[] = [];
    const lines: string[] = data.split('\n');
    for (let sg = findNextSubGroup(lines, 0); sg; sg = findNextSubGroup(lines, sg[1])) {
        const [from, to] = sg;
        result.push(Sub.fromArray(lines.slice(from, to)));
    }
    return result;
}

function findNextSubGroup(lines: string[], from: number = 0): [number, number] | undefined {
    let start = from;
    for (let i = start; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line !== '') { start = i; break; }
    }

    let end = start;
    for (let i = end; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') { break; }
        end = i;
    }

    if (start === end) return;

    end++;
    return [start, end];
}

function parseInterval(line: string): [number, number] {
    const [startStr, endStr] = line.split(' --> ');
    return [parseTimestamp(startStr), parseTimestamp(endStr)];
}
function parseTimestamp(str: string): number {
    const [hms, ms] = str.split(',');
    const [h, m, s] = hms.split(':');
    return (
        parseInt(h) * 60 * 60 * 1000 +
        parseInt(m) * 60 * 1000 +
        parseInt(s) * 1000 +
        parseInt(ms)
    );
}

function padZero(value: number): string {
    return value < 10 ? `0${value}` : String(value);
}
