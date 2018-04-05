using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Domain
{
    public class UserComment
    {
        [JsonProperty("commentId")]
        public string CommentId { get; set; }

        [JsonProperty("postId")]
        public string PostId { get; set; }

        [JsonProperty("_id")]
        public string Id { get; set; }
    }
}
