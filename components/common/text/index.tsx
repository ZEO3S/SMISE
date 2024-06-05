import { ComponentPropsWithoutRef } from "react";

type Variant = "title" | "semi-title" | "middle-title" | "base" | "semi-base";

interface Props extends ComponentPropsWithoutRef<"p"> {
  content: string;
  variant?: Variant;
}

const OPACITY = {
  base: "",
  "semi-base": "text-opacity-70",
  title: "",
  "middle-title": "",
  "semi-title": "",
};

const WEIGHT = {
  base: "font-medium",
  "semi-base": "font-medium",
  title: "font-black",
  "middle-title": "font-bold",
  "semi-title": "font-semibold",
};

const SIZE = {
  base: "text-sm",
  "semi-base": "text-sm",
  title: "text-2xl",
  "middle-title": "text-xl",
  "semi-title": "text-base",
};

export default function Text({ variant = "base", content }: Props) {
  return (
    <p
      className={`text-default-color select-none ${SIZE[variant]} ${WEIGHT[variant]} ${OPACITY[variant]}`}
    >
      {content}
    </p>
  );
}
