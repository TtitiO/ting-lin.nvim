export interface NavItem {
  path: string;
  labelKey: string;
  displayName: string;
  iconName: "home" | "person" | "beaker" | "blog";
  color: string;
}

export const navItems: NavItem[] = [
  { path: "/",         labelKey: "nav.home",     displayName: "home",     iconName: "home",    color: "var(--ctp-lavender)" },
  { path: "/about",    labelKey: "nav.about",    displayName: "about",    iconName: "person",  color: "var(--ctp-blue)" },
  { path: "/research", labelKey: "nav.research", displayName: "research", iconName: "beaker",  color: "var(--ctp-teal)" },
  { path: "/blog",     labelKey: "nav.blog",     displayName: "blog",     iconName: "blog",    color: "var(--ctp-pink)" },
];

export const bufferTabs = navItems.map((n) => ({
  path: n.path,
  label: n.labelKey,
  filename: n.displayName,
  icon: n.iconName,
}));
