const API_URL = "http://localhost:3000/auth";
const POST = async (data, path) => {
  const url = `${API_URL}/${path}`;
  const body = JSON.stringify(data);
  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body
    });
  } catch (e) {
    console.error("POST TO " + url + "\nBODY: " + body, e);
  }
  return null;
};

export const AuthController = {
  login: async (email, password) => {
    const response = await POST({ email, password }, "login");
    const json = await response.json();

    const statusCode = json.statusCode;
    if (statusCode >= 500) {
      console.error(json.message);
      throw new Error("Login falhou. Tente novamente mais tarde");
    } else if (statusCode?.toString().substring(0, 1) === "4") {
      console.error(json.message);
      throw new Error("Login não autorizado. Verifique seu usuário e senha");
    } else
      return json;
  },

  logout: async () => {
    await POST({}, "logout");
  },
  register: async (req) => {
    await POST(req, "register");
  }

  // resetPassword: async (userName: string, password: string) => {};
};