      <b class="app" @click="open()"></b>
<nav class="sidebar_1"> 
         <div class="sidebar-top" style="margin-left: -5px;">

            <img  src="img/logo 1.svg" class="logo hide1" alt="" style="height: 45px;width: 150px;">
            <img  src="img/logo.svg" class="logo hide2" alt="" style="height: 47px;width: 138px;">
        </div>
           <hr style="width: 145%;margin-top: 0px;margin-left:-14px;color: grey;margin: 0rem -14px;color: inherit;background-color: currentColor;
         border: 0;opacity: .1;" class="hide1">
           <hr style="width: 111%;margin-top: 0px;margin-left:-14px;color: grey;" class=" hide">
       <div class="search">
       </div>
       <div class="sidebar-links">
         <ul class="ul_item">
           <div class="active-tab"></div>
            <li class="tooltip-element" data-tooltip="0">
                   <router-link to="/" class="active" data-active="0">
                      <div class="icon">
                     <i class='bx bxs-box'></i>
                     <i class='bx bxs-box'></i>               
                     </div>
                     <span class="link hide"><div>Mahsulotlar</div>
                     </span>
                   </router-link>
                </li>
              <li class="tooltip-element" data-tooltip="1">
                <router-link to="/add_store" data-active="1">
                  <div class="icon">
                  <i class='bx bxs-message-add' ></i>
                  <i class='bx bxs-message-add' ></i>
                  </div>
                  <span class="link hide"><div>Qoshish</div>
                  </span>
                </router-link>
              </li>
              <li class="tooltip-element" data-tooltip="2">
                <router-link to="/category" data-active="2">
                  <div class="icon">
                  <i class='bx bxs-category' ></i>
                  <i class='bx bxs-category' ></i>
                  </div>
                  <span class="link hide"><div>Categories</div>
                  </span>
                </router-link>
              </li>
              <li class="tooltip-element" data-tooltip="3">
                <router-link to="/order" data-active="3">
                  <div class="icon">
                  <i class='bx bxs-cart' ></i>
                  <i class='bx bxs-cart' ></i>
                  </div>
                  <span class="link hide"><div>Orders</div>
                  </span>
                </router-link>
              </li>
              <li class="tooltip-element" data-tooltip="4">
                <router-link to="/order-detail" data-active="4">
                  <div class="icon">
                    <i class='bx bx-message-square-detail'></i>
                    <i class='bx bxs-message-square-detail'></i>
                  </div>
                  <span class="link hide"><div>Order-details</div>
                  </span>
                </router-link>
              </li>
              <li class="tooltip-element" data-tooltip="5">
                <router-link to="/seller" data-active="5">
                  <div class="icon">
                  <i class='bx bx-globe'></i>
                  <i class='bx bx-globe'></i>
                  </div>
                  <span class="link hide"><div>Sotuvchilar</div>
                  </span>
                </router-link>
              </li>       
              <li class="tooltip-element" data-tooltip="6">
                <router-link to="/seller_profile" data-active="6">
                  <div class="icon">
                  <i class='bx bxs-cog'></i>
                  <i class='bx bxs-cog'></i>
                  </div>
                  <span class="link hide"><div>Sotuvchining profili</div>
                  </span>
                </router0link>
              </li>                                                                                     
              <li class="tooltip-element" data-tooltip="7">
                <router-link to="/settings" data-active="7">
                  <div class="icon">
                  <i class='bx bxs-cog'></i>
                  <i class='bx bxs-cog'></i>
                  </div>
                  <span class="link hide"><div>Sozlamalar</div>
                  </span>
                </router0link>
              </li> 
              <div class="tooltip">
                <span class="show">Mahsulotlar</span>
                <span>Qoshish</span>
                <span>Categories</span>
                <span>Order</span>
                <span>Order-details</span>
                <span>Sotuvchilar</span>
                <span>Sotuvchining profili</span>
                <span>Sozlamalar</span>
              </div>
          </ul>
        </div>
     </nav>
            <span class="shrink-btn" @click="open()">
               <div class="openbtn" >
                  <span class="span1"></span>  
                  <span class="span2"></span>
                  <span class="span3"></span>
            </div>  
       </span> 
  