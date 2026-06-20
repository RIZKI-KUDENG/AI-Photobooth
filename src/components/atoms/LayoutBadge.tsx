interface LayoutBadgeProps {
  selectedLayout: string;
}

export default function LayoutBadge({ selectedLayout }: LayoutBadgeProps) {
  return (
    <span className="font-black text-sm uppercase bg-gray-200 px-2 py-1 border-2 border-black">
      {selectedLayout.toUpperCase()} MODE
    </span>
  );
}
