import Link from "next/link";
import { CalendarHeart, Sparkles, Users } from "lucide-react";
import { Fraunces } from "next/font/google";

import { Button } from "@/components/ui/button";
import { appShellClass, siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

function collectEntryHref(isSignedIn: boolean) {
  if (isSignedIn) {
    return siteConfig.routes.collect;
  }
  const q = new URLSearchParams({ callbackUrl: siteConfig.routes.collect });
  return `${siteConfig.routes.login}?${q.toString()}`;
}

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
});

type LandingPageProps = {
  isSignedIn: boolean;
};

export function LandingPage({ isSignedIn }: LandingPageProps) {
  const collectHref = collectEntryHref(isSignedIn);

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-violet-100/80 via-background to-amber-50/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgb(139 92 246 / 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgb(251 191 36 / 0.15), transparent)",
          }}
        />
        <div
          className={cn(
            appShellClass,
            "relative flex flex-col items-center pb-24 pt-20 text-center sm:pb-32 sm:pt-28",
          )}
        >
          <p className="mb-6 max-w-xl text-sm font-medium tracking-wide text-muted-foreground sm:text-base">
            When things get tough, remember how far you&apos;ve come.
          </p>
          <h1
            className={`${display.className} max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl sm:leading-[1.08] lg:text-6xl`}
          >
            Turn your &apos;Bad Days&apos; into &apos;Proud Moments&apos;.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A simple space to store your wins, or build a celebration of a friend&apos;s journey when they need a lift.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:mt-14">
            <Button asChild size="lg" className="rounded-full px-10 text-base shadow-md">
              <Link href={collectHref}>{isSignedIn ? "Start your memory collection" : "Sign in to start collecting"}</Link>
            </Button>
            <p className="max-w-md text-sm italic leading-relaxed text-muted-foreground/90">
              Small reminders of growth add up—especially on the hard days.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-background py-20 lg:py-28">
        <div className={appShellClass}>
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Why this exists
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Perspective you can return to—anytime you need it.
          </p>

          <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-20 lg:gap-12">
            <article className="group flex flex-col items-center rounded-2xl border border-border/80 bg-card/50 px-6 py-10 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/50 text-primary">
                <Users className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">For You</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                When you feel down or tough on yourself, your wins are still true. Keep them somewhere gentle and easy to
                revisit.
              </p>
            </article>

            <article className="group flex flex-col items-center rounded-2xl border border-border/80 bg-card/50 px-6 py-10 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/50 text-primary">
                <CalendarHeart className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">For Friends</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                Create a list of achievements to cheer up a loved one. A thoughtful gift when words alone don&apos;t feel
                enough.
              </p>
            </article>

            <article className="group flex flex-col items-center rounded-2xl border border-border/80 bg-card/50 px-6 py-10 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/50 text-primary">
                <Sparkles className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">Pure Perspective</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                Visualize growth through dates and images. Let the timeline remind you how far you—or they—have actually
                come.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className={appShellClass}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={`${display.className} text-2xl font-medium text-foreground sm:text-3xl`}>
              Ready to honor the path you&apos;re on?
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-10 shadow-sm">
              <Link href={collectHref}>{isSignedIn ? "Start your memory collection" : "Sign in to start collecting"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
