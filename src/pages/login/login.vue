<template>
  <div class="login">
    <star-sky class="star-sky"></star-sky>
    <div class="login-form-wrapper">
      <form class="login-form" @submit.prevent="login">
        <el-input id="user" v-model="username" placeholder="请输入用户名">
          <template slot="prefix">
            <i class="el-icon-user"></i>
          </template>
        </el-input>
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
          <template slot="prefix">
            <i class="el-icon-lock"></i>
          </template>
        </el-input>        
        <el-button id="login-button" type="primary" native-type="submit">登录</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import StarSky from '@/components/StarSky.vue';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    StarSky,
  },
  methods: {
    login() {
      this.$http.post('/api/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
         // 登录成功
         localStorage.setItem('token', response.data.token)
        this.$router.push('/home')
      })
      .catch(error => {
        // 登录失败
        console.log(error)
      })
    }
  }
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
}

#user{
  width: 350px;
}
#password{
  width: 350px;

}

#login-button{
  width: 350px;
  margin-top: 20px;
}
.el-input__prefix {
  margin-left: 73px; /* 将图标向右移动10像素 */
}

.star-sky {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.login-form-wrapper {
  position: relative;
  z-index: 1;
  width: 500px; /* 设置宽度为500px */
  height: 380px; /* 设置高度为380px */
  padding: 20px; /* 左右内边距各为50px */
  text-align: center;
  background-color: rgba(29, 27, 168, 0.2);
  border-radius: 5px;
}



.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login-form input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.el-button {
  width: 100%;
}
.el-icon-user {
  font-size: 24px;
  margin-top: 16px;
}

.el-icon-lock{
  font-size: 24px;
  margin-top: 16px;

}
</style>
