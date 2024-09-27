import type {Metadata} from "next";
import '@/assets/scss/index.scss'

export const metadata: Metadata = {
    title: "Multi Kids",
    description: "",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
