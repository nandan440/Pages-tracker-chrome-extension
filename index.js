// chrome://extentions/
let myLeads=[]
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const inputBtn=document.getElementById("input-btn")
const deleteBtn=document.getElementById("delete-btn")
const leadsFromLocalStorage=JSON.parse( localStorage.getItem("myLeads"))
const tabBtn=document.getElementById("save-btn")
if(leadsFromLocalStorage)
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads)
})


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
   myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
   render(myLeads)
    
});
   
})
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
   
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })
    
function render(leads){
    let listItems=""
for(let i=0;i<leads.length;i++)
  {
   listItems+=`<li> 
                       <a target='_black' href='${leads[i]}'>
                                  ${leads[i]}
                       </a>
              </li> `          
   }
   ulEl.innerHTML=listItems
}
