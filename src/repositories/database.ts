export default class Database {
  constructor(private db: any) {}

  public async get(key: string): Promise<any> {
    return this.db.get(key);
  }

  public async set(key: string, value: any): Promise<any> {
    return this.db.set(key, value);
  }

  public async del(key: string): Promise<any> {
    return this.db.del(key);
  }
}
