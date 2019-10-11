var Itemname=new Array();
var Itemdesc=new Array();
var price=new Array();
var qua=new Array();
var text="";
var cartItemname=new Array();
var cartItemdesc=new Array();
var cartprice=new Array();
var cartqua=new Array();
var text="";
var txt="";
$(document).ready(function(){
	$("#ediform").slideUp();
	$("#res").slideUp();
	$("#demo").click(function(){
		$("#myform").slideDown();
		$("#ediform").slideUp();
		$("#res").slideUp();
	});
	$("#demo1").click(function(){
		$("#myform").slideUp();
	});
	$(".glyphicon").click(function(){
        $("#myform").slideUp();
	    $("#ediform").slideUp();
	    $("#res").slideDown();
	});
	$("#editbu").click(function(){
		$("#myform").slideUp();
	    $("#ediform").slideDown();
	    $("#res").slideUp();
	});
	$("#demo0").click(function(){
        $("#myform").slideUp();
	    $("#ediform").slideUp();
	    $("#res").slideUp();
	});
});
if(localStorage!=null)
{
	Itemname=(localStorage.getItem('0')).split(',');
	Itemdesc=(localStorage.getItem('1')).split(',');
	price=(localStorage.getItem('2')).split(',');
	qua=(localStorage.getItem('3')).split(',');
	cartItemname=(localStorage.getItem('4')).split(',');
	cartItemdesc=(localStorage.getItem('5')).split(',');
	cartprice=(localStorage.getItem('6')).split(',');
	cartqua=(localStorage.getItem('7')).split(',');
}
function clr()
{
	window.localStorage.clear();
	location.reload();
}
function add(){
	var itemname=document.getElementById("itemname").value;
	var itemdesc=document.getElementById("itemdesc").value;
	var p=document.getElementById("price").value;
	var q=document.getElementById("quantity").value;
	if(itemdesc.length<8)
	{
		alert("Description must be 8 or greater");
		return false;
	}
	if(q<=0)
	{
		alert("Not a valid quantity");
		return false;
	}
    for(i=0;i<Itemname.length;i++)
    {
      if(itemname.localeCompare(Itemname[i])==0)
      {
      	alert("Value should be unique");
      	return false;
      }
    }
	Itemname.push(itemname);
	Itemdesc.push(itemdesc);
	price.push(p);
	qua.push(q);
	JSON.stringify(Itemname);
	JSON.stringify(Itemdesc);
	JSON.stringify(price);
	JSON.stringify(qua);
	localStorage.setItem('0',Itemname);
	localStorage.setItem('1',Itemdesc);
	localStorage.setItem('2',price);
	localStorage.setItem('3',qua);
	location.reload();
	display();
}
function deleteItem(i)
{
  console.log("Item to be deleted");
  if(i==0)
  {
  	if(Itemname.length==1)
  	{
  		Itemname.pop();
  		Itemdesc.pop();
  		price.pop();
  		qua.pop();
  	}
  	else
  	{
  		for(j=0;j<Itemname.length-1;j++)
  		{
  			Itemname[j]=Itemname[j+1];
  			Itemdesc[j]=Itemdesc[j+1];
  			price[j]=price[j+1];
  			qua[j]=qua[j+1];
  		}
  		Itemname.pop();
  		Itemdesc.pop();
  		price.pop();
  		qua.pop();
  	}
  }
  Itemname.splice(1,i);
  Itemdesc.splice(1,i);
  price.splice(1,i);
  qua.splice(1,i);
  localStorage.setItem('0',Itemname);
	localStorage.setItem('1',Itemdesc);
	localStorage.setItem('2',price);
	localStorage.setItem('3',qua);
	display();
}
function search()
{
   var i=document.getElementById("sea").value;
   var text1="";
   text1+="<div style='";
		text1+="font-size:16; color:#000; width:50%; height:70px; float:left;'>";
		text1+=Itemname[i]+"<br>"+Itemdesc[i]+"<br>"+price[i]+"<br>"+qua[i]+"<br>"+"</div>";
		text1+="<div style='";
		text1+="width:30%; height:70px; float:right;'><button style='color:#fff; background-color:red; border-color:transparent; border-radius:5px;' onclick=deleteItem("+i;
		text1+=")>DELETE</BUTTON></div><br>";
		document.getElementById("res").innerHTML=text1;
		text="";
}
function display()
{
	$("#myform").slideUp();
	text="";
	if(Itemname.length==0)
	{
		localStorage.clear();
	}
	 for(i=0;i<Itemname.length;i++)
	{
		text+="<div style='position:relative' class='row'>";
		if(qua[i]==0)
		{
			text+="<div style='";
			if(i!=0)
			{
				text+="margin-top:35px;";
			}
			text+="background-color:rgba(255,255,0,0.6); border-radius:5px; position:absolute; z-index:10; width:100%; height:90px;'><center style='position:absolute;top:50%; left:50%; transform:translate(-50%, -50%); color:red; font-size:28px; font-weight:800'>OUT OF STOCK</center></div>"
		}
		text+="<div class='col-sm-4'style='";
		if(i!=0)
		{
			text+="margin-top:35px;";
		}
		text+="font-size:16; color:#000; height:70px; float:left;'>";
		text+=Itemname[i]+"<br>"+Itemdesc[i]+"<br>"+price[i]+"<br>"+qua[i]+"<br>"+"</div>";
		text+="<div class='col-sm-4' style='";
		if(i!=0)
		{
			text+="margin-top:35px;";
		}
		text+="height:70px; float:right;'><button style='color:#fff; background-color:red; border-color:transparent; border-radius:5px;' onclick=deleteItem("+i;
		text+=")>DELETE</BUTTON><br><BUTTON id='editbu' style='color:#fff; background-color:red; border-color:transparent; border-radius:5px; margin-top:5px;' onclick='editItem("+i+");'>EDIT</button></div>";
		text+="<div class='col-sm-4'style='";
		if(i!=0)
		{
			text+="margin-top:35px;";
		}
		text+="height:70px;'><button id='cart' style='margin-top:15px; background-color:red; color:#fff; width:140px; border-radius:5px; border-color:transparent;' onclick='addtocart("+i+");'>";
		text+="<span class='glyphicon glyphicon-shopping-cart'></span>ADD TO CART</button></div></div>"
	}
	document.getElementById("div1").innerHTML=text;
	text="";
}
function editItem(i)
{	
	$("#res").slideUp();
	$("#myform").slideUp();
	$("#ediform").slideDown();
	console.log(i);
	var editext="";
	editext+="<input type='text' id='ediname' value='"+Itemname[i]+"' required><br>";
	editext+="<input type='text' id='edidesc' value='"+Itemdesc[i]+"' required><br>";
	editext+="<input type='number' id='ediprice' value='"+price[i]+"'required><br>";
	editext+="<input type='number' id='ediqua' value='"+qua[i]+"'required><br>";
	editext+="<button id='demo0' onclick='edi("+i+");' style='width: 100px; height: 30px; background-color: #F44336; color: white; font-size: 18px; font-weight: 800; margin-top: 20px; border-radius: 5px; border-color: transparent;'>Edit</button>"	
	document.getElementById("ediForm").innerHTML=editext;
	console.log(editext);
	editext="";
}
function edi(i)
{
	$("#ediform").slideUp();
	var itemna=document.getElementById("ediname").value;
	var itemde=document.getElementById("edidesc").value;
	var pr=document.getElementById("ediprice").value;
	var qa=document.getElementById("ediqua").value;
	if(itemde.length<8)
	{
		alert("Description must be 8 or greater");
		return false;
	}
	if(qa<=0)
	{
		alert("Not a valid quantity");
		return false;
	}
    for(j=0;j<Itemname.length;j++)
    {
      if(itemna.localeCompare(Itemname[i])==0)
      {
      	alert("Value should be unique");
      	return false;
      }
    }
    Itemname[i]=itemna;
    Itemdesc[i]=itemde;
    price[i]=pr;
    qua[i]=qa;
    localStorage.clear();
    localStorage.setItem('0',Itemname);
	localStorage.setItem('1',Itemdesc);
	localStorage.setItem('2',price);
	localStorage.setItem('3',qua);
	Itemname=(localStorage.getItem('0')).split(',');
	Itemdesc=(localStorage.getItem('1')).split(',');
	price=(localStorage.getItem('2')).split(',');
	qua=(localStorage.getItem('3')).split(',');
	display();
}
function addtocart(i)
{
	if(qua[i]==0)
	{
		return false;
	}
	var d=0;
	for(j=0;j<cartItemname.length;j++)
	{
		if(cartItemname[j]==Itemname[i])
		{
			var t=parseInt(cartqua[j]);
			t=t+1;
			cartqua[j]=t;
			d=1;
			qua[i]=qua[i]-1;
			break;
		}
	}
	alert("ITEM ADDED TO CART");
	if(d==0)
	{
		qua[i]=qua[i]-1;
		cartItemname.push(Itemname[i]);
	    cartItemdesc.push(Itemdesc[i]);
	    cartprice.push(price[i]);
	    cartqua.push(1);
	}
	JSON.stringify(cartItemname);
	JSON.stringify(cartItemdesc);
	JSON.stringify(cartprice);
	JSON.stringify(cartqua);
	localStorage.setItem('3',qua);
	localStorage.setItem('4',cartItemname);
	localStorage.setItem('5',cartItemdesc);
	localStorage.setItem('6',cartprice);
	localStorage.setItem('7',cartqua);
	cartItemname=(localStorage.getItem('4')).split(',');
	cartItemdesc=(localStorage.getItem('5')).split(',');
	cartprice=(localStorage.getItem('6')).split(',');
	cartqua=(localStorage.getItem('7')).split(',');
	location.reload();
}
function displayCart()
{
	text="";
	 for(i=0;i<cartItemname.length;i++)
	{
		text+="<div class='row'>";
		text+="<div class='col-sm-7'style='";
		if(i!=0)
		{
			text+="margin-top:35px;";
		}
		text+="font-size:16; color:#000; height:70px; float:left;'>";
		text+=cartItemname[i]+"<br>"+cartItemdesc[i]+"<br>"+cartprice[i]+"<br>"+cartqua[i]+"<br>"+"</div>";
		text+="<div class='col-sm-5' style='";
		if(i!=0)
		{
			text+="margin-top:35px;";
		}
		text+="height:70px; float:right;'><button style='color:#fff; background-color:red; border-color:transparent; border-radius:5px;' onclick=deleteItem("+i;
		text+=")>DELETE</BUTTON></div>";
		text+="</div>"
	}
	document.getElementById("showcart").innerHTML=text;
	text="";
}