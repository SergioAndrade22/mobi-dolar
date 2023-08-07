import { Storage } from '@ionic/storage';

export class StoreManager<T> {
    private store: Storage

    constructor() {
        this.store = new Storage();
    }

    async init() {
        await this.store.create();
    }

    public setItem(key: string, item: T) {
        this.store.set(key, JSON.stringify(item))
    }

    public async getItem(key: string): Promise<T> {
       return JSON.parse(await this.store.get(key))
    }
}