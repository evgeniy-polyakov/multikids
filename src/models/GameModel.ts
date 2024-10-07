import {AnswerModel, EquationModel} from "@/models/EquationModel";
import {useEffect, useState} from "react";

type HistoryEntry = [date: number, ...AnswerModel];

interface GameData {
    score: number;
    history: HistoryEntry[];
    unlocked: string[];
    failures: EquationModel[];
    successes: Record<EquationModel, boolean>;
}

export class GameModel {

    private readonly defaultUnlocked = ["bg1"];
    private readonly price: Record<string, number> = {
        "bg2": 1000,
        "bg3": 2000,
        "bg4": 3000,
    };

    constructor(private readonly state: GameData,
                private readonly setState: (value: GameData) => void) {
    }

    addHistory(value: AnswerModel) {
        const history = this.state.history;
        history.push([new Date().getTime(), ...value]);
        while (history.length > 1000) {
            history.shift();
        }
        const failures = this.state.failures;
        const [equation, , result] = value;
        if (result) {
            this.state.failures = failures.filter(it => it !== equation);
            this.state.successes[equation] = true;
        } else {
            if (failures.indexOf(equation) < 0) {
                failures.push(equation);
                while (failures.length > 100) {
                    failures.shift();
                }
            }
        }
        this.modify();
    }

    setScore(value: number) {
        this.state.score = value;
        this.modify();
    }

    addScore(value: number) {
        this.state.score += value;
        this.modify();
    }

    getHistory() {
        return this.state.history.map(it => it.slice(1) as AnswerModel) ?? [];
    }

    getScore() {
        return this.state.score;
    }

    getFailures() {
        return this.state.failures;
    }

    getSuccesses() {
        return this.state.successes;
    }

    isUnlocked(item: string) {
        return this.defaultUnlocked.indexOf(item) >= 0 || this.state.unlocked.indexOf(item) >= 0;
    }

    getPrice(item: string) {
        return this.price[item] ?? 0;
    }

    purchase(item: string) {
        if (this.isUnlocked(item)) {
            return false;
        }
        const price = this.getPrice(item);
        if (price <= this.state.score) {
            this.state.score -= price;
            this.state.unlocked.push(item);
            this.modify();
            return true;
        }
        return false;
    }

    modify() {
        this.setState({...this.state});
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
        if (typeof data.successes !== "object") data.successes = {};
        return data;
    } catch (e) {
        data = {
            score: 0,
            history: [],
            unlocked: [],
            failures: [],
            successes: {},
        };
    }
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