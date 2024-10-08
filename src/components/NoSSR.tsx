import {JSX} from "react";
import dynamic from "next/dynamic";

export function NoSSR({children}: {
    children?: JSX.Element | JSX.Element[]
}) {
    const N = dynamic(() => Promise.resolve(NoSSRDynamic), {ssr: false});
    return <N>{children}</N>;
}

function NoSSRDynamic({children}: {
    children?: JSX.Element | JSX.Element[]
}) {
    return <>{children}</>;
}