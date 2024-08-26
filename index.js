function handleFormSubmit(event){
    event.preventDefault();
    const ProductDetail = {
        SellerPrice: event.target.sellerprice.value,
        Category: event.target.category.value,
        ProductName: event.target.productname.value
    };
    
    axios.post("https://crudcrud.com/api/7faacacb9fc44b0b99d42791a80022a6/seller", ProductDetail)
        .then((res) => DisplayOnPage(res.data))
        .catch((err) => console.log(err));

    // Clearing the input
    document.getElementById("sellerprice").value = "";
    document.getElementById("productname").value = "";
}

// Get
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/7faacacb9fc44b0b99d42791a80022a6/seller")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                DisplayOnPage(response.data[i]);
            }
        })
        .catch((err) => console.log(err));
});

// Displaying content on page
function DisplayOnPage(ProductDetail) {
    const ProductList = document.createElement("li");
    ProductList.appendChild(document.createTextNode(
        `${ProductDetail.SellerPrice} : ${ProductDetail.Category} : ${ProductDetail.ProductName}`
    ));
    
    // Creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete Order"));
    ProductList.appendChild(deleteBtn);
    
    // Delete button functionality
    deleteBtn.addEventListener("click", function(event) {
        axios.delete(`https://crudcrud.com/api/7faacacb9fc44b0b99d42791a80022a6/seller/${ProductDetail._id}`)
            .then(() => {
                event.target.parentElement.remove();
            })
            .catch((err) => console.log(err));
    });

    // Determine the correct list to append based on the category
    let categorylist;
    if (ProductDetail.Category === "Electronic Item") {
        categorylist = document.getElementById("electric");
    } else if (ProductDetail.Category === "Food") {
        categorylist = document.getElementById("food");
    } else if (ProductDetail.Category === "Skincare Item") {
        categorylist = document.getElementById("skin");
    }

    if (categorylist) {
        categorylist.appendChild(ProductList);
    } else {
        console.error("Category list not found for category:", ProductDetail.Category);
    }
}
