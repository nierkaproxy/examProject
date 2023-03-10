import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

import { adsPage } from "./adsForm.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
  push
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

import { firebaseConfig } from "./firebase.js";
const app = initializeApp(firebaseConfig);

const database = getDatabase();
let enterIDValue = '';
const idArray = []; 
const insertFunc = () => {
  let enterID = document.getElementById("enterID");
  let enterName = document.getElementById("enterName");
  let enterQuantity = document.getElementById("enterQuantity");
  let enterPrice = document.getElementById("enterPrice");
  let enterDesc = document.getElementById("enterDesc");
  let insertImg = document.getElementById("insertImg");

  let findID = document.getElementById("findID");
  let findData = document.getElementById("findData");

  let insertBtn = document.getElementById("insert");
  let updateBtn = document.getElementById("update");
  let removeBtn = document.getElementById("remove");
  let findBtn = document.getElementById("find");



  const insert = (e) => {
    e.preventDefault();
    if (enterID.value.length < 3) {
      alert("Product Code laukelyje turi buti bent 3 symboliai!");
      return;
    } else if (enterName.value.length < 3) {
      alert("Product Name laukelyje turi buti bent 3 symboliai");
      return;
    } else if (enterQuantity.value.length < 1) {
      alert("Product Quantity laukelis negali buti tuscias");
      return;
    } else if (enterPrice.value.length < 1) {
      alert("Product Price laukelis negali buti tuscias");
      return;
    }
    let id = "id" + Math.random().toString(16).slice(2);
    console.log(id);
    idArray.push(id);
    console.log(idArray);
    localStorage.setItem("ids", JSON.stringify(idArray));
    set(ref(database, enterID.value + id), {
      ID: enterID.value,
      Name: enterName.value,
      Quantity: enterQuantity.value,
      Price: enterPrice.value,
      Description: enterDesc.value,
      Image: insertImg.value,
    })
      .then(() => {
        alert("Data added successfully");
        document.querySelector(".px-3").reset();
      })
      .catch((error) => {
        alert(error);
      });
  };
  
  insertBtn.addEventListener("click", insert);
  


  const find = (e) => {
    e.preventDefault();
    findData.innerHTML = '';
    console.log(`select function ${enterID.value}`);
    const dbref = ref(database);
    if (findID.value.length < 3) {
      alert("Product Code laukelyje turi buti bent 3 symboliai!");
      return;
    }
    let storedIds = JSON.parse(localStorage.getItem("ids"));
console.log(storedIds);


  const promises = storedIds.map(id => {
    return get(child(dbref, findID.value + id));
  });

  Promise.all(promises).then((snapshots) => {
    const data = snapshots.map((snapshot) => {
      if (snapshot.exists()) {
        return [
          { label: 'Product Name', value: snapshot.val().Name },
          { label: 'Quantity', value: snapshot.val().Quantity },
          { label: 'Price', value: snapshot.val().Price },
          { label: 'Description', value: snapshot.val().Description },
          { label: 'Image', value: `<img src="${snapshot.val().Image}">` }
        ];
      } else {
        return null;
      }
    }).filter(Boolean).flat();

    if (data.length > 0) {
      let table = document.createElement("table");
      
      data.map((item) => {
        let row = document.createElement('tr');
        let labelCell = document.createElement('td');
        let valueCell = document.createElement('td');
        labelCell.innerText = item.label + ': ';
        valueCell.innerHTML = item.value;
        row.appendChild(labelCell);
        row.appendChild(valueCell);
        table.appendChild(row);
      

      });
      findData.appendChild(table);
    } else {
      alert("No data found");
    }
  }).catch((error) => {
    alert(error);
  });

  document.getElementById("forma").reset();
}

findBtn.addEventListener("click", find);

  const removeData = (e) => {
    e.preventDefault();
    const dbref = ref(database);
    if (enterID.value.length < 3) {
      alert("Product Code laukelyje turi buti bent 3 symboliai!");
      return;
    }
    get(child(dbref + enterID.value))
      .then((snapshot) => {
        if (snapshot.val() && parseInt(enterID.value) == snapshot.val().ID) {
          remove(ref(database, "Products/" + enterID.value))
            .then(() => {
              alert("Data deleted successfully");
              document.querySelector(".px-3").reset();
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert("Data not found");
          document.querySelector(".px-3").reset();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  removeBtn.addEventListener("click", removeData);
};
export { insertFunc };
// localStorage.clear();