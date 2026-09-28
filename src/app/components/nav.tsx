"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "motion/react";

const BRAND = "Kulsu Events";
const WHATSAPP_NUMBER = "919061877278";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Hampers", href: "/category/hamper" },
    { label: "Bouquets", href: "/category/bouquet" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
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
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    const closeMenu = () => setOpen(false);

    // Escape closes the menu; resizing to desktop width closes it too
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onChange);
        return () => {
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onChange);
        };
    }, []);

    // Lock background scroll while the menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

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
                        onClick={closeMenu}
                        className="group flex min-w-0 items-center gap-2"
                    >
                        {/* <Image
                            src="/logo.jpeg"
                            alt="Kulsu Events logo"
                            width={40}
                            height={40}
                            priority
                            className="h-9 w-9 shrink-0 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 md:h-10 md:w-10"
                        /> */}
                        <span className="truncate font-script text-2xl text-gold md:text-3xl">
                            {BRAND}
                        </span>
                    </Link>

                    {/* Desktop links (lg and up) */}
                    <nav
                        className="hidden items-center gap-6 lg:flex xl:gap-8"
                        aria-label="Main"
                    >
                        {NAV_LINKS.map((l) => {
                            const active = isActive(l.href);
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`relative py-1 text-sm tracking-wide transition-colors duration-300 hover:text-gold-light ${active ? "font-semibold text-gold" : "text-cream/80"
                                        }`}
                                >
                                    {l.label}
                                    {active && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
                                            transition={{ duration: 0.35, ease }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
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

                {/* Dropdown */}
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
                            className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-b border-gold/30 bg-ink-soft px-4 pb-6 pt-2 shadow-lg sm:px-6 md:left-auto md:right-6 md:top-[calc(100%+0.5rem)] md:max-h-[calc(100dvh-5rem)] md:w-80 md:rounded-2xl md:border md:border-gold/30 lg:hidden"
                        >
                            <ul className="divide-y divide-gold/20">
                                {NAV_LINKS.map((l) => (
                                    <motion.li key={l.href} variants={itemVariants}>
                                        <Link
                                            href={l.href}
                                            onClick={closeMenu}
                                            aria-current={isActive(l.href) ? "page" : undefined}
                                            className={`block py-3.5 text-base transition-all duration-300 hover:translate-x-1 hover:text-gold-light ${isActive(l.href)
                                                ? "font-semibold text-gold"
                                                : "text-cream/90"
                                                }`}
                                        >
                                            {l.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                            <motion.div variants={itemVariants}>
                                <Link
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMenu}
                                    className="mt-4 block rounded-full bg-gold py-3 text-center font-semibold text-black transition duration-300 hover:bg-gold-light active:scale-95"
                                >
                                    Chat on WhatsApp
                                </Link>
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Backdrop */}
            <AnimatePresence>
                {open && (
                    <motion.button
                        key="backdrop"
                        type="button"
                        aria-label="Close menu"
                        tabIndex={-1}
                        onClick={closeMenu}
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