export class Batch<T = any> {

    private page = 0;
    private _data: T[] = [];

    constructor(private action: (page: number) => Promise<(T | T[])>, starter?: any) {
        if(starter)this._data = this._data.concat(starter);
    }

    next() {
        return (async () => {
            const data = await this.action(this.page);
            this.page++;
            this._data = this._data.concat(data);
        })().catch((e) => {
            console.log('Batch Error:', e);
        });
    }


    reset() {
        this.page = 0;
        this._data = [];
        return this.next();
    }

    get step() {
        return this.page;
    }

    get data() {
        return this._data;
    }
}