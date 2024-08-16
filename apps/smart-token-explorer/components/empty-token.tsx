import { Separator } from "./shadcn/ui/separator";
import { Skeleton } from "./shadcn/ui/skeleton";

export default function EmptyToken({
}: {
    }) {

    return (<>
        <div className="flex items-center px-3 py-2 h-[52px] font-bold">
            {/* <Skeleton className="w-[20px] ounded-lg h-8 bg-gray-200" /> */}
            Token Info
        </div>
        <Separator />
        <div className="mt-10 text-center text-muted-foreground font-bold text-2xl">
            No Token selected
        </div>
    </>
    );
}
