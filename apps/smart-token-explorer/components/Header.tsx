import { SettingsIcon, LucideHelpCircle, DatabaseIcon } from "lucide-react";
import Logo from "./header/Logo";
import { ConnectButton, WalletButton } from "@rainbow-me/rainbowkit";
import ThemeSwitch from "./shared/ThemeSwitch";

export default function Header() {
  return (
    <section className="p-3 w-full">
      <div className="max-w-full  container-wide flex justify-between mx-auto">
        <Logo />
        <div className="gap-2 flex items-center">
          {/* <a
            classNameName="bg-red-100/30 text-red-500 w-9 h-9 rounded-md flex items-center justify-center"
            href="/db"
          >
            <DatabaseIcon />
          </a>
          <div classNameName="bg-secondary-100/30 text-secondary-500 w-9 h-9 rounded-md flex items-center justify-center">
            <LucideHelpCircle />
          </div>
          <div classNameName="bg-primary-100/30 text-primary-500 w-9 h-9 rounded-md flex items-center justify-center">
            <SettingsIcon />
          </div> */}
          <a className="nav-link hidden sm:block mr-4 font-bold" href="/token-list">Token List</a>
          
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
          <ThemeSwitch />
        </div>
      </div>
    </section>
  );
}
