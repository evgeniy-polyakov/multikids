"use client"

import {Background} from "@/components/Background";
import {Main} from "@/components/Main";
import {useGameModel} from "@/models/GameModel";
import {useState} from "react";
import bridge from "@vkontakte/vk-bridge";

export function Body({basePath}: {
    basePath: string
}) {

    useState(() => {
        bridge.send("VKWebAppInit", {});
    });
    const gameModel = useGameModel();

    return <>
        <Background bg={gameModel.getBg()}/>
        <Main basePath={basePath} gameModel={gameModel}/>
    </>;
}