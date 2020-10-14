
window.onload = function () {
    $(document).ready(function () {
        let toDoList = new Array();

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
                    e.preventDefault();

                    $('#list').empty();

                    let itemsList = toDoList;
                    if (document.querySelector(".selected").id == 'activeItems') {
                        itemsList = toDoList.filter(item => item.checked == false);
                    }
                    else if (document.querySelector(".selected").id == 'completedItems') {
                        itemsList = toDoList.filter(item => item.checked == true);
                    }
                    displayItems(itemsList, document.querySelector(".selected").id);

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

                let itemsList = toDoList;
                if (document.querySelector(".selected").id == 'activeItems') {
                    itemsList = toDoList.filter(item => item.checked == false);
                }
                else if (document.querySelector(".selected").id == 'completedItems') {
                    itemsList = toDoList.filter(item => item.checked == true);
                }
                displayItems(itemsList, document.querySelector(".selected").id);
            }
            else {
                e.preventDefault();

                $("#list .chosen").remove();

                toDoList = toDoList.filter(item => item.checked == false);

                if (toDoList.length == 0) {
                    document.querySelector(".icon").style["visibility"] = "hidden";
                }
                else if (toDoList.filter(item => item.checked == true).length == 0) {
                    document.querySelector("#cleaner").style["visibility"] = "hidden";
                }
            }

        });

        function addItem(liClass, item){
            $("#list").append(`
                        <li class="listItem ${liClass}" id="${item.id}">
                            <div class="row">
                                <div class="row">
                                    <input type="checkbox" class="check" id="${item.id}check">
                                    <label for="${item.id}check"></label>
                                    <h4>${item.value}</h4>
                                </div>
                            </div>
                            <hr>
                        </li>
                    `);
        }

        function displayItems(array, arrayType) {
            let liClass = "";
            if (arrayType == "allItems") {
                for (let i = 0; i < array.length; ++i) {
                    if (array[i].checked) {
                        liClass = "chosen";
                    }
                    else {
                        liClass = "";
                    }
                    addItem(liClass, array[i])

                }
                document.querySelectorAll(".chosen .check").forEach((item) => item.checked = true);
                liClass = "";

            }
            else if (arrayType == "completedItems") {
                liClass = "chosen";
                for (let i = 0; i < array.length; ++i) {
                    addItem(liClass, array[i])
                }
                document.querySelectorAll(".chosen .check").forEach((item) => item.checked = true);
                liClass = "";
            }
            else {
                for (let i = 0; i < array.length; ++i) {
                    addItem(liClass, array[i])
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
                
                if (toDoList.filter(item => item.checked == true).length == 0) {
                    document.querySelector("#cleaner").style["visibility"] = "hidden";
                }
            }
        })

        $(".icon").click(function (e) {
            e.preventDefault();
            toDoList.forEach((item) => {
                item.checked = true;
            })
            $("#list").empty();
            displayItems(toDoList, document.querySelector(".selected").id)
            document.querySelector("#cleaner").style["visibility"] = "visible";
        })

    });
}