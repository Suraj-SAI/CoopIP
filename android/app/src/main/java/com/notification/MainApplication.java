package com.coop;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;


import java.security.cert.CertificateException;
import java.util.ArrayList;

import java.util.List;

import java.util.concurrent.TimeUnit;


import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.CipherSuite;
import okhttp3.ConnectionSpec;
import okhttp3.OkHttpClient;
import okhttp3.TlsVersion;
import android.util.Log;

import org.wonday.orientation.OrientationActivityLifecycle;

class CustomClientFactory implements OkHttpClientFactory {
  private static final String TAG = "OkHttpClientFactory";
  @Override
  public OkHttpClient createNewNetworkModuleClient() {
      try {
          // Create a trust manager that does not validate certificate chains
          final TrustManager[] trustAllCerts = new TrustManager[]{
                  new X509TrustManager() {
                      @Override
                      public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                      }

                      @Override
                      public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                      }

                      @Override
                      public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                          return new java.security.cert.X509Certificate[]{};
                      }
                  }
          };

          // Install the all-trusting trust manager
          final SSLContext sslContext = SSLContext.getInstance("SSL");
          sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
          // Create an ssl socket factory with our all-trusting manager
          final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();



          OkHttpClient.Builder builder = new OkHttpClient.Builder()
                  .connectTimeout(0, TimeUnit.MILLISECONDS).readTimeout(0, TimeUnit.MILLISECONDS)
                  .writeTimeout(0, TimeUnit.MILLISECONDS).cookieJar(new ReactCookieJarContainer());
          builder.sslSocketFactory(sslSocketFactory, (X509TrustManager) trustAllCerts[0]);
          builder.hostnameVerifier(new HostnameVerifier() {
              @Override
              public boolean verify(String hostname, SSLSession session) {
                  return true;
              }
          });

          OkHttpClient okHttpClient = builder.build();
          return okHttpClient;
      } catch (Exception e) {
//            Log.e(TAG, e.getMessage());
          Log.e(TAG,e.getMessage());
          throw new RuntimeException(e);
      }
    }

}

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
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

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
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
    OkHttpClientProvider.setOkHttpClientFactory(new CustomClientFactory());
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance());
  }
}
