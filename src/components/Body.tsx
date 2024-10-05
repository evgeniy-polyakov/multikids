"use client"

import {Background} from "@/components/Background";
import {Main} from "@/components/Main";
import {useState} from "react";

export function Body({basePath}: {
    basePath: string
}) {

    const [bg, setBg] = useState("bg1");

    return <body>
    <Background bg={bg}/>
    <Main basePath={basePath} setBg={setBg}/>
    </body>;
}