package com.codegym.service.product;

import com.codegym.model.Product;
import com.codegym.service.IGeneralService;

import java.util.List;

public interface IProductService extends IGeneralService<Product> {
    Iterable<Product> findAllByName(String name);

    List<Product> findProductByCategoryName(String name);
}
