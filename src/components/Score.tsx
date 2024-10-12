import {classList} from "@/components/classList";
import {useClickOutside} from "@/components/useClickOutside";
import {useState} from "react";
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
        <Button onClick={() => setInventoryOpen(!inventoryOpen)}>{`$${value}`}</Button>
        <Inventory open={inventoryOpen} gameModel={gameModel} onClick={item => {
            if (onClickItem(item)) {
                SFX.play("clear");
                setInventoryOpen(false);
            }
        }}/>
    </div>
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
