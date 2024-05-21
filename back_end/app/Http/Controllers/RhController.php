<?php

namespace App\Http\Controllers;

use App\Models\Collaborateur;
use App\Models\Reservation;
use App\Models\Rh;
use App\Http\Requests\StoreRhRequest;
use App\Http\Requests\UpdateRhRequest;
use Illuminate\Http\Request;

class RhController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreRhRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRhRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rh  $rh
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $rh = Rh::find($id);
        if (!$rh) {
            return response()->json([
                'message' => "rh n'existe pas",
                'error' => 'true',
                'results' => 'false'
            ], 404);
        } else {

            return response()->json([
                'message' => 'rh exist',
                'status' => 200,
                'results' => $rh
            ],200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rh  $rh
     * @return \Illuminate\Http\Response
     */
    public function edit(Rh $rh)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRhRequest  $request
     * @param  \App\Models\Rh  $rh
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRhRequest $request, Rh $rh)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rh  $rh
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rh $rh)
    {
        //
    }

/**
 * *get the status for each collaborateur in one week 
 */
    public function statusSemain(Request $request)
    {
        $S_id_1 = Reservation::where('date',$request->date[0])->get('collaborateur_id');
        $S_id_2 = Reservation::where('date',$request->date[1])->get('collaborateur_id');
        $S_id_3 = Reservation::where('date',$request->date[2])->get('collaborateur_id');
        $S_id_4 = Reservation::where('date',$request->date[3])->get('collaborateur_id');
        $S_id_5 = Reservation::where('date',$request->date[4])->get('collaborateur_id');
        // return response()->json(['request'=>$request->date]);

        return response()->json([
            'A1' => Collaborateur::whereNotIn('id',$S_id_1)->count(),
            'A2' => Collaborateur::whereNotIn('id',$S_id_2)->count(),
            'A3' => Collaborateur::whereNotIn('id',$S_id_3)->count(),
            'A4' => Collaborateur::whereNotIn('id',$S_id_4)->count(),
            'A5' => Collaborateur::whereNotIn('id',$S_id_5)->count(),
            'S1' => Reservation::where('date',$request->date[0])->count('collaborateur_id'),
            'S2' => Reservation::where('date',$request->date[1])->count('collaborateur_id'),
            'S3' => Reservation::where('date',$request->date[2])->count('collaborateur_id'),
            'S4' => Reservation::where('date',$request->date[3])->count('collaborateur_id'),
            'S5' => Reservation::where('date',$request->date[4])->count('collaborateur_id'),
        ], 200);
    }


}
