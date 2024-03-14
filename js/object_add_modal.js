const modal = document.querySelector('.object_modal');
const btnOpenModal=document.querySelector('.btn-open-modal');

btnOpenModal.addEventListener("click", ()=>{
    modal.style.display="flex";
});

const exModal = document.querySelector('.exit_object_modal');
exModal.addEventListener("click", () => {
    // 창 닫기
})