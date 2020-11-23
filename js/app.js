angular.module("myApp",["ngAnimate","ngSanitize","ui.router","ui.bootstrap","mds"])
.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state("app",{
            url:"/app",
            views:{
                main:{
                    templateUrl:"templates/main.html",
                    controller:"appCtrl"
                }
            }
        })
        .state("app.home",{
            url:"/home",
            views:{
                sub:{
                    template:"<h1>Home</h1>"
                }
            }
        })

        .state("app.register",{
            url:"/register",
            views:{
                sub:{
                    templateUrl:"templates/register.html",
                    controller:"registerCtrl"
                }
            }
        })

        .state("app.login",{
            url:"/login",
            views:{
                sub:{
                    templateUrl:"templates/login.html",
                    controller:"loginCtrl"
                }
            }
        })
        .state("app.rest",{
            url:"/rest",
            views:{
                sub:{
                    templateUrl:"templates/rest.html",
                    controller:"restCtrl"
                }
            }
        })
        .state("app.cust",{
            url:"/cust",
            views:{
                sub:{
                    templateUrl:"templates/cust.html",
                    controller:"custCtrl"
                }
            }
        })

    $urlRouterProvider.otherwise("/app/home")
})

.filter("totalFilter",function ($rootScope) {
    return function (bascket) {
        $rootScope.total=0
        bascket.forEach(function (item) {
            $rootScope.total+=item.price*item.qty
        })

        return bascket
    }
})