import {DependencyList, useEffect, useRef} from "react";

export function useClickOutside<T extends HTMLElement>(onClickOutside?: () => void, dependencies?: DependencyList) {
    const ref = useRef<T>(null);
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside?.();
            }
        }
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("click", onClick);
        }
    }, [ref, ...dependencies ?? []]);
    return ref;
}