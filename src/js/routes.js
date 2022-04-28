import RequestAndLoad from '../pages/request-and-load.vue';

var routes = [{
        path: '/',
        asyncComponent: () =>
            import ('../pages/MainMenu.vue')
    },
    {
        path: '/about/',
        asyncComponent: () =>
            import ('../pages/about.vue')
    },
    {
        path: '/form/',
        asyncComponent: () =>
            import ('../pages/form.vue'),
        beforeEnter: function({ resolve, reject }) {
            console.log('s');
            resolve()
        },
    },

    {
        path: '/home/',
        asyncComponent: () =>
            import ('../pages/home.vue')
    },
    {
        path: '/notification/',
        asyncComponent: () =>
            import ('../pages/Notification.vue')
    },
    {
        path: '/settings/',
        asyncComponent: () =>
            import ('../pages/Settings.vue')

    },
    {
        path: '/expansion/',
        asyncComponent: () =>
            import ('../pages/ExpansionTrunk.vue')

    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        asyncComponent: () =>
            import ('../pages/dynamic-route.vue')
    },
    {
        path: '/request-and-load/user/:userId/',
        async: function({ router, to, resolve }) {
            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = to.params.userId;

            // Simulate Ajax Request
            setTimeout(function() {
                // We got user data from request
                var user = {
                    firstName: 'Vladimir',
                    lastName: 'Kharlampidi',
                    about: 'Hello, i am creator of Framework7! Hope you like it!',
                    links: [{
                            title: 'Framework7 Website',
                            url: 'http://framework7.io',
                        },
                        {
                            title: 'Framework7 Forum',
                            url: 'http://forum.framework7.io',
                        },
                    ]
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve({
                    component: RequestAndLoad,
                }, {
                    props: {
                        user: user,
                    }
                });
            }, 1000);
        },
    },
    {
        path: '(.*)',
        asyncComponent: () =>
            import ('../pages/404.vue')
    },
];

export default routes;