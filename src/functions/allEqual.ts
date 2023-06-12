export function allEqual<T = unknown[]>(array: T, loose = false) {
  if(!Array.isArray(array))
    throw new Error(`Wrong argument provided for scl.allEqual() - (expected: "Object", got: "${typeof array}")`);

  return array.every(v => loose === true ? v == array[0] : v === array[0]);
}
