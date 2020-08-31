Vue.component("common-menu", {
    props: ["current"],
    template: `
    <div class="ui secondary pointing green inverted massive menu">
      <a href="./index.html" class="item" v-bind:class="{active: current=='home'}">Home</a>
      <a href="./users.html" class="item" v-bind:class="{active: current=='users'}">Users</a>
      <a href="./profile.html" class="item" v-bind:class="{active: current=='profile'}">Profile</a>
      <a href="./login.html" class="item" v-bind:class="{active: current=='login'}">Login</a>
      <div class="right menu">
        <button class="item">Logout</button>
      </div>
    </div>
    `
});
