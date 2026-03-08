let allIssues = [];

document.getElementById("all-btn").addEventListener("click",()=>{
    displayCard(allIssues);
})

document.getElementById("open-btn").addEventListener("click",()=>{
    const openCard = allIssues.filter(issue=> issue.status === "open");
    displayCard(openCard);
})

document.getElementById("closed-btn").addEventListener("click",()=>{
    const closedCard = allIssues.filter(issue=> issue.status === "closed");
    displayCard(closedCard);
})



let totalIssue = document.getElementById("total-issue");

const loadcard = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
        allIssues = json.data;
        displayCard(allIssues);
    });
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
        console.log(card);
        const cards = document.createElement("div");
        if(card.status == "open"){
            cards.innerHTML = `
            <div class="max-w-[256px] bg-white shadow-md p-4 rounded-md overflow-hidden border-t-4 border-[#00A96E] space-y-2">
            <div class="flex justify-between items-center">
                <img class="bg-[#00A96E] rounded-full" src="./assets/Open-Status.png" alt="">
                <span class="inline-block px-6 py-1 bg-[#FEECEC] text-[#EF4444] rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer">${card.priority}</span>
            </div>
            <h2 class="font-semibold text-sm text-black">${card.title}</h2>
            <p class="text-[12px] text-[#64748B]">${card.description}</p>
            <div class="flex flex-wrap items-center gap-1">
                <span class="inline-flex items-center w-fit whitespace-nowrap px-[20px] py-[6px] text-[#EF4444] bg-[#FECACA] rounded-full text-[12px] font-medium hover:bg-red-500 hover:text-white transition cursor-pointer"><i class="fa-solid fa-bug mr-1"></i>${card.labels[0] ? card.labels[0] : ""}</span>
                <span class="inline-flex items-center w-fit whitespace-nowrap py-[6px] px-[22px] text-[#D97706] bg-[#FDE68A] text-[12px] font-medium rounded-full hover:bg-yellow-600 hover:text-white transition cursor-pointer"><i class="fa-solid fa-life-ring mr-1"></i>${card.labels[1] ? card.labels[1] : ""}</span>
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
                <span class="inline-block px-6 py-1 bg-[#EEEFF2] text-[#9CA3AF] rounded-full hover:bg-green-600 hover:text-white transition cursor-pointer">${card.priority}</span>
            </div>
            <h2 class="font-semibold text-sm text-black">${card.title}</h2>
            <p class="text-[12px] text-[#64748B]">${card.description}p>
            <div class="flex flex-wrap items-center gap-1">
                <span class="inline-flex items-center w-fit whitespace-nowrap px-[20px] py-[6px] text-[#EF4444] bg-[#FECACA] rounded-full text-[12px] font-medium hover:bg-red-500 hover:text-white transition cursor-pointer"><i class="fa-solid fa-bug mr-1"></i>${card.labels[0] ? card.labels[0]: "" }</span>
                <span class="inline-flex items-center w-fit whitespace-nowrap py-[6px] px-[22px] text-[#D97706] bg-[#FDE68A] text-[12px] font-medium rounded-full hover:bg-yellow-600 hover:text-white transition cursor-pointer"><i class="fa-solid fa-life-ring mr-1"></i>${card.labels[1] ? card.labels[1]:""}</span>
            </div>
            <hr>
            <p class="text-[12px] text-[#64748B]">${card.author}</p>
            <p class="text-[12px] text-[#64748B]">${card.createdAt}</p>
        </div>
        `
        }
        
        cardContainer.append(cards);
    }}
}

loadcard();