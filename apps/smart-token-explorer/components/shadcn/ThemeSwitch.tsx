"use client";

import { cn, firstUppercasePipe } from "@/lib/utils";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeProps {
    position: string;
}
const ThemeSwitch = ({ position }: ThemeProps) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const isSystem = theme === "system";


    const isDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const currentTheme = isSystem ? (isDark ? "dark" : "light") : theme;

    const updateTheme = () => {
        if (isSystem) {
            if (isDark) {
                setTheme("light");
            } else {
                setTheme("dark");
            }
        } else {
            if (theme === "dark") {
                setTheme("light");
            } else {
                setTheme("dark");
            }
        }
    };

    useEffect(() => setMounted(true), []);

    const animation = {
        initial: { opacity: 0, translateY: 10 },
        animate: { opacity: 1, translateY: 0 },
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
        exit: { opacity: 0, translateY: -10 },
    };

    if (!mounted) {
        return <div className="h-6 w-6"></div>;
    }

    return (
        <div
            aria-label="Toggle Dark Mode"
            onClick={updateTheme}
            className={cn(
                position === 'left' ? "h-4 w-4" : "h-6 w-6",
                "flex cursor-pointer gap-2 items-center"
            )}
        >
            {currentTheme === "dark" ? (
                <motion.div
                    {...animation}
                    key="dark"
                    className={cn(
                        position === 'left' ? "h-4 w-4" : "h-6 w-6",
                    )}
                >
                    <MoonIcon className={cn(
                        position === 'left' ? "h-4 w-4" : ""
                    )} />
                </motion.div>
            ) : (
                <motion.div
                    {...animation}
                    key="light"
                    className={cn(
                        position === 'left' ? "h-4 w-4" : "h-6 w-6",
                    )}
                >
                    <SunIcon className={cn(
                        position === 'left' ? "h-4 w-4" : ""
                    )} />
                </motion.div>
            )}
            {position === 'left' && (<span>{firstUppercasePipe(isSystem ? (isDark ? 'darl' : 'light') : theme)}</span>)}

        </div>
    );
};

export default ThemeSwitch;
