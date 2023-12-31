var app = angular.module("myApp", ["ngRoute"]);

app.controller('username-ctrl', function($scope, $window) {
    // Lấy tên từ session.name
    var name = $(".getname").text();
    // alert(name)
    console.log(name)

    // Lưu tên vào local storage
    $window.localStorage.setItem('name', name);


});


app.controller("fastOrder-ctrl", function($scope, $http) {
    $scope.items = [];
    $scope.ticket = [];
    $scope.time = [];

    $scope.initialize = function() {
        $http.get("/rest/movies/findMovieWithTodayAndFutureTicket").then(resp => {
            $scope.items = resp.data;

        });

    }
    $scope.initialize();


    $scope.findDay = function(mId) {
        if (mId) {
            $http.get("/rest/movies/findByTicketFutureMovieId/" + mId).then(resp => {
                $scope.ticket = resp.data;

            });
        } else {
            $scope.ticket = []
            $scope.time = []
        }
    }
    $scope.findTime = function(date, tId) {
        console.log("test: ", date, tId);
        if (date && tId) {
            $http.get(`/rest/movies/findTimeByDate/${date}/${tId}`).then(resp => {
                $scope.time = resp.data;
                console.log($scope.time);
            });
        } else {
            $scope.time = [];
        }


    }

    $scope.goToSelect = function(ticketId) {
        window.location.href = "/order/select/" + ticketId;
    }
})

app.controller("forgot-ctrl", function($scope) {
    $scope.btn = true;
    var message = $("#message").text();
    var error = $("#error").text();
    // alert("hello");
    if (message) {
        Swal.fire({
            icon: "success",
            title: message,
            theme: 'bootstrap 4',

        });
    }

    if (error) {
        Swal.fire({
            icon: "error",
            title: error,
            theme: 'bootstrap 4',

        });
    }

    $scope.checkInput = function() {
        if ($scope.password && $scope.confirmPassword) {

            if ($scope.password == $scope.confirmPassword) {
                $scope.btn = false;
                $scope.error = "";
            } else {
                $scope.error = "Xác nhận mật khẩu chưa đúng!"
                $scope.btn = true;
            }
        } else {
            $scope.error = "Nhập đầy đủ mật khẩu và xác nhận!"
            $scope.btn = true;
        }
    }

})

app.controller("reset-ctrl", function($scope) {
    $scope.btn = true;
    var message = $("#message").text();
    // alert("hello");
    if (message) {
        Swal.fire({
            icon: "success",
            title: message,
            theme: 'bootstrap 4',
            willClose: function() {
                window.location.href = '/';
            }
        });
    }

    $scope.checkInput = function() {
        if ($scope.password && $scope.confirmPassword) {

            if ($scope.password == $scope.confirmPassword) {
                $scope.btn = false;
                $scope.error = "";
            } else {
                $scope.error = "Xác nhận mật khẩu chưa đúng!"
                $scope.btn = true;
            }
        } else {
            $scope.error = "Nhập đầy đủ mật khẩu và xác nhận!"
            $scope.btn = true;
        }
    }

})

app.controller("movie-ctrl", function($scope, $http) {
    $scope.items = [];
    $scope.cates = [];


    $scope.initialize = function() {
        //load products
        $http.get("/rest/movies").then(resp => {
                $scope.items = resp.data;
                $scope.items.forEach(item => {

                });
            }).catch(error => {
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
        size: 4,
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
app.controller("register-ctrl", function($scope) {
    $scope.isDisabled = true; // Mặc định nút sẽ bị vô hiệu hóa

    $scope.checkInput = function() {
        // Kiểm tra tất cả các trường input
        if ($scope.name && $scope.address && $scope.username && $scope.phone &&
            $scope.email && $scope.password && $scope.confirmPassword) {
            $scope.isDisabled = false; // Bật nút "Đăng ký"
        } else {
            $scope.isDisabled = true; // Tắt nút "Đăng ký"

        }
    };
});
app.controller("login-ctrl", function($scope) {
    $scope.isDisabled = true; // Mặc định nút sẽ bị vô hiệu hóa

    $scope.checkInput = function() {
        // Kiểm tra tất cả các trường input
        if ($scope.username && $scope.password) {
            $scope.isDisabled = false; // Bật nút "Đăng ký"
        } else {
            $scope.isDisabled = true; // Tắt nút "Đăng ký"

        }
    };
});

app.controller("ticketSelectCtrl", function($scope, $http, $window) {
    $scope.tickets = [];
    $scope.dayInWeek = [];
    $scope.week = [];
    var movieId = $('#Mid').text();

    $scope.set7Day = function() {
        moment.locale('vi');
        var today = moment();

        $scope.dayInWeek.push(capitalizeFirstLetter("Hôm nay, " + today.format("DD/MM/YYYY")));



        for (var i = 1; i <= 6; i++) {
            today.add(1, 'days');
            $scope.dayInWeek.push(capitalizeFirstLetter(today.format("dddd, DD/MM/YYYY")));
        }

        $scope.dayInWeek = $scope.dayInWeek.map(day => {
            var dateParts = day.split(", ")[1].split("/");
            var momentDate = moment({
                year: parseInt(dateParts[2]),
                month: parseInt(dateParts[1]) - 1,
                day: parseInt(dateParts[0])
            });

            var ticketIndex = $scope.tickets.findIndex(ticket => ticket.date == momentDate.format("YYYY-MM-DD"));

            console.log("ticketIndex: ", ticketIndex);

            console.log("momentDate: ", momentDate.format("YYYY-MM-DD"));

            return {
                date: day,
                hasShowtime: ticketIndex !== -1
            };
        });
        console.log("Tickets : ", $scope.tickets);

        console.log("Day in week: ", $scope.dayInWeek);

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }


    $scope.initialize = function() {
        $http.get("/rest/tickets/getTicketByMovie/" + movieId).then(resp => {
            $scope.tickets = resp.data;
            console.log("tickets: ", $scope.tickets);
            $scope.set7Day();
        }).catch(error => {
            console.log(error);
        })



        // $scope.findDayHaveShowtime();
    }



    // $scope.findDayHaveShowtime = function () {
    //     var days = angular.copy($scope.dayInWeek);

    //     days.forEach(day => {
    //         // Tách lấy phần ngày tháng năm từ chuỗi
    //         var dateParts = day.split(", ")[1].split("/");

    //         // Tạo đối tượng moment từ các phần tử ngày, tháng, năm
    //         var momentDate = moment({
    //             year: parseInt(dateParts[2]),
    //             month: parseInt(dateParts[1]) - 1, // Tháng trong moment bắt đầu từ 0
    //             day: parseInt(dateParts[0])
    //         });

    //         // Kiểm tra tính hợp lệ của ngày
    //         if (momentDate.isValid()) {


    //             $scope.week.push(momentDate.format("MM-DD-YYYY"));
    //         } else {
    //             console.error("Invalid date format:", day);
    //         }
    //     });

    //     console.log("days: ", days);
    //     console.log("week: ", $scope.week);
    // }

    $scope.initialize();
    console.log("tickets2: ", $scope.tickets);
    $scope.findTime = function(day) {
        $scope.time = [];

        var formattedDay = moment(day, "dddd, DD/MM/YYYY").format("MM-DD-YYYY");

        if (day !== "") {
            $http.get(`/rest/tickets/findTicketByMovieAndDate/${movieId}/${formattedDay}`).then(resp => {
                $scope.time = resp.data;
                console.log("showtime: ", $scope.time);
            }).catch(error => {
                console.log(error);
            })
        }

    }



});

// app.run(function($rootScope, $location, $timeout) {
//     $rootScope.$on('$locationChangeStart', function(event, next, current) {
//       // Thực hiện các hành động kiểm tra trước khi chuyển trang
//       var confirmLeave = window.confirm('Bạn có chắc chắn muốn rời khỏi trang?');
//       if (!confirmLeave) {
//         event.preventDefault(); // Ngăn chặn chuyển trang nếu người dùng không muốn rời khỏi trang
//       } else {
//         // Thực hiện các hành động trước khi chuyển trang (sẽ chạy trước khi chuyển trang)
//         $timeout(function() {
//           console.log('Thực hiện trước khi chuyển trang');
//         });
//       }
//     });
//   });

app.controller("seatSelectCtrl", function($scope, $http, $window, $interval, $location, $timeout) {
    $scope.showtimes = [];
    $scope.selectedShowtime = "";
    $scope.perform = {};
    $scope.ticket = {};
    $scope.username = $window.localStorage.getItem('username');
    $scope.account = {};
    $scope.dseats = [];
    $scope.orderedSeats = [];
    $scope.order = {};
    $scope.countdown = {};

    $scope.selectedOrderId = "";
    $scope.run = false;
    $scope.foods = [];
    $scope.foodTotalPrice = 0;
    $scope.toVNPay = false;
    // $scope.orderId = $window.localStorage.getItem("orderId");
    //Timer
    // $scope.countdown = {
    //     minutes: 0,
    //     seconds: 5
    // };

    // var totalSeconds = $scope.countdown.minutes * 60 + $scope.countdown.seconds;

    // var interval = $interval(function () {
    //     totalSeconds--;

    //     $scope.countdown.minutes = Math.floor(totalSeconds / 60);
    //     $scope.countdown.seconds = totalSeconds % 60;

    //     if (totalSeconds <= 0) {
    //         $interval.cancel(interval);
    //         alert('Countdown timer reached zero!');
    //     }
    // }, 1000);

    // $scope.$on('$destroy', function () {
    //     $interval.cancel(interval);
    // });



    // Define rows and seats with labels A to N (10 columns)
    $scope.rows = Array.from({ length: 10 }, (v, k) => k + 1);
    $scope.columns = Array.from({ length: 14 }, (v, k) => String.fromCharCode(65 + k)); // A to J
    $scope.seats = generateSeats($scope.rows, $scope.columns);

    $scope.choosing = [];
    $scope.selectedSeats = []

    $scope.availableSeats = ($scope.rows.length * $scope.columns.length) - $scope.orderedSeats.length;
    $scope.selectedSeats2 = JSON.parse($window.localStorage.getItem("selectedSeats")) || [];

    //Hiển thị thông báo
    $scope.sweetAlert = function(icon, message) {
        Swal.fire({
            icon: icon,
            title: message,
            theme: 'bootstrap 4',
        });
    }

    $scope.sweetAlert2 = function(icon, message, href) {
        Swal.fire({
            icon: icon,
            title: message,
            theme: 'bootstrap 4',
            willClose: function() {
                window.location.href = href;
            }
        });
    }

    var ticketId = $('#Tid').text();

    console.log("tid: ", ticketId);

    $scope.seatHoding = function() {

        $scope.countdown = {
            minutes: 5,
            seconds: 0
        };

        var totalSeconds = $scope.countdown.minutes * 60 + $scope.countdown.seconds;

        updateCountdown = function() {
            if ($scope.run) {
                totalSeconds--;

                $scope.countdown.minutes = Math.floor(Math.max(totalSeconds / 60, 0));
                $scope.countdown.seconds = Math.max(totalSeconds % 60, 0);

                if (totalSeconds <= 0) {
                    $scope.order = JSON.parse($window.localStorage.getItem("order")) || {};
                    $scope.cancelOrder($scope.order.id);
                    $scope.run = false;
                    $scope.sweetAlert2("info", "Đã hết thời gian giữ ghế!", "/")


                    // $window.location.href = "/";
                } else {
                    $timeout(updateCountdown, 1000);
                }
            }
        };

        var timeout = $timeout(updateCountdown, 1000);
        $scope.$on('$destroy', function() {
            // Ensure that the timeout is cleared when the controller is destroyed
            $timeout.cancel(timeout);
        });
    };



    $(window).on('beforeunload', function() {
        if ($scope.run) {
            var currentPath = window.location.pathname;
            if (currentPath.indexOf('/order/bill') !== -1) {
                $window.localStorage.setItem("selectedSeats", JSON.stringify([]));
            }
            $scope.order = JSON.parse($window.localStorage.getItem("order")) || {};
            $scope.cancelOrder($scope.order.id);
        }
    });

    $scope.initialize = function() {


        $scope.checkResult();

        $scope.run = true;

        var currentPath = window.location.pathname;
        if (currentPath.indexOf('/order/bill') !== -1) {
            // Đường dẫn chứa chuỗi con
            if (!$scope.selectedSeats2.length) {
                $window.location.href = "/";
            }
            $scope.seatHoding();
        } else {
            $scope.run = false;
            $scope.cancelOrder($scope.order.id);
        }
        // else {
        //     $scope.seatHoding(false);
        // }

        $http.get("/rest/foods").then(resp => {
            $scope.foods = resp.data
            $scope.foods.forEach(item => {
                item.quantity = 0;

            })
            console.log("foods: ", $scope.foods);
        }).catch(error => {
            console.log("Foods Getting Error: ", error);
        })



        var promise = $http.get("/rest/tickets/" + ticketId);

        promise.then(function(resp) {



            $scope.ticket = resp.data;

            var today = moment();

            var formattedDate = today.format('YYYY-MM-DD');
            var ticketDate = moment($scope.ticket.date, 'YYYY-MM-DD');
            console.log("date: ", ticketDate);
            console.log("today: ", formattedDate);

            if (ticketDate.isBefore(formattedDate, 'day')) {
                $window.location.href = "/";
            }
            console.log($scope.ticket);
            // $scope.ticket.date = moment($scope.ticket.date).format('MM-DD-YYYY');
            // $scope.ticket.time = moment($scope.ticket.time).format('HH:mm:ss');
            $scope.ticket.date = new Date($scope.ticket.date);

            var formattedDate = moment($scope.ticket.date).format('MM-DD-YYYY');


            $scope.perform = angular.copy($scope.ticket);
            $http.get(`/rest/seats/byDateTimeAndTId/${formattedDate}/${$scope.ticket.time}/${$scope.ticket.id}`).then(resp => {
                $scope.orderedSeats = resp.data;
                console.log("orderedSeats: ", $scope.orderedSeats);
                // Thiết lập trạng thái cho mỗi ghế
                $scope.seats.forEach(seat => {
                    seat.isBooked = $scope.orderedSeats.some(orderedSeat => orderedSeat.name === seat);
                });

                $scope.availableSeats = ($scope.rows.length * $scope.columns.length) - $scope.orderedSeats.length;
                $scope.ticket.time = new Date($scope.ticket.time);

            }).catch(error => {
                console.log(error);
            })

            console.log("test: ", $scope.ticket);
        }).catch(function(error) {
            console.error("Error: " + error)
        })

        $http.get("/rest/accounts/" + $scope.username).then(resp => {
            $scope.account = resp.data;
        })

        $http.get("/rest/seats").then(resp => {
            $scope.dseats = resp.data;
        })


    };

    var limit = 0;
    $scope.toggleSeat = function(seat) {
        if ($scope.isSeatAvailable(seat)) {
            // if (limit < 8) {
            $scope.selectedSeats.push(seat);
            $scope.availableSeats--;
            limit++;
            // } else {
            //     $scope.sweetAlert("info", "Chỉ được chọn tối đa 8 ghế 1 lượt")
            // }
        } else if ($scope.isSeatSelected(seat)) {
            var index = $scope.selectedSeats.indexOf(seat);
            $scope.selectedSeats.splice(index, 1);
            $scope.availableSeats++;
            limit--;
        }
    };

    $scope.isSeatAvailable = function(seat) {
        return $scope.selectedSeats.indexOf(seat) === -1;
    };

    $scope.isSeatSelected = function(seat) {
        return $scope.selectedSeats.indexOf(seat) !== -1;
    };

    $scope.isSeatOrdered = function(seat) {
        return $scope.orderedSeats.some(orderedSeat => orderedSeat.name === seat);
    };

    $scope.holding = [
        // "C1", "D1", "E1"
    ]
    $scope.isHolding = function(seat) {
        // return $scope.holding.some(orderedSeat => orderedSeat.name === seat);
        return $scope.holding.indexOf(seat) !== -1;
    };

    $scope.isSeatChoosing = function(seat) {
        $scope.choosing = JSON.parse($window.localStorage.getItem("selectedSeats")) || [];
        return $scope.choosing.some(orderedSeat => orderedSeat.name === seat);
    };

    $scope.goBack = function() {
        $scope.selectedSeats = [];
        limit = 0
        $scope.availableSeats = $scope.rows.length * $scope.columns.length - $scope.orderedSeats.length;


    };

    $scope.cancelOrder = function(orderId) {
        if (orderId !== null) {
            $http.delete("/rest/orders/" + orderId).then(resp => {
                console.log("xoa thanh cong " + orderId);
                $window.localStorage.setItem("order", JSON.stringify({}));
            }).catch(error => {
                console.log("error: ", error);
            })

        }


    }

    $scope.checkResult = function() {
        var resultValue = $('#result').text();
        console.log("RESULT: ", resultValue);
        // var currentPath = window.location.pathname;

        $scope.orderId = JSON.parse($window.localStorage.getItem("orderId")) || ""
        if (resultValue != "" && resultValue != "00") {
            $scope.cancelOrder($scope.orderId);
            console.log("test124: ", $scope.orderId);
            // $window.localStorage.setItem("orderId", JSON.stringify(""));
        }
        if (resultValue != "" && resultValue == "00") {
            $http.post("/rest/mail/sendOrderDetail", { orderId: $scope.orderId, username: $scope.username }).catch(error => {
                console.log("Error: ", error);
            })
        }
    }

    $scope.initialize();
    $scope.goToPayment = function() {
        if ($scope.selectedSeats.length === 0) {
            $scope.sweetAlert("info", "Vui lòng chọn ít nhất 1 ghế để tiếp tục!")
        } else {

            $window.localStorage.setItem("selectedSeats", JSON.stringify($scope.selectedSeats));


            var items = [];
            var order = {
                createDate: new Date(),
                account: $scope.account,
                email: null
            }



            $http.post("/rest/orders", order).then(resp => {
                $scope.order = resp.data;
                $window.localStorage.setItem("order", JSON.stringify($scope.order));
                console.log("order", $scope.order);

                // Duyệt qua mỗi ghế được chọn
                for (var i = 0; i < $scope.selectedSeats.length; i++) {
                    var item = {
                        buyDate: new Date(),
                        order: $scope.order,
                        ticket: $scope.ticket,
                        seat: $scope.dseats.find(seat => seat.name === $scope.selectedSeats[i])
                    };

                    items.push(item);
                }

                // Gửi mỗi đối tượng item lên server
                items.forEach(item => {
                    $http.post("/rest/orderDetails", item)
                        .then(resp => {

                        })
                        .catch(error => {
                            console.log("Lỗi khi thêm mới cho ghế", item.seat.name, error);
                        });
                });

                var order = JSON.parse($window.localStorage.getItem("order")) || {};
                console.log("orderId: ", order.id);
                $window.localStorage.setItem("orderId", JSON.stringify(order.id));

                // Chuyển trang ở đây nếu điều kiện được đáp ứng
                $window.location.href = "/order/bill/" + ticketId;
                // $scope.seatHoding(true);
                // $scope.initialize();

                // $scope.sweetAlert("success", "Đặt ghế thành công!")
            }).catch(error => {
                console.log(error);
                // $scope.sweetAlert("success", "Đặt ghế thất bại do lỗi!")
            })


        }
    }
    $scope.checkboxChanged = function() {
        if (!$scope.showTable) {
            $scope.foodTotalPrice = 0;
            $scope.foods.forEach(item => {
                item.quantity = 0;
            });
        }
    };


    $scope.test = function() {
        var item = $scope.foods.filter(function(item) {
            return item.quantity >= 1;
        });
        $scope.order = JSON.parse($window.localStorage.getItem("order")) || {};
        console.log("item: ", item);
        console.log("order: ", $scope.order);

        item.forEach(i => {
                var orderFood = {
                    food: i,
                    quantity: i.quantity,
                    order: $scope.order
                }
                $http.post("/rest/foods", orderFood).then(resp => {

                }).catch(error => {
                    console.log(error);
                })
            })
            // $http.post("/rest/foods")
    }

    $scope.back = function() {
        $scope.order = JSON.parse($window.localStorage.getItem("order")) || {};
        $scope.cancelOrder($scope.order.id);

        $scope.run = false;
        $window.history.back();
    }

    // $scope.getSelectedSeatsFromLocalStorage = function () {
    //     var storedSeats = $window.localStorage.getItem("selectedSeats");
    //     return storedSeats ? JSON.parse(storedSeats) : [];
    // }
    $scope.openVNPay = function(price) {

        var item = $scope.foods.filter(function(item) {
            return item.quantity >= 1;
        });
        $scope.order = JSON.parse($window.localStorage.getItem("order")) || {};
        // console.log("item: ", item);
        // console.log("order: ", $scope.order);



        item.forEach(i => {
            var orderFood = {
                    food: i,
                    quantity: i.quantity,
                    order: $scope.order
                }
                // 

            $http.post("/rest/foods", orderFood).then(resp => {

            }).catch(error => {
                console.log(error);
            })
        })

        $window.localStorage.setItem("order", JSON.stringify({}));
        $window.localStorage.setItem("selectedSeats", JSON.stringify([]));
        // $scope.toVNPay = true;
        $scope.run = false;
        $window.location.href = "/pay/" + price;
    }

    $scope.foodPrice = function() {
        $scope.foodTotalPrice = 0;
        $scope.foods.forEach(i => {
            $scope.foodTotalPrice += i.quantity * i.price;
        })
    }

    $scope.continueBooking = function() {

        var item = $scope.foods.filter(function(item) {
            return item.quantity >= 1;
        });
        $scope.order = JSON.parse($window.localStorage.getItem("order")) || {};
        // console.log("item: ", item);
        // console.log("order: ", $scope.order);



        item.forEach(i => {
            var orderFood = {
                    food: i,
                    quantity: i.quantity,
                    order: $scope.order
                }
                // 

            $http.post("/rest/foods", orderFood).then(resp => {

            }).catch(error => {
                console.log(error);
            })
        })

        console.log("Price: ", $scope.foodTotalPrice);

        $scope.run = false;
        $window.localStorage.setItem("selectedSeats", JSON.stringify([]));
        $window.localStorage.setItem("order", JSON.stringify({}));
        // alert($scope.selectedSeats[1])
        $scope.sweetAlert("success", "Đặt ghế thành công!")
            // }).catch(error => {
            //     console.log(error);
            //     $scope.sweetAlert("success", "Đặt ghế thất bại do lỗi!")
            // })




    };

    function generateSeats(rows, columns) {
        var seats = [];
        rows.forEach(function(row) {
            columns.forEach(function(column) {
                seats.push(column + row);
            });
        });
        return seats;
    }
});

app.controller('username-ctrl', function($scope, $window) {
    // Lấy tên từ session.name
    var username = $(".getusername").text();
    // alert(name)
    // Lưu tên vào local storage
    $window.localStorage.setItem('username', username);
});



app.config(function($routeProvider) {
    $routeProvider
        .when("/information_management", {
            templateUrl: "/user/information_management/information_management.html",
            controller: "user_ctrl"
        })
        .when("/change_password", {
            templateUrl: "/user/change_password/change_password.html",
            controller: "password_ctrl"
        })
        .when("/history", {
            templateUrl: "/user/history/history.html",
            controller: "history_ctrl"
        })
        .otherwise({
            templateUrl: "/user/information_management/information_management.html",
            controller: "user_ctrl"
        })

});



app.controller('MovieController', function($scope, $http) {
    // Khởi tạo biến và hàm
    $scope.displayedResults = [];
    $scope.showSearch = false;
    $scope.initialLoadCompleted = false; // Cờ xác định khi trang được tải lần đầu

    // Kiểm tra khi trang được tải lại
    angular.element(document).ready(function() {
        $scope.initialLoadCompleted = true; // Đánh dấu khi trang đã tải xong
        $scope.showSearch = false; // Ẩn kết quả khi trang được tải lại
    });

    // Hàm tìm kiếm phim
    $scope.search = function() {
        const query = $scope.searchInput;
        if (query && query.length > 0) {
            $http.get(`/rest/movies/findMovieByName/${query}`)
                .then(function(resp) {
                    $scope.searchResults = resp.data;
                    $scope.displayResults($scope.searchResults);
                    $scope.showSearch = true;
                    $scope.initialLoadCompleted = true;
                    // Hiển thị kết quả khi có dữ liệu
                    $scope.showSearchResults();
                })
                .catch(function(error) {
                    console.error('Lỗi:', error);
                });
        } else {
            $scope.searchResults = [];
            $scope.showSearch = false;
            // Ẩn kết quả khi ô tìm kiếm trống
            $scope.hideSearchResults();
        }
    };

    // Hàm ẩn kết quả tìm kiếm
    $scope.hideSearchResults = function() {
        document.getElementById('searchResults').style.display = 'none';
    };

    // Hàm hiển thị kết quả tìm kiếm
    $scope.showSearchResults = function() {
        document.getElementById('searchResults').style.display = 'block';
    };

    // Hàm định dạng kết quả
    $scope.displayResults = function(results) {
        var formattedResults = [];
        results.forEach(function(movie) {
            var formattedMovie = {
                name: movie.name,
                poster: movie.poster,
                id: movie.id
            };
            formattedResults.push(formattedMovie);
        });

        $scope.displayedResults = formattedResults;
    };

    // Ẩn kết quả khi click bên ngoài
    $scope.hideSearch = function() {
        $scope.showSearch = false;
    };
});