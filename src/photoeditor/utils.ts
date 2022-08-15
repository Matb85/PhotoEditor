export function detail(func: string, args: unknown[]) {
  return { detail: { func, args } };
}
