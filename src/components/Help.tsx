import {Button} from "@/components/Button";
import {useEffect, useRef} from "react";
import {SFX} from "@/components/SFX";

export function Help({open, onClose}: {
    open: boolean,
    onClose: () => void,
}) {

    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [dialog, open]);

    return <dialog className="help" ref={dialog} onClose={() => {
        SFX.play("clear");
        onClose();
    }}>;
        <span className="button-bg"></span>
        <div className="scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => <ul key={a}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(b => <li key={b}>{a} * {b} = {a * b}</li>)}
            </ul>)}
            <p><a href="mailto:evgeniy.s.polyakov@gmail.com">evgeniy.s.polyakov@gmail.com</a></p>
        </div>
        <Button className="button-close" onClick={onClose} clickSFX={false}>X</Button>
    </dialog>
}
