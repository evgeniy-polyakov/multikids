import {classList} from "@/components/classList";
import {useClickOutside} from "@/components/useClickOutside";
import {useEffect, useState} from "react";
import {GameModel} from "@/models/GameModel";
import {Button} from "@/components/Button";
import {SFX} from "@/components/SFX";
import {ButtonShare} from "@/components/ButtonShare";
import bridge from "@vkontakte/vk-bridge";

export function Score({onClickItem, gameModel, inventoryOpen, setInventoryOpen}: {
    onClickItem: (item: string) => boolean,
    gameModel: GameModel,
    inventoryOpen: boolean,
    setInventoryOpen: (value: boolean) => void,
}) {

    const ref = useClickOutside<HTMLDivElement>(() => {
        setInventoryOpen(false);
    });
    const value = gameModel.getScore();

    return <div ref={ref} className={classList("score", {negative: value < 0})}>
        <Button onClick={() => setInventoryOpen(!inventoryOpen)}>
            <ScoreValue value={value}/>
        </Button>
        <Increment value={value}/>
        <Inventory open={inventoryOpen} gameModel={gameModel} onClick={item => {
            if (onClickItem(item)) {
                SFX.play("clear");
                setInventoryOpen(false);
            }
        }}/>
    </div>
}

function ScoreValue({value, dollarSign = true, explicitPlus}: {
    value: number,
    dollarSign?: boolean,
    explicitPlus?: boolean,
}) {
    const sign = value < 0 ? "-" : explicitPlus ? "+" : "";
    return <><span className="sign">{sign}</span>{dollarSign ? "$" : ""}{Math.abs(value)}</>
}

function Increment({value}: {
    value: number
}) {

    const [prevValue, setPrevValue] = useState(value);
    const [thisValue, setThisValue] = useState(value);
    const increment = thisValue - prevValue;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timeout = -1;
        if (thisValue !== value) {
            setVisible(true);
            timeout = window.setTimeout(() => {
                setVisible(false);
            }, 1000);
        }
        setPrevValue(thisValue);
        setThisValue(value);
        return () => {
            setVisible(false);
            clearTimeout(timeout);
        }
    }, [value]);

    return <div className={classList("increment", {
        negative: increment < 0,
        positive: increment > 0,
        visible: visible
    })}>
        <span className="button-bg"></span>
        <span className="text">
            <ScoreValue value={increment} dollarSign={false} explicitPlus={true}/>
        </span>
    </div>;
}

function Inventory({open, onClick, gameModel}: {
    open: boolean,
    onClick: (item: string) => void,
    gameModel: GameModel,
}) {
    return <ul className={classList("inventory", {open})}>
        {[1, 2, 3, 4].map(i => {
            const item = `bg${i}`;
            const locked = !gameModel.isUnlocked(item);
            return <li key={i} data-item={i}
                       className={classList({locked})}>
                <Button onClick={() => onClick(item)}>
                    <span className="icon"></span>
                    {locked && <PadlockIcon/>}
                    {locked && <span className="price">${gameModel.getPrice(item)}</span>}
                </Button>
            </li>
        })}
        {!bridge.isStandalone() &&
            <li key={-1} className="share">
                <ButtonShare onShare={() => gameModel.addScore(100)}/>
            </li>
        }
    </ul>
}

function PadlockIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="61px" viewBox="0 0 50 61">
        <path fill="#000"
              d="M5,28 L5,10 L8,10 L8,5 L14,5 L14,0 L36,0 L36,5 L42,5 L42,10 L45,10 L45,28 L34,28 L34,16 L28,16 L28,11 L22,11 L22,16 L16,16 L16,28 L5,28 Z"/>
        <path fill="#000"
              d="M0,27 L50,27 L50,61 L0,61 L0,27 Z"/>
        <path fill="#fff"
              d="M8,31 L8,13 L10,13 L10,8 L17,8 L17,3 L33,3 L33,8 L40,8 L40,13 L42,13 L42,31 L37,31 L37,13 L37,13 L30,13 L30,8 L20,8 L20,13 L13,13 L13,31 L8,31 Z"/>
        <path fill="#fff"
              d="M3,30 L47,30 L47,58 L3,58 L3,30 Z"/>
        <path fill="#000"
              d="M22,37 L28,37 L28,51 L22,51 L22,37 Z"/>
    </svg>;
}