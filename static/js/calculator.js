let total = 0;
let lastNum = 0;
let overwrite = true;
let useLast = true;
let animating = false;

function printOutput(colour, value, symbol, format) {
    $("#output table tbody").append(`
        <tr class="${colour}">
            <td id="animating"></td>
            <td>${symbol}</td>
        </tr>
    `);

    if (!format) {
        let pounds = value.split(".")[0];
        let overflow = pounds.length % 3;
        let sorted = "";
        for (let i = 0; i < overflow; i++) {
            sorted += pounds[i];
        }
        for (let i = overflow; i < pounds.length; i++) {
            console.log(i, overflow)
            if (i - overflow % 3 === 0) {
                sorted += ",";
            }    
            sorted += pounds[i];
        }
        value = [sorted, value.split(".")[1]].join(".");
        if (value[0] === ",") {
            value = value.substr(1);
        }
        if (value[value.length - 1] === ".") {
            value = value.substr(0, value.length - 2);
        }
    }

    if (value.substr(0, 2) === "-,") {
        value = "-" + value.substr(2);
    }

    animating = true;
    const chars = value.split("").reverse();
    for (let i = 0; i < chars.length; i++) {
        setTimeout(function() {
            $("#animating").html(chars[i] + $("#animating").html());
        }, i * 100);
    }
    setTimeout(function() {
        $("#animating").attr("id", "");
        animating = false;
    }, chars.length * 100);
}

$(document).keydown(function(e) {
    if (animating) return;

    let key = e.key;
    let val = $("input").val();
    let num = (val.indexOf(".") === -1 ? (Number(val) / 100).toFixed(2) : Number(val).toFixed(2));
    
    if (key != "F5") {
        e.preventDefault();
    }
    $("#output").scrollTop($("#output")[0].scrollHeight);
    
    switch (key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            if (val.indexOf(".") === -1 || val.length - val.indexOf(".") < 3 || overwrite) {
                useLast = false;
                if (val === total.toString() || val === total.toString() + ".00" || overwrite) {
                    overwrite = false;
                    $("input").val(key);
                } else {
                    $("input").val(val + key);
                }
            }
            break;
        case ".":
            if (val.indexOf(".") === -1) {
                $("input").val(val + ".");
            }
            break;
        case "+":
            if (useLast) { 
                num = Number(lastNum).toFixed(2);
            }
            total += Number(num);
            $("input").val(total.toFixed(2));
            printOutput("blue", num, "+", false);
            
            useLast = true;
            lastNum = num;
            overwrite = true;
            break;
        case "-":
            if (useLast) { 
                num = Number(lastNum).toFixed(2);
            }
            total -= Number(num);
            $("input").val(total.toFixed(2));
            printOutput("red", num, "-", false);
            useLast = true;
            lastNum = num;
            overwrite = true;
            break;
        case "c":
            if (Number(val).toFixed(2) === total.toFixed(2) || overwrite) { 
                total = 0;
                lastNum = 0;
                $("#output table tbody").append(`
                    <tr class="blue begin end">
                        <td>0</td>
                        <td>C</td>
                    </tr>
                `);
                $("input").val("0");
            } else {
                $("input").val(total == 0 ? "0" : total.toFixed(2));
            }
            overwrite = true;
            break;
        case "#":
            overwrite = true;
            $("input").val(Number(lastNum) === 0 ? "0" : Number(lastNum).toFixed(2));
            printOutput("blue", `${val} ${Array(72 - val.toString().length).join("-")}`, "----", true);
            break;
        case "f":
            $("#output table tbody").append(`
                <tr class="end">
                    <td></td>
                    <td></td>
                </tr>
            `);
            break;
        case "t":
            $("#output table tbody").html("");
            break;
        case "p":
            const path = document.location.pathname;
            $("#output").printThis({ importCSS: false, loadCSS: decodeURIComponent(`${path.substring(path.indexOf('/'), path.lastIndexOf('/'))}/plugins/printThis/helperStyles.css`) });
            break;
        case "Enter":
            const colour = (num < 0 ? "red" : "blue");
            printOutput(`${colour} end`, total.toFixed(2), "G+", false);
            useLast = true;
            lastNum = total;
            total = 0;
            overwrite = true;
            break;
    }
});