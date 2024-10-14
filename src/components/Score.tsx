import {classList} from "@/components/classList";
import {useClickOutside} from "@/components/useClickOutside";
import {useEffect, useRef, useState} from "react";
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
        <Increment value={value}/>
        <Button onClick={() => setInventoryOpen(!inventoryOpen)}>
            <ScoreValue value={value}/>
        </Button>
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

    const ref = useRef<HTMLDivElement>(null);
    const [prevValue, setPrevValue] = useState(value);
    const [thisValue, setThisValue] = useState(value);
    const increment = thisValue - prevValue;

    useEffect(() => {
        if (thisValue !== value && ref.current) {
            ref.current.getAnimations().forEach(it => it.cancel());
            ref.current.style.opacity = "1";
            ref.current.animate([
                {offset: 0, transform: "translateY(-100%)", opacity: 0, easing: "ease-out"},
                {offset: 0.2, transform: "none", opacity: 1, easing: "linear"},
                {offset: 0.8, transform: "none", opacity: 1, easing: "linear"},
                {offset: 1, transform: "translateY(-100%)", opacity: 0, easing: "ease-in"},
            ], {duration: 1600}).finished.then(anim => {
                if (ref.current) {
                    ref.current.style.opacity = "0";
                }
            });
        }
        setPrevValue(thisValue);
        setThisValue(value);
    }, [value, ref]);

    return <div ref={ref} className={classList("increment", increment === 0 ? "none" : increment < 0 ? "negative" : "positive")}>
        <ScoreValue value={increment} dollarSign={false} explicitPlus={true}/>
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
