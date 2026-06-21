'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Badge } from '@/components/ui/badge';
import { Maximize2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type Project = {
  title: string;
  href: string;
  miniDesc: string;
  date: string;
  isHackathonWinner?: boolean;
  description: string;
  technologies: readonly string[];
  links: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  image: string;
  video: string;
};

export default function ExpandableProjectCard({ projects }: { projects: readonly Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {mounted
        ? createPortal(
            <>
              <AnimatePresence>
                {active && (
                  <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/20 h-full w-full z-10"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {active && (
                  <div key="card" className="fixed inset-0 grid place-items-center z-[100]">
                    <motion.button
                      key={`button-${active.title}-${id}`}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.05 },
                      }}
                      className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                      onClick={() => setActive(null)}
                    >
                      <CloseIcon />
                    </motion.button>
                    <motion.div
                      layoutId={`card-${active.title}-${id}`}
                      ref={ref}
                      className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                    >
                      <motion.div layoutId={`image-${active.title}-${id}`}>
                        {active.video ? (
                          <video
                            src={active.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover"
                          />
                        ) : (
                          <img
                            width={200}
                            height={200}
                            src={active.image || '/placeholder.png'}
                            alt={active.title}
                            className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                          />
                        )}
                      </motion.div>

                      <div>
                        <div className="flex justify-between items-start p-4">
                          <div className="flex-1 min-w-0">
                            <motion.h3
                              layoutId={`title-${active.title}-${id}`}
                              className="font-bold text-neutral-700 dark:text-neutral-200 flex items-center gap-2 flex-wrap"
                            >
                              {active.title}
                              {active.isHackathonWinner && (
                                <span className="bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-[length:200%_auto] animate-shimmer text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-950 leading-normal">
                                  Hackathon Winner
                                </span>
                              )}
                            </motion.h3>
                            <motion.p
                              layoutId={`description-${active.miniDesc}-${id}`}
                              className="text-neutral-600 dark:text-neutral-400"
                            >
                              {active.miniDesc} — {active.date}
                            </motion.p>
                          </div>

                          <motion.a
                            layoutId={`button-${active.title}-${id}`}
                            href={active.links.find(l => l.type === 'Source')?.href || active.href}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 bg-primary text-primary-foreground"
                          >
                            View Details <ExternalLink className="size-3.5" />
                          </motion.a>
                        </div>
                        <div className="pt-4 relative px-4">
                          <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                          >
                            <p>{active.description}</p>
                            {active.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {active.technologies.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-[11px] font-medium border border-neutral-300 dark:border-neutral-600 h-6 w-fit px-2"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            {active.links.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {active.links.map((link) => (
                                  <Link
                                    key={link.type}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                  >
                                    {link.icon}
                                    {link.type}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </>,
            document.body,
          )
        : null}
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.title}-${id}`}
            key={`card-${project.title}-${id}`}
            onClick={() => setActive(project)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row flex-1 min-w-0">
              <motion.div layoutId={`image-${project.title}-${id}`}>
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                ) : (
                  <img
                    width={100}
                    height={100}
                    src={project.image || '/placeholder.png'}
                    alt={project.title}
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                )}
              </motion.div>
              <div className="min-w-0">
                <motion.h3
                  layoutId={`title-${project.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left flex items-center gap-2 flex-wrap"
                >
                  {project.title}
                  {project.isHackathonWinner && (
                    <span className="bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-[length:200%_auto] animate-shimmer text-[11px] font-bold px-2 py-0.5 rounded-full text-amber-950 leading-normal">
                      Hackathon Winner
                    </span>
                  )}
                </motion.h3>
                <motion.p
                  layoutId={`description-${project.miniDesc}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-sm"
                >
                  {project.miniDesc}
                </motion.p>
                <motion.span className="text-neutral-500 dark:text-neutral-500 text-center md:text-left text-xs block">
                  {project.date}
                </motion.span>
              </div>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-1 md:gap-2 mt-4 md:mt-0 shrink-0">
              <motion.button
                layoutId={`button-${project.title}-${id}`}
                className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}
