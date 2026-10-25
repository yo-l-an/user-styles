const BASE_URL = import.meta.env?.VITE_API_URL || '/api';

export async function request(path, { method = 'GET', body, signal } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.status === 204 ? null : response.json();
}

export const getProjects = ({ limit, sort }) =>
  request(`/projects?limit=${limit}&sort=${encodeURIComponent(sort)}`);

export const deleteProject = (id) => request(`/projects/${id}`, { method: 'DELETE' });
