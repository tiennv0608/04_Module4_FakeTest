function addProduct() {
    //lay du lieu
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let color = document.getElementById("color").value;
    let categoryId = document.getElementById("category").value;
    let newProduct = {
        name: name,
        price: price,
        quantity: quantity,
        color: color,
        category: {
            id: categoryId
        }
    }
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newProduct),
        //tên API
        url: "http://localhost:8080/products",
        //xử lý khi thành công
        success: function () {
            successHandler();
            clearInput();

        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function showFormCreate() {
    let str = '<h3>Add Product</h3>' +
        '<table>' +
        '<tr>' +
        '<td>Name:</td>' +
        '<td><input type="text" id="name" placeholder="Name"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Color:</td>' +
        '<td><input type="text" id="color" placeholder="Color"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Price:</td>' +
        '<td><input type="text" id="price" placeholder="Price"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Quantity:</td>' +
        '<td><input type="text" id="quantity" placeholder="Quantity"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Category:</td>' +
        '<td><select name="category" id="category">' +
        '<option value="1">Phone</option>' +
        '<option value="2">Computer</option>' +
        '<option value="3">Television</option>' +
        '</select></td>' +
        '</tr>' +
        '<tr>' +
        '<td></td>' +
        '<td><input type="submit" value="Add" onClick="addProduct()"></td>' +
        '</tr>' +
        '</table>';
    document.getElementById("form").innerHTML = str;
}

function clearInput() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("color").value = "";

}

function getProduct(product) {
    return `<tr><td>${product.name}</td><td>${product.quantity}</td><td>${product.price}</td><td>${product.color}</td><td>${product.category.name}</td>` +
        `<td><input type="button" onclick="showFormEdit('${product.id}')" value="Edit"/></td>` +
        `<td><input type="button" onclick="deleteProduct('${product.id}')" value="Delete"/></td></tr>`;
}

function successHandler() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/products",
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '    <tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Quantity</td>\n' +
                '        <td>Price</td>\n' +
                '        <td>Color</td>\n' +
                '        <td>Category</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getProduct(data[i]);
            }
            document.getElementById('products').innerHTML = content;
        }
    });
}

function deleteProduct(id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "DELETE",
        //tên API
        url: "http://localhost:8080/products/" + id,
        data: JSON.stringify(id),
        //xử lý khi thành công
        success: successHandler
    });
}

function showFormEdit(id) {
    let str = '<h3>Edit Product</h3>' +
        '<input type="hidden" id="id">' +
        '<table>' +
        '<tr>' +
        '<td>Name:</td>' +
        '<td><input type="text" id="name" placeholder="Name"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Color:</td>' +
        '<td><input type="text" id="color" placeholder="Color"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Price:</td>' +
        '<td><input type="text" id="price" placeholder="Price"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Quantity:</td>' +
        '<td><input type="text" id="quantity" placeholder="Quantity"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Category:</td>' +
        '<td><select name="category" id="category">' +
        '<option value="1">Phone</option>' +
        '<option value="2">Computer</option>' +
        '<option value="3">Television</option>' +
        '</select></td>' +
        '</tr>' +
        '<tr>' +
        '<td></td>' +
        '<td><input type="submit" value="Update" onClick="updateProduct()"></td>' +
        '</tr>' +
        '</table>';
    document.getElementById("form").innerHTML = str;
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/products/" + id,
        //xử lý khi thành công
        success: function (data) {
            let idData = id;
            let name = data.name;
            let quantity = data.quantity;
            let price = data.price;
            let color = data.color;
            let category = data.category.id;
            document.getElementById("id").value = idData;
            document.getElementById("name").value = name;
            document.getElementById("quantity").value = quantity;
            document.getElementById("price").value = price;
            document.getElementById("color").value = color;
            document.getElementById("category").value = category;
        }
    });
}

function updateProduct() {
    let id = document.getElementById("id").value;
    //lay du lieu
    let name = document.getElementById("name").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let color = document.getElementById("color").value;
    let categoryId = document.getElementById("category").value;
    let product = {
        name: name,
        quantity: quantity,
        price: price,
        color: color,
        category: {
            id: categoryId
        }
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(product),
        //tên API
        url: "http://localhost:8080/products/" + id,
        //xử lý khi thành công
        success: function () {
            successHandler();
            clearInput();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function searchProductByName() {
    let name = document.getElementById("search").value;
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/products/name=" + name,
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '    <tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Quantity</td>\n' +
                '        <td>Price</td>\n' +
                '        <td>Color</td>\n' +
                '        <td>Category</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getProduct(data[i]);
            }
            document.getElementById('products').innerHTML = content;
        }
    });
}


