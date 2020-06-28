<template>
    <div>
        <b-card class="mt-5 w-25 ml-auto mr-auto">
            <b-form-group label="user name">
                <b-form-input v-model="form.userName" required placeholder="Enter user name"/>
            </b-form-group>
            <b-form-group label="login id">
                <b-form-input v-model="form.loginId" required placeholder="Enter login id"/>
            </b-form-group>
            <b-form-group label="password">
                <b-form-input v-model="form.password" required placeholder="Enter password"/>
            </b-form-group>
            <hr class="mt-5">
            <b-button @click="onReset" class="float-left" variant="outline-dark">Reset</b-button>
            <b-button @click="onSubmit" class="float-right" variant="outline-success">Create</b-button>
        </b-card>
    </div>
</template>

<script>

    export default {
        name: 'signUp',
        data() {
            return {
                form: {
                    userName: '',
                    loginId: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.callPost('/user/signUp', this.form)
                    .then(response => {
                        this.$router.push({name: 'signIn'})
                    })
            },
            onReset() {
            }
        }
    }
</script>