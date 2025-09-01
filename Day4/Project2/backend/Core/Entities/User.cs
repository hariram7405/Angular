using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Core.Entities
{
    public class User
    {
        public required string  Username { get; set; }
        public required string PasswordHash { get; set; }

        public required string Role { get; set; } = "Developer";//default role

    }

}
