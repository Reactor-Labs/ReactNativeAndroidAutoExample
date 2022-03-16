package com.reactnativeandroidautoexample

import android.content.Context
import androidx.lifecycle.Lifecycle
import com.mapbox.androidauto.MapboxCarInitializer
import com.mapbox.androidauto.MapboxCarOptions
import com.mapbox.maps.MapInitOptions
import com.mapbox.maps.Style

class ExampleCarInitializer : MapboxCarInitializer {

    override fun create(lifecycle: Lifecycle, context: Context): MapboxCarOptions {
        val mapInitOptions = MapInitOptions(context)
        return MapboxCarOptions.Builder(mapInitOptions)
            .mapDayStyle(CUSTOM_STYLE)
            .mapNightStyle(CUSTOM_STYLE)
            .replayEnabled(ENABLE_REPLAY)
            .build()
    }

    companion object {
        const val ENABLE_REPLAY = false
        // TODO: uncomment below for production
        //const val CUSTOM_STYLE = "mapbox://styles/partnerpartners/cl0h9xrvj001014mg0crf0hpq"
        const val CUSTOM_STYLE = "mapbox://styles/bgervan/cl0sf8fb7001c14pozzdf4xcv"
        const val DAY_STYLE = Style.DARK
        const val NIGHT_STYLE = Style.DARK
    }
}
