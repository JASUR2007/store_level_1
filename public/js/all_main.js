var Product = {
	template:`
    <div class='product_main'>
		     	<div id="main">
				<div  style="background-color:whitesmoke;height:100%;padding:20px 35px 20px"> 
				  <div class="product_div_4">
				    <div><b><h3>Mahsulotlar</h3></b></div>
				    <div class="product_div_5">
				      <button class="btn button_products1" style="background-color:white"><span><i class='bx bxs-cloud-upload' style="margin-left:-5px"></i><b style="margin-top:-5px">Export</b></span></button>
				      <button class="btn btn-primary button_products1" style="" @click="click_store"><b>+ Create new</b></button>
				    </div>
				  </div>
				        <div class="" style="background-color:white;border-radius:5px;padding: 11px 0px 40px;">
				            <div style="display:flex;justify-content:space-between;" class="product_div_7">
				              <div style="display:flex;padding: 0px 10px 0px;">
				                  <input type="" class="form-control input_pro" id="exampleInputEmail1" placeholder="Search">
				              </div>
				              <div class="d-flex justify-content-around" style="width:340px;padding-right:50px">
				                <select class="form-select form_product">
				                  <option selected>Category</option>
				                  <option value="1">One</option>
				                  <option value="2">Two</option>
				                  <option value="3">Three</option>
				                </select> 
				                <button class="btn" style="border:1px solid grey;background-color:white;width:140px">
				                  <span style="color:grey;">Last added<i class='bx bxs-hand-up' style="padding-left:5px"></i></span>
				                </button>           
				              </div>                
				            </div>
				            <hr width="100%" height="2px">
				          <div  style="height:100%;padding:20px;display:flex;justify-content:space-around;flex-wrap:wrap;gap:20px">  
				              <div id="what1"  v-for="(user,index) of users" :key="index">
				               <div width="300px"     style="display:flex;justify-content:center;height:300px;">
				                 <img  class="img_pro"  :src="parseJson(user.images)">
				               </div> 
				                <h5>{{user.title}}</h5>
				                <p>{{user.category}}</p>
				                <p>{{user.price}}$</p>
								<a :href="'#edit/'+user.id" data-bs-toggle="dropdown" class="text-decoration "  style="border: 1px solid transparent;border-color: rgba(108, 117, 125, 0.25);background-color: #fff;padding: 0.25rem 0.5rem;font-size: 0.875rem;color:grey;margin:2px;"> 
									<i class='bx bxs-pencil'></i>  Edit  
								</a>
								<a @click="deletePro(user.id,index)" data-bs-toggle="dropdown" class="btn btn-sm btn-outline-danger"> 
									<i class='bx bxs-trash' ></i>  Delete  
								</a>												                				                
				            </div>
				          </div>
				        </div>
				     </div>					  
			</div>
	   </div> 
   </div>
	`,
    data(){
        return{
			users:[],
			slider:{},
        }
    },
      mounted(){

		console.log(this.$parent.domain_url + 'store')
        fetch(this.$parent.domain_url + 'store')
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
                return this.$parent.domain_url+'storage/' +  this.isJsonString(jsonArray)[0];
               }
            } else {
                return "";
            }
        },
		deletePro(id,index){
		            let tek = confirm("Are you sure deleting?")
		            if(tek){
		                let formdata = new FormData()
		                formdata.append("id",id)
		                formdata.append("_token",this.$parent.token)


		                fetch(this.$parent.domain_url + 'delete_product/' + id,{
		                    method:"POST",
		                    body:formdata
		                })
		                .then(res=>res.json())
		                .then(resp=>{
		                    console.log(resp);
		                    if(resp.status==="deleted!"){
		                        this.users.splice(index,1);
		                    }
		                })
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
    click_store(){
    	this.$router.push("/add_store")
    }
  }
}
var Edit = {
	template:`

	    <div class="vh-100 d-flex justify-content-center align-items-center" style="flex-direction:column">
	        <form class="w-50">
	            <div >
	        		<label for="formFile" class="form-label">Title</label>
	         	 	<input  class="form-control" type="text" v-model="title" >
	         	 </div>
	         	<label for="formFile" class="form-label">Category</label>
	     		 <div class="category_store_edit">
	       		   <div v-for="category of categories" :key="category.id">
	          		  <input :value="category.title" type="radio" name="category" :id="'category'+category.id" @change="changeRadio($event)" >
	           		 <label :for="'category'+category.id">{{category.title}}</label>                                
	         		</div>
	   		    </div>               
	       		<label for="formFile" class="form-label">Price</label>
	    	      <input class="form-control" type="number" v-model="price">
	     	    <label for="formFile" class="form-label">Text</label>
          	  <div class="mb-3" >
                    <label for="upload-photo" class="labe" style="display:flex;gap:10px;overflow: auto;flex-wrap: wrap;">
                      <div style="height:60px;width:60px;background-color:whitesmoke;border-radius:5px;display:flex;cursor:pointer" class="align-items-center justify-content-center flex-column">
                        	<img src='data:image/png;base64,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' alt="" style="color:grey;width:20px;height:20px">
                       		 <div style="font-size:10px;color:grey">Upload</div>
                      </div>			                        
                      <div v-for="(img,index) in images"  :key="index"  style="height:60px;width:60px;background-color:whitesmoke;border-radius:5px;display:flex;cursor:pointer" class="align-items-center justify-content-center flex-column">
                       	 <img :src="$parent.domain_url+'storage/'+img"  alt="" style="color:grey;width:90%;height:90%" >
                      </div>
                   </label>
                    <input type="file" name="photo" id="upload-photo" @change = "selectFile($event)"/>                      
           	   </div>	      	    
	        </form>
	         	 <button class="btn btn-warning mt-2 w-50" @click="edit_store">Submit</button>
	    </div>
	    </div>  	
	`,
    data(){
        return{
        	title:'',
        	category:'',	
        	price:'',
        	users:[],
        	images:[],
        	categories:[],
        	image:'',
        }
    },
mounted(){
	fetch(this.$parent.domain_url+'store/'+this.$route.params.id)
        .then((res)=>res.json())
        .then(resp=>{
			this.price = resp.products[0].price
			this.title = resp.products[0].title
			this.category = resp.products[0].category
			this.images.push(resp.products[0].images.slice(2,55));            


        	console.log(resp)
        })
   fetch(this.$parent.domain_url + 'category')
      	.then(rep=> rep.json())
       	.then (res => {
    		this.categories = res.categories
        	console.log(res)
		});        

},
    methods:{

        selectFile(event) {

          	let formData = new FormData();
          	formData.append("photo",event.target.files[0]);
			formData.append("_token",this.$parent.token);

            fetch(this.$parent.domain_url + 'upload-image', {
              method:"POST",
              body:formData,
            })
            .then(rep=> rep.json())
            .then(res=>{
              this.images.unshift(res.data);            
            });
        },          
changeRadio($event) {
  console.log($event.target.value);
  this.category = $event.target.value;
},
        edit_store(){
            let formdata = new FormData();
				formdata.append("_token",this.$parent.token);
	            formdata.append("title",this.title)
	            formdata.append("category",this.category)
				formdata.append("images",JSON.stringify(this.images))
	            formdata.append("price",this.price)
	            formdata.append("id",this.$route.params.id)

            fetch(this.$parent.domain_url + `update-product`,{
                method:"post",
                body:formdata
            })
            .then(res=>res.json())
            .then(resp=>{
                if (resp.status=="ok!") {
                    this.$router.push("/")
                }
                console.log(resp)
            })
        },

    }
}

var Add_store = {
	template:`
		     <div id="main" >
		      	<div  class="add_st"> 
		          <h3 style="height:60px">Create Product</h3>
		       	  <div class="" style="background-color:white;border-radius:5px;padding: 9px 14px 0px;">
		          	<div class="d-flex " id="" >
		               <div  style="width:100%">
		               	   <form class="w-100 form_store" style="margin-left:-10px;">
		                   		<div class="d-flex w-100 justify-content-between form_store_2">
		                      		<label style="font-weight:600;color:black" for="formFile" class="form-label">1.General info</label>
		                        	<div class="text_add">
		                        	    <label style="" for="formFile" class="form-label d-flex">Product title</label>
			                        	 <input class="form-control" style="font-size:14px;height:30px;color:grey;width:100%;" type="text" placeholder="Text" v-model="title">
			                          	<label  for="formFile" class="form-label d-flex">Full description</label>
			                         	<textarea placeholder="Type here" style="color:grey;border:1px solid #80808047;" class="store_textarea" name="" id="" cols="47" rows="6" v-model="info"></textarea >
			                          	<label style="" for="formFile" class="form-label d-flex">Brand name</label>
			                          	<select v-model="amount" class="form-select add_store_select" aria-label="Default select example" style="color:grey">
				                            <option value="text">Text</option>
				                            <option value="1" >One</option>
				                            <option value="2">Two</option>
				                            <option value="3">Three</option>
			                           </select>
		                        	</div>
		                   	   </div>
		                   	   <div>
		                     		<hr>
		                  	   </div>
		                  	   <div style="" class="d-flex w-100 justify-content-between">
		                     		<label style="font-weight:600;color:black" for="formFile" class="form-label">2.Pricing</label>
		                       		<div  class="text_add">
		                         		 <label style=""  for="formFile" class="form-label d-flex">Price</label>
		                         		 <input class="form-control add_store_price" v-model="price" style="font-size:14px;height:30px;color:grey;height:40px" type="text" placeholder="Text" >
		                    	   </div>
		                   		</div>
		                   	    <div>
		                    	  <hr>
		                 	  </div>
		                  	  <div class="mb-3" >
			                        <label for="upload-photo" class="labe" style="display:flex;gap:10px;overflow: auto;flex-wrap: wrap;">
			                          <div style="height:60px;width:60px;background-color:whitesmoke;border-radius:5px;display:flex;cursor:pointer" class="align-items-center justify-content-center flex-column">
			                            	<img src='data:image/png;base64,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' alt="" style="color:grey;width:20px;height:20px">
			                           		 <div style="font-size:10px;color:grey">Upload</div>
			                          </div>			                        
			                          <div v-for="(img,index) in images" :key="index" style="height:60px;width:60px;background-color:whitesmoke;border-radius:5px;display:flex;cursor:pointer" class="align-items-center justify-content-center flex-column">
			                           	 <img :src="$parent.domain_url+'storage/'+img"  alt="" style="color:grey;width:90%;height:90%">
			                          </div>
			                       </label>
			                        <input type="file" name="photo" id="upload-photo"  @change = "selectFile($event)"/>                      
		                   	   </div>
		                  		  <hr>
		                  	   <div style="" class="d-flex w-100 justify-content-between">
		                      		<label style="font-weight:600;color:black" for="formFile" class="form-label">3.Category</label>
		                      		  <div class="text_add  text_add1">
		                         		 <div class="category_store">
		                           		   <div v-for="category of categories" :key="category.id">
		                              		  <input :value="category.title" type="radio" name="category" :id="'category'+category.id" @change="changeRadio($event)">
		                               		 <label :for="'category'+category.id">{{category.title}}</label>                                
		                             		</div>
		                       		    </div>                                                                                      
		                      	   </div>
		                  	  </div>
		                  	 <div>
		                   	    <hr>
		                   	</div>
		                </form>
		            </div>
		          </div>
		          <div class="d-flex  justify-content-end">
		         	 <button class="btn  btn-outline-dark" >Save draft</button>
		         	 <button class="btn btn-primary" @click="adduser">Save product</button>
		          </div>
		      </div>  
		  </div>
		</div>		   
	   </div> 
   </div>
		`,
   data(){
        return{
	      lab:false,
	      tru1:false,
	      price:'',
	      category:'',
	      amount:'text',
	      tg_link:'',
	      v_link:'',
	      images:[],      
	      title:'',
	      info:'',
	      categories:[],
        }
    },
    mounted(){
    	fetch(this.$parent.domain_url + 'category')
      	.then(rep=> rep.json())
       	.then (res => {
    		this.categories = res.categories
        	console.log(res)
		});
  	},
	methods: {
        selectFile(event) {
          	let formData = new FormData();
          	formData.append("photo",event.target.files[0]);
			formData.append("_token",this.$parent.token);

            fetch(this.$parent.domain_url + 'upload-image', {
              method:"POST",
              body:formData,
            })
            .then(rep=> rep.json())
            .then(res=>{
				console.log(res)
              this.images.push(res.data);
            });
        },
    adduser(){
        
let formData = new FormData();
formData.append("amount",this.amount);
formData.append("price",this.price);
formData.append("title",this.title);
formData.append("info",this.info);
formData.append("tg_link",this.tg_link);
formData.append("v_link",this.v_link);
formData.append("_token",this.$parent.token);
formData.append("category",this.category);
formData.append("images",JSON.stringify(this.images)); 


fetch(this.$parent.domain_url + 'create-store',{
  method:"POST",
  body:formData,
})
.then(rep=> rep.json())
.then(res=>{
  if (res.status == "ok") {
  this.$router.push("/") 
  }
  console.log(res)
})

},

changeRadio($event) {
  console.log($event.target.value);
  this.category = $event.target.value;
}



  
},	
}
var Category = {
	template:`
			    <div id="main" >
					<div  style="background-color:whitesmoke;height:100%;padding:50px 35px 20px"> 
			       		<div class="" style="background-color:white;border-radius:5px;padding: 9px 14px 0px;justify-content:space-between">
			         		<div class="category_4div" >
			           			<div  id="cla" class="clas" >
			                		<form class="w-100" style="margin-left:-10px;line-height:40px">
			               			    <label style="justify-content: start; display: flex;" for="formFile" class="form-label">Name</label>
			                  		    <input class="form-control" style="font-size:14px;height:30px;color:grey" type="text" placeholder="Text" v-model="title">
			                			<label style="justify-content: start; display: flex;" for="formFile" class="form-label">Slug</label>
			                		   <input style="font-size:14px;height:30px;color:grey" class=" form-control" type="text" placeholder="Text"  v-model="slug">
			              			   <label style="justify-content: start; display: flex;" for="formFile" class="form-label">Parent</label>
			                            <select class="form-select" aria-label="Default select example"   style="width:100%;color:grey" v-model="parent">
				                            <option selected>Text</option>
				                            <option value="1" >One</option>
				                            <option value="2">Two</option>
				                            <option value="3">Three</option>
			                            </select>
			                 			<label style="justify-content: start; display: flex;" for="formFile" class="form-label">Description</label>
			                 		 	<textarea style="font-size:14px;height:100px;color:grey" class=" form-control" placeholder="Type here" v-model="description"></textarea >
			                	 		 <button class="btn btn-primary mt-2 w-100" @click="adduser()">Create category</button>
			               		   </form>
			           		   </div>
			          		   <div>
			            		  <hr class="hr_category"> 
			            	   </div>
			         		   <div class=" e3" >
			           				<div class="l1">
			            		    	<table class="table w-100" >
			             		  			<thead >
							                  <tr style="color:grey">
							                    <th scope="col" >ID</th>
							                    <th scope="col" >Name</th>
							                    <th scope="col" >Slug</th>
							                    <th scope="col">Order</th>
							                    <th scope="col" >Action</th>
							                  </tr>
			              			 	  </thead>
				              			  <tbody >
							                  <tr style=""  v-for="(user,index) of categories" :key='index'>
							                    <th scope="row">{{index+1}}</th>
							                    <td>{{user.title}}</td>
							                    <td>{{user.slug}}</td>
							                    <td>{{user.parent}}</td>
							                    <td>{{user.description}}</td>
							                  </tr>
				               			 </tbody>
			            		 	  </table>
			         			  </div>
			         		 </div>
			       		 </div>
			       </div>
			   </div>  
			</div>		   
	   </div> 
   </div>	
		`,
    data(){
   	   return{
		  categories:[],
		  title:'',
	      parent:'',
	      slug:'',
	      description:'',
        }
    },
 
	 mounted(){
	  fetch(this.$parent.domain_url + 'category')
	    .then(rep=> rep.json())
	    .then (res => {
	    this.categories = res.categories
	    console.log(res)
	    })
	      },
	      methods: {
			adduser(){
	        
	let formData = new FormData();
	formData.append("title",this.title);
	formData.append("category",this.category);
	formData.append("parent",this.parent);
	formData.append("slug",this.slug);
	formData.append("_token",this.$parent.token);
	formData.append("description",this.description); 
	console.log(this.$parent.token)
	fetch(this.$parent.domain_url + '/create-category',{
	method:"POST",
	  body:formData,
	})
	.then(rep=> rep.json())
	.then(res=> {
	  console.log(res);
	  if (res.status == "ok") {
	    this.categories.unshift({title:this.title,category:this.category,parent:this.parent,description:this.description,slug:this.slug}) 
	   }
	  });
	},
	  
	},
}
var Order = {
	template:`
			    <div id="main" >
			       <div  style="background-color:whitesmoke;height:134vh;padding:15px 15px 0px"> 
			          <h3 style="height:30px">Orders</h3>
			           <div style="padding:10px;width:100%;" class="order_3div">
			               <div class="order_4div">
			              		<table class="table">
			              		  <thead>
			                  		  <tr>
					                    <th scope="col">ID</th>
					                    <th scope="col">Customer name</th>
					                    <th scope="col">Price</th>
					                    <th scope="col">Status</th>
					                    <th scope="col">Date</th>
					                    <th scope="col">Action</th>                    
					                  </tr>
			                      </thead>
			               		  <tbody>
					                  <tr v-for="users of user" :key="users.id">
					                    <th scope="row">{{users.id}}</th>
					                    <td>{{users.id}}</td>
					                    <td>{{users.full_name}}</td>
					                    <td>{{users.price}}</td>
					                    <td>{{users.status}}</td>
					                    <td>{{users.date}}</td>                    
					                  </tr>
			             	     </tbody>
			            	   </table>              
			          	   </div>
			               <div class="order_filter">
			              	  <h4><b>Filter</b></h4>
			                  <div class="form-group" style="height:74px">
			                     <label for="exampleInputEmail1">Price</label>
			                     <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Text" style="height:36px" v-model="id">
			                  </div>
			                  <div class="form-group" style="height:74px">
			                    <label for="exampleInputEmail1">Customer</label>
			                    <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Text" style="height:36px" v-model="full_name">
			                  </div>
			                    <div class="form-group" style="height:74px">
			                    <label for="exampleInputEmail1">Order status</label>
			                    <select class="form-select" style="color:grey;height:36px" aria-label="Default select example" v-model="status">
			                      <option selected>Text</option>
			                      <option value="1">One</option>
			                      <option value="2">Two</option>
			                      <option value="3">Three</option>
			                    </select>
			                  </div>
			                    <div class="form-group" style="height:74px">
			                    <label for="exampleInputEmail1">Total</label>
			                    <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Text" style="height:36px" v-model="id">
			                  </div>
			                    <div class="form-group" style="height:74px">
			                    <label for="exampleInputEmail1">Data Added</label>
			                    <input type="date" class="form-control" id="exampleInputEmail1"  placeholder="Text" style="height:36px" v-model="date">
			                  </div>
			                    <div class="form-group" style="height:80px">
			                    <label for="exampleInputEmail1">Data Modified</label>
			                    <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Text" style="height:36px">
			                  </div>
			                   <button class="btn btn-primary w-100"><b>Filter</b></button>                                                
			         	   </div>
			          </div>
			  	</div>
			</div>		   
	   </div> 
   </div>	
		`,
    data(){
        return{
      user:[],      
      price:'',
      full_name:'',
      id:'',
      status:'',
      date:'',
        }
    },
           mounted(){
            fetch(this.$parent.domain_url + "orders")
              .then(rep=> rep.json())
               .then (res => {
            this.user = res.orders
                console.log(res)
        })
          },
}
var Order_detail = {
	template:`
		        <div class="order_main"> 
		            <div class="order_detail_div2">
						<div style="background-color:white;width:100%;padding:10px">
							<div class="order_detail_4div">
								<div>
									<b style="font-size: 16px;height: 35px;width: 250px;justify-content: space-around;display: flex;align-items: center;"><i style="font-size:25px" class='bx bx-calendar-alt'></i>Wed,Aug 13,2020, 4:34PM</b>
									<p style="font-size:12px;color:#80808085;margin-left:45px">#ID 3453012</p>							
								</div>
								<div class="d-flex">	
									<select class="form-select" style="width:200px;height:40px" aria-label="Default select example">
										<option selected>Change status</option>
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</select>							
									<button class="btn btn-outline-secondary" style="height:40px">Save</button>	
									<div style="height: 40px;justify-content: center;align-items: center;display: flex;width: 45px;color: white;border-radius: 5px;background: grey;">
										<i style="font-size:20px" class='bx bxs-printer' ></i>
									</div>
								</div>					
							</div>
							<hr style="width:100%;height:1px;margin-top:5px">
							<div class="customer">
								<div style="display:flex;justify-content: space-around;width: 240px;">
									<div style="display: flex;width: 57px;justify-content: center;align-items: center;height: 56px;color: blue;background: #0000ff30;border-radius: 30px;">
										<i style="font-size:22px" class='bx bxs-user'></i>
									</div>
									<span>
										<h5>Customer</h5>
										<p style="width:150px">John Alexander alex@example.com +998 99 22123456</p>
										<p href="" style="text-decoration:none;color:blue;margin-top:-15px">View profile</p>
									</span>
								</div>
								<div style="display:flex;justify-content: space-around;width: 240px;">
									<div style="display: flex;width: 57px;justify-content: center;align-items: center;height: 56px;color: blue;background: #0000ff30;border-radius: 30px;">
										<i class='bx bxs-truck' style="font-size:24px"></i>
									</div>
									<span>
										<h5>Customer</h5>
										<p style="width:150px">John Alexander alex@example.com +998 99 22123456</p>
										<p href="" style="text-decoration:none;color:blue;margin-top:-15px">View profile</p>
									</span>
								</div>
								<div style="display:flex;justify-content: space-around;width: 240px;">
									<div style="display: flex;width: 57px;justify-content: center;align-items: center;height: 56px;color: blue;background: #0000ff30;border-radius: 30px;">
										<i class='bx bxs-location-plus' style="font-size:24px"></i>
									</div>
									<span>
										<h5>Customer</h5>
										<p style="width:150px">John Alexander alex@example.com +998 99 22123456</p>
										<p href="" style="text-decoration:none;color:blue;margin-top:-15px">View profile</p>
									</span>
								</div>
							</div>
							<div>
								<table class="order_table table" style="border:1px solid grey;">
								  <thead>
								    <tr style="color:#9e9e9ed9">
								      <th style="font-weight:450" scope="col">Mahsulot</th>
								      <th style="font-weight:450" scope="col">Nechtaligi</th>
								      <th style="font-weight:450" scope="col">Narxi</th>
								      <th style="font-weight:450" scope="col">jami</th>
								    </tr>
								  </thead>
								  <tbody>
								    <tr v-for="user of users" :key="user.id" style="height:30px" class="tr_order">
								      <th  scope="row" style="color:royalblue;">
								      	<img style="width:40px;height:40px;margin-left:-5px" :src="user.image" alt="">
								      	<span style="margin-left:10px">{{user.title}}</span>
								      </th>
								      <td>{{user.quantity}}</td>
								      <td>{{user.price}}</td>
								      <td>{{user.total}}</td>
								    </tr>
								  </tbody>
								</table>
							</div>
					  </div>
		       	 </div>
		     </div>		   
	  	 </div> 
   </div>	
		`,
    data(){
        return{
			users:[],
        }
    },
          mounted(){
        fetch(this.$parent.domain_url + "orders")
          .then(rep=> rep.json())
           .then (res => {
        this.users = res.orders
            console.log(res)
   		 })
      },
}
var Seller = {
	template:`
				<div style="background:whitesmoke;padding:10px 15px 0px">
					<div style="background:white">
				        <div class="" style="background-color:white;border-radius:5px;padding: 11px 0px 40px;">
				            <div style="display:flex;justify-content:space-between;height: 40px;">
				              <div style="display:flex;padding: 0px 10px 0px;">
				                  <input type="" class="form-control seller_inp" id="exampleInputEmail1" placeholder="Search">
				              </div>
				              <div class="d-flex justify-content-around" style="width:340px;padding-right:50px">
				                <select class="form-select"  style="width:130px;box-shadow:none">
				                  <option selected>Category</option>
				                  <option value="1">One</option>
				                  <option value="2">Two</option>
				                  <option value="3">Three</option>
				                </select> 
				                <button class="btn" style="border:1px solid grey;background-color:white;width:140px">
				                  <span style="color:grey;">Last added<i class='bx bxs-hand-up' style="padding-left:5px"></i></span>
				                </button>           
				              </div>                
				            </div>
				            <hr width="100%" height="2px">
						<div>
							<div class="card_name">
								<div v-for="user of pros" :key="user" style="border: .1px solid grey;height: 280px;width: 250px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
									<div class="img">
									</div>
										<img :src="user.image" alt="" style="border-radius:50%;width: 90px;height: 85px;border: 5px solid white;z-index: 0;">
										<h6 style="margin-top:10px"><b>{{user.full_name}}</b></h6>
									<div style="line-height: 5px;color:grey;text-align: center;">
										<p>Seller ID #{{user.id}}</p>
										<p>Lesile @example.com</p>
										<button class="btn" style="border:1px solid grey;box-shadow: none;"><b>Profile</b></button>
									</div>
								</div>																												
							</div>
						</div>
					</div>	
			</div>	
	   </div> 
   </div>	
		`,
    data(){
        return{
            pros:[],
        }
    },
    mounted(){

		fetch(this.$parent.domain_url + 'broker')
			.then(rep => rep.json())
			.then(res => {
				this.pros = res.brokers;
				console.log(res)
			})
    },
    methods:{        
    },
}
var Settings = {
	template:`
		        <div  style="background-color:whitesmoke;height:91vh;padding:10px 15px 0px">
		        	<div style="margin-left:10px;height:50px">
		             	<h3>Profile settings</h3> 
		             </div>
		            <div class="div1">
		               <div class="" id="gen1">
		                    <a href="" style="text-decoration:none">Asosiy</a>
		                    <a href="" style="text-decoration:none">Sozlamalar</a>
		                </div>
		                <div class="settings_div5">
		                   <div class="" style="background-color:white;border-radius:5px;padding: 5px 3px 3px;">
		                      <div class="settings_inp1" >
		                        <form class="" id="da1">
		                            <div class="d-flex w-100 justify-content-start">
		                              <div class="settings_name">First name
		                                <input class="form-control setting_inp" type="text">
		                             </div>
		                              <div class="settings_name2">Last name
		                                <input class="form-control setting_inp" type="text" >
		                             </div> 
		                           </div>
		                           <div class="settings_input_2">
		                            <div  style="justify-content: start; display: flex;flex-direction:column;align-items:start">Email
		                              <input class="form-control setting_inp"  type="text">
		                           </div>
		                            <div class="div_inp_setting">Phone
		                             <input class="form-control setting_inp" type="text">
		                           </div>
		                          </div>
		                          <label style="justify-content: start; display: flex;margin-top:10px" for="formFile" class="form-label">Adress</label>
		                          <input class=" form-control settings_inp_3" type="text" >
		                          <label style="justify-content: start; display: flex;margin-top:10px" for="formFile" class="form-label">Adress</label>
		                          <input style="" class=" form-control settings_inp_4" type="text" >
		                          <div class="w-100 d-flex justify-content-start">
		                            <button class="btn btn-primary mt-2 " style="width:160px">SAVE CHANGES</button>
		                          </div>
		                        </form>
		                        <div style="display:flex;flex-direction:column;justify-content:space-around;height:245px;align-items:center;padding:15px 2px 0 0"> 
		                           <img src="https://cdn.motor1.com/images/mgl/vrRzY/s1/bugatti-chiron-alice.jpg" style="width:180px;height:140px;border-radius:50%" alt="">
		                          <button class="btn border-dark d-flex align-items-center justify-content-around" style="color:#0600ff;width:150px;height:35px">Upload   <i class="fas fa-cloud-download-alt"></i></button>
		                       </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		   </div>		   
	   </div> 
   </div>	
		`,
    methods:{        
    },
}
var Seller_profile = {
template:`
	<div  style="background:whitesmoke;padding:15px">
		<div class="profile_div2 d-flex flex-column justify-content-between">
			<div class="w-100 d-flex flex-column align-items-center mt-5">
			   <div class="contr" style="width:100%">
			        <div class="divider">
			        </div>
			        <div class="card w-100">
			            	<img class="image" src="img/brand.jpg">
			            <div class="profile_5div card-body mt-5" style="height:100px;">
			                <div class="carder"> 
			              	  <div class="seller_profile_di">
			               		 <h3 class="card-title">Adidas sports shop</h3>
			               		 <p class="card-text" >3891 Ranchewiew california 62639, Dr Ricnhensom</p>
			              	  </div>
			              	    <div class="profile_button">
									<select class="form-select" aria-label="Default select example" style="width:100px">
									  <option selected>Actions</option>
									  <option value="1">One</option>
									  <option value="2">Two</option>
									  <option value="3">Three</option>
									</select>			              	  
				              	  	<button class="btn btn-outline-primary" style="box-shadow:none">
				              	  		View live
				              	  			<i style="font-size:14px;" class='bx bxs-share-alt' ></i>
				              	  	</button>
			              	    </div>
			               	</div>
			            </div>
					    <hr style="width:100%">
			            <div  class="div_text_out">
					            <div class="profile_text">
									<div class="profile_text_im">
										<p style="width: 100px;">
											Total sales: 
											<span style="color:green"><b>$238</b></span>
										</p>
										<p style="width: 90px;">
											Revenue:
											<span style="color: green;"><b>$2380</b></span>
										</p>
									</div>			            	
					            </div>
								<div class="profile_contact">
								    <div class="row">
								       <div class="col-sm-6 box-shadow">
								            <div class="card d-flex flex-row" style="background-color:transparent; border:none;">
								                <div class="card-body" style="line-height:15px">
													<h5 class="card-title">Contact</h5>
													<p class="card-text">Manager:Joremo Bell</p>
													<p class="card-text">info@example.com</p>
													<p class="card-text">(229) 555-0109,(808) 555-0111</p>
								                </div>
								            </div>
								        </div>
								        <div class="col-sm-6">
								            <div class="card d-flex flex-row" style="background-color:transparent; border:none;">
								                <div class="card-body" style="line-height:15px">
													<h5 class="card-title">Address</h5>
													<p class="card-text">Country: California</p>
													<p class="card-text">Address: Ranchview Dr. Richardson</p>
													<p class="card-text">Post code: 62639</p>
								                </div>
								           </div>
								       </div>
								  </div>
								</div>
								 <div style="padding:10px">
								  <img src="img/map.jpg" style="width: 270px;height: 150px;">
							   </div>								    
						</div>			            
			    	</div>
			   </div>
		 </div>
			<div style="" class="main_card_prof">
				<h3>Product by seller</h3>
				<div class="profile_card">
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="img/1.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="img/2.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="img/4.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="img/3.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Tshirt.jpg/250px-Blue_Tshirt.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Tshirt.jpg/250px-Blue_Tshirt.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Tshirt.jpg/250px-Blue_Tshirt.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>
					<div style="border:1px solid  #36222224;width:250px;height: 280px;border-radius: 5px;">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Tshirt.jpg/250px-Blue_Tshirt.jpg" style="width:247px;height:200px;border-radius:5px" alt="">
						<div style="display: flex;padding: 0 10px;flex-direction: column;line-height: 15px;">
							<p>Just another product name</p>
							<b>$179.00</b>
						</div>
					</div>																														
				</div>								
			</div>
		</div>
	</div>
`
}

