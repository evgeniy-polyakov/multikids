import {Howl} from "howler";

export class SFX {

    static basePath = "";
    private static cache: Record<string, Howl> = {};

    static load(...names: string[]) {
        for (const name of names) {
            if (this.cache[name]) {
                continue;
            }
            const audio = new Howl({src: `${this.basePath}/audio/${name}.mp3`});
            audio.load();
            this.cache[name] = audio;
        }
    }

    static play(name: string, volume = 1) {
        this.load(name);
        const howl = this.cache[name];
        if (howl) {
            howl.volume(volume);
            howl.play();
        }
    }

    static loop(name: string, volume = 1) {
        this.load(name);
        const howl = this.cache[name];
        if (howl) {
            howl.volume(volume);
            howl.loop(true);
            howl.play();
        }
    }
}