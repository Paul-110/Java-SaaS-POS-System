package com.zosh.repository;

import com.zosh.modal.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String fullName, String email);

//    analysis
@Query("""
        SELECT COUNT(DISTINCT o.customer.id)
        FROM Order o
        WHERE o.branch.store.storeAdmin.id = :storeAdminId
    """)
int countByStoreAdminId(@Param("storeAdminId") Long storeAdminId);
}
