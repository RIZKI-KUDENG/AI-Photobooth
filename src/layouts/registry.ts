import type { LayoutDefinition } from "./types";
import layoutB from "./layout-b";
import heartsFilter from "./hearts-filter";
import dogFilter from "./dog-filter";
import vintageLayout from "./vintage-layout";
import solaceLayout from "./solace-layout";
import astronautLayout from "./astronout-layout";

export const layouts: LayoutDefinition[] = [
  layoutB,
  heartsFilter,
  dogFilter,
  vintageLayout,
  solaceLayout,
  astronautLayout,
];

const layoutMap = new Map<string, LayoutDefinition>();
for (const l of layouts) {
  layoutMap.set(l.id, l);
}

export function getLayout(id: string): LayoutDefinition | undefined {
  return layoutMap.get(id);
}

export function getLayoutOrThrow(id: string): LayoutDefinition {
  const layout = layoutMap.get(id);
  if (!layout) throw new Error(`Layout "${id}" not found in registry`);
  return layout;
}
