
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
            $("#list").append(`
            <li class id="${liIndex}">
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

        $('#list').on('change', '.check', (ev) => {
            let $target = $(ev.currentTarget);
            
            $target.closest('.listItem').addCllass("select")
        })

        $("#cleaner").on('click', function (e) {
            e.preventDefault();
            let ulItems = document.getElementById("list").getElementsByTagName("li");
            for(let i = 0; i < ulItems.length; ++i){
                toDoList.splice(-1, 1);
            }
            $(`#list`).empty();
            liIndex = 0;
        })
    });
}