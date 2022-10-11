import Index from '../views/ticket/IndexView.vue'
import Create from '../views/ticket/CreateView.vue'
import View from '../views/ticket/ShowView.vue'
import Edit from '../views/ticket/EditView.vue'


const routes = [
    {
        path: '/tickets',
        name: 'tickets',
        meta: { requireAuth: true },
        component: Index
    },
    {
        path: '/ticket/create',
        name: 'createTicket',
        meta: { requireAuth: true },
        component: Create
    },
    {
        path: '/ticket/:id/view',
        name: 'showTicket',meta: {requireAuth: true},
        component: View
    },
    {
        path: '/ticket/:id/edit',
        name: 'editTicket',
        meta: { requireAuth: true },
        component: Edit
    },
]

export default routes;