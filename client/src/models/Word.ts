export default class Word {
    id: number | undefined;
    jp: string = '';
    reading: string = '';
    meanings: string[] = [];

    static fromJSON(json: any): Word {
        const w = new Word();
        w.id = json.id;
        w.jp = json.jp;
        w.reading = json.reading;
        w.meanings = json.meanings;
        return w;
    }

    static toJSON(word: Word): string {
        const wordPython = {
            id: word.id,
            jp: word.jp,
            reading: word.reading,
            meanings: word.meanings,
        }
        return JSON.stringify(wordPython);
    }
}

export interface WordDetail {
    kanji: Word
}
