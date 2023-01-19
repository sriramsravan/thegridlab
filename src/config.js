let url;
if (process.env.NODE_ENV === 'production') {
  url = 'http://43.204.238.237:3000';
} else {
  url = 'http://localhost:3000';
}
const backendUrl = url;
export { backendUrl };
