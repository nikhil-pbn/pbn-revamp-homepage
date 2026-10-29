import { ArrowLink, CheckList, ProductAvatar } from "@/components/common";
import { PLATFORM, type PlatformProduct } from "@/constants/platform";

export function ProductCopy({ product }: { product: PlatformProduct }) {
  return (
    <>
      <span className="flex items-center gap-3 pl-1.25">
        <ProductAvatar avatar={product.avatar} sizes="60px" className="size-15 rounded-full shadow-pag" />
        <span className="text-eyebrow">{product.tab}</span>
      </span>
      <h3 className="m-0 text-[clamp(26px,2.4vw,34px)] leading-[1.15] font-normal tracking-tight max-md:text-[24px]">
        {product.heading}
      </h3>
      <p className="m-0 text-base text-ink-soft">{product.body}</p>
      <CheckList items={product.bullets} className="mt-0.5 max-lg:mx-auto max-lg:w-fit max-lg:text-left" />
      <ArrowLink href={PLATFORM.learnMore.href} className="self-start max-lg:self-center">
        {PLATFORM.learnMore.label}
      </ArrowLink>
    </>
  );
}
