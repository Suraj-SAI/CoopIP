package com.coop;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      // Broadcast the configuration change to handle it properly
      Intent intent = new Intent("onConfigurationChanged");
      intent.putExtra("newConfig", newConfig);
      this.sendBroadcast(intent);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "coop";
  }

  /**
   * Called when the activity is starting. Add custom logic here.
   */
  @Override
  protected void onCreate(android.os.Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      // Create a notification channel
      NotificationChannel notificationChannel = new NotificationChannel(
          "default_channel",  // Replace with your notification channel name
          "CCTV Alerts",              // Replace with your app name
          NotificationManager.IMPORTANCE_HIGH
      );
      notificationChannel.setShowBadge(true);
      notificationChannel.setDescription(""); // Optional: Add a description

      AudioAttributes att = new AudioAttributes.Builder()
          .setUsage(AudioAttributes.USAGE_NOTIFICATION)
          .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
          .build();

      notificationChannel.setSound(
          Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/dings"),
          att
      );
      notificationChannel.enableVibration(true);
      notificationChannel.setVibrationPattern(new long[]{400, 400});
      notificationChannel.setLockscreenVisibility(androidx.core.app.NotificationCompat.VISIBILITY_PUBLIC);

      // Create the second notification channel (update_channel)
      NotificationChannel updateChannel = new NotificationChannel(
            "update_channel",  // Notification channel ID
            "CCTV Alerts",  // Notification channel name
            NotificationManager.IMPORTANCE_NONE  // Importance level (low for silent notifications)
        );
      updateChannel.setShowBadge(false); // Do not show badges for this channel
      updateChannel.setDescription("Used for app updates or background notifications");
      updateChannel.enableVibration(false); // No vibration
      updateChannel.setSound(null, null); // No sound
      updateChannel.setLockscreenVisibility(androidx.core.app.NotificationCompat.VISIBILITY_SECRET);

      // Register the notification channel with the system
      NotificationManager manager = getSystemService(NotificationManager.class);
      if (manager != null) {
        manager.createNotificationChannel(notificationChannel);
        manager.createNotificationChannel(updateChannel);
      }
    }
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}
