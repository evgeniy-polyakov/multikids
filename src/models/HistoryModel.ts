import {ResultModel} from "@/models/EquationModel";

export class HistoryModel {

    private static history?: [date: number, ...ResultModel][];

    constructor() {

    }

    static add(value: ResultModel) {
        this.history?.push([new Date().getTime(), ...value]);
        localStorage.setItem("multikids-log", JSON.stringify(this.history));
    }

    static read() {
        if (!this.history) {
            try {
                this.history = JSON.parse(localStorage.getItem("multikids-log") ?? "[]");
            } catch (e) {
                this.history = [];
            }
        }
        return this.history?.map(it => it.slice(1) as ResultModel) ?? [];
    }
}