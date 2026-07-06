"use client";

import type { FAQItem } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
