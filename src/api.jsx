// Hey team! I've created this shared file that includes reusable apiGet(), apiPost(), and apiPut() functions using fetch().
// This file centralizes all API interactions.
// You don't have to write fetch() logic in every component you will be working on, just import the specific one you intend to use.
// If you need to fetch data from the server (API endpoint), use: import { apiGet } from "../api.jsx"
// If you need to send data to the server, use: import { apiPost } from "../api.jsx"
// If you need to update data on the server, use: import { apiPut } from "../api.jsx"
// Kindly do not move this file, so it’s consistent across the team!

const BASE_URL = 'https://group-6-car-hire-react-app.onrender.com';

// Helper function to get Jason Web Token (JWT) token to prove a user is logged in and identifies them (authentication)
function getToken() {
  return localStorage.getItem("token");
}

// Handling GET requests 
export async function apiGet(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    // Check if response is Ok
    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed with status ${response.status}`);
    }

    // Parse and return JSON response body
    return await response.json();
  } catch (error) {
    console.error("API GET error:", error); // Log error for debugging
    throw error;
  }
}

// Handling POST request
export async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API POST error:", error);
    throw error;
  }
}

// Handling PUT request
export async function apiPut(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`PUT ${endpoint} failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API PUT error:", error);
    throw error;
  }
}

// Handling DELETE request
export async function apiDelete(endpoint, id) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`DELETE ${endpoint}/${id} failed with status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("API DELETE error:", error);
    throw error;
  }
}

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin123';
export const ADMIN_CHOICE_ROUTE = '/admin/choice';
