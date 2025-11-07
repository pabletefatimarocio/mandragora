export function getScrollableParent(node) {
  while (node && node !== document.body) {
    const style = getComputedStyle(node);
    const overflowY = style.overflowY;
    if (overflowY === "auto" || overflowY === "scroll") return node;
    node = node.parentElement;
  }
  return null;
}

// TYPESCRIPT
// function getScrollableParent(node: HTMLElement | null): HTMLElement | null {
//   while (node && node !== document.body) {
//     const style = getComputedStyle(node);
//     const overflowY = style.overflowY;
//     if (overflowY === "auto" || overflowY === "scroll") return node;
//     node = node.parentElement!;
//   }
//   return null;
// }