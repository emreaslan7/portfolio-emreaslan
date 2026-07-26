/* eslint-disable @next/next/no-img-element */
'use client';

import BlurFade from '@/components/magicui/blur-fade';
import { ExpandableScreen, ExpandableScreenContent, ExpandableScreenTrigger } from '@/components/ui/expandable-screen';
import { DATA } from '@/data/resume';
import { ArrowUpRight } from 'lucide-react';

const BLUR_FADE_DELAY = 0.04;

export default function CertificationsSection() {
  return (
    <section id="certifications">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">Certifications</h2>
        </BlurFade>
        <div className="flex flex-col gap-4">
          {DATA.certifications.map((cert, index) => (
            <BlurFade key={cert.title} delay={BLUR_FADE_DELAY * 10 + index * 0.05}>
              <ExpandableScreen animationDuration={0.3}>
                <ExpandableScreenTrigger className="w-full">
                  <div className="flex items-center gap-x-3 justify-between cursor-pointer rounded-xl border border-border bg-background p-3 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      {cert.logoUrl ? (
                        <img
                          src={cert.logoUrl}
                          alt={cert.issuer}
                          className="size-10 md:size-12 p-1.5 border rounded-lg shadow ring-2 ring-border overflow-hidden object-contain flex-none bg-white"
                        />
                      ) : (
                        <div className="size-10 md:size-12 border rounded-lg shadow ring-2 ring-border bg-muted flex-none flex items-center justify-center">
                          <span className="text-muted-foreground text-xs font-medium">Cert</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none">{cert.title}</div>
                        <div className="font-sans text-sm text-muted-foreground">{cert.issuer}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                      <span className="font-medium text-foreground/70">View</span>
                    </div>
                  </div>
                </ExpandableScreenTrigger>

                <ExpandableScreenContent>
                  <div className="flex flex-col items-center justify-center p-6 md:p-12 w-full max-w-4xl mx-auto">
                    {cert.image && (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="max-h-[70vh] w-auto max-w-full rounded-xl shadow-2xl object-contain"
                      />
                    )}
                    <div className="mt-8 text-center max-w-lg">
                      <h3 className="text-xl font-bold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          View on Coursera
                          <ArrowUpRight className="size-3.5" />
                        </a>
                        {cert.notesUrl && (
                          <a
                            href={cert.notesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                          >
                            Course Notes
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ExpandableScreenContent>
              </ExpandableScreen>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
