const API_URL = 'http://localhost:3000';
const TIMEOUT = 5000;

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error.name === 'AbortError' ? new Error('Request timed out') : error;
  }
};

export async function getUserBookings(userId) {
  try {
    const response = await fetchWithTimeout(`${API_URL}/bookings?userId=${userId}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch bookings: ${error.message}`);
  }
}

export async function deleteBooking(bookingId) {
  try {
    await fetchWithTimeout(`${API_URL}/bookings/${bookingId}`, { method: 'DELETE' });
    return true;
  } catch (error) {
    throw new Error(`Failed to delete booking: ${error.message}`);
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await fetchWithTimeout(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
