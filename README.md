# React Native Android Auto Example

Use this example to create a React Native Android Auto app.

## Getting Started

Before starting make sure to have a Mapbox access token and a secret download token. These can be retrieved 
from your Mpabox account page. The secret download token starts with “sk.“, access token starts with “pk.”

Create a `mapbox_access_token.xml` in `app/src/main/res/values`

Add the following res file to your app. Remember to replace YOUR_ACCESS_TOKEN_HERE with your access token.

```
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools">
    <string name="mapbox_access_token">YOUR_ACCESS_TOKEN_HERE</string>
</resources>
```

Add your secret token your gradle.properties file:

If you dont have one create it:

```
$ touch ~/.gradle/gradle.properties
```

```
MAPBOX_DOWNLOADS_TOKEN=YOUR_SECRET_MAPBOX_ACCESS_TOKEN
```

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

Also add the required permissions

```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

  <!-- For PlaceListMapTemplate -->
  <uses-permission android:name="androidx.car.app.MAP_TEMPLATES"/>
  <!-- For NavigationTemplate -->
  <uses-permission android:name="androidx.car.app.ACCESS_SURFACE"/>
  <uses-permission android:name="androidx.car.app.NAVIGATION_TEMPLATES"/>


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
    ...
     dependencies {
        ...
        classpath "com.android.tools.build:gradle:7.0.3"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.21"
        classpath "com.mapbox.gradle.plugins:access-token:0.2.1"
     }
    ...

    allprojects {
        repositories {
            maven {
                url 'https://api.mapbox.com/downloads/v2/releases/maven'
                authentication {
                    basic(BasicAuthentication)
                }
                credentials {
                    // Do not change the username below.
                    // This should always be `mapbox` (not your username).
                    username = "mapbox"
                    // Use the secret token you stored in gradle.properties as the password
                    password = project.hasProperty('MAPBOX_DOWNLOADS_TOKEN') ? project.property('MAPBOX_DOWNLOADS_TOKEN') : System.getenv('MAPBOX_DOWNLOADS_TOKEN')
                }
            }
        }
    }

    ...
```

Update your gradle version in gradle-wrapper.properties

```
...
distributionUrl=https\://services.gradle.org/distributions/gradle-7.0.2-all.zip
...

```

Add the following to your app leve `build.gradle` file:

```
apply plugin: "com.android.application"

...

android {
    ...
    packagingOptions {
        pickFirst '**/*.so'
    }
}

dependencies {
    ...
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.0"
}

```


Make the following changes to your MainApplication.java

`android/app/src/main/java/com/reactnativeandroidautoexample/MainApplication.java`

```
...
import com.mapbox.android.core.location.LocationEngine;
import com.mapbox.android.core.location.LocationEngineProvider;
import com.mapbox.androidauto.CarAppServicesProviderImpl;
import com.mapbox.androidauto.MapboxCarApp;
import com.mapbox.androidauto.MapboxCarInitializer;
import com.mapbox.navigation.base.options.NavigationOptions;
import com.mapbox.navigation.lifecycle.MapboxNavigationApp;
import com.mapbox.search.MapboxSearchSdk;
...

public class MainApplication extends Application implements ReactApplication {
    ...
    private void initializeSearchSDK() {
        LocationEngine locationEngine = LocationEngineProvider.getBestLocationEngine(getApplicationContext());
        MapboxSearchSdk.initialize(
                this,
                getString(R.string.mapbox_access_token),
                locationEngine
        );
    }


    @Override
    public void onCreate() {
        super.onCreate();
        ...
        
        initializeSearchSDK();

        // Setup MapboxNavigation
        NavigationOptions.Builder navOptions = new NavigationOptions.Builder(getApplicationContext());
        navOptions.accessToken(getString(R.string.mapbox_access_token));
        MapboxNavigationApp.INSTANCE.setup(navOptions.build()).attachAllActivities();
        MapboxNavigationApp.INSTANCE.registerObserver(new ReplayNavigationObserver());

        MapboxCarInitializer mapboxCarInitializer = new RNCarInitializer();
        // Setup android auto
        MapboxCarApp.INSTANCE.setup(this, mapboxCarInitializer, new CarAppServicesProviderImpl());
    }

    ...

}


```


You will also need the following files

`android/app/src/main/java/com/reactnativeandroidautoexample/RNCarInitializer.kt`

```
package com.reactnativeandroidautoexample

import android.content.Context
import androidx.lifecycle.Lifecycle
import com.mapbox.androidauto.MapboxCarInitializer
import com.mapbox.androidauto.MapboxCarOptions
import com.mapbox.maps.MapInitOptions
import com.mapbox.maps.Style

class RNCarInitializer : MapboxCarInitializer {

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

`android/app/src/main/java/com/reactnativeandroidautoexample/ReplayNavigationObserver.kt

```
package com.reactnativeandroidautoexample

import com.mapbox.navigation.base.ExperimentalPreviewMapboxNavigationAPI
import com.mapbox.navigation.core.MapboxNavigation
import com.mapbox.navigation.core.replay.route.ReplayProgressObserver
import com.mapbox.navigation.lifecycle.MapboxNavigationObserver

@OptIn(ExperimentalPreviewMapboxNavigationAPI::class)
class ReplayNavigationObserver : MapboxNavigationObserver {
    private lateinit var replayProgressObserver: ReplayProgressObserver
    private lateinit var replayRoutesObserver: ReplayRoutesObserver

    override fun onAttached(mapboxNavigation: MapboxNavigation) {
        if (RNCarInitializer.ENABLE_REPLAY) {
            val mapboxReplayer = mapboxNavigation.mapboxReplayer
            val applicationContext = mapboxNavigation.navigationOptions.applicationContext
            replayProgressObserver = ReplayProgressObserver(mapboxReplayer)
            replayRoutesObserver = ReplayRoutesObserver(mapboxReplayer, applicationContext)
            mapboxNavigation.registerRouteProgressObserver(replayProgressObserver)
            mapboxNavigation.registerRoutesObserver(replayRoutesObserver)
        }
    }

    override fun onDetached(mapboxNavigation: MapboxNavigation) {
        mapboxNavigation.unregisterRouteProgressObserver(replayProgressObserver)
        mapboxNavigation.unregisterRoutesObserver(replayRoutesObserver)
    }
}

```

`android/app/src/main/java/com/reactnativeandroidautoexample/ReplayRoutesObserver.kt`

```
package com.reactnativeandroidautoexample

import android.content.Context
import com.mapbox.navigation.core.MapboxNavigationProvider
import com.mapbox.navigation.core.directions.session.RoutesObserver
import com.mapbox.navigation.core.directions.session.RoutesUpdatedResult
import com.mapbox.navigation.core.replay.MapboxReplayer

class ReplayRoutesObserver(
    val mapboxReplayer: MapboxReplayer,
    val context: Context
) : RoutesObserver {

    override fun onRoutesChanged(result: RoutesUpdatedResult) {
        if (result.routes.isEmpty()) {
            mapboxReplayer.clearEvents()
            MapboxNavigationProvider.retrieve().resetTripSession()
            mapboxReplayer.pushRealLocation(context, 0.0)
            mapboxReplayer.play()
        }
    }
}
```

To run: 

```
$ yarn
$ npx react-native run-android
```