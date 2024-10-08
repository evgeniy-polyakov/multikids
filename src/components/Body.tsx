"use client"

import {Background} from "@/components/Background";
import {Main} from "@/components/Main";
import {useGameModel} from "@/models/GameModel";

export function Body({basePath}: {
    basePath: string
}) {

    const gameModel = useGameModel();

    return <>
        <Background bg={gameModel.getBg()}/>
        <Main basePath={basePath} gameModel={gameModel}/>
    </>;
}