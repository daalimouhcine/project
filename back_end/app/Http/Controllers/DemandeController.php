<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use App\Models\Collaborateur;
use App\Models\Equipe;
use App\Models\Reservation;

use App\Http\Requests\StoreDemandeRequest;
use App\Http\Requests\UpdateDemandeRequest;
use Illuminate\Http\Request;


class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $demande = Demande::latest();
        return response()->json([
            'message' => 'success',
            'data' => $demande->get(),
            'error' => 'false',
            'results' => 'true'
        ], 200);
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
     * @param  \App\Http\Requests $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'type' => 'required',
            'message' => 'required',
            'date' => 'required',
            'collaborateur_id' => 'required',
            'manager_id' => 'required',
        
            
        ]);
        //store demandes 
        return response()->json([
            Demande::create($request->all())
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Demande  $demande
     * @return \Illuminate\Http\Response
     */
    public function show(Demande $demande)
    {
        
        $demande = Demande::find($demande->id);
        //check if demande exist
        return response()->json([
            'message' => 'success',
            'data' => $demande,
            'error' => 'false',
            'results' => 'true'
        ], 200);

    }
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Demande  $demande
     * @return \Illuminate\Http\Response
     */
    public function edit(Demande $demande)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDemandeRequest  $request
     * @param  \App\Models\Demande  $demande
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Demande $demande)
    {
       $demande = Demande::find($demande->id);
        if (!$demande) {
            return response()->json([
                'message' => 'demande not found',
                'error' => 'true',
                'results' => 'false'
            ], 404);
        }
        $demande->update($request->all());
        return response()->json([
            'message' => 'demande updated',
            'error' => 'false',
            'results' => $demande
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Demande  $demande
     * @return \Illuminate\Http\Response
     */
    public function destroy(Demande $demande)
    {
        $demande = Demande::find($demande->id);
        if (!$demande) {
            return response()->json([
                'message' => 'demande not found',
                'error' => 'true',
                'results' => 'false'
            ], 404);
        }
        $demande->delete();
        return response()->json([
            'message' => 'demande deleted',
            'error' => 'false',
            'results' => 'true'
        ], 200);
    }

    /**
 * *this method is for getting demandes only for one Equipe(team)
 */
    public function getEquipesDemandes(Request $request)
    {
        $collaborateur = Equipe::find($request->equipe_id)->collaborateurs;
        //demandes of equipe
        $demande = Demande::whereIn('collaborateur_id', $collaborateur->pluck('id'))->join("collaborateurs", function ($join) {

            $join->on("collaborateurs.id", "=", "demandes.collaborateur_id");
        })->select('demandes.id','date','nom','prenom','email','message','image','phone','type')->get();
        return response()->json([
            'message' => 'success',
            'data' => $demande,
            'error' => 'false',
            'results' => 'true'
        ], 200);
    }
  
}
