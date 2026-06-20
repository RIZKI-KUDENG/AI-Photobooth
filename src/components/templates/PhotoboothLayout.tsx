import Header from "../organisms/Header";

interface PhotoboothLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function PhotoboothLayout({
  leftContent,
  rightContent,
}: PhotoboothLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F1E7] p-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">{leftContent}</div>
          <div>{rightContent}</div>
        </div>
      </div>
    </div>
  );
}
