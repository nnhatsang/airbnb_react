export const setLocal = (data, key = "user_info") => {
  // localStorage.setItem(key, JSON.stringify(data));
  const dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};

export const getLocal = (key = "user_info") => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
