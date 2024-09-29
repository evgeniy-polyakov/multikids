"use client"

import {ActionCode, Keyboard} from "@/components/Keyboard";
import {Game} from "@/components/Game";
import {useEffect, useState} from "react";
import {Score} from "@/components/Score";
import {SFX} from "@/components/SFX";
import {HistoryModel} from "@/models/HistoryModel";

export function Main({basePath}: {
    basePath: string
}) {

    const [newEquation, setNewEquation] = useState(true);
    const [input, setInput] = useState(-1);
    const [score, setScore] = useState(0);
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (!init) {
            SFX.basePath = basePath;
            SFX.load("clear", "lose", "shot", "win");
            HistoryModel.read();
            setScore(HistoryModel.getScore());
            setInit(true);
        }
    }, []);

    function onInput(value: number) {
        switch (value) {
            case ActionCode.Delete:
                setInput(-1);
                SFX.play("clear");
                break;
            case ActionCode.Enter:
                if (input > -1) {
                    setInput(-1);
                    setNewEquation(true);
                }
                break;
            default:
                SFX.play("shot");
                if (input < 0) {
                    setInput(value);
                } else {
                    const newInput = input * 10 + value;
                    if (newInput <= 100) {
                        setInput(newInput);
                    }
                }
        }
    }

    return <main>
        <Game newEquation={newEquation} setNewEquation={setNewEquation} input={input} onScore={value => {
            setScore(score + value);
            HistoryModel.setScore(score + value);
        }}/>
        {init && <Keyboard onClick={onInput}/>}
        {init && <Score value={score}/>}
    </main>;
}