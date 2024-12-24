import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook for handling asynchronous data fetching.
 * 
 * @template T
 * @param {Function} cb - The callback function that performs the data fetching.
 * @returns {Object} An object containing the following:
 * @property {T|undefined} data - The fetched data, or undefined if not yet fetched.
 * @property {boolean|null} loading - The loading state: true during fetching, null before start.
 * @property {Error|null} error - The error object if an error occurs, otherwise null.
 * @property {Function} fn - The function to trigger the fetch operation. Accepts arguments for the callback function.
 * @property {Function} setData - A setter function to manually update the fetched data.
 */
const useFetch = (cb) => {
  const [data, setData] = useState(undefined); // State for storing fetched data
  const [loading, setLoading] = useState(null); // State for tracking the loading state
  const [error, setError] = useState(null); // State for storing any errors during fetch

  /**
   * Function to trigger the fetch operation.
   * 
   * @async
   * @param {...any} args - Arguments to be passed to the callback function.
   */
  const fn = async (...args) => {
    setLoading(true); // Start loading
    setError(null); // Reset errors

    try {
      // Execute the callback and store the response
      const response = await cb(...args);
      setData(response);
      setError(null); // Ensure errors are reset if fetch is successful
    } catch (error) {
      setError(error); // Store the error
      toast.error(error.message); // Display an error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Return the state and utility functions
  return { data, loading, error, fn, setData };
};

export default useFetch;
