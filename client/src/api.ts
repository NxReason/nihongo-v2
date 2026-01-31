import Kanji from "./models/Kanji";

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

type KanjiListResponse = {
    state: 'success',
    kanjiList: Kanji[]
}
type KanjiResponse = {
    state: 'success',
    kanji: Kanji
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

