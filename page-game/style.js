// tạo cái mảng chứa các id và value từ đó dò ra được index
const VALUES = [
    { id: "scissors", value: "✌🏽" },
    { id: "rock", value: "✊🏽" },
    { id: "paper", value: "🖐🏽" },
];

//dom vào computer
let computer = document.querySelector("#computer");
//tạo hàm giúp cho computer lặp lại
let i = 0;
const handleChange = () => {
    computer.innerHTML = VALUES[i].value;
    computer.setAttribute("data-id", VALUES[i].id);
    //nếu i tới 2 thì dừng lại, còn không thì cứ tăng i
    i = i == VALUES.length - 1 ? 0 : ++i;
    //++i là tăng rồi mới lấy chứ i++ là lấy lại giá trị cũ 
};

let interval = setInterval(handleChange, 100);
//phải có cái biến thì mới có thể dừng vòng lặp lại

//hàm compare() để biết ai thắng ai thua

let compare = (valuePlayer, valueComputer) => {
    //dò index của từng thằng dựa vào value
    let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);

    //dò index của computer
    let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);

    //cầm biến này để biết được ai thắng | thua | hòa
    let result = indexPlayer - indexComputer;
    // so sánh các trường hợp có thể xảy ra
    // result = 1 || -2 thì thắng
    // result = 0 thì hòa
    // result còn lại thì thua
    if ([1, -2].includes(result)) {
        return 1;
    } else if ([0].includes(result)) {
        return 0;
    } else {
        return -1;
    };
};

//dom tới các cái nút
let btnList = document.querySelectorAll(".user");

//duyệt qua và kêu các cái nút đợi có sự kiện diễn ra

btnList.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        //dừng vòng lặp computer
        clearInterval(interval);

        //đi qua từng cái nút xóa actived đồng thời xóa khả năng click của nó
        btnList.forEach((_btn) => {
            _btn.classList.remove("actived");
            _btn.style.pointerEvents = "none";
        });
        //thêm actived cho cái nút mới vừa bấm
        event.target.classList.add("actived");

        //hứng value của computer và player
        let valuePlayer = event.target.id;
        //dom tới computer
        let computer = document.querySelector("#computer");
        //lấy data-id của computer
        let valueComputer = computer.dataset.id;
        
        //hiển thị kết quả thông báo 
        let result = compare(valuePlayer, valueComputer);

        //dom tới notification
        let notification = document.querySelector(".notification");

        //tạo ra cái thông báo để nhét vào notification
        let alert = document.createElement("div");
        alert.classList.add("alert");
        let msg = "";
        if(result == 1){
            msg = "Bạn thắng rồi";
            alert.classList.add("alert-success");
        }else if(result == 0){
            msg = "Bạn hòa rồi";
            alert.classList.add("alert-warning");
        }else{
            msg = "Bạn thua rồi";
            alert.classList.add("alert-dark");
        };
        //nhét msg vào alert
        alert.textContent = msg;
        //nhét alert vào lại notification
        notification.appendChild(alert);

        //hiển thị lại nút chơi lại
        //dom tới nó
        let playAgain = document.querySelector(".play-again");
        playAgain.classList.remove("d-none");
    });
});

//dom tới nút chơi lại
let playAgain = document.querySelector(".play-again");
//cho nút đó đợi sự kiện
playAgain.addEventListener("click", (event) => {
    //mở vòng lặp computer sau cho mất hiện tượng lặp lại
    clearInterval(interval);
    interval = setInterval(handleChange, 100);

    //xóa trạng thái actived và mở lại trạng thái click cho mấy cái nút
    btnList.forEach((_btn) => {
        _btn.classList.remove("actived");
        _btn.style.pointerEvents = "";
    });

    //tắt thông báo
    let notification = document.querySelector(".notification");
    notification.innerHTML = "";

    //mở lại nút chơi lại
    let btnAgain = document.querySelector("#btn-play-again");
    playAgain.classList.add("d-none");
});


