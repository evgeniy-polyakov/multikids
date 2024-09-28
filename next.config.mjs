/** @type {import("next").NextConfig} */
const nextConfig = process.env.DEV ? {} :
    {
        output: "export",
        distDir: "docs",
        basePath: "/multikids",
    };

export default nextConfig;
