import { Injectable } from '@nestjs/common';
import { ICryptoService } from '../../../application/infraestructure-interfaces/common-services/crypto/crypto.interface';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService implements ICryptoService {
  constructor(private readonly configService: ConfigService) {}
  private GetConfiguration() {
    const secret_key = this.configService.get('SECRET_KEY');
    const secret_iv = this.configService.get('SECRET_IV');
    const encription_method = this.configService.get('ENCRIPTION_METHOD');
    return {
      secret_key: secret_key,
      secret_iv: secret_iv,
      encription_method: encription_method,
    };
  }
  Encrypt(text: string): string {
    const cryptoConfig = this.GetConfiguration();
    const key = crypto
      .createHash('sha512')
      .update(cryptoConfig.secret_key, 'utf-8')
      .digest('hex')
      .substr(0, 32);
    const iv = crypto
      .createHash('sha512')
      .update(cryptoConfig.secret_iv, 'utf-8')
      .digest('hex')
      .substr(0, 16);
    const encryptor = crypto.createCipheriv(
      cryptoConfig.encription_method,
      key,
      iv,
    );
    const aes_encrypted =
      encryptor.update(text, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer.from(aes_encrypted).toString('base64');
  }
  Decrypt(text: string): string {
    const cryptoConfig = this.GetConfiguration();
    const key = crypto
      .createHash('sha512')
      .update(cryptoConfig.secret_key, 'utf-8')
      .digest('hex')
      .substr(0, 32);
    const iv = crypto
      .createHash('sha512')
      .update(cryptoConfig.secret_iv, 'utf-8')
      .digest('hex')
      .substr(0, 16);
    const buff = Buffer.from(text, 'base64');
    text = buff.toString('utf-8');
    const decryptor = crypto.createDecipheriv(
      cryptoConfig.encription_method,
      key,
      iv,
    );
    return decryptor.update(text, 'base64', 'utf8') + decryptor.final('utf8');
  }
}
