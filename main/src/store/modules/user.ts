import { UserState } from "@/store/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import { removeToken, setToken, getToken } from "@/utils/cookies";
import { logout } from "@/api/modules/login";
export const useUserStore = defineStore({
  id: "wocwin-user",
  state: (): UserState => ({
    token: getToken() || "",
    loginName: "",
    name: "",
    nickName: "",
    userId: null,
    userInfo: {}
  }),
  actions: {
    // 登录
    Login() {
      return new Promise((resolve: any) => {
        setToken("admin");
        this.loginName = "admin";
        this.token = "admin";
        resolve({});
      });
    },
    // 获取用户信息
    GetInfo() {
      return new Promise(resolve => {
        const user: any = {
          userName: "admin",
          nickName: "admin",
          userId: "admin"
        };
        this.name = user.userName;
        this.nickName = user.nickName;
        this.userId = user.userId;
        this.userInfo = user;
        resolve(user);
      });
    },
    // 退出系统
    LogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then((res: any) => {
            removeToken();
            this.token = "";
            this.userInfo = {};
            resolve(res.data);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    // 前端退出
    FedLogOut() {
      removeToken();
      this.token = "";
      this.userInfo = {};
    }
  },
  persist: piniaPersistConfig("wocwin-user")
});
