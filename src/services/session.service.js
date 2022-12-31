import axiosInstance from './AxiosInstance';

function getSessions() {
  return axiosInstance.get('/sessions').then((res) => res.data);
}
function getLogsBySessionId(sessionId) {
  return axiosInstance.get(`/sessions/${sessionId}/logs`).then((res) => res.data);
}

export default {
  getSessions,
  getLogsBySessionId,
};
