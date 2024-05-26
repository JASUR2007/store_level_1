<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
 
Route::get('/assosiy', function () {
    return response()->file(public_path('assosiy.blade.php'));
});

Route::get('/login', function () {
    return response()->file(public_path('login.blade.php'));
});


Route::post('/create-category', function () {
    DB::table('category') ->insert([
        'title' => request('title'),
        'slug' => request("slug"), 
        'parent' => request("parent"),   
        'description' => request("description")   
    ]);
return json_encode(['status' => 'ok']);    

})->middleware('auth');
Route::get('/category', function () {
    $table = DB::table('category') ->get();   
        
    return json_encode(['status' => 'ok','categories' => $table]);    

})->middleware('auth');
Route::get('/orders',function(){
    $table = DB::table("orders")->get();
    return json_encode(['status' => 'ok', 'orders' => $table]);
});
Route::get('/broker', function(){
    $table = DB::table("seller")->get();
    return json_encode(['status' => 'ok', "brokers" => $table]);
});



Route::post('/create-store', function (Request $request) {

    DB::table('products') ->insert([
        'title' => request('title'),
        'price' => request("price"), 
        'info' => request("info"),   
        'category' => request("category"),
        'tg_link' => request("tg_link"),   
        'v_link' => request("v_link"),     
        'amount' => request("amount"),   
        'images' => request('images')
    ]);
    return json_encode(['status' => 'ok']);    
})
// ->middleware('auth')
;

Route::get('/store', function () {
    $table = DB::table('products') ->get();   
    return json_encode(['status' => 'ok','products' => $table]);    
});

Route::get('/store/{id}', function ($id) {

    $table = DB::table('products')->where('id',$id)->get();   
    return json_encode(['status' => 'ok','products' => $table]);    
})
// ->middleware('auth')
;

Route::post('/upload-image', function (Request $request) {
    $link = $request->file('photo')->store('product');
    return json_encode(['status' => 'ok', "data" => $link]);  
})->middleware('auth');



Route::post('/update-product', function () {
    DB::table('products')->where('id',request('id'))->update([
        'title' => request('title'),
        'price' => request("price"),
        'category' => request("category"),   
        'images' => request('images')
    ]);
    return json_encode(['status' => 'ok!']);
})
// ->middleware('auth')
;

Route::post('/delete_product/{id}', function ($id) {
     DB::table('products')->where('id',request("id"))->delete();   
    return json_encode(['status' => 'deleted!']);  
})
// ->middleware('auth')
;

Route::get('/assosiy', function () {
    return view('assosiy');
});

Route::get('/login', function () {
    return view('register');
});

Route::post('/register_save', function (Request $request) {
    DB::table('users') ->insert([
        'name' => request('name'),
        'surname' => request("surname"), 
        'email' => request("email"),   
        'password' => request("password"),   
    ]);
    return json_encode(['status' => 'ok']);    
});

Route::post('/login', function () {

    $check = DB::table('users')->where('email',request("email"))->where('password',request("password"))->exists();

    if($check) {
        $user = DB::table('users')->where('email',request("email"))->where('password',request("password"))->first();

        Auth::loginUsingId($user->id);
    }

    return response()->json([
        "status" => $check ? "ok" : "none"
    ]);

})->name('login');

Route::post('/logout-system', function () {

   Auth::logout();

   return redirect()->to('/assosiy');

})
// ->middleware('auth')
;






















Route::get('/{any}', function () {
    return view('themain');
})->where('any', '.*');
