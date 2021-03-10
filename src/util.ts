export function uInt8(str: string): Uint8Array {
  return new Uint8Array(Buffer.from(str));
}
