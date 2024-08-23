"use client"

import { useRef } from "react"
import { useIframePostMessage } from "@/components/hooks/use-iframe-post-message"
interface ScriptFrameProps {
    url: string;
}
export const ScriptIframe = ({ url }: ScriptFrameProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)


    useIframePostMessage(iframeRef, url)

    return (

        <iframe
            ref={iframeRef}
            src={url}
            className="mx-auto h-[650px] max-w-[500px] w-full iframe-placeholder"
        ></iframe>

    )
}
