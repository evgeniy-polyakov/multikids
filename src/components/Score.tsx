import {classList} from "@/components/classList";

export function Score({value}: {
    value: number,
}) {
    return <div className={classList("score", {negative: value < 0})}>
        <span className="bg"></span>
        <span className="text">${value}</span>
    </div>
}