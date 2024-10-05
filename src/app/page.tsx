import {Main} from "@/components/Main";
import nextConfig from "../../next.config.mjs";
import {Background} from "@/components/Background";

export default function Home() {
    return <body>
    <Background/>
    <Main basePath={nextConfig.basePath ?? ""}/>
    </body>;
}
