import { Fragment } from "react";

import { Button, ButtonArrow } from "@/components/ui/button";
import {
  FOOTER_BOTTOM,
  FOOTER_COLUMNS,
  FOOTER_CONTACT,
  FOOTER_CTA,
  FOOTER_SOCIAL,
  FOOTER_SOLUTIONS,
  FOOTER_SOLUTIONS_TITLE,
} from "@/constants/footer";
import { ANCHORS, PLACEHOLDER_HREF } from "@/constants/site";
import { FilledIcon, Logo } from "@/icons";

const DIVIDER = "border-b border-white/12";

export function Footer() {
  return (
    <footer className="bg-ink pt-18 pb-8 text-[13.5px] text-footer-text">
      <div className="wrap">
        <div
          className={`flex flex-wrap items-start justify-between gap-8 pb-10 max-lg:flex-col max-lg:items-center max-lg:text-center ${DIVIDER}`}
        >
          <div>
            <a href={ANCHORS.top} className="flex items-center max-lg:justify-center">
              <Logo className="h-[58px] w-auto text-white" />
            </a>
            <div className="mt-[18px] flex flex-col gap-2">
              {FOOTER_CONTACT.map((item) => (
                <a key={item.label} href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-[18px] flex gap-2.5 max-lg:justify-center">
              {FOOTER_SOCIAL.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-[38px] place-items-center rounded-full bg-white/8 transition-colors duration-200 hover:bg-brand hover:text-white"
                >
                  <FilledIcon name={social.icon} size={social.size} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex max-w-[420px] flex-col items-start gap-3.5 max-lg:items-center">
            <b className="text-2xl/tight font-normal tracking-[-.02em] text-white">
              {FOOTER_CTA.lines.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && " "}
                  <span className="whitespace-nowrap">{line}</span>
                </Fragment>
              ))}
            </b>
            <Button asChild>
              <a href={FOOTER_CTA.href}>
                {FOOTER_CTA.button} <ButtonArrow />
              </a>
            </Button>
          </div>
        </div>

        <div className={`py-10 max-lg:text-center ${DIVIDER}`}>
          <h4 className="m-0 mb-[22px] text-[15px] font-medium text-white">{FOOTER_SOLUTIONS_TITLE}</h4>
          <div className="grid grid-cols-4 gap-x-6 gap-y-7 max-md:grid-cols-2">
            {FOOTER_SOLUTIONS.map((group) => (
              <div key={group.title}>
                <h5 className="m-0 mb-3 text-xs font-medium tracking-[.08em] text-mint uppercase">{group.title}</h5>
                <LinkList links={group.links} />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`grid grid-cols-7 gap-6 py-10 max-xl:grid-cols-4 max-lg:text-center max-md:grid-cols-2 ${DIVIDER}`}
        >
          {FOOTER_COLUMNS.map((group) => (
            <div key={group.title}>
              <h4 className="m-0 mb-3.5 text-sm font-medium text-white">{group.title}</h4>
              <LinkList links={group.links} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-6 text-[12.5px] text-footer-muted max-lg:justify-center max-lg:text-center">
          <span>{FOOTER_BOTTOM.copyright}</span>
          <span>{FOOTER_BOTTOM.legal}</span>
        </div>
      </div>
    </footer>
  );
}

function LinkList({ links }: { links: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {links.map((link) => (
        <li key={link}>
          <a href={PLACEHOLDER_HREF} className="hover:text-white">
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
}
