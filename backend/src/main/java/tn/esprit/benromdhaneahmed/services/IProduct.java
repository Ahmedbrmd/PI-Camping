package tn.esprit.benromdhaneahmed.services;

import tn.esprit.benromdhaneahmed.entities.Product;

import java.util.List;

public interface IProduct {
    void addProduct(Product product);


    List<Product> getAllProducts();
    void UpdateProduct(Product product);

    void deleteProduct(int id);



}



