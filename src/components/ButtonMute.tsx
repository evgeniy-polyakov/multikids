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
        <path d="M17 21 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V23 H23 V25 H25 V27 H27 V29 H29 V31 H31 V34 H35 V31 H32 V29 H30 V27 H28 V25 H26 V23 H24 V21 H22 V19 H20 V21 Z"/>
        <path d="M21 6 H24 V9 H34 V6 H31 V3 H21 V0 H17 V14 H15 V12 H13 V10 H11 V8 H9 V6 H7 V3 H3 V6 H6 V8 H8 V10 H10 V12 H12 V14 H14 V16 H16 V18 H18 V16 H21 Z"/>
        <path d="M34 9 H38 V13 H34 Z"/>
    </svg>
}

function IconMusicOn() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="38px" viewBox="3 0 35 38">
        <path d="M17 0 V17 H14 V20 H17 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V20 H24 V17 H21 V6 H24 V9 H34 V6 H31 V3 H21 V0 Z"/>
        <path d="M34 9 H38 V13 H34 Z"/>
    </svg>
}


