using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WEB_API.DAL.Entities
{
    public class BaseEntity<TId> : IBaseEntity<TId>
    {
        public virtual TId Id { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
