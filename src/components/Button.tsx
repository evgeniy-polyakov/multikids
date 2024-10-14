import {JSX} from "react";
import {SFX} from "@/components/SFX";

export function Button({children, onClick, className, clickSFX}: {
    children?: number | string | JSX.Element | (JSX.Element | boolean | string | number | null)[],
    onClick?: () => void,
    className?: string,
    clickSFX?: string | false,
}) {
    return <button className={className} onClick={() => {
        if (clickSFX !== false) {
            SFX.play(clickSFX ?? "clear");
        }
        onClick?.();
    }}>
        <span className="button-bg"></span>
        <span className="text">{children}</span>
    </button>
}
