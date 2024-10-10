import {AnswerModel, EquationModel, Equations, Operator, parseEquation} from "@/models/EquationModel";
import {Dispatch, useEffect, useState} from "react";
import {Random} from "@/core/Random";
import {classList} from "@/components/classList";
import {GameModel} from "@/models/GameModel";
import {SFX} from "@/components/SFX";

export type NewEquation = "insert" | "replace" | false;

export function Game({newEquation, setNewEquation, input, gameModel}: {
    newEquation: NewEquation,
    setNewEquation: Dispatch<NewEquation>,
    input: number,
    gameModel: GameModel,
}) {

    const [equationModel, setEquationModel] = useState<EquationModel>();
    const [answer, setAnswer] = useState(-1);
    const [history, setHistory] = useState<AnswerModel[]>([]);

    useEffect(() => {
        if (newEquation) {
            if (!equationModel) {
                setHistory(gameModel.getHistory());
            }
            addNewEquation();
        }
    }, [newEquation]);

    useEffect(() => {
        if (equationModel && input > -1) {
            setAnswer(input);
        }
    }, [input]);

    function addNewEquation() {
        if (equationModel && newEquation === "insert") {
            const equationStruct = parseEquation(equationModel);
            const correct = answer === equationStruct[equationStruct.question];
            const answerModel: AnswerModel = [equationModel, answer, correct];
            setHistory([...history, answerModel]);
            gameModel.addHistory(answerModel);
            if (correct) {
                gameModel.addScore(equationStruct.score);
            } else {
                gameModel.addScore(-answer);
            }
            if (correct) {
                SFX.play("win");
            } else {
                SFX.play("lose", 0.6);
            }
        }
        const failures = gameModel.getFailures();
        if (failures.length > 0 && Random.bool()) {
            setEquationModel(Random.item(failures));
        } else {
            const successes = gameModel.getSuccesses();
            const equations = Equations.filter(it => !successes[it]);
            setEquationModel(Random.item(equations.length > 0 ? equations : Equations));
        }
        setAnswer(-1);
        setNewEquation(false);
    }

    return <div className="game">
        {history.map(([e, a, r], i) =>
            <Equation key={i} model={e} input={a} correct={r}/>)}
        {equationModel && <Equation model={equationModel} input={input}/>}
    </div>
}

function Equation({model, input, correct}: {
    model: EquationModel,
    input: number,
    correct?: boolean,
}) {
    const equationStruct = parseEquation(model);

    function getMember(index: 0 | 1 | 2) {
        if (equationStruct.question === index) {
            return <Input value={equationStruct[index]} input={input}/>;
        }
        return <span>{equationStruct[index]}</span>;
    }

    return <article className={classList("equation", correct === undefined ? "none" : correct ? "win" : "lose")}>
        {getMember(0)}&nbsp;
        <span>{equationStruct.operator === Operator.Multi ? "*" : ":"}</span>&nbsp;
        {getMember(1)}&nbsp;
        <span>=</span>&nbsp;
        {getMember(2)}
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
