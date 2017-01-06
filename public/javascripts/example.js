/**
 * Created by zezhang on 2017/1/4.
 */

function move() {
    var para = document.getElementById("tt");
    para.style.left = "200px";

}

window.onload = function () {
    var testdiv = document.getElementById("testdiv");
    var para = document.createElement("p");
    para.style.color = "red";
    var info = "nodeName:" + para.nodeName + " nodeType:" + para.nodeType;
    testdiv.appendChild(para);
    var text = document.createTextNode("hello world");
    para.appendChild(text);
    displayAbbreviations();
    setTimeout("move()", 5000);

};

