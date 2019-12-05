import { Model } from 'objection';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { sendMailDev } from '../../utils/mailSetup';
import { randomString } from '../../utils';
import { SECRET } from '../../env';

class User extends Model {
  static tableName = 'users';
  public password:string;
  public emailVerified:string | null;
  public email: string;
  public id: number;
  public name: string;
  public avatar: string;
  public bio: string;

  async $beforeInsert(context: any) {
    await super.$beforeInsert(context);
    this.password = await bcrypt.hash(this.password, 10);
    const randomstr = randomString();
    this.emailVerified = randomstr;
  }

  sendVerificationMail() {
    sendMailDev({
      email: this.email,
      subject: 'Welcome to musicApp',
      text: `verification code is ${this.emailVerified}`,
    });
  }

  async $afterInsert(context:any) {
    await super.$afterInsert(context);
    this.sendVerificationMail();
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }


  createToken() {
    return jwt.sign(
      { id: this.id, email: this.email },
      SECRET || '',
      {
        expiresIn: '3d'
      }
    );
  }

  async response() {
    return {
      user: {
        name: this.name,
        email: this.email,
        id: this.id,
        avatar: this.avatar,
        bio: this.bio,
      },
      token: await this.createToken()
    };
  }
}

export default User;
