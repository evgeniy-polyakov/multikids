import {AnswerModel, EquationModel} from "@/models/EquationModel";
import {useEffect, useState} from "react";

type HistoryEntry = [date: number, ...AnswerModel];

interface GameData {
    score: number;
    background: string;
    history: HistoryEntry[];
    unlocked: string[];
    failures: EquationModel[];
    successes: Record<EquationModel, boolean>;
}

const defaultUnlocked = ["bg1"];
const price: Record<string, number> = {
    "bg2": 1000,
    "bg3": 2000,
    "bg4": 3000,
};
const allBg = [1, 2, 3, 4].map(i => `bg${i}`);

export class GameModel {

    constructor(private readonly data: GameData,
                private readonly setData: (value: GameData) => void) {
    }

    addHistory(value: AnswerModel) {
        const history = this.data.history;
        history.push([new Date().getTime(), ...value]);
        while (history.length > 1000) {
            history.shift();
        }
        const failures = this.data.failures;
        const [equation, , result] = value;
        if (result) {
            this.data.failures = failures.filter(it => it !== equation);
            this.data.successes[equation] = true;
        } else {
            if (failures.indexOf(equation) < 0) {
                failures.push(equation);
                while (failures.length > 100) {
                    failures.shift();
                }
            }
        }
        this.update();
    }

    setScore(value: number) {
        this.data.score = value;
        this.update();
    }

    addScore(value: number) {
        this.data.score += value;
        this.update();
    }

    setBg(value: string) {
        this.data.background = value;
        this.update();
    }

    getHistory() {
        return this.data.history.map(it => it.slice(1) as AnswerModel) ?? [];
    }

    getScore() {
        return this.data.score;
    }

    getFailures() {
        return this.data.failures;
    }

    getSuccesses() {
        return this.data.successes;
    }

    isUnlocked(item: string) {
        return defaultUnlocked.indexOf(item) >= 0 || this.data.unlocked.indexOf(item) >= 0;
    }

    getPrice(item: string) {
        return price[item] ?? 0;
    }

    getBg() {
        return this.data.background;
    }

    purchase(item: string) {
        if (this.isUnlocked(item)) {
            return false;
        }
        const price = this.getPrice(item);
        if (price <= this.data.score) {
            this.data.score -= price;
            this.data.unlocked.push(item);
            this.update();
            return true;
        }
        return false;
    }

    private update() {
        this.setData({...this.data});
    }
}

const gameDataKey = "multikids-data1";

function readGameData(): GameData {
    let data: GameData;
    try {
        data = JSON.parse(localStorage.getItem(gameDataKey) ?? "{}");
        if (isNaN(data.score)) data.score = 0;
        if (!Array.isArray(data.history)) data.history = [];
        if (!Array.isArray(data.unlocked)) data.unlocked = [];
        if (!Array.isArray(data.failures)) data.failures = [];
    } catch (e) {
        data = {
            score: 0,
            background: "bg1",
            history: [],
            unlocked: [],
            failures: [],
            successes: {},
        };
    }
    const bg = data.background;
    if (allBg.indexOf(bg) < 0) {
        data.background = allBg[0];
    }
    data.successes = {};
    data.history.forEach(it => {
        const [, equation, , result] = it;
        if (result) {
            data.successes[equation] = true;
        }
    });
    return data;
}

function writeGameData(data: Partial<GameData>) {
    data = {...data};
    delete data.successes;
    localStorage.setItem(gameDataKey, JSON.stringify(data));
}

export function useGameModel() {
    const [data, setData] = useState(readGameData);
    useEffect(() => {
        writeGameData(data);
    }, [data]);
    return new GameModel(data, setData);
}