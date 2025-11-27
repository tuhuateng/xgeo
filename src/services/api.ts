
const API_BASE_URL = '/api';

export const api = {
  getDashboardOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/overview`);
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('Failed to fetch overview');
    return response.json();
  },

  getDashboardModels: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/models`);
    if (!response.ok) throw new Error('Failed to fetch models');
    return response.json();
  },

  getDashboardRecommendations: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/recommendations`);
    if (!response.ok) throw new Error('Failed to fetch recommendations');
    return response.json();
  }
};
