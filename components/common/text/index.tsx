type Variant = "title" | "semi-title" | "base";

interface Props {
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
    <p className={`text-${SIZE[variant]} font-${WEIGHT[variant]}`}>{content}</p>
  );
}
