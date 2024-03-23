import { writable } from "svelte/store";

// Create a writable store to manage the cookie consent state
export const paymentSuccess = writable(false);
