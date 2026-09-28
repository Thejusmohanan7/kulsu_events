"use client";

import { MotionConfig } from "motion/react";

export default function Providers({ children }: { children: React.ReactNode }) {
    // reducedMotion="user" turns off movement for people who prefer less motion
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}