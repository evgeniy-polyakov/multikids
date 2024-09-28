import {Main} from "@/components/Main";
import nextConfig from "../../next.config.mjs";

export default function Home() {
    return <Main basePath={nextConfig.basePath ?? ""}/>;
}
