function create() {
    let price = $('#price').val();
    let color = $('#color').val();
    let description = $('#description').val();
    let quantity = $('#quantity').val();
    let category = $('#category').val();

    let newProduct = {
        price: price,
        color: color,
        description: description,
        quantity: quantity,
        category: {
            id: category
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:8080/api/products',
        type: 'POST',
        data: JSON.stringify(newProduct),
        success: () => {
            alert('Product created successfully');
        }
    });
    event.preventDefault();
}

function displayCategory() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/categories',
        success: function (data) {
            let content = `<option selected>The loai</option>
            `
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`;
            }
            console.log(content);
            document.getElementById('category').innerHTML = content;
        }
    });
    event.preventDefault();
}