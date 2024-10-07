"use client"

import {Background} from "@/components/Background";
import {Main} from "@/components/Main";
import {useState} from "react";
import {useGameModel} from "@/models/GameModel";

export function Body({basePath}: {
    basePath: string
}) {

    const [bg, setBg] = useState("bg1");
    const gameModel = useGameModel();

    return <body>
    <Background bg={bg} gameModel={gameModel}/>
    <Main basePath={basePath} setBg={setBg} gameModel={gameModel}/>
    </body>;
}