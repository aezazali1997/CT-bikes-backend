import { MAIL_FROM, MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_SECURE, MAIL_USER, NODE_ENV } from "../config";
import nodemailer from 'nodemailer';
import { HttpMessage } from "../exceptions/errorMessages";
import { IOrder } from "../interfaces/order.interface";
import { Order } from "../types/order";




//#TODO we will add some more propertites to it
export const sendEmailOrder = async (order: IOrder) => {

    let transporter;
    if (NODE_ENV == 'development') {
        const testAccount = await nodemailer.createTestAccount();
        console.log(
            `>> ethereal mail: ${testAccount.user} | ${testAccount.pass} | ${testAccount.web}`,
        );

        // create reusable transporter object using the default SMTP transport
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
            connectionTimeout: 300000
            // service: 'gmail',
            // auth: {
            //     user: 'shahidabbas.qt@gmail.com',
            //     pass: ''
            // },
            // connectionTimeout: 300000
        });
    }

    if (NODE_ENV == 'production') {
        // create reusable transporter object using the default SMTP transport
        transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: Number(MAIL_PORT),
            secure: Boolean(MAIL_SECURE),
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASSWORD,
            },
            connectionTimeout: 300000
        });
    }


    // if order status is created then we will send an invoice
    if (order.status == Order.Created) {
        // Generate invoice here
        const items = order.items.map((item) => `
        <tr>
          <td>${item.title}</td>
          <td style="text-align:center">${item.quantity}</td>
          <td style="text-align:center">$${item.price.toFixed(2)}</td>
          <td style="text-align:center">$${(item.quantity * item.price).toFixed(2)}</td>
        </tr>
      `).join('');

        const subtotal = order.subtotal;

        const invoiceHtml = `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
<div style="background-color: #f6f6f6; padding: 10px;">
<div style="background-color: #ffffff; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
<h6 style="color: #353935; margin-bottom: 20px; font-size: 24px; font-weight: bold; text-align: center;">Hello ${order.first_name} ${order.last_name} Please find the details of your invoice below:</h6>
<h2 style="color: #0077c0; margin-bottom: 20px; font-size: 28px; font-weight: bold; text-align: center;">Invoice</h2>
<div style="overflow-x:auto;">
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
<th style="text-align: left; background-color: #0077c0; color:#fff; padding: 10px;">Item</th>
<th style="text-align: center; background-color: #0077c0; color:#fff; padding: 10px;">Quantity</th>
<th style="text-align: center; background-color: #0077c0; color:#fff; padding: 10px;">Price</th>
<th style="text-align: center; background-color: #0077c0; color:#fff; padding: 10px;">Total</th>
</tr>
</thead>
<tbody>
${items}
</tbody>
<tfoot>
<tr>
<td colspan="3" style="text-align: right; padding: 10px;">Total:</td>
<td style="text-align: center; border-top: 1px solid #ddd; padding: 10px;">${order.currency}${subtotal.toFixed(2)}</td>
</tr>
</tfoot>
</table>
</div>
<p style="color: #333333; font-size: 16px; line-height: 24px; margin-top: 20px; text-align: center;">Thank you for your business!</p>
</div>
</div>
</div>`
        // Add some styles to make the template look nicer
        const invoiceStyles = `
        @media only screen and (max-width: 600px) {
            table {
            width: 100%;
            display: block;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: -ms-autohiding-scrollbar;
            border-spacing: 0;
            border-collapse: collapse;
            white-space: nowrap;
            font-size: 14px;
            line-height: 20px;
            color:#333333;
            }
            th, td {
            padding-left :5%;
            padding-right :5%;
            text-align:left;
            }
            th {
            background-color:#0077c0;
            color:#fff;
            }
            td {
            border-bottom :1px solid #ddd;
            }
            tfoot td {
            border-top :1px solid #ddd;
            }
            }`;

        // Add the styles to the HTML
        const styledHtml = `<style>${invoiceStyles}</style>${invoiceHtml}`;


        let message = {
            from: 'ct-bikes.com',
            to: order.email_address,
            subject: 'Order Notification',
            html: styledHtml,
        };
        // Send the email with the invoice
        (transporter?.sendMail(message) ?? Promise.resolve({}))
            .then((info: any) => {
                console.log("====Sending=========!"),
                    console.log({
                        msg: HttpMessage.EMAIL_SEND,
                        info: info.messageId,
                        preview: nodemailer.getTestMessageUrl(info)
                    });
                console.log("====Done=========!")
            })
            .catch((error) => {
                console.log("Mail Service error ", error)
            });
    }


    else {
        let message = {
            from: 'ct-bikes.com',
            to: order.email_address,
            subject: 'Order Notification',
            html: `
                <div style="background-color: #f6f6f6; padding: 10px;">
                <div style="background-color: #ffffff; padding: 20px;">
                  <h2 style="color: #0077c0; margin-bottom: 20px;">Order Update</h2>
                  <p style="color: #333333; font-size: 16px;">Hello ${order.first_name} ${order.last_name},</p>
                  <p style="color: #333333; font-size: 16px; margin-top: 20px;">We wanted to let you know that the status of your order has been updated to:</p>
                  <div style="background-color: #e6e6e6; border-radius: 10px; padding: 10px; margin-top: 20px;">
                    <h3 style="color: #0077c0; margin-bottom: 10px;">${order.status}</h3>
                    <p style="color: #333333; font-size: 14px;">We will continue to keep you updated as your order progresses. If you have any questions or concerns, please do not hesitate to reach out to our support team.</p>
                  </div>
                </div>
              </div>
               `,
        };
        (transporter?.sendMail(message) ?? Promise.resolve({}))
            .then((info: any) => {
                console.log("====Sending========="),
                    console.log({
                        msg: HttpMessage.EMAIL_SEND,
                        info: info.messageId,
                        preview: nodemailer.getTestMessageUrl(info)
                    });
                console.log("====Done=========")

            })
            .catch((error) => {
                console.log("Mail Service error ", error)
            });
    }

};


export const sendEmailForgetPassword = async (token: string, email_address: string, name: string) => {
    let transporter;
    transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        service: 'gmail',
        port: Number(MAIL_PORT),
        secure: Boolean(MAIL_SECURE),
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2', // Specify the minimum TLS version here
        },
        connectionTimeout: 5 * 60 * 1000
    });

    let message = {
        from: '"CT BIKES" <ct-bikes.com>', // sender address
        to: `${email_address}`, // list of receivers
        subject: 'Reset your password',
        html: `
              <div style="background-color: #f6f6f6; padding: 10px;">
                <div style="background-color: #ffffff; padding: 20px;">
                  <h2 style="color: #0077c0; margin-bottom: 20px;">Reset your password</h2>
                  <p style="color: #333333; font-size: 16px;">Hello ${name},</p>
                  <p style="color: #333333; font-size: 16px; margin-top: 20px;">Click the following link to reset your password:</p>
                  <a href="http://localhost:3000/Create-Password?token=${token}" style="background-color: #0077c0; color: #ffffff; text-decoration: none; font-size: 16px; padding: 10px 20px; display: inline-block; border-radius: 5px; margin-top: 20px;">Reset Password</a>
                </div>
              </div>
            `}
    await transporter?.sendMail(message).then((info) => {

        return HttpMessage.EMAIL_SEND;
    }).catch(error => {
        console.log("--->", error);
        throw new Error(HttpMessage.EMAIL_SEND_ERROR)
    });

}


