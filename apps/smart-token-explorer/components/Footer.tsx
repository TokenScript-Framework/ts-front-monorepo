import { GithubIcon } from "lucide-react";
import { TwitterXIcon } from "@/components/icons/XIcon";

export default function Footer() {
  return (
    <>
      <footer className="mt-auto w-full bg-gradient-to-r from-white/5 via-white/60 to-white/5 backdrop-blur-sm dark:from-slate-700/5 dark:via-slate-700/60 dark:to-slate-700/5">
        <div className="flex flex-col gap-4 justify-between items-center w-full  p-6">
          <div className="w-full flex flex-col md:flex-row justify-between gap-6 mt-12 w-full p-6 container-wide">
            <div className="w-full flex flex-col gap-4 md:max-w-xs lg:max-w-sm">
              <a
                aria-label="Landing page components &amp; templates that you can copy &amp; paste"
                href="/"
              >
                <div className="flex items-center gap-3 justify-start">
                  <img
                    alt="Page UI logo"
                    loading="lazy"
                    width="40"
                    height="40"
                    decoding="async"
                    data-nimg="1"
                    className="group-hover:animate-wiggle "
                    src="/images/tokens/ENS.png"
                  />
                  <div className="hidden text-2xl font-semibold sm:flex h-full">
                    Smart Toke Explorer
                  </div>
                </div>
              </a>
              <div className="text-lg font-semibold h-full">
                Landing page components &amp; templates that you can copy &amp;
                paste
              </div>
              <p className="text-sm opacity-70">
                Smart Toke Explorer is a ..... Built
                on top of Shadcn UI and TailwindCSS.
              </p>
              <p className="text-xs">Copyright © Smart Toke Explorer</p>
            </div>
            <div className="grid gap-12 items-start mt-6 md:mt-0 md:grid-cols-3">
              <ul className="flex flex-col flex-wrap gap-4 justify-center w-full text-xs">
                <li>
                  <p className="text-slate-900 dark:text-slate-100 font-light text-base">
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
              <ul className="flex flex-col flex-wrap gap-4 justify-center w-full text-xs">
                <li>
                  <p className="text-slate-900 dark:text-slate-100 font-light text-base">
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
              <ul className="flex flex-col flex-wrap gap-4 justify-center w-full text-xs">
                <li>
                  <p className="text-slate-900 dark:text-slate-100 font-light text-base">
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
                    <span className="bg-clip-text bg-gradient-to-r text-transparent from-primary-400 to-secondary-300">
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
          <hr className="w-full my-4 border-0 bg-gradient-to-r from-white/5 via-black/10 to-white/5 dark:from-black/5 dark:via-white/30 darK:to-black/5" />
          <div className="py-8 px-2 flex flex-col items-center">
            <div className="mb-3 flex flex-wrap justify-center gap-4">
              <a href="https://twitter.com/shipixen">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-6 w-6"
                  aria-label="𝕏 (formerly Twitter)"
                >
                  <TwitterXIcon />
                </button>
              </a>
              <a href="https://github.com/danmindru/page-ui">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-6 w-6"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </button>
              </a>
            </div>
            <div className="w-full text-center lg:flex lg:justify-center p-4 mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2024</span>
              <span> • </span>
              <a href="/">Smart Toke Explorer</a>
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
