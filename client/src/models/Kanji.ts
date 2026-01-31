export default class Kanji {
    id: number | undefined;
    glyph: string = '';
    kunReadings: string[] = [];
    onReadings: string[] = [];
    meanings: string[] = [];

    static fromJSON(json: any): Kanji {
        const k = new Kanji();
        k.id = json.id;
        k.glyph = json.glyph;
        k.kunReadings = json.kun_readings;
        k.onReadings = json.on_readings;
        k.meanings = json.meanings;
        return k;
    }

    static toJSON(kanji: Kanji): string {
        const kanjiPython = {
            id: kanji.id,
            glyph: kanji.glyph,
            kun_readings: kanji.kunReadings,
            on_readings: kanji.onReadings,
            meanings: kanji.meanings,
        }
        return JSON.stringify(kanjiPython);
    }
}

export interface KanjiSelectedEventDetail {
    kanji: Kanji
}
