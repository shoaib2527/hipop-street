package com.goigi.android.hiphopstreet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; // <-- Add this line
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage; 
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import cl.json.RNSharePackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.johnsonsu.rnsoundplayer.RNSoundPlayerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFSPackage() ,
            new RNDateTimePickerPackage(),
            new TrackPlayer(),
            new SplashScreenReactPackage(),
            new ReactNativePushNotificationPackage(),
            new RNCWebViewPackage(),
            new ReactVideoPackage(),
            new RNSharePackage(),
            new ReactSliderPackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(),
            new DocumentPickerPackage(),
            new ImagePickerPackage(),
            new RNDeviceInfo(),
            new AsyncStoragePackage(),
            new RNSoundPlayerPackage(),
          new RNGestureHandlerPackage(),
          new RNFirebasePackage(),
          new RNFirebaseMessagingPackage(), // <-- Add this line
          new RNFirebaseNotificationsPackage(),
          new RNFirebaseLinksPackage(),
          new SafeAreaContextPackage(),
          new RNFirebaseAdMobPackage()
      );
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

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
