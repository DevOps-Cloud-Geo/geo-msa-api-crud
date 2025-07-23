import { Injectable } from '@nestjs/common';
import { Account, Data } from './interfaces/interface';
@Injectable()
export class AppService {
  dbAccount: Account[];
  getHello(id: string, data: Data): string {
    return `${id} - Hello World! ${data.name} - ${data.age}`;
  }

  async createAccount(account: Account) {
    setTimeout(() => {}, 1000);
    account.id = Math.random();
    if (!this.dbAccount) {
      this.dbAccount = [];
    }
    this.dbAccount.push(account);
    console.log('Account created:', account);
    return account;
  }

  async getAccounts(): Promise<Account[]> {
    return this.dbAccount;
  }
}
