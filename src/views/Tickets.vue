<template>
  <div>
    <Header @show-modal="membersModal = true"></Header>
    <b-container>
      <div v-for="status in statuses" :key="status.id">
        <b-card class="float-left mr-3 mt-5 w-25" :header="status.name">
          <b-button size="sm" class="mb-2" @click="showCreateModal(status.id)"
                    variant="light">
            <b-icon icon="plus"></b-icon>
            追加
          </b-button>
          <draggable :options="{group: 'tickets'}"
                     @add="draggableEnd($event, status.id)"
                     :data-status="status.id">
            <div v-for="ticket in status.tickets"
                 :value=ticket.id class="m-2"
                 style="cursor: move; max-width: 20rem;"
                 @click="showDetail(ticket.id)"
            >
              <b-list-group-item class="d-flex align-items-center">
                <b-avatar variant="white" class="float-right mr-3" :src="ticket.avatar"/>
                <span v-text="ticket.title"/>
              </b-list-group-item>
            </div>
          </draggable>
        </b-card>
      </div>
      <b-modal hide-footer v-model="createModal" title="Create Ticket">
        <TicketCreate
            :users="users"
            :project-id="this.projectId"
            :status-id="this.addTaskStatusId"
            @ticket-create="ticketCreate"
        />
      </b-modal>
      <b-modal hide-footer v-model="detailModal" hide-header size="lg">
        <TicketDetail
            :ticket-detail=ticketDetail
            :comments="comments"
            :users="users"
            :statuses="statusList"
            @ticket-update="ticketUpdate"
            @ticket-delete="ticketDelete"
            @comment-post="commentPost"
        />
      </b-modal>
      <b-modal hide-footer v-model="membersModal" hide-header size="lg">
        <MembersModal
            :users="users"
            @view-page="viewInvitePage"
        />
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TicketDetail from '../components/TIcketDetail'
import TicketCreate from "../components/TicketCreate"
import Header from "../components/Header";
import MembersModal from "../components/MembersModal"

export default {
  name: 'tickets',
  components: {draggable, TicketDetail, TicketCreate, Header, MembersModal},
  data() {
    return {
      statuses: this.getTickets(),
      users: this.getUsers(),
      project: {},
      projectId: '',
      createModal: false,
      detailModal: false,
      ticketDetail: {},
      statusList: this.getStatuses(),
      comments: [],
      addTaskStatusId: null,
      upFile: null,
      membersModal: false
    }
  },
  methods: {
    getTickets() {
      this.projectId = parseInt(this.$route.params.projectId);
      this.callGet(`/tickets/${this.projectId}`)
          .then(data => {
            if (data) {
              this.statuses = data.statuses;
              this.project = data.project;
              this.projectId = data.project.id
            }
          }).catch(error => {
        if (error) {
        }
      })
    },
    draggableEnd(event, statusId) {
      const element = event.item
      const ticketId = element.getAttribute("value");
      const body = {
        project_id: this.project.id,
        ticket_id: parseInt(ticketId),
        status_id: statusId
      };
      this.callPut(`/tickets/status`, body)
          .then(data => {

          })
    },
    showCreateModal(statusId) {
      this.addTaskStatusId = statusId
      this.createModal = true
    },
    getUsers() {
      this.callGet(`/user/${this.projectId}`)
          .then(data => {
            if (data) {
              this.users = data.users
            }
          }).catch(err => {
        if (err) {
          return false;
        }
      })
    },
    async ticketCreate(createForm) {
      await this.callPost(`/tickets/create`, createForm)
          .then(data => {
            this.createModal = false;
            this.getTickets();
          })
    },
    async showDetail(ticketId) {
      await this.getTicketDetail(ticketId)
      await this.getComments(ticketId)
      this.detailModal = true;
    },
    async getTicketDetail(ticketId) {
      await this.callGet(`/tickets/detail/${ticketId}`)
          .then(data => {
            if (data) {
              this.ticketDetail = data
            }
          })
    },
    async getComments(ticketId) {
      await this.callGet(`/comments/${ticketId}`)
          .then(data => {
            this.comments = data.comments
          })
    },
    async ticketUpdate(updateForm) {
      await this.callPut(`/tickets/update`, updateForm)
          .then(async data => {
            await this.getTicketDetail(data.id)
            await this.fetchData(this.ticketDetail)
          })
    },
    async ticketDelete(ticketId) {
      let id = parseInt(ticketId)
      await this.callDelete(`/tickets/delete/${id}`)
          .then(data => {
            console.log(22)
            this.getTickets()
            this.detailModal = false
          }).catch(err => {
            if (err) {
              alert(err.message)
            }
          })
    },
    async commentPost(commentForm) {
      console.log(commentForm)
      await this.callPost('/comments', commentForm)
          .then(data => {
            if (data) {
              this.getComments(data.ticket_id)
            }
          })
    },
    async getStatuses() {
      await this.callGet(`/statuses/${this.projectId}`)
          .then(data => {
            this.statusList = data.statuses
          })
          .catch(err => {
            if (err) {
              alert(err)
            }
          })
    },
    up() {
      let body = new FormData();
      body.append("file", this.upFile)

      this.callPost(`/upload`, body)
          .then(data => {

          })
    },
    fetchData(ticketDetail) {
      let ticketId = ticketDetail.ticket_id
      this.statuses.map(status => {
        status.tickets.map(ticket => {
          if (ticket.id === ticketId) {
            ticket.title = ticketDetail.title
            ticket.avatar = ticketDetail.worker.avatar
            if (status.id !== ticketDetail.status.id) {
              status.tickets = status.tickets.filter(ticket => ticket.id !== ticketDetail.ticket_id)
              this.statuses.find(status => status.id === ticketDetail.status.id).tickets.push(ticket)
            }
          }
        })
      })
    },
    viewInvitePage() {
      this.$router.push({name: 'invite', params: {projectId: this.projectId}})
    }
  }
}
</script>