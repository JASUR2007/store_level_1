<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div id="app" style="display: flex; width: 100%;">
        @include('sidebar')
        <div style="background-color: whitesmoke; height: 100vh; width: 100%;" class="main_head">
            @include('header')
            <div class="maine">
                <router-view></router-view>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/all_main.js') }}"></script>
    <script>
        var routes = [
            { path: '/', component: Product },
            { path: '/add_store', component: Add_store },
            { path: '/category', component: Category },
            { path: '/order', component: Order },
            { path: '/order-detail', component: Order_detail },
            { path: '/seller', component: Seller },
            { path: '/seller_profile', component: Seller_profile },
            { path: '/settings', component: Settings },
            { path: '/edit/:id', component: Edit },
        ];

        var router = new VueRouter({
            mode: 'history',
            routes: routes
        });

        var app = new Vue({
            router: router,
            el: "#app",
            data: {
                domain_url: window.location.origin + '/',
                token: document.querySelector('meta[name="csrf-token"]').content,
            },
            mounted() {
                console.log(this.domain_url);
            },
            methods: {
                open() {
                    this.$el.querySelector('.sidebar_1').classList.toggle('active');
                    this.$el.querySelector('.main_head').classList.toggle('active_1');
                    this.$el.querySelector('.header').classList.toggle('active_2');
                    this.$el.querySelector('.tooltip').classList.toggle('show1');
                    this.$el.querySelector('.app').classList.toggle('active_3');
                },
            }
        });
    </script>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/media480.css') }}">
    <link rel="stylesheet" href="{{ asset('css/media768.css') }}">
    <script type="text/javascript" src="{{ asset('js/app1.js') }}"></script>
</body>
</html>
