
window.onload = function () {
    $(document).ready(function () {
        let toDoList = new Array();
        let activeItemsList = new Array();
        let complitedItemsList = new Array();

        let inputValue;
        let liIndex = 0;


        document.getElementById("toDoListInput").addEventListener("keydown", function (e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                // enter pressed
                inputValue = $("#toDoListInput").val();
                if (inputValue != "") {
                    toDoList.push({
                        value: inputValue,
                        checked: false,
                        id: liIndex,
                    });
                    console.log(toDoList);
                    e.preventDefault();
                    $('#list').empty();
                    if (document.querySelector(".selected").id == 'allItems') {
                        addItems(toDoList, document.querySelector(".selected").id);
                    }
                    else if (document.querySelector(".selected").id == 'activeItems') {
                        activeItemsList = toDoList.filter(item => item.checked == false);
                        addItems(activeItemsList, document.querySelector(".selected").id);
                    }
                    else {
                        complitedItemsList = toDoList.filter(item => item.checked == true);
                        addItems(complitedItemsList, document.querySelector(".selected").id);
                    }
                    liIndex++;
                    $("#toDoListInput").val(null);
                    document.querySelector(".icon").style["visibility"] = "visible";
                }
                else {
                    e.preventDefault();
                }
            }

        }, false);


        $("#filters li a").click(function (e) {
            e.preventDefault();
            if (this.id != "cleaner") {
                $("#filters li a").removeClass("selected");
                $(this).addClass("selected");
                $('#list').empty();
                if (this.id == 'allItems') {
                    addItems(toDoList, this.id);
                }
                else if (this.id == 'activeItems') {
                    activeItemsList = toDoList.filter(item => item.checked == false);
                    addItems(activeItemsList, this.id);
                }
                else {
                    complitedItemsList = toDoList.filter(item => item.checked == true);
                    addItems(complitedItemsList, this.id);
                }
            }
            else {
                e.preventDefault();
                $("#list .chosen").remove();
                toDoList = toDoList.filter(item => item.checked == false);
                console.log(toDoList);
                if (toDoList.length == 0) {
                    document.querySelector(".icon").style["visibility"] = "hidden";
                }
                if(toDoList.filter(item => item.checked == true).length == 0){
                    document.querySelector("#cleaner").style["visibility"] = "hidden";
                }
            }

        });

        function addItems(array, arrayType) {
            let liClass = "";
            if (arrayType == "allItems") {
                for (let i = 0; i < array.length; ++i) {
                    if (array[i].checked) {
                        liClass = "chosen";
                    }
                    else {
                        liClass = "";
                    }
                    $("#list").append(`
                        <li class="listItem ${liClass}" id="${array[i].id}">
                            <div class="row">
                                <div class="row">
                                    <input type="checkbox" class="check">
                                    <h4>${array[i].value}</h4>
                                </div>
                            </div>
                            <hr>
                        </li>
                    `);

                }
                document.querySelectorAll(".chosen .check").forEach((item) => item.checked = true);
                liClass = "";

            }
            else if (arrayType == "completedItems") {
                liClass = "chosen";
                for (let i = 0; i < array.length; ++i) {
                    $("#list").append(`
                        <li class="listItem ${liClass}" id="${array[i].id}">
                            <div class="row">
                                <div class="row">
                                    <input type="checkbox" class="check" checked>
                                    <h4>${array[i].value}</h4>
                                </div>
                            </div>
                            <hr>
                        </li>
                    `);
                }
                liClass = "";
            }
            else {
                for (let i = 0; i < array.length; ++i) {
                    $("#list").append(`
                    <li class="listItem ${liClass}" id="${array[i].id}">
                        <div class="row">
                            <div class="row">
                                <input type="checkbox" class="check">
                                <h4>${array[i].value}</h4>
                            </div>
                        </div>
                        <hr>
                    </li>
                `);
                    if (array[i].checked == true) {
                        document.querySelector('#list > li:last-child').checked = true;
                    }
                }
            }
        }

        $('#list').on('change', '.check', (ev) => {
            let $target = $(ev.currentTarget);

            if ($target.prop('checked') == true) {
                $target.closest('.listItem').addClass("chosen");
                let selectedID = $target.closest('.listItem').attr('id');
                toDoList.find(item => item.id == selectedID).checked = true;

                document.querySelector("#cleaner").style["visibility"] = "visible";
            }
            else {
                $target.closest('.listItem').removeClass("chosen");
                let selectedID = $target.closest('.listItem').attr('id');
                toDoList.find(item => item.id == selectedID).checked = false;
                if(toDoList.filter(item => item.checked == true).length == 0){
                    document.querySelector("#cleaner").style["visibility"] = "hidden";
                }
            }
            console.log(ev.currentTarget.checked);

        })

        $(".icon").click(function (e) {
            e.preventDefault();
            toDoList.forEach((item) => {
                item.checked = true;
            })
            $("#list").empty();
            addItems(toDoList, document.querySelector(".selected").id)
            document.querySelector("#cleaner").style["visibility"] = "visible";
        })

    });
}