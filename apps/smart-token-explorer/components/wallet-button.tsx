import { cn } from '@/lib/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from './shadcn/ui/button';
import { ChevronDown } from 'lucide-react';
import { emojiAvatarForAddress } from './emoji-avatar-for-address';

interface WalletButtonProps {
    display?: string;
}
export const WalletButton = ({ display }: WalletButtonProps) => {
    const buttonCSS = 'text-white font-bold w-full p-2 text-base'
    return (
        <ConnectButton />
        // <ConnectButton.Custom>
        //     {({
        //         account,
        //         chain,
        //         openAccountModal,
        //         openChainModal,
        //         openConnectModal,
        //         authenticationStatus,
        //         mounted,
        //     }) => {
        //         const ready = mounted;
        //         const connected =
        //             ready &&
        //             account &&
        //             chain;

        //         return (
        //             <div
        //                 {...(!ready && {
        //                     'aria-hidden': true,
        //                     'style': {
        //                         opacity: 0,
        //                         pointerEvents: 'none',
        //                         userSelect: 'none',
        //                     },
        //                 })}
        //             >
        //                 {(() => {
        //                     if (!connected) {
        //                         return (
        //                             <Button onClick={openConnectModal} className={cn(buttonCSS, "bg-primary-500 hover:bg-primary-300")}>
        //                                 Connect Wallet
        //                             </Button>
        //                         );
        //                     }

        //                     if (chain.unsupported) {
        //                         return (
        //                             <Button onClick={openChainModal} className={cn(buttonCSS, "bg-red-500 hover:bg-red-300")}>
        //                                 Wrong network <ChevronDown />
        //                             </Button>
        //                         );
        //                     }

        //                     const avatar = emojiAvatarForAddress(account.address)

        //                     return (
        //                         <div className={cn(display ? display + ' gap-2' : '')}>
        //                             <Button
        //                                 onClick={openChainModal}
        //                                 style={{ display: 'flex', alignItems: 'center' }}
        //                                 className={cn('p-2', "bg-white-500 hover:bg-gray-100 shadow border border-gray-100 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-100 mb-2 font-bold", !display ? 'w-full' : '')}
        //                             >
        //                                 {chain.hasIcon && (<>
        //                                     <div
        //                                         style={{
        //                                             background: chain.iconBackground,
        //                                             width: 24,
        //                                             height: 24,
        //                                             borderRadius: 999,
        //                                             overflow: 'hidden',
        //                                             marginRight: 4,
        //                                         }}
        //                                         className="flex text-black"
        //                                     >
        //                                         {chain.iconUrl && (<>
        //                                             <img
        //                                                 alt={chain.name ?? 'Chain icon'}
        //                                                 src={chain.iconUrl}
        //                                                 style={{ width: 24, height: 24 }}
        //                                             />

        //                                         </>
        //                                         )}
        //                                     </div>
        //                                 </>
        //                                 )}
        //                                 {!display ? (<>{chain.name}</>) : (<></>)}
        //                                 <ChevronDown />
        //                             </Button>

        //                             <Button onClick={openAccountModal}
        //                                 className={cn('font-bold w-full p-2', "bg-white hover:bg-gray-100 border border-gray-100 shadow dark:bg-gray-200 dark:text-black dark:hover:bg-gray-100")}>
        //                                 <div className={cn('rounded-full text-base w-[24px] h-[24px] mr-2')} style={{
        //                                     ...({ backgroundColor: avatar.color }),

        //                                 }}
        //                                 >{avatar.emoji}</div>
        //                                 {account.displayName}
        //                                 {/* {account.displayBalance
        //                                     ? ` (${account.displayBalance})`
        //                                     : ''} */}
        //                                 <ChevronDown />
        //                             </Button>
        //                         </div>
        //                     );
        //                 })()}
        //             </div >
        //         );
        //     }}
        // </ConnectButton.Custom >
    );
};