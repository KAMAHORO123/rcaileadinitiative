import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <Image
        src="/logo.png" 
        alt="RCA ILEAD INITIATIVE"
        width={100}
        height={30}
        className="h-auto w-auto"
        priority
      />
    </Link>
  );
}
