import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

const BRAND = "Kulsu Events";
const WHATSAPP_NUMBER = "919061877278";
const PHONE_DISPLAY = "+91 90618 77278";
const INSTAGRAM_URL = "https://instagram.com/kulsu_events"; // update if different
const LOCATION = "Kakkanad, Kerala";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

const CATEGORY_LINKS = [
    { label: "Bouquets", slug: "bouquet" },
    { label: "Chocolate", slug: "chocolate" },
    { label: "Engagement", slug: "engagement" },
    { label: "Kids Hampers", slug: "kids-hamper" },
];

function InstagramIcon({
    size = 16,
    className = "",
}: {
    size?: number;
    className?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-gold/20 bg-ink-soft">
            <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:justify-between lg:gap-12 lg:px-8 lg:py-16">
                {/* Brand */}
                <div className="lg:max-w-xs">
                    <Link href="/" className="flex items-center gap-2">

                        <span className="font-script text-2xl text-gold">{BRAND}</span>
                    </Link>
                    <p className="mt-3 text-sm text-cream/60">
                        Gift hampers and bouquets for birthdays, engagements, nikkah and
                        every special moment.
                    </p>
                </div>

                {/* Quick links */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                        Shop
                    </h3>
                    <ul className="mt-3 space-y-2">
                        {CATEGORY_LINKS.map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={`/#${c.slug}`}
                                    className="text-sm text-cream/70 transition-colors hover:text-gold-light"
                                >
                                    {c.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/#categories"
                                className="text-sm text-cream/70 transition-colors hover:text-gold-light"
                            >
                                All categories
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                        Get in touch
                    </h3>
                    <ul className="mt-3 space-y-3">
                        <li>
                            <Link
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold-light"
                            >
                                <Phone size={16} className="text-gold" />
                                {PHONE_DISPLAY}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold-light"
                            >
                                <InstagramIcon size={16} className="text-gold" />
                                Instagram
                            </Link>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-cream/70">
                            <MapPin size={16} className="text-gold" />
                            {LOCATION}
                        </li>
                    </ul>

                    <Link
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light active:scale-95"
                    >
                        Chat on WhatsApp
                    </Link>
                </div>
            </div>

            <div className="border-t border-gold/10 px-4 py-4 text-center text-xs text-cream/40 sm:px-6 lg:px-8">
                © {new Date().getFullYear()} {BRAND}. All rights reserved.
            </div>
        </footer>
    );
}