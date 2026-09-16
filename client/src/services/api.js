const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function createLead(leadData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    const responseData = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(responseData.message || 'Unable to submit your enquiry.');
    return responseData;
  } catch (error) {
    if (error instanceof TypeError) throw new Error('We could not reach the server. Please try again.');
    throw error;
  }
}
