export enum ActionCode {
    Delete = -1,
    Enter = -2,
}

export function Keyboard({onClick}: {
    onClick: (value: number) => void
}) {
    return <table className="keyboard">
        <tbody>
        {[[1, 2, 3], [4, 5, 6], [7, 8, 9], [ActionCode.Delete, 0, ActionCode.Enter]].map(row =>
            <tr>{row.map(code =>
                <td><span>{code === ActionCode.Enter ? "v" : code === ActionCode.Delete ? "x" : code}</span></td>)}</tr>
        )}
        </tbody>
    </table>
}