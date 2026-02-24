let interviewList = [];
let rejectedlist = [];

const total = document.getElementById("totalcount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const allCardsSection = document.getElementById("all-cards");
const filterSection = document.getElementById("filter-section");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const jobIndicator = document.getElementById("job-indicator");

// count er jonno
function calculateCount() {
    total.innerText = allCardsSection.querySelectorAll('.card, .bg-white').length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedlist.length;
}

allCardsSection.addEventListener("click", function (event) {
    const cardElement = event.target.closest('.card, .bg-white');
    if (!cardElement) return;

    const skillName = cardElement.querySelector('.skillname').innerText;
    const skill = cardElement.querySelector('.skill').innerText;
    const details = cardElement.querySelector('.details').innerText;
    const notes = cardElement.querySelector('.notes').innerText;

    const statusBtn = cardElement.querySelector('.status-alert');

    // interview button click korle
    if (event.target.classList.contains("interview-btn")) {

        rejectedlist = rejectedlist.filter(item => item.skillName !== skillName);


        const isExist = interviewList.find(item => item.skillName === skillName);
        if (!isExist) {
            interviewList.push({ skillName, skill, details, notes, status: 'INTERVIEW' });
        }


        statusBtn.innerText = 'INTERVIEW';
        statusBtn.className = 'status-alert btn btn-sm md:btn-md btn-outline btn-success';

        calculateCount();
    }


    else if (event.target.classList.contains("rejected-btn")) {


        interviewList = interviewList.filter(item => item.skillName !== skillName);


        const isExist = rejectedlist.find(item => item.skillName === skillName);
        if (!isExist) {
            rejectedlist.push({ skillName, skill, details, notes, status: 'REJECTED' });
        }


        statusBtn.innerText = 'REJECTED';
        statusBtn.className = 'status-alert btn btn-sm md:btn-md btn-outline btn-error';

        calculateCount();
    }
    else if (event.target.closest('.text-red-500')) {

        interviewList = interviewList.filter(item => item.skillName !== skillName);
        rejectedlist = rejectedlist.filter(item => item.skillName !== skillName);


        cardElement.remove();

        calculateCount();
    }
});



function renderInterview() {
    filterSection.innerHTML = '';
    filterSection.className =
        'w-[95%] md:w-[90%] lg:w-[80%] mx-auto space-y-4 pt-4 pb-8';

    if (interviewList.length === 0) {
        renderEmptyState();
        return;
    }

    interviewList.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = createCardHTML(item);
        filterSection.appendChild(div.firstElementChild);
    });
}
function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedlist.length === 0) {
        renderEmptyState();
        return;
    }

    rejectedlist.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = createCardHTML(item);
        filterSection.appendChild(div.firstElementChild);
    });
}
// tab switch
function toggleStyle(id) {
    allFilterBtn.className = "btn btn-sm md:btn-md text-black";
    interviewFilterBtn.className = "btn btn-sm md:btn-md text-black";
    rejectedFilterBtn.className = "btn btn-sm md:btn-md text-black";

    const selected = document.getElementById(id);
    selected.classList.add('btn-primary', 'text-white');

    if (id === 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
        updateJobIndicator('interview');
    }

    else if (id === 'rejected-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
        updateJobIndicator('rejected');
    }

    else {
        allCardsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        updateJobIndicator('all');
    }
}


function renderEmptyState() {
    filterSection.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-center">
            <img src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png"
                 class="w-20 mb-4 opacity-80" />
            <h2 class="text-lg font-semibold text-gray-700">
                No jobs available
            </h2>
            <p class="text-sm text-gray-500">
                Check back soon for new job opportunities
            </p>
        </div>
    `;
}

function createCardHTML(data) {
    return `
    <div class="card bg-white p-4 md:p-6 shadow-lg rounded-xl">
        <div class="flex flex-col md:flex-row md:justify-between gap-4">
            <div class="space-y-3 md:space-y-4 flex-1">
                <div>
                    <h2 class="skillname font-bold text-lg md:text-xl">${data.skillName}</h2>
                    <p class="skill text-gray-600 text-sm md:text-base">${data.skill}</p>
                </div>

                <p class="details text-xs md:text-sm text-gray-500">
                    ${data.details}
                </p>

                <button class="status-alert btn btn-sm md:btn-md btn-outline
                    ${data.status === 'INTERVIEW' ? 'btn-success' : 'btn-error'}">
                    ${data.status}
                </button>

                <p class="notes text-sm md:text-base text-gray-600">
                    ${data.notes}
                </p>

                <div class="flex gap-2 pt-2">
                    <button class="interview-btn btn btn-sm btn-outline btn-success">
                        INTERVIEW
                    </button>
                    <button class="rejected-btn btn btn-sm btn-outline btn-error">
                        REJECTED
                    </button>
                </div>
            </div>

            <div>
                <button class="btn btn-ghost btn-sm text-red-500">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    </div>
    `;
}

function getTotalJobs() {
    return allCardsSection.querySelectorAll('.card, .bg-white').length;
}

function updateJobIndicator(type) {
    const totalJobs = getTotalJobs();

    if (type === 'all') {
        jobIndicator.innerText = `${totalJobs} Jobs`;
    }

    else if (type === 'interview') {
        jobIndicator.innerText = `${interviewList.length} of ${totalJobs} Jobs`;
    }

    else if (type === 'rejected') {
        jobIndicator.innerText = `${rejectedlist.length} of ${totalJobs} Jobs`;
    }
}

filterSection.addEventListener("click", function (event) {
    const cardElement = event.target.closest('.card');
    if (!cardElement) return;

    const skillName = cardElement.querySelector('.skillname').innerText;


    if (event.target.classList.contains("interview-btn")) {

        const mainCards = allCardsSection.querySelectorAll('.card, .bg-white');
        mainCards.forEach(card => {
            if (card.querySelector('.skillname').innerText === skillName) {
                card.querySelector(".interview-btn").click();
            }
        });

        renderRejected();
    }


    else if (event.target.classList.contains("rejected-btn")) {
        const mainCards = allCardsSection.querySelectorAll('.card, .bg-white');
        mainCards.forEach(card => {
            if (card.querySelector('.skillname').innerText === skillName) {
                card.querySelector(".rejected-btn").click();
            }
        });

        renderInterview();
    }

    else if (event.target.closest('.text-red-500')) {
        interviewList = interviewList.filter(item => item.skillName !== skillName);
        rejectedlist = rejectedlist.filter(item => item.skillName !== skillName);

        calculateCount();

        if (interviewFilterBtn.classList.contains('btn-primary')) renderInterview();
        else renderRejected();
    }
});

filterSection.addEventListener("click", function (event) {
    if (event.target.closest('.text-red-500')) {
        const cardElement = event.target.closest('.card');
        const skillName = cardElement.querySelector('.skillname').innerText;


        interviewList = interviewList.filter(item => item.skillName !== skillName);

        rejectedlist = rejectedlist.filter(item => item.skillName !== skillName);


        const mainCards = allCardsSection.querySelectorAll('.card, .bg-white');
        mainCards.forEach(card => {
            if (card.querySelector('.skillname').innerText === skillName) {
                const statusBtn = card.querySelector('.status-alert');
                statusBtn.innerText = 'Not Selected'; // আগের অবস্থায় ফিরিয়ে আনা
                statusBtn.className = 'status-alert btn btn-sm md:btn-md btn-outline';
            }
        });


        calculateCount();

        cardElement.remove();

        if (interviewFilterBtn.classList.contains('btn-primary')) {
            renderInterview();
        } else {
            renderRejected();
        }
    }
});
calculateCount();
