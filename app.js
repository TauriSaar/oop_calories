// Storage Controller
const StorageCtrl = (function () {
    // public methods
    return {
        storeItem: function (item) {
            let items;
            // check if any items is ls
            if(localStorage.getItem('items') === null){
                items = [];
                // push new item
                items.push(item);
                // set ls
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                // push new item
                items.push(item);
                // reset ls
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function () {
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem("items"));
            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem("items", JSON.stringify(items));
        },
        deleteItemStorage: function (itemToDeleteID) {
            let items = JSON.parse(localStorage.getItem("items"));
            items.forEach((item, index) => {
                if (itemToDeleteID === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem("items", JSON.stringify(items));
        },
    };
})();

// Item Controller
const ItemCtrl = (function (ItemCtrl, UICtrl){
    // Item Constructor
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

    // Data Structure
    const data = {
        items: [
            //{id: 0, name: 'Steak Dinner', calories: 1200},
            //{id: 1, name: 'Cookie', calories: 400},
            //{id: 2, name: 'Eggs', calories: 300},

        ],
        total: 0
    }

    return{
        getItems: function (){
            return data.items
        },
        addItem: function (name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            // calories to number
            calories = parseInt(calories);
            // create new item
            newItem = new Item(ID, name, calories);
            // add to items array
            data.items.push(newItem);
            // return new item
            return newItem
        },
        getTotalCalories: function () {
            let total = 0
            // loop through items and add calories
            data.items.forEach(function (item) {
                total = total + item.calories;
            });
            // set total calories in data structure
            data.total = total;
            console.log(data.total)
            // return total
            return data.total;
        },
        getItemByID: function (id) {
            let found = null;
            data.items.forEach((item) => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItemByID: function (id, name, calories) {
            let updatedItem = null;
            data.items.forEach((item) => {
                if (item.id === id) {
                    item.name = name;
                    item.calories = parseInt(calories);
                    updatedItem = item;
                }
            });
            return updatedItem;
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        logData: function (){
            return data;
        },
        itemToBeDeleted: function (id) {
            //Get id's
            const ids = data.items.map((item) => {
                return item.id;
            });
            const index = ids.indexOf(id);

            //Remove item
            data.items.splice(index, 1);
        },
    };
})();

// UI Controller
const UICtrl = (function(){
    // UI selectors
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories',
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
    }
    return {
        populateItemList: function (items) {
            // create html content
            let html = '';

            // parse data and create list items html
            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`
            });
            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        clearEditState: function () {
            UICtrl.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },
        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },
        getSelectors: function () {
            return UISelectors;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
                // Create li element
                const li = document.createElement('li');
                // add class
                li.className = 'collection-item';
                li.id = `item-${item.id}`;
                // add HTML
                li.innerHTML = `<strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`;
                // insert item
                document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInputs: function () {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        updateTotCalories: function (totalCal) {
            document.querySelector(UISelectors.totalCalories).innerHTML = totalCal;
        },
        updateListItem: function (item) {
            const listItems = document.querySelectorAll("#item-list li");
            const listItemsConvert = Array.from(listItems);
            listItemsConvert.forEach((li) => {
                const liID = li.getAttribute("id");
                if (liID === `item-${parseInt(item.id)}`) {
                    li.innerHTML = `
            <strong>${item.name}</strong> - <em>${item.calories} calories</em>
            <a href=3"" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i></a>`;
                }
            });
        },
        removeLiItem: function (id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        addItemToForm: function () {
            const currentItem = ItemCtrl.getCurrentItem();
            document.querySelector(UISelectors.itemNameInput).value = currentItem.name;
            document.querySelector(UISelectors.itemCaloriesInput).value = currentItem.calories;
            UICtrl.showEditState();
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value= '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }
    }
})();

// App Controller
const App = (function (ItemCtrl,StorageCtrl, UICtrl){
    // Load event listeners
    const loadEventListeners = function () {
        // get UI selectors
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        // add document reload event
        document.addEventListener('DOMContentLoaded', getItemsFromStorage);
        //Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);
        document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);
        //Delete one item
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", deleteItem);
    }
    // item add submit function
    const itemAddSubmit = function (event) {
        console.log(event.type)
        // get form input from UI Controller
        const input = UICtrl.getItemInput()
        console.log(input)
        // check for name and calorie input
        if (input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            // add item to UI items list
            UICtrl.addListItem(newItem)
            // get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            // store in localStorage
            StorageCtrl.storeItem(newItem)
            // clear fields
            UICtrl.clearInput();
        }
        event.preventDefault()
    };
    const itemEditClick = function (event) {
        if (event.target.classList.contains("edit-item")) {
            //Get List item id
            const listID = event.target.parentNode.parentNode.id;
            //split the item-id to get only the id
            const listIdArr = listID.split("-");
            // get the id number
            const id = parseInt(listIdArr[1]);
            //Get Item
            const itemToEdit = ItemCtrl.getItemByID(id);
            //set current item
            ItemCtrl.setCurrentItem(itemToEdit);
            //add item to form
            UICtrl.addItemToForm();
        }
        event.preventDefault();
    };

    const itemUpdateSubmit = function (event) {
        const input = UICtrl.getItemInput();
        const itemId = ItemCtrl.getCurrentItem().id;

        // update the data
        const updatedItemSubmit = ItemCtrl.updateItemByID(
            itemId,
            input.name,
            input.calories
        );
        // update item list in UI
        UICtrl.updateListItem(updatedItemSubmit);
        //Get total calorie
        const totalCal = ItemCtrl.getTotalCalories();
        //Update calorie.
        UICtrl.updateTotCalories(totalCal);
        //set initial states
        UICtrl.clearEditState();
        //Update local storage
        StorageCtrl.updateItemStorage(updatedItemSubmit);
        //clear input fields
        UICtrl.clearInputs();

        event.preventDefault();
    };
    const deleteItem = function (event) {
        // retrieve the item id
        const itemToDeleteID = ItemCtrl.getCurrentItem().id;

        ItemCtrl.itemToBeDeleted(itemToDeleteID);

        UICtrl.removeLiItem(itemToDeleteID);

        //Get total calorie
        const totalCal = ItemCtrl.getTotalCalories();

        //Update calorie.
        UICtrl.updateTotCalories(totalCal);

        //delete from local storage
        StorageCtrl.deleteItemStorage(itemToDeleteID);

        //set initial states
        UICtrl.clearEditState();

        event.preventDefault();
    };


    // get items from storage
    const getItemsFromStorage = function (){
        // get items from storage
        const items = StorageCtrl.getItemsFromStorage()
        // set storage items to ItemCtrl data items
        items.forEach(function(item) {
            ItemCtrl.addItem(item['name'], item['calories'])
        })
        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // populate items list
        UICtrl.populateItemList(items);
    };

    return{
        init: function (){
            //set initial states
            UICtrl.clearEditState();

            console.log('Initializing App')
            // fetch items from data structure
            const items = ItemCtrl.getItems()
            // populate items list
            UICtrl.populateItemList(items)
            // load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init()
