/*TODO: Hien thi danh sach trang chinh*/
let temporaryNumber = 0;

function displayList() {
    $.ajax({
        method: 'GET', url: 'http://localhost:8080/api/products', success: function (data) {
            let content = `  <tr>
            <th class="text-white">No</th>
            <th class="text-white">Color</th>
            <th class="text-white">Description</th>
            <th class="text-white">Price</th>
            <th  class="text-white"  >Quantity</th>
            <th class="text-white">Category</th>
            <th class="text-white">Action</th>
        </tr>`
            for (let i = 0; i < data.length; i++) {
                content += `  <tr>
            <td class="text-white">${i + 1}</td>
            <td class="text-white">${data[i].color}</td>
            <td class="text-white">${data[i].description}</td>
            <td class="text-white">${data[i].price}</td>
            <td class = "text-white">${data[i].quantity}</td>
            <td class="text-white">${data[i].category.name}</td>
            <td>
                <Button type="button" class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getTheOldDataOfProductFromServer(${data[i].id})"><i class="fa-solid fa-pen-to-square"></i></Button>
                <span><button type="button" class="btn btn-danger" onclick="deleteById(${data[i].id})"><i class="fa-solid fa-trash"></i></button></span>
            </td>
        </tr>`;
            }
            content += `</table>`;
            document.getElementById('products').innerHTML = content;
        }
    })
}

displayList();

/*TODO: xoa theo id*/
function deleteById(id) {
    $.ajax({
        type: 'DELETE', url: `http://localhost:8080/api/products/${id}`, success: () => {
            alert("Successfully deleted")
            displayList();
        },
    });
}

/*TODO: lay du lieu muon chinh sua theo id*/
function getTheOldDataOfProductFromServer(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/products/${id}`,
        success: function (data) {
            document.getElementById('price-edit').value = data.price;
            document.getElementById('color-edit').value = data.color;
            document.getElementById('description-edit').value = data.description;
            document.getElementById('quantity-edit').value = data.quantity;
            document.getElementById('category-edit').value = data.category.name;
        },
    })
    temporaryNumber = id;
    event.preventDefault();
}

/*TODO: day du lieu len server tu the form de 
*       thay doi du lieu cua san pham voi id
*       truyen len*/
function updateProduct() {
    let newProduct = {
        price: document.getElementById('price-edit').value,
        color: document.getElementById('color-edit').value,
        description: document.getElementById('description-edit').value,
        quantity: document.getElementById('quantity-edit').value,
        category: {
            name: document.getElementById('category-edit').value
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        },
        type: 'PUT',
        url: `http://localhost:8080/api/products/${temporaryNumber}`,
        data: JSON.stringify(newProduct),
        success: function () {
            alert('Product updated successfully');
            displayList();
        }
    });
    event.preventDefault();

}