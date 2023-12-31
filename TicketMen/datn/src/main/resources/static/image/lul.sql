USE [SHOESSHOPAG]
GO
/****** Object:  Table [dbo].[chitietdonhangs]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chitietdonhangs](
	[ma_don_hang] [int] NOT NULL,
	[ma_giay] [int] NOT NULL,
	[so_luong] [int] NULL,
	[don_gia] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_don_hang] ASC,
	[ma_giay] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[danhgias]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[danhgias](
	[ma_danh_gia] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NULL,
	[ho_va_ten] [nvarchar](100) NULL,
	[hinh] [varchar](max) NULL,
	[ngay_danh_gia] [varchar](30) NULL,
	[nhan_xet] [nvarchar](300) NULL,
	[so_sao] [int] NULL,
	[ma_giay] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_danh_gia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[donhangs]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[donhangs](
	[ma_don_hang] [int] IDENTITY(1,1) NOT NULL,
	[dia_chi] [nvarchar](300) NULL,
	[ten_nguoi_nhan] [nvarchar](100) NULL,
	[tong_tien] [int] NULL,
	[ghi_chu_khach_hang] [nvarchar](300) NULL,
	[ghi_chu_admin] [nvarchar](300) NULL,
	[ngay_dat_hang] [datetime] NULL,
	[trang_thai] [nvarchar](20) NULL,
	[so_dien_thoai] [varchar](15) NULL,
	[tai_khoan] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_don_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[giays]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[giays](
	[ma_giay] [int] IDENTITY(1,1) NOT NULL,
	[ten_giay] [nvarchar](500) NULL,
	[don_gia] [int] NULL,
	[giam_gia] [float] NULL,
	[mo_ta] [nvarchar](max) NULL,
	[hinh_anh] [varchar](max) NULL,
	[ma_loai_giay] [int] NULL,
	[ma_hang] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_giay] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hanggiays]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hanggiays](
	[ma_hang] [int] IDENTITY(1,1) NOT NULL,
	[ten_hang] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_hang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[khachhangs]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[khachhangs](
	[tai_khoan] [varchar](20) NOT NULL,
	[mat_khau] [varchar](20) NULL,
	[ten_khach_hang] [nvarchar](50) NULL,
	[so_dien_thoai] [varchar](20) NULL,
	[dia_chi] [nvarchar](max) NULL,
	[ma_quyen] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[tai_khoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[loaigiays]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[loaigiays](
	[ma_loai_giay] [int] IDENTITY(1,1) NOT NULL,
	[ten_loai] [nvarchar](20) NULL,
	[gioi_tinh] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_loai_giay] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[quyens]    Script Date: 12/7/2023 10:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[quyens](
	[ma_quyen] [int] IDENTITY(1,1) NOT NULL,
	[ten_quyen] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ma_quyen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (7, 27, 1, 70000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (7, 28, 1, 100000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (7, 29, 1, 80000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (7, 31, 1, 60000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (8, 31, 2, 60000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (8, 32, 1, 80000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (8, 33, 2, 120000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (9, 27, 1, 70000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (9, 28, 1, 100000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (9, 30, 1, 30000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (10, 26, 1, 20000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (10, 27, 1, 70000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (10, 32, 1, 80000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (11, 27, 3, 70000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (11, 28, 1, 100000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (11, 29, 2, 80000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (12, 27, 1, 70000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (12, 29, 5, 80000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (12, 31, 1, 60000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (13, 28, 1, 100000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (14, 26, 1, 20000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (14, 27, 1, 70000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (15, 30, 1, 30000)
INSERT [dbo].[chitietdonhangs] ([ma_don_hang], [ma_giay], [so_luong], [don_gia]) VALUES (15, 31, 1, 60000)
GO
SET IDENTITY_INSERT [dbo].[donhangs] ON 

INSERT [dbo].[donhangs] ([ma_don_hang], [dia_chi], [ten_nguoi_nhan], [tong_tien], [ghi_chu_khach_hang], [ghi_chu_admin], [ngay_dat_hang], [trang_thai], [so_dien_thoai], [tai_khoan]) VALUES (9, N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', N'Võ Hoàng Phúc', 207000, NULL, NULL, CAST(N'2023-12-01T22:35:36.350' AS DateTime), N'Chưa giao', N'0934868122', N'phuc')
INSERT [dbo].[donhangs] ([ma_don_hang], [dia_chi], [ten_nguoi_nhan], [tong_tien], [ghi_chu_khach_hang], [ghi_chu_admin], [ngay_dat_hang], [trang_thai], [so_dien_thoai], [tai_khoan]) VALUES (10, N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', N'Võ Hoàng Phúc', 176500, NULL, NULL, CAST(N'2023-12-01T23:00:14.067' AS DateTime), N'Chưa giao', N'0934868122', N'phuc')
INSERT [dbo].[donhangs] ([ma_don_hang], [dia_chi], [ten_nguoi_nhan], [tong_tien], [ghi_chu_khach_hang], [ghi_chu_admin], [ngay_dat_hang], [trang_thai], [so_dien_thoai], [tai_khoan]) VALUES (12, N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', N'Lê Công Thiên', 531300, NULL, NULL, CAST(N'2023-12-02T08:20:33.610' AS DateTime), N'Chưa giao', N'0934868001', N'thien')
INSERT [dbo].[donhangs] ([ma_don_hang], [dia_chi], [ten_nguoi_nhan], [tong_tien], [ghi_chu_khach_hang], [ghi_chu_admin], [ngay_dat_hang], [trang_thai], [so_dien_thoai], [tai_khoan]) VALUES (13, N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', N'Lê Công Thiên', 112000, NULL, NULL, CAST(N'2023-12-02T08:35:30.637' AS DateTime), N'Chưa giao', N'0934868001', N'thien')
INSERT [dbo].[donhangs] ([ma_don_hang], [dia_chi], [ten_nguoi_nhan], [tong_tien], [ghi_chu_khach_hang], [ghi_chu_admin], [ngay_dat_hang], [trang_thai], [so_dien_thoai], [tai_khoan]) VALUES (14, N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', N'Lê Công Thiên', 96500, NULL, NULL, CAST(N'2023-12-02T08:37:44.460' AS DateTime), N'Đã giao', N'0934868001', N'thien')
SET IDENTITY_INSERT [dbo].[donhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[giays] ON 

INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (26, N'Xoài', 20000, 0.1, N'Xoài ngọt nhập  khẩu từ Trung Quốc', N'2624e7bb.png', 3, 4)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (27, N'Chanh dây', 70000, 0.05, N'Chanh dây tím , có thể làm đồ uống hoặc trong chế biến thức ăn', N'b072b01b.jpg', 3, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (28, N'Sầu Riêng', 100000, 0, N'Sầu riêng', N'a9117cde.jpg', 3, 2)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (29, N'Bưởi', 80000, 0, N'Bưởi 5 roi có thể ăn ngay hoặc dùng để chế biến thức ăn', N'5d572021.jpg', 3, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (30, N'Khoai Lang', 30000, 0.05, N'Khoai Lang Mật', N'bbee774d.jpg', 2, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (31, N'Khoai Tây', 60000, 0.12, N'Khoai Tây Úc', N'987fd495.jpg', 2, 2)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (32, N'Bơ', 80000, 0, N'Bơ Đăk Lăk', N'ce4a26af.jpg', 3, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (33, N'Kiwi', 120000, 0.05, N'Kiwi', N'c976c45b.jpg', 3, 4)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (34, N'Lựu', 180000, 0.1, N'Lưu dùng để ăn trực tiếp , ép nước , chế biến thức ăn rất tốt cho sức khỏe', N'1153ed0.jpg', 3, 1)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (35, N'Măng Cụt', 180000, 0.09, N'Măng Cụt', N'b1779f5a.jpg', 3, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (36, N'Nhãn Lồng', 110000, 0.1, N'Nhãn Lồng Hưng Yên', N'9d1595c.jpg', 3, 1)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (37, N'Ổi', 20000, 0.2, N'Ổi ruột trắng', N'4f8a4358.jpg', 3, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (38, N'Ớt Chuông', 80000, 0.08, N'Ớt chuông Đà Lạt', N'34eabc45.jpg', 1, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (39, N'Cải Thìa', 40000, 0.1, N'Rau Cải Thìa', N'edfbbfdf.jpg', 1, 3)
INSERT [dbo].[giays] ([ma_giay], [ten_giay], [don_gia], [giam_gia], [mo_ta], [hinh_anh], [ma_loai_giay], [ma_hang]) VALUES (41, N'Táo', 40000, 0.05, N'Táo Mỹ', N'2ca9cafa.jpg', 1, 1)
SET IDENTITY_INSERT [dbo].[giays] OFF
GO
SET IDENTITY_INSERT [dbo].[hanggiays] ON 

INSERT [dbo].[hanggiays] ([ma_hang], [ten_hang]) VALUES (1, N'Mỹ')
INSERT [dbo].[hanggiays] ([ma_hang], [ten_hang]) VALUES (2, N'Úc')
INSERT [dbo].[hanggiays] ([ma_hang], [ten_hang]) VALUES (3, N'Việt Nam')
INSERT [dbo].[hanggiays] ([ma_hang], [ten_hang]) VALUES (4, N'Trung Quốc')
INSERT [dbo].[hanggiays] ([ma_hang], [ten_hang]) VALUES (5, N'Nhật Bản')
SET IDENTITY_INSERT [dbo].[hanggiays] OFF
GO
INSERT [dbo].[khachhangs] ([tai_khoan], [mat_khau], [ten_khach_hang], [so_dien_thoai], [dia_chi], [ma_quyen]) VALUES (N'admin', N'123456', N'Admin', N'0393796446', N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', 3)
INSERT [dbo].[khachhangs] ([tai_khoan], [mat_khau], [ten_khach_hang], [so_dien_thoai], [dia_chi], [ma_quyen]) VALUES (N'dinh', N'Dinh@2003', N'dinh tien dinh', N'0868328446', N'Quang Ngai', 1)
INSERT [dbo].[khachhangs] ([tai_khoan], [mat_khau], [ten_khach_hang], [so_dien_thoai], [dia_chi], [ma_quyen]) VALUES (N'phong', N'123456', N'Lê Viết Phong', N'0934868333', N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', 1)
INSERT [dbo].[khachhangs] ([tai_khoan], [mat_khau], [ten_khach_hang], [so_dien_thoai], [dia_chi], [ma_quyen]) VALUES (N'phuc', N'123456', N'Võ Hoàng Phúc', N'0934868122', N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', 1)
INSERT [dbo].[khachhangs] ([tai_khoan], [mat_khau], [ten_khach_hang], [so_dien_thoai], [dia_chi], [ma_quyen]) VALUES (N'thien', N'Dinh@2003', N'Lê Công Thiên', N'0868328446', N'137 Nguyễn Thị Thập, Liên Chiểu, Đà Nẵng', 1)
GO
SET IDENTITY_INSERT [dbo].[loaigiays] ON 

INSERT [dbo].[loaigiays] ([ma_loai_giay], [ten_loai], [gioi_tinh]) VALUES (1, N'Rau', 1)
INSERT [dbo].[loaigiays] ([ma_loai_giay], [ten_loai], [gioi_tinh]) VALUES (2, N'Củ', 2)
INSERT [dbo].[loaigiays] ([ma_loai_giay], [ten_loai], [gioi_tinh]) VALUES (3, N'Quả', 3)
SET IDENTITY_INSERT [dbo].[loaigiays] OFF
GO
SET IDENTITY_INSERT [dbo].[quyens] ON 

INSERT [dbo].[quyens] ([ma_quyen], [ten_quyen]) VALUES (1, N'User')
INSERT [dbo].[quyens] ([ma_quyen], [ten_quyen]) VALUES (2, N'Staff')
INSERT [dbo].[quyens] ([ma_quyen], [ten_quyen]) VALUES (3, N'Admin')
SET IDENTITY_INSERT [dbo].[quyens] OFF
GO
ALTER TABLE [dbo].[chitietdonhangs]  WITH NOCHECK ADD FOREIGN KEY([ma_don_hang])
REFERENCES [dbo].[donhangs] ([ma_don_hang])
GO
ALTER TABLE [dbo].[chitietdonhangs]  WITH CHECK ADD FOREIGN KEY([ma_giay])
REFERENCES [dbo].[giays] ([ma_giay])
GO
ALTER TABLE [dbo].[danhgias]  WITH CHECK ADD FOREIGN KEY([ma_giay])
REFERENCES [dbo].[giays] ([ma_giay])
GO
ALTER TABLE [dbo].[donhangs]  WITH CHECK ADD FOREIGN KEY([tai_khoan])
REFERENCES [dbo].[khachhangs] ([tai_khoan])
GO
ALTER TABLE [dbo].[giays]  WITH CHECK ADD FOREIGN KEY([ma_hang])
REFERENCES [dbo].[hanggiays] ([ma_hang])
GO
ALTER TABLE [dbo].[giays]  WITH CHECK ADD FOREIGN KEY([ma_loai_giay])
REFERENCES [dbo].[loaigiays] ([ma_loai_giay])
GO
ALTER TABLE [dbo].[khachhangs]  WITH CHECK ADD FOREIGN KEY([ma_quyen])
REFERENCES [dbo].[quyens] ([ma_quyen])
GO
