"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class EmailServices {
    sendCode(mail, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: 'yahya112552@gmail.com',
                to: mail,
                subject: 'test',
                text: code
            };
            yield EmailServices.transporter.sendMail(mailOptions);
        });
    }
}
EmailServices.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yahya112552@gmail.com',
        pass: 'rhenjqyahya'
    }
});
exports.EmailServices = EmailServices;
//# sourceMappingURL=EmailServices.js.map