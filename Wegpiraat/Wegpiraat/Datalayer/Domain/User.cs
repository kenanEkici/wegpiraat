using Newtonsoft.Json;
using SQLite.Net.Attributes;
using System.Collections.Generic;
using System.ComponentModel;

namespace Wegpiraat.Datalayer.Domain 
{
    [Table("Users")]
    public class User : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        [Ignore]
        public Tokens Tokens { get; set; }

        [PrimaryKey, AutoIncrement, Column("_id")]
        public int Id { get; set; }

        private string _email;
        [JsonProperty(PropertyName = "email")]
        public string Email
        {
            get => _email;
            set
            {
                _email = value;
                OnPropertyChanged(nameof(Email));
            }
        }

        private string _username;
        [JsonProperty(PropertyName = "username")]
        public string Username
        {
            get => _username;
            set
            {
                _username = value;
                OnPropertyChanged(nameof(Username));
            }
        }

        private string _password;
        [JsonProperty(PropertyName = "password")]
        public string Password
        {
            get { return _password; }
            set
            {
                _password = value;
                OnPropertyChanged(nameof(Password));
            }
        }

        private string _confirmPassword;
        [JsonProperty(PropertyName = "confirm")]
        public string ConfirmPassword
        {
            get { return _confirmPassword; }
            set
            {
                _confirmPassword = value;
                OnPropertyChanged(nameof(ConfirmPassword));
            }
        }

        private string _token;
        [JsonProperty(PropertyName = "token")]
        public string Token
        {
            get { return _token; }
            set
            {
                _token = value;
                OnPropertyChanged(nameof(Token));
            }
        }

        private string _firstName;
        [JsonProperty(PropertyName = "firstname")]
        public string FirstName
        {
            get => _firstName;
            set
            {
                _firstName = value;
                OnPropertyChanged(nameof(FirstName));
            }
        }

        private string _lastName;
        [JsonProperty(PropertyName = "lastname")]
        public string LastName
        {
            get => _lastName;
            set
            {
                _lastName = value;
                OnPropertyChanged(nameof(LastName));
            }
        }

        private List<string> _likes;
        [JsonProperty(PropertyName = "likes")]
        [Ignore]
        public List<string> Likes
        {
            get { return _likes; }
            set
            {
                _likes = value;
                OnPropertyChanged(nameof(Likes));
            }
        }

        private List<string> _posts;
        [JsonProperty(PropertyName = "posts")]
        [Ignore]
        public List<string> Posts
        {
            get { return _posts; }
            set
            {
                _posts = value;
                OnPropertyChanged(nameof(Posts));
            }
        }

        private List<string> _comments;
        [JsonProperty(PropertyName = "comments")]
        [Ignore]
        public List<string> Comments
        {
            get { return _comments; }
            set
            {
                _comments = value;
                OnPropertyChanged(nameof(Comments));
            }
        }

        protected virtual void OnPropertyChanged(string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
