import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
};

export function Container({ as: Tag = "div", className, ...rest }: Props) {
  return (
    <Tag
      {...rest}
      className={cn(
        "mx-auto w-full max-w-(--container-site) px-4 md:px-16 lg:px-24",
        className,
      )}
    />
  );
}
