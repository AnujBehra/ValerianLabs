const allowedStatuses = new Set(['new', 'contacted', 'meeting', 'proposal', 'won', 'lost']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function validateLead(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid enquiry.' });
  }

  const fields = {
    name: 120,
    company: 160,
    email: 254,
    phone: 40,
    industry: 100,
    businessDescription: 2000,
    problemDescription: 4000,
    budgetRange: 40,
  };
  const hasOversizedField = Object.entries(fields).some(([field, maxLength]) => (
    typeof body[field] === 'string' && body[field].trim().length > maxLength
  ));
  if (hasOversizedField || (typeof body.website === 'string' && body.website.trim())) {
    return res.status(400).json({ success: false, message: 'Please check the enquiry details and try again.' });
  }

  const lead = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 40),
    industry: clean(body.industry, 100),
    businessDescription: clean(body.businessDescription, 2000),
    problemDescription: clean(body.problemDescription, 4000),
    budgetRange: clean(body.budgetRange, 40),
  };
  const missingField = ['name', 'company', 'email', 'industry', 'problemDescription'].find((field) => !lead[field]);
  if (missingField || !emailPattern.test(lead.email)) {
    return res.status(400).json({ success: false, message: 'Please provide the required fields with a valid email address.' });
  }
  req.body = lead;
  return next();
}

export function validateStatus(req, res, next) {
  if (!allowedStatuses.has(req.body?.status)) return res.status(400).json({ success: false, message: 'Invalid lead status.' });
  return next();
}

export function validateId(req, res, next) {
  if (!/^\d+$/.test(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid lead id.' });
  return next();
}
