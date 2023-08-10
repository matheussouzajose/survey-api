export interface DecrypterProtocol {
  decrypt: (ciphertext: string) => Promise<string>
}
