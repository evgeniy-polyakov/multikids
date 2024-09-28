'use client'

import {ActionCode, Keyboard} from "@/components/Keyboard";
import {Game} from "@/components/Game";
import {useState} from "react";

export function Main() {

    const [newEquation, setNewEquation] = useState(true);
    const [input, setInput] = useState(-1);

    function onInput(value: number) {
        switch (value) {
            case ActionCode.Delete:
                setInput(-1);
                break;
            case ActionCode.Enter:
                setInput(-1);
                setNewEquation(true);
                break;
            default:
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
        <Game newEquation={newEquation} setNewEquation={setNewEquation} input={input}/>
        <Keyboard onClick={onInput}/>
    </main>;
}