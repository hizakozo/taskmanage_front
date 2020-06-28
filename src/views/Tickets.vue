<template>
    <b-container>
        <b-row>
            <b-col cols="2">
            </b-col>
            <b-col cols="10">
                <div v-for="status in statuses" :key="status.id">
                    <b-card class="float-left mr-3 mt-5 w-25" :header="status.name">
                        <draggable :options="{group: 'tickets'}"
                                   @add="draggableEnd($event, status.id)"
                                   :data-status="status.id">
                            <b-card v-for="ticket in status.tickets"
                                    :value="ticket.id" class="m-2"
                                    :title=ticket.title style="cursor: move"
                                    @click="showDetail(ticket.id)"
                            ></b-card>
                        </draggable>
                    </b-card>
                </div>
            </b-col>
        </b-row>
        <b-button @click="createModal = true">Create Ticket</b-button>
        <b-modal hide-footer v-model="createModal" title="Create Ticket">
            <div>
                <b-form>
                    <b-form-group label="title">
                        <b-form-input v-model="form.title" required/>
                    </b-form-group>
                    <b-form-group label="explanation">
                        <b-form-input v-model="form.explanation" required/>
                    </b-form-group>
                    <b-form-group label="worker">
                        <b-form-select v-model="form.worker" value-field="id" text-field="name"
                                       :options="users"></b-form-select>
                    </b-form-group>
                    <b-button class="float-right" @click="onCreate" variant="primary">Create</b-button>
                </b-form>
            </div>
        </b-modal>

        <b-modal hide-footer v-model="detailModal">
            <div class="mb-4">
                <label>title:</label>
                <div v-if="!isEdit.title" @click="isEdit.title = true">{{ticketDetail.title}}</div>
                <b-form-input v-if="isEdit.title" type="text" v-model="updateForm.title" @blur="update" autofocus/>
            </div>
            <div class="mb-4">
                <label>explanation:</label>
                <div v-if="!isEdit.explanation" @click="isEdit.explanation = true">{{ticketDetail.explanation}}</div>
                <b-form-input v-if="isEdit.explanation" type="text" v-model="updateForm.explanation" @blur="update"
                              autofocus/>
            </div>
            <div class="mb-4">
                <label>worker:</label>
                <div v-if="!isEdit.worker" @click="isEdit.worker = true">{{ticketDetail.worker.name}}</div>
                <b-form-select v-if="isEdit.worker" value-field="id" text-field="name" :options="users"
                               v-model="updateForm.worker" @input="update"/>
            </div>
            <div class="mb-4">
                <label>reporter:</label>
                <div v-if="!isEdit.reporter" @click="isEdit.reporter = true">{{ticketDetail.reporter.name}}</div>
                <b-form-select v-if="isEdit.reporter" value-field="id" text-field="name" :options="users"
                               v-model="updateForm.reporter" @input="update"/>
            </div>
        </b-modal>
        <router-link :to="{ name: 'invite', params: { projectId:  projectId}}">
            <b-button class="float-right" variant="success">invite</b-button>
        </router-link>
    </b-container>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: 'tickets',
        components: {draggable},
        data() {
            return {
                statuses: this.getTickets(),
                users: this.getUsers(),
                projectId: null,
                project: {},
                form: {
                    projectId: this.projectId,
                    title: '',
                    explanation: '',
                    worker: null
                },
                createModal: false,
                detailModal: false,
                ticketDetail: {
                    reporter: {
                        name: ''
                    },
                    worker: {
                        name: ''
                    }
                },
                isEdit: {
                    title: false,
                    explanation: false,
                    reporter: false,
                    worker: false
                },
                updateForm: {
                    ticketId: null,
                    projectId: null,
                    title: '',
                    explanation: '',
                    reporter: null,
                    worker: null
                },
                statusList: []
            }
        },
        methods: {
            getTickets() {
                this.projectId = this.$route.params.projectId;
                this.callGet(`/tickets/${this.projectId}`)
                    .then(data => {
                        if (data) {
                            this.statuses = data.statuses;
                            this.project = data.project;
                            this.projectId = data.project.id
                        }
                    })
            },
            draggableEnd(event, statusId) {
                const element = event.item
                const ticketId = element.getAttribute("value");
                const body = {
                    projectId: this.project.id,
                    ticketId: ticketId,
                    statusId: statusId
                };
                this.callPut(`/tickets/status`, body)
                    .then(data => {

                    })
            },
            getUsers() {
                this.callGet(`/user/${this.projectId}`)
                    .then(data => {
                        if (data) {
                            this.users = data.users
                        }
                    })
            },
            async onCreate() {
                await this.callPost(`/tickets`, this.form)
                    .then(data => {
                        this.createModal = false;
                        this.getTickets();
                    })
            },
            async showDetail(ticketId) {
                await this.getTicketDetail(ticketId)
                this.detailModal = true;
            },
            async getTicketDetail(ticketId) {
                await this.callGet(`/tickets/detail/${ticketId}`)
                    .then(data => {
                        if (data) {
                            this.ticketDetail = data

                            this.updateForm = {
                                ticketId: data.ticketId,
                                projectId: this.project.id,
                                title: data.title,
                                explanation: data.explanation,
                                worker: data.worker.id,
                                reporter: data.reporter.id
                            };
                        }
                    })
            },
            async update() {
                await this.callPut(`/tickets`, this.updateForm)
                    .then(data => {
                        this.getTicketDetail(data.ticketId);
                        this.getTickets()
                    })
                this.isEdit.title = false;
                this.isEdit.explanation = false;
                this.isEdit.worker = false;
                this.isEdit.reporter = false;
            }
        }
    }
</script>