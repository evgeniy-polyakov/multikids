import {EquationModel, Equations, Operator} from "@/models/EquationModel";
import {Dispatch, useEffect, useState} from "react";
import {Random} from "@/core/Random";
import {classList} from "@/components/classList";

export function Game({newEquation, setNewEquation, input, onScore}: {
    newEquation: boolean,
    setNewEquation: Dispatch<boolean>,
    input: number,
    onScore: (value: number) => void,
}) {

    const [equationModel, setEquationModel] = useState<EquationModel>();
    const [answer, setAnswer] = useState(-1);
    const [history, setHistory] = useState<[...EquationModel, correct: boolean][]>([]);

    useEffect(() => {
        if (newEquation) {
            if (equationModel) {
                const correct = answer === equationModel[equationModel.length - 1];
                setHistory([...history, [...equationModel, correct]]);
                const score = Math.max(1, equationModel[3]);
                onScore(correct ? score : -score);
            }
            setEquationModel(Random.item(Equations));
            setAnswer(-1);
            setNewEquation(false);
        }
    }, [newEquation]);

    useEffect(() => {
        if (equationModel && input > -1) {
            setAnswer(input);
        }
    }, [input]);

    return <div className="game">
        {history.map(([o, a, b, c, r], i) =>
            <Equation key={i} model={[o, a, b, c]} input={c} correct={r}/>)}
        {equationModel && <Equation model={equationModel} input={input}/>}
    </div>
}

function Equation({model, input, correct}: {
    model: EquationModel,
    input: number,
    correct?: boolean,
}) {
    const [action, a, b, c] = model;
    return <article className={classList("equation", correct === undefined ? "none" : correct ? "win" : "lose")}>
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