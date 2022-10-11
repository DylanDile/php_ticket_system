const routes = [
    {
        path: '/users',
        component: require('../components/users/index').default,
    },
    {
        path: '/users/:id/view',
        component: require('../components/users/open').default,
        children: [
            {
                path: '/users/:id/create',
                component: require('../components/users/create').default
            },
            {
                path: '/users/:id/view',
                component: require('../components/users/view').default,
            },
            {
                path: '/users/:id/edit',
                component: require('../components/users/edit').default,
            },
            {
                path: '/users/:id/documents',
                component: require('../components/users/docuements').default,
            },
            {
                path: '/users/:id/gallery',
                component: require('../components/users/gallery').default,
            },
        ]
    },

    {
        path : '/settings',
        component: require('../components/settings/open').default, //,
        children : [
            {
                path : '/settings',
                component: require('../components/settings/profile').default, //
            },
            {
                path : '/password',
                component: require('../components/settings/password').default, // ,
            },
        ]
    },
];


export default routes;
