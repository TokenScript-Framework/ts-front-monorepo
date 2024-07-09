"use client"
import { LandingFaqCollapsibleSection } from "@/components/page-ui/LandingFaqCollapsible";
import { LandingPrimaryImageCtaSection } from "@/components/page-ui/cta/LandingPrimaryCta";
import { Button } from "@/components/shadcn/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LandingPage() {
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

  const statistics=[{title:'',count:120},{title:'',count:90},{title:'',count:110},{title:'',count:10}]

 
  return (<>
      <LandingPrimaryImageCtaSection
         titleComponent={
          <h1 className="text-4xl lg:text-5xl lg:leading-14 font-semibold md:max-w-2xl">
            Add your tokens in minutes{' '}<br/>
            <span className="fancy-text-purple dark:fancy-text-blue">
              look great & convert
            </span>
          </h1>
        }
        description="Smart Toke Explorer description...."
        imageSrc="/images/1.webp"
        imageAlt="Sample image"
        variant="primary"
        withBackground
      >
         <ConnectButton 
            showBalance={false}
          />

        <Button  variant="outlinePrimary">
          <a href="#">Learn more</a>
        </Button>
      </LandingPrimaryImageCtaSection>
      <section className="bg-primary-100/10 py-[100px]  dark:bg-primay-900/50">
        <div className="font-bold text-7xl grid grid-cols-4 gap-8  container-wide mx-auto ">
         {statistics.map((item,index) => (
            <>
                <div className=" text-center" key={index}>
                    {item.count}<span className="opacity-7 text-2xl">+</span>
                    <br/>
                    {item.title}
                    </div>
            </>
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
      </>
  );
}
