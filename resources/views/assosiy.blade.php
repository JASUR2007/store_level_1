<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<link rel="stylesheet" href="{{asset('css/intro.css')}}">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">   
	<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>   
	<link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
	<div id="app">
		@include('header_intro')
		@include('slider_intro')
		@include('product_intro')
	</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
	<script>
		
        var app = new Vue ({
            el:"#app",
			data:{
               domain_url: "{{url('')}}",
			   users:[],
            },
		      mounted(){
		        fetch(this.domain_url + '/store')
		          .then(rep=> rep.json())
		           .then (res => {
		            console.log(res)
		           	this.users=res.products
		    })
		      },
			methods:{
		        parseJson(jsonArray) {
		            if ( this.isJsonString(jsonArray)) {
		               if( this.isJsonString(jsonArray).length > 0) {
		                return this.domain_url+'/storage/' +  this.isJsonString(jsonArray)[0];
		               }
		            } else {
		                return "";
		            }
		        },
		        isJsonString(str) {
		            try {
		                JSON.parse(str);
		                return JSON.parse(str);
		            } catch (e) {
		                return false;
		            }
		        
		   	 },
		   	 info(){
		   	 	alert('aa')
		   	 }		
			}      
        })
	</script>    
</body>
</html>