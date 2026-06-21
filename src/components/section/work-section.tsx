/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { DATA } from '@/data/resume';
import { ChevronDown } from 'lucide-react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Timeline, TimelineConnectItem, TimelineItem } from '@/components/timeline';

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-12 border rounded-full bg-muted flex items-center justify-center flex-none ring-2 ring-border">
        <span className="text-sm font-bold text-muted-foreground">{alt[0]}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-12 border rounded-full object-contain flex-none bg-background ring-2 ring-border"
      onError={() => setImageError(true)}
    />
  );
}

type WorkCompany = (typeof DATA.work)[number];
type WorkRole = WorkCompany['roles'][number];

function RoleDetail({ role, isLast }: { role: WorkRole; isLast: boolean }) {
  return (
    <div className="relative pl-8 pb-5 last:pb-0">
      {!isLast && <div className="absolute left-[11px] top-[12px] bottom-0 w-px bg-border" />}
      <span className="absolute left-0 top-[6px] size-[23px] rounded-full border bg-background border-border flex items-center justify-center ring-2 ring-background">
        <span className="size-2 rounded-full bg-muted-foreground/60" />
      </span>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-semibold leading-tight">{role.title}</h4>
          <span className="text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full leading-none font-medium">
            {role.employmentType}
          </span>
        </div>
        <div className="text-xs tabular-nums text-muted-foreground">
          {role.start} &mdash; {role.end}
          {role.duration && <span> &middot; {role.duration}</span>}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
        {role.highlights?.length > 0 && (
          <ul className="space-y-1 mt-0.5">
            {role.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CompanyCard({ company }: { company: WorkCompany }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <TimelineItem className="w-full flex items-start gap-4">
      <TimelineConnectItem className="flex items-start justify-center">
        <LogoImage src={company.logoUrl} alt={company.company} />
      </TimelineConnectItem>
      <div className="flex-1 min-w-0 pb-8 last:pb-0">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left group cursor-pointer">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-semibold leading-tight">{company.company}</h3>
                <ChevronDown
                  className={cn(
                    'size-4 text-muted-foreground transition-transform duration-200',
                    isOpen ? 'rotate-0' : '-rotate-90',
                  )}
                />
              </div>
              <div className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
                <span>{company.companyDuration}</span>
                <span className="hidden sm:inline">&middot;</span>
                <span>{company.workMode}</span>
                <span className="hidden sm:inline">&middot;</span>
                <span>{company.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 pt-0.5">
              {company.browser && (
                <a
                  href={company.browser}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors text-muted-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icons.globe className="size-3.5" />
                </a>
              )}
              {company.linkedin && (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors text-muted-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icons.linkedin className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="mt-5">
            {company.roles.map((role, idx) => (
              <RoleDetail key={`${role.title}-${role.start}`} role={role} isLast={idx === company.roles.length - 1} />
            ))}
          </div>
        )}
      </div>
    </TimelineItem>
  );
}

export default function WorkSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6 w-full">
      <h2 className="text-xl font-bold">Work Experience</h2>
      <Timeline>
        {DATA.work.map((company) => (
          <CompanyCard key={company.company} company={company} />
        ))}
      </Timeline>
    </div>
  );
}
