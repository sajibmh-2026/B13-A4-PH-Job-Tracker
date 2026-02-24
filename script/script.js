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
