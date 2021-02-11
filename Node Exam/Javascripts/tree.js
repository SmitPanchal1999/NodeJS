
async function addRoot() {
    let root = document.getElementById("root");
    root.value = root.value.replace(/\s+/g, ' ').trim();
    if (root.value == "") {
        alert("Please enter a tagname");
        return
    }
    else {
        let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/tree/addRoot", {
                method: "POST",
                body: JSON.stringify({ tagName: root.value }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();

        if (result.result == "error") {
            alert("Database error please try again");
            return
        }
        else {
            let tree = document.getElementById("tree");
            let li = document.createElement("LI");
            let span=document.createElement("SPAN");
            let textnode = document.createTextNode(root.value);
            li.id=String(result.result);
            li.className="0";
            span.appendChild(textnode);

            span.style.display="flex";
            span.innerHTML+=`<div class="dropdown">
            <button   type="button" class="btn btn-warning dropdown-toggle btn-small" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

  </button>
          
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
               <button class="dropdown-item hidden add" onclick="event.stopPropagation();showInput(this)">Add</button>
               <button class="dropdown-item hidden remove" onclick="event.stopPropagation();showInput(this)">Remove</button>
               <button class="dropdown-item hidden update" onclick="event.stopPropagation(); showInput(this)">Update</button>
             <button class="dropdown-item hidden move" onclick="event.stopPropagation(); showInput(this)">Move</button>
              <input onclick="event.stopPropagation();"  class="show main" type="text" style="display:none">
              <button style="display:none"  class="dropdown-item main addChild"  onclick="event.stopPropagation();addChild(this)">Add</button>
              <button style="display:none"  class="dropdown-item main removeChild"  onclick="event.stopPropagation();removeTags(this)">Write remove to remove this tag</button>
              <button style="display:none"  class="dropdown-item main updateChild" onclick="event.stopPropagation();updateTag(this)" >Update</button>
              <button style="display:none"  class="dropdown-item main moveChild" onclick="event.stopPropagation();moveChild(this)">Move(Write parent followed by '.' and poisition to move)</button>
              <button style="display:none" onclick="event.stopPropagation(); cancel(this.parentElement)"  class="dropdown-item main cancelButton">Cancel</button> 
            </div>
          </div>`;
            li.appendChild(span)
            tree.appendChild(li);
            root.value="";
            console.log(li);
        }
    }

}

function showInput(elem){
    
       let search="";
    if (elem.classList.contains("add")){
        search="addChild";
    }
    else if(elem.classList.contains("update")){
        search="updateChild";
    }
    else if(elem.classList.contains("move")){
        search="moveChild";
    }
    else{
        search="removeChild";
    }

    let div=elem.parentElement;
    let children=div.children;
    console.log(children);
    for(let i=0;i<children.length;i++){
        if (children[i].classList.contains("hidden")){
            children[i].style.display="none";
        }
        else if(children[i].classList.contains(search) || children[i].classList.contains("show") || children[i].classList.contains("cancelButton")){
            children[i].style.display="block"
        }
    }
    return;

}
async function addChild(elem){
    
    /* let id=elem.parentElement.parentElement.parentElement.parentElement.id;
    console.log(id); */
   let id=$(elem).closest("li").attr("id");
     console.log(id);
     
    let parentli=document.getElementById(id);
    let div=elem.parentElement;
    let children=div.children;
    console.log(children);
    let input;
    for(let i=0;i<children.length;i++){
        if (children[i].classList.contains("show") ){
            input=children[i];
            break;
        }
        
    }
    console.log(input);
    input.value = input.value.replace(/\s+/g, ' ').trim();
    if (input.value==""){
        alert("Can't add empty tag");
        cancel(div);
        return;
    }
    let order=String(Number(parentli.className)+1)
    let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/tree/addChild", {
                method: "POST",
                body: JSON.stringify({ tagName: input.value,parentId:String(id),order:order}),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();

        if (result.result == "error") {
            alert("Database error please try again");
            cancel(div);
            return;
        }
        else {
            const span=parentli.firstElementChild;
            console.log("firechild element");
            console.log(span);
          
            let ans=($(`#${id}`).has(".nested").length);
            if (ans){
               let li=document.createElement("LI");
               li.id=String(result.result);
               li.className=order;
               let span=document.createElement("SPAN");
               let textnode = document.createTextNode(input.value);
               span.appendChild(textnode);
               span.style.display="flex";
           span.innerHTML+=`<div class="dropdown">
           <button  type="button" class="btn btn-warning dropdown-toggle btn-small" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

 </button>
         
           <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <button class="dropdown-item hidden add" onclick="event.stopPropagation();showInput(this)">Add</button>
              <button class="dropdown-item hidden remove" onclick="event.stopPropagation();showInput(this)">Remove</button>
              <button class="dropdown-item hidden update" onclick="event.stopPropagation();showInput(this)">Update</button>
            <button class="dropdown-item hidden move" onclick="event.stopPropagation();showInput(this)">Move</button>
             <input class="show main" onclick="event.stopPropagation();" type="text" style="display:none">
             <button style="display:none"  class="dropdown-item main addChild"  onclick="event.stopPropagation();addChild(this)">Add</button>
             <button style="display:none"  class="dropdown-item main removeChild"  onclick="event.stopPropagation();removeTags(this)">Write remove to remove this tag</button>
             
             <button style="display:none"  class="dropdown-item main updateChild" onclick="event.stopPropagation();updateTag(this)" >Update</button>
             <button style="display:none"  class="dropdown-item main moveChild" onclick="event.stopPropagation();moveChild(this)">Move(Write parent followed by '.' and poisition to move)</button>
             <button style="display:none" onclick="event.stopPropagation();cancel(this.parentElement)"  class="dropdown-item main cancelButton">Cancel</button> 
           </div>
         </div>`;
               li.appendChild(span);
            
               $(`#${id} .nested`).first().append(li);

               input.value="";
               
               cancel(div);
               console.log(parentli);
              

               return;
            }
            else{
                let ul=document.createElement("UL");
                ul.classList.add("nested");
                let li=document.createElement("LI");
                li.id=String(result.result);
                li.className=order;
                let span=document.createElement("SPAN");
                let textnode = document.createTextNode(input.value);
                span.appendChild(textnode);
                span.style.display="flex";
            span.innerHTML+=`<div class="dropdown">
            <button  type="button" class="btn btn-warning dropdown-toggle btn-small" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

  </button>
          
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
               <button class="dropdown-item hidden add" onclick="event.stopPropagation();showInput(this)">Add</button>
               <button class="dropdown-item hidden remove" onclick="event.stopPropagation();showInput(this)">Remove</button>
               <button class="dropdown-item hidden update" onclick="event.stopPropagation();showInput(this)">Update</button>
             <button class="dropdown-item hidden move" onclick="event.stopPropagation();showInput(this)">Move</button>
              <input class="show main" onclick="event.stopPropagation();" type="text" style="display:none">
              <button style="display:none"  class="dropdown-item main addChild"  onclick="event.stopPropagation();addChild(this)">Add</button>
              <button style="display:none"  class="dropdown-item main removeChild"  onclick="event.stopPropagation();removeTags(this)">Write remove to remove this tag</button>
             
              <button style="display:none"  class="dropdown-item main updateChild" onclick="event.stopPropagation();updateTag(this)"  >Update</button>
              <button style="display:none"  class="dropdown-item main moveChild" onclick="event.stopPropagation();moveChild(this)">Move(Write parent followed by '.' and poisition to move)</button>
              <button style="display:none" onclick="event.stopPropagation();cancel(this.parentElement)"  class="dropdown-item main cancelButton">Cancel</button> 
            </div>
          </div>`;
                li.appendChild(span);
                ul.appendChild(li);
                parentli.appendChild(ul);
                console.log(parentli);
                input.value="";
                cancel(div);
               
                return;
            }
            
        } 
        


}
function cancel(elem){
    
    let children=elem.children;
    for(let i=0;i<children.length;i++){
        if (children[i].classList.contains("main") ){
            children[i].style.display="none";
        }
        else{
            children[i].style.display="block";
        }
        
    }
   
  
  
}
async function removeTags(elem){
    let div=elem.parentElement;
    let children=div.children;
    let input;
    for(let i=0;i<children.length;i++){
        if (children[i].classList.contains("show") ){
            input=children[i];
            break;
        }
        
    }
    console.log(input);
    input.value = input.value.replace(/\s+/g, ' ').trim();

    if (input.value==""){
        
        cancel(div);
        return;
    }
    else if(input.value=="remove"){

    
   let id=$(elem).closest("li").attr("id");
   let parentli=document.getElementById(id);
   let resultJson;
   try {
       resultJson = await fetch("http://localhost:8080/tree/removeChild", {
           method: "DELETE",
           body: JSON.stringify({ parentId:String(id)}),
           headers: { "Content-type": "application/json; charset=UTF-8" }
       });
   }
   catch (err) {
       console.log(err);
   }
   const result = await resultJson.json();

   if (result.result == "error") {
       alert("Database internal error please try again");
       cancel(div);
       return ;
   }
   else{

    parentli.querySelectorAll('*').forEach(n => n.remove());
    parentli.remove();
    
   }
}
else{
    alert("please write remove to remove a tag");
    cancel(div);
}

}
async function moveChild(elem){
    let div=elem.parentElement;
    let children=div.children;
    let input;
    for(let i=0;i<children.length;i++){
        if (children[i].classList.contains("show") ){
            input=children[i];
            break;
        }
        
    }
    console.log(input);
    input.value = input.value.replace(/\s+/g, ' ').trim();

    if (input.value==""){
        
        cancel(div);
        return;
    }
    else{
        let tags=input.value.split(".");

        if (tags.length!=2 || isFinite(tags[1])==false || !tags[0].match(/[a-z]/i)){
            alert("Please enter appropriate tagname and position");
            cancel(div);
            return
        }
        let id=$(elem).closest("li").attr("id");
        let parentli=document.getElementById(id);
        let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/tree/moveChild", {
                method: "PUT",
                body: JSON.stringify({ parentId:String(id),tagName:input.value}),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();
     
        if(result.result=="good"){
            window.location.reload();
        }
      
         
        
        else if(result.result=="error"){
            alert("Error moving please try again");
            cancel(div);
        }
        else if(result.result=="bad"){
            alert("Please enter appropriate tagname and position and you can't add to its children..");
            cancel(div);
        }
        else if(result.result=="notFound"){
            alert("Not found please enter appropriate tagname and position");
            cancel(div);
        }
    }
}
async function updateTag(elem){
    let div=elem.parentElement;
    let children=div.children;
    let input;
    for(let i=0;i<children.length;i++){
        if (children[i].classList.contains("show") ){
            input=children[i];
            break;
        }
        
    }
    console.log(input);
    input.value = input.value.replace(/\s+/g, ' ').trim();

    if (input.value==""){
        
        cancel(div);
        return;
    }
    else{
        let id=$(elem).closest("li").attr("id");
        let parentli=document.getElementById(id);
        let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/tree/updateChild", {
                method: "PUT",
                body: JSON.stringify({ parentId:String(id),tagName:input.value}),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();
     
        if (result.result == "error") {
            alert("Database internal error please try again");
            cancel(div);
            return ;
        }
        else{
            const span=parentli.firstElementChild;
            console.log(span);
            console.log(span.firstChild);
            span.firstChild.textContent=input.value;
            input.value="";
          cancel(div);
        }
    }

}
async function getTree(){
    let resultJson;
        try {
            resultJson = await fetch("http://localhost:8080/tree/getAll", {
                method: "GET"
            });
        }
        catch (err) {
            console.log(err);
        }
        const result = await resultJson.json();
        if (result.length>=1){
            console.log(result);
            let orders=[];
            let maxOrder=-1;
            for (let i=0;i<result.length;i++){
               if(Number(result[i].order)>maxOrder){
                   maxOrder=Number(result[i].order);
                    
               }
            }
            for (let i=0;i<maxOrder+1;i++){
                orders[i]=[]
            }
            for (let i=0;i<result.length;i++){
                orders[Number(result[i].order)].push(result[i]);
            }
            for(let i=0;i<orders[0].length;i++){

            
            let tree = document.getElementById("tree");
            let li = document.createElement("LI");
            let span=document.createElement("SPAN");
            let textnode = document.createTextNode(orders[0][i].tagName);
            li.id=String(orders[0][i]._id);
            li.className="0";
            span.appendChild(textnode);

            span.style.display="flex";
            span.innerHTML+=`<div class="dropdown">
            <button   type="button" class="btn btn-warning dropdown-toggle btn-small" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

  </button>
          
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
               <button class="dropdown-item hidden add" onclick="event.stopPropagation();showInput(this)">Add</button>
               <button class="dropdown-item hidden remove" onclick="event.stopPropagation();showInput(this)">Remove</button>
               <button class="dropdown-item hidden update" onclick="event.stopPropagation(); showInput(this)">Update</button>
             <button class="dropdown-item hidden move" onclick="event.stopPropagation(); showInput(this)">Move</button>
              <input onclick="event.stopPropagation();"  class="show main" type="text" style="display:none">
              <button style="display:none"  class="dropdown-item main addChild"  onclick="event.stopPropagation();addChild(this)">Add</button>
              <button style="display:none"  class="dropdown-item main removeChild"  onclick="event.stopPropagation();removeTags(this)">Write remove to remove this tag</button>
              <button style="display:none"  class="dropdown-item main updateChild" onclick="event.stopPropagation();updateTag(this)" >Update</button>
              <button style="display:none"  class="dropdown-item main moveChild" onclick="event.stopPropagation();moveChild(this)">Move(Write parent followed by '.' and poisition to move)</button>
              <button style="display:none" onclick="event.stopPropagation(); cancel(this.parentElement)"  class="dropdown-item main cancelButton">Cancel</button> 
            </div>
          </div>`;
            li.appendChild(span)
            tree.appendChild(li);
            
            }
            for(let i=1;i<orders.length;i++){
                for(let j=0;j<orders[i].length;j++){
                    console.log(orders[i][j]);
                    addForRender(String(orders[i][j]._id),orders[i][j].order,orders[i][j].tagName,orders[i][j].parentId);
                }
            }
        }
}
function addForRender(id,order,tagname,parentId){
    
    /* let id=elem.parentElement.parentElement.parentElement.parentElement.id;
    console.log(id); */
   let parentli=document.getElementById(parentId);
    
   
             const span=parentli.firstElementChild;
            console.log("firechild element");
            console.log(span);
          
            let ans=($(`#${id}`).has(".nested").length);
            if (ans){
               let li=document.createElement("LI");
               li.id=id;
               li.className=order;
               let span=document.createElement("SPAN");
               let textnode = document.createTextNode(tagname);
               span.appendChild(textnode);
               span.style.display="flex";
           span.innerHTML+=`<div class="dropdown">
           <button  type="button" class="btn btn-warning dropdown-toggle btn-small" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

 </button>
         
           <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <button class="dropdown-item hidden add" onclick="event.stopPropagation();showInput(this)">Add</button>
              <button class="dropdown-item hidden remove" onclick="event.stopPropagation();showInput(this)">Remove</button>
              <button class="dropdown-item hidden update" onclick="event.stopPropagation();showInput(this)">Update</button>
            <button class="dropdown-item hidden move" onclick="event.stopPropagation();showInput(this)">Move</button>
             <input class="show main" onclick="event.stopPropagation();" type="text" style="display:none">
             <button style="display:none"  class="dropdown-item main addChild"  onclick="event.stopPropagation();addChild(this)">Add</button>
             <button style="display:none"  class="dropdown-item main removeChild"  onclick="event.stopPropagation();removeTags(this)">Write remove to remove this tag</button>
             
             <button style="display:none"  class="dropdown-item main updateChild" onclick="event.stopPropagation();updateTag(this)" >Update</button>
             <button style="display:none"  class="dropdown-item main moveChild" onclick="event.stopPropagation();moveChild(this)" >Move(Write parent followed by '.' and poisition to move)</button>
             <button style="display:none" onclick="event.stopPropagation();cancel(this.parentElement)"  class="dropdown-item main cancelButton">Cancel</button> 
           </div>
         </div>`;
               li.appendChild(span);
            
               $(`#${id} .nested`).first().append(li);

              
               
           
               console.log(parentli);
              

               return;
            }
            else{
                let ul=document.createElement("UL");
                ul.classList.add("nested");
                let li=document.createElement("LI");
                li.id=id;
                li.className=order;
                let span=document.createElement("SPAN");
                let textnode = document.createTextNode(tagname);
                span.appendChild(textnode);
                span.style.display="flex";
            span.innerHTML+=`<div class="dropdown">
            <button  type="button" class="btn btn-warning dropdown-toggle btn-small" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

  </button>
          
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
               <button class="dropdown-item hidden add" onclick="event.stopPropagation();showInput(this)">Add</button>
               <button class="dropdown-item hidden remove" onclick="event.stopPropagation();showInput(this)">Remove</button>
               <button class="dropdown-item hidden update" onclick="event.stopPropagation();showInput(this)">Update</button>
             <button class="dropdown-item hidden move" onclick="event.stopPropagation();showInput(this)">Move</button>
              <input class="show main" onclick="event.stopPropagation();" type="text" style="display:none">
              <button style="display:none"  class="dropdown-item main addChild"  onclick="event.stopPropagation();addChild(this)">Add</button>
              <button style="display:none"  class="dropdown-item main removeChild"  onclick="event.stopPropagation();removeTags(this)">Write remove to remove this tag</button>
             
              <button style="display:none"  class="dropdown-item main updateChild" onclick="event.stopPropagation();updateTag(this)"  >Update</button>
              <button style="display:none"  class="dropdown-item main moveChild" onclick="event.stopPropagation();moveChild(this)">Move(Write parent followed by '.' and poisition to move)</button>
              <button style="display:none" onclick="event.stopPropagation();cancel(this.parentElement)"  class="dropdown-item main cancelButton">Cancel</button> 
            </div>
          </div>`;
                li.appendChild(span);
                ul.appendChild(li);
                parentli.appendChild(ul);
               
               
            
            }
            
        
        


}