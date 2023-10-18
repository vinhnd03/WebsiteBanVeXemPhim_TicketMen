var app = angular.module("myApp", ["ngRoute"]);
app.controller("movie-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.cates = [];


    $scope.initialize = function () {
        //load products
        $http.get("/rest/movies").then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.date = new Date(item.date)
                // Chuyển đổi thời gian thành đúng định dạng "HH:mm a"
                const timeParts = item.time.split(':');
                const hours = parseInt(timeParts[0], 10);
                const minutes = parseInt(timeParts[1], 10);
                const timeDate = new Date();
                timeDate.setHours(hours);
                timeDate.setMinutes(minutes);
                timeDate.setSeconds(0);
                timeDate.setMilliseconds(0);
                item.time = timeDate;
            })
        }).catch(error =>{
            console.error("Error: " + error)
        })
        //load categories
        $http.get("/rest/categories").then(resp => {
            $scope.cates = resp.data;
        });

    }

    //Khởi đầu
    $scope.initialize();
    $scope.pager = {
        page: 0,
        size: 3,
        get items() {
            var start = this.page * this.size;
            //console.log(start + "..." + this.size);
            return $scope.items.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.items.length / this.size);
        },


        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        }
    }
});
