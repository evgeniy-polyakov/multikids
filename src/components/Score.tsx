import {classList} from "@/components/classList";
import {useClickOutside} from "@/components/useClickOutside";
import {useState} from "react";
import {HistoryModel} from "@/models/HistoryModel";

export function Score({value, onClickItem}: {
    value: number,
    onClickItem: (item: string) => boolean
}) {

    const [inventoryOpen, setInventoryOpen] = useState(false);
    const ref = useClickOutside<HTMLDivElement>(() => {
        setInventoryOpen(false);
    });

    return <div ref={ref} className={classList("score", {negative: value < 0})}>
        <div onClick={() => setInventoryOpen(!inventoryOpen)}>
            <span className="bg"></span>
            <span className="text">${value}</span>
        </div>
        {inventoryOpen && <Inventory onClick={item => {
            if (onClickItem(item)) {
                setInventoryOpen(false);
            }
        }}/>}
    </div>
}

function Inventory({onClick}: {
    onClick: (item: string) => void
}) {
    return <ul className="inventory">
        {[1, 2, 3, 4].map(i => {
            const item = `bg${i}`;
            return <li key={i} data-item={i}
                       className={classList({locked: !HistoryModel.isUnlocked(item)})}
                       onClick={() => onClick(item)}>
                <span className="bg"></span>
                <span className="icon"></span>
                <span className="price">${HistoryModel.getPrice(item)}</span>
            </li>
        })}
    </ul>
}