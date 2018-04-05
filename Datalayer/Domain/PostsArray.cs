using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Domain
{
    public class PostsArray
    {
        private List<string> _IdArray;

        [JsonProperty("idArr")]
        public List<string> IdArray
        {
            get { return _IdArray; }
            set { _IdArray = value; }
        }

    }
}
