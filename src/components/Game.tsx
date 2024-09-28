import {EquationModel, Operator} from "@/models/EquationModel";
import {Dispatch, useEffect, useState} from "react";
import {array} from "@/core/Collections";
import {Random} from "@/core/Random";

type Number3 = [number, number, number];
const MultiplicationTable = array(i =>
    array(j => [i, j, i * j] as Number3, 11), 11);
const DivisionTable = MultiplicationTable.map(it => it.reduce((a, t) => {
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

const Equations = [
    ...MultiplicationTable.reduce((a, t) => [...a, ...t], [] as Number3[])
        .map(it => [Operator.Multi, ...it] as EquationModel),
    ...DivisionTable.reduce((a, t) => [...a, ...t], [] as Number3[])
        .reduce((a, t) => {
            const k = t.join('');
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

export function Game({newEquation, setNewEquation, input}: {
    newEquation: boolean,
    setNewEquation: Dispatch<boolean>,
    input: number,
}) {

    const [equationModel, setEquationModel] = useState<EquationModel>();

    useEffect(() => {
        if (newEquation) {
            setEquationModel(Random.item(Equations));//Equations[Equations.length - 1]);
            setNewEquation(false);
        }
    }, [newEquation]);

    return <div className="game">
        {equationModel && <Equation model={equationModel} input={input}/>}
    </div>
}

function Equation({model, input}: {
    model: EquationModel,
    input: number,
}) {
    const [action, a, b, c] = model;
    return <article className="equation">
        <span>{a}</span>&nbsp;
        <span>{action === Operator.Multi ? "*" : ":"}</span>&nbsp;
        <span>{b}</span>&nbsp;
        <span>=</span>&nbsp;
        <Input value={c} input={input}/>
    </article>
}

function Input({input, value}: {
    input: number,
    value: number,
}) {
    return <span className="input">
        <span className="input">{input < 0 ? "?" : input}</span>
        <span className="value">{value}</span>
    </span>
}