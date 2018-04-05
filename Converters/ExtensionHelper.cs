using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Converters
{
    public static class ExtensionHelper
    {
        public static ObservableCollection<T> ToObservableCollection<T>(this IEnumerable<T> coll)
        {
            var c = new ObservableCollection<T>();
            if (coll != null)
            {
                foreach (var e in coll)
                    c.Add(e);
                return c;
            }
            return null;
        }
    }
}
