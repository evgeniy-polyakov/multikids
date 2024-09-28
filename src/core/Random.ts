export class Random {

    static bool(chance = 0.5): boolean {
        return Math.random() < chance;
    }

    static sign(): number {
        return Math.random() < 0.5 ? -1 : 1;
    }

    static item<T>(items: T[], chance?: (item: T) => number): T {
        if (chance) {
            const total = items.reduce((a, t) => a + chance(t), 0);
            let random = this.float(total);
            for (const item of items) {
                random -= chance(item);
                if (random < 0) {
                    return item;
                }
            }
        }
        return items[Math.floor(Math.random() * items.length)];
    }

    static float(min?: number, max?: number): number {
        const r = Math.random();
        if (min !== undefined && max !== undefined) {
            const M = Math.max(min, max);
            const m = Math.min(min, max);
            return r * (M - m) + m;
        }
        if (min !== undefined) {
            return r * min;
        }
        return r;
    }

    static integer(min: number, max?: number): number {
        return Math.floor(Random.float(min, max));
    }

    static normal(min?: number, max?: number): number {
        const r = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 6;
        if (min !== undefined && max !== undefined) {
            const M = Math.max(min, max);
            const m = Math.min(min, max);
            return r * (M - m) + m;
        }
        if (min !== undefined) {
            return r * min;
        }
        return r;
    }

    static normalSkewed(min: number, mid: number, max: number): number {
        if (min > max) {
            min = max;
        }
        if (mid < min) {
            mid = min;
        }
        if (mid > max) {
            mid = max;
        }
        let r = Random.normal();
        const m = (mid - min) / (max - min);

        if (r < 0.5) {
            r = 2 * r * m;
        } else {
            r = 1 - 2 * (1 - r) * (1 - m);
        }
        return min + r * (max - min);
    }

    static shuffle<T>(array: T[]): T[] {
        for (let n = array.length - 1; n > 0; n--) {
            const r = Math.floor(Math.random() * (n + 1));
            if (r !== n) {
                const t = array[r];
                array[r] = array[n];
                array[n] = t;
            }
        }
        return array;
    }

    static next<T>(array: T[]): T {
        const item = array.shift()!;
        this.shuffle(array);
        array.push(item);
        return item;
    }

    static cycle<T>(array: T[]): T {
        const item = array.shift()!;
        array.push(item);
        return item;
    }
}