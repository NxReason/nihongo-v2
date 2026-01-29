const BASE_URL = 'http://localhost:8000';
class Err {
    constructor(
        readonly msg: string
    ) { }
}
export const kanji = {
    url: BASE_URL + '/kanji',
    async all(): Promise<number | Err> {
        const response = await fetch(this.url + 'asdf');
        console.log(response);
        if (!response.ok) return new Err('Something went wrong');
        return 42;
    }
};


