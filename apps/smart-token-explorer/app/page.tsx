import { LandingFaqCollapsibleSection } from "@/components/page-ui/LandingFaqCollapsible";
import { LandingPrimaryImageCtaSection } from "@/components/page-ui/cta/LandingPrimaryCta";
import { Button } from "@/components/shared/ui/button";


export default function Home() {
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
 
  return (
    <main className="min-h-screen fancy-overlay">
      <LandingPrimaryImageCtaSection
        title="Add your tokens in minutes"
        description="STE description...."
        imageSrc="/images/1.webp"
        imageAlt="Sample image"
        variant="primary"
        withBackground
      >
        <Button size="xl" asChild>
          <a href="#">Start now</a>
        </Button>

        <Button size="xl" variant="outlinePrimary">
          <a href="#">Learn more</a>
        </Button>
      </LandingPrimaryImageCtaSection>
      <LandingFaqCollapsibleSection
        withBackgroundGlow
        backgroundGlowVariant="secondary"
        title="FAQ"
        description="Looking to learn more about our product? Here are some of the most common
  questions."
        faqItems={faqItems}
      />
    </main>
  );
}
