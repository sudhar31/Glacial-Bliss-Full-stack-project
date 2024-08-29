package com.glacialblissbackend.glacial_bliss.Order;

import com.glacialblissbackend.glacial_bliss.Product.Product;
import com.glacialblissbackend.glacial_bliss.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        Product product = order.getProduct();
        if (product == null || product.getUnitPrice() == null) {
            throw new IllegalArgumentException("Product or unit price is missing.");
        }

        // Calculate the total price
        double totalPrice = order.getQuantity() * product.getUnitPrice().doubleValue();
        order.setTotalPrice(BigDecimal.valueOf(totalPrice));

        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        return orderRepository.findById(id).map(order -> {
            order.setProductName(orderDetails.getProductName());
            order.setQuantity(orderDetails.getQuantity());
            order.setTotalPrice(orderDetails.getTotalPrice());
            return orderRepository.save(order);
        }).orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Order not found with id " + id);
        }
        orderRepository.deleteById(id);
    }

}
