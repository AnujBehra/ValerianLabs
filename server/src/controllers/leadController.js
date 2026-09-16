import { createLead, findLeadById, listLeads, updateLeadStatus } from '../services/leadService.js';
import { sendLeadNotification } from '../services/emailService.js';

export async function postLead(req, res, next) {
  try {
    const savedLead = await createLead(req.body);
    await sendLeadNotification(savedLead);
    res.status(201).json({ success: true, data: savedLead });
  } catch (error) {
    next(error);
  }
}

export async function getLeads(req, res, next) {
  try {
    res.json({ success: true, data: await listLeads() });
  } catch (error) {
    next(error);
  }
}

export async function getLead(req, res, next) {
  try {
    const lead = await findLeadById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    return res.json({ success: true, data: lead });
  } catch (error) {
    return next(error);
  }
}

export async function patchLead(req, res, next) {
  try {
    const lead = await updateLeadStatus(req.params.id, req.body.status);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    return res.json({ success: true, data: lead });
  } catch (error) {
    return next(error);
  }
}
