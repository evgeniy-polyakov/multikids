export function Button({text, onClick, className}: {
    text: string,
    onClick?: () => void,
    className?: string,
}) {
    return <button className={className} onClick={onClick}>
        <span className="bg"></span>
        <span className="text">{text}</span>
    </button>
}