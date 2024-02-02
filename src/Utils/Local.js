

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