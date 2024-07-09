"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/shadcn/ui/button"
import { Checkbox } from "@/components/shadcn/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form"
import { toast } from "@/components/shadcn/ui/use-toast"
import { CHAINS_LIST, DEFAULT_CHAINS } from "@/lib/constants"
import { useSetAtom } from "jotai"
import { setChainsAtom } from "@/lib/store"
import { mainnet } from "wagmi/chains"

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

export default function ChainList() {
    const setChains = useSetAtom(setChainsAtom)
    const form = useForm<z.infer<typeof FormSchema>>({
        //resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [11_155_111, 84532],
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {

        setChains([mainnet])

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">ChainList</FormLabel>
                                <FormDescription>
                                    Select the chains that you want to use.
                                </FormDescription>
                            </div>
                            <div className="grid grid-cols-4">
                                {CHAINS_LIST.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox className="bg-gray-300"
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {item.name}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="font-bold text-white">Submit</Button>
            </form>
        </Form>
    )
}
