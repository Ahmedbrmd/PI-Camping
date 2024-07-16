package tn.esprit.benromdhaneahmed.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.benromdhaneahmed.entities.CampPlaceCategory;
import tn.esprit.benromdhaneahmed.entities.Product;
import tn.esprit.benromdhaneahmed.entities.ProductCategory;
import tn.esprit.benromdhaneahmed.services.IProduct;
import tn.esprit.benromdhaneahmed.services.ProductServiceIMP;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private final IProduct productService;

    private ProductServiceIMP productServiceIMP;

    private Sort getSort(String sort) {
        String[] sortParams = sort.split(",");
        String property = sortParams[0];
        String direction = sortParams[1];
        return Sort.by(Sort.Direction.fromString(direction), property);
    }

    @PostMapping( "/addProduct")
    public Product addProduct(@RequestBody Product product)
    {

        productService.addProduct(product);
        return product;

    }



    @GetMapping("/getProduct")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        product.setId(id);
        productService.UpdateProduct(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productServiceIMP.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public List<ProductCategory> getCategories(){
        return  productServiceIMP.getCategories();
    }

    @GetMapping("/filteredProducts")
    public Page<Product> getFilteredProducts(
            @RequestParam(required = false) List<ProductCategory> categories,
            @RequestParam(required = false, defaultValue = "0.0") Double minPrice,
            @RequestParam(required = false, defaultValue = "100000.0") Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false,defaultValue = "id,asc") String sort,
            @RequestParam(required = false,defaultValue = "") String search

    ) {
        if (categories == null) {
            categories = Arrays.asList(ProductCategory.values());
        }

        Pageable pageable = PageRequest.of(page, size, getSort(sort));

        return productServiceIMP.getFilteredProducts(
                categories,
                minPrice,
                maxPrice,
                search,
                pageable
        );
    }
}
