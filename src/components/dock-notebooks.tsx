"use client";

import { useState, useRef } from "react";
import { DockIcon } from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

export function DockNotebooks() {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
        <span className="size-full flex items-center justify-center">
          <DATA.notebook.icon className="size-full rounded-sm overflow-hidden object-contain" />
        </span>
      </DockIcon>
      {open && (
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex gap-2 bg-background/90 border border-border rounded-3xl p-2 shadow-lg backdrop-blur-3xl">
          {DATA.notebook.links.map((link) => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <div className="size-10 rounded-3xl bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors flex items-center justify-center">
                    <link.icon className="size-full rounded-sm overflow-hidden object-contain p-1.5" />
                  </div>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                <p>{link.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
