"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-60px" } as const;

export function Reveal({
    children,
    className,
    delay = 0,
    y = 24,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

export function Stagger({
    children,
    className,
    stagger = 0.08,
}: {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
}) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: stagger } },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
        >
            {children}
        </motion.div>
    );
}