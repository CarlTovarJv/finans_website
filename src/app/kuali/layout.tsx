import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kuali AI",
    description: "Financial Intelligence",

    icons: {
        icon: [
            {
                url: "/ialog.png",
                href: "/ialog.png",
            },
        ],
        shortcut: "/ialog.png",
        apple: "/ialog.png",
    },
};

export default function KualiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}