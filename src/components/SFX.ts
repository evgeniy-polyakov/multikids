export class SFX {

    static basePath = "";

    static async play(name: string) {
        const audio = new Audio(`${this.basePath}/audio/${name}.mp3`);
        await audio.play();
    }
}