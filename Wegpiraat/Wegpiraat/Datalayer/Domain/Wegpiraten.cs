using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wegpiraat.Datalayer.Domain
{
    public class Wegpiraten : INotifyPropertyChanged
    {
        private string _id;
        [JsonProperty("_id")]
        public string Id
        {
            get { return _id; }
            set
            {
                _id = value;
                OnPropertyChanged(nameof(Id));
            }
        }
        
        private string _title;
        [JsonProperty("title")]
        public string Title
        {
            get { return _title; }
            set
            {
                _title = value;
                OnPropertyChanged(nameof(Title));
            }
        }

        private string _description;
        [JsonProperty("description")]
        public string Description
        {
            get { return _description; }
            set
            {
                _description = value;
                OnPropertyChanged(nameof(Description));
            }
        }

        private DateTime _createdAt;
        [JsonProperty("createdAt")]
        public DateTime CreatedAt
        {
            get { return _createdAt; }
            set
            {
                _createdAt = value;
                OnPropertyChanged(nameof(CreatedAt));
            }
        }

        private bool _isLiked;
        public bool IsLiked
        {
            get { return _isLiked; }
            set
            {
                _isLiked = value;
                OnPropertyChanged(nameof(LikeImage));
            }
        }

        public string _likeImage;

        public string LikeImage
        {
            get { return _likeImage = _isLiked ? "love" : "unlove"; }
        }

        private string _owner;
        [JsonProperty("owner")]
        public string Owner
        {
            get { return _owner; }
            set
            {
                _owner = value;
                OnPropertyChanged(nameof(Owner));
            }
        }

        private Uri _imageSource = new Uri("https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=940&h=650&auto=compress&cs=tinysrgb");
        public Uri ImageSource
        {
            get { return _imageSource; }
            set
            {
                _imageSource = value;
                OnPropertyChanged(nameof(ImageSource));
            }
        }

        private List<Like> _likes;
        [JsonProperty(PropertyName = "likes")]
        public List<Like> Likes
        {
            get { return _likes; }
            set
            {
                _likes = value;
                LikesCount = _likes.Count;
                OnPropertyChanged(nameof(Likes));
            }
        }

        private List<Comment> _comments;
        [JsonProperty(PropertyName = "comments")]
        public List<Comment> Comments
        {
            get { return _comments; }
            set
            {
                _comments = value;
                CommentsCount = _comments.Count;
                OnPropertyChanged(nameof(Comments));
            }
        }

        private int _likesCount;
        public int LikesCount
        {
            get
            {
                return _likesCount;
            }
            set
            {
                _likesCount = value;
                OnPropertyChanged(nameof(LikesCount));
            }
        }

        public string CommentsCount
        {
            get { return Comments.Count.ToString(); }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }


    }
}
