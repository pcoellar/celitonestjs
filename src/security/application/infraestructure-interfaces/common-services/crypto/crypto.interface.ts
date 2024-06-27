export abstract class ICryptoService {
  abstract Encrypt(text: string): string;
  abstract Decrypt(text: string): string;
}
