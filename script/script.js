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