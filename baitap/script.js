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

function clearInput() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("color").value = "";
    document.getElementById("name1").value = "";
    document.getElementById("price1").value = "";
    document.getElementById("quantity1").value = "";
    document.getElementById("color1").value = "";

}

function getProduct(product) {
    return `<tr><td>${product.name}</td><td>${product.quantity}</td><td>${product.price}</td><td>${product.color}</td><td>${product.category.name}</td>` +
        `<td><a onclick="showFormEdit('${product.id}')"><u>Edit</u></a></td>` +
        `<td><a onclick="deleteProduct('${product.id}')"><u>Delete</u></a></td></tr>`;
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
            document.getElementById("name1").value = name;
            document.getElementById("quantity1").value = quantity;
            document.getElementById("price1").value = price;
            document.getElementById("color1").value = color;
            document.getElementById("category1").value = category;
        }
    });
}

function updateProduct() {
    let id = document.getElementById("id").value;
    //lay du lieu
    let name = document.getElementById("name1").value;
    let quantity = document.getElementById("quantity1").value;
    let price = document.getElementById("price1").value;
    let color = document.getElementById("color1").value;
    let categoryId = document.getElementById("category1").value;
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
