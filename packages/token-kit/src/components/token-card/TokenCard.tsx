import React from "react";
import { OpenseaIcon } from "../icons/opensea-icon";
import { Card, CardContent, CardFooter, CardHeader } from "../shadcn/ui/card";
import "./TokenCard.css";
import { TokenCardProps } from "./TokenCard.types";

export const TokenCard: React.FC<TokenCardProps> = (props) => {
  return (
    <Card>
      <CardHeader className="relative space-y-0 p-0">
        <a
          href="https://opensea.io/assets/matic/0xd5ca946ac1c1f24eb26dae9e1a53ba6a02bd97fe/1202370524"
          target="_blank"
        >
          <OpenseaIcon className="absolute right-2 top-2" />
        </a>
        <img
          className="rounded-lg"
          src="https://resources.smartlayer.network/smartcat/reources/images/728f89dfd7c9cba9403660e5d8cf92c5.png"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold leading-none">
            Description
          </h3>
          <p className="text-muted-foreground text-sm">
            SmartCat#2426-4190613720
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="w-full">
          <h3 className="mb-2 text-lg font-semibold leading-none">Traits</h3>
          <div className="flex w-full flex-col flex-wrap gap-2">
            {[
              { trait_type: "Head", value: "Big" },
              { trait_type: "Body", value: "Huge" },
              { trait_type: "Body", value: "Huge" },
              { trait_type: "Body", value: "Huge" },
              { trait_type: "Body", value: "Huge" },
            ].map(({ trait_type, value }) => {
              return (
                <div className="flex w-full flex-col items-center rounded-md border bg-primary-100/10">
                  <div className="font-semibold">{trait_type}</div>
                  <div>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
