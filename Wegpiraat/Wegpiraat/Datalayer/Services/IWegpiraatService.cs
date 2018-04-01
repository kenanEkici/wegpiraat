using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wegpiraat.Datalayer.Domain;

namespace Wegpiraat.Datalayer.Services
{
    public interface IWegpiraatService
    {
        Task<List<Wegpiraten>> GetAllWegpiraten();
        Task<Wegpiraten> GetWegpiraatById(Wegpiraten wegpiraat);
        Task<List<Wegpiraten>> GetWegpiratenByArrayId(PostsArray ids);
        Task<Wegpiraten> UploadWegpiraat(Wegpiraten wegpiraat);
        Task<Like> LikeWegpiraat(string wegpiraat);
        Task<Comment> CommentOnWegpiraat(Comment comment);
    }
}
