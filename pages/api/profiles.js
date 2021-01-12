import db from '../../db';

export default async function handler(req, res) {
  // Get data from your database
  const { method, body } = req;
  const data = JSON.parse(body);
  switch (method) {
    case 'POST': {
      // create new profile
      try {
        const createProfileQuery = 'insert into user_profile  (full_name, email, gender, residant, native, address, about, interest, contact_mode, profile_image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        await db.instance.none(createProfileQuery, [data.name, data.email, data.gender, data.residant, data.native, data.address, data.about, data.interest, data.contactMode, data.avatarImage ?? null]);
        res.status(201).json({ message: 'Profile Created Successfully' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error Creating Profile!!' });
      }
      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
