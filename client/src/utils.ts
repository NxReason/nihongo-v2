export function takeRandom<T>(col: Array<T>, count: number) {
    const shortest: number = col.length < count ? col.length : count;
    const copy = col.slice();
    for (let i = 0; i < shortest; i++) {
        const picked = randomRange(i, copy.length);
        swap(copy, i, picked);
    }
    return copy.slice(0, shortest);
}

function swap<T>(col: Array<T>, idxA: number, idxB: number): void {
    const temp = col[idxA];
    col[idxA] = col[idxB];
    col[idxB] = temp;
}

function randomRange(min: number, max: number): number {
    const delta = max - min;
    return Math.floor(Math.random() * delta) + min;
}
