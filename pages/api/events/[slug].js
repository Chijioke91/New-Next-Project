import { events } from './data.json';

export default (req, res) => {
  const evt = events.filter((evt) => evt.slug === req.query.slug);

  if (req.method !== 'GET') {
    return res.status(400).json({ success: false, message: `${req.method} is not allowed on this route` });
  }
  res.setHeader('Allow', ['GET']);
  res.status(200).json({ success: true, message: 'Events Successfully fetched', data: evt });
};
