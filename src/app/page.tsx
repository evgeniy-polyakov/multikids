import nextConfig from "../../next.config.mjs";
import {Body} from "@/components/Body";
import {NoSSR} from "@/components/NoSSR";

export default function Home() {
    return <NoSSR><Body basePath={nextConfig.basePath ?? ""}/></NoSSR>;
}
