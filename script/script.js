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