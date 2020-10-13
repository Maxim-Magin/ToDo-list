
window.onload = function () {
    $(document).ready(function () {
        let toDoList = new Array();
        let inputValue;
        let liIndex = 0;

        document.getElementById("toDoListInput").addEventListener("keydown", function (e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                // enter pressed
                readItem(e);
                addItem();
            }
        }, false);

        function readItem(e) {
            inputValue = $("#toDoListInput").val();
            toDoList.push(inputValue);
            console.log(toDoList);
            e.preventDefault();
            return false;
        }

        function addItem() {
            $("#list").append(`<li id="${liIndex}">
            <div class="row">
            <div class="row">
            <input type="checkbox">
            <h4>${inputValue}</h4>
            </div>
            <button class="destroy"></button>
            </div>
            <hr>
            </li>
            `);
            liIndex++;
        }

        $("#filters li a").click(function (e) {
            e.preventDefault();
            $("#filters li a").removeClass("selected");
            $(this).addClass("selected");
        });


        $("#list :checkbox").on('click', function(){
        });

        $("#cleaner").click(function (e) {
            e.preventDefault();
            let ul = document.getElementById("filters");
            let ulItems = ul.getElementsByTagName("li");
            for(let i = 0; i <= ulItems.length; ++i){
                $(`#${i}`).remove();
            }
        })
    });
}