export class SFX {

    static async play(name: string) {
        const audio = new Audio(`/audio/${name}.mp3`);
        await audio.play();
    }
}