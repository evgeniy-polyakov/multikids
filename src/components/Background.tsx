import {GameModel} from "@/models/GameModel";

export function Background({bg, gameModel}: {
    bg: string,
    gameModel: GameModel,
}) {
    return <div className="background" data-bg={bg}>
        {[0, 1, 2].map(i => <div data-layer={i} key={i}></div>)}
    </div>
}