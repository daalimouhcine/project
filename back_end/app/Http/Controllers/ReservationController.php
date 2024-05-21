<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Place;
use App\Models\Collaborateur;
use App\Models\Equipe;
use App\Models\Demande;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservation = Reservation::latest();
        return response()->json([
            'message' => 'success',
            'data' => $reservation->get(),
            'nomberReservation'=>$reservation->where('date',date('Y-m-d'))->count(),
            'error' => 'false',
            'results' => 'true',
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //create reservation
        // return response()->json([
        //     'message' => 'success',
        //     'data' => Reservation::All(),
        //     'error' => 'false',
        //     'results' => 'true'
        // ], 200);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReservationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'date' => 'required',
            'num_place' => 'required',
            'collaborateur_id' => 'required',

        ]);
        return response()->json([
            Reservation::create($request->all())
        ], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        //check if reservation exist
        $reservation = Reservation::find($reservation->id);
        if (!$reservation) {
            return response()->json([
                'message' => 'reservation not found',
                'error' => 'true',
                'results' => 'false'

            ], 404);

        }else {
            return response()->json([
                'message' => 'reservation detail',
                'code' => '200',
                'error' => 'false',
                'results' => $reservation
            ],200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        //check if the reservation exist
        $reservation = Reservation::find($reservation->id);
        if (!$reservation) {
            return response()->json([
                'message' => 'reservation not found',
                'error' => 'true',
                'results' => 'false'
            ], 404);
        }else {

            $reservation->update($request->all());
            return response()->json([
                'message' => 'success',
                'data' => $reservation,
                'error' => 'false',
                'results' => 'true'
            ], 200);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //delete reservation
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json([
                'message' => 'reservation not found',
                'error' => 'true',
                'results' => 'false'
            ], 404);
        }else {
            $reservation->delete();
            return response()->json([
                'message' => 'reservation deleted',
                'error' => 'false',
                'results' => $reservation
            ], 200);
        }
    }

    // get reservations depends on equipe id and date

    public function gR(Request $request) {

 /**
 *  * get collaborateur's team (equipe) 
 * we create two array to strore result , one for reservations and other for demqndes 
 */
    $collaborateur = Equipe::find($request->equipe_id)->collaborateurs;
    $resultRes = [];
    $resultDem = [];
    for ($i=0; $i < count($collaborateur); $i++) {

        $reservation = Reservation::where('collaborateur_id', $collaborateur[$i]->id)->where('date', $request->date)->get();
        $demande = Demande::where('collaborateur_id', $collaborateur[$i]->id)->where('date', $request->date)->get();
        // we store the data in a array by function push 
        array_push($resultRes, $reservation);
        array_push($resultDem, $demande);
        // if array is empty we ignore it
        if(count($resultRes[$i]) === 0){
            unset($resultRes[$i]);
        }
        if(count($resultDem[$i]) === 0){
            unset($resultDem[$i]);
        }

    }
    // if array is filled we strore the result in one array by the function array merge 
    if(count($resultRes) > 0 || count($resultDem) > 0){
        $result = array_merge($resultRes,$resultDem);

       return response()->json([
       'message' => 'success',
       'data' => $result,
       'error' => 'false',
       'results' => 'true'
       ], 200);
    
   }else {
       return response()->json([
       'message' => 'no reservation and no demande',
       'reservation' => [],
       'error' => 'true',
       'results' => 'false'
       ], 200);
   }



}}
