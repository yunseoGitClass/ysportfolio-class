const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector(".form-message");
const year = document.querySelector("#current-year");
const projectGrid = document.querySelector(".project-grid");
const projectDialog = document.querySelector("#project-dialog");
const dialogClose = projectDialog.querySelector(".dialog-close");
const projectDetails = {
  lumio: {
    name: "Lumio",
    description: "브랜드의 개성과 작업물을 선명하게 소개하는 크리에이티브 스튜디오 웹사이트입니다.",
    role: "화면 설계, 반응형 UI 개발, 페이지 애니메이션 구현",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    results: "가상의 사용성 테스트에서 주요 작업물 탐색 시간이 단축되었고, 문의 페이지 진입률이 높아졌습니다. (예시 성과)"
  },
  mori: {
    name: "Mori",
    description: "짧은 휴식과 기분을 매일 기록할 수 있도록 돕는 웰니스 앱입니다.",
    role: "사용자 흐름 설계, 주요 화면 UI 개발, 접근성 점검",
    technologies: ["React Native", "JavaScript", "Figma"],
    results: "가상의 베타 테스트에서 기록 완료율이 개선되고, 일주일 재방문율이 높아졌습니다. (예시 성과)"
  },
  ondoStudio: {
    name: "OndoStudio",
    description: "오래 사용할 수 있는 생활 소품을 소개하고 판매하는 온라인 스토어입니다.",
    role: "상품 목록 및 상세 화면 개발, 모바일 쇼핑 흐름 개선",
    technologies: ["HTML", "CSS", "JavaScript", "Shopify"],
    results: "가상의 개선 프로젝트에서 모바일 상품 탐색이 쉬워지고 장바구니 전환이 늘었습니다. (예시 성과)"
  }
};

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  formMessage.textContent = `${name}님, 메시지를 확인했습니다. 곧 답변드릴게요!`;
  contactForm.reset();
});

// 프로젝트 정보를 채우고 모달을 연 뒤 닫기 버튼으로 포커스를 이동합니다.
function openProjectDetails(card) {
  const project = projectDetails[card.dataset.project];
  if (!project) return;

  projectDialog.dataset.opener = card.dataset.project;
  projectDialog.querySelector("#project-dialog-title").textContent = project.name;
  projectDialog.querySelector("#project-description").textContent = project.description;
  projectDialog.querySelector("#project-role").textContent = project.role;
  projectDialog.querySelector("#project-results").textContent = project.results;

  const technologyList = projectDialog.querySelector("#project-technologies");
  technologyList.replaceChildren();
  const technologyTags = document.createElement("div");
  technologyTags.className = "technology-list";
  project.technologies.forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    technologyTags.append(tag);
  });
  technologyList.append(technologyTags);

  projectDialog.showModal();
  dialogClose.focus();
}

// 모달을 닫고 열었던 프로젝트 카드로 포커스를 돌려보냅니다.
function closeProjectDetails() {
  projectDialog.close();
}

projectDialog.addEventListener("close", () => {
  const opener = projectGrid.querySelector(`[data-project="${projectDialog.dataset.opener}"]`);
  opener?.focus();
});

projectGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card");
  if (card) openProjectDetails(card);
});

projectGrid.addEventListener("keydown", (event) => {
  const card = event.target.closest(".project-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openProjectDetails(card);
  }
});

dialogClose.addEventListener("click", closeProjectDetails);

projectDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeProjectDetails();
  }
});

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProjectDetails();
});

