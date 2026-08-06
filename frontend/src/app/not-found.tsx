import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="site-container flex min-h-[60vh] flex-col items-center justify-center pt-32 pb-20 text-center">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
