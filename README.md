# React Native Android Auto Example

Use this example to create a React Native Android Auto app.

## Getting Started


Add the following lines to your app's `AndroidManifest.xml` file under the `<application></application>` tag:

```
    ...

    <service
        android:name="com.mapbox.examples.androidauto.MainCarAppService"
        android:exported="true"
        android:foregroundServiceType="location">

        <intent-filter>
            <action android:name="androidx.car.app.CarAppService" />
            <category android:name="androidx.car.app.category.NAVIGATION" />
        </intent-filter>
    </service>

    <meta-data
        android:name="androidx.car.app.minCarApiLevel"
        android:value="1" 
    />

    ...
```

Add the CarInitializer.kt

```
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
            .mapDayStyle(DAY_STYLE)
            .mapNightStyle(NIGHT_STYLE)
            .replayEnabled(ENABLE_REPLAY)
            .build()
    }

    companion object {
        const val ENABLE_REPLAY = true
        const val DAY_STYLE = Style.TRAFFIC_DAY
        const val NIGHT_STYLE = Style.TRAFFIC_NIGHT
    }
}

```

Check to your project level build.gradle and make sure the following matches the minimum required versions:

```
buildscript {
    minSdkVersion = 26
    compileSdkVersion = 31
    targetSdkVersion = 31
}
```

Add the following to your project level `build.gradle` file:

```

```


To run: 

```
$ yarn
$ npx react-native run-android
```