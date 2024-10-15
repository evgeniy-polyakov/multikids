import {classList} from "@/components/classList";
import {useClickOutside} from "@/components/useClickOutside";
import {useEffect, useState} from "react";
import {GameModel} from "@/models/GameModel";
import {Button} from "@/components/Button";
import {SFX} from "@/components/SFX";

export function Score({onClickItem, gameModel}: {
    onClickItem: (item: string) => boolean,
    gameModel: GameModel,
}) {

    const [inventoryOpen, setInventoryOpen] = useState(false);
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
                    {locked && <span className="padlock"></span>}
                    {locked && <span className="price">${gameModel.getPrice(item)}</span>}
                </Button>
            </li>
        })}
    </ul>
}
