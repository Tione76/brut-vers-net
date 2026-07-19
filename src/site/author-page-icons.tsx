import type { ReactNode, SVGProps } from "react";
import type { AuthorSectionIcon } from "@/site/author";

function IconBase({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1.125rem"
      height="1.125rem"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function AuthorUserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconBase>
  );
}

export function AuthorBookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </IconBase>
  );
}

export function AuthorTargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </IconBase>
  );
}

export function AuthorShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </IconBase>
  );
}

const SECTION_ICONS: Record<
  AuthorSectionIcon | "shield",
  (props: SVGProps<SVGSVGElement>) => ReactNode
> = {
  user: AuthorUserIcon,
  book: AuthorBookIcon,
  target: AuthorTargetIcon,
  shield: AuthorShieldIcon,
};

export function AuthorSectionIcon({
  name,
  className,
}: {
  name: AuthorSectionIcon | "shield";
  className?: string;
}) {
  const Icon = SECTION_ICONS[name];
  return <Icon className={className} />;
}
