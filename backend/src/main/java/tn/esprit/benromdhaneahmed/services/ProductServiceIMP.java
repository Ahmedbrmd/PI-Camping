package tn.esprit.benromdhaneahmed.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tn.esprit.benromdhaneahmed.entities.CampPlace;
import tn.esprit.benromdhaneahmed.entities.CampPlaceCategory;
import tn.esprit.benromdhaneahmed.entities.Product;
import tn.esprit.benromdhaneahmed.entities.ProductCategory;
import tn.esprit.benromdhaneahmed.repositories.ProductRepository;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class ProductServiceIMP implements IProduct{
    @Autowired
    private ProductRepository productRepository;


    @Override
    @Transactional
    public void addProduct(Product product) {

        productRepository.saveAndFlush(product);

    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional
    public void UpdateProduct(Product product) {

        productRepository.save(product);

    }

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);

    }

    @Transactional
    public List<ProductCategory> getCategories() {
        List<ProductCategory> categories = Arrays.asList(ProductCategory.values());
        return categories;
    }
    @Transactional
    public Page<Product> getFilteredProducts(
            List<ProductCategory> categories,
            Double minPrice,
            Double maxPrice,
            String search,
            Pageable pageable){
        return productRepository.findByCategoryInAndPriceBetweenWithSearch(
                categories,
                minPrice,
                maxPrice,
                search,
                pageable);
    }
    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }
}

