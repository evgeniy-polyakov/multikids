export function Background({bg}: {
    bg: string,
}) {
    return <div className="background" data-bg={bg}>
        {[0, 1, 2].map(i => <div data-layer={i} key={i}></div>)}
    </div>;
}
