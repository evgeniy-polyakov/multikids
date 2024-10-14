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
        <path d="M17 22 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V24 H23 V26 H25 V28 H27 V30 H29 V32 H31 V35 H35 V32 H32 V30 H30 V28 H28 V26 H26 V24 H24 V22 H22 V20 H20 V22 Z"/>
        <path d="M21 6 H24 V9 H34 V6 H31 V3 H21 V0 H17 V15 H15 V13 H13 V11 H11 V9 H9 V7 H7 V4 H3 V7 H6 V9 H8 V11 H10 V13 H12 V15 H14 V17 H16 V19 H18 V17 H21 Z"/>
        <path d="M34 9 H38 V13 H34 Z"/>
    </svg>
}

function IconMusicOn() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="38px" viewBox="3 0 35 38">
        <path d="M17 0 V17 H14 V20 H17 V28 H15 V25 H10 V28 H7 V34 H10 V38 H17 V34 H21 V20 H24 V17 H21 V6 H24 V9 H34 V6 H31 V3 H21 V0 Z"/>
        <path d="M34 9 H38 V13 H34 Z"/>
    </svg>
}


