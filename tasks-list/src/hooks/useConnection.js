import { useState, useCallback } from 'react';

const useConnection = () => {
	const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
					method: requestConfig.method ? requestConfig.method : 'GET',
					header: requestConfig.headers ? requestConfig.headers : {},
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
				}
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

			applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, [] );

	// return the isLoading state, the error state and a pointer for the sendRequest function
	return {
		isLoading,
		error,
		sendRequest
	};
}

export default useConnection;
