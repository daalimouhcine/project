<?php

namespace App\Http\Controllers;

use App\Models\BU;
use App\Http\Requests\StoreBURequest;
use App\Http\Requests\UpdateBURequest;

class BUController extends Controller
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
     * @param  \App\Http\Requests\StoreBURequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBURequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BU  $bU
     * @return \Illuminate\Http\Response
     */
    public function show(BU $bU)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BU  $bU
     * @return \Illuminate\Http\Response
     */
    public function edit(BU $bU)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBURequest  $request
     * @param  \App\Models\BU  $bU
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBURequest $request, BU $bU)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BU  $bU
     * @return \Illuminate\Http\Response
     */
    public function destroy(BU $bU)
    {
        //
    }
}
