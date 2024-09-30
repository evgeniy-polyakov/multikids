import {array} from "@/core/Collections";

export enum Operator {
    Multi = "*",
    Div = "/",
}

export type EquationModel = [o: Operator, a: number, b: number, c: number];
export type ResultModel = [...EquationModel, result: boolean];

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

export const Equations = [
    ...MultiplicationTable.reduce((a, t) => [...a, ...t], [] as Number3[])
        .map(it => [Operator.Multi, ...it] as EquationModel),
    ...DivisionTable.reduce((a, t) => [...a, ...t], [] as Number3[])
        .reduce((a, t) => {
            const k = t.join("");
            if (a.map[k]) return a;
            a.map[k] = true;
            a.result.push(t);
            return a;
        }, {result: [] as Number3[], map: {} as Record<string, boolean>}).result
        .map(it => [Operator.Div, ...it] as EquationModel)
].sort(([o1, a1, b1, c1], [o2, a2, b2, c2]) => {
    if (o1 === o2) {
        if (a1 === a2) {
            return b1 - b2;
        }
        return a1 - a2;
    }
    return o1 === Operator.Multi ? -1 : 1;
});

export function equalEquations(eq1: EquationModel, eq2: EquationModel) {
    return eq1[0] === eq2[0] &&
        eq1[1] === eq2[1] &&
        eq1[2] === eq2[2] &&
        eq1[3] === eq2[3];
}