import {equalEquations, EquationModel, ResultModel} from "@/models/EquationModel";

export class HistoryModel {

    private static init = false;
    private static score = 0;
    private static history: [date: number, ...ResultModel][] = [];
    private static failures: EquationModel[] = [];
    private static modified = false;

    static addHistory(value: ResultModel) {
        if (!this.init) {
            return;
        }
        this.history?.push([new Date().getTime(), ...value]);
        while (this.history && this.history.length > 1000) {
            this.history.shift();
        }
        const result = value[4];
        const equation = value.slice(0, 4) as EquationModel;
        if (result) {
            this.failures = this.failures.filter(it => !equalEquations(it, equation));
        } else {
            if (!this.failures.some(it => equalEquations(it, equation))) {
                this.failures.push(equation);
                while (this.failures.length > 100) {
                    this.failures.shift();
                }
            }
        }
        this.modify();
    }

    static setScore(value: number) {
        if (!this.init) {
            return;
        }
        this.score = value;
        this.modify();
    }

    static read() {
        if (!this.init) {
            this.init = true;
            try {
                const {score, history, failures} = JSON.parse(localStorage.getItem("multikids-data") ?? "{}");
                this.score = !isNaN(parseInt(score)) ? parseInt(score) : 0;
                this.history = Array.isArray(history) ? history : [];
                this.failures = Array.isArray(failures) ? failures : [];
            } catch (e) {
                this.score = 0;
                this.history = [];
                this.failures = [];
            }
        }
    }

    static write() {
        localStorage.setItem("multikids-data", JSON.stringify({
            score: this.score,
            history: this.history,
            failures: this.failures,
        }));
    }

    static getHistory() {
        return this.history?.map(it => it.slice(1) as ResultModel) ?? [];
    }

    static getScore() {
        return this.score;
    }

    static getFailures() {
        return this.failures;
    }

    private static modify() {
        this.modified = true;
        requestAnimationFrame(() => {
            if (this.modified) {
                this.write();
                this.modified = false;
            }
        });
    }
}