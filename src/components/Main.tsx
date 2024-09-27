import {Keyboard} from "@/components/Keyboard";
import {Game} from "@/components/Game";

export function Main() {
    return <main>
        <Game/>
        <Keyboard onClick={value => {
        }}/>
    </main>;
}