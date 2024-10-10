import {JSX} from "react";
import {SFX} from "@/components/SFX";

export function Button({children, onClick, className, clickSFX}: {
    children?: string | JSX.Element | JSX.Element[],
    onClick?: () => void,
    className?: string,
    clickSFX?: string,
}) {
    return <button className={className} onClick={() => {
        SFX.play(clickSFX ?? "clear");
        onClick?.();
    }}>
        <span className="bg"></span>
        <span className="text">{children}</span>
    </button>
}
