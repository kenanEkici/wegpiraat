using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Domain
{
    public class Comment
    {
        private string _postId;

        public string PostId
        {
            get { return _postId; }
            set { _postId = value; }
        }

        private string _commentId;

        public string CommentId
        {
            get { return _commentId; }
            set { _commentId = value; }
        }

    }
}
