import * as nodemailer from 'nodemailer'
import {SendMailOptions, Transporter} from 'nodemailer'

export class EmailServices{

    static transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'yahya112552@gmail.com',
            pass: 'rhenjqyahya'
        }
    });

    public async sendCode(mail: string, code: string, ):Promise<void> {
        const mailOptions: SendMailOptions = {
            from: 'yahya112552@gmail.com',
            to: mail,
            subject: 'test',
            text: code
        };

        await EmailServices.transporter.sendMail(mailOptions);
    }
}
