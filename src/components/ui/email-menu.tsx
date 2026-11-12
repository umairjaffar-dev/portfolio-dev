"use client";

import * as Popover from "@radix-ui/react-popover";
import { Check, Copy, Mail } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { SiGmail } from "react-icons/si";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { cn } from "@/lib/utils";

/**
 * A plain `mailto:` link silently does nothing when the visitor has no default
 * mail app (common with Chrome on Windows). This menu offers webmail compose
 * links, the mail app, and copy-to-clipboard instead.
 */
export function EmailMenu({
  email,
  children,
  triggerClassName,
  triggerLabel,
  side = "bottom",
  align = "end",
}: {
  email: string;
  /** Trigger content (icon or full button body). */
  children: ReactNode;
  triggerClassName?: string;
  /** Accessible name when the trigger is icon-only. */
  triggerLabel?: string;
  side?: "top" | "bottom";
  align?: "start" | "center" | "end";
}) {
  const [copied, setCopied] = useState(false);
  const to = encodeURIComponent(email);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      const input = document.createElement("textarea");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
  };

  const item =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-text transition hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none";

  return (
    <Popover.Root>
      <Popover.Trigger aria-label={triggerLabel} className={triggerClassName}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={side}
          align={align}
          sideOffset={8}
          collisionPadding={12}
          className="z-50 w-64 rounded-xl border border-border bg-surface p-1.5 shadow-xl shadow-black/30 data-[state=open]:animate-fade-up"
        >
          <p className="truncate px-3 pt-2 pb-1.5 font-mono text-[11px] text-muted">{email}</p>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${to}`}
            target="_blank"
            rel="noopener noreferrer"
            className={item}
          >
            <SiGmail className="size-4 text-accent" aria-hidden="true" />
            Write in Gmail
          </a>
          <a
            href={`https://outlook.live.com/mail/0/deeplink/compose?to=${to}`}
            target="_blank"
            rel="noopener noreferrer"
            className={item}
          >
            <PiMicrosoftOutlookLogo className="size-4 text-accent" aria-hidden="true" />
            Write in Outlook
          </a>
          <a href={`mailto:${email}`} className={item}>
            <Mail className="size-4 text-accent" aria-hidden="true" />
            Open mail app
          </a>
          <div className="my-1 h-px bg-border" />
          <button type="button" onClick={copy} className={item} aria-live="polite">
            {copied ? (
              <Check className="size-4 text-live" aria-hidden="true" />
            ) : (
              <Copy className="size-4 text-accent" aria-hidden="true" />
            )}
            <span className={cn(copied && "text-live")}>
              {copied ? "Copied to clipboard" : "Copy email address"}
            </span>
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
