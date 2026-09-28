"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "./components/reveal";

const WHATSAPP_NUMBER = "919061877278";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;
const EXT = "jpeg";


const CATEGORIES = [
  {
    slug: "gift-hamper",
    name: "Gift-Hampers",
    blurb: "For every occasion",
    files: ["Gift-hamper"],
  },
  {
    slug: "kids-hamper",
    name: "Kids-Hampers",
    blurb: "Birthdays and treats",
    files: ["Kids-hamper-1", "Kids-hamper-2"],
  },
  {
    slug: "chocolate",
    name: "Chocolate",
    blurb: "Hampers and towers",
    files: ["Choclate-hamper-1", "Choclate-hamper-2", "Choclate-tower"],
  },
  {
    slug: "dry-fruits",
    name: "Dry-Fruits",
    blurb: "Premium and festive",
    files: ["Dry-fruits-hamper-1", "Dry-fruits-hamper-2"],
  },
  {
    slug: "engagement",
    name: "Engagement-Hampers",
    blurb: "Ring trays and trousseau",
    files: [
      "Engagement-hamper-1",
      "Engagement-hamper-2",
      "Engagement-hamper-3",
      "Engagement-hamper-4",
    ],
  },
  {
    slug: "nikkah",
    name: "Nikkah-Hampers",
    blurb: "Elegant nikkah gifts",
    files: ["Nikkah-hamper"],
  },
  {
    slug: "musalla",
    name: "Musalla-Hampers  ",
    blurb: "Prayer mat sets",
    files: ["musalla1"],
  },
  {
    slug: "watch-hamper",
    name: "Watch-Hampers",
    blurb: "Gifts for him",
    files: ["Watch-hamper"],
  },
  {
    slug: "trolley-hamper",
    name: "Trolley-Hampers",
    blurb: "Grand statement gifts",
    files: ["Trolley-hamper-1", "Trolley-hamper-2"],
  },
  {
    slug: "cake-hamper",
    name: "Cake-Hampers",
    blurb: "Cake with gifts",
    files: ["Cake-hamper"],
  },
  {
    slug: "bouquet",
    name: "Bouquets",
    blurb: "Fresh and dry flowers",
    files: [
      "Bouquet1",
      "Bouquet2",
      "Bouquet3",
      "Bouquet4",
      "Bouquet5",
      "Bouquet6",
      "Bouquet7",
      "Bouquet8",
      "Bouquet9",
      "Dry-flower-bouquet",
    ],
  },
  {
    slug: "custom",
    name: "Custom-Orders",
    blurb: "Invitations and chocolate",
    files: [
      "Wedding-invitation",
      "Choclate-customization-1",
      "Choclate-customization-2",
      "Choclate-customization-3",
      "Choclate-customization-4",
      "Choclate-customization-5",
    ],
  },
].map((c) => ({
  ...c,
  count: c.files.length,
  images: c.files.map((f) => `/${f}.${EXT}`),
}));

const STEPS = [
  { title: "Browse", text: "Pick a hamper or bouquet you love." },
  { title: "Enquire", text: "Message us on WhatsApp with your choice." },
  { title: "Get it delivered", text: "We customize, pack and deliver it." },
];

const enquiryLink = (name: string) =>
  `${whatsappHref}?text=${encodeURIComponent(
    `Hi, I'm interested in ${name}. Is it available?`
  )}`;

/** Photo that shows a gold placeholder if the file is missing */
function Photo({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/30 via-ink-soft to-ink"
      >
        <span className="font-script text-5xl text-gold/60">
          {alt.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className="object-cover transition duration-700 group-hover:scale-110"
    />
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl overflow-x-clip">
      {/* Hero */}
      <section className="px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Reveal y={16}>
          <Image
            src="/logo.jpeg"
            alt="Kulsu Events"
            width={220}
            height={220}
            priority
            className="mx-auto h-40 w-40 object-contain sm:h-52 sm:w-52"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mx-auto mt-2 max-w-2xl text-3xl font-bold tracking-tight text-gold sm:text-4xl lg:text-5xl">
            Gifts that say it better
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-xl text-base text-cream/70 sm:text-lg">
            Beautiful hampers and bouquets for birthdays, engagements and every
            special moment.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#categories"
              className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(201,151,62,0.35)] active:scale-95 sm:w-auto"
            >
              Shop now
            </Link>
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-gold px-6 py-3 font-medium text-gold transition duration-300 hover:-translate-y-0.5 hover:bg-gold/10 active:scale-95 sm:w-auto"
            >
              Chat on WhatsApp
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Category cards (cover photo = first photo) */}
      <section
        id="categories"
        className="scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <Reveal>
          <h2 className="text-xl font-semibold text-gold sm:text-2xl">
            Shop by category
          </h2>
        </Reveal>
        <Stagger className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`#${c.slug}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/30 bg-ink-soft transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_10px_30px_rgba(201,151,62,0.25)] active:scale-[0.98]"
              >
                <Photo
                  src={c.images[0]}
                  alt={c.name}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-gold-light backdrop-blur">
                  {c.count} {c.count === 1 ? "photo" : "photos"}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <h3 className="text-base font-semibold text-cream sm:text-lg">
                    {c.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-gold-light/90">{c.blurb}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Full collection: one swipeable row per category */}
      <section className="pb-6">
        <Reveal>
          <h2 className="px-4 text-xl font-semibold text-gold sm:px-6 sm:text-2xl lg:px-8">
            Our collection
          </h2>
        </Reveal>

        {CATEGORIES.map((c) => (
          <div
            key={c.slug}
            id={c.slug}
            className="scroll-mt-24 px-4 pt-8 sm:px-6 lg:px-8"
          >
            <Reveal>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-cream sm:text-xl">
                    {c.name}
                  </h3>
                  <p className="text-xs text-cream/60 sm:text-sm">{c.blurb}</p>
                </div>
                <Link
                  href={enquiryLink(c.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full border border-gold px-4 py-1.5 text-xs font-medium text-gold transition duration-300 hover:bg-gold hover:text-black active:scale-95 sm:text-sm"
                >
                  Enquire
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden">
                {c.images.map((src, i) => (
                  <div
                    key={src}
                    className="group relative aspect-[4/5] w-40 shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/30 bg-ink-soft transition duration-300 hover:border-gold sm:w-52 lg:w-60"
                  >
                    <Photo
                      src={src}
                      alt={`${c.name} ${i + 1}`}
                      sizes="(min-width: 1024px) 240px, (min-width: 640px) 208px, 160px"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      {/* How to order */}
      <section className="mt-6 border-y border-gold/20 bg-ink-soft px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Reveal>
          <h2 className="text-center text-xl font-semibold text-gold sm:text-2xl">
            How to order
          </h2>
        </Reveal>
        <Stagger
          className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3"
          stagger={0.15}
        >
          {STEPS.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="h-full rounded-2xl border border-gold/20 bg-ink p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-gold/50">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-semibold text-black">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-cream/70">{s.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Events teaser */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Reveal>
          <div className="rounded-3xl border border-gold/40 bg-ink-soft p-6 text-center sm:p-10">
            <h2 className="font-script text-3xl text-gold sm:text-4xl">
              Event planning, coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-cream/70">
              Engagements, birthdays and more. Get in touch to plan yours with
              us.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(201,151,62,0.35)] active:scale-95"
            >
              Learn more
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}