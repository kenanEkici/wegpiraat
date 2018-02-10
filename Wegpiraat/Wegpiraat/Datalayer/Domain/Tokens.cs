using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Wegpiraat.Data.Datalayer.Domain
{
    public class Tokens
    {
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
