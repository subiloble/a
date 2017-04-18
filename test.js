var datatable = null;
var db = openDatabase("MyData","","My Database",1024*100);

function init(){
    datatable = document.getElementById("datatable");
    showAllData();
}

function hideAllData(){
    for(var i=datatable.childNodes.length-1;i>=0;i--){
        datatable.removeChild(datatable.childNodes[i]);
    }
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
	var th4 = document.createElement("th");
	var th5 = document.createElement("th");
	var th6 = document.createElement("th");

    th1.innerHTML = "Name";
    th2.innerHTML = "Due";
    th3.innerHTML = "Importance";
	th4.innerHTML = "Difficulty";
	th5.innerHTML = "Detail";
	th6.innerHTML = "Time";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
	tr.appendChild(th4);
	tr.appendChild(th5);
	tr.appendChild(th6);

    datatable.appendChild(tr);
}

function showData(row){
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
	var td4 = document.createElement("td");
	var td5 = document.createElement("td");
	var td6 = document.createElement("td");

    td1.innerHTML = row.Name;
    td2.innerHTML = row.Due;
	td3.innerHTML = row.Importance;
	td4.innerHTML = row.Difficulty;
	td5.innerHTML = row.Detail;
    var t = new Date();
    t.setTime(row.Time);
    td6.innerHTML = t.toLocaleDateString()+" "+ t.toLocaleTimeString();

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);

    datatable.appendChild(tr);
}

//删除单行数据
function deleteData(){
    var rowName = window.prompt("the name of deleted row:","");
	db.transaction(function(tx){
        tx.executeSql("DELETE FROM MsgData WHERE Name = '"+rowName+"'",[],function(tx,rs){
            window.alert("success!");
			showAllData();
        },function(tx,error){
            window.alert(error.source+"::"+error.message);
        });
    })
}

//显示当前本地数据库中所有的数据信息
function showAllData(){
    db.transaction(function(tx){
        tx.executeSql("create table if not exists MsgData(Name text,Due text,Importance text,Difficulty text,Detail text,Time text)",[]);
        tx.executeSql("select * from MsgData",[],function(tx,rs){
            hideAllData();
            for(var i=0;i<rs.rows.length;i++){
                showData(rs.rows.item(i));
            }
        });
    })
}

//向本地数据库中添加数据
function addData(Name,Due,Importance,Difficulty,Detail,Time){
    db.transaction(function(tx){
        tx.executeSql("insert into MsgData values (?,?,?,?,?,?)",[Name,Due,Importance,Difficulty,Detail,Time],function(tx,rs){
            window.alert("success!");
        },function(tx,error){
            window.alert(error.source+"::"+error.message);
        });
    })
}

//保存table中提交的数据
function saveData(){
    var Name = document.getElementById("Name").value;
    var Due = document.getElementById("Due").value;
	var Importance = document.getElementById("Importance").value;
	var Difficulty = document.getElementById("Difficulty").value;
	var Detail = document.getElementById("Detail").value;
    var Time = new Date().getTime();
    addData(Name,Due,Importance,Difficulty,Detail,Time);
    showAllData();
}

//删除某一个表
function dropTable(){
    //var tableName = window.prompt("the name of deleted table:","");
    var tableName = "MsgData";
	db.transaction(function(tx){
        tx.executeSql("drop table "+tableName+"",[],function(tx,rs){
            window.alert("success!");
			showAllData();
        },function(tx,error){
            window.alert(error.source+"::"+error.message);
        });
    })
}