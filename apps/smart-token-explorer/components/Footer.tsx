import { TwitterXIcon } from "@/components/icons/XIcon";
import { GithubIcon } from "lucide-react";

export default function Footer() {
    return (
        <>
            <footer className="mt-auto w-full bg-gradient-to-r from-white/5 via-white/60 to-white/5 backdrop-blur-sm dark:from-slate-700/5 dark:via-slate-700/60 dark:to-slate-700/5">
                <div className="flex w-full flex-col items-center justify-between gap-4 p-6">
                    <div className="container-wide mt-12 flex w-full flex-col justify-between gap-6 p-6 md:flex-row">
                        <div className="flex w-full flex-col gap-4 md:max-w-xs lg:max-w-sm">
                            <a
                                aria-label="Landing page components &amp; templates that you can copy &amp; paste"
                                href="/"
                            >
                                <div className="flex items-center justify-start gap-3">
                                    <img
                                        alt="Page UI logo"
                                        loading="lazy"
                                        width="40"
                                        height="40"
                                        decoding="async"
                                        data-nimg="1"
                                        className="group-hover:animate-wiggle"
                                        src="/images/tokens/ENS.png"
                                    />
                                    <div className="hidden h-full text-2xl font-semibold sm:flex">
                                        Smart Token Explorer
                                    </div>
                                </div>
                            </a>
                            <div className="h-full text-lg font-semibold">
                                Landing page components &amp; templates that you can copy &amp;
                                paste
                            </div>
                            <p className="text-sm opacity-70">
                                Smart Token Explorer is a ..... Built on top of Shadcn UI and
                                TailwindCSS.
                            </p>
                            <p className="text-xs">Copyright © Smart Token Explorer</p>
                        </div>
                        <div className="mt-6 grid items-start gap-12 md:mt-0 md:grid-cols-3">
                            <ul className="flex w-full flex-col flex-wrap justify-center gap-4 text-xs">
                                <li>
                                    <p className="text-base font-light text-slate-900 dark:text-slate-100">
                                        Get started
                                    </p>
                                </li>
                                <li>
                                    <a className="nav-link" href="/">
                                        <span className="nav-link-active">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" href="/docs/introduction">
                                        <span>Docs</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/danmindru/page-ui"
                                        className="nav-link"
                                    >
                                        <span>GitHub</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="flex w-full flex-col flex-wrap justify-center gap-4 text-xs">
                                <li>
                                    <p className="text-base font-light text-slate-900 dark:text-slate-100">
                                        Examples
                                    </p>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://shipixen.com/demo/landing-page-templates/template/emerald-ai"
                                        className="nav-link"
                                    >
                                        <span>Templates</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://shipixen.com/demo/landing-page-component-examples"
                                        className="nav-link"
                                    >
                                        <span>Usage examples</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://pageui.shipixen.com/docs/landing-page-components"
                                        className="nav-link"
                                    >
                                        <span>Component docs</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="flex w-full flex-col flex-wrap justify-center gap-4 text-xs">
                                <li>
                                    <p className="text-base font-light text-slate-900 dark:text-slate-100">
                                        Support
                                    </p>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/danmindru/page-ui/issues/new"
                                        className="nav-link"
                                    >
                                        <span>Submit Issue</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://shipixen.com/boilerplate-documentation"
                                        className="nav-link"
                                    >
                                        <span>More docs</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://shipixen.com"
                                        className="nav-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="from-primary-400 to-secondary-300 bg-gradient-to-r bg-clip-text text-transparent">
                                            Deploy with Shipixen
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" href="/terms">
                                        <span>Terms of Service</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" href="/privacy">
                                        <span>Privacy Policy</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <hr className="darK:to-black/5 my-4 w-full border-0 bg-gradient-to-r from-white/5 via-black/10 to-white/5 dark:from-black/5 dark:via-white/30" />
                    <div className="flex flex-col items-center px-2 py-8">
                        <div className="mb-3 flex flex-wrap justify-center gap-4">
                            <a href="https://twitter.com/shipixen">
                                <button
                                    className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                    aria-label="𝕏 (formerly Twitter)"
                                >
                                    <TwitterXIcon />
                                </button>
                            </a>
                            <a href="https://github.com/danmindru/page-ui">
                                <button
                                    className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                    aria-label="GitHub"
                                >
                                    <GithubIcon />
                                </button>
                            </a>
                        </div>
                        <div className="mb-2 w-full space-x-2 p-3 text-center text-sm text-gray-500 lg:flex lg:justify-center dark:text-gray-400">
                            <span>© 2024</span>
                            <span> • </span>
                            <a href="/">Smart Token Explorer</a>
                            <span> • </span>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://shipixen.com"
                            >
                                Built with Shipixen 🔁
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
