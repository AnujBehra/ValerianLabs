import crypto from 'node:crypto';

export function requireAdminApiKey(req, res, next) {
  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey) {
    return res.status(503).json({ success: false, message: 'Lead management is not configured.' });
  }

  const suppliedKey = req.get('x-admin-api-key') || '';
  const suppliedBuffer = Buffer.from(suppliedKey);
  const configuredBuffer = Buffer.from(configuredKey);
  const valid = suppliedBuffer.length === configuredBuffer.length
    && crypto.timingSafeEqual(suppliedBuffer, configuredBuffer);

  if (!valid) return res.status(401).json({ success: false, message: 'Unauthorized.' });
  return next();
}
