/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/shadcn/ui/button';
import { encodeToSafeBase64 } from '@/lib/encodeAndDecode';
import { useEffect, useState } from 'react';


const TG_URL = "https://t.me/TokenScriptTest_Bot/explorer";

export function getTgUrl() {
  const pathName = window.location.pathname;
  if (pathName) {
    const safeBase64 = encodeToSafeBase64(pathName);
    return `${TG_URL}?startapp=${safeBase64}`;
  } else {
    return TG_URL;
  }
}

export const ShareToTg = () => {
  const [tgUrl, setTgUrl] = useState(TG_URL);

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName) {
      const safeBase64 = encodeToSafeBase64(pathName);
      setTgUrl(`${TG_URL}?startapp=${safeBase64}`);
    }
  }, []);

  return (
    <Button asChild className="h-6 w-6 shrink-0 rounded-full border-none p-0">
      <a href={tgUrl} target="_blank" title="Share on Telegram">
        <img
          src="https://cdn3.iconfinder.com/data/icons/social-icons-33/512/Telegram-1024.png"
          className="h-full w-full"
          alt="Telegram icon"
        />
      </a>
    </Button>
  );
}