import { Badge } from "@/components/ui/badge";

export default function Keywords({ keywords }: { keywords: string[] | null }) {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <div>
      {keywords.map((keyword) => (
        <Badge className="mr-1" key={keyword}>
          {keyword}
        </Badge>
      ))}
    </div>
  );
}