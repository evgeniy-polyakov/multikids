import {ActionCode, Keyboard} from "@/components/Keyboard";
import {Game, NewEquation} from "@/components/Game";
import {useEffect, useState} from "react";
import {Score} from "@/components/Score";
import {SFX} from "@/components/SFX";
import {GameModel} from "@/models/GameModel";
import {Button} from "@/components/Button";
import {ButtonMute} from "@/components/ButtonMute";
import {Help} from "@/components/Help";

export function Main({basePath, gameModel}: {
    basePath: string,
    gameModel: GameModel,
}) {

    const [newEquation, setNewEquation] = useState<NewEquation>(false);
    const [input, setInput] = useState(-1);
    const [helpOpen, setHelpOpen] = useState(false);
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (!init) {
            SFX.basePath = basePath;
            SFX.load("clear", "lose", "shot", "win");
            SFX.loop("music");
            setInit(true);
            setNewEquation("insert");
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
                    setNewEquation("insert");
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
            <Button className="button-help" onClick={() => setHelpOpen(true)}>?</Button>
            <ButtonMute selected={gameModel.getMute()}
                        setSelected={value => gameModel.setMute(value)}/>
            {helpOpen && <Help onClose={() => {
                setHelpOpen(false);
                setNewEquation("replace");
            }}/>}
        </div>}
    </main>;
}
