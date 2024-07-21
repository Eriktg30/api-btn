import admin from '../admin.js';

export const sendNotification = async (req, res) => {
  const { tokens, title, body } = req.body;

  const payload = {
    notification: {
      title: title,
      body: body,
    },
  };

  console.log(admin);

  try {
    const response = await admin.messaging().sendToDevice(tokens, payload);
    res.status(200).send(response);
  } catch (error) {
    console.error('Error sending notification: ', error);
    res.status(500).send(error);
  }
};
