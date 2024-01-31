// export const setLocal = (data, key = "user_info") => {
//   // localStorage.setItem(key, JSON.stringify(data));
//   const dataJson = JSON.stringify(data);
//   localStorage.setItem(key, dataJson);
// };

// export const getLocal = (key = "user_info") => {
//   const data = localStorage.getItem(key);
//   return data ? JSON.parse(data) : null;
// };

export const userLocalStorage = {
  get: () =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  set: (data) => {
    const dataJson = JSON.stringify(data);
    localStorage.setItem("user", dataJson);
  },
  remove: () => {
    localStorage.removeItem("user");
  },
};