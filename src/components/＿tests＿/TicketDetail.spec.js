import {mount, shallowMount} from '@vue/test-utils'
import TicketDetail from "@/components/TicketDetail";

describe('ticketDetail', () => {
    const props = {
        ticketDetail: {
            project: {
                id: 1234,
                name: 'test-project'
            },
            ticket_id: 4321,
            title: 'test-title',
            explanation: 'test-explanation',
            status: {
              id: 123,
              name: 'test-todo'
            },
            worker: {
                id: 999,
                name: 'test-worker'
            },
            reporter: {
                id: 888,
                name: 'test-reporter'
            }
        },
        comments: [
            {
                id: 2222,
                user: {
                    id: 999,
                    name: 'test-commenter'
                },
                comment: 'test-comment'
            }
        ],
        users: [
            {id: 111, name: 'test-users-1'},
            {id: 222, name: 'test-users-2'},
            {id: 333, name: 'test-users-3'},
        ],
        statuses: [
            {id: 111, progress: 1, name: 'test-todo'},
            {id: 222, progress: 2, name: 'test-going'},
            {id: 333, progress: 3, name: 'test-done'},
        ]
    };
    it('propsを受け取れていること', () => {
        const wrapper = mount(TicketDetail)
        wrapper.setProps(props)
        expect(wrapper.vm.$props.ticketDetail.title).toBe('test-title')
    })
})