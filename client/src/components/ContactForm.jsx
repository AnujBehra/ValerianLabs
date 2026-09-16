import { useRef, useState } from 'react';
import { createLead } from '../services/api';
import { trackEvent } from '../utils/analytics';

const initialForm = { name: '', company: '', email: '', phone: '', industry: '', businessDescription: '', problemDescription: '', budgetRange: '' };

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submissionState, setSubmissionState] = useState({ status: 'idle', message: '' });
  const lastSubmission = useRef('');
  const hasTrackedStart = useRef(false);
  const updateField = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submitForm = async (event) => {
    event.preventDefault();
    const submissionKey = JSON.stringify(formData);
    const errors = validate(formData);
    if (errors.length) {
      setSubmissionState({ status: 'error', message: errors.join(' ') });
      trackEvent('form_validation_error', { form_name: 'contact' });
      return;
    }
    if (submissionState.status === 'loading' || submissionKey === lastSubmission.current) return;
    lastSubmission.current = submissionKey;
    setSubmissionState({ status: 'loading', message: '' });
    try {
      await createLead(formData);
      setFormData(initialForm);
      setSubmissionState({ status: 'success', message: 'Thanks — we received your enquiry and will be in touch soon.' });
      trackEvent('generate_lead', { form_name: 'contact' });
    } catch (error) {
      lastSubmission.current = '';
      setSubmissionState({ status: 'error', message: error.message });
      trackEvent('form_error', { form_name: 'contact' });
    }
  };
  return (
    <form className="contact-form" onFocus={() => {
      if (!hasTrackedStart.current) {
        hasTrackedStart.current = true;
        trackEvent('form_start', { form_name: 'contact' });
      }
    }} onSubmit={submitForm} noValidate>
      <div className="form-row"><Field label="Name" name="name" value={formData.name} onChange={updateField} required placeholder="Your name" /><Field label="Company" name="company" value={formData.company} onChange={updateField} required placeholder="Company name" /></div>
      <div className="form-row"><Field label="Email" name="email" type="email" value={formData.email} onChange={updateField} required placeholder="you@company.com" /><Field label="Phone / WhatsApp" name="phone" type="tel" value={formData.phone} onChange={updateField} placeholder="+91 00000 00000" /></div>
      <label htmlFor="industry">Industry<select id="industry" name="industry" value={formData.industry} onChange={updateField} required><option value="">Select your industry</option>{['Manufacturing', 'Distribution & Wholesale', 'Construction', 'Logistics', 'Retail', 'Professional Services', 'Other SME'].map((industry) => <option key={industry}>{industry}</option>)}</select></label>
      <Field label="What does your business do?" name="businessDescription" value={formData.businessDescription} onChange={updateField} placeholder="Tell us a little about your business" />
      <label htmlFor="problemDescription">What problem are you trying to solve?<textarea id="problemDescription" name="problemDescription" value={formData.problemDescription} onChange={updateField} rows="4" placeholder="What is currently manual, disconnected or slowing your team down?" required /></label>
      <label htmlFor="budgetRange">Optional budget range<select id="budgetRange" name="budgetRange" value={formData.budgetRange} onChange={updateField}><option value="">Select a range</option><option>₹1–5 lakh</option><option>₹5–10 lakh</option><option>₹10 lakh+</option><option>Not sure yet</option></select></label>
      <button className="button button-primary" type="submit" disabled={submissionState.status === 'loading'}>{submissionState.status === 'loading' ? 'Submitting…' : "Let's Talk"} <span>↗</span></button>
      {submissionState.status !== 'idle' && <p className={`form-message ${submissionState.status}`}>{submissionState.message}</p>}
      <p className="form-note">No commitment. Just a conversation about your workflow.</p>
    </form>
  );
}

function Field({ label, name, type = 'text', ...props }) {
  return <label htmlFor={name}>{label}<input id={name} type={type} name={name} {...props} /></label>;
}

function validate(data) {
  const errors = [];
  if (!data.name.trim()) errors.push('Please enter your name.');
  if (!data.company.trim()) errors.push('Please enter your company.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.push('Please enter a valid email address.');
  if (!data.industry) errors.push('Please select your industry.');
  if (!data.problemDescription.trim()) errors.push('Please describe the problem you are trying to solve.');
  return errors;
}
