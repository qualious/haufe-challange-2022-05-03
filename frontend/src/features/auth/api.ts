export const fetchRegister = (
  email: string,
  password: string
): Promise<boolean> => {
  const url: string = `${process.env.REACT_APP_BACKEND_URL}/user/`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  };
  return new Promise((resolve, reject) =>
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          window.sessionStorage.setItem("loggedIn", "true");
          return resolve(true);
        } else {
          window.sessionStorage.setItem("loggedIn", "false");
          res.json().then((data) => {
            alert(data.message);
            return reject(false);
          });
        }
      })
      .catch((error: Error) => {
        window.sessionStorage.setItem("loggedIn", "false");
        console.error({ error });
        return reject(false);
      })
  );
};

export const fetchLogin = (
  email: string,
  password: string
): Promise<boolean> => {
  const url: string = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  };

  return new Promise((resolve, reject) =>
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          window.sessionStorage.setItem("loggedIn", "true");
          return resolve(true);
        } else {
          window.sessionStorage.setItem("loggedIn", "false");
          if (res.status === 401) {
            alert("Wrong credentials.");
          }
          return reject(false);
        }
      })
      .catch((error: Error) => {
        window.sessionStorage.setItem("loggedIn", "false");
        console.error({ error });
        return reject(false);
      })
  );
};
