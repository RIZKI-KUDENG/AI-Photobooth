import Header from "../organisms/Header";

interface PhotoboothLayoutProps {
  leftContent: React.ReactNode;
  centerContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function PhotoboothLayout({
  leftContent,
  centerContent,
  rightContent,
}: PhotoboothLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F1E7] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="grid gap-6 md:gap-8 lg:grid-cols-[260px_1fr_260px]">
          <div className="space-y-6 order-2 lg:order-1 min-w-0">
            {leftContent}
          </div>
          <div className="order-1 lg:order-2 min-w-0">
            {centerContent}
          </div>
          <div className="order-3 min-w-0">
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
}
