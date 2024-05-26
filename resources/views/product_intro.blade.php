<div style="display:flex;justify-content: center;margin-top:50px;gap:20px">	
	<div class="card" v-for="user of users" :key="user.id">
	  <img :src="parseJson(user.images)" alt="Avatar" style="width:100%;height: 100%;">
	  <div class="container">
	    <h4><b v-text="user.title"></b></h4> 
	    <p>
	    	<span v-text="user.price"></span>
	    	<span>$</span>
	    </p> 
	    	<button class="btn btn-dark" @click="info()">Malumot olish</button>
	  </div>
	</div>	
</div>	