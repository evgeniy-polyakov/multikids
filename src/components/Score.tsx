import {classList} from "@/components/classList";
import {useClickOutside} from "@/components/useClickOutside";
import {useState} from "react";

export function Score({value}: {
    value: number,
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
        {inventoryOpen && <Inventory/>}
    </div>
}

function Inventory() {
    return <ul className="inventory">
        {[1, 2, 3, 4].map(i => <li key={i} data-item={i} onClick={() => {
            document.body.dataset.bg = `${i}`;
        }}>
            <span className="bg"></span>
            <span className="icon"></span>
        </li>)}
    </ul>
}