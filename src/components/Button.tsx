import {JSX} from "react";

export function Button({children, onClick, className}: {
    children: string | JSX.Element | JSX.Element[],
    onClick?: () => void,
    className?: string,
}) {
    return <button className={className} onClick={onClick}>
        <span className="bg"></span>
        <span className="text">{children}</span>
    </button>
}
