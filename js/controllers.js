angular.module("myApp")
.controller("appCtrl",function ($scope,$rootScope,$state,$http2,$timeout,$interval) {
    $rootScope.url="http://localhost/talbatA16/api/"
    $rootScope.imgUrl="http://localhost/talbatA16/"

})

.controller("registerCtrl",function ($scope,$rootScope,$state,$http2,$http,$timeout,$interval) {


    $scope.register=function () {
        $http2.post($rootScope.url+"register.php",{
            type:$scope.type,
            name:$scope.name,
            tel:$scope.tel,
            addr:$scope.addr,
            user:$scope.user,
            pass:$scope.pass
        }).then(function (resp) {
            if(resp.data.status){
                toastr.success("Registered Successfully !","Success",{timeOut:2000})
                $rootScope.id=resp.data.id
                $rootScope.name=$scope.name
                if($scope.type=='rest')
                    $state.go("app.rest")
                else
                    $state.go("app.cust")

            }
            else
             toastr.error("User already exist","Error",{timeOut:2000})

        })
    }
})

.controller("loginCtrl",function ($scope,$rootScope,$state,$http2,$timeout,$interval) {

    $scope.login=function () {
        $http2.post($rootScope.url+"login.php",{
            type:$scope.type,
            user:$scope.user,
            pass:$scope.pass
        }).then(function (resp) {
            if(resp.data.status){
                toastr.success("Welcome "+resp.data.name,"Login Success",{timeOut:2000})

                $rootScope.id=resp.data.id
                $rootScope.name=resp.data.name
                if($scope.type=='rest')
                    $state.go("app.rest")
                else
                    $state.go("app.cust")
            }
            else{
                toastr.error("Wrong Username or Password","Failed to login",{timeOut:2000})

                $scope.user=""
                $scope.pass=""
                $scope.$apply()
            }
        })
    }
})

.controller("restCtrl",function ($scope,$uibModal,$rootScope,$state,$http2,$http,$timeout,$interval) {
   $rootScope.id=3

    if(!$rootScope.id){
        toastr.warning("Login First","Warning",{timeOut:3000})
        $state.go("app.login")
    }
    $scope.mealData={}

    $scope.getOrders=function () {
        $http2.post($rootScope.url+"getRestOrders.php",{
            rest_id:$rootScope.id
        }).then(function (resp) {

            $scope.orders=resp.data
            $scope.orders.forEach(function (order) {
                order.meals=angular.fromJson(order.meals)
            })
            $scope.$apply()
        })
    }

    $scope.updateMeal=function () {

        var x=confirm("Sure to update meal ?")
        if(x){
            $http2.post($rootScope.url+"updateMeal.php",$scope.selectedMeal)
                .then(function (resp) {
                    if(resp.data.status){
                        toastr.success("Updated Successfully","Success",{timeOut:2000})
                        $scope.getMeals()
                        $scope.mealModal.close()
                    }
                    else
                        toastr.error("Failed to update","Error",{timeOut:2000})

                })
        }
    }
    $scope.preModifyMeal=function (meal) {
        meal.price=parseFloat(meal.price)
        console.log(meal)

        $scope.selectedMeal=Object.assign({},meal)
        $scope.mealModal=$uibModal.open({
            templateUrl:"templates/modifyMealModal.html",
            scope:$scope
        })
    }
    $scope.deleteMeal=function (id,index) {
        var x=confirm("Are you sure ?")
        if(x)
        $http2.post($rootScope.url+"deleteMeal.php",{
            id:id
        }).then(function (resp) {
            if(resp.data.status){
                alert("Meal deleted successfully")
                $scope.meals.splice(index,1)
                $scope.$apply()
            }
            else
                alert("Something went wrong")
        })
    }

    $scope.insertMeal=function () {
        $scope.mealData.id=$rootScope.id
        $http2.post($rootScope.url+"insertMeal.php",$scope.mealData).then(function (resp) {
            if(resp.data.status){
                alert("Meal Inserted successfully")
                $scope.mealData={}
                $scope.y=""
                $scope.getMeals()
                $scope.$apply()
            }
            else
                alert("Something went wrong")
        })
    }

    $scope.getMeals=function () {
        $http2.post($rootScope.url+"getMeals.php",{rest_id:$rootScope.id})
            .then(function (resp) {
                $scope.meals=resp.data
                $scope.$apply()
            })
    }
    $scope.getMeals()
})

.controller("custCtrl",function ($scope,$uibModal ,$rootScope,$state,$http2,$http,$timeout,$interval) {
    $rootScope.id=1
    if(!$rootScope.id){
        toastr.warning("Login First","Warning",{timeOut:3000})
        $state.go("app.login")
    }

    $scope.bascket=[]

    $scope.showBasket=function () {
        $scope.bascketModal=$uibModal.open({
            scope:$scope,
            templateUrl:"templates/bascketModal.html",
            size:"lg"
        })
    }

    $scope.addToBascket=function (name,price) {
        var qty=prompt("Enter the quantity of "+name)
        qty=parseFloat(qty)
        price=parseFloat(price)
        var obj={name:name,price:price,qty:qty}
        $scope.bascket.push(obj)
        console.log($scope.bascket)

    }
    $scope.confirmOrder=function (addr) {
        var x=confirm("Sure to order ?")
        if(x){
            $http2.post($rootScope.url+"orderMeals.php",{
                cust_id:$rootScope.id,
                rest_id:$scope.rest_id,
                addr:addr,
                order_details:angular.toJson($scope.bascket)
            }).then(function (resp) {
                if(resp.data.status){
                    toastr.success("Meals ordered successfully","success",{timeOut:2000})
                    $scope.bascket=[]
                    $scope.bascketModal.close()
                }
            })
        }
    }

    $scope.getMeals=function (rest_id) {
        $scope.rest_id=rest_id
        $http2.post($rootScope.url+"getMeals.php",{rest_id:rest_id})
            .then(function (resp) {
                $scope.meals=resp.data
            })
    }

    $http.get($rootScope.url+"getRest.php")
        .then(function (resp) {
            $scope.rests=resp.data
        })
})