export function Score({value}: {
    value: number,
}) {
    return <div className="score">
        <span className="bg"></span>
        <span className="text">${value}</span>
    </div>
}