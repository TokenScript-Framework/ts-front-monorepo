"use client";
import { LandingFaqCollapsibleSection } from "@/components/page-ui/LandingFaqCollapsible";
import { LandingPrimaryImageCtaSection } from "@/components/page-ui/cta/LandingPrimaryCta";
import { Button } from "@/components/shadcn/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Footer from "@/components/footer";
import Header from "./Header";
import { useAccount } from "wagmi";
import { WalletButton } from "./WalletButton";

export default function LandingPage() {

    const { address } = useAccount();
    const faqItems = [
        {
            question: "Can I get a refund?",
            answer:
                "Yes, you can get a refund within 30 days of your purchase. No questions asked.",
        },
        {
            question: "What technologies are used?",
            answer: "We use Next.js, Tailwind CSS, and Vercel for the deployment.",
        },
        {
            question: "What do I get if I pre-order?",
            answer:
                "With the pre-order, you get a 50% discount on the final price and a lifetime license for the generated code.",
        },
    ];

    const statistics = [
        { title: "", count: 120 },
        { title: "", count: 90 },
        { title: "", count: 110 },
        { title: "", count: 10 },
    ];

    return (
        <>
            <Header />
            <LandingPrimaryImageCtaSection
                titleComponent={
                    <h1 className="lg:leading-14 text-4xl font-semibold md:max-w-2xl lg:text-5xl">
                        Add your tokens in minutes <br />
                        <span className="fancy-text-purple dark:fancy-text-blue">
                            look great & convert
                        </span>
                    </h1>
                }
                description="Smart Token Explorer description...."
                imageSrc="/images/1.webp"
                imageAlt="Sample image"
                variant="primary"
                withBackground
            >   {address ? (<>
                <Button variant="primary">
                    <a href="/home">Your Tokens</a>
                </Button>
            </>) : (<>
                {/* <ConnectButton showBalance={false} /> */}
                <WalletButton />
            </>)}


                <Button variant="outlinePrimary">
                    <a href="#">Learn more</a>
                </Button>

            </LandingPrimaryImageCtaSection >
            <section className="bg-primary-100/10 dark:bg-primay-900/50 py-[100px]">
                <div className="container-wide mx-auto grid grid-cols-4 gap-8 text-7xl font-bold">
                    {statistics.map((item, index) => (
                        <div className="text-center" key={index}>
                            {item.count}
                            <span className="opacity-7 text-2xl">+</span>
                            <br />
                            {item.title}
                        </div>
                    ))}
                </div>
            </section>
            <LandingFaqCollapsibleSection
                withBackgroundGlow
                backgroundGlowVariant="secondary"
                title="FAQ"
                description="Looking to learn more about our product? Here are some of the most common
  questions."
                faqItems={faqItems}
            />
            <Footer />
        </>
    );
}
