import { Share2, Link2, Code2, MessageCircle } from "lucide-react";

const LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const SOCIALS = [
  { icon: Share2, label: "Twitter / X", href: "#" },
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: Code2, label: "GitHub", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-black tracking-[0.2em] text-sm uppercase mb-3">
              IMMERSE
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Master any language. Speak with AI. The world&apos;s most immersive language learning experience.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-white/35 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-5 font-medium">
              Product
            </p>
            <ul className="flex flex-col gap-3">
              {LINKS.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-5 font-medium">
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {LINKS.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-5 font-medium">
              Legal
            </p>
            <ul className="flex flex-col gap-3">
              {LINKS.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2025 Immerse, Inc. All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            Built with AI · Made for humans
          </p>
        </div>
      </div>
    </footer>
  );
}
