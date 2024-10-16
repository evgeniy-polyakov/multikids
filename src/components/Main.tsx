import {ActionCode, Keyboard} from "@/components/Keyboard";
import {Game, NewEquation} from "@/components/Game";
import {useEffect, useRef, useState} from "react";
import {Score} from "@/components/Score";
import {SFX} from "@/components/SFX";
import {GameModel} from "@/models/GameModel";
import {Button} from "@/components/Button";
import {ButtonMute} from "@/components/ButtonMute";
import {Help} from "@/components/Help";

const NumberKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((a, t) => [...a, `Digit${t}`, `Numpad${t}`], [] as string[]);

export function Main({basePath, gameModel}: {
    basePath: string,
    gameModel: GameModel,
}) {

    const main = useRef<HTMLElement>(null);
    const [newEquation, setNewEquation] = useState<NewEquation>(false);
    const [input, setInput] = useState(-1);
    const [helpOpen, setHelpOpen] = useState(false);
    const [init, setInit] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown, false);
        return () => {
            document.removeEventListener("keydown", onKeyDown, false);
        }
    }, [input]);

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

    function onKeyDown(event: KeyboardEvent) {
        const isNumber = NumberKeys.indexOf(event.code) >= 0;
        const isDelete = event.code === "Backspace" || event.code === "Delete";
        if (event.key === "Escape") {
            main.current?.focus();
        }
        if (main.current !== document.activeElement && main.current?.contains(document.activeElement)) {
            if (isNumber || isDelete) {
                main.current?.focus();
            } else {
                return;
            }
        }
        if (isNumber) {
            onInput(parseInt(event.code.replace(/\D+/ig, "")));
        } else if (isDelete) {
            onInput(ActionCode.Delete);
        } else if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space") {
            onInput(ActionCode.Enter);
        }
    }

    function onClickInventoryItem(item: string) {
        if (gameModel.isUnlocked(item)) {
            gameModel.setBg(item);
            return true;
        } else if (gameModel.purchase(item)) {
            gameModel.setBg(item);
            return true;
        }
        return false;
    }

    function onCloseHelpModal() {
        setHelpOpen(false);
        setInput(-1);
        setNewEquation("replace");
    }

    return <main ref={main} tabIndex={-1}>
        <Score gameModel={gameModel} onClickItem={onClickInventoryItem}/>
        <div className="controls">
            <Button className="button-help" onClick={() => setHelpOpen(true)}>?</Button>
            <ButtonMute selected={gameModel.getMute()}
                        setSelected={value => gameModel.setMute(value)}/>
        </div>
        <Game newEquation={newEquation} setNewEquation={setNewEquation} input={input} gameModel={gameModel}/>
        <Keyboard onClick={onInput}/>
        <Help open={helpOpen} onClose={onCloseHelpModal}/>
    </main>;
}
