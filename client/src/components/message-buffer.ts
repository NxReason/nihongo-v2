export class MessageBuffer {
    constructor(
        public limit: number = 3,
        readonly messages: Map<string, string> = new Map<string, string>()
    ) { }

    push(text: string) {
        const id = crypto.randomUUID();
        this.messages.set(id, text);
        while (this.messages.size > this.limit) {
            const first: string | undefined = this.messages.keys().next().value;
            this.messages.delete(first!);
        }
    }
}
