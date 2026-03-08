const totalIssue = document.getElementById("total-issue");

const loadcard = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
}

const displayCard = (info) => {
    // console.log(info);
    const total = info.length;
    totalIssue.innerText = total;
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    

    for(let card of info){{
        console.log(card);
        const cards = document.createElement("div");
        cards.innerHTML = `
            <div class="max-w-[256px] bg-white shadow-md p-4 rounded-md overflow-hidden border-t-4 border-[#00A96E] space-y-2">
            <div class="flex justify-between items-center">
                <img class="bg-[#00A96E] rounded-full" src="./assets/Open-Status.png" alt="">
                <span class="inline-block px-6 py-1 bg-[#FEECEC] text-[#EF4444] rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer">High</span>
            </div>
            <h2 class="font-semibold text-sm text-black">Fix navigation menu on mobile devices</h2>
            <p class="text-[12px] text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
            <div>
                <span class="inline-block px-[20px] py-[6px] text-[#EF4444] bg-[#FECACA] rounded-full text-[12px] font-medium hover:bg-red-500 hover:text-white transition cursor-pointer"><i class="fa-solid fa-bug mr-1"></i>Bug</span>
                <span class="inline-block py-[6px] px-[22px] text-[#D97706] bg-[#FDE68A] text-[12px] font-medium rounded-full hover:bg-yellow-600 hover:text-white transition cursor-pointer"><i class="fa-solid fa-life-ring mr-1"></i>Help Wanted</span>
            </div>
            <hr>
            <p class="text-[12px] text-[#64748B]">#1 by john_doe</p>
            <p class="text-[12px] text-[#64748B]">1/15/2024</p>
        </div>
        `
        cardContainer.append(cards);
    }}
}

loadcard();