export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function http(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export const CompaniesAPI = {
  // JSON version (still handy for GET)
  list() {
    return http('/api/companies', { headers: { 'Accept': 'application/json' } });
  },
  // multipart create
  createForm(formData) {
    return http('/api/companies', {
      method: 'POST',
      body: formData,           // IMPORTANT: no 'Content-Type' header here
    });
  },
};
