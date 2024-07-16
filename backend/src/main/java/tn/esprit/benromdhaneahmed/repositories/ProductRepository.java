package tn.esprit.benromdhaneahmed.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.benromdhaneahmed.entities.Product;
import tn.esprit.benromdhaneahmed.entities.ProductCategory;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {


    @Query("SELECT p FROM Product p WHERE " +
            "(:search IS NULL OR p.name LIKE %:search% OR p.description LIKE %:search%) AND " +
            "p.category IN :categories AND " +
            "p.price BETWEEN :minPrice AND :maxPrice ")
    Page<Product> findByCategoryInAndPriceBetweenWithSearch(
            @Param("categories") List<ProductCategory> categories,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("search") String search,
            Pageable pageable);
}
