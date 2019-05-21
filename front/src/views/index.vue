<template>
  <div>
    <div class="wrapper">
      <div class="content-wrapper">
        <form v-if="!name">
          <div class="row grid-block">
            <div class="col-xs-10">
              <input type="text" placeholder="Ваше имя" v-model.lazy="name">
            </div>
            <div class="col-xs-2">
              <input type="submit" value="Войти" @click="login" class="button button-primary">
            </div>
          </div>
        </form>
        <form v-if="name">
          <textarea placeholder="Сообщение" v-model="message"></textarea>
          <input type="submit" @click="send" class="button button-success">
        </form>
        <ul>
          <li v-for="(item,index) in messages" :key="index" class="messages">
            <div
              class="ui-alert"
              v-bind:class="{ 'ui-alert--primary' :  name == item.name, 'ui-alert--warning': name != item.name}"
            >
              <span class="alert-title">{{item.name}} : {{item.message}}</span>

              <span>{{ item.date | moment("dddd, MMMM Do YYYY") }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script>
import io from "socket.io-client";
import axios from "axios";

import { required, minLength, email } from "vuelidate/lib/validators";

let date = new Date();
export default {
  data() {
    return {
      name: "",
      message: "",
      messages: "",

      socket: io("localhost:3000")
    };
  },

  methods: {
    login(e) {
      e.preventDefault();
      this.$session.set("login", this.name);
      console.log(this.name);
    },
    send(e) {
      e.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        name: this.name,
        message: this.message,
        date: date
      });
      this.message = "";
    }
  },
  components: {},
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
    // this.socket.on("typing", data => {
    //   console.log(data);
    // });
  }
};
</script>
<style scoped >
.messages li {
  list-style-type: none;
}
.active {
  text-align: right;
}
</style>