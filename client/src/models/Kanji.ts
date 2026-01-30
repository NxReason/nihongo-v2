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
}

export interface KanjiSelectedEventDetail {
    kanji: Kanji
}
