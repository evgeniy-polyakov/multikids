export function Background() {
    return <div className="background" data-bg="1">
        {[0, 1, 2].map(i => <div data-layer={i}></div>)}
    </div>
}