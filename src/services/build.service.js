import axiosInstance from './AxiosInstance';

function getBuilds() {
  return axiosInstance.get('/builds').then((res) => res.data);
}
function getSessionsByBuildId(id) {
  return axiosInstance.get(`/builds/${id}/sessions`).then((res) => res.data);
}

export default {
  getBuilds,
  getSessionsByBuildId,
};
