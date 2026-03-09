const createElement = (arr) => {
    const htmlElement = arr.map((el)=> `<span class="btn bg-[#FECACA]">${el}</span>`);
    return htmlElement.join(" ");
}

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");

    }else{
        document.getElementById("card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

let allIssues = [];

document.getElementById("all-btn").addEventListener("click",()=>{
    removeActive();
    const allBtn = document.getElementById("all-btn");
    allBtn.classList.add("active");
    displayCard(allIssues);
})

document.getElementById("open-btn").addEventListener("click",()=>{
    removeActive();
    const openBtn = document.getElementById("open-btn");
    openBtn.classList.add("active");
    const openCard = allIssues.filter(issue=> issue.status === "open");
    displayCard(openCard);
    
})

document.getElementById("closed-btn").addEventListener("click",()=>{
    removeActive();
    const closedBtn = document.getElementById("closed-btn");
    closedBtn.classList.add("active");
    const closedCard = allIssues.filter(issue=> issue.status === "closed");
    displayCard(closedCard);
})

const removeActive = () =>{
    const removeAll = document.getElementById("all-btn");
    const removeOpen = document.getElementById("open-btn");
    const removeClosed = document.getElementById("closed-btn");

    removeAll.classList.remove("active");
    removeOpen.classList.remove("active");
    removeClosed.classList.remove("active");

    removeAll.classList.remove("btn-primary");
}

let totalIssue = document.getElementById("total-issue");

const loadcard = () => {
    manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
        allIssues = json.data;
        displayCard(allIssues);
    });
}

const loadIssueDetails= async(id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetails(details.data);
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const displayIssueDetails=(word)=>{
    // console.log(word);
    const detailsIssue = document.getElementById("issue-details");
    detailsIssue.innerHTML = `
        <div>
                    <h2 class="font-bold text-2xl text-black mb-2">${word.title}</h2>
                    <div class="flex items-center gap-2 mb-6">
                        <span class="px-2 py-[6px] bg-[#00A96E] text-white rounded-full hover:cursor-pointer">${word.status}</span>
                        <span class="inline-block px-[4px] py-[4px] rounded-full bg-gray-400"></span>
                        <p class="text-[#64748B] text-[12px]">Opened by ${word.assignee}</p>
                        <span class="inline-block px-[4px] py-[4px] rounded-full bg-gray-400"></span>
                        <p class="text-[#64748B] text-[12px]">22/02/2026</p>
                    </div>
                    <div class="mb-6">
                        <div>${createElement(word.labels)}</div>
                    </div>
                    <p class="m-6 text-base text-[#64748B]">${word.description}</p>
                    <div class="flex gap-2 justify-evenly items-center max-w-[636px] bg-gray-100 p-4">
                        <p><span class="text-[#64748B] text-base">Assignee</span>: <span class="text-black font-semibold">${word.assignee}</span></p>
                        <div>
                            <span>Priority:</span><br>
                        <span class="btn bg-[#EF4444] text-white text-[12px] font-medium">${word.priority}</span>
                        </div>
                    </div>
                </div>
    
    `
    document.getElementById("issue_modal").showModal();
}

const displayCard = (info) => {
    // console.log(info);
    const total = info.length;
    totalIssue.innerText = total;
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    
    // {
    //   "id": 1,
    //   "title": "Fix navigation menu on mobile devices",
    //   "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    //   "status": "open",
    //   "labels": [
    //     "bug",
    //     "help wanted"
    //   ],
    //   "priority": "high",
    //   "author": "john_doe",
    //   "assignee": "jane_smith",
    //   "createdAt": "2024-01-15T10:30:00Z",
    //   "updatedAt": "2024-01-15T10:30:00Z"
    // },

    for(let card of info){{
        // console.log(card);
        const cards = document.createElement("div");
        if(card.status == "open"){
            cards.innerHTML = `
            <div class="max-w-[256px] bg-white shadow-md p-4 rounded-md overflow-hidden border-t-4 border-[#00A96E] space-y-2">
            <div class="flex justify-between items-center">
                <img class="bg-[#00A96E] rounded-full" src="./assets/Open-Status.png" alt="">
                <span onclick="loadIssueDetails(${card.id})" class="inline-block px-6 py-1 bg-[#FEECEC] text-[#EF4444] rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer">${card.priority}</span>
            </div>
            <h2 class="font-semibold text-sm text-black">${card.title}</h2>
            <p class="text-[12px] text-[#64748B]">${card.description}</p>
            <div class="flex flex-wrap items-center gap-1">
                <div>${createElement(card.labels)}</div>
            </div>
            <hr>
            <p class="text-[12px] text-[#64748B]">${card.author}</p>
            <p class="text-[12px] text-[#64748B]">${card.createdAt}</p>
        </div>
        `
        }else{
            cards.innerHTML = `
            <div class="max-w-[256px] bg-white shadow-md p-4 rounded-md overflow-hidden border-t-4 border-[#A855F7] space-y-2">
            <div class="flex justify-between items-center">
                <img class="bg-[#00A96E] rounded-full" src="./assets/Closed-Status.png" alt="">
                <span onclick="loadIssueDetails(${card.id})" class="inline-block px-6 py-1 bg-[#EEEFF2] text-[#9CA3AF] rounded-full hover:bg-green-600 hover:text-white transition cursor-pointer">${card.priority}</span>
            </div>
            <h2 class="font-semibold text-sm text-black">${card.title}</h2>
            <p class="text-[12px] text-[#64748B]">${card.description}p>
            <div class="flex flex-wrap items-center gap-1">
                <div>${createElement(card.labels)}</div>
            </div>
            <hr>
            <p class="text-[12px] text-[#64748B]">${card.author}</p>
            <p class="text-[12px] text-[#64748B]">${card.createdAt}</p>
        </div>
        `
        }
        
        cardContainer.append(cards);
    }}
    manageSpinner(false)
}

loadcard();