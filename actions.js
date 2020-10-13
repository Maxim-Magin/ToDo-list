
window.onload = function () {
    $(document).ready(function () {
        let toDoList = new Array();
        let inputValue;
        let liIndex = 0;

        document.getElementById("toDoListInput").addEventListener("keydown", function (e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                // enter pressed
                inputValue= $("#toDoListInput").val();
                if(inputValue != "")
                {
                    toDoList.push(inputValue);
                    console.log(toDoList);
                    e.preventDefault();
                    addItem();
                    $("#toDoListInput").val(null);
                } 
                else{
                    e.preventDefault();
                }
            }
        }, false);

        function addItem() {
            $("#list").append(`<li class="listItem" id="${liIndex}">
            <div class="row">
            <div class="row">
            <input type="checkbox" class="check">
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

        $('input[type="checkbox"]').change(function() {
            if(this.checked) {
                $(this.li).addClass("selected");
            }
            else{
                $(this.li).removeClass("selected");
            }
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