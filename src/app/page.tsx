import nextConfig from "../../next.config.mjs";
import {Body} from "@/components/Body";

export default function Home() {
    return <Body basePath={nextConfig.basePath ?? ""}/>;
}
