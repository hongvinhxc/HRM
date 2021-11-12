import { getToken } from "utils";

const login = async (username, password) => {
  let res = await fetch("/api/auth/login", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return res.json();
};

const changePassword = async (
  username,
  password,
  newPassword,
  confirmNewPassword
) => {
  let res = await fetch("/api/auth/change-password", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken(),
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      username,
      password,
      newPassword,
      confirmNewPassword,
    }),
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return res.json();
};

export { login, changePassword };
