<template>
  <div>
    <b-alert v-model="showErr" variant="danger" dismissible>sign up failed</b-alert>
    <b-card class="mt-5 w-25 ml-auto mr-auto">
      <b-form>
        <b-form-group label="user name">
          <b-form-input
              placeholder="Enter user name"
              v-model="name"
              name="input-name"
              v-validate="{ required: true}"
              :state="validateState('input-name')"
          />
        </b-form-group>
        <b-form-group label="login id">
          <b-form-input v-model="login_id" placeholder="Enter login id"
                        name="input-loginId"
                        v-validate="{ required: true}"
                        :state="validateState('input-loginId')"
          />
        </b-form-group>
        <b-form-group label="password">
          <b-form-input v-model="password" required placeholder="Enter password"
                        name="input-password"
                        v-validate="{ required: true}"
                        :state="validateState('input-password')"/>
        </b-form-group>
        <b-form-group label="e mail">
          <b-form-input type="email" v-model="mail_address" required placeholder="Enter mail address"
                        name="input-email"
                        v-validate="{ required: true, email: true}"
                        :state="validateState('input-email')"/>
        </b-form-group>
        <b-form-group label="avatar">
          <b-form-file v-model="avatar" placeholder="select avatar" ref="file" @change="onFileChange"/>
          <b-avatar variant="white" :src="image" size="9rem" class="mt-3"></b-avatar>
        </b-form-group>
        <hr class="mt-5">
        <b-button @click="onReset" class="float-left" variant="outline-dark">Reset</b-button>
        <b-button @click="onSubmit" class="float-right" variant="outline-success">Create
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  data() {
    return {
      name: '',
      login_id: '',
      password: '',
      mail_address: '',
      avatar: null,
      image: '',
      showErr: false,
      errMessage: ''
    }
  },
  methods: {
    validateState(ref) {
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let body = new FormData()
          body.append('name', this.name)
          body.append('login_id', this.login_id)
          body.append('password', this.password)
          body.append('mail_address', this.mail_address)
          body.append('avatar', this.avatar)
          console.log(body.name)
          this.callPost('/user/signUp', body)
              .then(response => {
                this.$router.push({name: 'signIn'})
              })
              .catch(error => {
                if (error) {
                  this.showErr = true
                  return false
                }
              })
        }
      })
    },
    onReset() {
      this.name = this.login_id = this.password = this.mail_address = this.image = ''
      this.avatar = null
    },
    onFileChange(e) {
      const fileImg = e.target.files[0];
      if (!this.checkFile(fileImg.name)) {
        alert('画像ファイルを選択してください')
        this.image = ''
        this.avatar = null
        return false
      }
      this.image = window.URL.createObjectURL(fileImg);
    },
    checkFile(file) {
      const allows = ['jpg', 'jpeg', 'png'];
      const ext = this.getExt(file).toLowerCase();
      return allows.indexOf(ext) !== -1;
    },
    getExt(filename) {
      const pos = filename.lastIndexOf('.');
      if (pos === -1) return '';
      return filename.slice(pos + 1);
    }
  }
}
</script>