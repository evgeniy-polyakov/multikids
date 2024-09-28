export type Dict<K extends keyof any, V> = {
    [index in K]?: V;
};

export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
}

export function array<T>(generator: (index: number) => T): T[] & { generator: (index: number) => T };
export function array<T>(generator: (index: number) => T, length: number): T[] & { generator: (index: number) => T };
export function array<T>(generator: (index: number, value: any) => T): T[] & { generator: (index: number, value: any) => T };
export function array<T, P extends object, K extends keyof P, V extends P[K]>(generator: (key: K, value: V) => T, data: P): T[] & { generator: (key: K, value: V) => T };
export function array<T, P extends object, K extends keyof P, V extends P[K]>(generator: (key: K, value: V) => T, data?: number | P): T[] & { generator: (key: K, value: V) => T } {
    const ar: T[] & { generator: (key: K, value: V) => T } = [] as any;
    ar.generator = generator;
    if (typeof data === "number") {
        for (let i = 0; i < data; i++) {
            ar.push(generator(i as K, undefined!));
        }
    } else if (typeof data === "object") {
        for (const p of Object.getOwnPropertyNames(data)) {
            ar.push(generator(p as K, (data as any)[p]));
        }
    }
    return ar;
}

export function dict<K extends keyof any, V>(ar: K[], mapper: (k: K, i: number) => V): Dict<K, V> {
    return ar.reduce((a, t, i) => {
        a[t] = mapper(t, i);
        return a;
    }, {} as Dict<K, V>);
}