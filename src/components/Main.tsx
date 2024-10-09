import {ActionCode, Keyboard} from "@/components/Keyboard";
import {Game} from "@/components/Game";
import {useEffect, useState} from "react";
import {Score} from "@/components/Score";
import {SFX} from "@/components/SFX";
import {GameModel} from "@/models/GameModel";
import {Howler} from "howler";
import {Button} from "@/components/Button";
import {MusicOff} from "@/components/MusicOff";
import {MusicOn} from "@/components/MusicOn";

export function Main({basePath, gameModel}: {
    basePath: string,
    gameModel: GameModel,
}) {

    const [newEquation, setNewEquation] = useState(false);
    const [input, setInput] = useState(-1);
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (!init) {
            SFX.basePath = basePath;
            SFX.load("clear", "lose", "shot", "win");
            SFX.loop("music");
            document.addEventListener("visibilitychange", () => {
                Howler.mute(document.hidden);
            }, false);
            setInit(true);
            setNewEquation(true);
        }
    }, [init]);

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
        <Game newEquation={newEquation} setNewEquation={setNewEquation} input={input} gameModel={gameModel}/>
        <Keyboard onClick={onInput}/>
        {init && <Score gameModel={gameModel} onClickItem={item => {
            if (gameModel.isUnlocked(item)) {
                gameModel.setBg(item);
                return true;
            } else if (gameModel.purchase(item)) {
                gameModel.setBg(item);
                return true;
            }
            return false;
        }}/>}
        {init && <div className="controls">
            <Button className="help">?</Button>
            <Button className="mute">
                <MusicOn/>
                <MusicOff/>
            </Button>
        </div>}
    </main>;
}
