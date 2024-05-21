<?php

namespace App\Http\Controllers;

use App\Models\Equipe;
use App\Models\Manager;
use App\Models\Collaborateur;
use App\Http\Requests\StoreEquipeRequest;
use App\Http\Requests\UpdateEquipeRequest;
use Illuminate\Http\Request;


class EquipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return response()->json([
            'message' => 'success',
            'data' => Equipe::All(),
            'error' => 'false',
            'results' => 'true'
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEquipeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEquipeRequest $request)
    {
        $collaborateur = new Equipe();
        $collaborateur->name = $request->input('nom');
        $collaborateur->nb_places = $request->input('nb_places');
        $collaborateur->save();
        return response()->json([
            'status'=>200,
            'message'=>'avec success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Equipe  $equipe
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Equipe = Equipe::where('id',$id)->get();

        if (!$Equipe) {
            return response()->json([
                'message' => "équipe n'existe pas",
                'error' => 'true',
                'results' => 'false'
            ], 404);
        } else {
            return response()->json([
                'message' => 'équipe exist',
                'status' => 200,
                'Equipe' => $Equipe
            ],200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Equipe  $equipe
     * @return \Illuminate\Http\Response
     */
    public function edit(Equipe $equipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEquipeRequest  $request
     * @param  \App\Models\Equipe  $equipe
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEquipeRequest $request, Equipe $equipe)
    {
        // check if equipe exist
        $equipe = Equipe::find($equipe->id_equipe);
        if (!$equipe) {
            return response()->json([
                'message' => 'equipe not found',
                'error' => 'true',
                'results' => 'false'
            ], 404);
        }
        $equipe->update($request->all());
        return response()->json([
            'message' => 'equipe updated',
            'error' => 'false',
            'results' => $equipe
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Equipe  $equipe
     * @return \Illuminate\Http\Response
     */
    public function destroy(Equipe $equipe)
    {
        //
    }

    // get manager and collaborators of an equipe

}
