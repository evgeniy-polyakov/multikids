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
        {inventoryOpen && <Inventory gameModel={gameModel} onClick={item => {
            if (onClickItem(item)) {
                SFX.play("clear");
                setInventoryOpen(false);
            }
        }}/>}
    </div>
}

function Inventory({onClick, gameModel}: {
    onClick: (item: string) => void,
    gameModel: GameModel,
}) {
    return <ul className="inventory">
        {[1, 2, 3, 4].map(i => {
            const item = `bg${i}`;
            return <li key={i} data-item={i}
                       className={classList({locked: !gameModel.isUnlocked(item)})}
                       onClick={() => onClick(item)}>
                <span className="button-bg"></span>
                <span className="icon"></span>
                <span className="price">${gameModel.getPrice(item)}</span>
            </li>
        })}
    </ul>
}
