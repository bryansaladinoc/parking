<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stay;
use Hamcrest\Core\HasToString;
use Illuminate\Support\Facades\DB;

class StayController extends Controller
{
    public function index()
    {
        $stay = Stay::all();
        return $stay;
    }

    public function registerEntry(Request $request)
    {
        $stay = new Stay();
        $stay->entry_time = $request->entry_time;
        $stay->vehicle_id = $request->vehicle_id;
        $stay->vehicle_type = $request->vehicle_type;

        return $stay->save();
    }

    public function registerExit(Request $request)
    {
        $vehicle_id = $request->vehicle_id;
        $stay = DB::select('SELECT id, entry_time, vehicle_type FROM stay WHERE vehicle_id = :vehicle_id ORDER BY id DESC LIMIT 1', ['vehicle_id' => $vehicle_id]);

        if ($stay) {
            $vehicle_type = $stay[0]->vehicle_type;
            $entry_time = $stay[0]->entry_time;
            $exit_time = $request->exit_time;


            // Calcular tiempo
            $time = $this->calculateTime($entry_time, $exit_time);

            $payment = $time * 0.5;

            // Vehiculos
            if ($vehicle_type === 'residente') {
                $payment = $time * 0.05;
                DB::update('UPDATE vehicles SET total_time = (total_time + ?), month_payment = (month_payment + ?) WHERE id = ?', [$time, $payment, $vehicle_id]);
                $payment = 0;
            } else if ($vehicle_type === 'oficial') {
                DB::update('UPDATE vehicles SET total_time = (total_time + ?) WHERE id = ?', [$time, $vehicle_id]);
                $payment = 0;
            }

            // Registar el tiempo y costo total de la estancia
            $update = DB::update('UPDATE stay SET exit_time = ?, time = ?, payment = ? WHERE id = ?', [$exit_time, $time, $payment, $stay[0]->id]);

            return $payment;
        }

        return "No existe el registro";
    }


    private function calculateTime($entry_time, $exit_time)
    {
        $time = round(abs(strtotime($entry_time) - strtotime($exit_time)) / 60, 2);

        return $time;
    }

    public function restartMonth() {
        DB::delete('DELETE FROM stay WHERE vehicle_type = "oficial"');
        DB::update('UPDATE vehicles SET total_time = 0, month_payment = 0 WHERE vehicle_type_id = 1');

        return response()->json(["response" => "Reinicio de mes correcto"]);
    }
}
