import { Button } from "@/components/ui/button";
import { HEADER_ACTIONS } from "@/constants/navigation";
import { ANCHORS } from "@/constants/site";
import { AiSparkle, Logo } from "@/icons";

import { DesktopNav } from "./desktop-nav";
import { HeaderBar } from "./header-bar";
import { MobileNav } from "./mobile-nav";

/**
 * Sticky site header. A Server Component: the logo and static links render as
 * HTML; only the scroll shadow, the dropdown menus and the mobile menu hydrate.
 */
export function Header() {
  return (
    <HeaderBar>
      <div className="relative wrap flex h-(--navh) items-center gap-5">
        <a href={ANCHORS.top} aria-label="Practice by Numbers home" className="flex flex-none items-center">
          <Logo className="h-11 w-auto text-ink" />
        </a>

        <DesktopNav />

        <div className="ml-auto flex items-center gap-2 text-sm">
          {HEADER_ACTIONS.utilityLinks.map((link) => (
            <a key={link.label} href={link.href} className="rounded-lg px-3 py-2 hover:bg-panel max-xl:hidden">
              {link.label}
            </a>
          ))}

          <a
            href={HEADER_ACTIONS.aiSuite.href}
            aria-label={HEADER_ACTIONS.aiSuite.ariaLabel}
            className="relative isolate inline-flex h-10 items-center gap-2 rounded-full border-[1.5px] border-transparent px-4 text-sm font-medium whitespace-nowrap text-brand shadow-ai-suite transition-[box-shadow,transform] duration-250 bg-ai-suite before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:content-[''] before:bg-ai-suite-glow hover:-translate-y-px hover:shadow-ai-suite-hover max-[600px]:w-10 max-[600px]:justify-center max-[600px]:px-0"
          >
            <AiSparkle width={18} className="flex-none animate-ai-twinkle" />
            <span className="max-[600px]:hidden">{HEADER_ACTIONS.aiSuite.label}</span>
          </a>

          <Button asChild size="sm">
            <a href={HEADER_ACTIONS.demo.href}>{HEADER_ACTIONS.demo.label}</a>
          </Button>

          <MobileNav />
        </div>
      </div>
    </HeaderBar>
  );
}
