import {Button} from "@/components/Button";

export function Help({onClose}: {
    onClose: () => void
}) {
    return <dialog className="help">
        <span className="button-bg"></span>
        <div className="scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => <ul key={a}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(b => <li key={b}>{a} * {b} = {a * b}</li>)}
            </ul>)}
        </div>
        <Button className="button-close" onClick={onClose}>X</Button>
    </dialog>
}
