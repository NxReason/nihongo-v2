import Kanji from "./models/Kanji";

const BASE_URL = 'http://localhost:8000/api';

export const kanji = {
    url: BASE_URL + '/kanji',
    async all(): Promise<Kanji[]> {
        const response = await fetch(this.url);
        const data = await response.json();
        const result = data.map(Kanji.fromJSON);
        return result;
    }
};


