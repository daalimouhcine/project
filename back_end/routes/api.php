<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use \App\Http\Controllers\CollaborateurController;

use App\Http\Controllers\ManagerController;
use App\Http\Controllers\EquipeController;
use App\Http\Controllers\RhController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\DemandeController;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//collaborateur routes
Route::apiResource("collaborateurs",CollaborateurController::class);
Route::get('collaborateurs-search/{nom}',[CollaborateurController::class,"search"]);
Route::get('collaborateurs-equipe/{id}',[CollaborateurController::class,"getEquipe"]);
Route::get('/collab/{id}',[CollaborateurController::class,'COUNT_equipe']);
Route::get('/collabParEquipe/{id_equipe}',[CollaborateurController::class,'collabParEquipe']);
Route::post('/collabCalander',[CollaborateurController::class,'Status_Collab']);
Route::post('/collabChart',[CollaborateurController::class,'status_Jours']);
//end collaborateur routes



//manager routes
Route::apiResource('managers', ManagerController::class);
Route::get('/managers-equipes/{id}',[ManagerController::class,'all']);
Route::post('/managers-storeEquipe',[ManagerController::class,'storeEquipe']);
//end manager routes

//equipe routes
Route::apiResource('equipes', EquipeController::class);
//end equipe routes




//reservation routes
Route::apiResource('reservations', ReservationController::class);
Route::post('reservations-places',[ReservationController::class,'gR']);
//end reservation routes

//demande routes
Route::apiResource('demandes', DemandeController::class);
Route::post('demandes-equipes',[DemandeController::class,'getEquipesDemandes']);
Route::get('demandes-equipes',[DemandeController::class,'index']);
//end demande routes



//rh routes
Route::apiResource('rh',RhController::class);
Route::post('/statusSemain',[RhController::class,'statusSemain']);
//end rh routes




