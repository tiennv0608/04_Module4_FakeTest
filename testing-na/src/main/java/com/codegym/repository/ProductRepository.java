package com.codegym.repository;

import com.codegym.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
    @Query("select p from Product p where p.name like :name")
    Iterable<Product> findAllByName(@Param("name") String name);
    @Query("from Product p join Category c on c.id = p.category.id where c.name like :name")
    List<Product> findAllByCategoryName(@Param("name") String name);
}
