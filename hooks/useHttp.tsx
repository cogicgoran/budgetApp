import { useState } from "react";
import axios from "axios";

export function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function fetchTask(config: any, applyData: any, handleError?: any) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        url: config.url,
        method: config.method ? config.method : "GET",
        headers: config.headers
          ? config.headers
          : { "Content-Type": "application/json" },
        data: config.data ? config.data : null,
        timeout: 5000,
      });

      console.log(
        `Sending ${config.method ? config.method : "GET"} request to ${
          config.url
        }`
      );

      applyData(response);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      if (handleError) handleError(error);
      setError(error);
      setIsLoading(false);
    }
  }

  return { isLoading, error, fetchTask };
}
