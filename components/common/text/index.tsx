import { ComponentPropsWithoutRef } from "react";

type Variant = "title" | "semi-title" | "base";

interface Props extends ComponentPropsWithoutRef<"p"> {
  content: string;
  variant?: Variant;
}

const WEIGHT = {
  base: "medium",
  title: "bold",
  "semi-title": "semibold",
};

const SIZE = {
  base: "sm",
  title: "xl",
  "semi-title": "base",
};

export default function Text({ variant = "base", content }: Props) {
  return (
    <p className={`text-${SIZE[variant]} font-${WEIGHT[variant]} select-none`}>
      {content}
    </p>
  );
}
