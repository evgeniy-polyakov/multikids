import {ResultModel} from "@/models/EquationModel";

export class HistoryModel {

    private static init = false;
    private static score = 0;
    private static history: [date: number, ...ResultModel][] = [];

    static addHistory(value: ResultModel) {
        if (!this.init) {
            return;
        }
        this.history?.push([new Date().getTime(), ...value]);
        while (this.history && this.history.length > 100) {
            this.history.shift();
        }
        this.write();
    }

    static setScore(value: number) {
        if (!this.init) {
            return;
        }
        this.score = value;
        this.write();
    }

    static read() {
        if (!this.init) {
            this.init = true;
            try {
                const {score, history} = JSON.parse(localStorage.getItem("multikids-data") ?? "{}");
                this.score = !isNaN(parseInt(score)) ? parseInt(score) : 0;
                this.history = Array.isArray(history) ? history : [];
            } catch (e) {
                this.score = 0;
                this.history = [];
            }
        }
    }

    static write() {
        localStorage.setItem("multikids-data", JSON.stringify({
            score: this.score,
            history: this.history,
        }));
    }

    static getHistory() {
        return this.history?.map(it => it.slice(1) as ResultModel) ?? [];
    }

    static getScore() {
        return this.score;
    }
}