<template>
    <div>
        <b-card class="mt-5 w-25 ml-auto mr-auto">
            <b-form-group label="login id">
                <b-form-input v-model="form.loginId" required placeholder="Enter login id"/>
            </b-form-group>
            <b-form-group label="password">
                <b-form-input v-model="form.password" required placeholder="Enter password"/>
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
                    loginId: '',
                    password: ''
                }
            }
        },
        methods: {
            onLogin() {
                this.callPost('/user/signIn', this.form)
                    .then(response => {
                        sessionStorage.setItem('userToken', response.userToken);
                        this.$router.push({name: 'projects'})
                    })
                    .catch(error => {

                    })
            }
        }
    }
</script>

<style>

</style>