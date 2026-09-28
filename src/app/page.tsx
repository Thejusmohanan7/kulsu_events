import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "./components/reveal";

const WHATSAPP_NUMBER = "919061877278";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

const CATEGORIES = [
  { name: "Hampers", href: "/category/hamper" },
  { name: "Bouquets", href: "/category/bouquet" },
  { name: "Kids Hampers", href: "/category/kids-hamper" },
  { name: "Engagement", href: "/category/engagement-hamper" },
];

const FEATURED = [
  { slug: "classic-gift-hamper", name: "Classic Gift Hamper", price: 1499 },
  { slug: "rose-bouquet", name: "Red Rose Bouquet", price: 799 },
  { slug: "kids-fun-hamper", name: "Kids Fun Hamper", price: 999 },
  { slug: "engagement-luxe-hamper", name: "Engagement Luxe Hamper", price: 2999 },
];

const STEPS = [
  { title: "Browse", text: "Pick a hamper or bouquet you love." },
  { title: "Enquire", text: "Message us on WhatsApp with your choice." },
  { title: "Get it delivered", text: "We customize, pack and deliver it." },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

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
              href="/shop"
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

      {/* Categories */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Reveal>
          <h2 className="text-xl font-semibold text-gold sm:text-2xl">
            Shop by category
          </h2>
        </Reveal>
        <Stagger className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <StaggerItem key={c.href}>
              <Link
                href={c.href}
                className="flex aspect-[4/3] w-full items-end rounded-2xl border border-gold/30 bg-ink-soft p-4 transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_10px_30px_rgba(201,151,62,0.2)] active:scale-[0.98]"
              >
                <span className="text-base font-semibold text-cream sm:text-lg">
                  {c.name}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold text-gold sm:text-2xl">
              Featured
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              View all
            </Link>
          </div>
        </Reveal>
        <Stagger className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {FEATURED.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/product/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-gold/30 bg-ink-soft transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_10px_30px_rgba(201,151,62,0.2)] active:scale-[0.98]"
              >
                {/* Replace this div with <Image /> later */}
                <div className="overflow-hidden">
                  <div className="aspect-[4/5] bg-neutral-900 transition duration-500 group-hover:scale-105 group-hover:bg-neutral-800" />
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-medium sm:text-base">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How to order */}
      <section className="border-y border-gold/20 bg-ink-soft px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
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