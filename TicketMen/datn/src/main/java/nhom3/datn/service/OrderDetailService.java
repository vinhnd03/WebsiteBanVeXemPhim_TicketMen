package nhom3.datn.service;

import java.util.List;

import nhom3.datn.entity.OrderDetail;

public interface OrderDetailService {

    List<OrderDetail> findAll();

    OrderDetail findById(Long id);

    OrderDetail create(OrderDetail order);

    List<OrderDetail> findDetailByOrderId(Long id);

    List<OrderDetail> findDetailByOrderId(Long id, Long tid);
    
}
