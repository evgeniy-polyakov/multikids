import nextConfig from "../../next.config.mjs";
import {Body} from "@/components/Body";
import dynamic from "next/dynamic";

export default function Home() {
    const B = dynamic(() => Promise.resolve(Body), {ssr: false});
    return <B basePath={nextConfig.basePath ?? ""}/>;
}
