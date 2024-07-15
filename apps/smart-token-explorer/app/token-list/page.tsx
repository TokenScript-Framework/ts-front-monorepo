import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/shadcn/ui/card";

import { addressPipe } from "@/lib/utils";

export default function TokenListPage() {
  const TokenList = [
    {
      address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
      avatar: "/images/tokens/ETH.svg",
    },
    {
      address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
      avatar: "/images/tokens/ens.png",
    },
    {
      address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
      avatar: "/images/tokens/ETH.svg",
    },
    {
      address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
      avatar: "/images/tokens/ETH.svg",
    },
    {
      address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
      avatar: "/images/tokens/ETH.svg",
    },
    {
      address: "0xf1731D81BC7be92DBD9b759a63ECAFaA569C7D0a",
      avatar: "/images/tokens/ETH.svg",
    },
  ];
  return (
    <section className="fancy-overlay bg-primary-100/20 dark:bg-primary-900/10 min-h-screen pt-8">
      <div className="container-wide mx-auto">
        <h1 className="mb-4 uppercase">Token List</h1>
        <div className="grid grid-cols-3 gap-8">
          {TokenList.map((token) => (
            <>
              <Card className="p-8 text-center dark:bg-gray-900">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Avatar>
                    <AvatarImage src={token.avatar} alt="token" />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  {addressPipe(token.address)}
                </CardTitle>
                <CardHeader>
                  <div className="opacity-7 flex justify-between text-gray-500 dark:text-[#B3B3B3]">
                    <div>Chain ID</div>
                    <div>Currency</div>
                  </div>
                  <div className="flex justify-between font-bold">
                    <div>1(0x01)</div>
                    <div>ETH</div>
                  </div>
                </CardHeader>

                <Button
                  variant="outlinePrimary"
                  className="w-[150px] rounded-full"
                >
                  Add
                </Button>
              </Card>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
