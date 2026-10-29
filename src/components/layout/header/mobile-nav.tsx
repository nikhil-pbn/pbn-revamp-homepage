"use client";

import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HEADER_ACTIONS, MOBILE_SOLUTION_GROUPS, NAV_ITEMS } from "@/constants/navigation";
import { PLACEHOLDER_HREF } from "@/constants/site";
import { Icon } from "@/icons";

const TOP_LINK_CLASS = "block border-b border-line py-4 text-base";

/** Burger button + full-width slide-in menu below the header (<1180px). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    // Non-modal so the header (and its burger) stays interactive above the panel.
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="hidden size-10.5 cursor-pointer place-items-center rounded-[10px] border border-line bg-white max-xl:grid"
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        // Only the burger, a link or Escape closes the menu; the header stays usable.
        onInteractOutside={(event) => event.preventDefault()}
        aria-describedby={undefined}
        className="top-safe-nav bottom-0 z-69 h-auto w-full max-w-none gap-0 overflow-y-auto border-0 pt-3 pr-(--gut-r) pb-10 pl-(--gut-l) shadow-none sm:max-w-none xl:hidden"
      >
        <SheetTitle className="sr-only">Mobile menu</SheetTitle>

        <Accordion type="multiple">
          {NAV_ITEMS.map((item) => {
            if (item.kind === "link") return null;
            const groups =
              item.kind === "mega"
                ? MOBILE_SOLUTION_GROUPS
                : item.groups.map((group) => ({ title: group.title, items: group.items.map((link) => link.title) }));

            return (
              <AccordionItem key={item.label} value={item.label} className="border-b border-line last:border-b">
                <AccordionTrigger className="py-4 text-base font-normal hover:no-underline">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-0.5 pb-3.5">
                  {groups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-0.5">
                      <b className="mt-2.5 text-xs font-medium tracking-[.06em] text-brand uppercase">{group.title}</b>
                      {group.items.map((link) => (
                        <a key={link} href={PLACEHOLDER_HREF} onClick={close} className="py-2 text-sm text-ink-soft">
                          {link}
                        </a>
                      ))}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {NAV_ITEMS.map((item) =>
          item.kind === "link" ? (
            <a key={item.label} href={item.href} onClick={close} className={TOP_LINK_CLASS}>
              {item.label}
            </a>
          ) : null,
        )}
        {HEADER_ACTIONS.utilityLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={close} className={TOP_LINK_CLASS}>
            {link.label}
          </a>
        ))}
      </SheetContent>
    </Sheet>
  );
}
