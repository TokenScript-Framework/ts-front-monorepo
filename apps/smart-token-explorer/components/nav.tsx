"use client"

import Link from "next/link"
import { LucideIcon, ExternalLinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAtomValue, useSetAtom } from "jotai"
import { getTokenTypeAtom, setTokenAtom, setTokenIdAtom, setTokenTypeAtom } from "@/lib/store";
import { buttonVariants } from "@/components/shadcn/ui/button"

interface NavProps {
    links: {
        title: string
        label?: string
        icon: LucideIcon
        href?: string
        variant: "default" | "ghost"
        children?: {
            title: string
            variant: "default" | "ghost"
        }[]
    }[]
}

export function Nav({ links }: NavProps) {
    const setTokenType = useSetAtom(setTokenTypeAtom);

    let tokenType = useAtomValue(getTokenTypeAtom);
    const childrenClickHandler = (type: string) => {
        setTokenType(type)
    }
    return (
        <div
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2" key={links.length}
        >

            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    <>
                        <Link
                            key={index}
                            href={link.href ? link.href : '#'}
                            target="_blank"
                            className={cn(
                                buttonVariants({ variant: link.variant, size: "sm" }),
                                link.variant === "default" &&
                                "dark:text-white dark:hover:text-white",
                                "justify-start ",
                                link.children && "bg-unset hover:bg-unset"
                            )}
                        >
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.title}
                            {link.href && (
                                <span
                                    className={cn(
                                        "ml-auto",
                                        link.variant === "default" &&
                                        "text-background dark:text-white"
                                    )}
                                >
                                    <ExternalLinkIcon className="w-4 h-4" />
                                </span>
                            )}

                        </Link>
                        {link.children?.map((child, index) => <>
                            <Link
                                key={child.title + index}
                                href="#"
                                className={cn(
                                    buttonVariants({ variant: child.variant, size: "sm" }),
                                    child.variant === "default" &&
                                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                    child.title === tokenType && "dark:bg-muted bg-gray-100",
                                    "justify-start cursor-pointer"
                                )}
                                onClick={() => childrenClickHandler(child.title)}
                            >
                                {child.title}
                            </Link>
                        </>)}
                    </>

                )}
            </nav>
        </div>
    )
}
