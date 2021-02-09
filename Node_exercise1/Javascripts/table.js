let userObj = {};


let getIndex;
function editRow(index) {
    let table = document.getElementById("table");
    console.log(table.rows[index].cells[0].innerHTML);
    document.getElementById("firstName").value = table.rows[index].cells[0].innerHTML;
    document.getElementById("lastName").value = table.rows[index].cells[1].innerHTML; 
    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline-block";
    document.getElementById("renderButton").style.display = "none";
    
    getIndex = index;
  
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[2].innerHTML = `<button style="background-color:#66ff66;color:white" disabled>Edit</button>`;
        table.rows[i].cells[3].innerHTML = `<button class='deleteButton' disabled=true style="background-color:#ff8080;color:white">Delete</button>`;
    }
    document.getElementById("cancelButton").style.display = "inline-block";
}
async function update() {

    const fname = document.getElementById("firstName");
    const lname = document.getElementById("lastName");
    fname.value = fname.value.replace(/\s+/g, ' ').trim();
    lname.value = lname.value.replace(/\s+/g, ' ').trim();
    let table=document.getElementById("table");
    const name = (fname.value + "-" + lname.value).toLowerCase();
    if (fname.value == "" || lname.value == "") {
        alert("Please enter firstname and lastname.");
    }
    else if (userObj.hasOwnProperty(name)) {
        alert("Firstname and lastname already exists");
       
    }
    
    else {
        const oldName=(String(table.rows[getIndex].cells[0].innerHTML)+"-"+String(table.rows[getIndex].cells[1].innerHTML)).toLowerCase();
        let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/table/update", {
                method: "PUT",
                body: JSON.stringify({ oldFirstName: String(table.rows[getIndex].cells[0].innerHTML), oldLastName:String(table.rows[getIndex].cells[1].innerHTML),newFirstName:fname.value,newLastName:lname.value}),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();

        if (result.result == "good") {
            delete userObj[oldName];
            userObj[name]=1
            
           
            let cells = table.rows[getIndex].cells;
            cells[0].innerHTML = fname.value;
            cells[1].innerHTML = lname.value;
            document.getElementById("addButton").style.display = "inline-block";
            document.getElementById("updateButton").style.display = "none";
            document.getElementById("cancelButton").style.display = "none";
            document.getElementById("renderButton").style.display = "inline-block";
            fname.value = "";
            lname.value = "";
         
           
            
            for (let i = 0; i < table.rows.length; i++) {
                table.rows[i].cells[2].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
                table.rows[i].cells[3].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
            }
            console.log(cells[3].innerHTML);
        }
        else {
            alert("Database error please try again");
            document.getElementById("addButton").style.display = "inline-block";
            document.getElementById("updateButton").style.display = "none";
            document.getElementById("cancelButton").style.display = "none";
            document.getElementById("renderButton").style.display = "inline-block";
            for (let i = 0; i < table.rows.length; i++) {
                table.rows[i].cells[2].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
                table.rows[i].cells[3].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
            }
            
        }
    }
    console.log(userObj);
}
function cancelUpdate() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("addButton").style.display = "inline-block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
    document.getElementById("renderButton").style.display = "inline-block";
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[2].innerHTML = `<button onclick="editRow(this.parentNode.parentNode.rowIndex)" style="background-color:green;color:white">Edit</button>`;
        table.rows[i].cells[3].innerHTML = `<button style="background-color:red;color:white" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
    }

}
async function deleteRow(index) {
    console.log(index);
    let table=document.getElementById("table");
    let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/table/delete", {
                method: "DELETE",
                body: JSON.stringify({ firstName: table.rows[index].cells[0].innerHTML, lastName: table.rows[index].cells[1].innerHTML}),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();

        if (result.result == "good") {
            const name=(String(table.rows[index].cells[0].innerHTML)+"-"+String(table.rows[index].cells[1].innerHTML)).toLowerCase();
            console.log(name);
            delete userObj[name];
            table.deleteRow(index);
            
        }
        else{
            alert("please try again database error");
        }
   console.log(userObj);
}
async function add() {


    const table = document.getElementById("table");
    const fname = document.getElementById("firstName");
    const lname = document.getElementById("lastName");
    fname.value = fname.value.replace(/\s+/g, ' ').trim();
    lname.value = lname.value.replace(/\s+/g, ' ').trim();
    let name = (fname.value + "-" + lname.value).toLowerCase();
    console.log(name in userObj);
    
    if (fname.value == "" || lname.value == "") {
        alert("Please enter first name and last name")
        return 
    }
    
    if (name in userObj) {
        console.log("bad")
        alert("Firstname and lastname already exists");
        fname.value = "";
        lname.value = "";
    }
    else {
        let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/table/addNew", {
                method: "POST",
                body: JSON.stringify({ firstName: fname.value, lastName: lname.value }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();

        if (result.result == "good") {
            userObj[name] = 1
            console.log(result);
            console.log("successfully added in the database");

            console.log(fname.value, lname.value);







            let row = table.insertRow();
            let cell1 = row.insertCell();
            let text1 = document.createTextNode(fname.value);


            cell1.appendChild(text1);
            let cell2 = row.insertCell();
            let text2 = document.createTextNode(lname.value);

            cell1.style.backgroundColor = "silver";
            cell2.style.backgroundColor = "silver";
            cell1.style.border = "1px solid black";

            cell2.style.border = "1px solid black";

            cell2.appendChild(text2);

            let cell3 = row.insertCell();
            let edit = document.createElement("button");
            edit.innerHTML = "Edit";
            edit.className = "editButton";
            edit.onclick = () => { editRow(row.rowIndex) };
            edit.style.backgroundColor = "green";
            edit.style.color = "white";
            cell3.appendChild(edit);
            cell1.style.width = "40%";
            cell2.style.width = "40%";

            let cell4 = row.insertCell();
            let del = document.createElement("button");
            del.className = "deleteButton";
            del.innerHTML = "Delete";
            del.style.backgroundColor = "red";
            del.style.color = "white";

            del.onclick = () => { deleteRow(row.rowIndex) };
            cell4.appendChild(del);

            fname.value = "";
            lname.value = "";


        }
        else if (result.result == "exists") {
            alert("FirstName and LastName is already exists");
            fname.value = "";
            lname.value = "";
        }
        else {
            alert("Database or fetch request error");
            fname.value = "";
            lname.value = "";
        }

    }
    console.log(userObj);
}
async function renderData() {
    console.log("in");
    let resultJson;
    try {
        resultJson = await fetch("http://localhost:8080/table/renderData");
    }
    catch (err) {
        console.log(err);
    }

    let result = await resultJson.json();
    let name,res;
    for (let i = 0; i < result.length; i++) {
        name = (result[i].firstName + "-" + result[i].lastName).toLowerCase()
        if (userObj.hasOwnProperty(name)==false) {

            userObj[name] = 1;

            try {
                resultJson = await fetch("http://localhost:8080/table/addNew", {
                    method: "POST",
                    body: JSON.stringify({ firstName: result[i].firstName, lastName: result[i].lastName }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                });
            }
            catch (err) {
                console.log(err);
            }
            res = await resultJson.json();

            if (res.result == "good") {


                console.log("successfully added in the database");









                let row = table.insertRow();
                let cell1 = row.insertCell();
                let text1 = document.createTextNode(result[i].firstName);


                cell1.appendChild(text1);
                let cell2 = row.insertCell();
                let text2 = document.createTextNode(result[i].lastName);

                cell1.style.backgroundColor = "silver";
                cell2.style.backgroundColor = "silver";
                cell1.style.border = "1px solid black";

                cell2.style.border = "1px solid black";

                cell2.appendChild(text2);

                let cell3 = row.insertCell();
                let edit = document.createElement("button");
                edit.innerHTML = "Edit";
                edit.className = "editButton";
                edit.onclick = () => { editRow(row.rowIndex) };
                edit.style.backgroundColor = "green";
                edit.style.color = "white";
                cell3.appendChild(edit);
                cell1.style.width = "40%";
                cell2.style.width = "40%";

                let cell4 = row.insertCell();
                let del = document.createElement("button");
                del.className = "deleteButton";
                del.innerHTML = "Delete";
                del.style.backgroundColor = "red";
                del.style.color = "white";

                del.onclick = () => { deleteRow(row.rowIndex) };
                cell4.appendChild(del);


            }
            else if (res.result == "error" || res.result=="undefined") {
                alert("Database or fetch request error please render again....");


            }

        }

    }
    console.log(userObj);
}

async function getData() {
    console.log("in");
    let resultJson;
    try {
        resultJson = await fetch("http://localhost:8080/table/getData");
    }
    catch (err) {
        console.log(err);
    }

    const result = await resultJson.json();

    result.forEach(element => {
        userObj[(element.firstName + "-" + element.lastName).toLowerCase()] = 1;
        let row = table.insertRow();
        let cell1 = row.insertCell();
        let text1 = document.createTextNode(element.firstName);


        cell1.appendChild(text1);
        let cell2 = row.insertCell();
        let text2 = document.createTextNode(element.lastName);

        cell1.style.backgroundColor = "silver";
        cell2.style.backgroundColor = "silver";
        cell1.style.border = "1px solid black";

        cell2.style.border = "1px solid black";

        cell2.appendChild(text2);

        let cell3 = row.insertCell();
        let edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.className = "editButton";
        edit.onclick = () => { editRow(row.rowIndex) };
        edit.style.backgroundColor = "green";
        edit.style.color = "white";
        cell3.appendChild(edit);
        cell1.style.width = "40%";
        cell2.style.width = "40%";

        let cell4 = row.insertCell();
        let del = document.createElement("button");
        del.className = "deleteButton";
        del.innerHTML = "Delete";
        del.style.backgroundColor = "red";
        del.style.color = "white";

        del.onclick = () => { deleteRow(row.rowIndex) };
        cell4.appendChild(del);


    });



}