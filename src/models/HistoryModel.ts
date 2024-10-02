import {AnswerModel, EquationModel} from "@/models/EquationModel";

type HistoryEntry = [date: number, ...AnswerModel];

export class HistoryModel {

    private static readonly dataKey = "multikids-data1";
    private static init = false;
    private static score = 0;
    private static history: HistoryEntry[] = [];
    private static failures: EquationModel[] = [];
    private static successes: Record<EquationModel, boolean> = {};
    private static modified = false;

    static addHistory(value: AnswerModel) {
        if (!this.init) {
            return;
        }
        this.history.push([new Date().getTime(), ...value]);
        while (this.history.length > 1000) {
            this.history.shift();
        }
        const [equation, , result] = value;
        if (result) {
            this.failures = this.failures.filter(it => it !== equation);
            this.successes[equation] = true;
        } else {
            if (this.failures.indexOf(equation) < 0) {
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
                const {score, history, failures} = JSON.parse(localStorage.getItem(this.dataKey) ?? "{}");
                this.score = !isNaN(parseInt(score)) ? parseInt(score) : 0;
                this.history = Array.isArray(history) ? history : [];
                this.failures = Array.isArray(failures) ? failures : [];
            } catch (e) {
                this.score = 0;
                this.history = [];
                this.failures = [];
            }
            this.successes = {};
            this.history.forEach(it => {
                const [, equation, , result] = it;
                if (result) {
                    this.successes[equation] = true;
                }
            });
        }
    }

    static write() {
        localStorage.setItem(this.dataKey, JSON.stringify({
            score: this.score,
            history: this.history,
            failures: this.failures,
        }));
    }

    static getHistory() {
        return this.history?.map(it => it.slice(1) as AnswerModel) ?? [];
    }

    static getScore() {
        return this.score;
    }

    static getFailures() {
        return this.failures;
    }

    static getSuccesses() {
        return this.successes;
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