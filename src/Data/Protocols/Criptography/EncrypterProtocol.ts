export interface EncrypterProtocol {
  encrypt: (plaintext: string) => Promise<string>
}
