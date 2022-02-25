package com.reactnativeandroidautoexample;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.mapbox.android.core.location.LocationEngine;
import com.mapbox.android.core.location.LocationEngineProvider;
import com.mapbox.androidauto.CarAppServicesProviderImpl;
import com.mapbox.androidauto.MapboxCarApp;
import com.mapbox.androidauto.MapboxCarInitializer;
import com.mapbox.navigation.base.options.NavigationOptions;
import com.mapbox.navigation.lifecycle.MapboxNavigationApp;
import com.mapbox.search.MapboxSearchSdk;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

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
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    initializeSearchSDK();

    // Setup MapboxNavigation
    NavigationOptions.Builder navOptions = new NavigationOptions.Builder(getApplicationContext());
    navOptions.accessToken(getString(R.string.mapbox_access_token));
    MapboxNavigationApp.INSTANCE.setup(navOptions.build()).attachAllActivities();
    MapboxNavigationApp.INSTANCE.registerObserver(new ReplayNavigationObserver());

    MapboxCarInitializer mapboxCarInitializer = new ExampleCarInitializer();
    // Setup android auto
    MapboxCarApp.INSTANCE.setup(this, mapboxCarInitializer, new CarAppServicesProviderImpl());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.reactnativeandroidautoexample.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
