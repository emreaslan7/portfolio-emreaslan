/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import { DATA } from '@/data/resume';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowUpRight, ChevronDown, Flame, GitCommit } from 'lucide-react';

const BLUR_FADE_DELAY = 0.04;

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface WeekData {
  days: (ContributionDay | null)[];
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getLevelClass(level: number): string {
  switch (level) {
    case 1:
      return 'bg-emerald-200 dark:bg-emerald-800/80 border-emerald-300/50 dark:border-emerald-700/50 hover:border-emerald-400';
    case 2:
      return 'bg-emerald-400 dark:bg-emerald-600 border-emerald-500/50 dark:border-emerald-500/50 hover:border-emerald-300';
    case 3:
      return 'bg-emerald-500 dark:bg-emerald-500 border-emerald-600/50 dark:border-emerald-400/50 hover:border-emerald-200';
    case 4:
      return 'bg-emerald-600 dark:bg-emerald-400 border-emerald-700/50 dark:border-emerald-300/50 hover:border-emerald-100';
    case 0:
    default:
      return 'bg-muted/60 dark:bg-muted/30 border-border/20 hover:border-border';
  }
}

export default function GithubContributionsSection() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('lastYear');
  const scrollRef = useRef<HTMLDivElement>(null);

  const githubUrl = DATA.contact.social.GitHub.url;
  const username = githubUrl.split('/').filter(Boolean).pop() || 'emreaslan7';

  useEffect(() => {
    let isMounted = true;
    async function fetchContributions() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!res.ok) throw new Error('Failed to fetch contributions');
        const json: ApiResponse = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load GitHub contributions', err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [username]);

  // Available years
  const availableYears = useMemo(() => {
    if (!data?.total) return ['lastYear'];
    const years = Object.keys(data.total)
      .filter((k) => k !== 'lastYear' && !isNaN(Number(k)))
      .sort((a, b) => Number(b) - Number(a));
    return ['lastYear', ...years];
  }, [data]);

  // Filtered contributions
  const filteredContributions = useMemo(() => {
    if (!data?.contributions) return [];

    if (selectedYear === 'lastYear') {
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setDate(today.getDate() - 364);

      const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];
      const todayStr = today.toISOString().split('T')[0];

      return data.contributions
        .filter((c) => c.date >= oneYearAgoStr && c.date <= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date));
    }

    return data.contributions
      .filter((c) => c.date.startsWith(selectedYear))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [data, selectedYear]);

  // Quick stats
  const stats = useMemo(() => {
    if (!filteredContributions.length) {
      return { total: 0, activeDays: 0, maxStreak: 0 };
    }

    let total = 0;
    let activeDays = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < filteredContributions.length; i++) {
      const count = filteredContributions[i].count;
      total += count;

      if (count > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    return { total, activeDays, maxStreak };
  }, [filteredContributions]);

  // Weeks & month labels
  const { weeks, monthLabels } = useMemo(() => {
    if (!filteredContributions.length) {
      return { weeks: [], monthLabels: [] };
    }

    const weeksList: WeekData[] = [];
    const months: { label: string; weekIndex: number }[] = [];

    const firstDateParts = filteredContributions[0].date.split('-').map(Number);
    const firstDateObj = new Date(firstDateParts[0], firstDateParts[1] - 1, firstDateParts[2]);
    const startDayOfWeek = firstDateObj.getDay(); // 0 = Sun ... 6 = Sat

    let currentWeekDays: (ContributionDay | null)[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeekDays.push(null);
    }

    filteredContributions.forEach((day) => {
      currentWeekDays.push(day);

      if (currentWeekDays.length === 7) {
        weeksList.push({ days: currentWeekDays });
        currentWeekDays = [];
      }
    });

    if (currentWeekDays.length > 0) {
      while (currentWeekDays.length < 7) {
        currentWeekDays.push(null);
      }
      weeksList.push({ days: currentWeekDays });
    }

    let lastLabeledMonth = -1;
    let lastLabeledWeek = -99;

    weeksList.forEach((week, wIdx) => {
      const firstValidDay = week.days.find((d) => d !== null);
      if (!firstValidDay) return;

      const startOfMonthDay = week.days.find(
        (d) => d && Number(d.date.split('-')[2]) <= 7 && Number(d.date.split('-')[2]) >= 1
      );

      const targetDay = startOfMonthDay || (wIdx === 0 ? firstValidDay : null);
      if (!targetDay) return;

      const monthIdx = Number(targetDay.date.split('-')[1]) - 1;

      if (monthIdx !== lastLabeledMonth && wIdx - lastLabeledWeek >= 3) {
        months.push({
          label: MONTH_NAMES[monthIdx],
          weekIndex: wIdx,
        });
        lastLabeledMonth = monthIdx;
        lastLabeledWeek = wIdx;
      }
    });

    return { weeks: weeksList, monthLabels: months };
  }, [filteredContributions]);

  // Auto scroll to the right (most recent activity) on load/update on mobile
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [selectedYear, loading, weeks]);

  return (
    <section id="contributions" className="w-full">
      <div className="flex min-h-0 flex-col gap-y-4">
        {/* Minimal Section Header */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">GitHub Contributions</h2>

            {/* Minimal Year Selector */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-background hover:bg-accent/40 border border-border text-xs font-medium rounded-lg pl-3 pr-6 py-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                aria-label="Select Year"
              >
                {availableYears.map((yearKey) => (
                  <option key={yearKey} value={yearKey} className="bg-background text-foreground">
                    {yearKey === 'lastYear' ? 'Last Year' : yearKey}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-3.5 absolute right-1.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </BlurFade>

        {/* Content Container */}
        <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
          <div className="flex flex-col gap-3">
            {/* Top Sub-bar: Minimal inline stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-muted-foreground">
              <div className="flex flex-wrap items-center gap-1.5">
                <GitCommit className="size-3.5 text-emerald-500 shrink-0" />
                <span>
                  <strong className="text-foreground font-semibold">
                    {loading ? '...' : stats.total.toLocaleString()}
                  </strong>{' '}
                  contributions in {selectedYear === 'lastYear' ? 'the last year' : selectedYear}
                </span>
                {!loading && stats.maxStreak > 0 && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground/80">
                    <span className="text-muted-foreground/40">·</span>
                    <Flame className="size-3.5 text-red-500 fill-red-500/20 shrink-0" />
                    <span>{stats.maxStreak}d longest streak</span>
                  </span>
                )}
              </div>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-0.5 text-[11px] self-start sm:self-auto"
              >
                <span>@{username}</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>

            {/* Heatmap Grid Area */}
            {loading ? (
              <div className="w-full flex flex-col gap-2 py-2">
                <div className="h-3 w-28 bg-muted/60 rounded-md animate-pulse" />
                <div className="h-[76px] w-full bg-muted/30 rounded-lg animate-pulse" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-between py-4 text-xs text-muted-foreground">
                <span>Unable to load GitHub contributions at the moment.</span>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  View GitHub <ArrowUpRight className="size-3" />
                </a>
              </div>
            ) : (
              <TooltipProvider delayDuration={0}>
                <div className="flex flex-col gap-1 w-full select-none">
                  {/* Scrollable Container on Mobile */}
                  <div
                    ref={scrollRef}
                    className="overflow-x-auto pb-1.5 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
                  >
                    <div className="min-w-[580px] w-full flex flex-col gap-1">
                      {/* Month Labels Header */}
                      <div className="flex w-full">
                        <div className="w-5 sm:w-6 shrink-0" />
                        <div className="flex-1 relative h-3.5 text-[10px] text-muted-foreground font-medium">
                          {monthLabels.map((m, idx) => (
                            <span
                              key={idx}
                              className="absolute whitespace-nowrap leading-none"
                              style={{
                                left: `${(m.weekIndex / (weeks.length || 1)) * 100}%`,
                              }}
                            >
                              {m.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Grid: Day Labels + Week Columns */}
                      <div className="flex w-full gap-1 items-stretch">
                        {/* Day Labels (Mon, Wed, Fri) aligned with row heights */}
                        <div className="w-5 sm:w-6 shrink-0 grid grid-rows-7 text-[9px] text-muted-foreground font-medium select-none">
                          <span className="row-start-2 flex items-center justify-end pr-1.5 leading-none">
                            Mon
                          </span>
                          <span className="row-start-4 flex items-center justify-end pr-1.5 leading-none">
                            Wed
                          </span>
                          <span className="row-start-6 flex items-center justify-end pr-1.5 leading-none">
                            Fri
                          </span>
                        </div>

                        {/* Weeks Columns */}
                        <div className="flex-1 flex gap-[2px] sm:gap-[2.5px] items-center justify-between min-w-0">
                          {weeks.map((week, wIdx) => (
                            <div
                              key={wIdx}
                              className="flex-1 flex flex-col gap-[2px] sm:gap-[2.5px] min-w-0"
                            >
                              {week.days.map((day, dIdx) => {
                                if (!day) {
                                  return (
                                    <div
                                      key={`empty-${dIdx}`}
                                      className="w-full aspect-square opacity-0 pointer-events-none"
                                      aria-hidden
                                    />
                                  );
                                }

                                const tooltipText =
                                  day.count === 0
                                    ? `No contributions on ${formatDate(day.date)}`
                                    : `${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`;

                                return (
                                  <Tooltip key={day.date}>
                                    <TooltipTrigger asChild>
                                      <div
                                        className={`w-full aspect-square rounded-[2px] border transition-all duration-150 cursor-pointer hover:scale-150 hover:z-30 hover:shadow-xs ${getLevelClass(
                                          day.level
                                        )}`}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sans z-50">
                                      {tooltipText}
                                    </TooltipContent>
                                  </Tooltip>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Heatmap Footer Legend */}
                  <div className="flex items-center justify-end text-[10px] text-muted-foreground gap-1.5 pt-1">
                    <span>Less</span>
                    <div className="flex gap-1 items-center">
                      <div className="size-2 rounded-[1.5px] bg-muted/60 dark:bg-muted/30 border border-border/20" />
                      <div className="size-2 rounded-[1.5px] bg-emerald-200 dark:bg-emerald-800/80 border border-emerald-300/50 dark:border-emerald-700/50" />
                      <div className="size-2 rounded-[1.5px] bg-emerald-400 dark:bg-emerald-600 border border-emerald-500/50 dark:border-emerald-500/50" />
                      <div className="size-2 rounded-[1.5px] bg-emerald-500 dark:bg-emerald-500 border border-emerald-600/50 dark:border-emerald-400/50" />
                      <div className="size-2 rounded-[1.5px] bg-emerald-600 dark:bg-emerald-400 border border-emerald-700/50 dark:border-emerald-300/50" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </TooltipProvider>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
