<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\Reservation;
use App\Http\Requests\StorePlaceRequest;
use App\Http\Requests\UpdatePlaceRequest;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StorePlaceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePlaceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function edit(Place $place)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePlaceRequest  $request
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePlaceRequest $request, Place $place)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        //
    }

    // show places depends on reservation table date and equipe id 
    public function showPlaces(Request $request)
    {
       // select Reservation Date 
       $reservation = Reservation::where('date', $request->date)->get();
      // select collaborateur id equipe on Reservation table
        $collaborateur = Reservation::where('collaborateur_id', $request->collaborateur_id)->get();

       // select places equipe id 
         $places = Place::where('equipe_id', $request->equipe_id)->get();
            // check if reservation exist
            if (!$reservation) {
                return response()->json([
                    'message' => 'reservation not found',
                    'error' => 'true',
                    'results' => 'false'

                ], 404);
            }else {
                // check if places exist
                if (!$places) {
                    return response()->json([
                        'message' => 'places not found',
                        'error' => 'true',
                        'results' => 'false'

                    ], 404);
                }else {
                    // check if reservation and places exist
                    if (!$reservation && !$places) {
                        return response()->json([
                            'message' => 'reservation and places not found',
                            'error' => 'true',
                            'results' => 'false'

                        ], 404);
                    }else {
                        // check if reservation and places exist
                        if ($reservation && $places) {
                            return response()->json([
                                'message' => 'success',
                                'data' => $places,
                                'reserve' => $reservation,
                                'error' => 'false',
                                'results' => 'true'

                            ], 200);
                        }
                    }
                }
            }

    }


    public function placesTeam(){
        //show places depends on equipe id and date on reservation table 
        $places = Place::where('equipe_id', $request->equipe_id)->get();
        // check if places exist
        if (!$places) {
            return response()->json([
                'message' => 'places not found',
                'error' => 'true',
                'results' => 'false'

            ], 404);
        }else {
            // check if places exist
            if ($places) {
                return response()->json([
                    'message' => 'success',
                    'data' => $places,
                    'error' => 'false',
                    'results' => 'true'

                ], 200);
            }
        }
        

    }
}
