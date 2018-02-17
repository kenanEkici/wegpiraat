using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.Support.V7.App;

namespace Wegpiraat.Droid
{
    [Activity(MainLauncher = false, NoHistory = true)]
    public class SplashActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
    {
        static readonly string TAG = "X:" + typeof(SplashActivity).Name;

        public override void OnCreate(Bundle bundle, PersistableBundle persistentState)
        {
            base.OnCreate(bundle, persistentState);
            global::Xamarin.Forms.Forms.Init(this, bundle);
        }

        // Launches the startup task
        protected override void OnResume()
        {
            global::Xamarin.Forms.Forms.Init(this, null);
            LoadApplication(new App(new AndroidInitializer()));
            StartActivity(new Intent(Application.Context, typeof(MainActivity)));
        }
    }
}