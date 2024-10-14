import {Button} from "@/components/Button";
import {useEffect} from "react";

export function ButtonMute({selected, setSelected}: {
    selected: boolean,
    setSelected: (value: boolean) => void,
}) {

    useEffect(() => {
        onMute();
        document.addEventListener("visibilitychange", onMute, false);
        return () => {
            document.removeEventListener("visibilitychange", onMute, false);
        }
    }, [selected]);

    function onMute() {
        Howler.mute(selected || document.hidden);
    }

    return <Button className="button-mute" onClick={() => setSelected(!selected)}>
        {selected ? <IconMusicOff/> : <IconMusicOn/>}
    </Button>
}

function IconMusicOff() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="38px" viewBox="3 0 35 38">
        <path d="M17 23 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V25 H23 V27 H25 V29 H27 V31 H29 V33 H31 V36 H35 V33 H32 V31 H30 V29 H28 V27 H26 V25 H24 V23 H22 V21 H20 V23 Z"/>
        <path d="M21 6 H24 V9 H34 V6 H31 V3 H21 V0 H17 V16 H15 V14 H13 V12 H11 V10 H9 V8 H7 V5 H3 V8 H6 V10 H8 V12 H10 V14 H12 V16 H14 V18 H16 V20 H18 V18 H21 Z"/>
        <path d="M34 9 H38 V13 H34 Z"/>
    </svg>
}

function IconMusicOn() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="38px" viewBox="3 0 35 38">
        <path d="M17 0 V17 H14 V20 H17 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V20 H24 V17 H21 V6 H24 V9 H34 V6 H31 V3 H21 V0 Z"/>
        <path d="M34 9 H38 V13 H34 Z"/>
    </svg>
}


