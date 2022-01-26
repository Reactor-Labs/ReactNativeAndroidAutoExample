//package com.reactnativeandroidautoexample
//
//import android.app.Application
//import android.content.Context
//import android.util.Log
//import com.facebook.react.PackageList
//import com.facebook.react.ReactApplication
//import com.facebook.react.ReactInstanceManager
//import com.facebook.react.ReactNativeHost
//import com.facebook.react.ReactPackage
//import com.facebook.soloader.SoLoader
//import com.mapbox.android.core.location.LocationEngineProvider
//import com.mapbox.androidauto.MapboxCarApp
//import com.mapbox.navigation.base.options.NavigationOptions
//import com.mapbox.navigation.lifecycle.MapboxNavigationApp
//import com.mapbox.search.MapboxSearchSdk
//import java.lang.reflect.InvocationTargetException
//
//class MainApplication : Application(), ReactApplication {
//    private val mReactNativeHost: ReactNativeHost = object : ReactNativeHost(this) {
//        fun jSMainModuleName(): String{
//            return "index"
//        }
//        override fun getUseDeveloperSupport(): Boolean {
//            return BuildConfig.DEBUG
//        }
//
//        override fun getPackages(): MutableList<ReactPackage> {
//            return PackageList(this).getPackages()
//        }
//    }
//
//    override fun getReactNativeHost(): ReactNativeHost {
//        return mReactNativeHost
//    }
//
//    override fun onCreate() {
//        super.onCreate()
//
//        SoLoader.init(this,  /* native exopackage */false)
//        initializeFlipper(this, reactNativeHost.getReactInstanceManager())
//
//        Log.d("ReactAUTO", "MainApplication onCreate");
//
//        initializeSearchSDK()
//
//        // Setup MapboxNavigation
//        MapboxNavigationApp.setup(
//            NavigationOptions.Builder(applicationContext)
//                .accessToken(getString(R.string.mapbox_access_token))
//                .build()
//        ).attachAllActivities()
//        MapboxNavigationApp.registerObserver(ReplayNavigationObserver())
//
//        // Setup android auto
//        MapboxCarApp.setup(this, ExampleCarInitializer())
//
//    }
//
//    private fun initializeSearchSDK() {
//        val locationEngine = LocationEngineProvider.getBestLocationEngine(applicationContext)
//        MapboxSearchSdk.initialize(
//            this,
//            getString(R.string.mapbox_access_token),
//            locationEngine
//        )
//    }
//
//    companion object {
//        /**
//         * Loads Flipper in React Native templates. Call this in the onCreate method with something like
//         * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
//         *
//         * @param context
//         * @param reactInstanceManager
//         */
//        @JvmStatic
//        fun initializeFlipper(
//            context: Context, reactInstanceManager: ReactInstanceManager
//        ) {
//            if (BuildConfig.DEBUG) {
//                try {
//                    /*
//         We use reflection here to pick up the class that initializes Flipper,
//        since Flipper library is not available in release mode
//        */
//                    val aClass: java.lang.Class<*> =
//                        java.lang.Class.forName("com.reactnativeandroidautoexample.ReactNativeFlipper")
//                    aClass
//                        .getMethod(
//                            "initializeFlipper",
//                            Context::class.java,
//                            ReactInstanceManager::class.java
//                        )
//                        .invoke(null, context, reactInstanceManager)
//                } catch (e: ClassNotFoundException) {
//                    e.printStackTrace()
//                } catch (e: NoSuchMethodException) {
//                    e.printStackTrace()
//                } catch (e: IllegalAccessException) {
//                    e.printStackTrace()
//                } catch (e: InvocationTargetException) {
//                    e.printStackTrace()
//                }
//            }
//        }
//    }
//
//
//}