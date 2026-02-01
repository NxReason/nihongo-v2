import Kanji from "./models/Kanji";
import Word from "./models/Word";

const BASE_URL = 'http://localhost:8000/api';
const HEADERS = {
    'Content-Type': 'application/json'
}

export const kanji = {
    url: BASE_URL + '/kanji',

    async all(): Promise<Kanji[]> {
        const response = await fetch(this.url);
        const data = await response.json();
        const result = data.map(Kanji.fromJSON);
        return result;
    },

    async create(kanjiForm: Kanji): Promise<KanjiResponse | APIError> {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: HEADERS,
                body: Kanji.toJSON(kanjiForm),
            });
            const responseJson = await response.json();
            if (!response.ok) {
                return { state: 'errorUser', detail: responseJson.detail };
            }

            const kanji = Kanji.fromJSON(responseJson);
            return { state: 'success', kanji };
        }
        catch (err) {
            console.error(err);
            return { state: 'errorDev', msg: `Can't create Kanji` }
        }
    },

    async update(kanjiForm: Kanji): Promise<KanjiResponse | APIError> {
        try {
            const response = await fetch(this.url + '/' + kanjiForm.id, {
                method: 'PUT',
                headers: HEADERS,
                body: Kanji.toJSON(kanjiForm),
            });
            const responseJson = await response.json();
            if (!response.ok) {
                return { state: 'errorUser', detail: responseJson.detail }
            }
            return { state: 'success', kanji: Kanji.fromJSON(responseJson) };
        }
        catch (err) {
            console.error(`API error: ${err}`)
            return { state: 'errorDev', msg: `Can't update Kanji with id: ${kanjiForm.id}` };
        }
    },

    async remove(id: number): Promise<KanjiResponse | APIError> {
        try {
            const response = await fetch(this.url + '/' + id, { method: 'DELETE' });
            const responseJson = await response.json();
            if (!response.ok) {
                return { state: 'errorUser', detail: responseJson.detail };
            }
            return { state: 'success', kanji: Kanji.fromJSON(responseJson) };
        }
        catch (err) {
            console.error(`API error: ${err}`);
            return { state: 'errorDev', msg: `Can't delete kanji with id: ${id}` };
        }
    }
};

export const wordsAPI = {
    url: BASE_URL + '/words',

    async all(): Promise<Word[]> {
        const response = await fetch(this.url);
        const json = await response.json();
        return json.map(Word.fromJSON);
    },
    async create(word: Word): Promise<WordResponse | APIError> {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                body: Word.toJSON(word),
                headers: HEADERS,
            });
            const json = await response.json();
            if (!response.ok) {
                return { state: 'errorUser', detail: json.detail };
            }
            return { state: 'success', word: Word.fromJSON(json) };
        }
        catch (err) {
            console.error(`API Error: ${err}`);
            return { state: 'errorDev', msg: `Can't create new word` };
        }
    },
    async update(word: Word): Promise<WordResponse | APIError> {
        try {
            const res = await fetch(this.url + '/' + word.id, {
                method: 'PUT',
                body: Word.toJSON(word),
                headers: HEADERS,
            });
            const json = await res.json();
            if (!res.ok) {
                return { state: 'errorUser', detail: json.detail };
            }
            return { state: 'success', word: Word.fromJSON(json) };
        }
        catch (err) {
            console.error(`API Error: ${err}`);
            return { state: 'errorDev', msg: `Can't update word with id: ${word.id}` };
        }
    },
    async remove(id: number): Promise<WordResponse | APIError> {
        try {
            const res = await fetch(this.url + '/' + id, { method: 'DELETE' });
            const json = await res.json();
            if (!res.ok) {
                return { state: 'errorUser', detail: json.detail };
            }
            return { state: 'success', word: Word.fromJSON(json) };
        }
        catch (err) {
            console.error(`API Error: ${err}`);
            return { state: 'errorDev', msg: `Can't delete word with id: ${id}` };
        }
    },
}

type KanjiResponse = {
    state: 'success',
    kanji: Kanji
}
type WordResponse = {
    state: 'success',
    word: Word,
}
type DevError = {
    state: 'errorDev',
    msg: string
};
type UserError = {
    state: 'errorUser',
    detail: string[]
}
type APIError = DevError | UserError;

