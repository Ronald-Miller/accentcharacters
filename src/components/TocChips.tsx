import {
  ClipboardCopy,
  Table2,
  Keyboard,
  Code2,
  CircleHelp,
  Compass,
} from "lucide-react";

const ITEMS = [
  { href: "#copy", label: "Copy & Paste", icon: ClipboardCopy },
  { href: "#alt-codes", label: "ALT Codes", icon: Table2 },
  { href: "#how-to", label: "How to Type", icon: Keyboard },
  { href: "#technical", label: "Technical Info", icon: Code2 },
  { href: "#faq", label: "FAQ", icon: CircleHelp },
  { href: "#related", label: "More Letters", icon: Compass },
];

export function TocChips() {
  return (
    <nav aria-label="On this page" className="flex flex-wrap gap-2">
      {ITEMS.map(({ href, label, icon: Icon }) => (
        <a key={href} href={href} className="toc-chip">
          <Icon size={14} className="text-signal" />
          {label}
        </a>
      ))}
    </nav>
  );
}
