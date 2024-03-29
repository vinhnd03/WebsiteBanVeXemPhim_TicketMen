app = angular.module("admin-app", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "/Admin/home/index.html",
            controller: "home-ctrl" // Template cho trang chính
        })
        .when("/product", {
            templateUrl: "/admin/product/index.html",
            controller: "product-ctrl"
        })
        .when("/orders", {
            templateUrl: "/admin/orders/index.html",
            controller: "orders-ctrl"
        })
        .when("/category", {
            templateUrl: "/admin/category/index.html",
            controller: "category-ctrl"
        })
        .when("/accounts", {
            templateUrl: "/admin/accounts/index.html",
            controller: "accounts-ctrl"
        })
        .when("/unaccount", {
            templateUrl: "/admin/accounts/unaccount.html",
        })
        .when("/accountsuser", {
            templateUrl: "/admin/AccountsUser/index.html",
            controller: "accountsuser-ctrl"
        })
        .when("/authorize", {
            templateUrl: "/admin/Authority/index.html",
            controller: "authority-ctrl"
        })
        .when("/unauthorized", {
            templateUrl: "/admin/Authority/unauthorized.html",
        })
        .when("/ticket", {
            templateUrl: "/admin/Ticket/index.html",
            controller: "ticket-ctrl"
        })
        .when("/food", {
            templateUrl: "/admin/Foods/index.html",
            controller: "food-ctrl"
        })
        .when("/statis", {
            templateUrl: "/admin/statistical/thongke.html",
            controller: "statistic-ctrl"
        })

        .when("/home", {
            templateUrl: "/admin/home/index.html",
            controller: "home-ctrl"
        })
        .otherwise({
            template: "<h1 class='text-center'>FPT Polytechnic Adminitration</h1>"
        })

});

app.controller("setusername", function($scope, $window){
    var username = $window.localStorage.getItem('name');
    $scope.un = username;

})

app.controller("menu-ctrl", function($scope){

    $scope.display = false;

    $scope.toggleDisplay = function() {
        $scope.display = !$scope.display;
        $scope.isDisplay = { 'display': $scope.display ? 'block' : 'none' };
        // $scope.displayText = $scope.display ? 'true' : 'false';
      };

      $scope.isDisplay = { 'display': $scope.display ? 'block' : 'none' };
//   $scope.displayText = $scope.display ? 'true' : 'false';
      
})

