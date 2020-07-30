<template>
    <div>
        <b-card class="mt-5 w-25 ml-auto mr-auto">
            <b-form-group label="login id">
                <b-form-input v-model="form.login_id" placeholder="Enter login id"
                              name="input-loginId"
                              v-validate="{ required: true}"
                              :state="validateState('input-loginId')"/>
            </b-form-group>
            <b-form-group label="password">
                <b-form-input v-model="form.password" required placeholder="Enter password"
                              name="input-password"
                              v-validate="{ required: true}"
                              :state="validateState('input-password')"/>
            </b-form-group>
            <hr class="mt-5">
            <b-button @click="onLogin" class="float-right" variant="outline-success">sign in</b-button>
        </b-card>
    </div>
</template>

<script>

    export default {
        name: 'signIn',
        components: {},
        data() {
            return {
                form: {
                    login_id: '',
                    password: ''
                }
            }
        },
        methods: {
            validateState(ref) {
                if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                    return !this.veeErrors.has(ref);
                }
                return null;
            },
            onLogin() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.callPost('/user/signIn', this.form)
                            .then(response => {
                                sessionStorage.setItem('userToken', response.user_token);
                                this.$store.commit('getUserId', response.user_id)
                                this.$router.push({name: 'projects'})
                            })
                            .catch(error => {
                            })
                    }
                })
            }
        }
    }
</script>

<style>

</style>