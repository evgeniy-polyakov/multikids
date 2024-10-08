import {array} from "@/core/Collections";

export enum Operator {
    Multi = "*",
    Div = "/",
}

export type EquationModel =
    `${number}?${Operator}${number}=${number}` |
    `${number}${Operator}${number}?=${number}` |
    `${number}${Operator}${number}=${number}?`;
export type AnswerModel = [EquationModel, answer: number, result: boolean];

type Number3 = [number, number, number];

export const MultiplicationTable = array(i =>
    array(j => [i, j, i * j] as Number3, 11), 11);

export const DivisionTable = MultiplicationTable.map(it => it.reduce((a, t) => {
    const [p, q, r] = t;
    if (p === 0 && q === 0) {
        // 0 / 0
    } else if (r === 0) {
        a.push(p > 0 ? [r, p, q] : [r, q, p]);
    } else {
        a.push([r, p, q], [r, q, p]);
    }
    return a;
}, [] as Number3[]));

function number3toEquation(a: EquationModel[], t: Number3, o: Operator) {
    const [p, q, r] = t;
    if (r !== 0) {
        a.push(`${p}?${o}${q}=${r}`);
        a.push(`${p}${o}${q}?=${r}`);
    }
    a.push(`${p}${o}${q}=${r}?`);
    return a;
}

export const Equations = [
    ...MultiplicationTable.reduce((a, t) => [...a, ...t], [] as Number3[])
        .sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
        .reduce((a, t) => number3toEquation(a, t, Operator.Multi), [] as EquationModel[]),
    ...DivisionTable.reduce((a, t) => [...a, ...t], [] as Number3[])
        .reduce((a, t) => {
            const k = t.join("");
            if (a.map[k]) return a;
            a.map[k] = true;
            a.result.push(t);
            return a;
        }, {result: [] as Number3[], map: {} as Record<string, boolean>}).result
        .sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
        .reduce((a, t) => number3toEquation(a, t, Operator.Div), [] as EquationModel[])
];

export type EquationStruct = {
    operator: Operator,
    question: 0 | 1 | 2,
    score: number,
    [0]: number,
    [1]: number,
    [2]: number,
};

export function parseEquation(equation: EquationModel): EquationStruct {
    const e = /^(\d+\??)([*/])(\d+\??)=(\d+\??)$/.exec(equation);
    if (!e) {
        return {
            operator: Operator.Multi,
            question: 0,
            score: 0,
            [0]: 0, [1]: 0, [2]: 0,
        };
    }
    const q = e[1].lastIndexOf("?") > 0 ? 0 : e[3].lastIndexOf("?") > 0 ? 1 : 2;
    const m = [1, 3, 4].map(i => parseInt(e[i].replace("?", ""))) as [number, number, number];
    return {
        operator: e[2] as Operator,
        question: q,
        ...m,
        score: m[q] ? m[q] : Math.max(...m),
    };
}

export function stringifyEquation(e: EquationStruct): EquationModel {
    return `${e[0]}${e.question === 0 ? "?" : ""}${e.operator}${e[1]}${e.question === 1 ? "?" : ""}=${e[2]}${e.question === 2 ? "?" : ""}` as EquationModel;
}