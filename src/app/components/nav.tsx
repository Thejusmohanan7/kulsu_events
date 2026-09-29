"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "motion/react";
import { ChevronDown } from "lucide-react";

const BRAND = "Kulsu Events";
const WHATSAPP_NUMBER = "919061877278";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

// slugs must match the ids in page.tsx
const CATEGORY_LINKS = [
    { label: "Gift Hampers", slug: "gift-hamper" },
    { label: "Kids Hampers", slug: "kids-hamper" },
    { label: "Chocolate", slug: "chocolate" },
    { label: "Dry Fruits", slug: "dry-fruits" },
    { label: "Engagement", slug: "engagement" },
    { label: "Nikkah", slug: "nikkah" },
    { label: "Musalla", slug: "musalla" },
    { label: "Watch Hampers", slug: "watch-hamper" },
    { label: "Trolley Hampers", slug: "trolley-hamper" },
    { label: "Cake Hampers", slug: "cake-hamper" },
    { label: "Bouquets", slug: "bouquet" },
    { label: "Custom Orders", slug: "custom" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const menuVariants = {
    hidden: { opacity: 0, y: -16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease,
            when: "beforeChildren",
            staggerChildren: 0.05,
        },
    },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease } },
} as const;

const itemVariants = {
    hidden: { opacity: 0, x: -14 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } },
} as const;

/** Three lines that morph into an X */
function MenuIcon({ open }: { open: boolean }) {
    const t = { duration: 0.3, ease };
    return (
        <span className="relative block h-5 w-6" aria-hidden="true">
            <motion.span
                className="absolute left-0 top-0 h-0.5 w-full rounded-full bg-current"
                animate={open ? { y: 9, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={t}
            />
            <motion.span
                className="absolute left-0 top-[9px] h-0.5 w-full rounded-full bg-current"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease }}
            />
            <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current"
                animate={open ? { y: -9, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={t}
            />
        </span>
    );
}

export default function Nav() {
    const [open, setOpen] = useState(false); // mobile menu
    const [mobileCats, setMobileCats] = useState(false); // mobile accordion
    const [catsOpen, setCatsOpen] = useState(false); // desktop dropdown
    const [scrolled, setScrolled] = useState(false);
    const catsRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    const closeAll = () => {
        setOpen(false);
        setMobileCats(false);
        setCatsOpen(false);
    };

    // Escape closes everything; growing to desktop width closes the mobile menu
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                setMobileCats(false);
                setCatsOpen(false);
            }
        };
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setOpen(false);
                setMobileCats(false);
            }
        };
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onChange);
        return () => {
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onChange);
        };
    }, []);

    // Click outside closes the desktop dropdown
    useEffect(() => {
        if (!catsOpen) return;
        const onDown = (e: MouseEvent) => {
            if (catsRef.current && !catsRef.current.contains(e.target as Node)) {
                setCatsOpen(false);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [catsOpen]);

    // Lock background scroll while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const desktopLink = (active: boolean) =>
        `relative py-1 text-sm tracking-wide transition-colors duration-300 hover:text-gold-light ${active ? "font-semibold text-gold" : "text-cream/80"
        }`;

    const underline = (
        <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
            transition={{ duration: 0.35, ease }}
        />
    );

    return (
        <>
            <motion.header
                initial={{ y: -64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease }}
                className={`sticky top-0 z-50 border-b pt-[env(safe-area-inset-top)] backdrop-blur transition-[background-color,border-color,box-shadow] duration-300 ${scrolled
                    ? "border-gold/40 bg-ink/95 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                    : "border-gold/20 bg-ink/80"
                    }`}
            >
                <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between gap-3 px-4 sm:px-6 md:h-16 lg:px-8">
                    <Link
                        href="/"
                        onClick={closeAll}
                        className="group flex min-w-0 items-center gap-2"
                    >

                        <span className="truncate font-script text-2xl text-gold md:text-3xl">
                            {BRAND}
                        </span>
                    </Link>

                    {/* Desktop links (lg and up) */}
                    <nav
                        className="hidden items-center gap-6 lg:flex xl:gap-8"
                        aria-label="Main"
                    >
                        <Link
                            href="/"
                            aria-current={isActive("/") ? "page" : undefined}
                            className={desktopLink(isActive("/"))}
                        >
                            Home
                            {isActive("/") && underline}
                        </Link>

                        {/* Categories dropdown */}
                        <div ref={catsRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setCatsOpen((v) => !v)}
                                aria-expanded={catsOpen}
                                aria-haspopup="true"
                                className={`flex items-center gap-1 ${desktopLink(catsOpen)}`}
                            >
                                Categories
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${catsOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {catsOpen && (
                                    <motion.div
                                        key="cats"
                                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                        transition={{ duration: 0.2, ease }}
                                        className="absolute left-1/2 top-full mt-4 w-[30rem] -translate-x-1/2 rounded-2xl border border-gold/30 bg-ink-soft p-3 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                                    >
                                        <ul className="grid grid-cols-3 gap-1">
                                            {CATEGORY_LINKS.map((c) => (
                                                <li key={c.slug}>
                                                    <Link
                                                        href={`/#${c.slug}`}
                                                        onClick={closeAll}
                                                        className="block rounded-lg px-3 py-2 text-sm text-cream/85 transition duration-200 hover:bg-gold/10 hover:text-gold-light"
                                                    >
                                                        {c.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/#bouquet" className={desktopLink(false)}>
                            Bouquets
                        </Link>


                        <Link
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_6px_20px_rgba(201,151,62,0.35)] active:scale-95"
                        >
                            WhatsApp
                        </Link>
                    </nav>

                    {/* Menu button (below lg) */}
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-gold transition-colors hover:bg-white/10 active:scale-90 lg:hidden"
                    >
                        <MenuIcon open={open} />
                    </button>
                </div>

                {/* Mobile / tablet menu */}
                <AnimatePresence>
                    {open && (
                        <motion.nav
                            key="mobile-menu"
                            id="mobile-menu"
                            aria-label="Mobile"
                            variants={menuVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-b border-gold/30 bg-ink-soft px-4 pb-6 pt-2 shadow-lg sm:px-6 md:left-auto md:right-6 md:top-[calc(100%+0.5rem)] md:max-h-[calc(100dvh-5rem)] md:w-96 md:rounded-2xl md:border md:border-gold/30 lg:hidden"
                        >
                            <ul className="divide-y divide-gold/20">
                                <motion.li variants={itemVariants}>
                                    <Link
                                        href="/"
                                        onClick={closeAll}
                                        aria-current={isActive("/") ? "page" : undefined}
                                        className={`block py-3.5 text-base transition-all duration-300 hover:translate-x-1 hover:text-gold-light ${isActive("/") ? "font-semibold text-gold" : "text-cream/90"
                                            }`}
                                    >
                                        Home
                                    </Link>
                                </motion.li>

                                {/* Categories accordion */}
                                <motion.li variants={itemVariants}>
                                    <button
                                        type="button"
                                        onClick={() => setMobileCats((v) => !v)}
                                        aria-expanded={mobileCats}
                                        aria-controls="mobile-cats"
                                        className="flex w-full items-center justify-between py-3.5 text-left text-base text-cream/90 transition-colors hover:text-gold-light"
                                    >
                                        Categories
                                        <ChevronDown
                                            size={18}
                                            className={`text-gold transition-transform duration-300 ${mobileCats ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {mobileCats && (
                                            <motion.div
                                                key="mobile-cats"
                                                id="mobile-cats"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="grid grid-cols-2 gap-2 pb-4">
                                                    {CATEGORY_LINKS.map((c) => (
                                                        <li key={c.slug}>
                                                            <Link
                                                                href={`/#${c.slug}`}
                                                                onClick={closeAll}
                                                                className="block rounded-xl border border-gold/20 px-3 py-2.5 text-sm text-cream/85 transition duration-200 hover:border-gold hover:bg-gold/10 hover:text-gold-light active:scale-95"
                                                            >
                                                                {c.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>

                                <motion.li variants={itemVariants}>
                                    <Link
                                        href="/events"
                                        onClick={closeAll}
                                        aria-current={isActive("/events") ? "page" : undefined}
                                        className={`block py-3.5 text-base transition-all duration-300 hover:translate-x-1 hover:text-gold-light ${isActive("/events")
                                            ? "font-semibold text-gold"
                                            : "text-cream/90"
                                            }`}
                                    >
                                        Events
                                    </Link>
                                </motion.li>
                            </ul>

                            <motion.div variants={itemVariants}>
                                <Link
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeAll}
                                    className="mt-4 block rounded-full bg-gold py-3 text-center font-semibold text-black transition duration-300 hover:bg-gold-light active:scale-95"
                                >
                                    Chat on WhatsApp
                                </Link>
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Backdrop for the mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.button
                        key="backdrop"
                        type="button"
                        aria-label="Close menu"
                        tabIndex={-1}
                        onClick={closeAll}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
}