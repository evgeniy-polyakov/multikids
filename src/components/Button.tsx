import {JSX} from "react";
import {SFX} from "@/components/SFX";

export function Button({children, onClick, className, clickSFX, autoFocus}: {
    children?: string | JSX.Element | (JSX.Element | boolean | string | null)[],
    onClick?: () => void,
    className?: string,
    clickSFX?: string | false,
    autoFocus?: boolean,
}) {
    return <button className={className} onClick={() => {
        if (clickSFX !== false) {
            SFX.play(clickSFX ?? "clear");
        }
        onClick?.();
    }} autoFocus={autoFocus}>
        <span className="button-bg"></span>
        <span className="text">{children}</span>
    </button>
}
