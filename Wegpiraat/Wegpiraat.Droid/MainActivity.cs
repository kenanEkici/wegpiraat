using System;
using Prism.DryIoc;
using DryIoc;
using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;

namespace Wegpiraat.Droid
{
    [Activity(Label = "Wegpiraat", Icon = "@drawable/icon", Theme = "@style/splashscreen", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
    {
        protected override void OnCreate(Bundle bundle)
        {
            try
            {
                base.OnCreate(bundle);
                global::Xamarin.Forms.Forms.Init(this, bundle);
                LoadApplication(new App(new AndroidInitializer()));
            }
            catch (Exception ex)
            {
                
            }
        }

        protected override void OnApplyThemeResource(global::Android.Content.Res.Resources.Theme theme, int resid, bool first)
        {
            base.OnApplyThemeResource(theme, Resource.Style.AppTheme, first);
        }
    }

    public class AndroidInitializer : IPlatformInitializer
    {
        public void RegisterTypes(IContainer container)
        {

        }
    }
}
