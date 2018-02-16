using Newtonsoft.Json;
using SQLite.Net.Attributes;
using System.ComponentModel;

namespace Wegpiraat.Data.Datalayer.Domain 
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
        
        protected virtual void OnPropertyChanged(string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
