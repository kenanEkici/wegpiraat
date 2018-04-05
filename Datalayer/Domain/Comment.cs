using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Domain
{
    public class Comment
    {
        public string PostId { get; set; }

        [JsonProperty("_id")]
        public string CommentId { get; set; }

        [JsonProperty("commentData")]
        public string CommentData { get; set; }

        [JsonProperty("postedBy")]
        public string PostedBy { get; set; }

        [JsonProperty("postedAt")]
        public DateTime PostedAt { get; set; }
    }
}
