import type { SiteColors } from "@/framework/types";

export function ThemeStyles({ colors }: { colors: SiteColors }) {
  const css = `:root {
    --color-primary: ${colors.primary};
    --color-primary-hover: ${colors.primaryHover};
    --color-primary-light: ${colors.primaryLight};
    --color-accent: ${colors.accent};
    --color-background: ${colors.background};
    --color-surface: ${colors.surface};
    --color-border: ${colors.border};
    --color-text: ${colors.text};
    --color-text-muted: ${colors.textMuted};
    --color-text-inverse: ${colors.textInverse};
    --color-focus: ${colors.focus};
    --color-success: ${colors.success};
    --color-error: ${colors.error};
    --ds-brand: ${colors.primary};
    --ds-brand-dark: ${colors.primaryHover};
    --ds-brand-hover: ${colors.primaryHover};
    --ds-brand-active: #c66f28;
    --ds-brand-light: ${colors.primaryLight};
  }`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
