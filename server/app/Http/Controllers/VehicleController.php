<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class VehicleController extends Controller
{
    public function getOficialVehicles()
    {
        $vehicles = DB::select("SELECT * FROM vehicles WHERE vehicle_type_id = 2");

        return $vehicles;
    }

    public function getOficialResidents()
    {
        $vehicles = DB::select("SELECT * FROM vehicles WHERE vehicle_type_id = 1");

        return $vehicles;
    }

    public function getVehicleType($vehicle_id)
    {
        $vehicle_type = DB::select('SELECT vehicles_type.name FROM vehicles INNER JOIN vehicles_type ON vehicles.vehicle_type_id = vehicles_type.id WHERE vehicles.id = ?', [$vehicle_id]);

        return $vehicle_type;
    }

    public function store(Request $request)
    {
        $vehicle = new Vehicle();
        $vehicle->id = $request->id;
        $vehicle->total_time = $request->total_time;
        $vehicle->month_payment = $request->month_payment;
        $vehicle->vehicle_type_id = $request->vehicle_type_id;
        $vehicle->save();
    }
}
