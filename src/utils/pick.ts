export function pick<O, K extends keyof O>(obj: O, keys: K[]) {
  const constKeys = [...keys] as const;

  type ReturnType = Pick<O, typeof constKeys[number]>;

  let result: ReturnType;

  const x: any = {};
  for (const k of constKeys) {
    x[k] = obj[k];
  }

  result = x;
  return result;
}
