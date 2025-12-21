export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (typeof a !== 'object' || a === null) return false;
  if (typeof b !== 'object' || b === null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  keysA.sort();
  keysB.sort();

  for (let i = 0; i < keysA.length; i++) {
    if (keysA[i] !== keysB[i]) return false;
    const key = keysA[i];

    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};
