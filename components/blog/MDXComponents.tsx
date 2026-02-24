import React from "react";

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl sm:text-4xl font-black text-white mt-10 mb-4 tracking-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold text-white mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-neutral-400 leading-relaxed mb-4 text-[15px] sm:text-base" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="text-neutral-400 space-y-2 mb-4 ml-4 list-disc list-outside" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="text-neutral-400 space-y-2 mb-4 ml-4 list-decimal list-outside" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-neutral-400 text-[15px] sm:text-base leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-neutral-300 italic" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-white/20 pl-4 my-6 text-neutral-500 italic" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-white/[0.08]" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left py-2 px-3 text-neutral-400 font-semibold text-xs uppercase tracking-wider" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="py-2 px-3 text-neutral-400 border-b border-white/[0.04] text-[13px]" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-white/[0.02]" {...props} />
  ),
  hr: () => (
    <hr className="border-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="text-sm bg-white/[0.06] px-1.5 py-0.5 rounded text-green-400 font-mono" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-white underline underline-offset-4 hover:text-green-400 transition-colors" {...props} />
  ),
};
