import {useCallback} from 'react';
import backend from '../config/backend';

function useBackendRequests() {
  const login = useCallback(async (email, password) => {
    const result = await backend.request('login', 'POST', {email, password});
    return result;
  }, []);

  const logout = useCallback(async () => {
    const result = await backend.request('logout', 'POST', {});
    return result;
  }, []);

  const get = useCallback(async (endpoint, data) => {
    const result = await backend.request(endpoint, 'GET', data || {});
    return result;
  }, []);
  const post = useCallback(async (endpoint, data) => {
    const result = await backend.request(endpoint, 'POST', data || {});
    return result;
  }, []);

  return {get, login, logout, post};
}

export default useBackendRequests;
