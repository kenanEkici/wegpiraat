using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Domain
{
    public class Like
    {
        public string Id { get; set; }
        
        [JsonProperty("likedBy")]
        public string LikedBy { get; set; }

        [JsonProperty("liked")]
        public bool IsLiked { get; set; }
    }
}
