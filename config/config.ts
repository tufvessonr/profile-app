const ENV = new class {
  public readonly PROFILE_API_URL = 'https://randomuser.me/api/';

  constructor() {
    const keys = Object.keys(this);
    const missing: string[] = [];
    for (const k of keys) {
      const v = process.env[k] || (this as any)[k];
      if (!v) {
        missing.push(k);
      } else {
        (this as any)[k] = v;
      }
    }
    if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
      throw new Error(`Required environment variables missing: ['${missing.join("','")}']`);
    }
  }
}();

const CONFIG = new class {
  public readonly PROFILE_API_URL = ENV.PROFILE_API_URL;
}();

export default CONFIG;
