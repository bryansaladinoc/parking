<?php

use App\Http\Controllers\StayController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehiclesTypeController;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/stay', [StayController::class, 'index']);
Route::post('/stay/entry', [StayController::class, 'registerEntry']);
Route::put('/stay/exit', [StayController::class, 'registerExit']);
Route::get('/restart-month', [StayController::class, 'restartMonth']);

Route::get('/vehicle/type/{vehicle_id}', [VehicleController::class, 'getVehicleType']);
Route::post('/vehicle/add', [VehicleController::class, 'store']);
Route::get('/vehicles-oficial', [VehicleController::class, 'getOficialVehicles']);
Route::get('/vehicles-residents', [VehicleController::class, 'getOficialResidents']);
