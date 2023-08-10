export interface HasherProtocol {
  hash: (plaintext: string) => Promise<string>
}
