import Cookies from "js-cookie"

export const storage = {
  setToken: (token: string) => {
    Cookies.set("auth_token", token, {
      expires: 7, // 7 days
      secure: true,
      sameSite: "strict",
    })
  },

  getToken: () => {
    return Cookies.get("auth_token")
  },

  removeToken: () => {
    Cookies.remove("auth_token")
  },

  setUser: (user: any) => {
    localStorage.setItem("user", JSON.stringify(user))
  },

  getUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  removeUser: () => {
    localStorage.removeItem("user")
  },

  clear: () => {
    Cookies.remove("auth_token")
    localStorage.removeItem("user")
  },
}
