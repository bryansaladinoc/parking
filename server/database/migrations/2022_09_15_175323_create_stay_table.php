<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stay', function (Blueprint $table) {
            $table->id();
            $table->string('entry_time', 8);
            $table->string('exit_time', 8)->nullable();;
            $table->integer('time')->nullable();;
            $table->float('payment')->nullable();;
            $table->string('vehicle_type');
            $table->string('vehicle_id', 7);
            $table->foreign('vehicle_id')
                ->references('id')
                ->on('vehicles')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stay');
    }
}
