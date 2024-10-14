import {Button} from "@/components/Button";

export enum ActionCode {
    Delete = -1,
    Enter = -2,
}

export function Keyboard({onClick}: {
    onClick: (value: number) => void
}) {
    return <table className="keyboard">
        <tbody>
        {[[1, 2, 3], [4, 5, 6], [7, 8, 9], [ActionCode.Delete, 0, ActionCode.Enter]].map((row, i) =>
            <tr key={i}>{row.map((code, j) =>
                <td key={j} className={`code-${code}`}>
                    <Button onClick={() => onClick(code)} clickSFX={false}>
                        {code === ActionCode.Enter ? "V" : code === ActionCode.Delete ? "X" : code}
                    </Button>
                </td>)}
            </tr>
        )}
        </tbody>
    </table>
}
