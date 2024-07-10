function displayList() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/api/products',
        success: function (data) {
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
                <Button type="button" class="btn btn-success" onclick="window.location.href='/update/index.html/${i + 1}'">Update</Button>
                <span><button type="button" class="btn btn-danger" onclick="deleteById(${data[i].id})">Delete</button></span>
            </td>
        </tr>`;
            }
            content += `</table>`;
            document.getElementById('products').innerHTML = content;
        }
    })
}

displayList();

function deleteById(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/api/products/${id}`,
        success: () => {
            alert("Successfully deleted")
            displayList();
        },
    });
}

/*TODO: to update an existing product
*       we need to send an request -> server
*       and get the product back by properly id
*       then send back the html and change 19h47p 10/07/2024*/
