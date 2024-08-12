import nodemailer from 'nodemailer'

export function generarToken(length = 6) {
    let code = ''
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
}

export async function sendResetCode(email, code) {
    // const code = generarToken()
    console.log(code);
    

    let transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: 'eriktg836@gmail.com',
            pass: 'xbzx llaz dyrv ebhx'
        }
    })

    let mailOptions = {
        from: 'eriktg836@gmail.com',
        to: email,
        subject: 'Código de restablecimiento de contraseña',
        text: `Tu código es: ${code}. úsalo para cambiar la contraseña`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error correo: ', error);

        }
        console.log('Correo enviado: ' + info.response);

    })

}
