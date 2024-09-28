"use client"

import {ActionCode, Keyboard} from "@/components/Keyboard";
import {Game} from "@/components/Game";
import {useState} from "react";
import {Score} from "@/components/Score";
import {SFX} from "@/components/SFX";

export function Main({basePath}: {
    basePath: string
}) {

    const [newEquation, setNewEquation] = useState(true);
    const [input, setInput] = useState(-1);
    const [score, setScore] = useState(0);

    SFX.basePath = basePath;

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
        <Game newEquation={newEquation} setNewEquation={setNewEquation} input={input} onScore={value => setScore(score + value)}/>
        <Keyboard onClick={onInput}/>
        <Score value={score}/>
    </main>;
}