// api to data load
const loadPost = async (searchBars = ' ') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchBars}`);
    const data = await res.json();
   
    // api data loop 
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = " ";

    data.posts.forEach(post => {
        const postContaine = document.createElement('div');
        postContaine.classList = `lg:w-[770px] w-[370px] mx-auto my-10 space-y-5 bg-[#f1f2ff] rounded-lg p-5`;
        postContaine.innerHTML = `
        <div class="flex items-center lg:gap-5 gap-2 text-sm font-bold relative">
                        <div class="border-2 p-1 rounded-[50px]">
                            <img src="${post.image}" alt="" class="w-[70px] h-[70px] rounded-[50px]">
                        </div>
                        <div class=" absolute top-2 left-[65px]">
                            <h5 class="${post.isActive?"bg-green-500 rounded-[50px] w-5 h-5" : "bg-red-500 rounded-[50px] w-5 h-5"}"></h5>
                        </div>
                        <p># <span>${post.category}</span></p>
                        <p>Author : <span> ${post.author.name}</span></p>
                    </div>
                    <div class="space-y-2 lg:ml-[100px]">
                        <h4 class="text-lg font-semibold">${post.title}</h4>
                        <p class="text-base">${post.description}</p>
                    </div>
                    <hr class="border-dashed lg:ml-[100px] bg-gray-500">
                    <div class="flex lg:justify-between justify-around items-center lg:ml-[100px]">
                        <div class="flex items-center lg:gap-8 gap-5">
                            <p><span><i class="fa fa-comment"></i></span> ${post.comment_count}</p>
                            <p><span><i class="fa fa-eye"></i></span> ${post.view_count}</p>
                            <p><span><i class="fa fa-hourglass-start"></i></span> ${post.posted_time} min</p>
                        </div>
                        <div>
                            <button onclick="markAsRead('${post.title.replace(/'/g, '')}', ${post.view_count})" class="fa fa-envelope bg-green-500 text-white w-[30px] h-[30px] rounded-[25px]"></button>
                        </div>
                    </div>
        `
        postContainer.appendChild(postContaine);
        // console.log(post);

          // loader spinner 
        const loader = document.getElementById('spinnercontainer');
        const cardContainer = document.getElementById('card-container');
        cardContainer.classList.add("hidden");
        loader.classList.remove("hidden");
        setTimeout(function () {
            cardContainer.classList.remove("hidden");
            loader.classList.add("hidden");
        }, 2000)
    });

}

// Title Mark as read
let count = 0;
const container = document.getElementById('container');
const markAsRead = (title, viwe) => {
    const count1 = count = count + 1;
    document.getElementById('counts').innerText = count1;
    const title1 = title;
    const viwe1 = viwe;
    const div1 = document.createElement('div');
    div1.classList = `flex justify-between items-center bg-white rounded-lg p-2 my-2`;
    div1.innerHTML = `
    <h4 class="text-lg font-semibold">${title1}</h4>
     <p class="flex gap-2"><span><i class="fa fa-eye"></i></span> ${viwe1}</p>
    `
    container.appendChild(div1);
    // console.log(title1 + 1, viwe1, count1)
}


// search button 
const search = () => {
    const searchBars = document.getElementById('inputfild');
    const searchValue = searchBars.value;
    loadPost(searchValue);
}

// Latest Posts load 
const loadLatestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    
    // api data loop 
    const latestContainer = document.getElementById('Latest-container');
    data.forEach(post => {
        const latestPost = document.createElement('div');
        latestPost.classList = `lg:w-[375px] h-[480px] mx-auto p-5 rounded-lg  border-2`;
        latestPost.innerHTML = `
        <img class="w-[325px] h-[190px] mx-auto" src="${post.cover_image}" alt="">
        <div class="space-y-2 my-2">
           <p><span> <i class="fa fa-calendar-days"></i></span> ${post.author.posted_date?post.author.posted_date:"No publish date"}</p>
           <h4 class="text-xl font-semibold">${post.title}</h4>
           <p class="text-base">${post.description}</p>
        </div>
        <div class="flex items-center gap-5 my-2">
            <div class=""><img class="w-[7opx] h-[70px] rounded-[50px]" src="${post.profile_image}" alt=""></div>
            <div class="space-y-1">
                <h4 class="text-lg font-bold">${post.author.name}</h4>
                <p class="text-base">${post.author.designation?post.author.designation:"Unknown"}</p>
            </div>
        </div>
        `
        latestContainer.appendChild(latestPost);
        // console.log(post);
    })
}

loadLatestPost();
loadPost();