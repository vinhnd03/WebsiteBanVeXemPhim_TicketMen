app.controller("product-ctrl", function ($scope, $http) {
    $scope.items = [];
    $scope.cates = [];
    $scope.form = {};
    $scope.file = null;
    $scope.folder = null;

    //Hiển thị thông báo
    $scope.sweetAlert = function (icon, message) {
        Swal.fire({
            icon: icon,
            title: message,
            theme: 'bootstrap 4',
        });
    }

    $scope.initialize = function () {
        //load products
        $http.get("/rest/movies").then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.releaseDate = new Date(item.releaseDate)
                // Chuyển đổi thời gian thành đúng định dạng "HH:mm a"
                // const timeParts = item.time.split(':');
                // const hours = parseInt(timeParts[0], 10);
                // const minutes = parseInt(timeParts[1], 10);
                // const timeDate = new Date();
                // timeDate.setHours(hours);
                // timeDate.setMinutes(minutes);
                // timeDate.setSeconds(0);
                // timeDate.setMilliseconds(0);
                // item.time = timeDate;
            })
            $scope.reset();
        });

        //load categories
        $http.get("/rest/categories").then(resp => {
            $scope.cates = resp.data;
        })
        console.log($scope.cates);
    }

    //Khởi đầu
    $scope.initialize();



    //Xóa form
    $scope.reset = function () {
        $scope.folder = null;
        $scope.form = {
            createDate: new Date(),
            poster: '/image/no-image.png',
            available: true,
        }

        // Xóa giá trị file để tránh giữ lại tên ảnh cũ
        $scope.file = null;
        // Xóa giá trị trong trường chọn tệp
        angular.element("input[type='file']").val(null);

        console.log($scope.folder);
    }

    //Hiển thị lên form
    $scope.edit = function (item) {
        $scope.folder = "/image/upload/";
        $scope.form = angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show')
    }

    //Thêm sản phẩm mới
    $scope.create = function () {
        // $scope.folder = "/image/upload/";
        var data = new FormData();
        data.append('file', $scope.file);
        $http.post(`/rest/upload`, data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(resp => {
            $scope.form.poster = resp.data.name;

            var item = angular.copy($scope.form);

            $http.post(`/rest/movies`, item).then(resp => {
                resp.data.createDate = new Date(resp.data.createDate)
                $scope.items.push(resp.data);
                $scope.sweetAlert("success", "Thêm mới phim thành công!");
                $scope.initialize();
            }).catch(error => {
                $scope.sweetAlert("error", "Thêm mới phim thất bại!");
                console.log("Error", error);
            })
            $scope.reset();
            $scope.initialize();
            console.log($scope.form.poster);

            // Xóa giá trị file để tránh giữ lại tên ảnh cũ
            $scope.file = null;
            // Xóa giá trị trong trường chọn tệp
            angular.element("input[type='file']").val(null);
        }).catch(error => {
            console.log("Error", error);
        })

        console.log($scope.folder);
    }

    //Cập nhật sản phẩm
    // $scope.update = function () {

    //     var data = new FormData();
    //     data.append('file', $scope.file);


    //     $http.post(`/rest/upload`, data, {
    //         transformRequest: angular.identity,
    //         headers: { 'Content-Type': undefined }
    //     }).then(resp => {
    //         $scope.form.poster = resp.data.name;


    //         console.log("form: ", $scope.form);
    //         var item = angular.copy($scope.form);
    //         $http.put(`/rest/movies/${item.id}`, item).then(resp => {
    //             var index = $scope.items.findIndex(p => p.id == item.id);
    //             $scope.items[index] = item;
    //             $scope.sweetAlert("success", "Cập nhật phim thành công!");
    //         }).catch(error => {
    //             $scope.sweetAlert("error", "Cập nhật phim thất bại!");
    //             console.log("Error", error);
    //         })

    //         $scope.reset();
    //         $scope.initialize();
    //         console.log($scope.form.poster);
    //     }).catch(error => {
    //         console.log("Error", error);
    //     })

    //     console.log($scope.folder);
    // }

    $scope.update = function () {
        if ($scope.file) { // Kiểm tra xem có ảnh mới hay không
            var data = new FormData();
            data.append('file', $scope.file);

            $http.post(`/rest/upload`, data, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(resp => {
                $scope.form.poster = resp.data.name;
                updateMovie(); // Gọi hàm cập nhật phim sau khi lưu ảnh

                // Xóa giá trị file để tránh giữ lại tên ảnh cũ
                $scope.file = null;
                // Xóa giá trị trong trường chọn tệp
                angular.element("input[type='file']").val(null);
            }).catch(error => {
                console.log("Error uploading image", error);
            });
        } else {
            updateMovie(); // Nếu không có ảnh mới, chỉ cập nhật thông tin phim
        }

        function updateMovie() {
            var item = angular.copy($scope.form);
            $http.put(`/rest/movies/${item.id}`, item).then(resp => {
                var index = $scope.items.findIndex(p => p.id == item.id);
                $scope.items[index] = item;
                $scope.sweetAlert("success", "Cập nhật phim thành công!");
                $scope.reset();
                $scope.initialize();
            }).catch(error => {
                $scope.sweetAlert("error", "Cập nhật phim thất bại!");
                console.log("Error updating movie", error);
            });
        }
    }

    //Xóa sản phẩm
    $scope.delete = function (item) {
        $http.delete(`/rest/movies/${item.id}`).then(resp => {
            var index = $scope.items.findIndex(p => p.id == item.id);
            $scope.items.splice(index, 1);
            $scope.reset();
            $scope.sweetAlert("success", "Xóa phim thành công!");
        }).catch(error => {
            $scope.sweetAlert("error", "Xóa phim thất bại!");
            console.log("Error", error);
        })
    }

    // $scope.imageChanged = function (files) {
    //     $scope.selectedFile = files[0];
    // };

    // //Upload hình
    // $scope.imageChanged = function (files) {
    //     var data = new FormData();
    //     data.append('file', files[0]);
    //     $http.post('/rest/upload/image', data, {
    //         transformRequest: angular.identity,
    //         headers: { 'Content-Type': undefined }
    //     }).then(resp => {
    //         $scope.form.poster = resp.data.name;
    //         console.log($scope.form.poster);
    //     }).catch(error => {
    //         console.log("Error", error);
    //     })
    // }


    $scope.imageChanged = function (input) {
        $scope.folder = null;
        $scope.file = input.files[0];
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.form.poster = e.target.result;
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    $scope.pager = {
        page: 0,
        size: 5,
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