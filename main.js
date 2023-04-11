// get Total
// Create Product
// save localstorage
// clear input field
// read
// count
// delete
// update
// search
// clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");

let mood = 'create';
let tmp;
// Get Total
function getTotal() {
    if (price.value != '' && price.value > 0) {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.textContent = result > 0 ? result : 'Invalid';
        total.style.backgroundColor = '#040';
    } else {
        total.textContent = '';
        total.style.backgroundColor = '#a00d02';
    }
}

// Create Product [first of Curds]
let dataPro;
if (localStorage.getItem("product") != null) {
    dataPro = JSON.parse(localStorage.getItem("product"));
} else {
    dataPro = [];
}
submit.onclick = function() {
    if (title.value == '' || price.value == '' || category.value == '' || count.value > 100) {
        return false;
    } else {
        let newPro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        };
        if (mood == 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
                clearData();
            } else if (newPro.count == 1) {
                dataPro.push(newPro);
                clearData();
            } else {
                window.alert("Invalid Number Of Count");
            }
        } else {
            // Update
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            clearData();
        }

        // Save In Local Storage
        localStorage.setItem("product", JSON.stringify(dataPro));

        showData();
    }
};

// Clear Input
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
showData();
// Read [Second of Crud]
function showData() {
    getTotal();
    let tr = '';
    for (let i = 0; i < dataPro.length; i++) {
        tr += `
    <tr>
       <td>${i + 1}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].category}</td>
       <td><button onclick="updateData(${i})" id="update">Update</button></td>
       <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`;
    }
    document.getElementById("tbody").innerHTML = tr;

    let btnDeleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        btnDeleteAll.innerHTML = '';
    }
}

// Delete [Third Of Crud]
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
// Delete All
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// Update Data [Fourth Of Crud]
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// Search Data
let moodSearch = 'title';
function getSearchMood(id) {
    if (id == "searchTitle") {
        moodSearch = 'title';
    } else {
        moodSearch = 'category';
    }
    search.placeholder = `Search By ${moodSearch.toUpperCase()}`;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let tr = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (moodSearch == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                tr += `
                          <tr>
                     <td>${i + 1}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick="updateData(${i})" id="update">Update</button></td>
                     <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                         </tr>`;
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                console.log(i);
                tr += `
                          <tr>
                     <td>${i + 1}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick="updateData(${i})" id="update">Update</button></td>
                     <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                         </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = tr;
}