import { Resend } from 'resend';

const defaultSender = 'Valerian Labs <onboarding@resend.dev>';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function fieldRow(label, value) {
  return `
    <tr>
      <td style="padding: 10px 16px; color: #667085; font-weight: 600; vertical-align: top;">${escapeHtml(label)}</td>
      <td style="padding: 10px 16px; color: #1d2939;">${escapeHtml(value || 'Not provided')}</td>
    </tr>`;
}

function createEmailHtml(lead) {
  return `
    <div style="background: #f5f7f2; padding: 32px 16px; font-family: Arial, sans-serif; color: #1d2939;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #d0d5d2;">
        <div style="padding: 24px 24px 16px; border-bottom: 1px solid #eaecf0;">
          <p style="margin: 0 0 8px; color: #647a56; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Website enquiry</p>
          <h1 style="margin: 0; font-size: 24px; line-height: 1.3;">New lead from ${escapeHtml(lead.company)}</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${fieldRow('Name', lead.name)}
          ${fieldRow('Company', lead.company)}
          ${fieldRow('Email', lead.email)}
          ${fieldRow('Phone', lead.phone)}
          ${fieldRow('Industry', lead.industry)}
          ${fieldRow('Business description', lead.businessDescription)}
          ${fieldRow('Problem description', lead.problemDescription)}
          ${fieldRow('Budget range', lead.budgetRange)}
          ${fieldRow('Submitted', new Date(lead.createdAt).toLocaleString())}
        </table>
      </div>
    </div>`;
}

export async function sendLeadNotification(lead) {
  const { RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_NOTIFICATION_EMAIL) {
    console.warn('Lead notification skipped: Resend configuration is incomplete.');
    return;
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || defaultSender,
      to: LEAD_NOTIFICATION_EMAIL,
      subject: `New Website Lead — ${lead.company} | Valerian Labs`,
      html: createEmailHtml(lead),
    });

    if (error) {
      console.error('Lead notification email failed:', error.message);
    }
  } catch (error) {
    console.error('Lead notification email failed:', error);
  }
}
