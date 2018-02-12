using Newtonsoft.Json;
using SQLite.Net.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Wegpiraat.Data.Datalayer.Domain
{
    [Table("Tokens")]
    public class Tokens
    {
        [PrimaryKey, AutoIncrement, Column("_id")]
        public int Id { get; set; }

        private string _accessToken;
        [JsonProperty(PropertyName = "access_token")]
        public string AccessToken
        {
            get => _accessToken;
            set
            {
                _accessToken = value;
            }
        }

        private int _expiresAt;
        [JsonProperty(PropertyName = "expires_in")]
        public int ExpiresAt
        {
            get => _expiresAt;
            set
            {
                _expiresAt = value;
            }
        }

        private DateTime _expireDate;
        public DateTime ExpireDate
        {
            get => _expireDate;
            set
            {
                _expireDate = value.AddSeconds(_expiresAt);
            }
        }

        private string _refreshToken;
        [JsonProperty(PropertyName = "refresh_token")]
        public string RefreshToken
        {
            get => _refreshToken;
            set
            {
                _refreshToken = value;
            }
        }
    }
}
