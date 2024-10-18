import {Button} from "@/components/Button";
import bridge from "@vkontakte/vk-bridge";

export function ButtonShare({onShare}: {
    onShare: () => void;
}) {
    return <Button onClick={async () => {
        try {
            const {success} = await bridge.send("VKWebAppShowInviteBox");
            if (success) {
                onShare();
            }
        } catch (error) {
            console.error(error);
        }
    }}>
        <ShareIcon/>
        <span className="sign">+</span>$100
    </Button>
}

function ShareIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="68px" height="56px" viewBox="0 0 68 56">
        <path d="M-0,10 L5,10 L5,13 L10,13 L10,5 L13,5 L13,-0 L17,-0 L17,3 L26,3 L26,-0 L30,-0 L30,5 L33,5 L33,13 L38,13 L38,10 L43,10 L43,15 L40,15 L40,18 L3,18 L3,15 L-0,15 L-0,10 Z"/>
        <path d="M10,16 L33,16 L33,28 L30,28 L30,31 L27,31 L27,34 L16,34 L16,31 L13,31 L13,28 L10,28 L10,16 Z"/>
        <path d="M2,56 L2,53 L5,53 L5,46 L8,46 L8,43 L11,43 L11,40 L15,40 L15,37 L28,37 L28,40 L32,40 L32,43 L35,43 L35,46 L38,46 L38,53 L41,53 L41,56 L1,56 Z"/>
        <path d="M47,22 L47,17 L50,17 L50,20 L55,20 L55,17 L58,17 L58,22 M61,22 L61,26 L64,26 L64,23 L68,23 L68,26 L66,26 L66,29 L39,29 L39,26 L37,26 L37,23 L41,23 L41,26 L44,26 L44,22 "/>
        <path d="M44,37 L47,37 L47,41 L58,41 L58,37 L61,37 L61,27 L44,27 "/>
        <path d="M42,50 L42,47 L47,47 L47,44 L58,44 L58,47 L62,47 L62,50 L65,50 L65,53 L68,53 L68,56 L48,56 L48,53 L45,53 L45,50 L42,50 Z"/>
    </svg>;
}